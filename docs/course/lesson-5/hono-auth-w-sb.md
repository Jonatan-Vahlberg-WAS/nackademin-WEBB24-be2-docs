---
sidebar_position: 2
title: Hono Auth med Supabase
---



NOTES
- Check which auth providers that Supabase offers.
- activate mail and password authentication.
- add a new route to the Hono app that handles the authentication.
 - (optional) Add a auth validator similar to the one we used for the courses and students.
 - (optional) Add a new route to the Hono app that handles the authentication.
 - (optional) Add a database file `database/auth.ts` that handles the authentication. Login and register.
 ```ts
 authApp.post("/login", loginValidator, async (c) => {
  const { email, password } = c.req.valid("json");
  const response = await auth.login(email, password);
  if(response.error) {
    throw new HTTPException(400, {
      res: c.json({ error: "Invalid credentials" }, 400),
    });
  }
  return c.json(response.data.user, 200);
});

authApp.post("/register", registerValidator, async (c) => {
  const { email, password } = c.req.valid("json");
  const response = await auth.register(email, password);
  if(response.error) {
    if(response.error.code === "email_exists") {
      throw new HTTPException(409, {
        res: c.json({ error: "Email already exists" }, 409),
      });
    }
    throw new HTTPException(400, {
      res: c.json({ error: "Failed to register" }, 400),
    });
  }
  return c.json(response.data.user, 200);
});
 ```
 - (optional) Add diffrent supabase validations such as `email_exists`, `password_too_weak`, `email_not_verified`, etc.

 - Add Auth app to the Hono app.
 

 ## Row level authentication
 - Add row level authentication to the supabase database.
 `ALTER TABLE courses ENABLE ROW LEVEL SECURITY;`
 `ALTER TABLE students ENABLE ROW LEVEL SECURITY;`

 - Add the policy to the supabase database.
 ```sql
CREATE POLICY "Allow Access to Authenticated Users"
ON courses
FOR ALL
TO authenticated
USING (true);
 ```

 test by attempting to fetch either courses or students without being authenticated.

 MORE TO COME