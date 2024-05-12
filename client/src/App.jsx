import React from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import Chat from './pages/Chat';
import { Toaster } from 'sonner';

const App = () => {
  const navigate = useNavigate();
  const chatUser = localStorage.getItem('chat-user');




  return (
    <>
      <div className="w-full flex">
        <Routes>
          {
            chatUser ? (
              <>
                <Route path="/chat" element={<Chat />} />
                <Route path="*" element={<Chat />} />
              </>
            ) : (
              <>
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="*" element={<Login />} /> 
              </>
            )
          }
        </Routes>
        <Toaster position="top-center" richColors />
      </div>
    </>
  )
}

export default App;
