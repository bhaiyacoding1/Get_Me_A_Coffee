"use client";
import React, { useState, useEffect, useCallback } from 'react';
import { useSession } from "next-auth/react";
import { useRouter } from 'next/navigation';
import { fetchuser, updateProfile } from '@/actions/useractions';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Loder from './Loder';

const Dashboard = () => {
    const { data: session } = useSession();
    const router = useRouter();
    const [form, setForm] = useState({});

    const getData = useCallback(async () => {
        if (session && session.user && session.user.name) {
            let u = await fetchuser(session.user.name);
            setForm(u);
        }
    }, [session]);

    useEffect(() => {
        if (!session) {
            router.push('/login');
        } else {
            getData();
        }
    }, [router, session, getData]);

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();  // Prevent the default form submission behavior
        if (session && session.user && session.user.name) {
            await updateProfile(form, session.user.name);
            toast('Profile Updated', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
        }
    };

    if (!session) {
        return <Loder />;  // Show a loading indicator while session is being fetched
    }

    return (
        <>
            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
            />

            <div className='container mx-auto py-5'>
                <h1 className='text-center my-5 text-3xl font-bold'>Welcome to your Dashboard</h1>

                <form className='max-w-lg mx-auto sm:max-w-2xl sm:px-0 px-8' onSubmit={handleSubmit}>
                    <div className="my-2">
                        <label htmlFor="name" className='block mb-2 text-sm font-medium text-white dark:text-white'>Name</label>
                        <input value={form.name || ""} onChange={handleChange} type="text" name="name" id="name" className='block w-full p-2 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'/>
                    </div>
                    <div className="my-2">
                        <label htmlFor="email" className='block mb-2 text-sm font-medium text-white dark:text-white'>Email</label>
                        <input value={form.email || ""} onChange={handleChange} type="email" name="email" id="email" className='block w-full p-2 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'/>
                    </div>
                    <div className="my-2">
                        <label htmlFor="username" className='block mb-2 text-sm font-medium text-white dark:text-white'>Username</label>
                        <input value={form.username || ""} onChange={handleChange} type="text" name="username" id="username" className='block w-full p-2 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'/>
                    </div>
                    <div className="my-2">
                        <label htmlFor="profilepic" className='block mb-2 text-sm font-medium text-white dark:text-white'>Profile Picture</label>
                        <input value={form.profilepic || ""} onChange={handleChange} type="text" name="profilepic" id="profilepic" className='block w-full p-2 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'/>
                    </div>
                    <div className="my-2">
                        <label htmlFor="coverpic" className='block mb-2 text-sm font-medium text-white dark:text-white'>Cover Picture</label>
                        <input value={form.coverpic || ""} onChange={handleChange} type="text" name="coverpic" id="coverpic" className='block w-full p-2 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'/>
                    </div>
                    <div className="my-2">
                        <label htmlFor="razorpayid" className='block mb-2 text-sm font-medium text-white dark:text-white'>Razorpay Id</label>
                        <input value={form.razorpayid || ""} onChange={handleChange} type="text" name="razorpayid" id="razorpayid" className='block w-full p-2 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'/>
                    </div>
                    <div className="my-2">
                        <label htmlFor="razorpaysecret" className='block mb-2 text-sm font-medium text-white dark:text-white'>Razorpay Secret</label>
                        <input value={form.razorpaysecret || ""} onChange={handleChange} type="text" name="razorpaysecret" id="razorpaysecret" className='block w-full p-2 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'/>
                    </div>
                    <div className="my-6">
                        <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full  px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Save</button>
                    </div>
                </form>
            </div>
        </>
    );
};

export default Dashboard;
