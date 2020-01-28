import React from 'react';
import {StyleSheet} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import LinearGradient from 'react-native-linear-gradient';

import theme from '~/general/theme';

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

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
  },
  gradientBackground: {
    position: 'absolute',
    top: 0,
    right: 0,
    left: 0,
    bottom: 0,
  },
});

export default React.memo(BaseScreen);
