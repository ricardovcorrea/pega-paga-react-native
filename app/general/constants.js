export const baseUrl = 'http://aee72c91.ngrok.io';

export const endpoints = {
  login: `${baseUrl}/user/login`,
  checkIfEmailExists: `${baseUrl}/user/email/exists`,
  createAccount: `${baseUrl}/user/create`,
  loggedUserInfo: `${baseUrl}/user/info`,
  publicUserInfo: `${baseUrl}/user/publicInfo`,
  pay: `${baseUrl}/transaction/pay`,
};
