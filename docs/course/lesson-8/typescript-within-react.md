---
sidebar_position: 2
title: Typescript innom React 1
en_title_slug: typescript-within-react
---

import YoutubeEmbed from "@site/src/components/_library/Youtube/YoutubeEmbed";

<YoutubeEmbed videoId="01mYNQou17k" />

## För och nackdelar med Typescript i React

### **Fördelar**

Type-safeing ger en större säkerhet i den koden vi skriver då man ser problemen mycket tidigare oftast innan koden ens har körts

Det blir enklare för andra kodare att felsöka din kod och att sätta sig in i den.

### **Nackdelar**

Du måste ta tid att skriva gränssnittet, det tar tid men är värt det.

För små projekt så kan TS vara en för hög instats med tid

Vissa bibliotek stödjer inte fullt ut TypeScript, även ett populärt bibliotek som styled-components har fortfarande problem med TypeScript. Du finner dig själv tvingad att använda kommentaren // @ts-ignore i komponenter som är gjorda av styled-components.

# Sätt upp en Typescript miljö för React

1. `npm install -g create-react-app` Installera react om det inte är gjor
2. `npx create-react-app my-app --template typescript`  skapa en ny app med `--template typescript` som talar om att react projektet ska vara typat från början
3. `cd my-app` och `npm start`

Efter att man har satt upp en React miljö så kommer det finnas lite nya koncept att gå igenom

## .ts vs .tsx

**.ts**: Filnamn med tillägget .ts används för att ange att filen innehåller TypeScript-kod utan några React-specifika komponenter. Detta används vanligtvis när du arbetar med icke-React-relaterad TypeScript-kod, till exempel modeller, tjänster eller verktygsfunktioner.

.**tsx**: Filnamn med tillägget .tsx används för att ange att filen innehåller TypeScript-kod med React-komponenter. 

## Props

<YoutubeEmbed videoId="KUKT4L4ISF8" />

```tsx
import React from 'react';

interface MyComponentProps {
  name: string;
  age: number;
  isActive: boolean;
}

const MyComponent: React.FC<MyComponentProps> = ({ name, age, isActive }) => {
  return (
    <div>
      <h1>{name}</h1>
      <p>Age: {age}</p>
      <p>Active: {isActive ? 'Yes' : 'No'}</p>
    </div>
  );
}

export default MyComponent;
```

I exemplet ovan så definerar vi våra Props i en vanlig interface eller type men oftast interface sen för att MyComponent faktiskt ska ha rätt typ behöver vi wrappa den i FC eller FucntionalComponent

### React.FC

Genom att använda **`React.FC`** kan du ange både props och children som en del av typdefinitionen för en funktionskomponent. Det ger tydligare information om vilka props som förväntas och vilken typ av innehåll komponenten renderar.

(i mer avancerade fall så är FC inte längre rekomenderat men i början så är det inget fel med att använda FC) läs nedan för mer info
https://medium.com/raccoons-group/why-you-probably-shouldnt-use-react-fc-to-type-your-react-components-37ca1243dd13

**Bra exempel**✅

```tsx
//interface MyComponentProps

const MyComponent = (props: MyComponentProps) => {
	return (
	<div>
			<h1>{name}</h1>
      <p>Age: {age}</p>
      <p>Active: {isActive ? 'Yes' : 'No'}</p>
			{children} //TypeError: 
</div>
)
} 
```

**Sämre Exempel**  ❌

```tsx
//interface MyComponentProps

const MyComponent: React.Fc<MyComponentProps> = (props) => {
	return (
	<div>
			<h1>{name}</h1>
      <p>Age: {age}</p>
      <p>Active: {isActive ? 'Yes' : 'No'}</p>
			{children} //No Type error
</div>
)
} 
```

### Olika proptyper

<YoutubeEmbed videoId="zffqOVAfs8g" />

Här nedan har vi en lista av olika proptyper man kan stöta på vi kommer gå igenom några av dem.

```tsx
type AppProps = {
  message: string;
  count: number;
  disabled: boolean;
  /** array of a type! */
  names: string[];
  /** string literals to specify exact string values, with a union type to join them together */
  status: "waiting" | "success";
  /** an object with known properties (but could have more at runtime) */
  obj: {
    id: string;
    title: string;
  };
  /** array of objects! (common) */
  objArr: {
    id: string;
    title: string;
  }[];
  /** any non-primitive value - can't access any properties (NOT COMMON but useful as placeholder) */
  obj2: object;
  /** an interface with no required properties - (NOT COMMON, except for things like `React.Component<{}, State>`) */
  obj3: {};
  /** a dict object with any number of properties of the same type */
  dict1: {
    [key: string]: MyTypeHere;
  };
  dict2: Record<string, MyTypeHere>; // equivalent to dict1
  /** function that doesn't take or return anything (VERY COMMON) */
  onClick: () => void;
  /** function with named prop (VERY COMMON) */
  onChange: (id: number) => void;
  /** function type syntax that takes an event (VERY COMMON) */
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  /** alternative function type syntax that takes an event (VERY COMMON) */
  onClick(event: React.MouseEvent<HTMLButtonElement>): void;
  /** any function as long as you don't invoke it (not recommended) */
  onSomething: Function;
  /** an optional prop (VERY COMMON!) */
  optional?: OptionalType;
  /** when passing down the state setter function returned by `useState` to a child component. `number` is an example, swap out with whatever the type of your state */
  setState: React.Dispatch<React.SetStateAction<number>>;
	setState: (value: number) => void;
	children?: React.ReactNode; // best, accepts everything React can render
};
```

