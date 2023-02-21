export type Transaction = {
  id: string;
  amount: number;
  type: TransactionType;
  bankId: string;
};
export enum TransactionType {
  PROFITABLE = 'profitable',
  CONSUMABLE = 'consumable',
}

export type Pagination = {
  page: number;
  perPage: number;
};
