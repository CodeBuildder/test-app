import React from 'react';
import {
  ScrollView,
  FlatList,
  View,
  TouchableWithoutFeedback,
  Text,
  StyleSheet,
} from 'react-native';
import {useRecoilValue} from 'recoil';
import Icon from 'react-native-vector-icons/Ionicons';
import {EquipmentState} from '../atoms/EquipmentState';
import Search from './Search';

const Equipment = ({equipment, onPress}) => (
  <TouchableWithoutFeedback onPress={onPress}>
    <View style={styles.equipment}>
      <View style={styles.equipmenttext}>
        <Text style={styles.equipmentname} numberOfLines={1}>
          {equipment.name}
        </Text>
      </View>
      <Text style={styles.equipmentsno}> #{equipment.sno}</Text>
      <Icon
        name="chevron-forward"
        color={'#999'}
        size={20}
        style={{marginLeft: 8}}
      />
    </View>
  </TouchableWithoutFeedback>
);

const EquipmentSearch = ({onEquipmentPress}) => {
  const equipments = useRecoilValue(EquipmentState);
  const [searchtext, setSearchtext] = React.useState('');

  const renderItem = ({item: equipment}) => (
    <Equipment
      equipment={equipment}
      onPress={() => onEquipmentPress({equipment})}
    />
  );

  return (
    <React.Fragment>
      <Search setSearchtext={setSearchtext} />
      <FlatList
        data={Object.values(equipments.data)
          .filter(
            equipment =>
              equipment.name.toLowerCase().indexOf(searchtext.toLowerCase()) >
              -1,
          )
          .sort((a, b) => a.sno - b.sno)}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
        contentContainerStyle={{padding: 16}}
      />
    </React.Fragment>
  );
};

const styles = StyleSheet.create({
  separator: {paddingTop: 4},
  equipment: {
    paddingLeft: 18,
    paddingRight: 16,
    paddingVertical: 14,
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#FDF2F4',
    borderRadius: 4,
  },
  equipmenttext: {flexDirection: 'row', flex: 1},
  equipmentname: {fontSize: 16, fontWeight: '600'},
  equipmentsno: {fontSize: 16, color: '#666'},
});

export default EquipmentSearch;
