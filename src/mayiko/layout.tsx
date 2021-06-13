// @deno-types="https://deno.land/x/servest@v1.3.1/types/react/index.d.ts"
import React from "https://dev.jspm.io/react/index.js";
import Nav from './nav.tsx'
import Logo from './logo.tsx'

export default function Layout(content: React.ReactElement | undefined = undefined) {
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
          <header>
            <p className="logo"><Logo /></p>
          </header>

          <main>
            {content}
          </main>

          <footer>
            <p className="copyinfo">
              <a href="https://thenounproject.com/term/countries/3437692/">countries</a> icon by <a href="https://thenounproject.com/kavya261990/">Icongeek26</a>,
              from <a href="https://thenounproject.com/">the Noun Project</a>
            </p>
          </footer>
      </body>
    </html>
  )
}
