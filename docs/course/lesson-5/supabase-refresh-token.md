---
sidebar_position: 3
title: Supabase Refresh Token
---

## Hantera utgångna sessioner i Supabase

När en användare loggar in via Supabase får vi en cookie som är giltig i upp till **1 år**.  
I den finns två viktiga delar:

- **Access token** – används för att autentisera klienten mot Supabase. Den är bara giltig i **1 timme**.  
- **Refresh token** – används för att hämta en ny access token när den gamla har gått ut. Den gäller så länge cookien lever.

Eftersom access-tokenen löper ut så ofta behöver vi uppdatera vår **middleware** så att den automatiskt försöker förnya sessionen med hjälp av refresh-tokenen. Det gör att användaren kan förbli inloggad utan att märka när en token byts ut.

---

## Middleware med automatisk förnyelse

Här är ett exempel på hur vi kan uppdatera vår middleware för att hantera utgångna sessioner:

```ts
async function withSupabase(c: Context, next: Next) {
  if (!c.get("supabase")) {
    const sb = createSupabaseForRequest(c);
    c.set("supabase", sb);

    const {
      data: { user },
      error,
    } = await sb.auth.getUser();

    // Om access-tokenen har gått ut, försök att förnya sessionen
    if (error && error.code === "session_expired") {
      const { data: refreshData, error: refreshError } =
        await sb.auth.refreshSession();

      if (!refreshError && refreshData.user) {
        c.set("user", refreshData.user);
      } else {
        c.set("user", null);
      }
    } else {
      c.set("user", error ? null : user);
    }
  }

  return next();
}
````

---

## Så fungerar det steg för steg

1. **Skapa Supabase-instans** – en ny instans kopplas till den aktuella requesten.
2. **Hämta användaren** – vi försöker läsa ut användaren via `sb.auth.getUser()`.
3. **Förnya sessionen vid behov** – om access-tokenen har gått ut (`session_expired`), försöker vi förnya sessionen med `sb.auth.refreshSession()`.
4. **Sätt användaren i context** – lyckas förnyelsen sparar vi användaren i context, annars sätts värdet till `null`.
5. **Fortsätt till nästa steg** – middleware-kedjan fortsätter som vanligt.

---

## Varför detta är viktigt

Utan denna hantering skulle användaren loggas ut **varje timme**, eftersom access-tokenen slutar gälla då. Refresh-tokenen däremot är giltig i upp till **1 år** och gör det möjligt att förnya sessionen automatiskt.

Genom att lägga till denna logik kan vi erbjuda en **sömlös inloggning** där användaren förblir autentiserad under hela cookie-perioden – utan att behöva logga in igen.