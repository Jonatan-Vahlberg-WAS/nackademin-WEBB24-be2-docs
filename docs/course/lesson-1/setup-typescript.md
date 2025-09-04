---
sidebar_position: 2
title: Sätt upp TypeScript
description: Hur kan vi sätta upp en typescript-miljö i React?
toc_max_heading_level: 3
---

import YoutubeEmbed from "@site/src/components/_library/Youtube/YoutubeEmbed";

### Sätt upp TypeScript i node miljön

<YoutubeEmbed videoId="ZHKVVp9m5hk" />

Börja med att skapa en ny mapp och öppna den i VS Code.

```bash
mkdir typescript-project
cd typescript-project
```

Installera typescript och skapa en tsconfig.json fil.

```bash
npm init -y
npm install typescript --save-dev
npx tsc --init
```

Med detta har vi skapat en `tsconfig.json` fil som vi kan använda för att konfigurera TypeScript.

```json
{
  "compilerOptions": {
    "target": "ES2016",
    "module": "CommonJS",
    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true,
    "outDir": "./dist"
  },
  "include": ["./**/*"],
  "exclude": ["node_modules", "dist"],
  ...
}
```

Skapa en ny fil med namnet `index.ts` och skriv in följande kod:

```ts
console.log("Hello World");
```

Kör koden med följande kommando:

```bash
npx tsc
```

Du bör se en ny fil med namnet `index.js` i mappen.

```bash
node index.js
```

Du bör se utskriften "Hello World" i konsolen.

### Typescript watch

Om du vill att typescript ska kompilera koden automatiskt när du gör ändringar kan du använda följande kommando:

```bash
npx tsc --watch
```

och om du vill att koden också ska köras automatiskt kan du använda följande kommando:

```bash
npx tsc --watch --onSuccess "node dist/index.js"
```



### Sätt upp TypeScript i React (Vite)

<YoutubeEmbed videoId="2HwQ_tIkQK4" />

```bash
npx create-vite@latest my-app --template react-ts
```

### Konvertera ett react projekt till typescript

1. kör `npm install` för att installera alla dependencies.
2. Kör `npm run dev` för att starta dev-servern.
(Optional) Konfigurera din TS:

tsconfig.json
```json
{
  "compilerOptions": {
    "target": "ESNext",
    "useDefineForClassFields": true,
    "lib": ["DOM", "DOM.Iterable", "ESNext"],
    "allowJs": false,
    "skipLibCheck": true,
    "esModuleInterop": false,
    "allowSyntheticDefaultImports": true,
    "strict": true,
    "forceConsistentCasingInFileNames": true,
    "module": "ESNext",
    "moduleResolution": "Node",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "noEmit": true,
    "jsx": "react-jsx"
  },
  "include": ["src"],
  "references": [{ "path": "./tsconfig.node.json" }]
}
```

tsconfig.node.json

```json
{
  "compilerOptions": {
    "composite": true,
    "module": "ESNext",
    "moduleResolution": "Node",
    "allowSyntheticDefaultImports": true
  },
  "include": ["vite.config.ts"]
}
```