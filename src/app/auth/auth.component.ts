import { Component, inject } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

import { IAuthForm } from './IAuthForm';
import { AuthService } from '../services/auth.service';
import { LoadingSpinnerComponent } from '../loading-spinner/loading-spinner.component';
import { IAuthResponse } from '../@interfaces/IAuthResponse';

@Component({
  selector: 'app-auth',
  standalone: true,
  imports: [ReactiveFormsModule, LoadingSpinnerComponent],
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.css',
})
export class AuthComponent {
  private authSvc = inject(AuthService);
  private router = inject(Router);

  isLoginMode = true;
  isPending = false;
  errorMessage: string | null = null;

  authForm = new FormGroup<IAuthForm>({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(8)]),
  });

  static verifyPasswordValidator: ValidatorFn = (
    control: AbstractControl,
  ): ValidationErrors | null => {
    return control.get('password')?.value === control.get('verifyPassword')?.value
      ? null
      : { unmatchedPassword: true };
  };

  handleModeSwitchClick() {
    this.isLoginMode = !this.isLoginMode;

    if (this.isLoginMode) {
      this.authForm.removeControl('verifyPassword');
      this.authForm.removeValidators(AuthComponent.verifyPasswordValidator);
    } else {
      this.authForm.addControl('verifyPassword', new FormControl('', Validators.required));
      this.authForm.addValidators(AuthComponent.verifyPasswordValidator);
    }
  }

  handleSubmitClick() {
    if (this.authForm.valid) {
      const { email, password } = this.authForm.value;
      let auth$: Observable<IAuthResponse>;

      this.isPending = true;

      if (this.isLoginMode) {
        auth$ = this.authSvc.signIn(email, password);
      } else {
        auth$ = this.authSvc.signUp(email, password);
      }

      auth$.subscribe({
        next: res => {
          this.isPending = false;
          this.isLoginMode = true;
          this.authForm.reset();
          this.router.navigate(['/recipes']);
        },
        error: err => {
          this.isPending = false;
          this.errorMessage = err.message;
        },
      });
    }
  }
}
