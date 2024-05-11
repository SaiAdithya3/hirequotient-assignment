import React from 'react';
import Sidebar from '../components/Sidebar';
import Conversation from '../components/Conversation';

const Chat = () => {
  return (
    <>
        <div className="w-full flex items-center justify-center">
            <Sidebar />
            <Conversation />
        </div>
    </>
  )
}

export default Chat