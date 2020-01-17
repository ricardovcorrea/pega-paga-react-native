import Reactotron from '../../ReactotronConfig';

import AsyncStorage from '@react-native-community/async-storage';

import { createStore, combineReducers, applyMiddleware, compose } from 'redux';

import thunk from 'redux-thunk';

import { generalReducer } from './generalReducer';

import { persistStore, persistReducer } from 'redux-persist';

const persistConfig = {
  key: 'pega-paga-app',
  storage: AsyncStorage
};

const rootReducer = combineReducers({
  general: generalReducer
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

const middlewares = [thunk];

const enhancers = [
  applyMiddleware(...middlewares),
  Reactotron.createEnhancer()
];

export const store = createStore(persistedReducer, undefined, compose(...enhancers));
export const persistor = persistStore(store);