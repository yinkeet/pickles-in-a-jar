"use client";

import axios from 'axios';
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

    return (
        <div className="flex flex-col h-screen">
            <div className="flex justify-between bg-gray-900 p-4">
                <h1 className="text-2xl font-bold text-white">Dashboard - Welcome {username}</h1>
                <div>
                    <button className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded" onClick={handleLogout}>
                        Logout
                    </button>
                </div>
            </div>

            {/* Content */}
            <div className="flex-grow bg-gray-100 flex">
                <div className="w-1/2 bg-gray-200 p-4 overflow-x-auto">
                    <BasicTable />
                </div>
                <div className="flex-grow bg-white p-4">
                    <div className="bg-black text-green-400 p-4 rounded-lg shadow-md">
                    <pre className="whitespace-pre-wrap text-sm font-mono">
                        <span className="text-yellow-400">user@website:</span><span className="text-blue-300">~$</span> ls -l
                        <span className="text-white">total 16</span>
                        <span className="text-white">drwxr-xr-x 2 user user 4096 Aug 10 10:00 Documents</span>
                        <span className="text-white">drwxr-xr-x 3 user user 4096 Aug 10 11:30 Downloads</span>
                        <span className="text-white">-rw-r--r-- 1 user user    0 Aug 10 09:45 File.txt</span>
                        <span className="text-white">drwxr-xr-x 2 user user 4096 Aug 10 09:00 Pictures</span>
                    </pre>
                    </div>
                </div>
            </div>
        </div>
    );

};

export default Dashboard;
