import { Component } from '@angular/core'; 
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { LoginService } from '../../services/login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [LoginService],
})
export class LoginComponent {
  loginForm: FormGroup;
  errorMessage: string = '';
  showAlert: boolean = false;

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
      next: (response) => {
        // Salva il token nel localStorage
        this.loginService.saveToken(response.token);

        // Naviga alla pagina /menu
        this.router.navigate(['/menu']);
      },
      error: (err) => {
        this.errorMessage = err.error?.message || 'Errore durante il login.';
        this.showAlert = true;
        setTimeout(() => {
          this.showAlert = false;
        }, 3000);
      }
    });
  }
}
