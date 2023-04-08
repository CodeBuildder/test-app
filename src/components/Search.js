import React from 'react';
import {Text, View, TextInput, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const Search = ({setSearchtext}) => {
  return (
    <View style={styles.container}>
      <View style={styles.search}>
        <TextInput
          style={styles.input}
          placeholder="Search Equipments"
          placeholderTextColor={'#bbb'}
          onChangeText={value => setSearchtext(value)}
          clearButtonMode="while-editing"
          selectTextOnFocus
          blurOnSubmit
        />
        <Icon name="search" size={24} color={'#bbb'} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: '#F27062',
  },
  search: {
    backgroundColor: '#fff',
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 4,
    paddingHorizontal: 12,
  },
  input: {flex: 1, fontSize: 16, color: '#000'},
});

export default Search;
