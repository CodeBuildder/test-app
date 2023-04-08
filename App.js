import 'react-native-gesture-handler';
import React, {useEffect, Suspense, useCallback, useState} from 'react';
import {Platform, UIManager, Text, SafeAreaView} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {RecoilRoot, useRecoilState, useSetRecoilState} from 'recoil';

import RootStackNavigators from './src/navigators/RootStackNavigator';
import Login from './src/pages/Login';
import Toast from './src/components/Base/Toast';

import {getValue} from './src/utils';
import {
  getVessel,
  getSchedule,
  getVesselEquipment,
  getVesselChecklists,
} from './src/api';

import {AuthState, defaultAuthState} from './src/atoms/AuthState';
import {VesselState} from './src/atoms/VesselState';
import {ScheduleState} from './src/atoms/ScheduleState';
import {ToastState} from './src/atoms/ToastState';
import {EquipmentState} from './src/atoms/EquipmentState';
import {ChecklistState} from './src/atoms/ChecklistState';
import syncResponsesService from './src/services/syncResponses';

import {createConnection} from 'typeorm/browser';
import {ChecklistEntity} from './src/data/checklist/Checklist.schema';

import NetInfo from '@react-native-community/netinfo';
import {SyncState} from './src/atoms/SyncState';

if (
  Platform.OS === 'android' &&
  UIManager.setLayoutAnimationEnabledExperimental
) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

const App = () => {
  useEffect(() => {
    NetInfo.configure({
      reachabilityUrl: 'http://norinco.ieeesrmist.in/api/v1',
      reachabilityTest: async response => response.status === 200,
      reachabilityLongTimeout: 60 * 1000,
      reachabilityShortTimeout: 5 * 1000,
      reachabilityRequestTimeout: 15 * 1000,
      reachabilityShouldRun: () => true,
    });
  }, []);

  return (
    <RecoilRoot>
      <Suspense fallback={<Text>loading...</Text>}>
        <NavigatorRoot />
      </Suspense>
      <Toast />
    </RecoilRoot>
  );
};

const NavigatorRoot = () => {
  const [defaultConnection, setConnection] = useState(null);

  const [auth, setAuth] = useRecoilState(AuthState);
  const [vessel, setVessel] = useRecoilState(VesselState);
  const [schedules, setSchedules] = useRecoilState(ScheduleState);
  const [equipments, setEquipments] = useRecoilState(EquipmentState);
  const [checklists, setChecklists] = useRecoilState(ChecklistState);
  const [sync, setSync] = useRecoilState(SyncState);
  const setToast = useSetRecoilState(ToastState);

  const loadData = () => {
    setSchedules({...schedules, loading: true});
    setEquipments({...equipments, loading: true});
    setChecklists({...checklists, loading: true});
    Promise.all([
      getSchedule(auth.access_token, vessel?.data?.id),
      getVesselEquipment(auth.access_token, vessel?.data?.id),
      getVesselChecklists(auth.access_token, vessel?.data?.id),
    ]).then(([scheduleData, equipmentsData, checklistData]) => {
      if (
        !scheduleData.error ||
        !equipmentsData.error ||
        !checklistData.error
      ) {
        const tmpEquipment = {};
        equipmentsData.forEach(e => (tmpEquipment[e.sno] = e));

        setSchedules({loading: false, data: scheduleData});
        setEquipments({loading: false, data: tmpEquipment});
        setChecklists({loading: false, data: checklistData});
      } else {
        setSchedules({...schedules, loading: false});
        setEquipments({...equipments, loading: false});
        setChecklists({...equipments, loading: false});
        setToast({
          visible: true,
          message: 'Error Loading Vessel data',
          type: 'danger',
        });
      }
    });
  };

  const setupConnection = useCallback(async () => {
    try {
      const connection = await createConnection({
        type: 'react-native',
        database: 'test',
        location: 'default',
        logging: ['error'],
        entities: [ChecklistEntity],
      });

      await connection.synchronize(); // Reinitialises sqlite database

      setConnection(connection);
    } catch (error) {
      setToast({
        visible: true,
        message: 'Error Creating Local Database',
        type: 'danger',
      });
    }
  }, []);

  useEffect(() => {
    (() =>
      getValue('@auth').then(data => {
        if (data) {
          setAuth(data);
        } else {
          setAuth(defaultAuthState);
        }
      }))();
    setupConnection();
  }, []);

  useEffect(() => {
    if (auth.logged) {
      (async () => {
        setVessel({...vessel, loading: true});
        getVessel(auth.access_token, auth.user?.vesselId).then(data => {
          if (!data.error) {
            setVessel({data: data, loading: false});
          } else {
            setToast({
              visible: true,
              message: data.message,
              type: 'danger',
            });
          }
        });
      })();
    }
  }, [auth]);

  useEffect(() => {
    if (vessel.data?.id) {
      loadData();

      if (!sync.synced) {
        const serviceInterval = setInterval(
          () => syncResponsesService(),
          10000,
        );

        return () => clearInterval(serviceInterval);
      }
    }
  }, [vessel, sync]);

  return (
    <SafeAreaView style={{flex: 1}}>
      <NavigationContainer>
        {auth.logged ? <RootStackNavigators /> : <Login />}
      </NavigationContainer>
    </SafeAreaView>
  );
};

export default App;
