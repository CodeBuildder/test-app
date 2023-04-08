import {atom} from 'recoil';
import {CHECKLIST} from '../constants';
import {localForageEffect} from './PersistStorage';

export const defaultChecklistState = {loading: false, data: {}};

export const ChecklistState = atom({
  key: CHECKLIST,
  default: defaultChecklistState,
  effects_UNSTABLE: [localForageEffect(CHECKLIST)],
});
