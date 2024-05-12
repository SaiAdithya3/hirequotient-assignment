import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';
import Conversation from '../components/Conversation';
import { useSocketContext } from '../context/SocketContext';

const Sidebar = () => {
    const [users, setUsers] = useState([]);
    const [selectedUser, setSelectedUser] = useState(null);
    const { authUser } = useContext(AuthContext);
    const { onlineUsers } = useSocketContext();
    const [allusers, setAllUsers] = useState([]);
    const [showNewConversationModal, setShowNewConversationModal] = useState(false);
    const [sidebarSearchQuery, setSidebarSearchQuery] = useState('');
    const [modalSearchQuery, setModalSearchQuery] = useState('');


    useEffect(() => {
        console.log('Online users:', onlineUsers);
    }, [onlineUsers]);

    useEffect(() => {
        axios.post('http://localhost:5000/api/users/check', {
            userId: authUser._id
        })
            .then(res => {
                const users = res.data.map(conversation => conversation.participants.filter(participant => participant._id !== authUser._id));
                const conversationUsers = Array.from(new Set(users.flat()));
                setUsers(conversationUsers);
                console.log(conversationUsers);
            })
            .catch(err => {
                console.log(err);
            });
    }, [selectedUser]);

    useEffect(() => {
        axios.get('http://localhost:5000/api/users').then(res => {
            setAllUsers(res.data);
            // console.log(allusers)
        }).catch(err => {
            console.log(err);
        });
    }, []);
    const handleUserSelection = (user) => {
        setSelectedUser(user);
        setShowNewConversationModal(false);
    }

    const isUserOnline = (userId) => {
        return onlineUsers.includes(userId);
    };

    const handleNewConversationClick = () => {
        setShowNewConversationModal(true);
    };

    const closeModal = () => {
        setShowNewConversationModal(false);
    };

    const sidebarFilteredUsers = users.filter(user =>
        user.username.toLowerCase().includes(sidebarSearchQuery.toLowerCase())
    );

    const modalFilteredUsers = allusers.filter(user =>
        user.username.toLowerCase().includes(modalSearchQuery.toLowerCase())
    );

    return (
        <div className="w-full flex flex-row items-center gap-5 h-full">
            <div className="flex flex-col h-full justify-between p-3 rounded-xl items-center gap-5 bg-red-100">
                <div className="gap-5 flex flex-col w-full">

                    <h1 className="text-2xl text-center font-bold">Users</h1>
                    <input
                        type="text"
                        placeholder="Search users"
                        value={sidebarSearchQuery}
                        onChange={(e) => setSidebarSearchQuery(e.target.value)}
                        className="w-full p-2 mb-2 border rounded-md"
                    />
                    <div className="w-full flex flex-col gap-2">
                        {sidebarFilteredUsers.map((user, index) => (
                            <div key={index} className="w-full flex items-center gap-2 p-2 bg-gray-100 rounded-md" onClick={() => handleUserSelection(user)}>
                                <img src={user.profilePic} alt={user.username} className="w-10 h-10 object-cover rounded-full" />
                                <div className="flex flex-col gap-1">
                                    <span className="text-sm font-semibold">{user.username}</span>
                                    {isUserOnline(user._id) ?
                                        <div className="flex items-center gap-2">
                                            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                                            <p className="text-green-500 text-xs">online</p>
                                        </div> :
                                        <div className="flex items-center gap-2">
                                            <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                                            <p className="text-red-500 text-xs">offline</p>
                                        </div>
                                    }
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="flex flex-row items-center justify-between w-full">
                    <button className="p-2 bg-red-500 text-white rounded-md" onClick={handleNewConversationClick}>New Conversation</button>
                    <button className="p-2 bg-green-500 text-white rounded-md">Profile</button>
                </div>
            </div>

            <Conversation selectedUser={selectedUser} />
            {showNewConversationModal && (
                <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-70 flex justify-center items-center">
                    <div className="w-1/3 bg-red-100 p-4 rounded-lg">
                        <h2 className="text-xl font-bold mb-4">Select User to start a new conversation</h2>
                        <input
                            type="text"
                            placeholder="Search users"
                            value={modalSearchQuery}
                            onChange={(e) => setModalSearchQuery(e.target.value)}
                            className="w-full p-2 mb-2 border rounded-md"
                        />
                        <div className="flex flex-col gap-2">
                            {modalFilteredUsers.map((user, index) => (
                                <div key={index} className="flex items-center gap-2 p-2 bg-gray-100 rounded-md" onClick={() => handleUserSelection(user)}>
                                    <img src={user.profilePic} alt={user.username} className="w-10 h-10 object-cover rounded-full" />
                                    <span className="text-sm font-semibold">{user.username}</span>

                                </div>
                            ))}
                        </div>
                        <button onClick={closeModal} className="mt-2 w-full p-2 bg-red-500 text-white rounded-md">Close</button>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Sidebar;
