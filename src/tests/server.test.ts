// @deno-types="https://unpkg.com/@types/mocha@7.0.2/index.d.ts"
import "https://unpkg.com/mocha@7.2.0/mocha.js";
import { expect } from "https://deno.land/x/expect@v0.2.9/mod.ts";
import { suit, describe } from './test_helper.ts';

suit(() => {
  describe("/", x => {
    it("should return 200 OK", () => x.expect(200));
    it("should return HTML", () => x.expect("Content-Type", "text/html; charset=utf-8"));
    it("should contain EUR currency", () => x.expect(".currencies .eur a").toEqual(e => e.textContent, "EUR"));
  });

  describe("/eur", x => {
    it("should return 200 OK", () =>  x.expect(200));
    it("should return HTML", () =>  x.expect("Content-Type", "text/html; charset=utf-8"));
    it("EUR should be chosen", () => x.expect(".currencies .eur.chosen a").toEqual(e => e.textContent, "EUR"));
    it("should include Austria", () => x.expect(".countries .at .name").toEqual(e => e.textContent, "Austria"));
  });

  describe("/eur?offset=20&limit=5", x => {
    it("should return 200 OK", () =>  x.expect(200));
    it("should return HTML", () =>  x.expect("Content-Type", "text/html; charset=utf-8"));
    it("EUR should be chosen", () =>  x.expect(".currencies .eur.chosen a").toEqual(e => e.textContent, "EUR"));
    it("should include Mayotte", () =>  x.expect(".countries .yt .name").toEqual(e => e.textContent, "Mayotte"));
  });
});
