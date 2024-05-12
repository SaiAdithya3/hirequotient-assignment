import React, { useState, useEffect, useContext, useRef } from 'react';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';
import { MessageContext } from '../context/MessageContext';
import Message from './Message';

const Conversation = ({ selectedUser }) => {
    const [messages, setMessages] = useState([]);
    const { messag, setMessag } = useContext(MessageContext);
    const [newMessageText, setNewMessageText] = useState('');
    const { authUser } = useContext(AuthContext);
    const { sendMessage } = useContext(MessageContext);
    const messagesEndRef = useRef(null);

    useEffect(() => {
        if (selectedUser && authUser) {
            axios.get(`http://localhost:5000/api/messages/${authUser._id}/${selectedUser._id}`)
                .then(res => {
                    const serverMessages = res.data.messages.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
                    setMessages(serverMessages);
                    scrollToBottom();
                })
                .catch(err => {
                    console.error("Error fetching messages:", err);
                });
        }
    }, [messag, selectedUser]);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    const sendMessage1 = async () => {
        try {
            const response = await axios.post(`http://localhost:5000/api/messages/send/${selectedUser._id}`, {
                message: newMessageText,
                senderId: authUser._id
            });
            sendMessage(response.data.newMessage);
            setNewMessageText('');
            scrollToBottom();
        } catch (error) {
            console.error("Error sending message:", error);
        }
    };

    return (
        <div className="w-3/4 bg-yellow-100 h-full flex flex-col">
                    <h1 className="text-xl font-bold p-4">{selectedUser ? `Conversation with ${selectedUser.username}` : 'Select a user to start conversation'}</h1>
            <div className="p-8 overflow-y-auto flex-grow">
                <div className="rounded-lg h-full">
                    {messages.map((message, index) => (
                        <Message
                            key={index}
                            message={message.message}
                            isSentByCurrentUser={message.senderId === authUser._id}
                            timestamp={message.createdAt}
                        />
                    ))}
                    <div ref={messagesEndRef} />
                </div>
            </div>
            <div className="flex justify-between items-center p-4">
                <input type="text" placeholder="Type your message..." className="border rounded-lg py-2 px-4 w-3/4" value={newMessageText} onChange={(e) => setNewMessageText(e.target.value)} />
                <button className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-lg" onClick={sendMessage1}>Send</button>
            </div>
        </div>
    );
}

export default Conversation;
