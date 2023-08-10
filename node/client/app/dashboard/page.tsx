"use client";

import { useEffect, useState } from 'react';
import axios, { AxiosError } from 'axios';
import { logout } from '@/redux/features/authSlice';
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { useRouter } from 'next/navigation';
import BasicTable from './BasicTable';

const Dashboard = () => {
    const username = useAppSelector((state) => state.authReducer.username);
    const dispatch = useAppDispatch();

    const router = useRouter();

    const handleLogout = () => {
        const logoutAction = async () => {
            try {
                await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}/api/v1/logout`, {
                    withCredentials: true
                });
                dispatch(logout());
                router.replace('/')
            } catch (error) {
                console.log(error);
            }
        };
        logoutAction();
    }

    const [terminal, setTerminal] = useState<string[]>([]);

    useEffect(() => {
        // Create the WebSocket connection
        const ws = new WebSocket('ws://localhost:9001');

        // Set up event listeners for the WebSocket connection
        ws.onopen = () => {
            console.log('WebSocket connection opened');
        };

        ws.onmessage = (event) => {
            console.log(`Server says: ${event.data}`);
            setTerminal(oldTerminal => [...oldTerminal, event.data]);
        };

        ws.onclose = () => {
            console.log('WebSocket connection closed');
        };

        // Clean up the WebSocket connection when the component unmounts
        return () => {
            ws.close();
        };
    }, []);

    const [refreshCount, setRefreshCount] = useState(0);

    const handleRefreshClick = () => {
        setRefreshCount(refreshCount + 1);
    };

    return (
        <div className="flex flex-col h-screen">
            <div className="flex justify-between bg-gray-900 p-4 h-[70px]">
                <h1 className="text-2xl font-bold text-white">Dashboard - Welcome {username}</h1>
                <div>
                    <button className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded mx-4" onClick={handleRefreshClick}>
                        Refresh Table
                    </button>
                    <button className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded" onClick={handleLogout}>
                        Logout
                    </button>
                </div>
            </div>

            {/* Content */}
            <div className="flex-grow bg-gray-100 flex h-[calc(100vh-70px)]">
                <div className="w-1/2 bg-gray-200 p-4 overflow-auto">
                    <BasicTable refreshCount={refreshCount}/>
                </div>
                <div className="w-1/2 bg-white p-4 overflow-x-auto">
                    <div className="bg-black text-green-400 p-4 rounded-lg shadow-md">
                    <pre className="whitespace-pre-wrap text-sm font-mono text-white">
                        {terminal.map((item, index) => (
                            <span className='inline-block'>
                                {item}
                            </span>
                        ))}
                    </pre>
                    </div>
                </div>
            </div>
        </div>
    );

};

export default Dashboard;
