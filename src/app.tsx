import React, { ComponentType } from 'react'
import { Router } from 'https://esm.sh/react-router-dom'
import { createMemoryHistory } from 'https://esm.sh/v41/history@4.10.1/es2020/history.js'
import { alephOak } from "aleph/server/oak.ts"

export default function App({ Page, pageProps }: { Page: ComponentType<any>, pageProps: any }) {
  // const app = new Application();
  // const oak = alephOak(app)
  // console.log({oak})
  // const server = new Server(this)
  // console.log({ server })

  const history = createMemoryHistory();

  return (
    <Router history={history}>
      <main>
        <head>
          <meta name="viewport" content="width=device-width" />
        </head>
        <Page {...pageProps} />
      </main>
    </Router>
  )
}
