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

    const user = {
      id: data.data.id,
      email: data.data.email,
      firstName: data.data.name,
      surName: data.data.surname,
      balance: 2000,
      photo:
        'https://st2.depositphotos.com/4967775/11323/v/950/depositphotos_113235752-stock-illustration-avatar-girls-icon-vector-woman.jpg',
    };

    store.dispatch(loginSuccessAction(data.data.token, user));
  });
};
