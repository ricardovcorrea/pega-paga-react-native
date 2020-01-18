import React, { useState, useEffect } from 'react';

import {
  ScrollView
} from 'react-native';

import styles from './styles';

import LinearGradient from 'react-native-linear-gradient';

import theme from '../../general/theme';

const BaseScreen = props => {

  return (
    <>
      <LinearGradient colors={[theme.primary, theme.primary, theme.gradientEnd]} style={styles.gradientBackground}></LinearGradient>
      <ScrollView scrollEnabled={props.scrollEnabled} keyboardShouldPersistTaps={'handled'} contentContainerStyle={[styles.container, props.style]}>
        {props.children}
      </ScrollView>
    </>
  )
}

export default React.memo(BaseScreen);