import NetInfo, {useNetInfo} from '@react-native-community/netinfo';
import {useEffect, useState} from 'react';

export const NetConfig = {
  reachabilityUrl: 'http://norinco.ieeesrmist.in/api/v1',
  reachabilityTest: async response => response.status >= 200,
  reachabilityLongTimeout: 60 * 1000,
  reachabilityShortTimeout: 10 * 1000,
  reachabilityRequestTimeout: 30 * 1000,
  reachabilityShouldRun: () => true,
};

export const useNetwork = () => {
  const network = useNetInfo(NetConfig);

  return network;
};
