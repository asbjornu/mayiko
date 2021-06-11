import { Country } from "./country.ts";
import type { QueryState } from "./query_state.ts";

export class CountryResult {
  public constructor(countries: Country[], query: QueryState) {
    this.countries = countries;
    this.query = query;
  }

  public readonly countries: Country[];
  public readonly query: QueryState;
}
