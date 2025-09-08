---
sidebar_position: 1
title: UML-diagram
---

import YoutubeEmbed from "@site/src/components/_library/Youtube/YoutubeEmbed";

Läs på i förväg vi kommer gå igenom det men det är bra om alla har en grundläggadnde förståelse för vad UML är och vad use case och Sequence diagrams are

<YoutubeEmbed videoId="4emxjxonNRI" />

<YoutubeEmbed videoId="pCK6prSq8aw" />

https://www.lucidchart.com/pages/uml-use-case-diagram

https://www.lucidchart.com/pages/uml-sequence-diagram

https://www.websequencediagrams.com/

Läs igenom detta dokument noga och sätt dig in i UML språk och Koncept

- UML
    - Use case diagrams
    - Sequence Diagrams
    - Gruppuppgifter

UML, Unified Modeling Language, är ett standardiserat språk för att skapa modeller och visualiseringar av programvarusystem. Det används främst inom programvaruutveckling för att beskriva och dokumentera arkitekturen och designen av ett system. UML innehåller en rad olika diagramtyper som kan användas för att illustrera olika aspekter av ett system, inklusive:

- **Use Case (Användningsfallsdiagram)**: Visar användningsfall och de aktörer som interagerar med systemet.
- **Sequence Diagrams (Sekvensdiagram)**: Illustrerar hur objekt interagerar med varandra i en specifik tidsordning.
- mm

## Use Case diagrams

![Untitled](https://prod-files-secure.s3.us-west-2.amazonaws.com/59279b25-6549-4dfc-aa14-6256062e570b/cfc2c0a7-276e-4831-aa61-7ad7093c0023/Untitled.png)

Användningsfallsdiagram (Use Case diagrams) är en typ av diagram inom UML som används för att visualisera de funktioner som ett system erbjuder och hur dessa funktioner interagerar med användare eller andra system (kallade aktörer). Dessa diagram är särskilt användbara för att få en övergripande bild av ett systems funktionella krav och för att kommunicera dessa krav mellan utvecklare och intressenter.

### Syfte

- **Identifiera funktioner**: De visar vilka funktioner eller tjänster (användningsfall) systemet tillhandahåller.
- **Interaktion med aktörer**: De illustrerar hur externa aktörer (som användare eller andra system) interagerar med systemet.
- **Kommunikation**: De underlättar diskussion och förståelse för vad systemet ska göra.

### Vanliga koncept

1. **Aktör (Actor)**: Representerar en användare eller ett annat system som interagerar med det system som modelleras. Aktörer kan vara primära (direkt användare) eller sekundära (externa system eller tjänster).
2. **Användningsfall (Use Case)**: Beskriver en specifik funktion eller tjänst som systemet utför. Varje användningsfall representerar ett mål som en aktör vill uppnå genom att interagera med systemet.
3. **Relationer**:
    - **Association**: En linje som förbinder en aktör med ett användningsfall, vilket indikerar att aktören använder eller deltar i användningsfallet.
    - **Include**: En relation där ett användningsfall alltid använder funktionaliteten i ett annat användningsfall.
    - **Extend**: En relation där ett användningsfall kan utvidgas med ytterligare beteende under vissa villkor.
    - **Generalization**: Visar att en aktör eller ett användningsfall är en specialisering av en annan aktör eller användningsfall.

Genom att använda användningsfallsdiagram kan utvecklingsteam och intressenter enkelt förstå och diskutera systemets funktionalitet och hur olika användare kommer att interagera med det.

### Aktörer:

- **Kunder**:
    - **Web Customer**: Representerar alla typer av kunder.
        - **Registered Customer** och **New Customer**: Specifika typer av webbkunder.
- **Tjänster**:
    - **Authentication**: Verifieringstjänst.
    - **Identity Provider**: Extern tjänst för identitetsinformation.
    - **Credit Payment Service** och **PayPal**: Betaltjänster.

### Användningsfall:

- **View Items**: Bläddra bland produkter.
- **Make Purchase**: Välj och lägg till varor i kundvagnen.
- **Checkout**: Slutför köpet med betalning och leveransinformation.
- **Client Register**: Skapa ett nytt konto.

### Relationer:

- **Include**:
    - **Make Purchase** inkluderar **Checkout**, vilket innebär att checkout-processen alltid är en del av dessa funktioner.
- **Association**:
    - Kunder (Web Customer, Registered Customer, New Customer) interagerar med **View Items**, **Make Purchase**, **Checkout**, och **Client Register**.
    - **Checkout** använder tjänster som **Authentication**, **Credit Payment Service**, och **PayPal**.

## Sequence diagrams

![Untitled](https://prod-files-secure.s3.us-west-2.amazonaws.com/59279b25-6549-4dfc-aa14-6256062e570b/be556eb9-8ead-4a6a-9a21-487feb0f489a/Untitled.png)

Sekvensdiagram är en typ av UML-diagram som används för att visa hur objekt interagerar med varandra över tid. Det illustrerar flödet av meddelanden mellan objekt och den tidsmässiga ordningen i vilken dessa meddelanden utbyts. Här är några nyckelkoncept och syften med sekvensdiagram:

### Syfte

- **Visa interaktioner**: Illustrerar hur objekt och komponenter i ett system kommunicerar med varandra.
- **Tidsföljd**: Visar ordningen och tidpunkten för meddelanden som utbyts mellan objekt.
- **Detaljerad översikt**: Ger en detaljerad beskrivning av specifika funktioner eller scenarier i systemet.

### Vanliga koncept

1. **Objekt/Livslinje (Object/Lifeline)**:
    - Representerar deltagande objekt eller aktörer i interaktionen.
    - En livslinje är en vertikal streckad linje som sträcker sig från objektets rektangel.
2. **Meddelanden (Messages)**:
    - Visas som horisontella pilar mellan livslinjer.
    - Synchronous call: En pil med en solid linje och fylld spets som representerar ett anrop där avsändaren väntar på svar.
    - Asynchronous call: En pil med en solid linje och öppen spets som representerar ett anrop där avsändaren inte väntar på svar.
    - Return message: En streckad pil som visar att ett svar eller resultat returneras.
3. **Aktivitetsfält (Activation Bar)**:
    - En rektangel på en livslinje som visar när och hur länge ett objekt är aktivt eller utför en operation.
4. **Alt, Opt, Loop (Kontrollstrukturer)**:
    - **Alt (Alternativ)**: Visar alternativa vägar i flödet beroende på villkor.
    - **Opt (Optional)**: Visar ett valfritt block av sekvenser som bara utförs under vissa villkor.
    - **Loop**: Visar repetitiva sekvenser som upprepas ett antal gånger.
    
    ```lua
    title Bookloan
    
    actor User
    participant Search
    participant Loan
    participant LoanScheduluer
    participant Auth
    participant Database
    participant Loan order
    
    User->+Search: User searchessdestroy Search
    Search->-Loan: User requests loan
    alt User is authenticated
        Loan->+Auth: Validate user
        destroy Search
        Auth->+Database: Check availability
        destroy Loan
        alt Book is available
            Database->Database: Check db for book status
            Database->+Loan order: Place imediate loan
            Loan order-->User: Loan has been placed book on its way
        else Book is unavailable
            Database-->-User: tell user that the book is unavailable
            opt User can schedule a loan
                User->+LoanScheduluer: Schedule loan
                LoanScheduluer->-Loan order: Place loan order
                Loan order-->-User: Loan has been placed
                end
                
        end
    else User is not authenticated
        Auth-->-User: return error message and prompt user to register
        end
    ```