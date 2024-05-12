import React, { useState, useEffect, useContext, useRef } from 'react';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';
import { MessageContext } from '../context/MessageContext';
import Message from './Message';
import ImageKit from 'imagekit';
import { toast } from 'sonner'

const Conversation = ({ selectedUser, status }) => {
    // console.log(status)
    const [messages, setMessages] = useState([]);
    const { messag, setMessag } = useContext(MessageContext);
    const [newMessageText, setNewMessageText] = useState('');
    const { authUser } = useContext(AuthContext);
    const { sendMessage } = useContext(MessageContext);
    const messagesEndRef = useRef(null);
    const [mainusers, setMainUsers] = useState([]);

    useEffect(() => {
        axios.post('http://localhost:5000/api/users/details', {
            userId: selectedUser && selectedUser._id
        })
            .then(res => {
                // console.log(res.data);
                setMainUsers(res.data);
            })
            .catch(err => {
                console.log(err);
                // toast.error('Error fetching user details');
            });
    });
    // console.log(mainusers)


    const imagekit = new ImageKit({
        publicKey: "public_ffNQ43/5mSLdUUnli2yQpX2nlxU=",
        privateKey: "private_fnAbFnaYL6M4mb1q0gVH0KsyGG4=",
        urlEndpoint: "https://ik.imagekit.io/vsn/chat",
        transformationPosition: "path",
        authenticationEndpoint: "http://localhost:5000/imagekit",
    });

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
                    toast.error('Error fetching messages');
                });
        }
    }, [messag, selectedUser]);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
    };


    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const sendMessage1 = async () => {
        try {
            const response = await axios.post(`http://localhost:5000/api/messages/send/${selectedUser._id}`, {
                message: newMessageText,
                senderId: authUser._id,
                status: selectedUser.status
            });
            sendMessage(response.data.newMessage);
            setNewMessageText('');
            scrollToBottom();

        } catch (error) {
            console.error("Error sending message:", error);
            toast.error('Error sending message');
        }
    };

    const handleFileUpload = async (event) => {
        try {
            const file = event.target.files[0];
            const fileExtension = file.name.split('.').pop().toLowerCase();
            const fileType = getFileType(fileExtension);
            if (!fileType) {
                console.error('Unsupported file type');
                toast.error('Unsupported file type');
                return;
            }

            const response = await imagekit.upload({
                file: file,
                fileName: file.name,
                folder: "/attachments/",
            });

            const attachmentUrl = response.url;
            console.log('Attachment URL:', attachmentUrl);

            await axios.post(`http://localhost:5000/api/messages/send/${selectedUser._id}`, {
                message: newMessageText,
                senderId: authUser._id,
                attachments: [{
                    type: fileType,
                    url: attachmentUrl
                }]
            });

            event.target.value = '';
        } catch (error) {
            console.error('Error uploading file:', error);
            toast.error('Error uploading file');
        }
    };

    const getFileType = (extension) => {
        if (['jpg', 'jpeg', 'png', 'gif', 'bmp'].includes(extension)) {
            return 'image';
        } else if (['mp4', 'mov', 'avi', 'mkv', 'wmv'].includes(extension)) {
            return 'video';
        } else {
            return null;
        }
    };

    return (
        <div className="w-3/4 bg-yellow-100 h-full flex rounded-2xl flex-col">
            <h1 className="flex items-center gap-4 text-xl font-bold p-4 bg-yellow-300 rounded-t-2xl">
                {selectedUser ? <img src={selectedUser.profilePic} alt={selectedUser.username} className="w-14 h-14 object-cover rounded-full" /> : null}
                {selectedUser ? ` ${selectedUser.username} - ${mainusers.status}` : 'Select a user to start conversation'}</h1>
            <div className="p-8 overflow-y-auto flex-grow">
                <div className="rounded-lg h-full" >
                    {messages.map((message, index) => (
                        <Message
                            key={index}
                            message={message}
                            isSentByCurrentUser={message.senderId === authUser._id}
                            timestamp={message.createdAt}
                        />
                    ))}
                    {/* <div /> */}
                    <div ref={messagesEndRef} />
                </div>
            </div>
            {selectedUser && (
                <div className="flex justify-between gap-2 items-center p-4">
                    <input type="text" placeholder="Type your message..." className="border rounded-lg py-2 px-4 w-3/4" value={newMessageText} onChange={(e) => setNewMessageText(e.target.value)} />
                    <label className="relative cursor-pointer bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-lg ">
                        <span>Attach </span>
                        <input type="file" className="opacity-0 absolute inset-0 w-full h-full z-10" onChange={handleFileUpload} />
                    </label>
                    <button className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-lg" onClick={sendMessage1}>Send</button>
                </div>
            )}

        </div>
    );
}

export default Conversation;
