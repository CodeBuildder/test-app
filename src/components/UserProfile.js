import React from 'react';
import {View, TouchableOpacity, Text, Alert, StyleSheet} from 'react-native';
import {useRecoilState} from 'recoil';
import {removeValue} from '../utils';
import {
  AuthState,
  defaultAuthState as notLoggedState,
} from '../atoms/AuthState';

const UserProfile = () => {
  const [auth, setAuth] = useRecoilState(AuthState);
  const confirmSignout = () => {
    Alert.alert(
      'Confirm Signout',
      'Do you want to sign out of AMC Logger App?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Confirm',
          style: 'default',
          onPress: userLogout,
        },
      ],
      {cancelable: true},
    );
  };
  const userLogout = () => {
    removeValue('@auth');
    setAuth(notLoggedState);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => confirmSignout()} style={styles.button}>
        <Text style={styles.logo}>{auth.user.name[0]}</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    margin: 8,
    aspectRatio: 1,
    borderRadius: 50,
    borderColor: '#F25042',
    borderWidth: 2,
  },
  button: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#F25042',
  },
});

export default UserProfile;
