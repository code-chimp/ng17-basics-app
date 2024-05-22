import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { BehaviorSubject, catchError, Observable, throwError } from 'rxjs';
import { tap } from 'rxjs/operators';

import { AuthErrors } from '../@enumerations/AuthErrors';
import { IAuthResponse } from '../@interfaces/IAuthResponse';
import { ISignInResponse } from '../@interfaces/ISignInResponse';
import { ISignUpResponse } from '../@interfaces/ISignUpResponse';
import { User } from '../models/user.model';
import { Router } from '@angular/router';

/**
 * AuthService is a service that provides methods for user authentication.
 * It uses Firebase Authentication REST API for user sign up and sign in.
 *
 * @Injectable({ providedIn: 'root' }) decorator indicates that this service should be created
 * by the root application injector.
 */
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private http = inject(HttpClient);
  private router = inject(Router);
  private apiKey = 'AIzaSyDXXDumlq_luF2TzNsKJqbQzDGw2mpBCmE';
  private expirationTimer: any;

  /**
   * user is a Subject of User model. It is used to emit the authenticated user.
   */
  user = new BehaviorSubject<User>(null);

  /**
   * handleError method is a private method that handles HTTP errors translating them to user-friendly messages.
   *
   * @param {HttpErrorResponse} error - The error response from the HTTP request.
   * @returns {Observable<never>} - An Observable of never type.
   */
  private handleError(error: HttpErrorResponse): Observable<never> {
    let message = 'An unknown error occurred. Please try again.';

    switch (error.error?.error?.message) {
      case AuthErrors.EmailExists: {
        message = 'The email address is already in use by another account.';
        break;
      }

      case AuthErrors.EmailNotFound: {
        message =
          'There is no user record corresponding to this identifier. The user may have been deleted.';
        break;
      }

      case AuthErrors.InvalidLoginCredentials: {
        message = 'The email and password combination is invalid.';
        break;
      }

      case AuthErrors.InvalidPassword: {
        message = 'The password is invalid or the user does not have a password.';
        break;
      }

      case AuthErrors.OperationNotAllowed: {
        message = 'Password sign-in is disabled for this project.';
        break;
      }

      case AuthErrors.TooManyAttempts: {
        message =
          'We have blocked all requests from this device due to unusual activity. Try again later.';
        break;
      }

      case AuthErrors.UserDisabled: {
        message = 'The user account has been disabled by an administrator.';
        break;
      }
    }

    return throwError(() => new Error(message));
  }

  /**
   * handleError method is a private method that handles HTTP errors translating them to user-friendly messages.
   *
   * @param {HttpErrorResponse} error - The error response from the HTTP request.
   * @returns {Observable<never>} - An Observable of never type.
   */
  private createUser(resp: IAuthResponse) {
    const { email, localId, idToken, expiresIn } = resp;

    const user = new User(
      email,
      localId,
      idToken,
      new Date(new Date().getTime() + +expiresIn * 1000),
    );

    localStorage.setItem('userData', JSON.stringify(user));
    this.user.next(user);
    this.autoSignOut(+expiresIn * 1000);
  }

  /**
   * autoSignIn method checks if the user is authenticated by checking the local storage.
   */
  autoSignIn() {
    const userData = JSON.parse(localStorage.getItem('userData'));

    if (!userData) {
      return;
    }

    const { email, id, _token, _tokenExpirationDate } = userData;

    const loadedUser = new User(email, id, _token, new Date(_tokenExpirationDate));

    // Check if the token is valid
    if (loadedUser.token) {
      const duration = new Date(_tokenExpirationDate).getTime() - new Date().getTime();
      this.autoSignOut(duration);

      this.user.next(loadedUser);
    }
  }

  /**
   * autoSignOut method signs out the authenticated user after a certain duration.
   *
   * @param {number} duration - The duration in milliseconds.
   */
  autoSignOut(duration: number) {
    this.expirationTimer = setTimeout(() => {
      this.signOut();
    }, duration);
  }

  /**
   * signUp method sends a POST request to the Firebase Authentication REST API
   * to create a new user account with the provided email and password.
   *
   * @param {string} email - The email of the user.
   * @param {string} password - The password of the user.
   * @returns {Observable<IAuthResponse>} - An Observable of the IAuthResponse interface.
   */
  signUp(email: string, password: string): Observable<IAuthResponse> {
    return this.http
      .post<ISignUpResponse>(
        `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${this.apiKey}`,
        {
          email,
          password,
          returnSecureToken: true,
        },
      )
      .pipe(
        catchError(this.handleError),
        tap(res => {
          this.createUser(res);
        }),
      );
  }

  /**
   * signIn method sends a POST request to the Firebase Authentication REST API
   * to authenticate a user with the provided email and password.
   *
   * @param {string} email - The email of the user.
   * @param {string} password - The password of the user.
   * @returns {Observable<IAuthResponse>} - An Observable of the IAuthResponse interface.
   */
  signIn(email: string, password: string): Observable<IAuthResponse> {
    return this.http
      .post<ISignInResponse>(
        `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${this.apiKey}`,
        {
          email,
          password,
          returnSecureToken: true,
        },
      )
      .pipe(
        catchError(this.handleError),
        tap(res => {
          this.createUser(res);
        }),
      );
  }

  /**
   * signOut method signs out the authenticated user.
   */
  signOut() {
    if (this.expirationTimer) {
      clearTimeout(this.expirationTimer);
      this.expirationTimer = null;
    }

    this.user.next(null);
    localStorage.removeItem('userData');
    this.router.navigate(['/auth']);
  }
}
