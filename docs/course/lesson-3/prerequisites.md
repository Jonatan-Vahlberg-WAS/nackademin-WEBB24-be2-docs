---
sidebar_position: 1
title: Inför lektionen
---
## Vad är Hono?
Hono är ett litet, snabbt och flexibelt webbramverk för JavaScript och TypeScript. Namnet "Hono" (炎) betyder flamma eller eld på japanska, vilket reflekterar ramverkets fokus på att vara blixtsnabbt och "glödhett".

Det är designat för att fungera i alla JavaScript-miljöer. Det innebär att du kan skriva din kod en gång och köra den på traditionella servrar med Node.js, moderna miljöer som Deno och Bun, och framförallt på så kallade edge-plattformar som Cloudflare Workers, Vercel Edge Functions och AWS Lambda.

### Varför Hono och inte Express?
Hono är ganska identiskt med Express men är designad för att vara snabbare och enklare att använda. Hono har en type-säker approach.

Express används inte i verkligheten och får inga fler uppdateringar. Hono backas av Cloudflare och är en av de snabbaste ramverken för att skapa API:er.

Hono är väldokumenterat och har en aktiv community. Vi kan också deploya hono simplet på vercel eller cloudflare.

## Hono: Getting started
[Hono: Getting started](https://hono.dev/docs)

### Uppgift sätt in er i Honos dokumentation och sätt upp en ny Hono app.
Använd er av Honos dokumentation för att sätta upp en ny Hono app. I det här stadiet kommer vi inte att använda en databas så ni får simulera en databas med en array. Samma med actions så som create, update, delete, etc.

**DATA**
- [courses.json](./assets/courses.json)
- [students.json](./assets/students.json)

Vi vill använda **typescript** för att:
- Skapa en `course.d.ts` fil som ska ha en typ för `course`.
- Skapa en ny route `GET /courses` som returnerar ett JSON med en array av courses.
- Skapa en ny route `GET /courses/:id` som returnerar ett JSON med en course.
- Skapa en ny route `POST /courses` som 'skapar' en ny course.

### Bonus uppgift: 
- Skapa en ny route `DELETE /courses/:id` som 'tar bort' en course.
- Skapa en ny route `PUT /courses/:id` som 'uppdaterar' en course.