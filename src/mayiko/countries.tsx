// @deno-types="https://deno.land/x/servest@v1.3.1/types/react/index.d.ts"
import React from "https://dev.jspm.io/react/index.js";
import type { Document } from '../coindirect/document.ts'
import type { Country } from '../coindirect/country.ts'
import type { CountryResult } from '../coindirect/country_result.ts'

function renderDocument(document: Document) {
  const iconUrl = `/img/${document.icon}.svg`

  return (
    <img src={iconUrl} alt={document.description} title={document.description} />
  )
}

function renderRow(country: Country) {
  const documents = country.documents.map(renderDocument)

  return (
    <tr key={country.code}>
      <td>{country.name}</td>
      <td className="max">{country.maxWithdrawalAmount}</td>
      <td>{country.currency}</td>
      <td>{documents}</td>
    </tr>
  )
}


export default function Countries(countryResult: CountryResult) {
  const rows = countryResult.countries.map(renderRow)
  const query = countryResult.query;
  const prev = query.prevUrl ? <a href={query.prevUrl}>❮ Previous</a> : null;

  return (
    <div className="table">
      <table>
        <thead>
          <tr>
            <th className="name">Name</th>
            <th className="max">Max withdrawal</th>
            <th className="currency">Currency</th>
            <th className="docs">Documents</th>
          </tr>
        </thead>
        <tbody>{rows}</tbody>
      </table>

      <ul className="pager">
        <li className="prev" key="prev">{prev}</li>
        <li className="next" key="next"><a href={query.nextUrl}>Next ❯</a></li>
      </ul>
    </div>
  )
}
