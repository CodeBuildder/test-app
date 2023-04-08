import {atom} from 'recoil';
import {SCHEDULE} from '../constants';
import {localForageEffect} from './PersistStorage';

export const keys = {
  WS: 'Weekly Service',
  MS: 'Monthly Service',
  QS: 'Quarterly Service',
  YS: 'Yearly Service',
  FS: 'Fortnightly Service',
  ADD: 'At Dry Dock',
};

export const defaultScheduleState = {
  loading: false,
  data: {
    WS: {},
    MS: {},
    QS: {},
    YS: {},
    FS: {},
    ADD: {},
  },
};

export const ScheduleState = atom({
  key: SCHEDULE,
  default: defaultScheduleState,
  effects_UNSTABLE: [localForageEffect(SCHEDULE)],
});
