---
sidebar_position: 2
title: Hono + TypeScript + Supabase
---

keynots
- Create supabase project if not already created
- Download courses sql file from `docs/course/lesson-4/assets/courses.sql`
- Create a new table called `courses` using the table creation 'script' from the sql file
- Seed the table with the data from the sql file make sure this works
- Get supabase credentials add them to a .env file
 - SUPABASE_URL, SUPABASE_ANON_KEY
- install supabase client `npm install @supabase/supabase-js`
- create a new file called `lib/supabase.ts`
- add the following code to the file
```ts
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.SUPABASE_URL!
const supabaseAnonKey = process.env.SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

```
- For testing purposes we can now use the supabase client to get the data from the database
Within `routes/course.ts` we can replace the simulated data call with a call to the supabase client

```ts
import { supabase } from '../lib/supabase.js'

courseApp.get("/", async (c) => {

    try {
        const courses= await supabase.from("courses").select("*");
        return c.json(courses);
    } catch (error) {
        return c.json([]);
    }
});
```
- Now we can run the server and see the data in the console
- We will get back a `PostgrestSingleResponse<T>` response which in turn contains
```ts
{
    data: T,
    error: Error | null,
}
```
- so we should type cast the response to the type we expect that way we follow the typescript compiler rules
```ts
const response: PostgrestSingleResponse<Course[]> = await supabase.from("courses").select("*");
```
- Now we can access the data from the response
```ts
const courses: Course[] = response.data
c.json(courses)
```
- Now we can run the server and see the data in the console
- We will get back a Course[] array of courses
- Next step is to create a new `database/course.ts` file to contain the database logic
```ts
import type { PostgrestSingleResponse } from "@supabase/supabase-js";
import { supabase } from "../lib/supabase.js";

export const getCourses = async () => {
    const query = supabase.from("courses").select("*"); // To Be improved upon
    const courses: PostgrestSingleResponse<Course[]> = await query;
    return courses.data;
}
// ... more database logic
```
- Now we can use this database logic in our course app
```ts
import * as db from "../database/course.js";

courseApp.get("/", async (c) => {
    const courses = await db.getCourses();
    return c.json(courses);
});
```

- Implement the rest of the database logic for the course app
- [Supabase docs: select](https://supabase.com/docs/reference/javascript/select)
- [Supabase docs: insert](https://supabase.com/docs/reference/javascript/insert)
- [Supabase docs: update](https://supabase.com/docs/reference/javascript/update)
- [Supabase docs: delete](https://supabase.com/docs/reference/javascript/delete)
 - GET /courses/:id
 - POST /courses
 - PUT /courses/:id
 - DELETE /courses/:id
