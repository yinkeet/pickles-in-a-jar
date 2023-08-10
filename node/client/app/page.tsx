"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { login } from '@/redux/features/authSlice';
import { useAppDispatch } from "@/redux/hooks";
import axios, { AxiosError } from 'axios';

const Login = () => {
    const dispatch = useAppDispatch();

    const router = useRouter();
    
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [loginStatus, setLoginStatus] = useState('');

    const handleUsernameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setUsername(event.target.value);
    };

    const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(event.target.value);
    };

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        setLoginStatus('');
        try {
            const response = await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}/api/v1/login`, {
                'username': username,
                'password': password
            }, {
                withCredentials: true
            });
            setLoginStatus('Login successful.');
            dispatch(login(response.data.user.username));
            router.replace('/dashboard');
        } catch (e) {
            if (e instanceof AxiosError) {
                const error = e as AxiosError;
                if ([400, 401].includes(error.response!.status)) {
                    setLoginStatus('Incorrect credentials.');
                }
            }

            console.log(e);
        }
    };

    return (
        <div className="flex flex-col items-center justify-center h-screen">
            <h2>Login</h2>
            <form className="flex flex-col items-center mt-4" onSubmit={handleSubmit}>
                <label className="mb-2">
                    <span className="p-2">Username</span>
                    <input className="p-2 bg-gray-50 border border-gray-300" type="text" value={username} onChange={handleUsernameChange} />
                </label>
                <br />
                <label className="mb-2">
                    <span className="p-2">Password</span>
                    <input className="p-2 bg-gray-50 border border-gray-300" type="password" value={password} onChange={handlePasswordChange} />
                </label>
                <br />
                <button className="w-full p-2 bg-blue-500 text-white" type="submit">Login</button>
            </form>
            <p className="mt-4 h-6 text-red-500 overflow-hidden">{loginStatus}</p>
        </div>
    );
}

export default Login;