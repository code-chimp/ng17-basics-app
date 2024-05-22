/**
 * User is a class that represents a user in the application.
 * It includes the user's email, id, token, and token expiration date.
 */
export class User {
  /**
   * Constructs a new User instance.
   *
   * @param {string} email - The email of the user.
   * @param {string} id - The id of the user.
   * @param {string} _token - The token of the user.
   * @param {Date} _tokenExpirationDate - The token expiration date of the user.
   */
  constructor(
    public email: string,
    public id: string,
    private _token: string,
    private _tokenExpirationDate: Date,
  ) {}

  /**
   * token is a getter method that returns the user's token if it has not expired.
   * If the token has expired or does not exist, it returns null.
   *
   * @returns {string | null} - The user's token or null if the token has expired or does not exist.
   */
  get token() {
    if (!this._tokenExpirationDate || new Date() > this._tokenExpirationDate) {
      return null;
    }

    return this._token;
  }
}
