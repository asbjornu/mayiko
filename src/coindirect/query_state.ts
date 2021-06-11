export class QueryState {
  private static defaultLimit = 10;

  public constructor(url: URL) {
    const query = url.searchParams;
    this.limit = QueryState.intValue(query, "limit", QueryState.defaultLimit);
    this.offset = QueryState.intValue(query, "offset", 0);
    this.start = this.offset;
    this.end = this.start + this.limit;
    this.total = -1;
  }

  public readonly limit: number;
  public readonly offset: number;
  public readonly start: number;
  public readonly end: number;
  public total: number;

  public get prevUrl(): string | null {
    const prevOffset = this.offset > 0 ? this.offset - this.limit : -1;
    return prevOffset > -1 ? this.buildUrl(prevOffset) : null;
  }

  public get nextUrl(): string | null {
    return this.end < this.total ? this.buildUrl(this.end) : null;
  }

  private static intValue(query: URLSearchParams, key: string, defaultValue: number) {
    const stringValue = query.get(key) || "";
    const intValue = parseInt(stringValue, 10) || defaultValue;
    return intValue < 0 ? defaultValue : intValue;
  }

  private buildUrl(offset: number): string {
    const url = `?offset=${offset}`;
    if (this.limit == QueryState.defaultLimit) {
      return url;
    }

    return `${url}&limit=${this.limit}`;
  }
}
