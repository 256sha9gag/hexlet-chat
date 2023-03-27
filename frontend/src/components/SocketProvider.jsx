/* eslint-disable react/jsx-no-constructed-context-values */
/* eslint-disable functional/no-expression-statements */
// eslint-disable-next-line import/no-extraneous-dependencies
import { io } from 'socket.io-client';
import { useDispatch } from 'react-redux';
import SocketContext from '../context/SocketContext';
import { actions as messagesActions } from '../store/slice/messagesSlice';

const SocketProvider = ({ children }) => {
  const dispatch = useDispatch();
  const socket = io();

  socket.on('newMessage', (payload) => {
    // eslint-disable-next-line functional/no-expression-statements
    dispatch(messagesActions.addMessage(payload));
  });

  const sendMessage = (msg) => {
    socket.emit('newMessage', msg, (response) => {
      console.log(response.status);
    });
  };

  return (
    <SocketContext.Provider value={{
      sendMessage,
    }}
    >
      {children}
    </SocketContext.Provider>
  );
};

export default SocketProvider;
