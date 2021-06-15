// @deno-types="https://deno.land/x/servest@v1.3.1/types/react/index.d.ts"
import React from "https://dev.jspm.io/react/index.js";
import type { Document } from "../coindirect/document.ts";
import type { Country } from "../coindirect/country.ts";
import type { CountryResult } from "../coindirect/country_result.ts";
import type { QueryState } from "../coindirect/query_state.ts";

function renderDocument(document: Document) {
  const iconUrl = `/img/${document.icon}.svg`;

  return (
    <img
      key={document.icon}
      src={iconUrl}
      alt={document.description}
      title={document.description}
    />
  );
}

function renderRow(country: Country) {
  const documents = country.documents.map(renderDocument);

  return (
    <tr key={country.code} className={country.code.toLowerCase()}>
      <td className="name">{country.name}</td>
      <td className="maxWithdrawalAmount">{country.maxWithdrawalAmount}</td>
      <td>
        <a href={`/${country.currency.toLowerCase()}`}>{country.currency}</a>
      </td>
      <td>{documents}</td>
    </tr>
  );
}

function headerClassName(field: string, query: QueryState): string {
  if (query.sort.field === field) {
    return query.sort.ascending
      ? `${field} sorted-ascending`
      : `${field} sorted-descending`;
  }

  return field;
}

export default function Countries(countryResult: CountryResult) {
  const rows = countryResult.countries.map(renderRow);
  const query = countryResult.query;
  const prev = query.prevUrl
    ? <a href={query.prevUrl} rel="prev">❮ Previous</a>
    : null;
  const next = query.nextUrl
    ? <a href={query.nextUrl} rel="next">Next ❯</a>
    : null;
  const sortByName = query.sort.by("name");
  const sortByMaxWithdrawalAmount = query.sort.by("maxWithdrawalAmount");
  const sortByCurrency = query.sort.by("currency");

  return (
    <div className="countries container">
      <h2>Countries</h2>
      <table>
        <thead>
          <tr>
            <th className={headerClassName("name", query)}>
              <a href={sortByName}>Name</a>
            </th>
            <th className={headerClassName("maxWithdrawalAmount", query)}>
              <a href={sortByMaxWithdrawalAmount}>Max withdrawal</a>
            </th>
            <th className={headerClassName("currency", query)}>
              <a href={sortByCurrency}>Currency</a>
            </th>
            <th className="docs">Documents</th>
          </tr>
        </thead>
        <tbody>{rows}</tbody>
      </table>

      <ul className="pager">
        <li className="prev" key="prev">{prev}</li>
        <li className="next" key="next">{next}</li>
      </ul>
    </div>
  );
}
