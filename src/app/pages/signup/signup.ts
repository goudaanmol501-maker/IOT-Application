import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgClass } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { Auth } from '../../services/auth';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [
    FormsModule,   // ← needed for [(ngModel)] and (ngSubmit)
    NgClass,       // ← needed for [ngClass]
    RouterLink,    // ← needed for routerLink="/login"
  ],
  templateUrl: './signup.html',
  styleUrls: ['./signup.css']
})
export class Signup {

  email    = '';
  password = '';
  showPassword    = false;
  isLoading       = false;
  formState       = '';
  statusMessage   = '';
  emailRipple     = false;
  passwordRipple  = false;
  emailActive     = false;
  passwordActive  = false;

  constructor(private router: Router, private auth: Auth) {}

  get passwordStrength(): number {
    let score = 0;
    if (this.password.length >= 6)       score++;
    if (this.password.length >= 10)      score++;
    if (/[A-Z]/.test(this.password))     score++;
    if (/[0-9]/.test(this.password))     score++;
    return score;
  }

  get strengthLabel(): string {
    const labels = ['', 'WEAK', 'FAIR', 'GOOD', 'STRONG'];
    return labels[this.passwordStrength];
  }

  get strengthColor(): string {
    const colors = [
      '',
      'text-red-400',
      'text-yellow-400',
      'text-blue-400',
      'text-green-400'
    ];
    return colors[this.passwordStrength];
  }

  // ripple on email keystroke
  onEmailInput() {
    this.emailRipple = false;
    setTimeout(() => { this.emailRipple = true;  }, 10);
    setTimeout(() => { this.emailRipple = false; }, 510);
  }

  // ripple on password keystroke
  onPasswordInput() {
    this.passwordRipple = false;
    setTimeout(() => { this.passwordRipple = true;  }, 10);
    setTimeout(() => { this.passwordRipple = false; }, 510);
  }

  togglePassword() {
    this.showPassword = !this.showPassword;
  }

  isValidEmail(): boolean {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(this.email);
  }

  onSubmit() {
    // validation checks
    if (!this.email || !this.password) {
      this.formState     = 'error';
      this.statusMessage = 'ACCESS DENIED — ALL FIELDS REQUIRED';
      return;
    }

    if (!this.isValidEmail()) {
      this.formState     = 'error';
      this.statusMessage = 'ACCESS DENIED — INVALID NODE ID FORMAT';
      return;
    }

    if (this.password.length < 6) {
      this.formState     = 'error';
      this.statusMessage = 'ACCESS DENIED — ENCRYPTION KEY TOO SHORT';
      return;
    }

    // show loading
    this.isLoading     = true;
    this.formState     = '';
    this.statusMessage = '';

    // simulate API — 2 seconds
    setTimeout(() => {
      const success = this.auth.registerUser(this.email, this.password);
      this.isLoading     = false;
      if(success){
        this.formState     = 'success';
        this.statusMessage = 'ACCESS GRANTED — INITIALIZING TERMINAL...';
       
      // navigate to login after success
      setTimeout(() => {
        this.router.navigate(['/login']);
      }, 1500);
    } else{
      this.formState     = 'error';
      this.statusMessage = 'ACCESS DENIED — USER ALREADY EXISTS';
    }
    }, 2000);
  }
}