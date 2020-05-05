import React from 'react';
import {View, TouchableOpacity, Text, ActivityIndicator} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

import theme from '~/general/theme';
import styles from './styles';

const MainButton = props => {
  const onPress = () => {
    if (props.onPress) {
      props.onPress();
    }
  };

  return (
    <TouchableOpacity
      activeOpacity={0.5}
      onPress={onPress}
      disabled={props.disabled || false}>
      <LinearGradient
        colors={[theme.primary, theme.gradientEnd]}
        style={[styles.buttonContainer, props.style]}>
        <View style={styles.textContainer}>
          {!props.isLoading && (
            <>
              {props.iconButton}
              <Text style={[styles.text, props.styleText]}>{props.title}</Text>
            </>
          )}
          {props.isLoading && (
            <ActivityIndicator size="small" color={theme.secondary} />
          )}
        </View>
      </LinearGradient>
    </TouchableOpacity>
  );
};

export default React.memo(MainButton);
