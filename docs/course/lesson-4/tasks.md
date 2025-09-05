---
sidebar_position: 4
title: "Uppgifter"
---

import CollapsibleCard from "@site/src/components/\_library/CollapsibleCard/TWCollapsibleCard";

## Gruppuppgift: Fullborda typ-säker CRUD för `courses` och `students` med global felhantering
<CollapsibleCard title="Fullborda typ-säker CRUD för `courses` och `students` med global felhantering" defaultOpen={false}>
**Mål**  
Gör `courses`-resursen komplett: flytta databaslogik till `database/course.ts`, använd Zod-validering i routes och kasta tydliga `HTTPException` i stället för lokala `try/catch`. Gör `students`-resursen komplett på samma sätt.

**Krav**
- Skapa/återanvänd Zod-scheman för `NewCourse` och `Course`.  
- Implementera följande endpoints i `routes/course.ts` och `routes/student.ts`:
  - `GET /courses` → returnerar `Course[]`
  - `GET /courses/:id` → returnerar `Course` eller **404**
  - `POST /courses` → skapar kurs, svar **201**
  - `PUT /courses/:id` → uppdaterar **hela** kursen, svar **200**
  - `DELETE /courses/:id` → tar bort kurs, svar **200** null tillbaka
  - `GET /students` → returnerar `Student[]`
  - `GET /students/:id` → returnerar `Student` eller **404**
  - `POST /students` → skapar student, svar **201**
  - `PUT /students/:id` → uppdaterar **hela** studenten, svar **200**
  - `DELETE /students/:id` → tar bort student, svar **200** null tillbaka
- Vid kända fel kasta `HTTPException` med korrekt status (t.ex. 400/404); oväntade fel bubblas upp till `app.onError`.
- Återanvänd redan skapad `lib/supabase.ts` och struktur från tidigare lektion.
- Använd redan skapade routes från tidigare lektion.

**Begränsningar**
- Inga lokala `try/catch` i routes.
- Svaren ska vara type-säkra (använd generics/typer för Supabase-svar).

**Bedömning/acceptans**
- Endpoints returnerar rätt statuskoder och förväntade payloads.
- Centraliserad felhantering fångar oväntade fel utan att servern kraschar.
- Kodorganisation: routes tunna, logik i `database/`.
</CollapsibleCard>
---

## Uppgift 1: Unikhetsregel + felmappning till `409 Conflict`
<CollapsibleCard title="Unikhetsregel + felmappning till `409 Conflict`" defaultOpen={false}>
**Mål**  
Inför unikhetskonstraint i databasen (t.ex. `course_code` eller `title`) och mappa Postgres-fel till **409 Conflict** i API:t.

**Krav**
- Lägg till en **UNIQUE**-constraint i Supabase (via SQL Editor) på ett lämpligt fält.  
- I `POST /courses` och `PUT /courses/:id`:
  - Om insättning/uppdatering bryter mot UNIQUE, ska API:t svara **409** och ett enhetligt felmeddelande.
  - Implementationen ska **inte** använda lokala `try/catch` i route; kasta vidare och mappa till `HTTPException(409, …)` endast där du redan hanterar “kända” fel.
- Logga tekniska detaljer i servern, men håll klientsvaret minimalt och konsekvent.

**Begränsningar**
- Lösningen ska fungera oavsett om du valt `title` eller `course_code` som unikt fält.
- Fel från andra orsaker ska **inte** förväxlas med 409.

**Bedömning/acceptans**
- Försök skapa/uppdatera med duplicerad nyckel → **409** med konsekvent JSON-fel.
- Övriga oväntade fel → **500** via global handler.
</CollapsibleCard>
---

## Uppgift 2: Paginering, sök och `PATCH` med `Partial<T>` + parameter-/query-validering

<CollapsibleCard title="Paginering, sök och `PATCH` med `Partial<T>` + parameter-/query-validering" defaultOpen={false}>
**Mål**  
Gör `GET /courses` mer användbart med paginering och text-sök samt inför `PATCH /courses/:id` för partiella uppdateringar.

**Krav**
- `GET /courses` ska acceptera query-parametrar:
  - `limit` (default 10, max 50), `offset` (default 0)
  - `q` för text-sök på minst `title` **eller** `instructor` (case-insensitive; använd `ilike` i Supabase)
- Validera query-params med Zod via `@hono/zod-validator`.
- `PATCH /courses/:id`:
  - Body valideras mot ett Zod-schema baserat på `Partial<NewCourse>` (alla fält optional).
  - Uppdatera **endast** fälten som skickas in.
  - Om kursen inte finns → **404**.
  - Vid unikhetsbrott på samma fält som i Uppgift 2 → **409**.
  - Returnera det nya, uppdaterade objektet med **200**.
- Returnera för `GET /courses` ett objekt med `{ data, count, limit, offset }` där `count` är totala antalet matchande rader (använd Supabase `count: "exact"`).
**Begränsningar**
- Ingen lokal `try/catch` i routes; kasta kända fel med `HTTPException`.
- Paginering ska vara korrekt även när `q` används.
- Svaren ska vara typade.

**Bedömning/acceptans**
- `GET /courses` paginerar konsekvent och filtrerar korrekt på `q`.
- `PATCH` uppdaterar selektivt, följer types och returnerar **200** med uppdaterad resurs.
- Felkoder 404/409/500 returneras konsekvent via central handler.
</CollapsibleCard>
