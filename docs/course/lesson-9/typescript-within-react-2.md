---
sidebar_position: 2
title: Typescript innom React 2
en_title_slug: typescript-within-react-2
---

import YoutubeEmbed from "@site/src/components/_library/Youtube/YoutubeEmbed";

<YoutubeEmbed videoId="OI1zAju27SE" />

## Kort om context

### Varför context / redux / mobx

Context i React är ett kraftfullt verktyg för att hantera globalt **state** i en applikation. Tänk på det som en global variabel eller data som kan nås från alla komponenter i din React applikation.

1. **Global state-management**: När din applikation växer kan det bli svårt att hålla koll på och hantera state. Att skicka runt state genom "props" kan snabbt bli komplicerat. React Context låter oss hantera globalt state, vilket är state som är tillgängligt över hela applikationen. Till exempel kan användarinformation vara en del av globalt tillstånd eftersom många komponenter i din app kan behöva tillgång till den.
2. **Lokalt state-management** Man kan också wrappa en spesifik del av appen i context om det är så att vi inte kommer ha nytta av den utanför den komponenten. Detta är i regel bättre sålänge ditt state inte behövs någon anannstans
    
    ```tsx
    //Most likely Global
    const UserContext = React.createContext()
    
    //Most likely Local unless gallery permiates the entire app
    const galleryContext = React.createContext()
    ```
    
3. **Undvika "prop drilling"**: "Prop drilling" är när du behöver passera data genom flera nivåer av komponenter. Det kan bli rörigt och svårt att hantera. Med Context kan du dela data till alla "child" komponenter utan att behöva skicka props manuellt på varje nivå.
    
    ```tsx
    //DONT DO THIS
    const galleryContext = React.createContext()
    const gallery = React.useContext()
    
    <GalleryList featured={gallery.featured}/>
    	//...calls
    	<GalleryListItem featuredGallery={featured}/>
    		//...calls
    		<GalleryListItemContent featured={featured}/>
    
    ```
    
    Detta är  både svårläsligt men kan också orsaka problem och är svårhanterligt när vi behöver ändra något i ledet
    
    ```tsx
    //DO THIS INSTEAD
    const galleryContext = React.createContext()
    
    <GalleryList/>
    	//...calls
    	<GalleryListItem/>
    		//...calls
    		<GalleryListItemContent/>
    			const gallery = React.useContext() //Call it only when needed
    
    ```
    

## Context med typescript

När det kommer till context vad gällande typescript så utnyttjar vi typescripts styrkor dels för att hjälpa till med läsbarhet och för att få inteli-sense och varningar mycket tidigare. Context kan defineras på många olika sätt vissa bättre än andra men ibland handlar det mer om att ha en tydlig genomgående kodstruktur än att förhålla sig till nuvarande best-practices. Nedan kommer vi definera några olika sätt att skapa contexts i typescript.

### Mest grundläggande context

Detta är mer av ett glorifierat state som vi kan nå utan prop drilling för detta behöver vi definera

- En interface av state
- Ett initial state från den interfacen

```tsx
import React, { createContext, useContext, useState } from 'react';

// Definie a book object preferably in a separate d.ts file
interface Book {
	id: number;
	title: string;
	author: string
}

//Define shape of library state
interface LibraryState {
  books: Book[];
  selectedBookId?: number;
}

//Create initial state
const initialState: LibraryState = {
	books: [],
}

//Create the context
const LibraryContext = createContext<{
    state: LibraryState;
    setState: React.Dispatch<React.SetStateAction<LibraryState>>;
}>({
    state: initialState,
    setState: () => {},
});
```

Vi kommer strax gå igenom varför vi definerar ett initial state men först så ska vi definera och exportera en provider och en hook.

```tsx
//ProviderProps
interface LibraryProviderProps {
    children: React.ReactNode;
}

//Create the provider
const LibraryProvider: React.FC<LibraryProviderProps> = ({ children }) => {
    const [state, setState] = useState(initialState);
    return (
        <LibraryContext.Provider value={{ state, setState }}>
            {children}
        </LibraryContext.Provider>
    );
};

//Create the useLibrary hook
const useLibrary = () => {
    const context = useContext(LibraryContext);
    if (context === undefined) {
        throw new Error('useLibrary must be used within a LibraryProvider');
    }
    return context;
}

export { LibraryProvider, useLibrary };
```

