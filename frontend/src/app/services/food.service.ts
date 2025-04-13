import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FoodService {
  private baseUrl = 'https://friendly-barnacle-9px9jq69454fprpg-3000.app.github.dev/food'; 

  constructor(private http: HttpClient) {}

  getMenuCibo(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/menu-cibo`);
  }
}
