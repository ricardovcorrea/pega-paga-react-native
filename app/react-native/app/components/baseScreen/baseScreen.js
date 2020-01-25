import React from 'react';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import LinearGradient from 'react-native-linear-gradient';

import theme from '~/general/theme';

import styles from './styles';

const BaseScreen = props => {
  return (
    <>
      <LinearGradient
        colors={[theme.primary, theme.primary, theme.gradientEnd]}
        style={styles.gradientBackground}
      />
      <KeyboardAwareScrollView
        stickyHeaderIndices={props.stickyHeaderIndices}
        scrollEnabled={props.scrollEnabled}
        keyboardShouldPersistTaps={'handled'}
        contentContainerStyle={[styles.container, props.style]}>
        {props.children}
      </KeyboardAwareScrollView>
    </>
  );
};

export default React.memo(BaseScreen);
