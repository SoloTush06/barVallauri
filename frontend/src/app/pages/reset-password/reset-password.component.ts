import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router'; // ✅ aggiunto Router
import { HttpClient } from '@angular/common/http';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  standalone: true,
  imports: [ReactiveFormsModule, FormsModule, CommonModule],
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {
  email: string = '';
  newPassword: string = '';
  showSuccessAlert: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private http: HttpClient,
    private router: Router // ✅ iniettato Router
  ) {}

  ngOnInit(): void {
    this.email = this.route.snapshot.queryParamMap.get('email') || '';
  }

  resetPassword(): void {
    this.http.post('http://109.123.240.145:3000/login/update-password', {
      email: this.email,
      newPassword: this.newPassword,
    }).subscribe({
      next: () => {
        this.showSuccessAlert = true;

        setTimeout(() => {
          this.showSuccessAlert = false;
          this.router.navigate(['/']);
        }, 1000);
      },
      error: () => alert('Errore durante l\'aggiornamento'),
    });
  }
}
