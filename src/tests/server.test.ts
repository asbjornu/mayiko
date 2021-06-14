import { superdeno } from "https://deno.land/x/superdeno@4.2.1/mod.ts";
import { DOMParser } from "https://deno.land/x/deno_dom@v0.1.12-alpha/deno-dom-wasm.ts";
// @deno-types="https://unpkg.com/@types/mocha@7.0.2/index.d.ts"
import "https://unpkg.com/mocha@7.2.0/mocha.js";
import { expect } from "https://deno.land/x/expect@v0.2.9/mod.ts";
import app from "../server.ts";

mocha.setup({ ui: "bdd", reporter: "spec" });

function onCompleted(failures: number): void {
  if (failures > 0) {
      Deno.exit(1);
  } else {
      Deno.exit(0);
  }
}

describe("/", () => {
  it("should return 200 OK", async () => await superdeno(app.handle.bind(app)).get("/").expect(200));
  it("should return HTML", async () => await superdeno(app.handle.bind(app)).get("/").expect("Content-Type", "text/html; charset=utf-8"));
  it("should contain EUR currency", async () => {
    await superdeno(app.handle.bind(app))
      .get("/")
      .expect(response => {
        const doc = new DOMParser().parseFromString(response.text, "text/html")!;
        const currency = doc.querySelector(".currencies .eur a")!;
        return expect(currency.textContent).toEqual("EUR");
      });
  });
});

describe("/eur", () => {
  const url = "/eur";

  it("should return 200 OK", async () => await superdeno(app.handle.bind(app)).get(url).expect(200));
  it("should return HTML", async () => await superdeno(app.handle.bind(app)).get(url).expect("Content-Type", "text/html; charset=utf-8"));
  it("EUR should be chosen", async () => {
    await superdeno(app.handle.bind(app))
      .get(url)
      .expect(response => {
        const doc = new DOMParser().parseFromString(response.text, "text/html")!;
        const currency = doc.querySelector(".currencies .eur.chosen a")!;
        return expect(currency.textContent).toEqual("EUR");
      });
  });
  it("should include Austria", async () => {
    await superdeno(app.handle.bind(app))
      .get(url)
      .expect(response => {
        const doc = new DOMParser().parseFromString(response.text, "text/html")!;
        const country = doc.querySelector(".countries .at .name")!;
        return expect(country.textContent).toEqual("Austria");
      });
  });
});

describe("/eur?offset=20&limit=5", () => {
  const url = "/eur?offset=20&limit=5";

  it("should return 200 OK", async () => await superdeno(app.handle.bind(app)).get(url).expect(200));
  it("should return HTML", async () => await superdeno(app.handle.bind(app)).get(url).expect("Content-Type", "text/html; charset=utf-8"));

  it("EUR should be chosen", async () => {
    await superdeno(app.handle.bind(app))
      .get(url)
      .expect(response => {
        const doc = new DOMParser().parseFromString(response.text, "text/html")!;
        const currency = doc.querySelector(".currencies .eur.chosen a")!;
        return expect(currency.textContent).toEqual("EUR");
      });
  });
  it("should include Mayotte", async () => {
    await superdeno(app.handle.bind(app))
      .get(url)
      .expect(response => {
        const doc = new DOMParser().parseFromString(response.text, "text/html")!;
        const country = doc.querySelector(".countries .yt .name")!;
        return expect(country.textContent).toEqual("Mayotte");
      });
  });
});

mocha.run(onCompleted).globals(["onerror"])
