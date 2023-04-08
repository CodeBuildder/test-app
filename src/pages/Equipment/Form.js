import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import CheckBox from '@react-native-community/checkbox';
import {launchImageLibrary} from 'react-native-image-picker';

const Form = ({route, navigation}) => {
  const [toggleCheckBox, setToggleCheckBox] = React.useState(false);
  const options = {mediaType: 'photo'};
  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <View
          style={{
            marginHorizontal: 20,
            marginVertical: 16,
          }}>
          <Text style={styles.headText}>Maintenance Scheduledas</Text>
        </View>
        <View style={styles.formContainer}>
          <View style={styles.checkboxContainerTop}>
            <CheckBox
              disabled={false}
              value={toggleCheckBox}
              style={styles.CheckBox}
            />
            <Text style={styles.label}>
              All the contacts and O-ring area of all the APS
              transponders/Pinger were checked and cleaned.
            </Text>
          </View>
          <View style={styles.checkboxContainer}>
            <CheckBox
              disabled={false}
              value={toggleCheckBox}
              style={styles.CheckBox}
            />
            <Text style={styles.label}>
              APS Trunk areas were inspected for water ingress and found no
              water ingress.
            </Text>
          </View>
          <View style={styles.checkboxContainer}>
            <CheckBox
              disabled={false}
              value={toggleCheckBox}
              style={styles.CheckBox}
            />
            <Text style={styles.label}>
              Power and control cables for APS communication was inspected and
              found ok.
            </Text>
          </View>
          <View style={styles.checkboxContainer}>
            <CheckBox
              disabled={false}
              value={toggleCheckBox}
              style={styles.CheckBox}
            />
            <Text style={styles.label}>
              Carried out the general maintenance of APS transponders/Pinger.
              Inspected the system and found correct.
            </Text>
          </View>
          <View style={styles.checkboxBottomContainer}>
            <CheckBox
              disabled={false}
              value={toggleCheckBox}
              style={styles.CheckBox}
            />
            <Text style={styles.label}>
              Carried out the general maintenance of APS transponders/Pinger.
              Inspected the system and found correct
            </Text>
          </View>
        </View>
        <View style={styles.signatureContainer}>
          <Text
            style={{
              color: '#8B0205',
              padding: 7,
              borderRadius: 20,
              fontSize: 18,
              fontWeight: 'bold',
            }}>
            Signature
          </Text>
          <View style={styles.signView}>
            <View style={styles.signSpace}></View>
            <TouchableOpacity
              style={styles.uploadButton}
              onPress={() => {
                launchImageLibrary(options, response => {
                  console.log('response', response);
                });
              }}>
              <Text style={{color: '#8B0205', fontWeight: 'bold'}}>
                Upload Digital Signature
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.saveButton}
              color="#ED6E7D"
              onPress={() => {
                console.log('Saved!');
              }}>
              <Text style={{color: '#ffffff'}}>Save</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    height: '100%',
    marginBottom: 15,
  },
  headText: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#000',
  },
  formContainer: {
    height: '59%',
    marginHorizontal: 20,
  },
  checkboxContainerTop: {
    height: 90,
    width: '100%',
    backgroundColor: '#FFE2DE',
    padding: 15,
    color: 'black',
    flexDirection: 'row',
    marginTop: 10,
    borderTopEndRadius: 10,
    borderTopStartRadius: 10,
  },
  checkboxContainer: {
    height: 90,
    width: '100%',
    backgroundColor: '#FFE2DE',
    padding: 15,
    color: 'black',
    flexDirection: 'row',
    marginTop: 2,
  },
  checkboxBottomContainer: {
    height: 90,
    width: '100%',
    backgroundColor: '#FFE2DE',
    padding: 15,
    color: 'black',
    flexDirection: 'row',
    marginTop: 2,
    borderBottomStartRadius: 10,
    borderBottomEndRadius: 10,
  },
  CheckBox: {
    alignSelf: 'auto',
  },
  label: {
    width: '90%',
    color: 'black',
    fontSize: 14,
    textAlign: 'justify',
    alignItems: 'center',
    marginLeft: '1%',
    fontFamily: 'Poppins-Medium',
  },

  signatureContainer: {
    height: '42%',
    backgroundColor: '#FFE2DE',
    borderRadius: 10,
    marginHorizontal: 20,
    marginBottom: 5,
    marginTop: 10,
  },

  signView: {
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
  },
  signSpace: {
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
    height: 150,
    width: 315,
    borderRadius: 7,
  },
  uploadButton: {
    backgroundColor: '#fff',

    alignItems: 'center',
    justifyContent: 'center',
    width: '90%',
    padding: 5,
    marginTop: 7,
    borderRadius: 10,
  },
  saveButton: {
    backgroundColor: '#ED6E7D',
    alignItems: 'center',
    justifyContent: 'center',
    width: '90%',
    padding: 5,
    marginTop: 7,
    borderRadius: 10,
  },
});

export default Form;
