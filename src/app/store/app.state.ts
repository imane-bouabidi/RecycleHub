import {User} from '../models/user.model';
import {CollectRequest} from '../models/collect-request.model';

export interface AppState {
  auth: AuthState;
}

export interface AuthState {
  user: User | null;
  isLoggedIn: boolean;
}
