import { QueryState } from "./query_state.ts";
import { CountryResult } from "./country_result.ts";

export class CountryService {
  query: QueryState;

  public constructor(url: URL) {
    this.query = new QueryState(url);
  }

  public async fetch(): Promise<CountryResult> {
    const coinDirectUrl = this.buildCoinDirectUrl(this.query);
    const countries = await (await fetch(coinDirectUrl)).json();
    return new CountryResult(countries, this.query);
  }

  private buildCoinDirectUrl(query: QueryState) {
    const url = new URL("https://api.coindirect.com/api/country");
    url.searchParams.append("max", query.pageSize.toString());
    url.searchParams.append("offset", query.offset.toString());

    return url.href;
  }
}
