import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

const BASE_URL = 'http://localhost:8080';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private readonly httpClient: HttpClient) {}

  get<Response>(
    url: string,
    options?: Parameters<HttpClient['get']>[1]
  ): Observable<Response> {
    return this.httpClient.get<Response>(
      `${BASE_URL}/${url}`,
      options
    ) as Observable<Response>;
  }

  post<Response>(
    url: string,
    body?: Parameters<HttpClient['post']>[1],
    options?: Parameters<HttpClient['post']>[2]
  ): Observable<Response> {
    return this.httpClient.post<Response>(
      `${BASE_URL}/${url}`,
      body,
      options
    ) as Observable<Response>;
  }
}
