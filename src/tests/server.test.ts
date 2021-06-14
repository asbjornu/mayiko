import { superdeno } from "https://deno.land/x/superdeno@4.2.1/mod.ts";
import { DOMParser } from "https://deno.land/x/deno_dom/deno-dom-wasm.ts";
import app from "../server.ts";

Deno.test("root should contain EUR currency", async () => {
  await superdeno(app.handle.bind(app))
    .get("/")
    .expect(200)
    .expect("Content-Type", "text/html; charset=utf-8")
    .expect(response => {
      const doc = new DOMParser().parseFromString(response.text, "text/html")!;
      const currency = doc.querySelector(".currencies .eur a")!;
      return currency.textContent == "EUR";
    });
});

Deno.test("EUR should be chosen and include Austria", async () => {
  await superdeno(app.handle.bind(app))
    .get("/eur")
    .expect(200)
    .expect("Content-Type", "text/html; charset=utf-8")
    .expect(response => {
      const doc = new DOMParser().parseFromString(response.text, "text/html")!;
      const currency = doc.querySelector(".currencies .eur.chosen a")!;
      return currency.textContent == "EUR";
    })
    .expect(response => {
      const doc = new DOMParser().parseFromString(response.text, "text/html")!;
      const country = doc.querySelector(".countries .at .name")!;
      return country.textContent == "Austria";
    });
});

Deno.test("EUR with limit 5 and offset 20 should include Mayotte", async () => {
  await superdeno(app.handle.bind(app))
    .get("/eur?offset=20&limit=5")
    .expect(200)
    .expect("Content-Type", "text/html; charset=utf-8")
    .expect(response => {
      const doc = new DOMParser().parseFromString(response.text, "text/html")!;
      const currency = doc.querySelector(".currencies .eur.chosen a")!;
      return currency.textContent == "EUR";
    })
    .expect(response => {
      const doc = new DOMParser().parseFromString(response.text, "text/html")!;
      const country = doc.querySelector(".countries .yt .name")!;
      return country.textContent == "Mayotte";
    });
});
