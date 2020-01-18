import React, { Component } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity
} from 'react-native';

import MaterialIcons from "react-native-vector-icons/MaterialIcons";

import { isIPhoneX } from '../../general/helpers';

import theme from '../../general/theme';

const styles = StyleSheet.create({
    container: { flexDirection: "row", height: 52, elevation: 2, borderTopWidth: 1, borderTopColor: '#e5e5e5', backgroundColor: '#fff', marginBottom: isIPhoneX() ? 15 : 0 },
    tabButton: { flex: 1, justifyContent: "center", alignItems: "center" },
    title: { fontSize: 11, marginTop: 4 },
    badge: { width: 13, height: 13, borderRadius: 6, backgroundColor: '#e5b900', position: 'absolute', right: -5, top: -4 }
});

const TabBar = (props) => {

    const {
        renderIcon,
        getLabelText,
        activeTintColor,
        inactiveTintColor,
        onTabPress,
        onTabLongPress,
        getAccessibilityLabel,
        navigation
    } = props;

    const { routes, index: activeRouteIndex } = navigation.state;

    const tabLabelAndIcon = {
        Main: {
            icon: 'home',
            label: 'Home'
        },
        Pay: {
            icon: 'filter-center-focus',
            label: 'Pay'
        },
        Receive: {
            icon: 'attach-money',
            label: 'Receive'
        },
        Menu: {
            icon: 'menu',
            label: 'Menu'
        }
    }

    return (
        <View style={styles.container}>
            {routes.map((route, routeIndex) => {
                const { routeName } = route;
                const isRouteActive = routeIndex === activeRouteIndex;
                const tintColor = isRouteActive ? activeTintColor : inactiveTintColor;

                return (
                    <TouchableOpacity
                        key={routeIndex}
                        style={styles.tabButton}
                        onPress={() => {
                            onTabPress({ route });
                        }}
                        accessibilityLabel={getAccessibilityLabel({ route })}>

                        <>
                            <MaterialIcons name={tabLabelAndIcon[routeName].icon} size={30} color={isRouteActive ? theme.primary : inactiveTintColor} />
                            <Text style={[styles.title, isRouteActive ? { color: tintColor } : { color: inactiveTintColor }]}>{tabLabelAndIcon[routeName].label}</Text>
                        </>

                    </TouchableOpacity>
                );
            })}
        </View>
    );
}


export default TabBar;