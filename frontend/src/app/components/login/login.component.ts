import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { LoginService } from '../../services/login.service';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, FormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [LoginService],
})
export class LoginComponent {
  loginForm: FormGroup;
  errorMessage: string = '';
  showAlert: boolean = false;
  showPasswordResetPopup: boolean = false;
  resetEmail: string = '';
  showSuccessAlert: boolean = false;

  constructor(private loginService: LoginService, private router: Router) {
    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required]),
    });
  }

  // Metodo per il login
  onLogin() {
    if (this.loginForm.invalid) {
      this.errorMessage = 'Compila correttamente tutti i campi.';
      return;
    }

    const { email, password } = this.loginForm.value;

    this.loginService.login(email, password).subscribe({
      next: (response: { token: string; nome: string; cognome: string; email: string }) => {
        localStorage.setItem('token', response.token);
        localStorage.setItem('nome', response.nome);
        localStorage.setItem('cognome', response.cognome);
        localStorage.setItem('email', response.email);
        this.router.navigate(['/dashboard']);
      },
      error: (err: HttpErrorResponse) => {
        this.errorMessage = err.error?.message || 'Errore durante il login.';
        this.showAlert = true;
        setTimeout(() => {
          this.showAlert = false;
        }, 3000);
      },
    });
  }


  openPasswordReset() {
    this.showPasswordResetPopup = true;
    this.resetEmail = '';
  }


  closePasswordResetPopup() {
    this.showPasswordResetPopup = false;
  }


  onResetPassword() {
    if (this.resetEmail) {
      this.loginService.resetPassword(this.resetEmail).subscribe(
        response => {
          this.showSuccessAlert = true;

          setTimeout(() => {
            this.showSuccessAlert = false;
            this.showPasswordResetPopup = false;
          }, 3000);
        },
        error => {
          console.error('Errore invio reset:', error);
          alert(`Errore nel backend: ${error.message || error.statusText}`);
        }
      );
    } else {
      alert('Inserisci un indirizzo email valido.');
    }
  }
}
