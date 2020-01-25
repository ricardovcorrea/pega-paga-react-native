/* eslint-disable no-unused-vars */
import axios from 'axios';

import {endpoints} from '~/general/constants';
import {loginSuccessAction, loginFailAction} from '~/redux/generalReducer';
import {store} from '~/redux/store';

export const login = async (email, password) => {
  const loginRequest = {
    Email: email,
    Password: password,
  };

  return axios.post(endpoints.login, loginRequest).then(async response => {
    const {data} = response;

    if (data.code === 401) {
      store.dispatch(loginFailAction(data));
      throw data;
    }

    store.dispatch(loginSuccessAction(data.data.token, data.data));
  });
};
