import { CommonModule } from '@angular/common';
import { Component, NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-login',
  imports: [CommonModule,FormsModule ],
  templateUrl: './login.html',
  styleUrl: './login.scss',
})
export class Login {
email: string = '';
  password: string = '';
  confirmPassword: string = '';
  isRegistered: boolean | null = null; // null = not checked yet

  emailStep: boolean = true;
  loginStep: boolean = false;
  signupStep: boolean = false;

  // Step 1: check email with backend
  checkEmail() {
    // Call backend API: e.g., /api/check-email
    // Fake example:
    if (this.email === 'registered@example.com') {
      this.isRegistered = true;
      this.emailStep = false;
      this.loginStep = true;
    } else {
      this.isRegistered = false;
      this.emailStep = false;
      this.signupStep = true;
    }
  }

  // Step 2a: Login submit
  login() {
    console.log('Logging in', this.email, this.password);
    // Call backend login API
  }

  // Step 2b: Signup submit
  signup() {
    console.log('Signing up', this.email, this.password, this.confirmPassword);
    // Call backend signup API
  }
}