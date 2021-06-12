import { QueryState } from './query_state.ts';
import type { SortState } from './sort_state.ts';

export class UrlBuilder {
  public constructor(public readonly query: QueryState,
                     public readonly sort: SortState) {}

  public toString = () : string => {
    let url = `?offset=${this.query.offset}`;

    if (this.query.limit != QueryState.defaultLimit) {
      url = `${url}&limit=${this.query.limit}`;
    }

    if (this.sort.field !== null) {
      const direction = this.sort.ascending ? '' : '-';
      url = `${url}&sort=${direction}${this.sort.field}`;
    }

    return url;
  }
}
