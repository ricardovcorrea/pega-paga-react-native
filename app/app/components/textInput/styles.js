import {StyleSheet} from 'react-native';

import theme from '../../general/theme';

const styles = StyleSheet.create({
  inputField: {
    fontSize: 16,
    color: 'black',
    width: '100%',
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#D1D1D1',
    justifyContent: 'center',
    paddingHorizontal: 25,
  },
  drawCircle: {
    height: 25,
    width: 25,
    borderRadius: 25 / 2,
    backgroundColor: theme.error,
    position: 'absolute',
    top: 10,
    right: 15,
    alignItems: 'center',
    justifyContent: 'center',
  },
  textAlert: {
    fontWeight: 'bold',
    fontSize: 23,
    textAlign: 'center',
    color: 'white',
  },
  errorText: {
    position: 'absolute',
    right: 50,
    top: 15,
    color: theme.error,
  },
});

export default styles;
