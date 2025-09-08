---
sidebar_position: 5
title: "Next.js 14–15: Server-side contra client-side rendering"
---

I det här delkapitlet går vi igenom **när** och **hur** du gör server-side fetching i Next.js (App Router, v14–15), vilka **begränsningar** som finns, och hur du **typar** lösningarna med TypeScript. Fokus är att knyta ihop det du redan kan om TypeScript från tidigare kapitel med Next.js sätt att hämta data på serversidan.

---

## När ska du hämta data på servern?

**Välj server-side fetching när…**
- Du behöver **SEO**/tidig TTFB (t.ex. listor/detaljsidor som indexeras).
- Du vill dölja **hemligheter** (API-nycklar/privata endpoints) – de ska inte läcka till klienten.
- Du vill utnyttja **cachning/ISR** (Incremental Static Regeneration) för bättre prestanda.
- Du behöver **request-specifik data** (cookies/headers, geolokalisering) som bara finns på servern.

**Stanna i klienten när…**
- Datat är helt **användarspecifikt** och inte SEO-viktigt (ex. live-interaktioner).
- Du måste reagera på **omedelbara UI-händelser** utan roundtrip via servern.
- Du vill använda **webbläsar-APIs** (`window`, `localStorage`, MediaDevices, m.m.).

> **Kom ihåg**  
> I App Router är **Server Components standard** – att hämta data direkt i komponenten (utan API-mellanlager) är ofta enklast och snabbast.

---

## Var & hur gör man server-side fetching?

### 1) Server Components (RSC) i `app/`
Server Components kan vara **async** och får använda `fetch` direkt. De körs på servern och serialiserar **resultatet** (inte funktionerna) till klienten.

```tsx
// app/courses/page.tsx
export const revalidate = 60; // ISR: regenerera minst var 60:e sekund

type Course = {
  course_id: string;
  title: string;
  instructor: string;
  credits: number;
};

async function getCourses(): Promise<Course[]> {
  const res = await fetch(`${process.env.API_URL}/courses`, {
    // default är cachead fetch i RSC; välj själv vid behov
    next: { revalidate: 60, tags: ["courses"] },
  });
  if (!res.ok) throw new Error("Failed to fetch courses");
  return res.json();
}

export default async function CoursesPage() {
  const courses = await getCourses();
  return (
    <ul>
      {courses.map((c) => (
        <li key={c.course_id}>{c.title}</li>
      ))}
    </ul>
  );
}
```

**Nycklar**
- `export const revalidate = 60` eller `next: { revalidate }` på `fetch` aktiverar ISR.
- `next: { tags: [...] }` + `revalidateTag('tag')` (i en mutation) ger **on-demand** revalidation.
- `export const dynamic = 'force-dynamic'` eller `fetch(..., { cache: 'no-store' })` för **alltid färsk data**.

---

### 2) Route Handlers i `app/api/**/route.ts`
Bygg ett internt API över t.ex. databasen. Bra när du vill **återanvända** samma logik av flera klienter (webb, mobil) eller isolera tredje-parts-anrop.

```ts
// app/api/courses/route.ts
import { NextResponse, type NextRequest } from "next/server";

type Course = { course_id: string; title: string };

export async function GET(_req: NextRequest) {
  const data: Course[] = await fetchCoursesFromDB(); // valfri server-funktion
  return NextResponse.json(data, { status: 200 });
}

export async function POST(req: NextRequest) {
  const payload = (await req.json()) as Partial<Course>;
  const created = await createCourse(payload);
  return NextResponse.json(created, { status: 201 });
}
```

**Nycklar**
- Route Handlers körs server-side; du kan använda **hemligheter** och valfritt runtime (`edge`/`nodejs`).
- Typa `Request`/`Response` med `NextRequest`/`NextResponse`.

---

### 3) Server Actions (mutationer)
Server Actions låter dig kalla en **serverfunktion direkt** från komponenter (utan separat API-route). Perfekt för **POST/PUT/PATCH/DELETE** med formulär eller programmatisk anrop.

```tsx
// app/courses/actions.ts
"use server";

import { revalidateTag } from "next/cache";
import { z } from "zod";

const courseSchema = z.object({
  title: z.string().min(1),
  instructor: z.string().min(1),
  credits: z.number().int().min(0),
});

export async function createCourse(prevState: unknown, formData: FormData) {
  const parsed = courseSchema.safeParse({
    title: formData.get("title"),
    instructor: formData.get("instructor"),
    credits: Number(formData.get("credits")),
  });
  if (!parsed.success) {
    return { ok: false, errors: parsed.error.flatten().fieldErrors };
  }

  await dbCreateCourse(parsed.data);
  revalidateTag("courses");
  return { ok: true };
}
```

```tsx
// app/courses/new/page.tsx
import { createCourse } from "../actions";

export default function NewCoursePage() {
  return (
    <form action={createCourse}>
      <input name="title" />
      <input name="instructor" />
      <input name="credits" type="number" />
      <button type="submit">Create</button>
    </form>
  );
}
```

**Nycklar**
- Filen måste starta med `"use server"`.
- **Typsäkerhet** via Zod eller egna typer + runtime-validering.
- Anropa `revalidateTag`/`revalidatePath` efter mutation för att uppdatera cache.

---

