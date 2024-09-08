"use client";
import React, { useEffect } from 'react';
import { useSession, signIn, signOut } from "next-auth/react";
import { useRouter } from 'next/navigation';

const Login = () => {
  const { data: session } = useSession();
  const router = useRouter();

  // Redirect to dashboard if user is already logged in
  useEffect(() => {
    if (session) {
      router.push('/dashboard');
    }
  }, [session, router]);

  return (
    <div className='py-14 container mx-auto'>
      <h1 className="text-center font-bold text-3xl">
        Login to Get your fans to support you
      </h1>
      <div className="flex flex-col items-center gap-2 min-h-[55vh] p-10">
        {/* Google sign-in button */}
        <button
          className="flex items-center w-60 bg-slate-50 border border-gray-300 rounded-lg shadow-md px-6 py-2 text-sm font-medium text-gray-800 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
          onClick={() => signIn('google')}
        >
          <svg className="h-6 w-6 mr-2" viewBox="-0.5 0 48 48" version="1.1">
            {/* SVG content for Google */}
            <g id="Icons" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
              {/* SVG paths */}
            </g>
          </svg>
          <span>Continue with Google</span>
        </button>

        {/* LinkedIn sign-in button */}
        <button
          className="flex items-center w-60 bg-slate-50 border border-gray-300 rounded-lg shadow-md px-6 py-2 text-sm font-medium text-gray-800 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
          onClick={() => signIn('linkedin')}
        >
          <svg className="h-6 w-6 mr-2" viewBox="0 -2 44 44" version="1.1">
            {/* SVG content for LinkedIn */}
            <g id="Icons" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
              {/* SVG paths */}
            </g>
          </svg>
          <span>Continue with LinkedIn</span>
        </button>

        {/* Twitter sign-in button */}
        <button
          className="flex items-center w-60 bg-slate-50 border border-gray-300 rounded-lg shadow-md px-6 py-2 text-sm font-medium text-gray-800 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
          onClick={() => signIn('twitter')}
        >
          <svg className="h-6 w-6 mr-2" viewBox="0 -4 48 48" version="1.1">
            {/* SVG content for Twitter */}
            <g id="Icons" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
              {/* SVG paths */}
            </g>
          </svg>
          <span>Continue with Twitter</span>
        </button>

        {/* Facebook sign-in button */}
        <button
          className="flex items-center w-60 bg-slate-50 border border-gray-300 rounded-lg shadow-md px-6 py-2 text-sm font-medium text-gray-800 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
          onClick={() => signIn('facebook')}
        >
          <svg className="h-6 w-6 mr-2" viewBox="0 0 48 48" version="1.1">
            {/* SVG content for Facebook */}
            <g id="Icons" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
              {/* SVG paths */}
            </g>
          </svg>
          <span>Continue with Facebook</span>
        </button>

        {/* GitHub sign-in button */}
        <button
          className="flex items-center w-60 bg-slate-50 border border-gray-300 rounded-lg shadow-md px-6 py-2 text-sm font-medium text-gray-800 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
          onClick={() => signIn('github')}
        >
          <svg className="h-6 w-6 mr-2" viewBox="0 0 73 73" version="1.1">
            {/* SVG content for GitHub */}
            <g id="Icons" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
              {/* SVG paths */}
            </g>
          </svg>
          <span>Continue with GitHub</span>
        </button>
      </div>
    </div>
  );
};

export default Login;
