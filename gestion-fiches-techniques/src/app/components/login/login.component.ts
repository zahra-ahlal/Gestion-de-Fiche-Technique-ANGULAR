import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  signinForm !: FormGroup;
  errorMessage: string ="";

  constructor(private formBuilder: FormBuilder,
              private authService: AuthService,
              private router : Router) { }

  ngOnInit() {
    this.initForm();
  }

  initForm() {
    this.signinForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.pattern(/[0-9a-zA-Z]{6,}/)]]
    });
  }

  onSubmit() {
    const email = this.signinForm?.get('email')?.value;
    const password = this.signinForm?.get('password')?.value;

    this.authService.signInUser(email, password).then(
      () => {
        this.router.navigate(['/accueil']);
        console.log("SUCCESS");
      },
      (error) => {
        this.errorMessage = error;
      }
    );
  }
}