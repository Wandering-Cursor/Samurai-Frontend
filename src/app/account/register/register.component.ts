import { Component } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';

// Register Auth
import { AuthenticationService } from 'src/app/core/services/auth.service';
import { UserProfileService } from 'src/app/core/services/user.service';
import { Register } from 'src/app/store/Authentication/authentication.actions';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})

export class RegisterComponent {
  // Register Form
  signupForm!: UntypedFormGroup;
  submitted = false;
  successmsg = false;
  error = '';
  // set the current year
  year: number = new Date().getFullYear();

  fieldTextType!: boolean;

  constructor(
    private formBuilder: UntypedFormBuilder,
    private authService: AuthenticationService, // Inject the AuthenticationService
    public store: Store
  ) { }

  ngOnInit(): void {
    /**
     * Form Validation
     */
    this.signupForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      username: ['', [Validators.required]], // Add username field
      password: ['', Validators.required],
      registration_code: ['', Validators.required], // Add registration_code field
    });
  }

  // convenience getter for easy access to form fields
  get f() { return this.signupForm.controls; }

  /* Register submit form */
  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.signupForm.invalid) {
      return;
    }

    const email = this.f['email'].value;
    const username = this.f['username'].value; // Get username value
    const password = this.f['password'].value;
    const registration_code = this.f['registration_code'].value; // Get registration_code value

    // Call the register method from AuthenticationService
    this.authService.register(email, password, registration_code, username).subscribe({
      next: (user) => {
        // Handle successful registration
        console.log('Registration successful', user);
        this.successmsg = true;
        // You might want to navigate to a different page or show a success message
      },
      error: (error) => {
        // Handle registration error
        console.error('Registration failed', error);
        this.error = error;
        this.successmsg = false;
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