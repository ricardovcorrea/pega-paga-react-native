import {StyleSheet} from 'react-native';

import theme from '~/general/theme';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    padding: 15,
    paddingTop: 20,
  },
  btnConfig: {
    marginRight: 15,
  },
  title: {
    color: 'white',
    fontSize: 20,
    fontWeight: '700',
  },
  subTitle: {
    color: 'white',
    fontSize: 16,
    textAlign: 'center',
    marginTop: 15,
    fontWeight: '600',
  },
  box: {
    padding: 25,
    paddingTop: 40,
    backgroundColor: theme.background,
    width: '100%',
    borderRadius: 5,
    marginTop: 20,
  },
  fieldLabel: {
    color: theme.primary,
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 5,
  },
  field: {
    marginTop: 10,
    backgroundColor: 'white',
    borderRadius: 3,
    height: 50,
    paddingLeft: 10,
    color: 'black',
  },
  fieldErrorLabel: {
    color: theme.error,
    fontSize: 14,
    position: 'absolute',
    right: 0,
    top: 3,
  },
  btnSave: {
    marginTop: 20,
  },
  passwordContainer: {
    marginTop: 20,
  },
});

export default styles;
