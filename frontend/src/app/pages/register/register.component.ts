import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  name: string = '';
  email: string = '';
  password: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  onRegister() {
    if (!this.name || !this.email || !this.password) {
      alert('Please fill in all fields');
      return;
    }

    this.authService.register({
      username: this.name,
      email: this.email,
      password: this.password
    }).subscribe({
      next: () => {
        alert('Registration successful!');
        this.router.navigate(['/login']);
      },
      error: (err) => {
        alert(err.error?.message || 'Registration failed');
      }
    });
  }
}
