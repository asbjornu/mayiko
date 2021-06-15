// @deno-types="https://deno.land/x/servest@v1.3.1/types/react-dom/server/index.d.ts"
import ReactDOMServer from "https://dev.jspm.io/react-dom/server.js";
import {
  Application,
  Router,
  send,
} from "https://deno.land/x/oak@v6.0.1/mod.ts";
import type {
  Context,
  RouterContext,
} from "https://deno.land/x/oak@v6.0.1/mod.ts";
import Index from "./mayiko/index.tsx";
import { CoindirectClient } from "./coindirect/coindirect_client.ts";
import { QueryState } from "./coindirect/query_state.ts";

let coindirectClient: CoindirectClient;

const mayikoRouter = new Router()
  .get("/", renderCountries)
  .get("/:currency", renderCountries);

const staticRouter = new Router()
  .get("/img/:path", handleStatic)
  .get("/style/:path", handleStatic);

const app = new Application();
app.use(handleError);
app.use(staticRouter.routes());
app.use(mayikoRouter.routes());
app.addEventListener("listen", async ({ hostname, port, secure }) => {
  coindirectClient = await CoindirectClient.create();
  console.log(
    `Mayiko is now listening on: ${secure ? "https://" : "http://"}${hostname ??
      "localhost"}:${port}`,
  );
});

if (import.meta.main) {
  await app.listen({ port: 5000 });
}

async function renderCountries(context: RouterContext) {
  const query = QueryState.fromContext(context);
  coindirectClient = coindirectClient || (await CoindirectClient.create());
  const countries = coindirectClient.countries(query);
  const currencies = coindirectClient.currencies;

  render(context, Index(countries, currencies, query));
}

function render(context: Context, element: React.ReactElement) {
  const html = ReactDOMServer.renderToString(element);
  context.response.body = `<!DOCTYPE html>\n${html}`;
}

async function handleError(context: Context, next: any) {
  try {
    await next();
  } catch (err) {
    console.error(err);
    context.response.body = err.toString();
  }
}

async function handleStatic(context: Context) {
  await send(context, context.request.url.pathname, {
    root: `${Deno.cwd()}/public`,
  });
}

export default app;
