import { superdeno } from "https://deno.land/x/superdeno@4.2.1/mod.ts";
import app from "../server.ts";

Deno.test("root should contain EUR currency", async () => {
  await superdeno(app.handle.bind(app))
    .get("/")
    .expect(200)
    .expect("Content-Type", "text/html; charset=utf-8")
    .expect(/EUR/);
});

Deno.test("EUR should include Austria", async () => {
  await superdeno(app.handle.bind(app))
    .get("/eur")
    .expect(200)
    .expect("Content-Type", "text/html; charset=utf-8")
    .expect(/EUR/)
    .expect(/Austria/);
});

Deno.test("EUR with limit 5 and offset 20 should include Mayotte", async () => {
  await superdeno(app.handle.bind(app))
    .get("/eur?offset=20&limit=5")
    .expect(200)
    .expect("Content-Type", "text/html; charset=utf-8")
    .expect(/Mayotte/);
});
