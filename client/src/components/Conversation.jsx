import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';
import Message from './Message';

const Conversation = ({ selectedUser }) => {
    const [messages, setMessages] = useState([]);
    const [newMessageText, setNewMessageText] = useState('');
    const { authUser } = useContext(AuthContext);

    useEffect(() => {
        if (selectedUser) {
            axios.get(`http://localhost:5000/api/messages/${authUser._id}/${selectedUser._id}`)
                .then(res => {
                    const sortedMessages = res.data.messages.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
                    setMessages(sortedMessages);
                })
                .catch(err => {
                    console.error("Error fetching messages:", err);
                });
        }
    }, [selectedUser]);

    const sendMessage = async () => {
        try {
            const response = await axios.post(`http://localhost:5000/api/messages/send/${selectedUser._id}`, {
                message: newMessageText,
                senderId: authUser._id
            });
            setMessages([...messages, response.data.newMessage]);
            setNewMessageText('');
        } catch (error) {
            console.error("Error sending message:", error);
        }
    };

    return (
        <div className="w-3/4 bg-yellow-100">
            <div className="h-full flex items-center justify-center">
                <div className="max-w-lg w-full p-8">
                    <div className="border rounded-lg overflow-y-scroll h-full">
                        <h1 className="text-xl font-bold">{selectedUser ? `Conversation with ${selectedUser.username}` : 'Select a user to start conversation'}</h1>
                        {messages.map((message, index) => (
                            <Message
                                key={index}
                                message={message.message}
                                isSentByCurrentUser={message.senderId === authUser._id}
                                timestamp={message.createdAt}
                            />
                        ))}

                    </div>
                </div>
            </div>
            <div className="flex justify-between items-center p-4">
                <input type="text" placeholder="Type your message..." className="border rounded-lg py-2 px-4 w-3/4" value={newMessageText} onChange={(e) => setNewMessageText(e.target.value)} />
                <button className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-lg" onClick={sendMessage}>Send</button>
            </div>
        </div>
    );
}

export default Conversation;
