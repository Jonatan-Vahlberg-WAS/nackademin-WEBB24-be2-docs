---
sidebar_position: 5
title: Uppgifter
---

## Gruppuppgift: Hantera studenter och kurser med Supabase Auth

Bygg vidare på din Hono-app och Supabase-integration.

### Mål

* Visa kurser och studenter (öppet läge med `optionalAuth`).
* Skapa/uppdatera/ta bort data **endast** för inloggade användare (`requireAuth`).
* Alla skrivoperationer ska respektera **RLS**.

### Del 1 – Kurser

1. **Läs**: `GET /courses` (öppet för alla).
2. **Skapa**: `POST /courses` (kräver inloggning).
3. **Uppdatera**: `PUT /courses/:id` (kräver inloggning).
4. **Ta bort**: `DELETE /courses/:id` (kräver inloggning).

> Tips: Återanvänd din `database/course.ts` och context-baserade `SupabaseClient`.

### Del 2 – Studenter

1. **Läs**: `GET /students` (öppet för alla).
2. **CRUD för inloggade**: `POST/PUT/DELETE` på `/students` (kräver inloggning).
3. Aktivera **RLS** på `students` och lägg policies i linje med `courses`.

---

## Extra uppgift: `profiles` (privat användardata)

Skapa en tabell `profiles` som kopplas 1–1 till användare i Supabase.
Endast **ägaren** ska kunna läsa/uppdatera **sin** rad.

### 1) Skapa tabell

```sql
-- Create a new enum type
CREATE TYPE user_role AS ENUM ('student', 'teacher', 'admin');

-- profiles kopplas till auth.users via user_id
create table if not exists public.profiles (
  user_id uuid primary key references auth.users(id) on delete cascade,
  full_name text,
  avatar_url text,
  bio text,
  updated_at timestamp with time zone default now(),
  role user_role default 'student'
);
```

### 2) Slå på RLS

### 3) Policies (ägare får läsa/uppdatera sin egen rad)

```sql
-- Endast ägaren får SELECT på sin rad
-- using (auth.uid() = user_id);

-- Endast ägaren får UPDATE på sin rad
-- using (auth.uid() = user_id)
-- with check (auth.uid() = user_id);

-- Endast ägaren får INSERT (skapa sin profil)
-- with check (auth.uid() = user_id);
```

> Notera: Vi delar **inte** ut publik SELECT på `profiles`. Endast inloggad ägare har access.

### 4) Hono-routes (exempel)

```ts
// src/routes/profile.ts
import { Hono } from "hono"
import { requireAuth } from "../middleware/auth.js"

export const profileApp = new Hono()

// Hämta inloggad användares profil
profileApp.get("/me", requireAuth, async (c) => {
  //TODO: Implementera
})

// Skapa/uppdatera inloggad användares profil
profileApp.put("/me", requireAuth, async (c) => {
  //TODO: Implementera

  // upsert med RLS: medskicka user_id = auth.uid()
})
```

### 5) Montera i `index.ts`:


## Testplan

1. **Anonym**:

   * `GET /courses` → OK.
   * `POST /courses` → 401 (kräver inloggning).
   * `GET /profile/me` → 401.
2. **Inloggad användare A**:

   * `POST /courses` → 201.
   * `PUT /profile/me` → 200, uppdaterar egen profil.
   * `GET /profile/me` → ser sin egen profil.
3. **Inloggad användare B**:

   * Försök läsa A\:s profil via `eq(user_id, A)` → 0 rader (policy blockerar).
   * Försök uppdatera A\:s profil → 0 rader/403 beroende på klient; ska ej gå igenom.

---