## Caching & dynamik i korthet

- **Static/ISR**  
  `export const revalidate = N` eller `fetch(..., { next: { revalidate: N } })` ger återpublicering var N sekunder.
- **Dynamic**  
  `export const dynamic = 'force-dynamic'` eller `fetch(..., { cache: 'no-store' })` kringgår cache – bra för per-request data (cookies/headers).
- **Tag-baserad revalidation**  
  Märk fetch med `next: { tags: [...] }` och kör `revalidateTag("tag")` vid förändringar.
- **Deduping**  
  Identiska `fetch`-anrop i samma rendering **dedupliceras** automatiskt – håll URL och init-objekt stabila.

---

## Begränsningar och vanliga fallgropar

- **Inga webbläsar-APIs i Server Components**  
  `window`, `document`, `localStorage`, media-API m.fl. finns **inte**. Flytta UI-logik till en **Client Component** (`"use client"`).
- **Client Components kan inte anropa server direkt**  
  De kan **inte** göra server-side fetch (förutom via Route Handlers eller Server Actions). Hämta i en server-förälder och **passa ner** data som props.
- **Runtime-skillnader (edge vs nodejs)**  
  `export const runtime = 'edge' | 'nodejs'`. I **edge** gäller Web-standarder (ingen `fs`, annorlunda crypto, inga Node-inbyggda moduler).
- **Sekretess**  
  Hemliga variabler får **endast** användas på servern. För klientexponering krävs prefix `NEXT_PUBLIC_`.
- **Serialisering över RSC-gränser**  
  Skicka **plain data** (JSON-likt). Funktioner, klasser, Dates/Maps etc. kan kräva transformering.
- **Caching-missar**  
  Glömd `no-store` eller felaktig `revalidate` → **stale data**. Muta + glömd `revalidateTag` → UI uppdateras inte.
- **Stora svar**  
  Tunga payloads påverkar TTFB och streaming; **paginera** & **projicera fält** i API:et.

---

## TypeScript-mönster för server-fetch

### 1) Generisk `fetchJson<T>` helper
```ts
// lib/http.ts
export async function fetchJson<T>(input: RequestInfo, init?: RequestInit): Promise<T> {
  const res = await fetch(input, init);
  if (!res.ok) throw new Error(`${res.status} ${res.statusText}`);
  return res.json() as Promise<T>;
}
```

```tsx
// app/courses/page.tsx
type Course = { course_id: string; title: string; instructor: string; credits: number };

export default async function Page() {
  const courses = await fetchJson<Course[]>(
    `${process.env.API_URL}/courses`,
    { next: { revalidate: 60, tags: ["courses"] } }
  );
  return <pre>{JSON.stringify(courses, null, 2)}</pre>;
}
```

### 2) Typa Route Handlers
```ts
// app/api/courses/[id]/route.ts
import { NextResponse, type NextRequest } from "next/server";

type Course = { course_id: string; title: string };

export async function GET(
  _req: NextRequest,
  { params }: { params: { id: string } }
) {
  const course = await findCourse(params.id); // -> Course | null
  if (!course) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json<Course>(course);
}
```

### 3) Zod + Server Actions (typer + runtime-skydd)
```ts
import { z } from "zod";

const partialCourse = z.object({
  title: z.string().min(1).optional(),
  instructor: z.string().min(1).optional(),
  credits: z.coerce.number().int().min(0).optional(),
});

export type PartialCourse = z.infer<typeof partialCourse>;
```

---

## Checklista: välj rätt mönster

- **Läsdata (GET)**  
  - SEO + cachning → **Server Component** + `revalidate`/tags  
  - Delas av flera klienter → **Route Handler**  
- **Skrivdata (POST/PUT/PATCH/DELETE)**  
  - Form/UX nära komponenten → **Server Action** + `revalidateTag`  
  - Delas av flera klienter eller extern åtkomst → **Route Handler**
- **Per-request data (cookies/headers)**  
  - Använd **dynamic** eller `no-store` i servern (RSC/Route Handler)
- **Edge-nära logik**  
  - `runtime = 'edge'` + undvik Node-API

---

## Vanliga konfigar

```ts
// app/layout.tsx eller enskilda sidor
export const dynamic = 'force-static' | 'force-dynamic'; // styr renderingsläge
export const revalidate = 0 | number;                    // 0 => no ISR, number => ISR
export const runtime = 'nodejs' | 'edge';                // välj miljö
```

```ts
// Exempel: taggad fetch + on-demand revalidate
await fetch(url, { next: { tags: ["courses"] } });
// ...i en server action efter mutation:
import { revalidateTag } from "next/cache";
revalidateTag("courses");
```

---

## Sammanfattning

- **Server Components** är standard i App Router och gör server-side fetching trivial.  
- **Route Handlers** och **Server Actions** kompletterar för API-delning och mutationer.  
- **Caching (ISR/dynamic/tags)** avgör **prestanda** och **färskhet** – välj medvetet.  
- **TypeScript** + **Zod** ger dig **typsäkerhet** och **runtime-garantier** över hela kedjan.

Nästa steg: applicera mönstren ovan på dina befintliga `courses`/`students`-flöden – och välj **en** källa för sanning (Route Handler **eller** direkt DB i RSC) per sida för att undvika dubbel-logik.
