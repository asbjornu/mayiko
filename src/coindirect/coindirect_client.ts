import { CountryResult } from "./country_result.ts";
import { Country } from "./country.ts";
import type { QueryState } from "./query_state.ts";

export class CoindirectClient {
  private static countries: Country[];

  private constructor(countries: Country[]) {
    CoindirectClient.countries = countries;
  }

  public fetchCountries(query: QueryState): CountryResult {
    query.total = CoindirectClient.countries.length;
    let countries = CoindirectClient.countries;

    if (query.sort.field != null) {
      countries = query.sort.sort(countries);
    }

    countries = countries.slice(query.offset, query.end);

    return new CountryResult(countries, query);
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
