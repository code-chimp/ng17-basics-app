export enum AuthErrors {
  EmailExists = 'EMAIL_EXISTS',
  EmailNotFound = 'EMAIL_NOT_FOUND',
  InvalidEmail = 'INVALID_EMAIL',
  InvalidLoginCredentials = 'INVALID_LOGIN_CREDENTIALS',
  InvalidPassword = 'INVALID_PASSWORD',
  OperationNotAllowed = 'OPERATION_NOT_ALLOWED',
  TokenExpired = 'TOKEN_EXPIRED',
  TooManyAttempts = 'TOO_MANY_ATTEMPTS_TRY_LATER',
  UserDisabled = 'USER_DISABLED',
  UserNotFound = 'USER_NOT_FOUND',
  WeakPassword = 'WEAK_PASSWORD',
}
