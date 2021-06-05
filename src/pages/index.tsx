import { useDeno } from 'framework/react'
import React from 'react'
import Logo from '~/components/logo.tsx'

export default function Home() {
  const version = useDeno(() => Deno.version.deno)

  return (
    <div className="page">
      <head>
        <title>Welcome to Mayiko</title>
        <link rel="stylesheet" href="../style/index.css" />
        <link rel="icon" href="/icon.svg" />
        <link rel="shortcut icon" href="/icon.png" />
      </head>
      <p className="logo"><Logo /></p>
      <h1>Welcome to <strong title="'Mayiko' is chichewan for 'countries'">Mayiko</strong>!</h1>
      <footer>
        <p className="copyinfo">
          Built by Aleph.js in Deno {version}
        </p>
        <p className="copyinfo">
          <a href="https://thenounproject.com/term/countries/3437692/">countries</a> icon by <a href="https://thenounproject.com/kavya261990/">Icongeek26</a> from <a href="https://thenounproject.com/">the Noun Project</a>
        </p>
      </footer>
    </div>
  )
}
