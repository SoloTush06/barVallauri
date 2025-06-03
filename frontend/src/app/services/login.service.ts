import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private apiUrl = ' http://109.123.240.145:3000/login'; 

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
