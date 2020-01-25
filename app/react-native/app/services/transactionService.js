/* eslint-disable radix */
import axios from 'axios';

import {endpoints} from '~/general/constants';
import {store} from '~/redux/store';

export const pay = async (to, amount) => {
  const {general} = store.getState();
  const {authToken} = general;

  const payRequestUrl = `${endpoints.pay}`;
  const payRequest = {
    to: {
      id: to,
    },
    amount: Number.parseInt(amount),
  };

  const requestOptions = {
    headers: {Authorization: `Bearer ${authToken}`},
  };
  console.log(payRequest);
  return axios
    .post(payRequestUrl, payRequest, requestOptions)
    .then(async response => {
      if (response.data.code !== 200) {
        throw response.data;
      }
    });
};
