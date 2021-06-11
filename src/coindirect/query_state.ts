export class QueryState {
  public constructor(url: URL) {
    const query = url.searchParams;
    const maxString = query.get("max") || "";
    const offsetString = query.get("offset") || "";
    this.pageSize = parseInt(maxString, 10) || 10;
    this.offset = parseInt(offsetString, 10) || 0;
    const prev = this.offset > 0 ? this.offset - this.pageSize : -1;
    const next = this.pageSize + this.offset;
    this.prevUrl = prev > -1 ? `?offset=${prev}` : undefined;
    this.nextUrl = `?offset=${next}`;
  }

  public pageSize: number;
  public offset: number;
  public prevUrl: string | undefined;
  public nextUrl: string | undefined;
}
