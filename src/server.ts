// @deno-types="https://deno.land/x/servest@v1.3.1/types/react-dom/server/index.d.ts"
import ReactDOMServer from "https://dev.jspm.io/react-dom/server.js";
import { Application, Router, send } from "https://deno.land/x/oak@v6.0.1/mod.ts";
import type { Context } from "https://deno.land/x/oak@v6.0.1/mod.ts";
import Mayiko from "./mayiko/app.tsx";
import { CoindirectClient } from './coindirect/coindirect_client.ts';

const mayikoRouter = new Router()
  .get("/", async context => {
    const coindirectClient = new CoindirectClient(context.request.url);
    const countries = await coindirectClient.fetchAllCountries();
    const mayiko = Mayiko(countries);
    const rendered = ReactDOMServer.renderToString(mayiko);

    context.response.body = `<!DOCTYPE html>\n${rendered}`
  });

const staticRouter = new Router()
  .get("/img/:path", handleStatic)
  .get("/style/:path", handleStatic);

const app = new Application();
app.use(staticRouter.routes());
app.use(mayikoRouter.routes());
app.listen({ port: 5000 });

async function handleStatic(context: Context) {
  await send(context, context.request.url.pathname, {
    root: `${Deno.cwd()}/public`
  });
}
