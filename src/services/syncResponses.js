import {ping, storeChecks} from '../api';

const syncResponsesService = () => {
  ping().then(console.log);
};

export default syncResponsesService;
