import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { Observable } from 'rxjs';
import { User } from '../../types';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private apiService: ApiService) {}

  getUser(userId: number): Observable<User> {
    return this.apiService.get(`users/${userId}`, {
      params: {},
      responseType: 'json',
    });
  }
}
