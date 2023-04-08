import {atom} from 'recoil';
import {EQUIPMENT} from '../constants';
import {localForageEffect} from './PersistStorage';

export const defaultEquipmentState = {loading: false, data: {}};

export const EquipmentState = atom({
  key: EQUIPMENT,
  default: defaultEquipmentState,
  effects_UNSTABLE: [localForageEffect(EQUIPMENT)],
});
