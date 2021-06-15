import { Country } from "./country.ts";
import type { QueryState } from "./query_state.ts";

export class CountryResult {
  public constructor(
    public readonly countries: Country[],
    public readonly query: QueryState,
  ) {}
}
