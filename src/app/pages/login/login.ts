import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgClass } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { Auth } from '../../services/auth';
@Component({
  selector: 'app-login',
  imports: [FormsModule, NgClass, RouterLink],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  email    = '';
  password = '';
  showPassword    = false;
  isLoading       = false;
  formState       = '';
  statusMessage   = '';
  emailActive    = false;
  passwordActive  = false;

  constructor(private router: Router, private auth: Auth) {}

  togglePassword(){this.showPassword = !this.showPassword;}
 isValidEmail(): boolean {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(this.email);
  }

  onSubmit(){
    if(!this.email || !this.password){
      this.formState = 'error';
      this.statusMessage = 'Please fill in all fields';
      return;
    }
    if(!this.isValidEmail()){
      this.formState = 'error';
      this.statusMessage = 'Please enter a valid email';
      return;
    }
    this.isLoading = true;
    this.formState = '';
    this.statusMessage = '';

    setTimeout(() => {
      const isValid = this.auth.loginUser(this.email, this.password);
      this.isLoading = false;
      if (isValid) {
        this.formState = 'success';
        this.statusMessage = 'Login successful!';
        setTimeout(() => {
          this.router.navigate(['/dashboard']);
        },1500);
      } else {
        this.formState = 'error';
        this.statusMessage = 'Invalid email or password';
      }
    }, 2000);
  }

}
