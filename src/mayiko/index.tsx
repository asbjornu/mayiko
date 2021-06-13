// @deno-types="https://deno.land/x/servest@v1.3.1/types/react/index.d.ts"
import React from "https://dev.jspm.io/react/index.js";
import type { QueryState } from '../coindirect/query_state.ts';
import type { CountryResult } from '../coindirect/country_result.ts';
import Layout from './layout.tsx';
import Currencies from './currencies.tsx';
import Countries from './countries.tsx'

export default function Index(countries: CountryResult, currencies: string[], query: QueryState) {
  return Layout(
    <main>
      <Currencies {...{ currencies, chosenCurrency: query.currency }} />
      <Countries {...countries}/>
    </main>
  );
}
