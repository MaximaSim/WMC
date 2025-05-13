import { Hono } from "hono";
import { serveStatic } from "hono/deno";

const app = new Hono();

// serve index.html
app.get("/", serveStatic({ path: "./static/index.html" }));

/* serve json
const arr = [1, 2, 3, 4, 5];
const obj = { name: "John", age: 30, city: "New York" };
app.get("/obj", (c) => c.json(obj));
app.get("/arr", (c) => c.json(arr));
app.get("rnd", (c) => c.json(Math.round(Math.random() * 50)));
app.get(
  "rnda",
  (c) =>
    c.json(
      new Array(10).fill().map((_) => Math.round(Math.random() * 50))
        .toSorted(),
    ),
);*/

app.get("/checkprim", (c) => {
  const num = Number.parseInt(c.req.query("num") || "0");
  if(isNaN(num)) {
    return c.json({ error: "ZAHL EINGEBEN HAB ICH GESAGT !" });
  }
  return c.json({result: isPrim(num)});
});

function isPrim(num: number) {
  if (num <= 1) return false;
  for (let i = 2; i < Math.sqrt(num); i++) {
    if (num % i == 0) return false;
  }
  return true;
}

const number = 7;


// serve all other static files
app.get("*", serveStatic({ root: "./static" }));

const port = 8000;

Deno.serve({
  
  port, 
  onListen: () => {
    console.log(`Server running at http://localhost:${port}/`);
  },
}, app.fetch);
