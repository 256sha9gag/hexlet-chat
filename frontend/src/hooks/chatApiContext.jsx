import { useContext } from 'react';

import { ChatApiContext } from '../context/ChatApiProvider';

const useChatApi = () => useContext(ChatApiContext);

export default useChatApi;
