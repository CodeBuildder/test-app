import {atom} from 'recoil';
import {AUTH} from '../constants';

export const defaultAuthState = {logged: false, user: {}, access_token: ''};

export const AuthState = atom({
  key: AUTH,
  default: defaultAuthState,
});
