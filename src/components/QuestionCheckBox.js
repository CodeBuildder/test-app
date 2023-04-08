import React from 'react';
import {Text, View, StyleSheet} from 'react-native';
import CheckBox from './Base/CheckBox';

const QuestionCheckBox = props => {
  return (
    <View style={[styles.container, props.style]}>
      <CheckBox value={props.value} onValueChange={props.onChange} />
      <Text style={styles.question}>{props.children}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    padding: 8,
    backgroundColor: '#FFC0B2',
  },
  question: {
    flex: 1,
    fontSize: 16,
    marginLeft: 8,
  },
});

export default QuestionCheckBox;
