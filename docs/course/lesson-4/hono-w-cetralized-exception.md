---
sidebar_position: 3
title: "Hono: centralized exception hantering"
---

Key notes
- We can move to a centralised exception handling by using Hono's error handler

- Go from this
```ts
courseApp.put("/:id", courseValidator, async (c) => {
    const { id } = c.req.param();
    try {
        // ... existing code
        if (!course) {
            return c.json({ error: "Course not found" }, 404);
        }
        return c.json(course.data, 200);
    } catch (error) {
        console.error(error);
        return c.json({ error: "Failed to update course" }, 400);
    }
});
```
- To this

```ts
import { HTTPException } from "hono/http-exception";
courseApp.put("/:id", courseValidator, async (c) => {
  //... existing code
  if (!course.data) {
    console.error("Course not found");
    throw new HTTPException(404, { res: c.json({ error: "Course not found" }, 404) });
  }
  return c.json(course.data, 200);
});
```
- Remove the try catch block and send specific errors to the error handler
- Have a central error handler in our `index.ts` file
```ts
import { HTTPException } from "hono/http-exception";

app.onError((err, c) => {
    // All explicit errors are HTTPExceptions
  if(err instanceof HTTPException) {
    return err.getResponse()
  }
  // All other errors are internal server errors until defined otherwise
  console.error(err);
  return c.json({ error: "Internal server error" }, 500);
});
```

- Not only do we clean up the code and make errors clearly defined but we also have a more robust error handling system that wont crash our server.