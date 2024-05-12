// MessageContext.jsx
import { createContext, useState, useEffect, useContext } from 'react';
import { SocketContext } from './SocketContext.jsx';

const MessageContext = createContext();

const MessageProvider = ({ children }) => {
  const [messag, setMessages] = useState([]);
  const socket = useContext(SocketContext);

  useEffect(() => {
    if (socket) {
      socket.on('new-message', (message) => {
        setMessages((prevMessages) => [...prevMessages, message]);
        console.log('New message received:', message);
      });
    }

    return () => {
      if (socket) {
        socket.off('new-message');
      }
    };
  }, [socket]);

  const sendMessage = (message) => {
    if (socket) {
      socket.emit('new-message', message);
    }
  };

  return (
    <MessageContext.Provider value={{ messag, sendMessage }}>
      {children}
    </MessageContext.Provider>
  );
};

export { MessageContext, MessageProvider };
