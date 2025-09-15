---
title: Inför kursen
sidebar_position: 1
---

import YoutubeEmbed from "@site/src/components/\_library/Youtube/YoutubeEmbed";
import AlmGitFlow from "@site/src/components/alm/AlmGitFlow";
import BranchTypesGitFlow from "@site/src/components/alm/BranchTypesGitFlow";

Här är några viktiga koncept och resurser som är bra att känna till innan kursen.

## TypeScript Introduktion

TypeScript är ett superset av JavaScript som lägger till statisk typning. Här är några bra resurser för att komma igång:

- [TypeScript Official Documentation](https://www.typescriptlang.org/docs/)
- [TypeScript in 5 minutes](https://www.typescriptlang.org/docs/handbook/typescript-in-5-minutes.html)

<YoutubeEmbed videoId="BCg4U1FzODs" />

## Tips

### Dokumentation

- Vänj er vid att läsa dokumentation och tolka kod exempel.
  - Läs alltid “Getting started” + “API reference” först.
  - Kör och ändra små delar av exemplen för att verifiera att ni förstått.

### Kod

- Fokusera på att förstå koden och inte bara kopiera den.
  - Besvara för er själva: _Vad gör funktionen? Vilka antaganden? Kantfall?_

### GIT

- GIT är viktigt att använda och det är viktigt att skapa ett bra flöde exempelvis commit, push, pull, merge, etc se nedan för ett exempel.
  - Mini-flöde:
    ```bash
    git checkout main && git pull
    git checkout -b feature/password-reset
    # gör ändringar i små steg
    git add -A && git commit -m "feat(auth): add password reset endpoint"
    git push -u origin feature/password-reset
    # öppna PR, få review, mergea och ta bort branchen
    ```
  - Commits ska vara små, beskrivande och gärna följa konventioner (t.ex. feat/fix/docs).

<AlmGitFlow />
<BranchTypesGitFlow />

- Använd inte namngivna branches som "pelle" utan funktionalitets baserade branches som "feature/password-reset" eller "password-reset" om man inte giller git Flow.

  - Exempel: `feature/invite-codes`, `fix/user-timezone`, `hotfix/rate-limit`.
  - Gillar man inte flow namngivning kan man använda `invite-codes`, `user-timezone`, `rate-limit` var bara konsekvent.

- I grupparbeten är det viktigt att inte sprida fokus för mycket. Arbeta på en sak i taget istället för att försöka lösa flera olika problem samtidigt i samma branch.

- Om du märker att arbetet börjar glida iväg och du är på väg att lägga till något som inte direkt hör till uppgiften – skapa en ny branch för det. På så sätt blir arbetet mer överskådligt och lättare att följa för hela teamet.

- En Pull Request (PR) ska representera en tydlig och avgränsad förändring, t.ex. “Lägg till lösenordsåterställning” eller “Fix för timezone-buggen”. Om scopet ändras (t.ex. att du börjar ändra API-dokumentationen mitt i en feature-fix), då är det bättre att bryta ut det i en separat PR.

- Det här har flera fördelar:

- Enklare kodgranskning: Reviewers kan snabbt förstå vad som ändrats.

- Mindre risk: Mindre PR:er är lättare att testa och rulla tillbaka vid behov.

- Renare historik: Git-loggen blir tydlig, vilket underlättar felsökning i framtiden.

- Parallellt arbete: Teammedlemmar kan jobba på olika features utan att trampa varandra på tårna.

- Kort sagt: Håll varje branch och PR fokuserad på ett tydligt mål.

### AI

- Använd AI för att hjälpa er att **förstå** koden och inte bara kopiera den.

  - Ta AIn som ett verktyg och en personlig senior utvecklare. När man har skrivit kod fråga då "ser det här bra ut?" eller "vad finns det för förbättrings potential?"
  - När ni stöter på problem som ni inte förstår dumpa all context in i AIn det kan vara stack trace, kod, etc.

    exempel på hur man kan använda AI:
    ** felande kod**

    ```jsx
    // Felaktigt (med kommentar om vad som är fel)
    import { useEffect, useState } from "react";

    export default function Counter({ start }) {
      const [count, setCount] = useState(); // ❌ oinitierat; bör vara start eller 0

      useEffect(() => {
        setInterval(() => setCount(count + 1), 1000);
        // ❌ ingen cleanup → minnesläcka
        // ❌ använder 'count' från stale closure
      }, []); // ❌ saknade dependencies

      return (
        <button onClick={() => setCount(count + 1)}>{count.toFixed(0)}</button>
      );
      // ❌ toFixed på undefined om count saknar initialt värde
    }
    ```

    **stack trace**

    ```stack trace
    TypeError: Cannot read properties of undefined (reading 'email')
        at formatUser (/srv/app/services/formatUser.js:14:18)
        at /srv/app/controllers/UserController.js:42:22
        at processTicksAndRejections (node:internal/process/task_queues:95:5)

    # Vad är fel:
    # - formatUser får 'user' som undefined/null (t.ex. saknas i DB).
    # - Åtgärd: defensiv kontroll i formatUser + hantera 404 i controllern.
    ```

    **Så här kan man skriva en bra prompt för att fixa ett fel**

    ```
    Jag får följande fel i min Node-app vid GET /api/users/:id:

    TypeError: Cannot read properties of undefined (reading 'email')
    at formatUser (/srv/app/services/formatUser.js:14:18)
    at /srv/app/controllers/UserController.js:42:22

    Kontext:
    - Node 20, Express 4
    - Databas: Postgres via Prisma 5.x
    - Förväntat flöde: controller -> service(getUserById) -> formatUser -> return JSON
    - Relevant kod finns nedan (radnummer matchar stack trace).

    Vad jag redan testat:
    - Loggat 'user' innan formatUser → ibland null när id saknas.
    - Bekräftat att getUserById returnerar null vid miss.
    ```
### LIA

- **Ta hjälp av mentorer och andra utvecklare vid behov**  
  Börja alltid med att undersöka problemet själv: googla, läs dokumentation eller prova små kodexempel. När du ber om hjälp, förklara:  
  1. Vad du försökte göra.  
  2. Vad som gick fel.  
  3. Vad du redan testat.  
  → Det sparar tid och visar att du tagit egna initiativ.  

- **Ta inte med jobbet hem**  
  Håll balans mellan praktik och privatliv. Du lär dig bäst när du är fokuserad på plats och får återhämtning efteråt.  

- **Ställ frågor**  
  Våga fråga när något är oklart. Det signalerar nyfikenhet och vilja att utvecklas – ingen förväntar sig att du kan allt från början.  

- **Använd AI som stöd**  
  Exempel på bra användning:  
  - Kodgranskning: *“Ser den här lösningen rimlig ut?”*  
  - Förklaringar av kod eller felmeddelanden.  
  - Snabba exempel: tester, queries, syntax.  

  Tänk på:  
  - Jaga inte överdriven optimering – enkel och tydlig kod är oftast bäst.  
  - Vid refactoring eller ändringar med hjälp av AI: se till att du förstår syftet och lösningen.  
