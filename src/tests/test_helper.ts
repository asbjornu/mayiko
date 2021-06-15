import {
  IResponse,
  superdeno,
  Test,
} from "https://deno.land/x/superdeno@4.2.1/mod.ts";
import { DOMParser } from "https://deno.land/x/deno_dom@v0.1.12-alpha/deno-dom-wasm.ts";
import type { Application } from "https://deno.land/x/oak@v6.0.1/mod.ts";
import type { Element } from "https://deno.land/x/deno_dom@v0.1.12-alpha/deno-dom-wasm.ts";
import { expect } from "https://deno.land/x/expect@v0.2.9/mod.ts";
// @deno-types="https://unpkg.com/@types/mocha@7.0.2/index.d.ts"
import "https://unpkg.com/mocha@7.2.0/mocha.js";
import app from "../server.ts";

interface Assertion {
  (element: Element): void;
}

interface Void {
  (): void;
}

interface ElementSelector {
  (element: Element): any;
}

class HtmlExpectation {
  public constructor(
    private readonly test: Test,
    private readonly query: string,
  ) {}
  public toEqual(elementSelector: ElementSelector, comparison: any): Test {
    return this.test.expect((response) => {
      const doc = new DOMParser().parseFromString(response.text, "text/html")!;
      const element = doc.querySelector(this.query)!;
      const e = elementSelector(element);
      return expect(e).toEqual(comparison);
    });
  }
}

class TestContext {
  public constructor(
    public readonly url: string,
    public readonly app: Application,
  ) {}

  public expect(status: number): Test;
  public expect(query: string): HtmlExpectation;
  public expect(field: string, value: string): Test;
  public expect(...args: any[]): Test | HtmlExpectation {
    const test = superdeno(app.handle.bind(app)).get(this.url);

    if (args.length == 1) {
      if (typeof (args[0]) === "number") {
        return test.expect(args[0]);
      }

      return new HtmlExpectation(test, args[0]);
    }

    return test.expect(args[0], args[1]);
  }
}

interface Describe {
  (state: TestContext): void;
}

export function describe(url: string, fn: Describe) {
  const context = new TestContext(url, app);
  Mocha.describe(url, () => fn(context));
}

export function suit(fn: Void) {
  mocha.setup({ ui: "bdd", reporter: "spec" });
  fn();
  mocha.run(onCompleted).globals(["onerror"]);
}

function onCompleted(failures: number): void {
  if (failures > 0) {
    Deno.exit(1);
  } else {
    Deno.exit(0);
  }
}
