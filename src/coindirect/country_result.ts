import { Country } from "./country.ts";
import type { QueryState } from "./query_state.ts";

export class CountryResult {
  public constructor(countries: Country[], query: QueryState) {
    this.countries = countries.map(x => new Country(x));
    this.query = query;
  }

  public countries: Country[];
  public query: QueryState;
}
