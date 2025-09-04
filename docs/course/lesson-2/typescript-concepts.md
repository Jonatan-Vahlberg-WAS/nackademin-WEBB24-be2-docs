---
sidebar_position: 2
title: Typescript koncept
en_title_slug: typescript-concepts
---

import YoutubeEmbed from "@site/src/components/_library/Youtube/YoutubeEmbed";

## Types

<YoutubeEmbed videoId="CVUb7oHSPDU" />

https://www.typescriptlang.org/docs/handbook/2/everyday-types.html

En typ (type) i TypeScript fungerar som en mer flexibel form av mall som kan användas för att beskriva former av objekt, funktioner eller andra typer av data. Typer definieras med nyckelordet "type" följt av ett namn och sedan en beskrivning av vilka egenskaper och metoder som måste finnas i det objekt som matchar typen. Precis som med interfaces definieras typer med stor bokstav, så **Person** istället för **person**.

Exempel på en typ-definition:

```tsx
type Person = {
  firstName: string;
  lastName: string;
  age: number;
  getFullName: () => string;
}

```

I detta exempel definieras en typ "Person" som innehåller fyra egenskaper (firstName, lastName, age) och en metod (getFullName) som returnerar en string.

En stor fördel med typer är deras flexibilitet. Typer kan kombineras och utökas på olika sätt för att skapa komplexa och återanvändbara typer.

### Typalias för enklare typer

Typer behöver inte vara fullständiga objekt. De kan vara alias för mer enkla typer, vilket kan öka läsbarheten och underlätta vid användning av komplexa typer.

Exempel på typalias:

```tsx
type Id = number | string;

type Status = 'active' | 'inactive' | 'pending';

type Result = "success" | "failure";

type ResultCode = 200 | 500;

const activeUsers: Id[] = [1, 2, 3, '4'];
const inactiveUsers: Id[] = [5, 6, 7, '8'];

function getUserStatus(id: Id): Status | Result {
    if(!activeUsers.includes(id) && !inactiveUsers.includes(id)) {
        return 'failure'
    }
    return activeUsers.includes(id) ? 'active' : 'inactive';
}

console.log(getUserStatus(1)); // active
console.log(getUserStatus(5)); // inactive
console.log(getUserStatus(9)); // Failure
```

I detta exempel skapar `ID` en typ som kan vara antingen ett nummer eller en sträng, och `Status` en typ som kan vara en av tre möjliga strängvärden.

---

## Optional

Typer kan också användas för att definiera optional egenskaper eller metoder genom att använda "?"-tecknet efter egenskapen eller metoden. Detta gör att den klass eller det objekt som använder typen kan välja att ha eller inte ha denna egenskap eller metod.

Exempel på en typ-definition med optional egenskaper:

```tsx
type Person = {
  firstName: string;
  lastName: string;
  age: number;
  getFullName: () => string;
  lastKnownAddress?: string;
}

```

