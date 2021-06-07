import React from 'react'
import { useDeno, useRouter } from 'framework/react'

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
  const documents = country.documents
    .filter(x => x.required)
    .sort((a, b) => a.code.localeCompare(b.code))
    .map(renderDocument)
  const maxWithdrawal = isNaN(country.options.withdrawalMaximum)
    ? ''
    : country.options.withdrawalMaximum / 100

  return (
    <tr key={country.code}>
      <td>{country.name}</td>
      <td className="max">{maxWithdrawal}</td>
      <td>{country.defaultCurrency}</td>
      <td>{documents}</td>
    </tr>
  )
}

function hydrateQuery() {
  const { query } = useRouter()
  const max = parseInt(query.get('max'), 10) || 10;
  const offset = parseInt(query.get('offset'), 10) || 0;
  const prev = offset > 0 ? offset - max : -1
  const next = max + offset
  const prevUrl = prev > -1 ? `?offset=${prev}` : null
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
  const prev = query.prevUrl ? <a href={query.prevUrl}>❮ Previous</a> : null

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
