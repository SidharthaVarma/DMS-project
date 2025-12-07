import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { SocialAuthService, GoogleLoginProvider } from '@abacritt/angularx-social-login';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  email: string = '';
  password: string = '';
  isLoading = false;

  constructor(
    private authService: AuthService,
    private router: Router,
    private googleAuth: SocialAuthService
  ) {}

  onLogin() {
    if (!this.email || !this.password) {
      alert("Please fill in both fields!");
      return;
    }

    this.isLoading = true;

    this.authService.login({ email: this.email, password: this.password }).subscribe({
      next: (res) => {
        this.authService.saveToken(res.token);
        this.router.navigate(['/documents']); // 👈 Redirect to dashboard
      },
      error: (err) => {
        alert(err.error?.message || 'Login failed!');
        this.isLoading = false;
      }
    });
  }

  loginWithGoogle() {
    this.isLoading = true;

    this.googleAuth.signIn(GoogleLoginProvider.PROVIDER_ID)
      .then((user) => {
        const idToken = user.idToken;

        this.authService.googleLogin(idToken).subscribe({
          next: (res) => {
            this.authService.saveToken(res.token);
            this.router.navigate(['/documents']); // 👈 Redirect
          },
          error: () => {
            alert('Google login failed!');
            this.isLoading = false;
          }
        });
      })
      .catch(() => {
        alert('Google login popup blocked or cancelled');
        this.isLoading = false;
      });
  }
}
