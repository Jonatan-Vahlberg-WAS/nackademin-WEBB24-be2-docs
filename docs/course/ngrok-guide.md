---
sidebar_position: 10
title: Hur man sätter upp en NGrok server för att forworda sin lokala server till internet. (var försiktig med detta)
hide_table_of_contents: true
---

## Vad är NGrok?

NGrok är ett verktyg som låter dig testa dina webbapplikationer lokalt utan att behöva publicera dem på internet. Det gör det enkelt att testa dina applikationer i olika miljöer och fånga fel som kan uppstå när du publicerar dem.

## Hur man sätter upp NGrok

Skapa ett konto på [NGrok](https://ngrok.com/) koppla med mail eller GitHub.
Välj intresset "sharing local apps without deploying" och att ni går mot development.

Installera NGrok på din dator.

### MAC

```bash
brew install ngrok
```

Lägg till din authtoken på datorn

```bash
ngrok config add-authtoken <your-authtoken>
```

Starta din server lokalt om du inte redan har gjort det.

Starta NGrok.

```bash
ngrok http https://localhost:3000/
```


### WINDOWS

For the most secure experience, use the Microsoft Store to install ngrok. This type of installation is fully supported by Windows, ensuring automatic updates and compatibility with app management tools.

installera ngrok från Microsoft Store.

lägg till din authtoken på datorn

```bash
ngrok config add-authtoken <your-authtoken>
```

Starta NGrok.

```bash
ngrok http https://localhost:3000/
```

Välj den den forwardade adressen och kopiera den till din webbläsare eller direkt till din storyblok app.

`https://<your-ngrok-id>.ngrok-free.app/` viktigt med slash i slutet.

om allting fungerar så ska du kunna se din lokala server i andras webbläsare.

## Tips

- NGrok är gratis men det finns en gräns på 5000 anslutningar per månad.
- NGrok är inte säkert att använda i produktion.
- **NGrok är inte säkert att använda i produktion.**