import React from 'react';
import { AppRegistry } from 'react-native';
import App from './app/app';

import { name as appName } from './app.json';

import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/lib/integration/react';

import { store, persistor } from './app/redux/store';


const ReduxApp = () => (
    <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
            <App />
        </PersistGate>
    </Provider>
)

AppRegistry.registerComponent(appName, () => ReduxApp);
