---
sidebar_position: 6
title: Förberedelse inför nästa lektion
---

- Läs igenom materialet för [lektion 3](/docs/category/lektion-3)
- Bekanta er med Next.js genom att läsa:
  - [Next.js Documentation](https://nextjs.org/docs)
  - [Next.js Tutorial](https://nextjs.org/docs/app/getting-started)
- Skapa några komponenter och sidor i Next.js
- Exempelvis kan ni skapa en sida för en blogg post med en komponent för att visa en blogg post. (som sedan kan konverteras till en blogg i CMS:et)

## Uppgift Next.js + Storyblok  
- Clona [Starter koden](https://github.com/Jonatan-Vahlberg-WAS/nextjs-storyblok-starter) eller skapa ett nytt projekt i [Next.js](https://nextjs.org/)
- Koppla ihop projektet med Storyblok
- Skapa en blogg post blok med en
  - Bild, titel, ingress, innehåll, taggar, datum,
  - Författare som ett separat blok
    - Namn, bild, beskrivning
- Skapa en blogg sida i "content" med en komponent för att visa en blogg post i detalj eller i en lista.
- Skapa frontend kod som anknyter till blogg posten och författaren genom att rendera ut datan från storyblok.

Se till att ni har en grundläggande förståelse för hur ni kan använda er av Storybloks blockssystem.

## Sätt upp en NGrok server för att exponera din lokala server till internet. 
Om man ska göra grupparbeten framöver kommer detta vara en förutsättning då SB inte tillåter fler anslutningar än 1 på gratis planen.

- [NGrok guide](/docs/course/ngrok-guide)

## Uppgift 2

Hitta en företags sida / blogg sida eller annan sida som ni kan återskapa med Storyblok.

Först bör ni identifiera vilka delar av sidan som kan vara blocks och vilka av dem blocks som är återkommande (knappar, länkar, tabeller mm).

Sedan skapa alla blocks och en test sida i SB innan ni börjar koda.
