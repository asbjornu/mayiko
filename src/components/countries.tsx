import React from 'react'
import { useDeno, useRouter } from 'framework/react'
import { Link,  } from 'https://esm.sh/react-router-dom'
// import { Link } from "https://deno.land/x/aleph/mod.ts";
import { useMemo } from "react";
import queryString from "https://esm.sh/query-string";
// import { useRouter } from "https://deno.land/x/aleph/mod.ts"

function mapDocumentCodeToIcon(document) {
  switch (document.code) {
    case 'idSelfie':
      return 'selfie'
    case 'idPassport':
      return 'passport'
    case 'proofOfAddress':
      return 'address'
  }

  return 'unknown'
}

function renderDocument(document) {
  const icon = mapDocumentCodeToIcon(document)
  const iconUrl = `/${icon}.svg`

  return (
    <img src={iconUrl} alt={document.description} title={document.description} />
  )
}

function renderRow(country) {
  const documents = country.documents.filter(x => x.required).map(renderDocument)
  const maxWithdrawal = isNaN(country.options.withdrawalMaximum)
    ? ''
    : country.options.withdrawalMaximum / 100

  return (
    <tr key={country.code}>
      <td>{documents}</td>
      <td>{country.name}</td>
      <td className="r">{maxWithdrawal}</td>
      <td>{country.defaultCurrency}</td>
    </tr>
  )
}

function hydrateQuery() {
  const { query } = useRouter()
  const max = parseInt(query.get('max'), 10) || 10;
  const offset = parseInt(query.get('offset'), 10) || 0;
  const prev = offset > 0 ? offset - max : null
  const next = max + offset
  const prevUrl = `?offset=${prev}`
  const nextUrl = `?offset=${next}`

  return { max, offset, prevUrl, nextUrl }
}

function buildCoinDirectUrl(query) {
  const url = new URL('https://api.coindirect.com/api/country')
  url.searchParams.append('max', query.max.toString())
  url.searchParams.append('offset', query.offset.toString())

  return url.href
}

export default function Countries() {
  const query = hydrateQuery()
  const coinDirectUrl = buildCoinDirectUrl(query)

  const countries = useDeno(async () => {
    const response = await fetch(coinDirectUrl);
    return await response.json()
  })

  const rows = countries.map(renderRow)
  const prev = ''

  return (
    <div className="table">
      <table>
        <thead>
          <tr>
            <th>Documents</th>
            <th>Name</th>
            <th className="r">Max withdrawal</th>
            <th>Currency</th>
          </tr>
        </thead>
        <tbody>{rows}</tbody>
      </table>

      <ul className="pager">
        <li className="prev" key="prev"><Link to={query.prevUrl}>❮ Previous</Link></li>
        <li className="next" key="next"><Link to={query.nextUrl}>Next ❯</Link></li>
      </ul>
    </div>
  )
}
