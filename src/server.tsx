// @deno-types="https://deno.land/x/servest@v1.3.1/types/react/index.d.ts"
import React from "https://dev.jspm.io/react/index.js";
// @deno-types="https://deno.land/x/servest@v1.3.1/types/react-dom/server/index.d.ts"
import ReactDOMServer from "https://dev.jspm.io/react-dom/server.js";
import { createApp, serveStatic, ServerRequest } from "https://deno.land/x/servest@v1.3.1/mod.ts";
import Mayiko from "./app/mayiko.tsx";
import { CountryService } from './app/country_service.ts';

const app = createApp();
app.handle("/", async (req: ServerRequest) => {
  const url = new URL(req.url, 'http://localhost');
  const countryService = new CountryService(url);
  const countries = await countryService.fetch();
  const rendered = ReactDOMServer.renderToString(Mayiko(countries));
  const body = `<!DOCTYPE html>\n${rendered}`

  await req.respond({
    status: 200,
    headers: new Headers({
      "content-type": "text/html; charset=UTF-8",
    }),
    body,
  });
});
app.use(serveStatic("./public"));
app.listen({ port: 5000 });
