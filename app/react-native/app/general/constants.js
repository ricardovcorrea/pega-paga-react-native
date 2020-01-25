export const baseUrl = 'http://49c3d089.ngrok.io';

export const endpoints = {
  login: `${baseUrl}/user/login`,
  loggedUserInfo: `${baseUrl}/user/info`,
  publicUserInfo: `${baseUrl}/user/publicInfo`,
  pay: `${baseUrl}/transaction/pay`,
};
