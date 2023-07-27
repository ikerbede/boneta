import { User } from '../../shared/models/user.model';
import { JsonWebToken } from './json-web-token.model';

export interface UserToken {
  user: User;
  token: JsonWebToken;
}
