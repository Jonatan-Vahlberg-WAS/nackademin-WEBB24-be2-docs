---
sidebar_position: 2
title: Hono Auth med Supabase
---



NOTES
- Check which auth providers that Supabase offers.
- activate mail and password authentication.
- add a new route to the Hono app that handles the authentication.
 - (optional) Add a auth validator similar to the one we used for the courses and students.
 - (optional) Add a new route to the Hono app that handles the authentication.
 - (optional) Add a database file `database/auth.ts` that handles the authentication. Login and register.
 ```ts
 authApp.post("/login", loginValidator, async (c) => {
  const { email, password } = c.req.valid("json");
  const response = await auth.login(email, password);
  if(response.error) {
    throw new HTTPException(400, {
      res: c.json({ error: "Invalid credentials" }, 400),
    });
  }
  return c.json(response.data.user, 200);
});

authApp.post("/register", registerValidator, async (c) => {
  const { email, password } = c.req.valid("json");
  const response = await auth.register(email, password);
  if(response.error) {
    if(response.error.code === "email_exists") {
      throw new HTTPException(409, {
        res: c.json({ error: "Email already exists" }, 409),
      });
    }
    throw new HTTPException(400, {
      res: c.json({ error: "Failed to register" }, 400),
    });
  }
  return c.json(response.data.user, 200);
});
 ```
 - (optional) Add diffrent supabase validations such as `email_exists`, `password_too_weak`, `email_not_verified`, etc.

 - Add Auth app to the Hono app.
 

 ## Row level authentication
 - Add row level authentication to the supabase database.
 `ALTER TABLE courses ENABLE ROW LEVEL SECURITY;`
 `ALTER TABLE students ENABLE ROW LEVEL SECURITY;`

 - Add the policy to the supabase database.
 ```sql
-- Allow public read access to courses
CREATE POLICY "Allow Public Read Access"
ON courses
FOR SELECT
TO public
USING (true);

-- Allow authenticated users full access (INSERT, UPDATE, DELETE)
CREATE POLICY "Allow Authenticated Full Access"
ON courses
FOR ALL
TO authenticated
USING (true);
 ```

 test by attempting to fetch either courses or students without being authenticated.

 ```termnial
 npm install @supabase/ssr
 ```

 Change the `supabase.ts` file to export credentials instead of a static client.
 ```ts
import { createClient } from '@supabase/supabase-js'
import dotenv from 'dotenv'
dotenv.config()

const supabaseUrl = process.env.SUPABASE_URL as string
const supabaseApiKey = process.env.SUPABASE_ANON_KEY as string

if (!supabaseUrl || !supabaseApiKey) {
    throw new Error('Missing Supabase credentials')
}

export const supabase = createClient(
    supabaseUrl,
    supabaseApiKey
)
export { supabaseUrl, supabaseApiKey }
```

 - Create a `middleware/auth.ts` file.
 ```ts
 import type { Context, Next } from "hono";
import { setCookie } from "hono/cookie";
import { createServerClient, parseCookieHeader } from "@supabase/ssr";
import type { SupabaseClient, User } from "@supabase/supabase-js";
import { supabaseUrl, supabaseApiKey } from "../lib/supabase.js";
import { HTTPException } from "hono/http-exception";

// Extend Hono context variables for TypeScript
declare module "hono" {
  interface ContextVariableMap {
    supabase: SupabaseClient;
    user: User | null;
  }
}

function createSupabaseForRequest(c: Context) {
  const client = createServerClient(supabaseUrl, supabaseApiKey, {
    cookies: {
      getAll() {
        return parseCookieHeader(c.req.header("Cookie") ?? "").map(
          ({ name, value }) => ({ name, value: value ?? "" })
        );
      },
      setAll(cookiesToSet) {
        cookiesToSet.forEach(({ name, value, options }) => {
          setCookie(c, name, value, {
            ...options,
            httpOnly: true,
            secure: true,
            sameSite: "lax",
            path: "/",
          });
        });
      },
    },
  });
  return client;
}
```
Explain the code.

In the same file create a middleware that adds supabase to the context.
```ts
export async function withSupabase(c: Context, next: Next) {
  const sb = createSupabaseForRequest(c);
  c.set("supabase", sb);
  const { data: { user }, error } = await sb.auth.getUser();
  c.set("user", error ? null : user);
  return next();
};
```

then one that requires authentication.
```ts
export async function requireAuth(c: Context, next: Next) {
  const supabase = c.get("supabase") as SupabaseClient | undefined;
  if (!supabase ) {
    const temp = createSupabaseForRequest(c);
    const { data: { user }, error } = await temp.auth.getUser();
    c.set("supabase", temp);
    c.set("user", error ? null : user);
  }
  
  const user = c.get("user") as User | null;
  if (!user) {
    return new HTTPException(401, { message: "Unauthorized" });
  }
  return next();
};
```

And finally one that is optional auth for potential user interaction.
```ts
export async function optionalAuth(c: Context, next: Next) {
  const supabase = c.get("supabase") as SupabaseClient | undefined;
  if (!supabase) {
    const temp = createSupabaseForRequest(c);
    const { data: { user }, error } = await temp.auth.getUser();
    c.set("supabase", temp);
    c.set("user", error ? null : user);
  }
  return next();
};
```

implement the optional auth middleware on all routes in the index.ts file.
```ts
app.use("*", optionalAuth);
```

Now within `routes/course.ts` change requests to use the context based supabase client.

```ts
courseApp.get("/", async (c) => {
  try {
    const sb = c.get("supabase");
    const courses: Course[] = await db.getCourses(sb);
    return c.json(courses);
  } catch (error) {
    return c.json([]);
  }
});
```

Within the `database/course.ts` file change the function to use the context based supabase client.
```ts
import type {
  PostgrestSingleResponse,
  SupabaseClient,
} from "@supabase/supabase-js";

export const getCourses = async (sb: SupabaseClient) => {
  const query = sb.from("courses").select("*"); // To Be improved upon
  const courses: PostgrestSingleResponse<Course[]> = await query;
  return courses.data || [];
};

export const createCourse = async (sb: SupabaseClient, course: NewCourse) => {
  const query = sb.from("courses").insert(course).select().single();
  const response: PostgrestSingleResponse<Course> = await query;
  return response;
};
```

finally back within `routes/course.ts` change the function to use the context based supabase client and the new require auth middleware.
```ts
import { requireAuth } from "../middleware/auth.js";
//...
courseApp.post("/", requireAuth, courseValidator, async (c) => {
    const sb = c.get("supabase");
    const newCourse: NewCourse = c.req.valid("json");
    const response: PostgrestSingleResponse<Course> = await db.createCourse(sb, newCourse);
    if(response.error) {
      throw new HTTPException(400, {
        res: c.json({ error: response.error.message }, 400),
      });
    }
    const course: Course = response.data;
    return c.json(course, 201);
});
```