- **onClick ⇒** är en vanlig void funktion men för när man klickar på något kan också defineras
    - **onClick**(event: **`React.MouseEvent<HTMLButtonElement>`**): void;
        - Om den defineras på detta sätt så kommer vi inte kunna skicka in vilken funktion som helst utan bara en spesifik event handler
- **setState ⇒** `React.Dispatch<React.SetStateAction<number>>` den här är väldigt vanlig och vi kommer gå in mer i den när vi kommer till hooks.
    - **React.Dispatch -** är hur React definerar att en tillexempel setState action kan köras om vi definerar `setState: (n: number) ⇒ Void` så kan vi använda primitiv set state men inte complex så som `setState(state ⇒ state+1)`
    - React.setStateAction - Är en generisk action som tar en Typ av data som kommer kunna hanteras.
- **children ⇒** defineras som ovan om dem måste typas eller om datan inte stämmer överäns med grund typen av children
    - ex children: string skulle kunna användas för att säkerställa att vi endast wrappar text men i såfall får vi hålla oss till det.
    - children: React.ReactNode ⇒ säger att vi ska ha children men inte vad dem måste vara


### Code along extending pre-exsisting Types

Vi vill skapa en komponent **`SpoilerText`**  spoilerText ska fungera som en vanlig span element men den ska ha en state för att ändra textens visibility och den ska ha en prop av **spoilerColor** som andra texter inte har men den ska fortfarande kunna manipuleras så som en vanligt text element ska kunna. Eftersom vi inte bryr oss om children i detta fall så kan vi använda oss av

`SpoilerTextProps extends React.PropsWithChildren<{}>` som istortsätt säger att att vi vill kunna ha children men vill inte typa dem själva

`React.HTMLAttributes<HTMLSpanElement>` Talar om för vår props att vi vill ärva alla potentiella props från span taggen

# Hooks

<YoutubeEmbed videoId="iTttsl_N0G4" />

## useState



```tsx
//Interface User
...
...
const [user, useUser] = useState<User>() //either User or undefined
const [count, setCount] = useState(0) // inferred number not anything else
const [title, setTtitle] = useState<string>() //Because base value is undefined a typing is required
```

## useRef

useRef används på två sätt **read-only** eller **mutable.** Om man vill komma åt **DOM**

```tsx
const divRef = useRef<HTMLDivElement>(null);

useEffect(() => {
	if(divRef.current){
		divRef.current.clientOffsetX
	}
},[divRef])
```

Ovan skulle räknas som en read-only för att vi refererar till ett element såsom `<div>`

**Mutable**

```tsx
const intervalRef = useRef<number | null>(null);

useEffect(() => {
    intervalRef.current = setInterval(...);
    return () => clearInterval(intervalRef.current);
}, []);
```

Om vår ref är mutable måste vi ge den ett startVärde som stämmer överäns med vår typing i det här fallet `number` eller `null`

## Custom hooks

custom hooks fungerar som en vanlig function men för att få korrekt typing på arrayer så har vi ett litet type assertion knep

```tsx
import { useState } from "react";

export function useLoading() {
  const [isLoading, setState] = useState(false);
  const load = (aPromise: Promise<any>) => {
    setState(true);
    return aPromise.finally(() => setState(false));
  };
  return [isLoading, load] as const; // infers [boolean, typeof load] instead of (boolean | typeof load)[]
}
```

genom att asserta as const så kommer vi säkerställa att elementen alltid kommer i denna ordning och att deras typer är helt fast


# d.ts och /types

<YoutubeEmbed videoId="ZfbDHN4HfX4" />

Mappen "types" i ett projekt används vanligtvis för att organisera och lagra typdefinitioner (type declarations) för tredjepartsbibliotek eller för att skapa egna typdefinitioner för projektets specifika behov. Typdefinitioner beskriver den förväntade strukturen och typen av objekt, funktioner, variabler och andra element i koden.

[Slutuppgift: Väderapp](https://www.notion.so/Slutuppgift-V-derapp-1f317cd177158136822ad0ead8f4405f?pvs=21)