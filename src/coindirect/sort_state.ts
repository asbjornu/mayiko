import { UrlBuilder } from "./url_builder.ts";
import type { QueryState } from "./query_state.ts";

export class SortState {
  private constructor(
    private readonly query: QueryState,
    public readonly field: string | null,
    public readonly ascending: boolean,
  ) {}

  public by(field: string): string {
    // console.log({ field, currentField: this.field, ascending: this.ascending })
    let ascending = this.ascending;

    if (this.field === field) {
      ascending = !this.ascending;
    }

    const sort = new SortState(this.query, field, ascending);
    const urlBuilder = new UrlBuilder(this.query, sort);
    return urlBuilder.toString();
  }

  public sort<T>(array: T[]): T[] {
    return array.sort((a: any, b: any) => {
      const state = new SorterState(a, b, this.field, this.ascending);
      return SortState.sorter(state);
    });
  }

  public static fromQuery(query: QueryState, sort: string | null): SortState {
    let field = sort;
    let ascending = true;

    if (sort?.startsWith("-")) {
      field = sort.substring(1);
      ascending = false;
    }

    return new SortState(query, field, ascending);
  }

  private static sorter(state: SorterState): number {
    if (state.field == null) {
      return this.genericSort(state);
    }

    const aValue = state.a[state.field];
    const bValue = state.b[state.field];

    if (typeof (aValue) === "string") {
      return state.ascending
        ? aValue?.localeCompare(bValue, "nb")
        : bValue?.localeCompare(aValue, "nb");
    } else if (typeof (aValue) === "number") {
      return state.ascending ? aValue - bValue : bValue - aValue;
    } else {
      const valueState = new SorterState(
        aValue,
        bValue,
        state.field,
        state.ascending,
      );
      return this.genericSort(valueState);
    }
  }

  private static genericSort(state: SorterState) {
    if (state.a > state.b) {
      return state.ascending ? 1 : -1;
    }

    if (state.a < state.b) {
      return state.ascending ? -1 : 1;
    }

    return 0;
  }
}

class SorterState {
  public constructor(a: any, b: any, field: string | null, ascending: boolean) {
    this.a = a;
    this.b = b;
    this.field = field;
    this.ascending = ascending;
  }

  public readonly a: any;
  public readonly b: any;
  public readonly field: string | null;
  public readonly ascending: boolean;
}
