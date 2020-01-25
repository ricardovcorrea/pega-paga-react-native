import {createAppContainer, createSwitchNavigator} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import {createBottomTabNavigator} from 'react-navigation-tabs';

import {TabBar} from './components';
import theme from './general/theme';
import {
  Loading,
  Login,
  MainScreen,
  PayScreen,
  ReceiveScreen,
  MenuScreen,
  ConfirmPaymentScreen,
  CreateAccount,
} from './screens';

const defaultNavigationOptions = {
  headerStyle: {
    backgroundColor: theme.primary,
    shadowRadius: 0,
    borderBottomWidth: 0,
    elevation: 0,
  },
  headerTintColor: theme.secondary,
  headerRightContainerStyle: {
    paddingRight: 10,
  },
  headerLeftContainerStyle: {
    paddingLeft: 10,
  },
};

const mainStack = createStackNavigator(
  {
    Main: {screen: MainScreen},
  },
  {
    defaultNavigationOptions,
  },
);

const payStack = createStackNavigator(
  {
    Pay: {screen: PayScreen},
    ConfirmPayment: {screen: ConfirmPaymentScreen},
  },
  {
    defaultNavigationOptions,
  },
);

const receiveStack = createStackNavigator(
  {
    Receive: {screen: ReceiveScreen},
  },
  {
    defaultNavigationOptions,
  },
);

const menuStack = createStackNavigator(
  {
    Menu: {screen: MenuScreen},
  },
  {
    defaultNavigationOptions,
  },
);

const loggedStack = createBottomTabNavigator(
  {
    Main: {screen: mainStack},
    Pay: {screen: payStack},
    Receive: {screen: receiveStack},
    Menu: {screen: menuStack},
  },
  {
    mode: 'modal',
    tabBarComponent: TabBar,
    tabBarOptions: {
      activeTintColor: theme.primary,
      inactiveTintColor: '#bdbdd1',
    },
  },
);

const unloggedStack = createStackNavigator(
  {
    Login: {screen: Login},
    CreateAccount: {screen: CreateAccount},
  },
  {
    defaultNavigationOptions,
  },
);

const switchNavigator = createSwitchNavigator(
  {
    AuthLoading: {screen: Loading},
    Unlogged: {screen: unloggedStack},
    Logged: {screen: loggedStack},
  },
  {
    initialRouteName: 'AuthLoading',
  },
);

const AppNavigator = createAppContainer(switchNavigator);

export default AppNavigator;
