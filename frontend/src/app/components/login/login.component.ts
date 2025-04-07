import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { LoginService } from '../../services/login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [LoginService],
})
export class LoginComponent {
  loginForm: FormGroup;
  errorMessage: string = '';

  constructor(private loginService: LoginService, private router: Router) {
    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required])
    });
  }

  onLogin() {
    if (this.loginForm.invalid) {
      this.errorMessage = 'Compila correttamente tutti i campi.';
      return;
    }

    const { email, password } = this.loginForm.value;

    this.loginService.login(email, password).subscribe({
      next: () => {
        this.router.navigate(['/menu']);
      },
      error: (err) => {
        this.errorMessage = err.error?.message || 'Errore durante il login. Riprova più tardi.';
      }
    });
  }
}