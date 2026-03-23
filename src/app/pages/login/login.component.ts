import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Route, Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  constructor(private route:Router){}

 loginError = false;

  // ✅ Dummy credentials
  dummyUser = {
    email: 'admin@gmail.com',
    password: '123456'
  };

  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', Validators.required)
  });

  onLogin() {
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    }

    const { email, password } = this.loginForm.value;

    if (
      email === this.dummyUser.email &&
      password === this.dummyUser.password
    ) {
      this.loginError = false;
      alert('Login Successful ✅');

      // navigate to dashboard
      this.route.navigate(['/layout']);

    } else {
      this.loginError = true;
    }
  }
}
