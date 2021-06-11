// @deno-types="https://deno.land/x/servest@v1.3.1/types/react/index.d.ts"
import React from "https://dev.jspm.io/react/index.js";
// @deno-types="https://deno.land/x/servest@v1.3.1/types/react-dom/server/index.d.ts"
import ReactDOMServer from "https://dev.jspm.io/react-dom/server.js";
import Logo from '../components/logo.tsx'
import Countries from '../components/countries.tsx'
import type { CountryResult } from './country_result.ts'

export default function Mayiko(countryResult: CountryResult) {
  return (
    <html lang="en">
        <head>
          <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width" />
        <title>Welcome to Mayiko</title>
          <link rel="stylesheet" href="/style/index.css" />
          <link rel="icon" href="/img/icon.svg" />
          <link rel="shortcut icon" href="/img/icon.png" />
        </head>
        <body>
          <div className="page">
            <header>
              <p className="logo"><Logo /></p>
              <h1>Welcome to <strong title="'Mayiko' is chichewan for 'countries'">Mayiko</strong></h1>
            </header>

            <main>
              <Countries {...countryResult} />
            </main>

            <footer>
              <p className="copyinfo">
                <a href="https://thenounproject.com/term/countries/3437692/">countries</a> icon by <a href="https://thenounproject.com/kavya261990/">Icongeek26</a>,
                from <a href="https://thenounproject.com/">the Noun Project</a>
              </p>
            </footer>
          </div>
      </body>
    </html>
  )
}
