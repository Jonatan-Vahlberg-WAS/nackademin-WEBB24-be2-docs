---
sidebar_position: 5
title: Uppgifter
---

import CollapsibleCard from "@site/src/components/\_library/CollapsibleCard/TWCollapsibleCard";

## Fördjupningsuppgifter - Hono med TypeScript

### Uppgift 1: Avancerad typhantering och validering

<CollapsibleCard title="Utökad kurs- och studenthantering" defaultOpen={false}>

**Mål:** Fördjupa förståelsen för TypeScript-typer, Partial types och Zod-validering.

**Del A: Utökade typer**

1. Skapa en ny typ `CourseWithStudents` som kombinerar `Course` med en array av `Student`
2. Implementera en `CourseStatistics` interface som innehåller:
   - `totalStudents: number`
   - `averageAge: number`
   - `majorDistribution: Record<string, number>`
   - `phoneNumberCoverage: number` (procent av studenter med telefonnummer)

**Del B: Avancerad validering**

1. Skapa ett Zod-schema för `CourseStatistics`
2. Implementera en validator som kontrollerar att:
   - Email-adresser är unika inom varje kurs
   - Studenter inte kan vara registrerade på samma kurs flera gånger
   - Kurser har minst 1 och max 50 studenter

**Del C: API-endpoints**

1. `GET /courses/:id/students` - Hämta alla studenter för en specifik kurs
2. `GET /courses/:id/statistics` - Beräkna och returnera kursstatistik
3. `POST /courses/:id/students` - Lägg till en student till en specifik kurs

</CollapsibleCard>

### Uppgift 2: Felhantering och middleware

<CollapsibleCard title="Robust API med felhantering" defaultOpen={false}>

**Mål:** Implementera professionell felhantering och middleware i Hono.

**Del A: Custom feltyper**

1. Skapa interfaces för olika feltyper:
   - `ValidationError`
   - `NotFoundError`
   - `DuplicateError`
   - `DatabaseError`

**Del B: Error middleware**

1. Implementera en global error handler som:
   - Loggar fel med olika nivåer (error, warn, info)
   - Returnerar strukturerade felmeddelanden
   - Döljer känslig information i production

**Del C: Logging middleware**

1. Skapa middleware som loggar:
   - Request method, URL och timestamp
   - Response status och svarstid
   - User-agent och IP-adress (simulerad)

**Del D: Rate limiting**

1. Implementera enkel rate limiting middleware som:
   - Begränsar antal requests per minut per IP
   - Returnerar 429 Too Many Requests vid överträdelse

</CollapsibleCard>

### Uppgift 3: Avancerade query-parametrar och filtrering

<CollapsibleCard title="Sök- och filtreringsfunktionalitet" defaultOpen={false}>

**Mål:** Bygga flexibla API-endpoints med sök- och filtreringsmöjligheter.

**Del A: Query-parametrar för kurser**
Utöka `GET /courses` med stöd för:

- `?instructor=namn` - Filtrera på instruktör
- `?credits_min=5&credits_max=10` - Filtrera på poängintervall
- `?start_date_after=2025-09-01` - Kurser som börjar efter datum
- `?department=Computer Science` - Filtrera på avdelning
- `?sort=title,credits,-start_date` - Sortering (- för descending)

**Del B: Query-parametrar för studenter**
Utöka `GET /students` med stöd för:

- `?major=Software Engineering` - Filtrera på huvudämne
- `?age_min=20&age_max=25` - Filtrera på åldersintervall
- `?has_phone=true` - Studenter med/utan telefonnummer
- `?course_id=PGSQL-101` - Studenter på specifik kurs

**Del C: Sökfunktionalitet**

1. Implementera `GET /search?q=term&type=courses|students|all`
2. Sök ska matcha i:
   - Kursnamn, instruktör, beskrivning
   - Studentnamn, email, huvudämne

**Del D: Paginering**
Lägg till paginering för alla list-endpoints:

- `?page=1&limit=10`
- Returnera metadata: `totalItems`, `totalPages`, `currentPage`, `hasNext`, `hasPrev`

</CollapsibleCard>

### Uppgift 4: Relationer och avancerade operationer

<CollapsibleCard title="Hantering av relationer mellan kurser och studenter" defaultOpen={false}>

**Mål:** Implementera mer komplexa affärslogik-operationer.

**Del A: Kursregistrering**

1. `POST /students/:id/enroll` - Registrera student på kurs

   - Validera att kursen finns och har plats
   - Kontrollera att studenten inte redan är registrerad
   - Hantera väntelista om kursen är full

2. `DELETE /students/:id/courses/:courseId` - Avregistrera student från kurs

**Del B: Batch-operationer**

1. `POST /courses/batch` - Skapa flera kurser samtidigt
2. `PUT /students/batch` - Uppdatera flera studenter samtidigt
3. Implementera transaktionsliknande logik (allt eller inget)

**Del C: Rapporter och exports**

1. `GET /reports/course-enrollment` - Rapport över kursregistreringar
2. `GET /reports/student-overview` - Översikt av alla studenter
3. `GET /export/courses.csv` - Exportera kurser som CSV
4. `GET /export/students.json` - Exportera studenter som JSON

**Del D: Avancerade valideringar**

1. Validera att studenter inte kan registrera sig på kurser som krockar i tid
2. Kontrollera att studenter har rätt förkunskaper för avancerade kurser
3. Implementera affärsregler som "max 3 kurser per student per termin"

</CollapsibleCard>

### Uppgift 5: Testing och dokumentation

<CollapsibleCard title="Professionell utvecklingspraktik" defaultOpen={false}>

**Mål:** Implementera testing och automatisk API-dokumentation.

**Del A: Unit tests**

1. Skriv tester för alla validators
2. Testa utility-funktioner för:
   - Åldersberäkning från födelsedatum
   - Statistikberäkningar
   - Sök- och filtreringsfunktioner

**Del B: Integration tests**

1. Testa alla API-endpoints
2. Testa felhantering och edge cases
3. Testa middleware-funktionalitet

**Del C: OpenAPI/Swagger dokumentation**

1. Installera `@hono/swagger-ui`
2. Generera automatisk API-dokumentation
3. Lägg till beskrivningar och exempel för alla endpoints

**Del D: Performance testing**

1. Implementera enkla performance-tester
2. Mät svarstider för olika endpoints
3. Identifiera flaskhalsar i koden

</CollapsibleCard>

### Bonusuppgift: Deployment och miljöhantering

<CollapsibleCard title="Produktionsklart API" defaultOpen={false}>

**Mål:** Förbereda applikationen för produktion.

**Del A: Miljöhantering**

1. Skapa separata konfigurationsfiler för development/production
2. Implementera secrets-hantering för känsliga värden
3. Lägg till health check endpoint (`GET /health`)

**Del B: Deployment**

1. Skapa Dockerfile för containerisering
2. Skriv deploy-script för Vercel eller Cloudflare Workers
3. Implementera CI/CD pipeline (GitHub Actions)

**Del C: Monitoring**

1. Lägg till metrics-endpoints
2. Implementera enkel monitoring av API-prestanda
3. Skapa alerts för kritiska fel

</CollapsibleCard>

**Tips:** Börja med uppgift 1 och arbeta dig uppåt. Varje uppgift bygger på kunskaper från föregående uppgifter.
