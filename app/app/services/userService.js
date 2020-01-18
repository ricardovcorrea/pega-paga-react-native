import axios from 'axios';
import { endpoints } from '../general/constants';

import { store } from '../redux/store';
import { loginSuccessAction, loginFailAction } from '../redux/generalReducer';

const fakeUsers = {
    30: {
        id: 30,
        firstName: "Ricardo",
        surName: "Vaz Corrêa",
        photo: "https://st2.depositphotos.com/4967775/11323/v/950/depositphotos_113235752-stock-illustration-avatar-girls-icon-vector-woman.jpg"
    }
}

export const getUserInfo = async (userId) => {

    const { general } = store.getState();
    const { baseUrl } = general;

    const getUserInfoRequestUrl = `${baseUrl}${endpoints.userInfo}`;
    const getUserInfoRequest = {
        userId: userId
    }

    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(fakeUsers[userId]);
        }, 300);
    });

    // return axios.post(loginRequestUrl, loginRequest).then(async (response) => {
    //     store.dispatch(loginSuccessAction(response.data.accessToken.accessToken, response.data.user));
    // }).catch((error) => {
    //     store.dispatch(loginFailAction(error));
    //     throw error;
    // });
}