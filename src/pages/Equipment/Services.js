import React, {useState, useEffect} from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  LayoutAnimation,
  RefreshControl,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {useNetInfo} from '@react-native-community/netinfo';
import {Accordian} from '../../components/Base/Accordian';
import {Button, Calendar} from '../../components/Base';
import {useRecoilState, useSetRecoilState, useRecoilValue} from 'recoil';
import {AuthState} from '../../atoms/AuthState';
import {VesselState} from '../../atoms/VesselState';
import {ScheduleState, keys} from '../../atoms/ScheduleState';
import {EquipmentState} from '../../atoms/EquipmentState';
import {ChecklistState} from '../../atoms/ChecklistState';
import {DateState} from '../../atoms/DateState';
import {ToastState} from '../../atoms/ToastState';
import {getVesselChecklists, getSchedule, getVesselEquipment} from '../../api';
import moment from 'moment';

const Service = () => {
  const [schedules, setSchedules] = useRecoilState(ScheduleState);
  const [equipments, setEquipments] = useRecoilState(EquipmentState);
  const [checklists, setChecklists] = useRecoilState(ChecklistState);
  const [day, setDay] = useRecoilState(DateState);
  const setToast = useSetRecoilState(ToastState);
  const auth = useRecoilValue(AuthState);
  const vessel = useRecoilValue(VesselState);
  const [month, setMonth] = useState(day);
  const [calopen, setCalopen] = useState(false);

  const setDate = type => {
    (calopen ? setMonth : setDay)(
      moment(calopen ? month : day)[type === 'increment' ? 'add' : 'subtract'](
        1,
        calopen ? 'months' : 'days',
      ),
    );
  };

  const getEquipmentsList = service => {
    let d = parseInt(day.format('DD'));
    let m = day.format('MMMM');
    return schedules.data?.[service]?.[d]?.[m]
      ? schedules.data[service][d][m].split(',').map(sno => parseFloat(sno))
      : [];
  };

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

  useEffect(() => !calopen && setMonth(day), [calopen]);

  return (
    <React.Fragment>
      <View style={styles.datechanger}>
        <Button
          onPress={() => setDate('decrement')}
          Icon={() => <Icon name="chevron-back" color={'#FFF'} size={20} />}
          style={{
            backgroundColor: '#F27062',
            elevation: 0,
            borderRadius: 50,
          }}
        />
        <Button
          onPress={() => {
            LayoutAnimation.configureNext(
              LayoutAnimation.Presets.easeInEaseOut,
            );
            setCalopen(!calopen);
          }}
          titleStyle={{fontSize: 20, color: '#fff'}}
          style={{
            backgroundColor: '#F27062',
            elevation: 0,
            borderRadius: 50,
          }}>
          {(calopen ? month : day).format(
            calopen ? 'MMMM YYYY' : 'Do, MMM YYYY',
          )}
        </Button>
        <Button
          onPress={() => setDate('increment')}
          Icon={() => <Icon name="chevron-forward" color={'#FFF'} size={20} />}
          style={{
            backgroundColor: '#F27062',
            elevation: 0,
            borderRadius: 50,
          }}
        />
      </View>
      <View>
        {calopen && <Calendar setDay={val => setDay(val)} month={month} />}
      </View>
      <View style={styles.equipmentContainer}>
        <ScrollView
          style={styles.scroll}
          refreshControl={
            <RefreshControl
              refreshing={
                equipments.loading || schedules.loading || checklists.loading
              }
              onRefresh={loadData}
            />
          }>
          {!equipments.loading &&
            !schedules.loading &&
            !checklists.loading &&
            Object.keys(keys).map(key => (
              <Accordian
                key={key}
                header={keys[key]}
                list={getEquipmentsList(key)}
                open={true}
              />
            ))}
        </ScrollView>
      </View>
    </React.Fragment>
  );
};

const styles = StyleSheet.create({
  datechanger: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#F27062',
    padding: 16,
  },
  equipmentContainer: {
    flex: 1,
    width: '100%',
    alignSelf: 'center',
    marginHorizontal: 8,
    padding: 10,
    textAlign: 'center',
    backgroundColor: '#FFF',
  },
  scroll: {
    flex: 1,
    height: '100%',
  },
  container: {
    height: '100%',
  },
});

export default Service;
