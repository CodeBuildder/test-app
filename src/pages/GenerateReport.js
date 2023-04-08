import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {TextInputMask} from 'react-native-masked-text';
import Icon from 'react-native-vector-icons/Ionicons';
import {Button} from '../components/Base';
import {LessThanOrEqual, MoreThanOrEqual} from 'typeorm/browser';
import moment from 'moment';

import {getLocalChecklists} from '../data/checklist/Checklist.model';

const TYPE_NAME = {
  WEEKLY_SERVICE: 'Weekly Service',
  MONTHLY_SERVICE: 'Monthly Service',
  QUARTERLY_SERVICE: 'Quarterly Service',
  YEARLY_SERVICE: 'Yearly Service',
  FORTNIGHTLY_SERVICE: 'Fortnightly Service',
  DRY_DOCK: 'At Dry Dock',
};

const DateInput = ({date, setDate, setError}) => (
  <TextInputMask
    type={'datetime'}
    options={{
      format: 'DD/MM/YYYY',
    }}
    placeholder="DD/MM/YYYY"
    value={date}
    onChangeText={setDate}
    style={[styles.md, styles.date, styles.mb16]}
    onFocus={() => setError('')}
  />
);

const GenerateReport = ({route, navigation}) => {
  const [startDate, setStartDate] = React.useState('');
  const [endDate, setEndDate] = React.useState('');
  const [error, setError] = React.useState('');

  const generateData = () => {
    if (!startDate || !endDate) {
      setError('Please fill all fields');
      return;
    }

    const start = moment(startDate, 'DD/MM/YYYY');
    const end = moment(endDate, 'DD/MM/YYYY');

    if (start.isAfter(end)) {
      setError('Start date must be before end date');
      return;
    }

    setError('');
    getLocalChecklists({
      where: {
        timestamp:
          MoreThanOrEqual(start.format('YYYY-MM-DD')) &&
          LessThanOrEqual(end.format('YYYY-MM-DD')),
        eid: route.params.equipment.id,
      },
    }).then(checks => {
      console.log(checks);

      let service = {
        WEEKLY_SERVICE: [],
        MONTHLY_SERVICE: [],
        QUARTERLY_SERVICE: [],
        YEARLY_SERVICE: [],
        FORTNIGHTLY_SERVICE: [],
        DRY_DOCK: [],
      };

      checks.forEach(check => {
        service[check.type].push(check);
      });

      // Object.keys(service).forEach(type => {
      //   let dataString =
      //     `${TYPE_NAME[type]}\n` +
      //     service[type]
      //       .map(check => {
      //         console.log(JSON.parse(check.data));
      //         return `ok\n`;
      //       })
      //       .join(' ') +
      //     '\n';

      //   console.log(dataString);
      // });
    });
  };

  const handleSubmit = () => {
    if (
      startDate &&
      endDate &&
      moment(startDate, 'DD/MM/YYYY').isBefore(moment(endDate, 'DD/MM/YYYY'))
    ) {
      generateData();
    } else {
      setError('Invalid date range!');
    }
  };

  React.useEffect(() => {
    setStartDate(moment().format('DD/MM/YYYY'));
    setEndDate(moment().format('DD/MM/YYYY'));
  }, []);

  return (
    <View style={[styles.container, styles.ht100]}>
      <View>
        <Text style={[styles.sm, styles.muted, styles.py8]}>Equipment</Text>
        <View style={[styles.row, styles.between]}>
          <Text style={[styles.pb16, styles.md, {flex: 1}]} numberOfLines={1}>
            {route.params.equipment.name}
          </Text>
          <Text style={[styles.pb16, styles.md, styles.muted]}>
            #{route.params.equipment.sno}
          </Text>
        </View>
        <Text style={[styles.sm, styles.muted, styles.py8]}>Start Date</Text>
        <DateInput
          date={startDate}
          setDate={setStartDate}
          setError={setError}
        />
        <Text style={[styles.sm, styles.muted, styles.py8]}>End Date</Text>
        <DateInput date={endDate} setDate={setEndDate} setError={setError} />
        <Text style={[styles.error, styles.md, styles.py8]}>{error}</Text>
      </View>
      <View>
        <Button
          onPress={handleSubmit}
          style={{backgroundColor: '#f27062'}}
          Icon={() => <Icon name="download-sharp" size={24} color="#fff" />}>
          Download Report
        </Button>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 16,
    justifyContent: 'space-between',
  },
  ht100: {height: '100%'},
  px8: {paddingHorizontal: 8},
  py8: {paddingVertical: 8},
  pb16: {paddingBottom: 16},
  mb16: {marginBottom: 16},
  row: {flexDirection: 'row', alignItems: 'center'},
  between: {justifyContent: 'space-between'},
  date: {borderWidth: 1, borderColor: '#ccc', padding: 8, borderRadius: 8},
  sm: {fontSize: 14},
  md: {fontSize: 16},
  muted: {color: '#999'},
  error: {color: '#f27062'},
});

export default GenerateReport;
