import { superdeno } from "https://deno.land/x/superdeno@4.2.1/mod.ts";
import app from "../server.ts";

Deno.test("it should render EUR currency", async () => {
  await superdeno(app.handle.bind(app))
    .get("/")
    .expect(200)
    .expect("Content-Type", "text/html; charset=utf-8")
    .expect(/EUR/);
});

Deno.test("it should render EUR currency", async () => {
  await superdeno(app.handle.bind(app))
    .get("/eur")
    .expect(200)
    .expect("Content-Type", "text/html; charset=utf-8")
    .expect(/EUR/)
    .expect(/Austria/);
});
