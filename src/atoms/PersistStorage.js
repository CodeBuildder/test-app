import {DefaultValue} from 'recoil';
import {getValue, setValue, removeValue} from '../utils';

export const localForageEffect =
  key =>
  ({setSelf, onSet}) => {
    setSelf(
      getValue(key).then(savedValue =>
        savedValue !== null ? savedValue : new DefaultValue(),
      ),
    );

    onSet((newValue, _, isReset) => {
      isReset ? removeValue(key) : setValue(key, newValue);
    });
  };
