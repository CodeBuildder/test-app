import {atom} from 'recoil';
import {TOAST} from '../constants';

export const defaultToastState = {
  visible: false,
  message: '',
  type: 'danger',
};

export const ToastState = atom({
  key: TOAST,
  default: defaultToastState,
});
