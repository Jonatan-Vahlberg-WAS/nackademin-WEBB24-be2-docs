---
sidebar_position: 3
title: Avancerade typkoncept
en_title_slug: advanced-type-concepts
---
## Union Types

Typer gör det också möjligt att skapa unioner, vilket innebär att en variabel kan ha en av flera typer. Detta kan vara användbart när en variabel kan innehålla olika typer av värden.

Exempel:

```tsx
type Pet =
  | { kind: 'dog'; name: string; breed: string }
  | { kind: 'cat'; name: string; age: number };

```

I detta exempel kan en variabel av typen `Pet` antingen vara en hund eller en katt med olika egenskaper för varje.

### Intersection Types

Intersection-typer kombinerar flera typer till en. En variabel av en intersection-typ måste uppfylla alla ingående typer.

Exempel:

```tsx
type Nameable = {
  name: string;
}

type Ageable = {
  age: number;
}

type Person = Nameable & Ageable;

```

I detta exempel måste en `Person`-typ ha både `name` och `age` egenskaper.

## Mapped Types

Mapped types tillåter att man skapar nya typer baserade på en existerande typ, där man kan modifiera dess egenskaper.

Exempel:

```tsx
type ReadonlyPerson = Readonly<Person>;

```

I detta exempel skapar `ReadonlyPerson` en typ baserad på `Person` där alla egenskaper är readonly.