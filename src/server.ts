// @deno-types="https://deno.land/x/servest@v1.3.1/types/react-dom/server/index.d.ts"
import ReactDOMServer from "https://dev.jspm.io/react-dom/server.js";
import { Application, Router, send } from "https://deno.land/x/oak@v6.0.1/mod.ts";
import type { Context } from "https://deno.land/x/oak@v6.0.1/mod.ts";
import Index from "./mayiko/index.tsx";
import Countries from "./mayiko/countries.tsx";
import { CoindirectClient } from './coindirect/coindirect_client.ts';
import { QueryState } from './coindirect/query_state.ts'

let coindirectClient: CoindirectClient;

const mayikoRouter = new Router()
  .get("/", context => {
    console.log('Index');
    render(context, Index())
  })
  .get("/countries", context => {
    console.log('Countries');
    const query = QueryState.fromUrl(context.request.url);
    const countries = coindirectClient.fetchCountries(query);
    render(context, Countries(countries));
  })
  .get("/currencies", context => {
    /*const countries = coindirectClient.fetchCountries()
    render(context, Countries(countries))*/
  });

const staticRouter = new Router()
  .get("/img/:path", handleStatic)
  .get("/style/:path", handleStatic);

const app = new Application();
app.use(staticRouter.routes());
app.use(mayikoRouter.routes());
app.addEventListener("listen", async ({ hostname, port, secure }) => {
  coindirectClient = await CoindirectClient.create();
  console.log(
    `Mayiko is now listening on: ${secure ? "https://" : "http://"}${hostname ??
      "localhost"}:${port}`,
  );
});
app.use(handleError);
app.listen({ port: 5000 });

function render(context: Context, element: React.ReactElement) {
  const html = ReactDOMServer.renderToString(element);
  context.response.body = `<!DOCTYPE html>\n${html}`
}

async function handleError(context: Context, next: any) {
  console.log(typeof(next));

  try {
    await next();
  } catch (err) {
    console.error(err);
    context.response.body = err.toString();
  }
}

async function handleStatic(context: Context) {
  await send(context, context.request.url.pathname, {
    root: `${Deno.cwd()}/public`
  });
}
