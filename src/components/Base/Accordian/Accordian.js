import React from 'react';
import {
  View,
  Text,
  TouchableWithoutFeedback,
  StyleSheet,
  LayoutAnimation,
} from 'react-native';
import {useNavigation, useFocusEffect} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';
import {useRecoilValue} from 'recoil';
import {EquipmentState} from '../../../atoms/EquipmentState';
import {DateState} from '../../../atoms/DateState';
import {keys} from '../../../atoms/ScheduleState';
import {getLocalChecklists} from '../../../data/checklist/Checklist.model';

const Accordian = ({header, list, open}) => {
  const navigation = useNavigation();
  const [opened, setOpened] = React.useState(open ?? false);
  const [checked, setChecked] = React.useState({});
  const Day = useRecoilValue(DateState);
  const equipments = useRecoilValue(EquipmentState);

  useFocusEffect(
    React.useCallback(() => {
      (async () => {
        const services = await getLocalChecklists({
          where: {timestamp: Day.format('YYYY-MM-DD')},
        });

        let tmpChecked = {};
        services.forEach(service => {
          tmpChecked[service.eid] = true;
        });

        setChecked(tmpChecked);
      })();
    }, [Day]),
  );

  if (!list.length) {
    return <React.Fragment />;
  }

  return (
    <View style={styles.container}>
      <TouchableWithoutFeedback
        onPress={() => {
          LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
          setOpened(!opened);
        }}>
        <View style={[styles.header, opened && styles.headeropen]}>
          <Text style={styles.headertext}>{header}</Text>
          <Icon
            name="chevron-up"
            color={'#F27062'}
            size={20}
            style={{transform: [{rotate: opened ? '180deg' : '0deg'}]}}
          />
        </View>
      </TouchableWithoutFeedback>
      <View style={[styles.list]}>
        {opened &&
          list.map((item, index) => (
            <TouchableWithoutFeedback
              key={index}
              onPress={() => {
                if (
                  !checked[equipments.data[item].id] &&
                  Day.isSame(new Date(), 'day')
                ) {
                  navigation.navigate('Checklist', {
                    item: equipments.data[item],
                    header,
                    type: Object.keys(keys).filter(k => keys[k] === header)[0],
                  });
                }
              }}>
              <View
                style={[
                  styles.listitem,
                  {borderBottomWidth: index === list.length - 1 ? 0 : 1},
                ]}>
                <View style={styles.listitemtext}>
                  <Text style={styles.listitemname} numberOfLines={1}>
                    {equipments.data[item].name}
                  </Text>
                </View>
                <Text style={styles.listitemsno}>
                  {' '}
                  #{equipments.data[item].sno}
                </Text>
                <Icon
                  name="checkmark-circle"
                  color={checked[equipments.data[item].id] ? '#0BB61C' : '#ccc'}
                  size={20}
                  style={{marginLeft: 8}}
                />
              </View>
            </TouchableWithoutFeedback>
          ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    margin: 8,
    elevation: 4,
  },
  header: {
    backgroundColor: '#fff',
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderRadius: 4,
    borderLeftWidth: 4,
    borderLeftColor: '#FFF',
    elevation: 6,
  },
  headeropen: {
    borderLeftColor: '#F27062',
    borderLeftWidth: 4,
  },
  headertext: {
    fontSize: 18,
    fontWeight: '600',
  },
  list: {
    overflow: 'hidden',
    borderBottomLeftRadius: 4,
    borderBottomRightRadius: 4,
  },
  listitem: {
    paddingLeft: 18,
    paddingRight: 16,
    paddingVertical: 14,
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#FDF2F4',
    borderColor: '#DFDFDF',
  },
  listitemname: {
    fontSize: 16,
  },
  listitemsno: {
    fontSize: 16,
    color: '#666666',
  },
  listitemtext: {flexDirection: 'row', flex: 1},
});

export default Accordian;
