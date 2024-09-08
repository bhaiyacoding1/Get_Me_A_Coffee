"use client"
import React, { useEffect, useState, useCallback } from 'react'
import Script from 'next/script'
import { fetchpayments, initiate } from '@/actions/useractions'
import { fetchuser } from '@/actions/useractions'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useRouter } from 'next/navigation'
import { useSearchParams } from 'next/navigation'
import { useSession } from 'next-auth/react'
import Image from 'next/image'

const PaymentPage = ({ username }) => {
    const { data: session } = useSession()
    const router = useRouter()
    const [paymentform, setpaymentform] = useState({})
    const [currentUser, setcurrentUser] = useState({})
    const [payments, setPayments] = useState([])
    const searchParams = useSearchParams()

    const getData = useCallback(async () => {
        let u = await fetchuser(username)
        setcurrentUser(u)
        let dbpayments = await fetchpayments(username)
        setPayments(dbpayments)
    }, [username]) // Added username as dependency

    useEffect(() => {
        if (!session) {
            router.push('/login')
        }
    }, [session, router])

    useEffect(() => {
        getData()
    }, [getData]) // Included getData in the dependency array

    useEffect(() => {
        if (searchParams.get("paymentdone") === "true") {
            toast('Thanks for your donation', {
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
    }, [searchParams])

    const handleChange = (e) => {
        setpaymentform({ ...paymentform, [e.target.name]: e.target.value })
    }

    const pay = async (amount) => {
        let a = await initiate(amount, username, paymentform)
        let orderId = a.id
        var options = {
            "key": currentUser.razorpayid,
            "amount": amount,
            "currency": "INR",
            "name": "BuyMeACoffee",
            "description": "Test Transaction",
            "image": "https://example.com/your_logo",
            "order_id": orderId,
            "callback_url": `${process.env.NEXT_PUBLIC_URL}/api/razorpay`,
            "prefill": {
                "name": "Gaurav Kumar",
                "email": "gaurav.kumar@example.com",
                "contact": "9000090000"
            },
            "notes": {
                "address": "Razorpay Corporate Office"
            },
            "theme": {
                "color": "#3399cc"
            }
        }
        var rzp1 = new Razorpay(options);
        rzp1.open();
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
            <Script src="https://checkout.razorpay.com/v1/checkout.js"></Script>

            <div className="cover relative w-full ">
                {/* <img src={currentUser.coverpic} alt="cover" /> */}
                <Image src="https://static.vecteezy.com/system/resources/previews/012/720/075/non_2x/cloud-computing-social-media-banner-hi-tech-cloud-connection-technology-linkedin-cover-internet-business-technology-header-global-data-information-exchange-background-illustration-vector.jpg" alt="cover" width={1600} height={100} objectFit='cover'/>
                <div className="logo absolute bottom-[-40px] left-[42%] md:left-[47%] ">
                    {/* <img className=' rounded-lg ring ring-white' src={currentUser.profilepic} width={75} alt="profile_photo" /> */}
                    <Image className=' rounded-lg ring ring-white' src="/images/logo.avif" width={75} height={55} alt="profile_photo" />
                </div>
            </div>
            <div className="info flex flex-col items-center justify-center my-14">
                <div className="font-bold text-2xl">
                    @{username}
                </div>
                <div className="font-bold text-slate-400">
                    Lets help {username} get a coffee!
                </div>
                <div className="font-bold text-slate-400">
                    {payments.length} Payments . ₹{payments.reduce((a, b) => a + b.amount, 0)} raised
                </div>
                <div className="btn">
                    <button type="button" className="text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl  focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-10 py-2 text-center me-2 mb-2 mt-2">Join for free</button>
                </div>
                <div className="h-fit payment_div flex flex-col sm:flex-row sm:w-[80%] gap-3 w-[100%] mt-2">
                    <div className="suppoters w-full md:w-1/2  bg-slate-900 p-8 rounded-lg">
                        <h2 className='font-bold text-2xl my-3'>Supporters</h2>
                        <ul className='mx-5'>
                            {payments.length === 0 && <li>No Payments yet</li>}
                            {payments.map((p, i) => {
                                return <li key={i} className='my-5 flex gap-2 items-center'>
                                    <img className='border border-white rounded-full p-1 bg-slate-200' src="/images/avtar.gif" width={27} alt="avtar" />
                                    <span className='text-sm'>
                                        {p.name} donated <span className='font-bold'>₹{p.amount}</span> with a message"{p.message}"
                                    </span>
                                </li>
                            })}
                        </ul>
                    </div>
                    <div className="payments w-full md:w-1/2  bg-slate-900 p-8 rounded-lg">
                        <h2 className='font-bold text-2xl my-3'>Make a Payment</h2>
                        <div className="flex  flex-col gap-2">
                            <input onChange={handleChange} value={paymentform.name} name='name' type="text" className='w-full p-3 rounded-lg bg-slate-800' placeholder='Enter Name' />
                            <input onChange={handleChange} value={paymentform.message} name='message' type="text" className='w-full p-3 rounded-lg bg-slate-800' placeholder='Enter Message' />
                            <input onChange={handleChange} value={paymentform.amount} name='amount' type="text" className='w-full p-3 rounded-lg bg-slate-800' placeholder='Enter Amount' />
                            <button onClick={() => pay(Number.parseInt(paymentform.amount) * 100)} type="button" className="text-white bg-gradient-to-br from-purple-900 to-blue-900 hover:bg-gradient-to-bl  focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-4 py-2 text-center me-2 mb-2 disabled:to-slate-600 disabled:from-purple-100">Pay</button>
                        </div>
                        <div className="flex gap-2 mt-5">
                            <button className='bg-slate-800 p-3 rounded-lg' onClick={() => pay(1000)}> Pay ₹10</button>
                            <button className='bg-slate-800 p-3 rounded-lg' onClick={() => pay(2000)}> Pay ₹20</button>
                            <button className='bg-slate-800 p-3 rounded-lg' onClick={() => pay(3000)}> Pay ₹30</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default PaymentPage
