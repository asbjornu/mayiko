// @deno-types="https://deno.land/x/servest@v1.3.1/types/react-dom/server/index.d.ts"
import ReactDOMServer from "https://dev.jspm.io/react-dom/server.js";
import { createApp, serveStatic, ServerRequest } from "https://deno.land/x/servest@v1.3.1/mod.ts";
import Mayiko from "./mayiko/app.tsx";
import { CoindirectClient } from './coindirect/coindirect_client.ts';

const app = createApp();
app.handle("/", async (req: ServerRequest) => {
  const url = new URL(req.url, 'http://localhost');
  const coindirectClient = new CoindirectClient(url);
  const countries = await coindirectClient.fetchCountries();
  const mayiko = Mayiko(countries);
  const rendered = ReactDOMServer.renderToString(mayiko);
  const body = `<!DOCTYPE html>\n${rendered}`
  const headers = new Headers({ "content-type": "text/html; charset=UTF-8" });
  const status = 200;

  await req.respond({ status, headers, body });
});
app.use(serveStatic("./public"));
app.listen({ port: 5000 });
