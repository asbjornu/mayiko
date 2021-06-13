// @deno-types="https://deno.land/x/servest@v1.3.1/types/react/index.d.ts"
import React from "https://dev.jspm.io/react/index.js";
import CountryTable from './country_table.tsx';
import Layout from './layout.tsx';
import type { CountryResult } from '../coindirect/country_result.ts';

export default function Mayiko(countryResult: CountryResult) {
  return Layout(<CountryTable {...countryResult} />);
}
