if (__DEV__) {
  import('../ReactotronConfig').then(() => console.log('Reactotron Configured'))
}

import React, { useEffect } from 'react';

import { StatusBar } from 'react-native';

import SplashScreen from 'react-native-splash-screen';

import AppNavigator from './navigation';

const App = () => {

  useEffect(() => {
    SplashScreen.hide();
  }, []);

  return (
    <>
      <StatusBar barStyle="light-content" />
      <AppNavigator />
    </>
  );
};

export default App;
