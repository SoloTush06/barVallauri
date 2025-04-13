import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private apiUrl = 'https://friendly-barnacle-9px9jq69454fprpg-3000.app.github.dev/login'; 

  constructor(private http: HttpClient) {}

  login(email: string, password: string): Observable<any> {
    return this.http.post<any>(this.apiUrl, { email, password }).pipe(
      tap(response => {
        this.saveLoginData(response);
      })
    );
  }

  private saveLoginData(data: any) {
    localStorage.setItem('token', data.token);
    localStorage.setItem('nome', data.nome);
    localStorage.setItem('cognome', data.cognome);
    localStorage.setItem('email', data.email);
  }

  resetPassword(email: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/reset-password`, { email });
  }

  logout() {
    localStorage.clear(); 
  }
}
