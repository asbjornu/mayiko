// @deno-types="https://deno.land/x/servest@v1.3.1/types/react/index.d.ts"
import React from "https://dev.jspm.io/react/index.js";

function className(currency: string, currentCurrency: string | undefined) {
  currency = currency.toLowerCase();
  return currentCurrency && currency === currentCurrency.toLowerCase()
    ? `chosen ${currency}`
    : currency;
}

export default function Currencies(props: any) {
  const currencies: string[] = props.currencies;
  const chosenCurrency: string | undefined = props.chosenCurrency;

  return (
    <div className="currencies container">
      <h2>Currencies</h2>
      <ol className="currencies">{
        currencies.map(currency =>
          <li key={currency} className={className(currency, chosenCurrency)}><a href={`/${currency.toLowerCase()}`}>{currency}</a></li>
        )
      }</ol>
    </div>
  );
}
