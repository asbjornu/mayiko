import { SortState } from './sort_state.ts';
import { UrlBuilder } from './url_builder.ts';

export class QueryState {
  public static readonly defaultLimit = 10;

  public constructor(public readonly limit: number,
                     public readonly offset: number,
                     sort: string | null) {
    this.start = this.offset;
    this.end = this.start + this.limit;
    this.total = -1;
    this.sort = SortState.fromQuery(this, sort);
  }

  public readonly sort: SortState;
  public readonly start: number;
  public readonly end: number;
  public total: number;

  public get prevUrl(): string | null {
    const prevOffset = this.offset > 0 ? this.offset - this.limit : -1;

    if (prevOffset > -1) {
      const prevQuery = new QueryState(this.limit, prevOffset, this.sort.field);
      const urlBuilder = new UrlBuilder(prevQuery, this.sort);
      return urlBuilder.toString();
    }

    return null;
  }

  public get nextUrl(): string | null {
    if (this.end < this.total) {
      const prevQuery = new QueryState(this.limit, this.end, this.sort.field);
      const urlBuilder = new UrlBuilder(prevQuery, this.sort);
      return urlBuilder.toString();
    }

    return null;
  }

  public static fromUrl(url: URL): QueryState {
    const query = url.searchParams;
    const sort = query.get("sort");
    const limit = QueryState.intValue(query, "limit", QueryState.defaultLimit);
    const offset = QueryState.intValue(query, "offset", 0);
    return new QueryState(limit, offset, sort);
  }

  private static intValue(query: URLSearchParams, key: string, defaultValue: number) {
    const stringValue = query.get(key) || "";
    const intValue = parseInt(stringValue, 10) || defaultValue;
    return intValue < 0 ? defaultValue : intValue;
  }
}
