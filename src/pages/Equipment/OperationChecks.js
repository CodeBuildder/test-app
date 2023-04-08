import moment from 'moment';
import React from 'react';
import {
  Text,
  View,
  TouchableWithoutFeedback,
  FlatList,
  StyleSheet,
  Animated,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {In} from 'typeorm/browser';
import {getLocalChecklists} from '../../data/checklist/Checklist.model';

const TYPE_ENUM = {
  'Pre-Cruise': 'PRE_CRUISE',
  'Pre-Deployment': 'PRE_DEPLOYMENT',
  Deployment: 'DEPLOYMENT',
  'Post-Retrieval': 'POST_RETRIEVAL',
};
const TYPE_STR_MAP = {
  PRE_CRUISE: 'Pre-Cruise',
  PRE_DEPLOYMENT: 'Pre-Deployment',
  DEPLOYMENT: 'Deployment',
  POST_RETRIEVAL: 'Post-Retrieval',
};

const Check = ({check, onPress}) => (
  <View style={[styles.my4]}>
    <TouchableWithoutFeedback onPress={onPress}>
      <View style={styles.check}>
        <View style={styles.checktext}>
          <Text style={styles.checkname} numberOfLines={1}>
            {check}
          </Text>
        </View>
        <Icon
          name="add-sharp"
          color={'#999'}
          size={20}
          style={{marginLeft: 8}}
        />
      </View>
    </TouchableWithoutFeedback>
  </View>
);

const FAB = ({open, setOpen, style}) => (
  <View style={[styles.absolute, styles.bottom32, styles.right32]}>
    <TouchableWithoutFeedback
      onPress={() => {
        setOpen(!open);
      }}
      style={[styles.fab, styles.overflow]}>
      <Animated.View
        style={[styles.fabcontainer, styles.fab, styles.overflow, style]}>
        <Icon name="add-sharp" size={28} color={'#fff'} />
      </Animated.View>
    </TouchableWithoutFeedback>
  </View>
);

const Overlay = ({style, onPress}) => (
  <Animated.View style={[styles.px16, styles.py16, styles.ht100, style]}>
    <View>
      {Object.keys(TYPE_ENUM).map((check, index) => (
        <Check key={index} check={check} onPress={() => onPress(check)} />
      ))}
    </View>
  </Animated.View>
);

const OperationChecks = ({
  navigation,
  route: {
    params: {equipment},
  },
}) => {
  const [checks, setChecks] = React.useState([]);
  const [open, setOpen] = React.useState(false);
  const [show, setShow] = React.useState(false);
  const [animatedValue] = React.useState(new Animated.Value(0));

  const renderItem = ({item}) => (
    <View
      style={[
        styles.py16,
        {flexDirection: 'row', justifyContent: 'space-between'},
      ]}>
      <Text style={styles.textsm} numberOfLines={1}>
        {TYPE_STR_MAP[item.type]}
      </Text>
      <Text style={styles.textsm}>{item.timestamp}</Text>
    </View>
  );

  const fabRotation = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '45deg'],
  });

  const fabStyle = {transform: [{rotate: fabRotation}]};

  const overlayStyle = {
    backgroundColor: '#F27062',
    opacity: animatedValue,
  };

  const handleFab = () => {
    open && setShow(open);
    Animated.timing(animatedValue, {
      toValue: open ? 1 : 0,
      duration: 300,
      useNativeDriver: true,
    }).start(() => {
      !open && setShow(open);
    });
  };

  React.useEffect(() => {
    handleFab();
  }, [open]);

  React.useEffect(() => {
    getLocalChecklists({
      where: {eid: equipment.id, type: In(Object.values(TYPE_ENUM))},
    }).then(data => setChecks(data));
  }, [equipment]);

  return (
    <View style={[styles.container, styles.ht100]}>
      <FlatList
        style={[styles.px16, styles.ht100]}
        data={checks}
        renderItem={renderItem}
        keyExtractor={(_, index) => index}
        ListEmptyComponent={() => (
          <Text style={[{fontSize: 16, color: '#666'}, styles.py8]}>
            No Operation checks recorded.
          </Text>
        )}
      />
      {show && (
        <Overlay
          style={overlayStyle}
          onPress={check => {
            navigation.navigate('Checklist', {
              item: equipment,
              header: check,
              type: TYPE_ENUM[check],
            });
          }}
        />
      )}
      <FAB open={open} setOpen={setOpen} style={fabStyle} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  ht100: {height: '100%'},
  px8: {paddingHorizontal: 8},
  px16: {paddingHorizontal: 16},
  py8: {paddingVertical: 8},
  py16: {paddingVertical: 16},
  my8: {marginVertical: 8},
  my4: {marginVertical: 4},
  py4: {paddingVertical: 4},
  textsm: {fontSize: 18},
  textmd: {fontSize: 24},
  bgwhite: {backgroundColor: '#fff'},
  check: {
    paddingLeft: 18,
    paddingRight: 16,
    paddingVertical: 14,
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#fff',
    borderRadius: 4,
    overflow: 'hidden',
  },
  checktext: {flexDirection: 'row', flex: 1},
  checkname: {fontSize: 16, fontWeight: '600'},
  overflow: {overflow: 'hidden'},
  absolute: {position: 'absolute'},
  bottom32: {bottom: 32},
  right32: {right: 32},
  fab: {
    borderRadius: 50,
    height: 50,
    width: 50,
  },
  fabcontainer: {
    backgroundColor: '#F27062',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default OperationChecks;
