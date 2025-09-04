---
sidebar_position: 3
title: Vad är Typescript?
description: Vad är Typescript och hur skiljer det sig från Javascript?
---

import YoutubeEmbed from "@site/src/components/_library/Youtube/YoutubeEmbed";

## Sätta upp en TypeScript miljö

<a href="/docs/course/lesson-1/setup-typescript" target="_blank">Hur sätter man upp en typescript miljö?</a>

## Introduktion till Typescript

### Vad är TYPE i Typescript

Typing (typning) är ett sätt att definiera vilken typ av data som variabler och funktioner ska hantera. Det hjälper oss att specificera vilken data som ska gå in i och ut ur våra funktioner.

### Primära datayper

<YoutubeEmbed videoId="KiwHNmqdB7E" />

1. **Number:** För siffror (både heltal och decimaler)
2. **String:** För text (mellan citattecken)
3. **Boolean:** För true/false värden
4. **Undefined:** När en variabel är deklarerad men saknar värde
5. **Null:** För att markera att något medvetet saknas
6. **Symbol:** För unika identifierare

<aside>
💡 **Läs mer**

[Läs mer om primära datatyper i TypeScript](https://www.typescriptlang.org/docs/handbook/2/everyday-types.html#the-primitives-string-number-and-boolean) ([JavaScript With Syntax For Types.](https://www.typescriptlang.org/docs/handbook/2/everyday-types.html)) ([TypeScript Express](https://www.typescript.express/types/primitive_types)) ([Gibbok](https://gibbok.github.io/typescript-book/book/primitive-types/)).

</aside>

### Implicit typing

I JavaScript kan variabler byta typ fritt. Detta kallas implicit typning. Här är ett exempel:

```jsx
const name = "Jonatan Vahlberg";
const ocupation = "Developer";
let timesClimedMountEverest = 0;

let teacherId = "1412"; // Börjar som en sträng
teacherId = teacherId.split(""); // Blir en array
teacherId = parseInt(teacherId.join("")); // Blir ett nummer
```

I TypeScript är typning striktare. Koden körs fortfarande, men vi får varningar när vi försöker byta typ:

```tsx
const name = "Jonatan Vahlberg"; // String
const ocupation = "Developer"; // String
let timesClimedMountEverest = 0; // Number

let teacherId = "1412"; // String
teacherId = teacherId.split(""); // ERROR: Kan inte ändra till string[]
teacherId = parseInt(teacherId.join("")); // ERROR: Kan inte ändra till number
```

<aside>
💡 **Läs mer**

Läs mer om implicit typing i TypeScript ([JavaScript With Syntax For Types.](https://www.tutorialspoint.com/typescript-implicit-typing#:~:text=Implicit%20typing%20is%20a%20feature,%2C%20and%20less%20error%2Dprone.)).

</aside>

### Explicit typing

TypeScript låter oss bestämma typerna själva. Detta gör koden tydligare och säkrare:

```tsx
const fullName: string = "Jonatan Vahlberg";
const courses: string[] = ["Typescript", "HTML/CSS"];
const courseIds: number[] = [986, 993];
const hourOfTheDay = new Date().getHours(); // Automatiskt number
const isHungry: boolean = hourOfTheDay > 11 && hourOfTheDay < 13;
```

**Övning:** Vilka av exemplen ovan behöver egentligen explicit typing?

**Testa dig själv:** Vad händer i koden nedan?

```html
...
<input id="age-input" type="number" />
...
<!-- Användaren sätter värdet till 18 -->
```

```tsx
const userIsEighteen = () => {
  const numberInput: HTMLInputElement = document.getElementById("age-input") as HTMLInputElement
  if (!numberInput) return false;
  const age = numberInput.value;
  return age === 18;
};

userISEighteen(); // Vad blir resultatet?
```

### Explicit typing challenges

[Grundläggande typningsutmaningar](https://www.notion.so/Grundl-ggande-typningsutmaningar-1f317cd1771581f8b8f9d0b060c5113a?pvs=21)

<aside>
💡 **Läs mer**
[Explicit typing in typescript](https://www.geeksforgeeks.org/how-to-declare-variables-with-explicit-types-in-typescript/)

</aside>

## Funktioner i typescript

<YoutubeEmbed videoId="tEOZ4E_vx2Q" />


Funktioner är byggstenar i TypeScript. De tar emot data (argument), gör något med den, och returnerar ett resultat.

### Enkel funktion

```tsx
function generateIntroduction(name: string, age: number): string {
  return `Hello my name is ${name} and i am ${age} years old.`;
}
```

### Funktioner utan return

```tsx
function multiply(a: number, b: number): number {
  console.log(a * b);
  // ERROR: Funktionen måste returnera ett värde
}
```

### Funktioner med olika returtyper

```tsx
function calculateArea(
  shape: "CIRCLE" | "SQUARE",
  dimension: number
): number | string {
  switch (shape) {
    case "CIRCLE":
      if (dimension <= 0) return "Ogiltig dimension";
      return Math.PI * dimension * dimension;
    case "SQUARE":
      if (dimension <= 0) return "Ogiltig dimension";
      return dimension * dimension;
    default:
      return "Ogiltig form";
  }
}
```

## Any-typen

<YoutubeEmbed videoId="HzY2ZTFlJIY" />

Ibland behöver vi hantera data där vi inte vet typen. Då kan vi använda `any`:

```tsx
type User = {
    id: string
}

function saveUser(user: User) {
    console.log("Saving user with id ", user.id)
}

const requestUserDataFromApi = async (id: string): Promise<any> => {
  return {
    data: {
      id,
    },
  };
};

requestUserDataFromApi(id)
  .then(response => {
    const userData: any = response.data;
    saveUser(userData); // Fungerar eftersom userData kan vara av vilken typ som helst
  })
  .catch(error => { ... });
```
