import {StyleSheet, Dimensions} from 'react-native';

import theme from '~/general/theme';

const {width} = Dimensions.get('window');

const fontSize = width * 0.12;

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    color: theme.secondary,
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 15,
  },
  value: {
    color: theme.secondary,
    fontSize: fontSize,
    fontWeight: '900',
  },
});

export default styles;
