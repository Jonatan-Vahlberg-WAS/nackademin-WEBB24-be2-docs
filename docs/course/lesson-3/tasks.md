---
sidebar_position: 5
title: "Uppgifter"
---

import CollapsibleCard from "@site/src/components/_library/CollapsibleCard/TWCollapsibleCard";

I den här uppgiftssamlingen (för **lektion 3**) fokuserar vi på att **utforska dokumentation**, bygga **query-parameter-stöd** och förbättra **API-hantering** i Hono med TypeScript och Zod. **Inga lösningar ingår.**

---

## Gruppuppgift: Dokumentationsspan + API-cheatsheet
<CollapsibleCard title="Grupp: Utforska dokumentation & skapa ett API-cheatsheet" defaultOpen={false}>

**Mål**  
Gör er bekanta med de delar av dokumentationen ni faktiskt använder i lektionen, och skapa ett kort internt **cheatsheet** (markdown i repo) som sammanfattar hur ni vill jobba i projektet.

**Krav**
- Läs på om:
  - **Hono**: routing, `c.req.query()`, `c.req.param()`, `c.req.json()`, svar (`c.json`, `c.text`), middleware.
  - **@hono/zod-validator**: validering av `json`, `query`, `param`.
  - **Zod**: `object`, `string`, `number`, `coerce`, `.optional()`, `.default()`, `.transform()`, `.refine()`.
  - **TypeScript utility types**: `Partial<T>`, `Pick<T, K>`, `Omit<T, K>`, samt hur de kan användas i DTO:er.
- Skapa `docs/api-cheatsheet.md` med:
  - Vanliga kodsnuttar för att läsa **query/params/body** i Hono.
  - Mönster för **valideringsschema** (json/query/param).
  - Riktlinjer för **statuskoder** (200/201/400/404) i lektion 3.
  - Exempel på hur ni dokumenterar endpoints i README (kort format).
- Håll cheatsheetet **kort (≤ 1–2 sidor)** och praktiskt.

**Bedömning/acceptans**
- Alla i gruppen kan peka ut relevanta docs-avsnitt i efterhand.
- Cheatsheetet används i följande uppgifter.
</CollapsibleCard>

---

## Uppgift 1: Query-parametrar för listning (`/students` och `/courses`)
<CollapsibleCard title="Query-parametrar: filtrering, paginering & validering" defaultOpen={false}>

**Mål**  
Gör list-endpoints mer användbara genom att stödja **filtrering** och **paginering** via query-parametrar, med **Zod-validering** och tydliga fel vid ogiltiga värden.

**Krav**
- `GET /students`:
  - Stöd följande query-parametrar:
    - `limit` (default 10, max 50), `offset` (default 0) – **nummer**, inte strängar.
    - `q` – fri textsökning på minst `first_name` **eller** `last_name`.
    - `major` – exakt filtrering (om fältet finns i er modell).
    - `course_id` – filtrera studenter kopplade till kurs.
  - Validera med Zod via `zValidator("query", schema)`. Använd `z.coerce.number()` för numeriska värden.
  - Svara med `{ data, limit, offset, count }` där `count` är totalt antal matchningar (räkna innan range/filter eller returnera ett uppskattat värde utifrån ert datalager i denna lektion).
- `GET /courses`:
  - Stöd `limit`, `offset`, `q` – där `q` matchar minst `title` **eller** `instructor`.
  - Samma valideringsstrategi och svarskontrakt som ovan.

**Begränsningar**
- Håll er till **lektion 3-nivå** (ingen central `onError` krävs här).
- Vid valideringsfel → **400** med tydlig JSON-struktur (lista av fel/orsaker).

**Bedömning/acceptans**
- Ogiltiga `limit/offset` ger **400**.
- `q` filtrerar korrekt (case-insensitive).
- Svar innehåller korrekt `limit/offset` och rimliga `count`-värden.
</CollapsibleCard>

---

## Uppgift 2: Sortering & fältprojektion (select)
<CollapsibleCard title="Sortering & fältprojektion med säker whitelist" defaultOpen={false}>

**Mål**  
Lägg till **sortering** och **fältprojektion** så att klienten kan begära ordning och begränsa vilka fält som returneras – utan att riskera läckage av icke-avsedda fält.

**Krav**
- Utöka `GET /students` och `GET /courses` med:
  - `sortBy` – accepterar endast en **whitelist** av fält (exempel: `title`, `instructor`, `credits`, `start_date` för courses; `last_name`, `first_name`, `date_of_birth` för students).
  - `order` – `asc` eller `desc`, default `asc`.
  - `fields` – kommaseparerad lista över tillåtna fält (t.ex. `title,credits`). Använd en **whitelist** och ignorera/flagga okända fält.
- Validera `sortBy`, `order`, `fields` med Zod:
  - `sortBy` → union av tillåtna fält.
  - `order` → union av `"asc" | "desc"`.
  - `fields` → splitta, trimma, validera mot whitelist.
- Returnera endast de fält som efterfrågas i `fields` (eller alla, om `fields` saknas).

**Begränsningar**
- Inga dynamiska evals/unsafe mapningar; endast whitelistade fält.
- Vid ogiltig `sortBy/order/fields` → **400** med detaljerat fel.

**Bedömning/acceptans**
- Sortering fungerar deterministiskt.
- `fields` returnerar enbart tillåtna fält, i stabil ordning.
- Oönskade fält kommer aldrig med i svaret.
</CollapsibleCard>

---

## Uppgift 3: `PUT` vs `PATCH` med `Partial<T>` + konsekvent felmodell
<CollapsibleCard title="PUT vs PATCH, Partial<T> & konsekventa fel" defaultOpen={false}>

**Mål**  
Gör det tydligt hur **PUT** (full ersättning) skiljer sig från **PATCH** (partiell uppdatering) och nyttja `Partial<T>` i valideringen. Säkra en **konsekvent felmodell** för båda.

**Krav**
- `PUT /students/:id` och `PUT /courses/:id`:
  - Kräv **fullständiga** objekt (alla nödvändiga fält) enligt era Zod-scheman.
  - Returnera **200** med det uppdaterade objektet.
  - Om resurs saknas → **404**; vid valideringsfel → **400**.
- `PATCH /students/:id` och `PATCH /courses/:id`:
  - Validera body mot `Partial<NewStudent>` / `Partial<NewCourse>` (alla fält optional).
  - Uppdatera **endast** fält som skickas in.
  - Returnera **200** med det uppdaterade objektet.
  - Om resurs saknas → **404**; vid valideringsfel → **400**.
- Felrespons ska följa **samma JSON-struktur** i båda fallen (t.ex. `{ error: "message", details?: [...] }`).

**Begränsningar**
- Ingen central `onError` nödvändig i lektion 3; hantera valideringsfel med `zValidator`-callback eller lokalt i route.
- Håll PUT/PATCH-semantiken strikt och dokumentera kort i README.

**Bedömning/acceptans**
- PUT kräver full payload; PATCH tillåter partiella uppdateringar.
- Felmeddelanden och statuskoder är konsekventa över endpoints.
- Typer och scheman matchar varandra utan TypeScript-varningar.
</CollapsibleCard>
