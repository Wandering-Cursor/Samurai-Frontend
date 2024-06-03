import { Component } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AuthenticationService } from 'src/app/core/services/auth.service';
import { AuthfakeauthenticationService } from 'src/app/core/services/authfake.service';
import { login } from 'src/app/store/Authentication/authentication.actions';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})

export class LoginComponent {
  // Login Form
  loginForm!: UntypedFormGroup;
  submitted = false;
  fieldTextType!: boolean;
  error = '';
  returnUrl!: string;

  // set the current year
  year: number = new Date().getFullYear();

  constructor(
    private formBuilder: UntypedFormBuilder,
    private router: Router,
    private store: Store,
    private authService: AuthenticationService // Inject the AuthenticationService
  ) { }

  ngOnInit(): void {
    if (localStorage.getItem('currentUser')) {
      this.router.navigate(['/']);
    }

    // Form Validation
    this.loginForm = this.formBuilder.group({
      username: ['', [Validators.required]], // Changed from 'email' to 'username'
      password: ['', [Validators.required]],
    });
  }

  // convenience getter for easy access to form fields
  get f() { return this.loginForm.controls; }

  /**
   * Form submit
   */
  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.loginForm.invalid) {
      return;
    }

    const username = this.f['username'].value; // Get the username from the form
    const password = this.f['password'].value; // Get the password from the form

    // Call the login method from AuthenticationService
    this.authService.login(username, password).subscribe({
      next: (authResponse) => {
        // Handle successful login
        this.router.navigate(['/tickets/list']); // Navigate to the home page or dashboard
      },
      error: (error) => {
        // Handle login error
        this.error = error;
      }
    });
  }

  /**
   * Password Hide/Show
   */
  toggleFieldTextType() {
    this.fieldTextType = !this.fieldTextType;
  }
}