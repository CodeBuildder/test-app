import React from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import {useSetRecoilState} from 'recoil';
import Icon from 'react-native-vector-icons/Ionicons';
import {Button} from '../components/Base';
import {AuthState} from '../atoms/AuthState';
import {ToastState} from '../atoms/ToastState';
import {login} from '../api';
import {setValue} from '../utils';

const LoginPage = () => {
  const [username, setUsername] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [loading, setLoading] = React.useState(false);
  const [passVisible, setPassVisible] = React.useState(false);
  const setAuth = useSetRecoilState(AuthState);
  const setToast = useSetRecoilState(ToastState);

  const userLogin = () => {
    setLoading(true);
    login(username, password).then(data => {
      if (!data.error) {
        setValue('@auth', {logged: true, user: {}, ...data});
        setAuth({logged: true, user: {}, ...data});
        setLoading(false);
      } else {
        setValue('@auth', {logged: false, user: {}, access_token: ''});
        setToast({
          visible: true,
          message: data.message,
          type: 'danger',
        });
        setLoading(false);
      }
    });
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={{flex: 1}}>
        <View style={styles.top}>
          <Text style={[styles.margin_2, styles.signyou]}>
            Let's sign you in.
          </Text>
          <Text style={[styles.margin_2, styles.welcome]}>Welcome back.</Text>
        </View>
        <View style={styles.bottom}>
          <View style={styles.input}>
            <Icon
              name="person"
              size={24}
              color="#888"
              style={styles.input_icon}
            />
            <TextInput
              style={styles.input_text}
              placeholder="Email"
              placeholderTextColor="#999"
              autoCapitalize="none"
              autoCorrect={false}
              value={username}
              onChangeText={setUsername}
            />
          </View>
          <View style={[styles.input, {marginBottom: '10%'}]}>
            <Icon
              name={passVisible ? 'lock-open' : 'lock-closed'}
              size={24}
              color="#888"
              onPress={() => setPassVisible(!passVisible)}
              style={styles.input_icon}
            />
            <TextInput
              style={styles.input_text}
              placeholder="Password"
              placeholderTextColor="#999"
              autoCapitalize="none"
              autoCorrect={false}
              secureTextEntry={!passVisible}
              value={password}
              onChangeText={setPassword}
              onSubmitEditing={() => userLogin()}
            />
          </View>
          <Button
            onPress={() => userLogin()}
            Icon={() =>
              loading ? (
                <ActivityIndicator size={34} color="#fff" />
              ) : (
                <Icon name="arrow-forward" color={'#FFF'} size={32} />
              )
            }
            style={{
              backgroundColor: '#F25042',
              borderRadius: 10,
              aspectRatio: 1,
              paddingVertical: 16,
            }}
            disabled={loading}
          />
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F25042',
  },
  signyou: {
    color: '#fff',
    fontSize: 32,
    fontWeight: 'bold',
  },
  welcome: {
    color: '#fff',
    fontSize: 24,
  },
  margin_2: {
    margin: '3%',
  },
  top: {
    paddingHorizontal: 8,
    paddingVertical: '20%',
  },
  bottom: {
    backgroundColor: '#fff',
    elevation: 10,
    flex: 1,
    paddingTop: 24,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    padding: 8,
    alignItems: 'center',
  },
  input: {
    borderRadius: 16,
    borderColor: '#ccc',
    borderWidth: 1,
    marginVertical: 8,
    marginHorizontal: '2%',
    width: '94%',
    overflow: 'hidden',
    flexDirection: 'row',
    alignItems: 'center',
  },
  input_icon: {
    marginHorizontal: 16,
    backgroundColor: '#fff',
  },
  input_text: {
    fontSize: 16,
    padding: 16,
    paddingStart: 0,
    flex: 1,
    color: '#000',
  },
});

export default LoginPage;
