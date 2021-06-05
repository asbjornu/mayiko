import React from 'react'
import { useDeno } from 'framework/react'

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
    <tr>
      <td>{documents}</td>
      <td>{country.name}</td>
      <td className="r">{maxWithdrawal}</td>
      <td>{country.defaultCurrency}</td>
    </tr>
  )
}

export default function Countries() {
  const countries = useDeno(async () => {
    const response = await fetch('https://api.coindirect.com/api/country');
    return await response.json()
  })

  const rows = countries.map(renderRow)

  return (
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
  )
}
