
import React from 'react';
import { Text, Dimensions } from 'react-native';

import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

import { Loading, Login, Main } from './screens';

import theme from './general/theme';

const { width } = Dimensions.get('window');
const fontSize = width / 14.4

const defaultNavigationOptions = {
    headerStyle: {
        backgroundColor: theme.primary,
        shadowRadius: 0,
        borderBottomWidth: 0,
        elevation: 0
    },
    headerTintColor: theme.secondary,
    headerRightContainerStyle: {
        paddingRight: 10
    },
    headerLeftContainerStyle: {
        paddingLeft: 10
    },
    headerLeft: (
        <Text style={{ fontSize: fontSize, fontWeight: 'bold', color: 'white', padding: 10 }}>Pega Paga</Text>
    )
};

const mainStack = createStackNavigator(
    {
        Main: { screen: Main }
    },
    {
        defaultNavigationOptions
    }
);

const loggedStack = createStackNavigator(
    {
        Main: { screen: mainStack }
    },
    {
        mode: 'modal',
        headerMode: 'none',
    }
);

const unloggedStack = createStackNavigator(
    {
        Login: { screen: Login }
    },
    {
        defaultNavigationOptions
    }
);

const switchNavigator = createSwitchNavigator(
    {
        AuthLoading: { screen: Loading },
        Unlogged: { screen: unloggedStack },
        Logged: { screen: loggedStack }
    },
    {
        initialRouteName: 'AuthLoading'
    }
)

export default AppNavigator = createAppContainer(switchNavigator);