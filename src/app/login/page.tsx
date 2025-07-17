//if the login  page if the user is not in the database then they need to redirect to new user fill forum basically ask some item form them
'use client';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(false);

  const toggleForm = () => {
    setIsLogin(!isLogin);
  };
  return (
    <div className="flex min-h-screen items-center justify-center bg-[#121826]">
      <div className="w-full max-w-md rounded-lg bg-[#121826] p-8 shadow-lg">
        <div className="mx-auto mb-6 flex w-4/5 items-center rounded-3xl bg-black p-1 transition-all duration-300 ease-in-out">
          <button
            onClick={toggleForm}
            type="button"
            aria-label="Switch to Sign Up"
            className={`flex-1 rounded-3xl p-2 text-center text-xl font-bold transition-all duration-300 ease-in-out ${
              !isLogin
                ? 'bg-white text-black'
                : 'bg-transparent text-white text-opacity-65 hover:text-opacity-100'
            }`}
          >
            Sign Up
          </button>
          <button
            onClick={toggleForm}
            type="button"
            aria-label="Switch to Login"
            className={`flex-1 rounded-3xl p-2 text-center text-xl font-bold transition-all duration-300 ease-in-out ${
              isLogin
                ? 'bg-white text-black'
                : 'bg-transparent text-white text-opacity-65 hover:text-opacity-100'
            }`}
          >
            Login
          </button>
        </div>
        <form>
          {isLogin && (
            <div className="mb-4">
              <label className="mb-2 block text-sm font-medium" htmlFor="email">
                Email
              </label>
              <input
                type="email"
                id="email"
                className="w-full rounded-lg border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter your email"
              />
            </div>
          )}
          {isLogin && (
            <div className="mb-4">
              <label
                className="mb-2 block text-sm font-medium"
                htmlFor="password"
              >
                Password
              </label>
              <input
                type="password"
                id="password"
                className="w-full rounded-lg border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter your password"
              />
            </div>
          )}

          {isLogin && (
            <div className="my-4 flex items-center justify-between">
              <div className="flex items-center">
                <input type="checkbox" id="rememberMe" className="mr-2" />
                <label htmlFor="rememberMe" className="text-sm">
                  Remember me
                </label>
              </div>
              <Link
                href="/login"
                className="text-sm text-blue-500 hover:underline"
              >
                Forgot Password?
              </Link>
            </div>
          )}
          {isLogin && (
            <button
              type="submit"
              className="w-full rounded-lg bg-blue-500 py-2 text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              Login
            </button>
          )}
        </form>
        <div className="mt-6">
          <button
            type="button"
            className="flex w-full items-center justify-center rounded-lg bg-white py-2 text-black hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <Image
              src="https://www.google.com/favicon.ico"
              alt="Google"
              width={20}
              height={20}
              className="mr-2"
            />
            Continue with Google
          </button>

        </div>
        <div className="mt-4 text-center">
          <p className="text-sm">
            {isLogin
              ? `Don't have an account?${' '}`
              : `Already have an account?${' '}`}
            <Link
              href="/login"
              className="text-blue-500 hover:underline "
              onClick={toggleForm}
            >
              {!isLogin ? 'Log in' : 'Sign up'}
            </Link>
          </p>
        </div>
        <div className="mt-4 text-center text-sm text-gray-600">
          {!isLogin
            ? 'Use GEC PKD Gmail To Sign Up'
            : 'Use GEC PKD Gmail To Log in'}
        </div>
      </div>
    </div>
  );
}
