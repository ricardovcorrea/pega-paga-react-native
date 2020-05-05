import React from 'react';
import {AppRegistry, YellowBox} from 'react-native';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/lib/integration/react';

import {name as appName} from './app.json';
import App from './app/app';
import {store, persistor} from './app/redux/store';

YellowBox.ignoreWarnings(['-[RNCamera']);

const ReduxApp = () => (
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <App />
    </PersistGate>
  </Provider>
);

AppRegistry.registerComponent(appName, () => ReduxApp);
