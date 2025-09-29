---
sidebar_position: 3
title: Supabase filtreringslogik
---
_________
FOR CURSOR: 
BACKGROUND INFORMATION
## PaginatedListResponse

`types/global.ts`
```ts
type PaginatedListResponse<T> = {
    data: T[];
    count: number;
    offset: number;
    limit: number;
};
``` 

`types/course.ts`
```ts
type CourseListQuery = {
  limit?: number;
  offset?: number;
  department?: string;
  q?: string;
  sort_by?: "title" | "start_date" | string;
};
```

`validators/course.ts`
```ts
const courseQuerySchema: z.ZodType<CourseListQuery> = z.object({
    limit: z.coerce.number().optional().default(10),
    offset: z.coerce.number().optional().default(0),
    department: z.string().optional(),
    q: z.string().optional(),
    sort_by: z
      .union([z.literal("title"), z.literal("start_date"), z.string()])
      .optional()
      .default("title"),
  });
  
  export const courseQueryValidator = zValidator("query", courseQuerySchema);
```

`routes/course.ts`
```ts
courseApp.get("/", courseQueryValidator, async (c) => {
  const query = c.req.valid("query");

  try {
    const courses = await db.getCourses(query)
    return c.json(courses);
  } catch (error) {
    return c.json([]);
  }
});
```

`database/course.ts`
```ts
export async function getCourses(query: CourseListQuery): Promise<PaginatedListResponse<Course>> {
  const sortable = new Set(["title", "start_date"]);
  const order = query.sort_by
    ? sortable.has(query.sort_by)
      ? query.sort_by
      : "title"
    : "title";
  const startIndex = query.offset || 0;
  const endIndex = startIndex + (query.limit || 10) - 1;
  const _query = supabase
    .from("courses")
    .select("*", { count: "exact" })
    .order(order, { ascending: true })
    .range(startIndex, endIndex);

  if (query.department) {
    _query.eq("department", query.department);
  }

  if (query.q) {
    // _query.ilike("title", `%${query.q}%`); // Simple full text search
    _query.or(`title.ilike.%${query.q}%,description.ilike.%${query.q}%`); // Complex time consuming Full text search
  }

  const courses: PostgrestSingleResponse<Course[]> = await _query;
  console.log(courses);
  return {
    data: courses.data || [],
    count: courses.count || 0,
    offset: query.offset || 0,
    limit: query.limit || 10,
  };
}
```
    _________