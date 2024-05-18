import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { Observable } from 'rxjs';
import { Card, User } from '../../types';

@Injectable({
  providedIn: 'root',
})
export class CardService {
  constructor(private apiService: ApiService) {}

  getCards(cardId: number): Observable<Card[]> {
    return this.apiService.get(`cards/${cardId}`, {
      params: {},
      responseType: 'json',
    });
  }
}