I och med att initialState är typed sen tidigare så får state i detta fall en implicit type av LibraryState. För att underlätta skapar vi useLibrary som när vi vill koma åt vårt context state.

Här definerar vi **Book, LibraryState**, för att sedan skapa ett initial state, Varför gör vi det?

För att utan detta initialstate kommer typescript klaga på att contextet inte är korekt. Detta kan vi dock gå runt genom att använda **Partial** problemet med partial är att när vi väl ska använda state från vår context kommer den klaga på att vårt state inte nödvändigtvis är definerat

```tsx
//Create the context using partial state
const LibraryContext = createContext<Partial<{
    state: LibraryState;
    setState: React.Dispatch<React.SetStateAction<LibraryState>>;
}>>({});

//in another component
const library = useLibrary()

console.log(library.state.books)
//'library.state' is possibly 'undefined'.ts(18048)
```

## useReducer

För mera komplexa context senarion så kan det vara användbart att använda sig av **useReducer** istället för **useState**

```tsx
//interface Book

//interface LibraryState

//Define actions
type LibraryAction =
  | { type: 'ADD_BOOK'; book: Book }
  | { type: 'SELECT_BOOK'; bookId: number };

// Create reducer function
const libraryReducer = (state: LibraryState, action: LibraryAction): LibraryState => {
  switch (action.type) {
    case 'ADD_BOOK':
      return {
        ...state,
        books: [...state.books, action.book],
      };
    case 'SELECT_BOOK':
      return {
        ...state,
        selectedBookId: action.bookId,
      };
    default:
      return state;
  }
};

// Create the context
const LibraryContext = createContext<{
  state: LibraryState;
  dispatch: React.Dispatch<LibraryAction>;
}>({
  state: initialState,
  dispatch: () => {},
});

//interface LibraryProviderProps

// Create the provider
const LibraryProvider: React.FC<LibraryProviderProps> = ({ children }) => {
  const [state, dispatch] = useReducer(libraryReducer, initialState);
  return (
    <LibraryContext.Provider value={{ state, dispatch }}>
      {children}
    </LibraryContext.Provider>
  );
};
```

Vi definerar vår reducer med state och action och ser till att altid retunera ett fullständigt state.

Vi kan också wrappa våran dispatcher i mera semantiska functioner som nedan detta är tyck och smak men om vi har data från ett API eller en databas kan det vara smartare att göra på så sätt.

```tsx
const LibraryContext = createContext<{
  state: LibraryState;
  addBook: (book: Book) => void;
  selectBook: (bookId: number) => void;
}>({
  state: initialState,
  addBook: () => {},
  selectBook: () => {},
});

...

const LibraryProvider: React.FC<LibraryProviderProps> = ({ children }) => {
  const [state, dispatch] = useReducer(libraryReducer, initialState);

  const addBook = (book: Book) => {
    dispatch({ type: 'ADD_BOOK', book });
  };

  const selectBook = (bookId: number) => {
    dispatch({ type: 'SELECT_BOOK', bookId });
  };

  return (
    <LibraryContext.Provider value={{ state, addBook, selectBook }}>
      {children}
    </LibraryContext.Provider>
  );
};
```

På detta vis om addBook också tvingar oss att lägga till boken i våran databas kan vi göra det innan vi kör vår dispatch

# Third party

Många third party bibliotek har numera lagt fokus på att ta fram types redan från början men en del väljer att separera dessa i så kallade **@types libs.** Dessa libs börjar nästan altid med **@types/** men installeras som vanliga bibliotek.

Ett exempel på detta är Rich Text editor biblioteket [draft.js](https://draftjs.org/) som ger möjligheten att skapa en såkallad RTE dock så för att kunna använda den i typescript på ett typesafe och säkert sätt måste man hämta dess types

`npm i draft-js @types/draft-js @fortawesome/react-fontawesome @fortawesome/free-solid-svg-icons`
