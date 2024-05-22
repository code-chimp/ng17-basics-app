import { IAuthResponse } from './IAuthResponse';

export interface ISignInResponse extends IAuthResponse {
  displayName: string;
  registered: boolean;
}
