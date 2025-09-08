---
sidebar_position: 4
title: Uppgifter
en_title_slug: tasks
---

import CollapsibleCard from "@site/src/components/_library/CollapsibleCard/TWCollapsibleCard";


<CollapsibleCard title="Uppgift 1 -  Typescript-React Theme Context">
Som en del av ett React TypeScript-projekt har du fått i uppdrag att implementera en kontext med hjälp av **`useState`**-hooken. Din kontext kommer att tillhandahålla ett tema-objekt som kan användas av olika komponenter i applikationen. Tema-objektet kommer att innehålla egenskaper som **`primaryColor`**, **`secondaryColor`** och **`fontFamily`**. Du behöver skapa kontexten, tillhandahålla ett standardtema och låta konsumenter komma åt och uppdatera temavärdet.

11. Skapa ett nytt TypeScript React-projekt.
12. Implementera en **`ThemeContext`** med hjälp av **`useState`**-hooken.
13. Tillhandahåll ett standardtema-objekt med värden för **`primaryColor`**, **`secondaryColor`** och **`fontFamily`**.
14. Skapa en **`ThemeProvider`**-komponent som omsluter rotkomponenten i din applikation och tillhandahåller temakontextens värde.
15. Skapa en **`useTheme`**-hook för att konsumera kontexten.
16. Implementera en komponent som heter **`ThemeDisplay`** som konsumerar temakontexten och visar tema-objektets egenskaper.
17. Skapa en annan komponent som heter **`ThemeToggler`** som konsumerar temakontexten och tillhandahåller ett sätt att uppdatera tema-objektet.
18. Testa din implementation genom att rendera **`ThemeDisplay`**- och **`ThemeToggler`**-komponenterna inuti **`ThemeProvider`**.
19. Verifiera att **`ThemeDisplay`**-komponenten korrekt visar de initiala temavärdena och att **`ThemeToggler`**-komponenten kan uppdatera temavärdena.
20. (Valfritt) Skapa en komponent som omsluter all temalogik och skapar en LocalContext som tillåter flera teman att vara aktiva samtidigt.

## Potential structure

```tsx
<ThemeProvider>
  <div>
    <h1>Theme Display</h1>
    <ThemeDisplay />
    <h1>Theme Toggler</h1>
    <ThemeToggler />
    <h1>Theme Resetter</h1>
    <ThemeResetter />
  </div>
</ThemeProvider>
```
</CollapsibleCard>

<CollapsibleCard title="Uppgift 2 -  Personal news feed using gnews.io">

Set up a personal news feed using gnews.io.

## LOGIC
1. Create a new TypeScript React project or use a existing one.
2. Input your API key in the .env file.
3. Create a service to fetch the news articles from the gnews.io API. you can explore the API [here](https://docs.gnews.io/).
4. Create a Context to store the news articles.
5. Add a array of keywords to render when opening the app. Sync this with local storage.
5. Add a action to add a new keyword to the array.
6. Add a action to remove a keyword from the array.
7. On load fetch the news articles from the gnews.io API.

## UI
1. Render the news articles for each keyword as cards.
2. Add a input field to add a new keyword.
3. Add a button to remove a keyword.
</CollapsibleCard>