---
title: 📆 Presentation av individuella uppgiften
sidebar_position: 100
---

import Scheduler from '@site/src/components/CourseOverview/Scheduler/Scheduler';

Välj en tid nedan att presentera din individuella uppgift.  

Din presentation ska innehålla både **demonstration av funktionalitet** och en **kort reflektion kring arbetet**.  
Om du siktar på **VG** ska du även visa de utökade delarna.

---

### Det som ska presenteras är:

#### 🔙 Backend
- Visa dina implementerade API-rutter (CRUD för Property och Booking).  
- Förklara hur autentisering och auktorisering fungerar.  
- Beskriv hur du hanterar relationerna mellan modellerna (User, Property, Booking).  
- Visa hur totalpris beräknas vid bokning.

#### 🖥 Frontend
- Demonstrera de viktigaste sidorna:  
  - Registrering & inloggning  
  - Hantering av properties (skapa, uppdatera, ta bort, lista)  
  - Bokningar (skapa, visa)  
- Beskriv hur frontend kommunicerar med backend.

#### 🌐 Deployment
- Visa att applikationen kan köras i en körbar miljö (lokalt eller deployad).  
- Förklara kort hur du satt upp projektet (t.ex. `npm run dev`, Docker, Vercel, Netlify, Railway eller liknande).

#### 📝 TypeScript
- Reflektera kring användningen av TypeScript:  
  - Vad har varit svårt?  
  - Hur har TypeScript påverkat ditt sätt att strukturera koden?  
  - Har det hjälpt dig undvika buggar eller underlättat integration mellan frontend och backend?

---

### ⭐ För den som siktar på VG
Utöver ovanstående ska du visa minst två av följande:

1. **Booking (lätt):**  
   - Endast inloggade användare kan skapa bokningar.  
   - Bokningen innehåller användaruppgifter och property.  
   - Totalpris beräknas automatiskt.  

2. **Property/Listing (medel):**  
   - Endast skaparen kan uppdatera eller ta bort en listing.  
   - En admin kan också ta bort listings.  

3. **ListingAgent (svårare):**  
   - Bokningen får först status `pending`.  
   - En `ListingAgent` måste acceptera eller avvisa bokningen.  
   - Status ändras därefter till `accepted` eller `rejected`.

---

## Boka tid

<Scheduler schedulerId="webb24-be-2-presentation" dates={["2025-11-6"]}/>
