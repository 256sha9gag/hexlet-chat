import axios from 'axios';

import routes from '../routes.js';
import getAuthHeader from './getAuthHeader.js';

export const getData = async () => {
  try {
    const response = await axios.get(routes.usersPath(), { headers: getAuthHeader() });
    return response.data;
  } catch (e) {
    throw new Error(e);
  }
};

export const createNewUser = async (userData) => {
  try {
    const response = await axios.post(routes.signUpPath(), userData);
    return response.data;
  } catch (e) {
    throw new Error(e);
  }
};

export const signIn = async (userData) => {
  try {
    const response = await axios.post(routes.singInPath(), userData);
    return response.data;
  } catch (e) {
    throw new Error(e);
  }
};
