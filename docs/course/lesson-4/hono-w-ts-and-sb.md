---
sidebar_position: 2
title: Hono + TypeScript + Supabase
---
 
I den här lektionen kommer vi koppla ihop vår Hono-app med en riktig databas via **Supabase**.  

## Vad är Supabase?

Supabase är en backend-as-a-service som bygger ovanpå PostgreSQL.  
Den ger oss en färdig databas, autentisering, lagring och ett genererat API – perfekt för att snabbt komma igång utan att sätta upp en egen databas.

Vi kommer använda Supabase för att spara och hämta våra kurser i stället för att simulera data med JSON-filer.

---

## Förberedelser

1. **Skapa Supabase-projekt**  
   Om du inte redan har ett Supabase-projekt, skapa ett via [Supabase Dashboard](https://supabase.com/).

2. **Ladda ner SQL-fil**  
   Hämta `courses.sql` från  
   [`courses.sql`](./assets/courses.sql).

3. **Skapa tabell `courses`**  
   Kör SQL-scriptet i Supabase SQL Editor för att skapa tabellen.

4. **Seed data**  
   Lägg in startdata från samma SQL-fil och kontrollera att du kan se kurserna i Supabase Dashboard.

---

## Anslut till Supabase

För att ansluta vår Hono-app till Supabase behöver vi:

1. **Lägga till credentials i `.env`**
   ```env
   SUPABASE_URL=din-url-här
   SUPABASE_ANON_KEY=din-anon-key-här
   ```

2. **Installera klienten**
   ```bash
   npm install @supabase/supabase-js
   ```

3. **Skapa `lib/supabase.ts`**
   ```ts
   import { createClient } from '@supabase/supabase-js'

   const supabaseUrl = process.env.SUPABASE_URL!
   const supabaseAnonKey = process.env.SUPABASE_ANON_KEY!

   export const supabase = createClient(supabaseUrl, supabaseAnonKey)
   ```

---

## Hämta data med Supabase

Nu kan vi testa att hämta våra kurser från databasen direkt i vår `routes/course.ts`:

```ts
import { supabase } from '../lib/supabase.js'

courseApp.get("/", async (c) => {
  try {
    const response = await supabase.from("courses").select("*");
    return c.json(response);
  } catch (error) {
    return c.json([]);
  }
});
```

### Typning av svar

Supabase returnerar en `PostgrestSingleResponse<T>` där vi får tillbaka både `data` och `error`.  
Vi kan därför typa vårt svar så vi följer TypeScript-kompilatorns regler:

```ts
import type { PostgrestSingleResponse } from "@supabase/supabase-js";

const response: PostgrestSingleResponse<Course[]> =
  await supabase.from("courses").select("*");

const courses: Course[] = response.data;
return c.json(courses);
```

Nu får vi tillbaka ett korrekt typat `Course[]`-array.  

---

## Flytta databaslogik till `database/course.ts`

För att hålla vår kod organiserad skapar vi en mapp `database` där vi samlar databasfunktioner:

```ts
// src/database/course.ts
import type { PostgrestSingleResponse } from "@supabase/supabase-js";
import { supabase } from "../lib/supabase.js";

export const getCourses = async () => {
  const query = supabase.from("courses").select("*");
  const courses: PostgrestSingleResponse<Course[]> = await query;
  return courses.data;
};

export const createCourse = async (course: NewCourse) => {
    const query = supabase.from("courses").insert(course).select().single();
    const response: PostgrestSingleResponse<Course> = await query;
    return response
}
```

Sedan använder vi denna funktion i vår route:

```ts
import * as db from "../database/course.js";

courseApp.get("/", async (c) => {
  const courses = await db.getCourses();
  return c.json(courses);
});

courseApp.post("/", courseValidator, async (c) => {
    const newCourse: NewCourse = c.req.valid("json");
    const response: PostgrestSingleResponse<Course> = await db.createCourse(newCourse);
    if(response.error) {
      throw new HTTPException(400, {
        res: c.json({ error: response.error.message }, 400),
      });
    }
    const course: Course = response.data;
    return c.json(course, 201);
});
```

---

## Bygg vidare med CRUD

Nu är det dags att implementera resten av databaslogiken:  

- **GET `/courses/:id`** → Hämta en kurs med specifikt id  
- **POST `/courses`** → Skapa en ny kurs  
- **PUT `/courses/:id`** → Uppdatera en kurs  
- **DELETE `/courses/:id`** → Ta bort en kurs  

Supabase-dokumentationen är din bästa vän här:  
- [Select](https://supabase.com/docs/reference/javascript/select)  
- [Insert](https://supabase.com/docs/reference/javascript/insert)  
- [Update](https://supabase.com/docs/reference/javascript/update)  
- [Delete](https://supabase.com/docs/reference/javascript/delete)