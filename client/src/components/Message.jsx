import React from 'react';

const Message = ({ message, isSentByCurrentUser, timestamp }) => {
    const formattedTime = new Date(timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    return (
        <div className={`flex ${isSentByCurrentUser ? 'justify-end' : 'justify-start'} mb-2`}>
            <div className={`bg-blue-400 font-semibold rounded-xl px-4 py-2 ${isSentByCurrentUser ? 'bg-blue-500 text-white' : ''}`}>
                <div>{message}</div>
                <div className="text-[8px] w-full text-end text-gray-100">{formattedTime}</div>
            </div>
        </div>
    );
}

export default Message;
