import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Switch,
  ActivityIndicator,
  Alert,
} from 'react-native';
// import NetInfo from '@react-native-community/netinfo';
import {useNetwork} from '../../components/Hooks/useNetwork';
import {useRecoilValue, useSetRecoilState} from 'recoil';
import {ChecklistState} from '../../atoms/ChecklistState';
import {VesselState} from '../../atoms/VesselState';
import {AuthState} from '../../atoms/AuthState';
import {ToastState} from '../../atoms/ToastState';
import {Button} from '../../components/Base';
import QuestionCheckBox from '../../components/QuestionCheckBox';
import ImageList from '../../components/ImageCard';
import SignComponent from '../../components/SignComponent';
import {saveLocalChecklist} from '../../data/checklist/Checklist.model';
import {storeCheck} from '../../api';
import moment from 'moment';

const TYPE_ENUM = {
  WS: 'WEEKLY_SERVICE',
  MS: 'MONTHLY_SERVICE',
  QS: 'QUARTERLY_SERVICE',
  YS: 'YEARLY_SERVICE',
  FS: 'FORTNIGHTLY_SERVICE',
  ADD: 'DRY_DOCK',
  PRE_CRUISE: 'PRE_CRUISE',
  PRE_DEPLOYMENT: 'PRE_DEPLOYMENT',
  DEPLOYMENT: 'DEPLOYMENT',
  POST_RETRIEVAL: 'POST_RETRIEVAL',
};

const Checklist = ({route, navigation}) => {
  const item = route.params.item;
  const type = route.params.type;

  const network = useNetwork();
  const vessel = useRecoilValue(VesselState);
  const auth = useRecoilValue(AuthState);
  const setToast = useSetRecoilState(ToastState);
  const checklistData = useRecoilValue(ChecklistState).data[item.id].filter(
    checklist => checklist.type === TYPE_ENUM[type],
  )[0];

  const [status, setStatus] = useState('operational');
  const [images, setImages] = useState([]);
  const [questions, setQuestions] = useState(
    checklistData?.questions?.map(question => ({question, checked: undefined})),
  );
  const [submitting, setSubmitting] = useState(false);

  const validate = () => {
    if (questions.some(question => question.checked === undefined)) {
      Alert.alert('Invalid Data', 'Please answer all questions.');
      return false;
    }
    return true;
  };

  const handleSave = async () => {
    setSubmitting(true);
    try {
      if (network.isConnected && network.isInternetReachable) {
        await storeCheck(auth.access_token, {
          vesselId: vessel.data.id,
          equipmentSno: item.sno,
          equipmentId: item.id,
          type: TYPE_ENUM[type],
          data: {status, questions},
        });
      }
      await saveLocalChecklist(item.id, TYPE_ENUM[type], {status, questions});
      setSubmitting(false);
      navigation.navigate('Home');
    } catch (err) {
      setToast({visible: true, message: err.message, type: 'danger'});
      setSubmitting(false);
    }
  };

  const handleSubmit = () => {
    if (validate()) {
      Alert.alert(
        'Submit Checklist',
        'Are you sure you want to submit this checklist?',
        [
          {
            text: 'Cancel',
            style: 'cancel',
          },
          {
            text: 'Submit',
            style: 'default',
            onPress: handleSave,
          },
        ],
        {cancelable: true},
      );
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scroll}>
        <View style={[styles.equipment, styles.mv8]}>
          <Text style={[styles.equipmentName, styles.font18]}>{item.name}</Text>
          <Text style={[styles.equipmentSno, styles.font18]}>#{item.sno}</Text>
        </View>
        {checklistData ? (
          <React.Fragment>
            <Text
              style={[styles.font14, styles.mt5, styles.muted, styles.fontSB]}>
              Status
            </Text>
            <View style={[styles.operational]}>
              <Text style={[styles.font18, styles.fontSB]}>
                {status === 'operational' ? 'Operational' : 'Non Operational'}
              </Text>
              <Switch
                trackColor={{false: '#ddd', true: '#ffbba9'}}
                thumbColor={status === 'operational' ? '#f27062' : '#aaa'}
                value={status === 'operational'}
                onChange={() =>
                  setStatus(
                    status === 'operational'
                      ? 'non-operational'
                      : 'operational',
                  )
                }
              />
            </View>
            <Text
              style={[styles.font14, styles.mv8, styles.muted, styles.fontSB]}>
              Checklist
            </Text>
            <View style={[styles.checklist, styles.mb8]}>
              {checklistData.questions.map((question, index) => (
                <QuestionCheckBox
                  key={index}
                  style={index === 0 ? {} : styles.mt5}
                  value={questions[index].checked}
                  onChange={e =>
                    setQuestions(oldState => {
                      oldState[index].checked = !oldState[index].checked;
                      oldState[index].timestamp = moment().unix();
                      return [...oldState];
                    })
                  }>
                  {question}
                </QuestionCheckBox>
              ))}
            </View>
            <Text
              style={[styles.font14, styles.mt8, styles.muted, styles.fontSB]}>
              Images
            </Text>
            <ImageList
              equipment={route.params.item}
              checklistType={route.params.type}
              images={images}
              setImages={setImages}
            />
            {/* <Text
              style={[styles.font14, styles.mv8, styles.muted, styles.fontSB]}>
              Signature
            </Text>
            <SignComponent /> */}
            {/* Signature Methods? */}
            <View style={[styles.mv8, {marginBottom: 16}]}>
              {submitting ? (
                <ActivityIndicator
                  animating={true}
                  size="large"
                  color="#f27062"
                />
              ) : (
                <Button
                  onPress={handleSubmit}
                  style={{backgroundColor: '#f27062'}}>
                  Submit
                </Button>
              )}
            </View>
          </React.Fragment>
        ) : (
          <Text style={styles.errorText}>
            Incomplete checklist data! {'\n'}Please contact dashboard admin.
          </Text>
        )}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: '100%',
    backgroundColor: '#fff',
  },
  scroll: {
    flex: 1,
    height: '100%',
    paddingHorizontal: 18,
  },
  equipment: {
    flex: 1,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  equipmentName: {
    flex: 1,
    fontWeight: 'bold',
  },
  equipmentSno: {
    color: '#999',
    fontWeight: 'normal',
  },
  checklist: {
    borderRadius: 8,
    overflow: 'hidden',
  },
  operational: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingBottom: 8,
  },
  fontSB: {
    fontWeight: 'bold',
  },
  muted: {
    color: '#777',
  },
  font14: {
    fontSize: 14,
  },
  font18: {
    fontSize: 18,
  },
  mt5: {
    marginTop: 5,
  },
  mt8: {
    marginTop: 8,
  },
  mb8: {
    marginBottom: 8,
  },
  mv8: {
    marginVertical: 8,
  },
  errorText: {
    color: '#f44336',
    marginTop: 8,
  },
});

export default Checklist;
