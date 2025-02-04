import {User} from '../models/user.model';
import {CollectRequest} from '../models/collect-request.model';

export interface AppState {
  auth: AuthState;
  collect: CollectState;
}

export interface AuthState {
  user: User | null;
  isLoggedIn: boolean;
}

export interface CollectState {
  requests: CollectRequest[];
  selectedRequest: CollectRequest | null;
}
