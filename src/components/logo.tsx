// @deno-types="https://deno.land/x/servest@v1.3.1/types/react/index.d.ts"
import React from "https://dev.jspm.io/react/index.js";

export default function Logo({ size = 75 }: { size?: number }) {
  return (
    <img src="/logo.svg" height={size} title="Mayiko" />
  )
}
