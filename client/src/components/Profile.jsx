import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

const Profile = ({ closeModal, userId, setAuth }) => {
    const [profileDetails, setProfileDetails] = useState(null);
    const [newUsername, setNewUsername] = useState('');
    const [newEmail, setNewEmail] = useState('');
    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const history = useNavigate();

    useEffect(() => {
        axios.post('https://chatapplication-2tey.onrender.com/api/users/details', {
            userId: userId
        })
            .then(res => {
                console.log(res.data);
                setProfileDetails(res.data);
            })
            .catch(err => {
                console.log(err);
                toast.error('Error fetching user details');
            });
    }, []);

    const handleEditProfile = async () => {
        try {
            const response = await axios.post('https://chatapplication-2tey.onrender.com/api/auth/edit-profile', {
                userId: userId,
                username: newUsername,
                email: newEmail
            });
            console.log(response.data);
            toast.success('Profile updated successfully');
            setProfileDetails(prevState => ({
                ...prevState,
                username: newUsername,
                email: newEmail
            }));
        } catch (error) {
            console.log(error.response.data);
            setErrorMessage(error.response.data.message);
            toast.error(error.response.data.message);
        }
    };

    const handleChangePassword = async () => {
        try {
            const response = await axios.post('https://chatapplication-2tey.onrender.com/api/auth/change-password', {
                userId: userId,
                oldPassword: oldPassword,
                newPassword: newPassword,
                confirmPassword: confirmPassword
            });
            console.log(response.data);
            toast.success('Password changed successfully');
            setOldPassword('');
            setNewPassword('');
            setConfirmPassword('');
        } catch (error) {
            console.log(error.response.data);
            setErrorMessage(error.response.data.message);
            toast.error(error.response.data.message);
        }
    };

    const handleLogout = () => {
        localStorage.removeItem('chat-user');
        toast.success('Logged out successfully');
        history('/login');
    };

    return (
        <>
            <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-70 flex justify-center items-center">
                <div className="w-1/3 bg-white p-4 rounded-lg">
                    <h2 className="text-xl font-bold mb-4">User Profile</h2>
                    {profileDetails && (
                        <div>
                            <p>Name: {profileDetails.name}</p>
                            <p>Username: {profileDetails.username}</p>
                            <p>Email: {profileDetails.email}</p>
                            {/* Add more profile details here */}

                            <div className="mt-4">
                                <input
                                    type="text"
                                    placeholder="New Username"
                                    value={newUsername}
                                    onChange={(e) => setNewUsername(e.target.value)}
                                    className="w-full p-2 mb-2 border rounded-md"
                                />
                                <input
                                    type="email"
                                    placeholder="New Email"
                                    value={newEmail}
                                    onChange={(e) => setNewEmail(e.target.value)}
                                    className="w-full p-2 mb-2 border rounded-md"
                                />
                                <button onClick={handleEditProfile} className="mt-2 w-full p-2 bg-blue-500 text-white rounded-md">Edit Profile</button>
                            </div>

                            <div className="mt-4">
                                <input
                                    type="password"
                                    placeholder="Old Password"
                                    value={oldPassword}
                                    onChange={(e) => setOldPassword(e.target.value)}
                                    className="w-full p-2 mb-2 border rounded-md"
                                />
                                <input
                                    type="password"
                                    placeholder="New Password"
                                    value={newPassword}
                                    onChange={(e) => setNewPassword(e.target.value)}
                                    className="w-full p-2 mb-2 border rounded-md"
                                />
                                <input
                                    type="password"
                                    placeholder="Confirm Password"
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                    className="w-full p-2 mb-2 border rounded-md"
                                />
                                <button onClick={handleChangePassword} className="mt-2 w-full p-2 bg-blue-500 text-white rounded-md">Change Password</button>
                            </div>
                        </div>
                    )}

                    <p className="text-red-500 mt-2">{errorMessage}</p>
                    <div className="w-full flex gap-2 items-center mt-3">
                        <button onClick={handleLogout} className=" w-full p-2 bg-red-500 text-white rounded-md">Logout</button>
                        <button onClick={closeModal} className="w-full p-2 bg-blue-500 text-white rounded-md">Close</button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Profile;
