import {atom} from 'recoil';
import {VESSEL} from '../constants';
import {localForageEffect} from './PersistStorage';

export const defaultVesselState = {
  loading: false,
  data: {
    id: 0,
    name: '',
  },
};

export const VesselState = atom({
  key: VESSEL,
  default: defaultVesselState,
  effects_UNSTABLE: [localForageEffect(VESSEL)],
});
