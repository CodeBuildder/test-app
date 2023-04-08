import React from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  TouchableHighlight,
  StyleSheet,
} from 'react-native';

const Button = ({
  onPress = f => f,
  children,
  style = {},
  titleStyle = {},
  Icon,
  disabled,
}) => {
  return (
    <TouchableHighlight
      style={[styles.touchable, {borderRadius: style.borderRadius ?? 6}]}
      onPress={onPress}
      disabled={disabled}
    >
      <View style={[styles.button, style]}>
        {Icon ? <Icon /> : null}
        {children && (
          <Text style={[styles.title, titleStyle, {marginLeft: Icon ? 10 : 0}]}>
            {children}
          </Text>
        )}
      </View>
    </TouchableHighlight>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: 16,
    color: 'white',
    textAlign: 'center',
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 6,
    backgroundColor: 'blue',
    elevation: 6,
  },
  touchable: {
    backgroundColor: 'white',
  },
});

export default Button;
