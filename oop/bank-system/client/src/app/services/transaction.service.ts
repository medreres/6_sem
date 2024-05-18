import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { Observable } from 'rxjs';
import { Transaction } from '../../types';

@Injectable({
  providedIn: 'root',
})
export class TransactionService {
  constructor(private apiService: ApiService) {}

  getTransactionsByCardId(cardId: number): Observable<Transaction[]> {
    return this.apiService.get(`transactions/${cardId}`, {
      params: {},
      responseType: 'json',
    });
  }

  makeTransaction(
    data: Pick<Transaction, 'cardId' | 'amountInCents'>
  ): Observable<Transaction> {
    const { amountInCents, cardId } = data;
    return this.apiService.post(
      `transactions/${cardId}`,
      {
        amountInCents,
        cardId,
      },
      {
        params: {},
        responseType: 'json',
      }
    );
  }
}