[Type definition & Type alias uppgifter](https://www.notion.so/Type-definition-Type-alias-uppgifter-1f317cd1771581279bdcc843659e3094?pvs=21)

### Nested Types

Man kan också nästla typer genom att ersätta en typ med en annan typ.

Exempel:

```tsx
type Job = {
  title: string;
  salary: number;
}

type Person = {
  firstName: string;
  lastName: string;
  age: number;
  getFullName: () => string;
  lastKnownAddress?: string;
  job: Job;
}

```

###Extended Types

Typer kan också utökas för att skapa nya typer baserade på befintliga. Detta gör det möjligt att bygga upp komplexa typer steg för steg.

Exempel:

```tsx
type Person = {
  firstName: string;
  lastName: string;
  age: number;
  getFullName: () => string;
}

type Employee = Person & {
  job: Job;
}

```

I detta exempel utökas `Employee` från `Person` och lägger till en `job`-egenskap av typen `Job`.

Sammanfattningsvis erbjuder typer i TypeScript en kraftfull och flexibel metod för att definiera och hantera olika former av data, vilket gör det enklare att skriva robust och underhållbar kod.

---

[Types (Fördjupning)](/docs/course/lesson-2/advanced-type-concepts)


## Tuples

Tuples i TypeScript är en datatyp som låter oss definiera en array med ett förbestämt antal element med olika datatyper. Till skillnad från en vanlig array kan varje element i en tuple ha en annan datatyp.

exempel

```tsx
const myTuple: [string,number,boolean] = ["Jhon", 18, false]
```

Ett bättre exempel är **React** **useState** hook

```tsx
const [name, setName] = useState("")
```

**useState** i detta fallet returnerar vi en tuple av `[string, () ⇒ void]` den är igentligen mer complex än så men i grund o botten så är det så.

**Uppgift: Användning av Tuples i TypeScript**

```tsx
function calculateDistance(point1: Coordinate, point2: Coordinate): number {
    const [x1, y1] = point1;
    const [x2, y2] = point2;
    const dx = x2 - x1;
    const dy = y2 - y1;
    return Math.sqrt(dx * dx + dy * dy);
}
```

**Instruktioner:**

- **Skapa en tuple typ för Koordinater**
    - X och Y som nummer
- **Skapa en funktion som tar in en distans (anta att distansen färdad är inom en statisk intervall)**
    - funktionen retunerar en tuple av om det är möjligt att färdas den distansen med olika färd medel [isWalkable, isBikeable, isDriveable]
    - Om distansen är mer än 10 så ska den retunera en tuple av `[false, false, true]`
    - Om distansen är mer än 5 men mindre än 10 så ska den retunera en tuple av `[false, true, true]`
    - Om distansen är mindre än 5 så ska den retunera en tuple av `[true, true, true]`
- **Uppdatera funktionen med om resan är orimlig om den överskrider 25**

# Enums

Enums (uppräknade typer) i TypeScript är en typ av datatyp som används för att definiera en uppsättning namngivna konstanter med ett numeriskt värde. Enums kan användas för att definiera en uppsättning värden som är relaterade till varandra, t.ex. färgkoder eller veckodagar.

Enum i Typescript kand defineras med nyckelordet **enum**

exempel

```tsx
enum Color {
	Red,
	Blue,
	Green,
}
```

Enums kan också skapas med förbestämt värde. Om man inte har ett förbestämt värde så startar enums på 0.

```tsx
enum Weekdays {
	Monday = 1,
	Tuesday = 2
	...
	Sunday = 7
}

enum ErrorCode {
	NA = 0,
	Success = 200,
	Created = 201,
	ValidationError = 400,
	NotFound = 404,
}
```

Enums kan också ha string värden

```tsx
enum Move {
	Up = "UP",
	Down = "DOWN",
	Left = "LEFT",
	Right = "Right",
}
```

Enums kan också ha **computed value** I det här fallet har None värdet 0 och ReadWrite 1 eller 2 genom bitwise “|” 

```tsx
enum FileAccess {
	None,
	Read = 1,
	Write = 2,
	ReadWrite = Read | Write,
}
```

[Simulated request task (ENUM)](https://www.notion.so/Simulated-request-task-ENUM-1f317cd17715811fafdac4395c392b6e?pvs=21)

### Interface vs Type

Interfaces och typer är två sätt att definiera typer i TypeScript, men det finns några skillnader mellan dem som är värda att notera:

1. Syntax:
    1. **Interface** defineras `interface Person { }`
    2. **Type** defineras `type Person = {}`
2. Utbytbarhet:
En typ kan användas för att skapa en ny typ genom att kombinera befintliga typer, medan en interface inte kan användas på samma sätt. Detta gör typer mer utbytbara och lättare att återanvända i flera delar av koden.
    
    ```tsx
    type Person = {
      name: string;
      age: number;
    }
    
    type Address = {
      street: string;
      city: string;
      zipCode: string;
    }
    
    type PersonWithAddress = Person & Address;
    ```
    
3. Extendability:
En interface kan utökas av flera andra interfaces, medan en typ inte kan utökas på samma sätt. Detta gör interfaces mer användbara för att definiera komplexa datatyper som består av flera mindre delar.
    
    ```tsx
    interface Person {
    	name: string;
    	age: number;
    }
    
    interface Employee extends Person {
    	jobTitle: string;
    	salary: number
    }
    ```
    
4. Objekt vs unions:
Interfaces kan bara användas för att definiera objekttyper, medan typer kan användas för att definiera både objekttyper och unions (sammansatta typer av flera typer). Dem fungerar lite som enums med mer flexibilitet.
    
    ```tsx
    type Category = "FOOD" | "ElECTRONICS" | "MATERIALS"
    
    type Response = string | { data: string } | undefined
    ```
    
    ```tsx
    interface Snake {}
    interface Monkey {}
    interface Dog {}
    
    type Animal = Snake | Monkey | Dog
    ```
    
5. Användningsområde:
Generellt sett används interfaces för att definiera typer som relaterar till objekt, t.ex. användargränssnitt och API-responsstrukturer, medan typer oftare används för att definiera unions och andra enkla datatyper som inte är relaterade till objekt.

# Slutuppgift

Hitta ett API som ni kommer åt (eget, publikt eller som ni har nycklar till) skapa ett typescript projekt som kan hämta denna data och kan se till att det blir type safe. Ibland har API:er mycket mer info än det som vi vill använda då får man vara lite smart och skriva types för den datan vi vill åt

[Lista på öppna API](https://github.com/public-apis/public-apis) (Välj dem som har Auth No för helt publika)

Ett exempel https://openlibrary.org/dev/docs/api/

**Extra:**

Hitta sätt att manipulera datan eller göra jämförelser som kräver vetskap om hur datan ser ut.