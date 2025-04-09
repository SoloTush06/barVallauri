import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { jwtDecode } from 'jwt-decode';  // Importa la libreria jwt-decode

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {

  constructor(private router: Router) {}

  canActivate(): Observable<boolean> | Promise<boolean> | boolean {
    const token = localStorage.getItem('token'); 

    if (!token) {
      
      this.router.navigate(['/login']);
      return false;
    }

    try {
      const decoded: any = jwtDecode(token);  
      const currentTime = Math.floor(Date.now() / 1000); 

      if (decoded.exp < currentTime) {
        localStorage.removeItem('token'); 
        this.router.navigate(['/login']);
        window.location.reload();  
        return false;
      }
      return true;
    } catch (error) {
      localStorage.removeItem('token');
      this.router.navigate(['/login']);
      return false;
    }
  }
}


