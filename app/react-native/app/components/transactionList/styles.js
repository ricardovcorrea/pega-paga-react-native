import {StyleSheet} from 'react-native';

import theme from '~/general/theme';

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'rgba(0,0,0,0.3)',
    width: '100%',
    flexDirection: 'row',
    borderRadius: 10,
  },
  image: {
    width: 100,
    height: 100,
    resizeMode: 'contain',
    borderRadius: 10,
  },
  textContainer: {
    padding: 15,
  },
  textId: {
    fontSize: 11,
    fontWeight: '600',
    color: theme.secondary,
  },
  textFirstName: {
    fontSize: 25,
    fontWeight: '700',
    color: theme.secondary,
  },
  textEmail: {
    fontSize: 16,
    color: theme.secondary,
  },
  transactionList: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.1)',
    borderTopLeftRadius: 15,
  },
  transactionListContainer: {
    marginBottom: 20,
  },
  transactionItemContainer: {
    padding: 20,
    marginBottom: 15,
    flexDirection: 'row',
    marginHorizontal: 11,
    backgroundColor: theme.secondary,
    borderBottomRightRadius: 15,
    borderTopLeftRadius: 15,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.34,
    shadowRadius: 6.27,
    elevation: 10,
    justifyContent: 'space-between',
  },
  transactionItemAmountContainer: {
    flexDirection: 'row',
  },
  transactionItemDivider: {
    padding: 20,
    marginBottom: 15,
    flexDirection: 'row',
    backgroundColor: theme.secondary,
    borderBottomRightRadius: 15,
    borderTopLeftRadius: 15,
    justifyContent: 'space-between',
  },
  transactionItemDividerText: {
    color: theme.primary,
    fontSize: 17,
    fontWeight: '600',
  },
});

export default styles;
