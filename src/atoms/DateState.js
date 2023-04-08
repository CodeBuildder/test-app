import moment from 'moment';
import {atom} from 'recoil';
import {DATE} from '../constants';

export const DateState = atom({
  key: DATE,
  default: moment(),
});
