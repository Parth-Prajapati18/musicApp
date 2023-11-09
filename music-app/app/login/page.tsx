"use client"
import { useState } from 'react';
import { useRouter } from 'next/navigation';

const SignIn = () => {

  const router = useRouter();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSignIn = async () => {

    try {
      const response = await fetch(
        `http://localhost:3000/login?username=${username}&password=${password}`
      );

      if (response.status === 200) {
        const data = await response.json();
        const { token } = data;
        console.log(token);
        router.push('/');
      } else if (response.status === 401) {
        const data = await response.json();
        console.log(data);
      }
    } catch (error) {
      console.log('Error signing in:', error);
    }
  };

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="bg-white p-8 rounded shadow-md">
        <h1 className="text-2xl font-bold mb-4">Sign In</h1>
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
          onClick={handleSignIn}
        >
          Sign In
        </button>
      </div>
    </div>
  );
};

export default SignIn;
