import {StyleSheet, Dimensions} from 'react-native';

import theme from '~/general/theme';

const {height, width} = Dimensions.get('window');
const fontSize = width / 20;

const styles = StyleSheet.create({
  baseScreenContainer: {
    flex: 1,
    paddingHorizontal: 15,
    paddingTop: 20,
  },
  container: {
    flex: 1,
    backgroundColor: theme.background,
    alignItems: 'center',
    padding: 15,
  },
  floatingActionContainer: {
    backgroundColor: theme.boxBackground,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    position: 'absolute',
    left: 0,
    right: 0,
    height: height,
    paddingTop: 30,
  },
  floatingActionMenuDragHandler: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  decriptionContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 15,
  },
  decriptionText: {
    color: theme.quaternary,
    fontFamily: theme.fontFamilySemibold,
    fontSize: fontSize,
  },
  mainButtonListContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
  },
  transactionsTitle: {
    fontSize: 25,
    color: theme.secondary,
    marginTop: 20,
    marginBottom: 10,
  },
  spacer: {
    height: 30,
  },
});

export default styles;
