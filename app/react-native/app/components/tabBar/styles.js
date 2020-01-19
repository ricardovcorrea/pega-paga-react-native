import {StyleSheet} from 'react-native';

import {isIPhoneX} from '../../general/helpers';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    height: 52,
    elevation: 2,
    borderTopWidth: 1,
    borderTopColor: '#e5e5e5',
    backgroundColor: '#fff',
    marginBottom: isIPhoneX() ? 15 : 0,
  },
  tabButton: {flex: 1, justifyContent: 'center', alignItems: 'center'},
  title: {fontSize: 11, marginTop: 4},
  badge: {
    width: 13,
    height: 13,
    borderRadius: 6,
    backgroundColor: '#e5b900',
    position: 'absolute',
    right: -5,
    top: -4,
  },
});

export default styles;
