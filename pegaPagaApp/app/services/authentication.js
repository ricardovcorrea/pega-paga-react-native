import axios from 'axios';
import { endpoints } from '../general/constants';

import { store } from '../redux/store';
import { loginSuccessAction, loginFailAction } from '../redux/generalReducer';

export const login = async (email, password) => {

    const { general } = store.getState();
    const { baseUrl } = general;

    const loginRequestUrl = `${baseUrl}${endpoints.login}`;
    const loginRequest = {
        EMAIL: email,
        PASSWORD: password
    }

    return new Promise((resolve) => {
        setTimeout(() => {
            resolve();
            store.dispatch(loginSuccessAction("fakeAccessToken", { id: 30, photo: "https://st2.depositphotos.com/4967775/11323/v/950/depositphotos_113235752-stock-illustration-avatar-girls-icon-vector-woman.jpg", firstName: "Ricardo", surName: "Vaz Corrêa" }));
        }, 300);
    });

    // return axios.post(loginRequestUrl, loginRequest).then(async (response) => {
    //     store.dispatch(loginSuccessAction(response.data.accessToken.accessToken, response.data.user));
    // }).catch((error) => {
    //     store.dispatch(loginFailAction(error));
    //     throw error;
    // });
}