---
sidebar_position: 2
title: Hono Auth med Supabase
---

I den här lektionen lägger vi till **autentisering** i vår Hono-app med hjälp av **Supabase Auth**.
Alla requests passerar genom `optionalAuth` (som ser till att vi alltid har en Supabase-klient i context).
När vi vill kräva inloggning använder vi `requireAuth`.

---

## 1. Förberedelser

### Aktivera e-post och lösenord i Supabase

I **Supabase Dashboard** → *Authentication* → *Providers*: aktivera **Email**.
Det gör att användare kan registrera sig och logga in med e-postadress och lösenord.

### Installera SSR-klienten

```bash
npm install @supabase/ssr
```

SSR-klienten gör att vi kan läsa och skriva sessionscookies i Hono.

### Skapa `lib/supabase.ts`

Vi behöver våra credentials tillgängliga både för en global klient och för middleware.

```ts
import { createClient } from "@supabase/supabase-js"
import dotenv from "dotenv"
dotenv.config()

const supabaseUrl = process.env.SUPABASE_URL as string
const supabaseApiKey = process.env.SUPABASE_ANON_KEY as string

if (!supabaseUrl || !supabaseApiKey) {
  throw new Error("Missing Supabase credentials")
}

export const supabase = createClient(supabaseUrl, supabaseApiKey)
export { supabaseUrl, supabaseApiKey }
```

---

## 2. Middleware

Vi skapar en middleware som hanterar **Supabase-klienten** och **användaren** för varje request.

```ts
// src/middleware/auth.ts
import type { Context, Next } from "hono"
import { setCookie } from "hono/cookie"
import { createServerClient, parseCookieHeader } from "@supabase/ssr"
import type { SupabaseClient, User } from "@supabase/supabase-js"
import { supabaseUrl, supabaseApiKey } from "../lib/supabase.js"
import { HTTPException } from "hono/http-exception"

declare module "hono" {
  interface ContextVariableMap {
    supabase: SupabaseClient
    user: User | null
  }
}

function createSupabaseForRequest(c: Context) {
  return createServerClient(supabaseUrl, supabaseApiKey, {
    cookies: {
      getAll() {
        return parseCookieHeader(c.req.header("Cookie") ?? "").map(
          ({ name, value }) => ({ name, value: value ?? "" })
        )
      },
      setAll(cookiesToSet) {
        cookiesToSet.forEach(({ name, value, options }) => {
          setCookie(c, name, value, {
            ...options,
            httpOnly: true,
            secure: true,
            sameSite: "lax",
            path: "/",
          })
        })
      },
    },
  })
}

export async function withSupabase(c: Context, next: Next) {
  if (!c.get("supabase")) {
    const sb = createSupabaseForRequest(c)
    c.set("supabase", sb)

    const { data: { user }, error } = await sb.auth.getUser()
    c.set("user", error ? null : user)
  }
  return next()
}

export async function optionalAuth(c: Context, next: Next) {
  return withSupabase(c, next)
}

export async function requireAuth(c: Context, next: Next) {
  await withSupabase(c, async () => {})
  const user = c.get("user")
  if (!user) {
    throw new HTTPException(401, { message: "Unauthorized" })
  }
  return next()
}
```

**Förklaring:**

* `createSupabaseForRequest` skapar en Supabase-klient för just den här requesten.
  Den läser cookies från request och kan skriva nya på response.
* `withSupabase` sätter `supabase` och `user` i context om de inte redan finns.
* `optionalAuth` kör alltid `withSupabase` och används globalt.
* `requireAuth` använder `withSupabase` och kastar `401` om ingen användare är inloggad.

---

## 3. Auth-routes

Skapa en egen route för login och register: `src/routes/auth.ts`.

```ts
import { Hono } from "hono"
import { HTTPException } from "hono/http-exception"

export const authApp = new Hono()

authApp.post("/login", async (c) => {
  const { email, password } = await c.req.json()
  const supabase = c.get("supabase")
  const { data, error } = await supabase.auth.signInWithPassword({ email, password })

  if (error) {
    throw new HTTPException(400, { res: c.json({ error: "Invalid credentials" }, 400) })
  }

  return c.json(data.user, 200)
})

authApp.post("/register", async (c) => {
  const { email, password } = await c.req.json()
  const supabase = c.get("supabase")
  const { data, error } = await supabase.auth.signUp({ email, password })

  if (error) {
    throw new HTTPException(400, { res: c.json({ error: error.message }, 400) })
  }

  return c.json(data.user, 200)
})
```

**Förklaring:**

* `login` loggar in med e-post och lösenord. Om det lyckas sätts en session-cookie.
* `register` skapar en ny användare. Om e-postverifiering är påslagen måste användaren bekräfta via mejl.

---

## 4. Row Level Security (RLS)

Aktivera RLS i databasen:

```sql
ALTER TABLE courses ENABLE ROW LEVEL SECURITY;
ALTER TABLE students ENABLE ROW LEVEL SECURITY;
```

Skapa policies för `courses`:

```sql
-- Tillåt alla att läsa
CREATE POLICY "Allow Public Read Access"
ON courses
FOR SELECT
TO public
USING (true);

-- Tillåt inloggade att göra allt
CREATE POLICY "Allow Authenticated Full Access"
ON courses
FOR ALL
TO authenticated
USING (true);
```

**Förklaring:**
Databasen skyddas även om någon försöker gå runt API\:t.
Alla kan läsa, men bara inloggade kan skapa, uppdatera eller ta bort.

---

## 5. Koppla ihop i appen

I `src/index.ts`:

```ts
import { Hono } from "hono"
import { optionalAuth } from "./middleware/auth.js"
import { authApp } from "./routes/auth.js"

const app = new Hono()

app.use("*", optionalAuth)   // alltid supabase + ev. user
app.route("/auth", authApp)  // auth-routes
```

---

## 6. Använd `requireAuth` när det behövs

I `src/routes/course.ts`:

```ts
import { Hono } from "hono"
import { requireAuth } from "../middleware/auth.js"
import * as db from "../database/course.js"

export const courseApp = new Hono()

// Öppen läsning
courseApp.get("/", async (c) => {
  const sb = c.get("supabase")
  const courses = await db.getCourses(sb)
  return c.json(courses)
})

// Endast för inloggade
courseApp.post("/", requireAuth, async (c) => {
  const sb = c.get("supabase")
  const newCourse: NewCourse = await c.req.json()
  const response = await db.createCourse(sb, newCourse)

  if (response.error) {
    return c.json({ error: response.error.message }, 400)
  }

  return c.json(response.data, 201)
})
```

---
|Middleware|När du använder den|Vad den gör|Exempel på routes|
| - | - | - | - |
| **`optionalAuth`** | Som *global middleware* (på hela appen) | Lägger till en Supabase-klient i `c.get("supabase")`. Om en session finns i cookies sätts även `c.get("user")`, annars `null`. | `app.use("*", optionalAuth)` → alla requests kan läsa från databasen (även anonyma).           |
| **`requireAuth`**  | På specifika routes där det krävs inloggning | Säkerställer att `c.get("user")` finns. Annars returneras `401 Unauthorized`.                                                  | `POST /courses`, `PUT /courses/:id`, `DELETE /courses/:id` – dvs. operationer som ändrar data. |

