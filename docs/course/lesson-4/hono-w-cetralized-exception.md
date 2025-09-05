---
sidebar_position: 3
title: "Hono: Centralized Exception Hantering"
---

## Varför centralisera felhantering?

När vi bygger en större applikation vill vi undvika att sprida `try/catch`-block överallt i vår kod.  
Det blir snabbt repetitivt, svåröverskådligt och riskerar att vi behandlar fel på inkonsekventa sätt.

Genom att använda **Hono’s inbyggda error handler** kan vi:

- Flytta all felhantering till en central plats
- Göra koden renare och tydligare
- Säkerställa enhetliga felmeddelanden och HTTP-statuskoder
- Förhindra att oväntade fel kraschar servern

---

## Från lokalt `try/catch` till central hantering

Tidigare såg en route ut ungefär så här:

```ts
courseApp.put("/:id", courseValidator, async (c) => {
    const { id } = c.req.param();
    try {
        // ... existing code
        if (!course) {
            return c.json({ error: "Course not found" }, 404);
        }
        return c.json(course.data, 200);
    } catch (error) {
        console.error(error);
        return c.json({ error: "Failed to update course" }, 400);
    }
});
```

Här hanterar vi felen direkt i vår route. Det fungerar, men det gör koden mer rörig och upprepande.

---

## Med `HTTPException`

I stället kan vi kasta ett tydligt definierat fel när något går fel.  
Då ser vår route ut så här:

```ts
import { HTTPException } from "hono/http-exception";

courseApp.put("/:id", courseValidator, async (c) => {
  // ... existing code
  if (!course.data) {
    console.error("Course not found");
    throw new HTTPException(404, {
      res: c.json({ error: "Course not found" }, 404),
    });
  }
  return c.json(course.data, 200);
});
```

### Fördelar
- Vi behöver inte längre skriva `try/catch` i varje route  
- Alla fel skickas vidare till vår centraliserade error handler  
- Koden blir kortare och lättare att läsa
- Validator sköter all validering av data

---

## Global error handler i `index.ts`

I vår `index.ts` kan vi definiera en central felhanterare med `app.onError`:

```ts
import { HTTPException } from "hono/http-exception";

app.onError((err, c) => {
  // Alla explicita fel är HTTPExceptions
  if (err instanceof HTTPException) {
    return err.getResponse();
  }

  // Alla andra fel tolkas som interna serverfel
  console.error(err);
  return c.json({ error: "Internal server error" }, 500);
});
```

Nu fångas **alla fel** i applikationen här:

- Kända, definierade fel (`HTTPException`) skickas tillbaka med rätt statuskod  
- Oväntade fel blir konsekvent `500 Internal Server Error`  

---

## Reflektion

Med en centraliserad error handler:

- Blir vår kod **renare och mer konsekvent**  
- Blir det lättare att **debugga och logga** fel  
- Kan vi garantera att servern inte kraschar av oväntade problem