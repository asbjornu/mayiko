import { Document } from "./document.ts";

export class Country {
  public constructor(country: any) {
    this.code = country.code;
    this.name = country.name;
    this.currency = country.defaultCurrency;
    this.maxWithdrawalAmount = isNaN(country.options.withdrawalMaximum)
      ? null
      : country.options.withdrawalMaximum / 100;

    this.documents = country.documents
      .filter((x: any) => x.required)
      .sort((a: any, b: any) => a.code.localeCompare(b.code))
      .map((x: any) => new Document(x));
  }

  public readonly code: string;
  public readonly name: string;
  public readonly currency: string;
  public readonly documents: Document[];
  public readonly maxWithdrawalAmount: number | null;
}
