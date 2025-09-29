---
sidebar_position: 3
title: Supabase filtreringslogik
---

Nu när vi har kopplat ihop vår Hono-app med Supabase är det dags att bygga ut funktionaliteten med avancerad filtrering, paginering och sökning. I den här delen kommer vi att skapa ett robust API som kan hantera komplexa queries.

## Vad är filtreringslogik?

Filtreringslogik låter oss begränsa och sortera data från vår databas baserat på användarens behov. I stället för att alltid hämta alla kurser kan vi:

- **Paginera** resultat för bättre prestanda
- **Sortera** efter olika kolumner
- **Filtrera** på specifika värden
- **Söka** i textfält

Detta ger oss möjlighet att bygga kraftfulla API:er som skalas bra även med stora datamängder.

---

## Skapa typer för filtrering

Först behöver vi definiera typer för våra query-parametrar och svar.

### 1. Global paginering typ

Skapa `types/global.ts`:

```ts
export type PaginatedListResponse<T> = {
  data: T[];
  count: number;
  offset: number;
  limit: number;
};
```

### 2. Kurs-specifika query-typer

Uppdatera `types/course.ts`:

```ts
export type CourseListQuery = {
  limit?: number;
  offset?: number;
  department?: string;
  q?: string;
  sort_by?: "title" | "start_date" | string;
};
```

Denna typ definierar alla möjliga query-parametrar:

- `limit` - Antal resultat per sida
- `offset` - Startposition för paginering
- `department` - Filtrera på avdelning
- `q` - Sökterm för fritext
- `sort_by` - Sorteringskolumn

---

## Validering av query-parametrar

För att säkerställa att inkommande queries är korrekta använder vi Zod-validering.

Uppdatera `validators/course.ts`:

```ts
import { z } from "zod";
import { zValidator } from "@hono/zod-validator";
import type { CourseListQuery } from "../types/course.js";

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

**Förklaringar:**

- `z.coerce.number()` - Konverterar automatiskt strings till numbers
- `.optional().default(10)` - Sätter standardvärde om inget anges
- `z.union()` - Tillåter specifika värden eller fallback till string

---

## Uppdatera route med validering

Nu uppdaterar vi vår GET-route för att hantera query-parametrar:

```ts
// routes/course.ts
import { courseQueryValidator } from "../validators/course.js";
import * as db from "../database/course.js";

courseApp.get("/", courseQueryValidator, async (c) => {
  const query = c.req.valid("query");

  try {
    const courses = await db.getCourses(query);
    return c.json(courses);
  } catch (error) {
    console.error("Error fetching courses:", error);
    return c.json(
      {
        data: [],
        count: 0,
        offset: query.offset || 0,
        limit: query.limit || 10,
      },
      500
    );
  }
});
```

Nu kan användare göra requests som:

```
GET /courses?limit=20&offset=0&department=IT&q=javascript&sort_by=start_date
```

---

## Implementera databaslogiken

Den mest komplexa delen är att bygga Supabase-queries som hanterar alla filtreringsalternativ.

Uppdatera `database/course.ts`:

```ts
import type { PostgrestSingleResponse } from "@supabase/supabase-js";
import { supabase } from "../lib/supabase.js";
import type { Course, CourseListQuery } from "../types/course.js";
import type { PaginatedListResponse } from "../types/global.js";

export async function getCourses(
  query: CourseListQuery
): Promise<PaginatedListResponse<Course>> {
  // Säkerhetskontroll för sortering
  const sortable = new Set(["title", "start_date"]);
  const order = query.sort_by
    ? sortable.has(query.sort_by)
      ? query.sort_by
      : "title"
    : "title";

  // Beräkna paginering
  const startIndex = query.offset || 0;
  const endIndex = startIndex + (query.limit || 10) - 1;

  // Bygg grundläggande query
  const _query = supabase
    .from("courses")
    .select("*", { count: "exact" })
    .order(order, { ascending: true })
    .range(startIndex, endIndex);

  // Lägg till filter för avdelning
  if (query.department) {
    _query.eq("department", query.department);
  }

  // Lägg till textsökning
  if (query.q) {
    // Enkel sökning i title
    // _query.ilike("title", `%${query.q}%`);

    // Avancerad sökning i flera kolumner
    _query.or(`title.ilike.%${query.q}%,description.ilike.%${query.q}%`);
  }

  // Utför query
  const courses: PostgrestSingleResponse<Course[]> = await _query;

  // Returnera paginerat svar
  return {
    data: courses.data || [],
    count: courses.count || 0,
    offset: query.offset || 0,
    limit: query.limit || 10,
  };
}
```

### Förklaring av Supabase-metoderna:

**`.select("*", { count: "exact" })`**  
Hämtar all data och räknar totalt antal rader (för paginering).

**`.order(order, { ascending: true })`**  
Sorterar resultaten efter vald kolumn.

**`.range(startIndex, endIndex)`**  
Implementerar paginering genom att begränsa resultaten.

**`.eq("department", query.department)`**  
Exakt matchning för avdelningsfilter.

**`.ilike("title", "%${query.q}%")`**  
Case-insensitive sökning med wildcard-matching.

**`.or("title.ilike.%${query.q}%,description.ilike.%${query.q}%")`**  
Söker i flera kolumner samtidigt med OR-logik.

---

## Testa API:et

Nu kan du testa ditt API med olika kombinationer:

```bash
# Hämta första 10 kurserna
GET /courses

# Paginering
GET /courses?limit=5&offset=10

# Filtrera på avdelning
GET /courses?department=IT

# Sök efter kurser
GET /courses?q=javascript

# Kombinera allt
GET /courses?limit=20&department=IT&q=web&sort_by=start_date
```

Svaret kommer alltid att följa strukturen:

```json
{
  "data": [...],
  "count": 42,
  "offset": 0,
  "limit": 10
}
```

---

## Prestanda och optimering

### Indexering

Se till att dina databastabeller har index på kolumner du filtrerar och sorterar på:

```sql
CREATE INDEX idx_courses_department ON courses(department);
CREATE INDEX idx_courses_start_date ON courses(start_date);
```

### Begränsningar

Sätt rimliga gränser för att undvika överbelastning:

```ts
const courseQuerySchema = z.object({
  limit: z.coerce.number().min(1).max(100).optional().default(10),
  // ... resten av schemat
});
```