// @deno-types="https://deno.land/x/servest@v1.3.1/types/react/index.d.ts"
import React from "https://dev.jspm.io/react/index.js";
// @deno-types="https://deno.land/x/servest@v1.3.1/types/react-dom/server/index.d.ts"
import ReactDOMServer from "https://dev.jspm.io/react-dom/server.js";
import { createApp } from "https://deno.land/x/servest@v1.3.1/mod.ts";
import App from "./app/app.tsx";
import { CountryService } from './app/country_service.ts';

const app = createApp();
app.handle("/", async (req) => {
  const url = new URL(req.url);
  const countryService = new CountryService(url);
  const countries = await countryService.fetch();

  await req.respond({
    status: 200,
    headers: new Headers({
      "content-type": "text/html; charset=UTF-8",
    }),
    body: ReactDOMServer.renderToString(App(countries)),
  });
});
app.listen({ port: 5000 });
