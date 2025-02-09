import {User} from '../models/User.model';
import {CollectRequest} from '../models/collect-request.model';

export interface AppState {
  auth: AuthState;
}

export interface AuthState {
  user: User | null;
  isLoggedIn: boolean;
}
