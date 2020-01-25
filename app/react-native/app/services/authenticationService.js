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

export const checkIfEmailExists = async email => {
  const checkIfEmailExistsRequest = {
    Email: email,
  };

  return axios
    .post(endpoints.checkIfEmailExists, checkIfEmailExistsRequest)
    .then(async response => {
      const {data} = response;
      if (data.code !== 200) {
        throw data;
      }
    });
};

export const createAccount = async (
  email,
  password,
  confirmPassword,
  name,
  surname,
) => {
  const createAccountRequest = {
    Email: email,
    Password: password,
    ConfirmPassword: confirmPassword,
    HasAcceptedTermsAndPrivacyPolice: true,
    User: {
      FirstName: name,
      Surname: surname,
    },
  };

  return axios
    .post(endpoints.createAccount, createAccountRequest)
    .then(async response => {
      const {data} = response;
      if (data.code !== 200) {
        throw data;
      }
    });
};
