import { useContext } from 'react';

import authContext from '../context/AuthContext.jsx';

const useAuth = () => useContext(authContext);

export default useAuth;
