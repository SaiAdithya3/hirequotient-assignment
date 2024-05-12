import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';
import Conversation from '../components/Conversation';
import { useSocketContext } from '../context/SocketContext';
import { toast } from 'sonner';
import Profile from './Profile';

const Sidebar = () => {
    const [users, setUsers] = useState([]);
    const [selectedUser, setSelectedUser] = useState(null);
    const { authUser } = useContext(AuthContext);
    const { onlineUsers } = useSocketContext();
    const [allusers, setAllUsers] = useState([]);
    const [showNewConversationModal, setShowNewConversationModal] = useState(false);
    const [sidebarSearchQuery, setSidebarSearchQuery] = useState('');
    const [modalSearchQuery, setModalSearchQuery] = useState('');
    const [userStatus, setUserStatus] = useState('available');
    const [mainusers, setMainUsers] = useState([]);
    const [profileModal, setProfileModal] = useState(false);
    const [profileDetails, setProfileDetails] = useState(null);

    useEffect(() => {
        axios.post('https://chatapplication-2tey.onrender.com/api/users/details', {
            userId: authUser && authUser._id
        })
            .then(res => {
                console.log(res.data);
                setMainUsers(res.data);
            })
            .catch(err => {
                console.log(err);
                toast.error('Error fetching user details');
            });
    }, []);

    useEffect(() => {
        axios.post('https://chatapplication-2tey.onrender.com/api/users/check', {
            userId: authUser && authUser._id
        })
            .then(res => {
                const users = res.data.map(conversation => conversation.participants.filter(participant => participant._id !== authUser._id));
                const conversationUsers = Array.from(new Set(users.flat()));
                setUsers(conversationUsers);
                console.log(conversationUsers);
            })
            .catch(err => {
                console.log(err);
                toast.error('Error fetching conversations');
            });
    }, [selectedUser]);

    useEffect(() => {
        axios.get('https://chatapplication-2tey.onrender.com/api/users').then(res => {
            setAllUsers(res.data);
        }).catch(err => {
            console.log(err);
            toast.error('Error fetching users');
        });
    }, []);

    const handleUserSelection = (user) => {
        setSelectedUser(user);
        setShowNewConversationModal(false);
    };

    const isUserOnline = (userId) => {
        return onlineUsers.includes(userId);
    };

    const handleNewConversationClick = () => {
        setShowNewConversationModal(true);
    };

    const closeModal = () => {
        setProfileModal(false);
    };

    const openProfileModal = () => {
        setProfileModal(true);

    };

    const sidebarFilteredUsers = users.filter(user =>
        user.username.toLowerCase().includes(sidebarSearchQuery.toLowerCase())
    );

    const modalFilteredUsers = allusers.filter(user =>
        user.username.toLowerCase().includes(modalSearchQuery.toLowerCase())
    );

    const handleChangeStatus = async (status) => {
        try {
            await axios.put('https://chatapplication-2tey.onrender.com/api/users/status', {
                userId: authUser._id,
                status: status
            });
            setUserStatus(status);
            console.log('Status changed successfully');
            console.log(status)
        } catch (error) {
            console.log(error);
        }
    };
    const bottomOfViewportX = window.scrollX + window.innerWidth;
    const bottomOfViewportY = window.scrollY + window.innerHeight;

    return (
        <div className="w-full flex flex-row items-center gap-5 h-full">
            <div className="flex flex-col h-full justify-between p-3 rounded-xl items-center gap-5 bg-red-100">
                <div className="gap-5 flex flex-col w-full">
                    <div className="flex items-center w-full p-2 justify-between">
                        <h1 className="text-2xl text-center font-bold">Users</h1>
                        <p className="text-sm bg-green-200 rounded-lg px-2 font-semibold text-center">S: {mainusers.status}</p>
                    </div>
                    <div className="text-sm flex flex-row items-center gap-2">
                        <p>Status:</p>
                        <button className="px-2 py-1 bg-blue-600 text-white rounded-lg " onClick={() => handleChangeStatus('available')}>Available</button>
                        <button className="px-2 py-1 bg-yellow-500 text-white rounded-lg" onClick={() => handleChangeStatus('busy')}>Busy</button>
                    </div>
                    <input
                        type="text"
                        placeholder="Search users"
                        value={sidebarSearchQuery}
                        onChange={(e) => setSidebarSearchQuery(e.target.value)}
                        className="w-full p-2 mb-2 border rounded-lg"
                    />
                    <div className="w-full flex flex-col gap-2">
                        {sidebarFilteredUsers.map((user, index) => (
                            <div key={index} className="w-full cursor-pointer hover:scale-105 transition-all flex items-center gap-2 p-2 bg-gray-100 rounded-md" onClick={() => handleUserSelection(user)}>
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
                <div className="flex flex-row text-sm items-center justify-between w-full">
                    <button className="w-1/3 p-2 bg-red-500 text-white rounded-md" onClick={handleNewConversationClick}>New </button>
                    <button className="w-1/3 p-2 bg-green-500 text-white rounded-md" onClick={openProfileModal}>Profile</button>
                </div>
            </div>

            <Conversation selectedUser={selectedUser} status={userStatus}
                bottomOfViewportX={bottomOfViewportX}
                bottomOfViewportY={bottomOfViewportY}
            />
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

            {profileModal && (
                <Profile closeModal={closeModal} userId={authUser._id} />
            )}

        </div>
    );
}

export default Sidebar;
