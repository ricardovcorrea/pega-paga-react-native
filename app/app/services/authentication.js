/* eslint-disable no-unused-vars */
import axios from 'axios';

import {endpoints} from '../general/constants';
import {loginSuccessAction, loginFailAction} from '../redux/generalReducer';
import {store} from '../redux/store';

export const login = async (email, password) => {
  const {general} = store.getState();
  const {baseUrl} = general;

  const loginRequestUrl = `${baseUrl}${endpoints.login}`;
  const loginRequest = {
    EMAIL: email,
    PASSWORD: password,
  };

  return new Promise(resolve => {
    setTimeout(() => {
      resolve();
      store.dispatch(
        loginSuccessAction('fakeAccessToken', {
          id: 40,
          photo:
            'http://funny-photo.s3.amazonaws.com/preview/navi_avatar/avatar-grinning-man-face.jpg',
          firstName: 'Guito',
          surName: 'Araujo',
          balance: '202942',
        }),
      );
    }, 300);
  });

  // return axios.post(loginRequestUrl, loginRequest).then(async (response) => {
  //     store.dispatch(loginSuccessAction(response.data.accessToken.accessToken, response.data.user));
  // }).catch((error) => {
  //     store.dispatch(loginFailAction(error));
  //     throw error;
  // });
};
