export interface User {
  id: number;
  firstName: string;
  lastName: string;
}

export interface Card {
  id: number;
  cardNumber: string;
  userId: number;
}

export enum TransactionStatus {
  SUCCESS = 'SUCCESS',
  FAIL = 'FAIL',
}

export interface Transaction {
  id: number;
  amountInCents: number;
  status: TransactionStatus;
  cardId: number;
}
