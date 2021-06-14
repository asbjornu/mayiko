import { CountryResult } from "./country_result.ts"
import { Country } from "./country.ts";
import type { QueryState } from "./query_state.ts";

export class CoindirectClient {
  private static countries: Country[];

  private constructor(countries: Country[]) {
    CoindirectClient.countries = countries;
  }

  public countries(query: QueryState): CountryResult {
    let countries = CoindirectClient.countries;

    if (query.sort.field != null) {
      countries = query.sort.sort(countries);
    }

    const currency = query.currency;
    if (currency !== undefined) {
      countries = countries.filter(country => country.currency.toUpperCase() === currency.toUpperCase());
    }

    query.total = countries.length;
    countries = countries.slice(query.offset, query.end);

    return new CountryResult(countries, query);
  }

  public get currencies():  string[] {
    return CoindirectClient.countries
      .map(country => country.currency)
      .filter((currency, index, self) => self.indexOf(currency) === index)
      .sort();
  }

  public static async create(): Promise<CoindirectClient> {
    const coinDirectUrl = this.buildCoinDirectUrl();
    const fetchedCountries = await (await fetch(coinDirectUrl)).json();
    const countries = fetchedCountries.map((c: any) => new Country(c));
    return new CoindirectClient(countries);
  }

  private static buildCoinDirectUrl() {
    const url = new URL("https://api.coindirect.com/api/country");
    url.searchParams.append("max", '1300');
    return url.href;
  }
}
