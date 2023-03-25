const apiPath = '/api/v1';
const root = '';
const all = '*';

export default {
  singInPath: () => [apiPath, 'login'].join('/'),
  singInPage: () => [root, 'login'].join('/'),
  notFoundPage: () => all,
  mainPage: () => '/',
  usersPath: () => [apiPath, 'data'].join('/'),
  signUpPath: () => [apiPath, 'signup'].join('/'),
  signUpPage: () => [apiPath, 'signup'].join('/'),
};
