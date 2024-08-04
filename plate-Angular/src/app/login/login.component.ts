import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  imports: [CommonModule, FormsModule],
})
export class LoginComponent {
  username: string = '';
  password: string = '';

  constructor(private router: Router) {}

  // Login check
  login() {
    if (this.username === 'admin' && this.password === '1234') {
      localStorage.setItem('isLoggedIn', 'true');
      const redirectUrl = localStorage.getItem('redirectUrl') || '/admin';
      localStorage.removeItem('redirectUrl');
      this.router.navigate([redirectUrl]);
    } else {
      alert('Invalid username or password');
    }
  }
}
