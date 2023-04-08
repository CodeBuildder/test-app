import {atom} from 'recoil';
import {SYNC} from '../constants';
import {localForageEffect} from './PersistStorage';

// Keeps track of the sync state of the checks
const defaultSyncState = {
  timestamp: null,
  inProgress: false,
  synced: false,
};

export const SyncState = atom({
  key: SYNC,
  default: defaultSyncState,
  effects_UNSTABLE: [localForageEffect(SYNC)],
});
