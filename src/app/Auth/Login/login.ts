import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, signal, inject } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './login.html',
  styleUrls: ['./login.scss'],
})
export class Login {
 step: 'email' | 'password' | 'signup' = 'email';
  loading = false;
  error = '';
  currentEmail = '';

  // Forms will be created in constructor
  emailForm: any;
  passwordForm: any;
  signupForm: any;

  api = 'https://localhost:7279/api/UserRegister';

  constructor(
    private fb: FormBuilder,     // Normal injection (easiest way)
    private http: HttpClient
  ) {
    // Create forms here → no more "used before initialization" error
    this.emailForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]]
    });

    this.passwordForm = this.fb.group({
      password: ['', [Validators.required, Validators.minLength(6)]]
    });

    this.signupForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirm: ['', Validators.required]
    });
  }

  checkEmail() {
    if (this.emailForm.invalid) {
      this.error = 'Enter a valid email';
      return;
    }
    this.loading = true;
    this.error = '';
    const email = this.emailForm.value.email;

    this.http.post<boolean>(`${this.api}/emaiulcheck`, { email }).subscribe({
      next: (exists) => {
        this.currentEmail = email;
        this.step = exists ? 'password' : 'signup';
        if (!exists) this.signupForm.patchValue({ email });
        this.loading = false;
      },
      error: () => {
        this.error = 'Cannot check email';
        this.loading = false;
      }
    });
  }

  login() {
    if (this.passwordForm.invalid) {
      this.error = 'Password too short';
      return;
    }
    this.loading = true;
    this.error = '';

    this.http.post(`${this.api}/login`, {
      email: this.currentEmail,
      password: this.passwordForm.value.password
    }).subscribe({
      next: () => alert('Login Success! 🎉'),
      error: () => {
        this.error = 'Wrong password';
        this.loading = false;
      }
    });
  }

  signup() {
    if (this.signupForm.invalid || this.signupForm.value.password !== this.signupForm.value.confirm) {
      this.error = 'Check all fields and passwords must match';
      return;
    }

    this.loading = true;
    this.error = '';

    const body = {
      username: this.signupForm.value.username,
      email: this.currentEmail,
      password: this.signupForm.value.password
    };

    this.http.post(`${this.api}/signup`, body).subscribe({
      next: () => {
        alert('Account created! Now you can login');
        this.step = 'password';
        this.loading = false;
      },
      error: () => {
        this.error = 'Signup failed';
        this.loading = false;
      }
    });
  }

  goBack() {
    this.step = 'email';
    this.error = '';
    this.passwordForm.reset();
    this.signupForm.reset();
  }
}