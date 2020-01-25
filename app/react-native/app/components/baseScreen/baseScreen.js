import React from 'react';
import {ScrollView} from 'react-native';
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
      <ScrollView
        stickyHeaderIndices={props.stickyHeaderIndices}
        scrollEnabled={props.scrollEnabled}
        keyboardShouldPersistTaps={'handled'}
        contentContainerStyle={[styles.container, props.style]}>
        {props.children}
      </ScrollView>
    </>
  );
};

export default React.memo(BaseScreen);
