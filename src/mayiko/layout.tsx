// @deno-types="https://deno.land/x/servest@v1.3.1/types/react/index.d.ts"
import React from "https://dev.jspm.io/react/index.js";

export default function Layout(
  content: React.ReactElement | undefined = undefined,
) {
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
          <a href="/" className="logo">
            <img
              src="/img/logo.svg"
              height="75"
              alt="Mayiko"
              title="'Mayiko' is chichewan for 'countries'"
            />
          </a>
        </header>

        {content}

        <footer>
          <p>
            <a href="https://thenounproject.com/term/countries/3437692/">
              Countries
            </a>
            icon by{" "}
            <a href="https://thenounproject.com/kavya261990/">Icongeek26</a>,
            <a href="https://thenounproject.com/term/address/3424189/">
              Address
            </a>
            icon by{" "}
            <a href="https://thenounproject.com/martinsratkus92/">
              Martins Ratkus
            </a>,
            <a href="https://thenounproject.com/term/selfie/2059723/">Selfie</a>
            icon by{" "}
            <a href="https://thenounproject.com/rose-alice-design/">
              Alice Design
            </a>,
            <a href="https://thenounproject.com/term/passport/2128103/">
              Passport
            </a>
            icon by{" "}
            <a href="https://thenounproject.com/prosymbols/">ProSymbols</a>,
            from <a href="https://thenounproject.com/">the Noun Project</a>.
          </p>
          <p>
            Built with <a href="https://deno.land">Deno</a> and
            <a href="https://reactjs.com">React</a> by
            <a href="https://asbjor.nu">Asbjørn Ulsberg</a>.
          </p>
        </footer>
      </body>
    </html>
  );
}
