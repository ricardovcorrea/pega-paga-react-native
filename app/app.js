if (__DEV__) {
  import('../ReactotronConfig').then(() =>
    console.log('Reactotron Configured'),
  );
}

import React, {useEffect} from 'react';
import {StatusBar} from 'react-native';
import SplashScreen from 'react-native-splash-screen';

import AppNavigator from './navigation';

import 'intl';
import 'intl/locale-data/jsonp/pt-BR';

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
