'use client'
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Popup from '../Components/popup';

const SignUp = () => {

  const router = useRouter();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPopup, setShowPopup] = useState(false);
  const [errorMsg, seterrorMsg] = useState('')

  const handleSignUp = async () => {
    try {
      const response = await fetch('http://localhost:3000/signup', {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username, password }),
      });

      if (response.status === 200) {
        const data = await response.json();
        console.log(data.message);
        router.push('/login');
      } else if (response.status === 400) {
        const data = await response.json();
        seterrorMsg(data.message);
        setShowPopup(true);
      }
    } catch (error) {
      console.error('Error signing up:', error);
    }
  };

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="bg-white p-8 rounded shadow-md">
        <h1 className="text-2xl font-bold mb-4">Sign Up</h1>
        <div className="mb-4">
          <label htmlFor="username" className="block text-sm font-medium text-gray-600">
            Username
          </label>
          <input
            type="text"
            id="username"
            className="mt-1 p-2 w-full border rounded-md"
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label htmlFor="password" className="block text-sm font-medium text-gray-600">
            Password
          </label>
          <input
            type="password"
            id="password"
            className="mt-1 p-2 w-full border rounded-md"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded-md"
          onClick={handleSignUp}
        >
          Sign Up
        </button>
      </div>
      {
        showPopup && <Popup type='warning' message={errorMsg}></Popup>
      }
    </div>
  );
};

export default SignUp;
