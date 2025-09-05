---
sidebar_position: 2
title: Typescript inom backend - Hono
---

Gå igenom ["Inför lektionen"](/docs/course/lesson-3/prerequisites) innan du börjar den här lektionen.

## Hur kommer vi använda Hono?

Vi kommer använda Hono för att skapa en REST API:

- Hantera courses
- Hantera students
- Med tiden kommer vi lägga till en databas med [Supabase](https://supabase.com/) för att hantera vår data den bygger på PostgreSQL.
- När det är på plats kommer vi hantera användare och autentisering.

## Idag

Idag kommer vi prata om hur vi använder typescript i backend. Vi kommer även fortsätta på vår Hono app och skapa en ny routes för att hantera students.

### Data

- [courses.json](./assets/courses.json)
- [students.json](./assets/students.json)

## Partial och extended types

```tsx
interface NewCourse {
  course_id?: string;
  title: string;
  instructor: string;
  credits: number;
  start_date?: string;
  end_date?: string;
}

interface Course extends NewCourse {
  course_id: string;
}
```

När vi hanterar komplexa typer så kan vi använda partial och extended types för olika ändamål.

Till exempel kan vi använda bastypen `NewCourse` när vi skapar en ny kurs, där `course_id` är valfri eftersom kursen ännu inte har ett genererat ID. När kursen väl är skapad använder vi den utökade typen `Course` som kräver att `course_id` finns med.

### Partial types

`Partial<NewCourse>` när vi skapar en variabel som är av typen `Partial`vad än den generiska typen är så kommer den att vara av typen `NewCourse` men med alla egenskaper som är optional.

```tsx
interface ExamplePartialCourse {
  title?: string;
  instructor?: string;
  credits?: number;
  ...
  // Alla egenskaper kommer att vara optional
}
```

Så Varför skulle vi använda det?

**Uppdatering av befintlig data**: När vi vill uppdatera en befintlig kurs behöver vi kanske bara ändra vissa fält, inte alla. Då är `Partial<Course>` perfekt:

```tsx
// Uppdatera bara titel och instruktör för en kurs
const updateCourse = (courseId: string, updates: Partial<Course>) => {
  // Vi behöver inte skicka med alla fält, bara de som ska uppdateras
};

// Användning
updateCourse("123", {
  title: "Advanced TypeScript",
  instructor: "Jane Doe",
});
```

**Formulärhantering**: När användare fyller i formulär steg för steg:

```tsx
// Användaren kan spara formuläret även om alla fält inte är ifyllda än
const saveDraftCourse = (draft: Partial<NewCourse>) => {
  // Spara utkast även om bara titel är ifylld
};

saveDraftCourse({ title: "Min nya kurs" }); // Fungerar perfekt!
```

**API-flexibilitet**: Gör våra API-endpoints mer flexibla genom att tillåta partiella uppdateringar istället för att kräva alla fält varje gång.


## Hono: Index
Vi går kort igenom en Hono index.ts fil. Har man suttit i Express så kommer det att vara mycket bekant.

```tsx
import { serve } from "@hono/node-server";
import { Hono } from "hono";
import dotenv from "dotenv";
import courseApp from "./routes/course.js";
import studentApp from "./routes/student.js";

dotenv.config();

const app = new Hono({
  strict: false
});

app.route("/courses", courseApp);
app.route("/students", studentApp);
serve(
  {
    fetch: app.fetch,
    port: Number(process.env.HONO_PORT) || 3000,
  },
  (info) => {
    console.log(`Server is running on http://localhost:${info.port}`);
  }
);
```
1. Vi importerar `serve` och `Hono` från `@hono/node-server` för att servera vår Hono-applikation. Detta görs endast i hono appar med `node` miljö. andra appar kommer se lite annorlunda ut.
2. Vi importerar `dotenv` för att läsa in våra environment variabler.
3. Vi importerar vår course app från `./routes/course.js`. Detta är en router som vi ska skapa i nästa steg.
4. Vi konfigurerar vår Hono-applikation med `strict: false` för att tillåta valfria egenskaper.
5. Vi skapar en ny route `/` som returnerar "Hello Hono!".
6. Vi routear vår course app till `/courses`.
7. Vi serverar vår Hono-applikation med `serve` till den angivna porten eller 3000 om ingen port har angetts.

## Skapa en ny `student.d.ts` fil

```tsx
interface NewStudent {
    student_id?: string;
    first_name: string;
    last_name: string;
    email: string;
    date_of_birth: string;
    major?: string;
    phone_number?: string;
    course_id: string;
}

interface Student extends NewStudent {
    student_id: string;
}
```

## Skapa en ny route `GET /students`

```tsx
studentApp.get("/", async (c) => {
    try {
        //? Database query simulation /data/students.json
        const data: string = await fs.readFile("src/data/students.json", "utf8");
        const students: Student[] = JSON.parse(data);
        return c.json(students);
    } catch (error) {
        return c.json([]);
    }
});
```

## Skapa en ny route `POST /students` som validerar våra data mot ett zod schema och skapar en ny student.

```tsx
studentApp.post("/", studentValidator, async (c) => {
    try {
        const student: NewStudent = c.req.valid("json");
        return c.json(student, 201);
    } catch (error) {
        console.error(error);
        return c.json({ error: "Failed to create student" }, 400);
    }
});
```

Här stöter vi på en ny funktion `studentValidator` som är en påbyggnad av Honos validator.

Zod är ett schema validations library för TypeScript. Vi använder den för att validera våra data mot vår schema.
`npm install zod @hono/zod-validator`

```tsx
import * as z from 'zod'
import { zValidator } from '@hono/zod-validator'

const schema = z.object({
    first_name: z.string("First name is required"),
    last_name: z.string("Last name is required"),
    email: z.email("Valid email is required"),
    date_of_birth: z.string("Valid date of birth is required"),
    student_id: z.string().optional(),
    major: z.string().optional(),
    course_id: z.string("Course ID is required"),
});


const studentValidator = zValidator("json", schema, (result, c) => {
    if(!result.success) {
        return c.json({ errors: result.error.issues }, 400);
    }
    if(!result.data.student_id) {
        result.data.student_id = `std_${Math.floor(1000 + Math.random() * 9000)}`;
    }
});
export default studentValidator;
```

Denna funktion validerar våra data mot ett zod schema och returnerar en felmeddelande om det inte matchar.
> **Värt att notera**
> vårt schema kommer blocka alla andra egenskaper som inte finns i vårt schema så se till att följa er Typ definition.

### Skapa en ny route `PUT /students/:id`
För put så kan vi använda samma validator som för post. Utöver det så ska vi tänka på att en PUT är igentligen bara en DETAIL GET och en POST samanslagna. Så vi validerar att det finns en student med den id som vi försöker uppdatera. Sedan ser vi också till att vi inte försöker uppdatera en student som inte finns eller en annan students id.
```tsx
...
const updatedStudent: Student = {
    ...body,
    student_id: id,
};
```

### Skapa en ny route `DELETE /students/:id`
DELETE är en DETAIL GET och sedan DELETE logik som vi inte kommer att behöva i detta stadie.
