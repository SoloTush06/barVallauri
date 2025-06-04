import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FoodService {
  private apiUrl = ' https://vallauribar.connectify.it/api/food'; 

  constructor(private http: HttpClient) {}

  getMenuCibo(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/menu-cibo`);
  }
}
