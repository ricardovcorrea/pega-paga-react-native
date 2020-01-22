import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import theme from '~/general/theme';
import styles from './styles';

const TabBar = props => {
  const {
    activeTintColor,
    inactiveTintColor,
    onTabPress,
    getAccessibilityLabel,
    navigation,
  } = props;

  const {routes, index: activeRouteIndex} = navigation.state;

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

  return (
    <View style={styles.container}>
      {routes.map((route, routeIndex) => {
        const {routeName} = route;
        const isRouteActive = routeIndex === activeRouteIndex;
        const tintColor = isRouteActive ? activeTintColor : inactiveTintColor;

        return (
          <TouchableOpacity
            key={routeIndex}
            style={styles.tabButton}
            onPress={() => {
              onTabPress({route});
            }}
            accessibilityLabel={getAccessibilityLabel({route})}>
            <>
              <MaterialIcons
                name={tabLabelAndIcon[routeName].icon}
                size={30}
                color={isRouteActive ? theme.primary : inactiveTintColor}
              />
              <Text
                style={[
                  styles.title,
                  isRouteActive
                    ? {color: tintColor}
                    : {color: inactiveTintColor},
                ]}>
                {tabLabelAndIcon[routeName].label}
              </Text>
            </>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

export default TabBar;
