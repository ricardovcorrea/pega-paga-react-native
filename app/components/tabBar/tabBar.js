import PropTypes from 'prop-types';
import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import theme from '~/general/theme';

import styles from './styles';

const tabLabelAndIcon = {
  Main: {
    icon: 'home',
    label: 'Home',
  },
  Pay: {
    icon: 'filter-center-focus',
    label: 'Pay',
  },
  Receive: {
    icon: 'attach-money',
    label: 'Receive',
  },
  Menu: {
    icon: 'menu',
    label: 'Menu',
  },
};

const TabBar = props => {
  const {onTabPress, navigation} = props;
  const {routes, index: activeRouteIndex} = navigation.state;

  return (
    <View style={styles.container}>
      {routes.map((route, routeIndex) => {
        const {routeName} = route;
        const isRouteActive = routeIndex === activeRouteIndex;
        const tintColor = isRouteActive ? theme.primary : '#bdbdd1';

        return (
          <TouchableOpacity
            key={routeIndex}
            style={styles.tabButton}
            onPress={() => {
              onTabPress && onTabPress({route});
            }}
            testID={'tab-bar-button'}>
            <>
              <MaterialIcons
                name={tabLabelAndIcon[routeName].icon}
                size={30}
                color={tintColor}
              />
              <Text style={[styles.title, {color: tintColor}]}>
                {tabLabelAndIcon[routeName].label}
              </Text>
            </>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};
// const {activeTintColor, inactiveTintColor, onTabPress, navigation} = props;
TabBar.propTypes = {
  onTabPress: PropTypes.func,
  navigation: PropTypes.object,
};

export default TabBar;
