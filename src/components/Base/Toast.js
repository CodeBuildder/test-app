import React from 'react';
import {View, Text, Modal, StyleSheet, Animated} from 'react-native';
import {useRecoilState} from 'recoil';
import {ToastState} from '../../atoms/ToastState';

const Toast = () => {
  const [toast, setToast] = useRecoilState(ToastState);
  const fadeOpc = React.useRef(new Animated.Value(1)).current;

  React.useEffect(() => {
    if (toast.visible) {
      Animated.timing(fadeOpc, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      }).start();
      setTimeout(() => {
        Animated.timing(fadeOpc, {
          toValue: 0,
          duration: 500,
          useNativeDriver: true,
        }).start(() => setToast({...toast, visible: false}));
      }, 2000);
    }
  }, [toast.visible]);

  return (
    <>
      {toast.visible && (
        <Animated.View
          style={[
            styles.container,
            toast.type === 'danger' && styles.danger,
            toast.type === 'success' && styles.success,
            {opacity: fadeOpc},
          ]}
        >
          <Text numberOfLines={1} style={styles.message}>
            {toast.message}
          </Text>
        </Animated.View>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '90%',
    margin: '5%',
    overflow: 'hidden',
    position: 'absolute',
    zIndex: 99,
    bottom: 0,
    elevation: 10,
    borderRadius: 8,
  },
  message: {
    color: '#fff',
    fontSize: 18,
    margin: '5%',
  },
  danger: {
    backgroundColor: '#F25042',
  },
  success: {
    backgroundColor: '#00C851',
  },
});

export default Toast;
