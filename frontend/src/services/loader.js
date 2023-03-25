import axios from 'axios';

import routes from '../routes.js';
import getAuthHeader from './getAuthHeader.js';

const loadData = async () => {
  try {
    const response = await axios.get(routes.usersPath(), { headers: getAuthHeader() });
    // eslint-disable-next-line functional/no-expression-statements
    console.log(response.data);
    return response.data;
  } catch (e) {
    throw new Error(e);
  }
};

export default loadData;
