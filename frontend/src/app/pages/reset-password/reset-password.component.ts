import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
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
  showSuccessAlert: boolean = false; // ✅ Proprietà mancante aggiunta

  constructor(private route: ActivatedRoute, private http: HttpClient) {}

  ngOnInit(): void {
    this.email = this.route.snapshot.queryParamMap.get('email') || '';
  }

  resetPassword(): void {
    this.http.post('https://friendly-barnacle-9px9jq69454fprpg-3000.app.github.dev/login/update-password', {
      email: this.email,
      newPassword: this.newPassword,
    }).subscribe({
      next: () => {
        this.showSuccessAlert = true;
        setTimeout(() => {
          this.showSuccessAlert = false;
        }, 3000);
      },
      error: () => alert('Errore durante l\'aggiornamento'),
    });
  }
}
