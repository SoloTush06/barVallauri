import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {  
  private apiUrl = 'https://friendly-barnacle-9px9jq69454fprpg-3000.app.github.dev/login'; // URL del backend
  
  constructor(private http: HttpClient) { }

  login(email: string, password: string): Observable<any> {
    return this.http.post<any>(this.apiUrl, { email, password });
  }

  saveToken(token: string) {
    localStorage.setItem('token', token); // Salva il token nel localStorage
  }
}
