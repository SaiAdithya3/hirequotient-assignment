import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Sidebar = () => {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:5000/api/users')
            .then(res => {
                setUsers(res.data);
                console.log(res.data)
            })
            .catch(err => {
                console.log(err);
            });
    }, []);
    return (
        <>
            <div className="w-1/3 flex flex-col items-center gap-5 bg-red-100">
                <h1 className="text-2xl font-bold">Users</h1>
                <input type="text" placeholder="Search users" className="w-full p-2 bg-gray-100 rounded-md" />
                <div className="w-full flex flex-col gap-2">
                    {users.map((user, index) => (
                        <div key={index} className="w-full flex items-center gap-2 p-2 bg-gray-100 rounded-md">
                            <img src={user.profilePicture} alt={user.username} className="w-10 h-10 object-cover rounded-full" />
                            <span className="text-sm font-semibold">{user.username}</span>
                        </div>
                    ))}
                </div>
                <div className="flex flex-row items-center justify-between w-full">
                    Logout
                    Profile
                </div>
            </div>
        </>
    )
}

export default Sidebar