import React from 'react';

const Message = ({ message, isSentByCurrentUser, timestamp }) => {
    const formattedTime = new Date(timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    return (
        <div className={`flex ${isSentByCurrentUser ? 'justify-end' : 'justify-start'} mb-2`}>
            <div className={`bg-blue-400 font-semibold rounded-xl px-4 py-2 ${isSentByCurrentUser ? 'bg-blue-500 text-white ' : ''}`}>

                {message.attachments && message.attachments.length > 0 ? (
                    <div className=''>

                        {message.attachments.map((attachment, index) => (
                            <div key={index}>
                                {attachment.type === 'image' && (
                                    <img src={attachment.url} alt="Attachment" className="w-72 h-auto my-2" />
                                )}
                                {attachment.type === 'video' && (
                                    <video controls className="max-w-full mb-2">
                                        <source src={attachment.url} type="video/mp4" />
                                        Your browser does not support the video tag.
                                    </video>
                                )}
                                {attachment.type === 'file' && (
                                    <a href={attachment.url} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">{attachment.fileName}</a>
                                )}
                            </div>
                        ))}
                    </div>
                ) : (

                    <div>{message.message}</div>
                )}
                <div className="text-[8px] w-full text-end text-gray-100">{formattedTime}</div>
            </div>
        </div>
    );
}

export default Message;
