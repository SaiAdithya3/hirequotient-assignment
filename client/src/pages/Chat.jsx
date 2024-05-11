import React from 'react';
import Sidebar from '../components/Sidebar';
import Conversation from '../components/Conversation';

const Chat = () => {
  return (
    <>
        <div className="p-14 h-screen w-full flex ">
            <Sidebar />
            {/* <Conversation /> */}
        </div>
    </>
  )
}

export default Chat