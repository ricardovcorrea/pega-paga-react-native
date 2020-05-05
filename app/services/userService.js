import axios from 'axios';

import {endpoints} from '../general/constants';
import {setLoggedUserInfoAction} from '../redux/generalReducer';
import {store} from '../redux/store';

export const refreshLoggedUserInfo = async () => {
  const {general} = store.getState();
  const {authToken} = general;

  const getUserInfoRequestUrl = `${endpoints.loggedUserInfo}`;

  const requestOptions = {
    headers: {Authorization: `Bearer ${authToken}`},
  };

  return axios
    .get(getUserInfoRequestUrl, requestOptions)
    .then(async response => {
      const {data} = response;
      if (data.code === 200) {
        store.dispatch(setLoggedUserInfoAction(response.data.data));
      } else {
        throw data;
      }
    });
};

export const getPublicUserInfo = async userId => {
  const {general} = store.getState();
  const {authToken} = general;

  const getPublicUserInfoRequestUrl = `${endpoints.publicUserInfo}`;
  const getPublicUserInfoRequest = {
    id: userId,
  };

  const requestOptions = {
    headers: {Authorization: `Bearer ${authToken}`},
  };

  return axios
    .post(getPublicUserInfoRequestUrl, getPublicUserInfoRequest, requestOptions)
    .then(async response => {
      const {data} = response;

      if (data.code !== 200) {
        throw data;
      }

      return data.data;
    });
};
