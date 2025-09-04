---
title: Promises i TypeScript
en_title_slug: promises-in-typescript
sidebar_position: 4
---

import YoutubeEmbed from "@site/src/components/_library/Youtube/YoutubeEmbed";

<YoutubeEmbed videoId="V8bOBbXC0SA" />

## Om Generics


Innan vi går in på Promises är det viktigt att förstå begreppet **generics** i TypeScript. Generics gör det möjligt att skapa komponenter (funktioner, klasser, typer) som kan arbeta med olika datatyper utan att tappa typkontroll. Man kan se det som "typer för typer" – vi kan skriva kod som är flexibel men ändå typad.

Exempel på en enkel generic-funktion:

```tsx
function identity<T>(value: T): T {
  return value;
}

const num = identity<number>(5); // num är av typen number
const str = identity<string>("hej"); // str är av typen string
```

## Promises och Generics

Promises i TypeScript är byggda med hjälp av generics. När vi skriver `Promise<T>`, betyder det att Promisen kommer att returnera ett värde av typen `T` när den är klar. Det gör att vi kan få typkontroll även för asynkrona operationer.

När vi arbetar med asynkrona operationer i JavaScript och TypeScript, använder vi ofta **Promises**. En Promise representerar ett värde som kanske inte är tillgängligt än, men som kommer att finnas i framtiden – till exempel resultatet av ett API-anrop.

## Grunderna i Promises

En Promise kan vara i tre tillstånd:

- **Pending** (väntar på resultat)
- **Fulfilled** (lyckades)
- **Rejected** (misslyckades)

Exempel på en Promise i TypeScript:

```tsx
function fetchData(): Promise<string> {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const fiftyFifty = Math.random() > 0.5;
      if (fiftyFifty) {
        resolve("Data hämtad!");
      } else {
        reject("Ett fel uppstod!");
      }
    }, 1000);
  });
}

fetchData().then((data) => {
  console.log(data); // "Data hämtad!"
}).catch((error) => {
  console.error(error); // "Ett fel uppstod!"
});
```

## Typning av asynkrona funktioner

I TypeScript är det viktigt att ange vilken typ av data en Promise kommer att returnera. Det gör vi genom att skriva `Promise<T>`, där `T` är typen på det värde som returneras när Promisen är fulfilled.

Exempel:

```tsx
function getUserName(userId: number): Promise<string> {
  // ...hämta användarnamn från API
  return Promise.resolve("Alice");
}
```

Om funktionen kan returnera olika typer, kan vi använda union types:

```tsx
function getUserStatus(userId: number): Promise<"active" | "inactive" | null> {
  // ...hämta status
  return Promise.resolve("active");
}
```

### Typning av API-respons

När vi hämtar data från ett API är det vanligt att vi inte vet exakt hur datan ser ut. Då kan vi skapa en typ eller ett interface som beskriver den data vi förväntar oss:

```tsx
type User = {
  id: number;
  name: string;
  email: string;
};

async function fetchUser(userId: number): Promise<User> {
  const response = await fetch(`/api/users/${userId}`);
  const data = await response.json();
  return data as User;
}
```

### När kan det vara bra att använda `any`?

Ibland vet vi inte exakt vilken typ av data vi kommer få tillbaka, till exempel om vi bygger en generisk funktion eller om API:et är dåligt dokumenterat. Då kan det vara motiverat att använda `any` – men det bör göras med försiktighet, eftersom vi då förlorar TypeScripts typkontroll.

Exempel:

```tsx
async function fetchAnything(url: string): Promise<any> {
  const response = await fetch(url);
  return response.json();
}
```

Detta kan vara användbart i början av utvecklingen, eller om vi snabbt vill prototypa något. Men när vi vet mer om datan, bör vi byta ut `any` mot en mer specifik typ.

## Exempel: Typning av Promise med Axios

När vi använder ett HTTP-bibliotek som **Axios** kan vi dra nytta av generics för att typa svaret från ett API. Axios har inbyggt stöd för generics, vilket gör det enkelt att ange vilken typ av data vi förväntar oss.

Anta att vi har en typ för en användare:

```tsx
type User = {
  id: number;
  name: string;
  email: string;
};
```

Så här kan vi typa ett Axios-anrop som hämtar en användare:

```tsx
import axios from "axios";

async function fetchUser(userId: number): Promise<User> {
  const response = await axios.get<User>(`/api/users/${userId}`);
  return response.data; // response.data är nu av typen User
}
```

Här anger vi `<User>` som generic till `axios.get`, vilket gör att TypeScript vet att `response.data` är av typen `User`. Det ger oss full typkontroll och autocompletion i resten av koden.

### Hantera null och typade errors med Axios

I verkliga API-anrop kan det hända att vi inte hittar någon användare, och då kan svaret vara `null`. Vi kan också vilja typa de fel som kan uppstå vid anropet.

Först kan vi utöka vår User-typ till att även tillåta null som svar:

```tsx
type User = {
  id: number;
  name: string;
  email: string;
};

// Promise<User | null> betyder att vi kan få tillbaka en User eller null
async function fetchUser(userId: number): Promise<User | null> {
  try {
    const response = await axios.get<User>(`/api/users/${userId}`);
    // Om användaren inte finns, returnera null (beroende på API)
    if (!response.data) {
      return null;
    }
    return response.data;
  } catch (error) {
    // Hantera fel längre ner
    throw error;
  }
}
```

### Typa errors från Axios

Axios kastar ett felobjekt som kan typas med `AxiosError` från biblioteket. Det gör att vi kan få typkontroll även på felhanteringen:

```tsx
import axios, { AxiosError } from "axios";

async function fetchUser(userId: number): Promise<User | null> {
  try {
    const response = await axios.get<User>(`/api/users/${userId}`);
    return response.data ?? null;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      // error är nu av typen AxiosError
      if (error.response?.status === 404) {
        // Användaren hittades inte
        return null;
      }
      // Hantera andra felkoder
      console.error("API-fel:", error.message);
    } else {
      // Något annat fel
      console.error("Oväntat fel:", error);
    }
    return null;
  }
}
```

Med denna typning får vi hjälp av TypeScript både när vi hanterar lyckade svar, null och olika typer av fel. Det gör koden säkrare och enklare att underhålla.

## Sammanfattning

- Använd `Promise<T>` för att typa asynkrona funktioner.
- Skapa typer eller interfaces för att beskriva API-respons.
- Använd `any` endast när det är nödvändigt, och byt ut det mot en specifik typ så snart som möjligt.
- Skapa förståelse för generics och använd dem för att skapa flexibla och typade komponenter.
- Använd third party libraries som Axios för att typa API-respons utifrån deras standardiserade anrop och svar med dina egna typer.
