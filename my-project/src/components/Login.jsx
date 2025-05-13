// Login.jsx
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import toast, { Toaster } from "react-hot-toast";
import { useDispatch } from 'react-redux';
import {login, logout} from "../store/authSlice.js"

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(true);
  const [formErrors, setFormErrors] = useState({});

  const navigate = useNavigate();
  const dispatch = useDispatch();

  // const LoginResponse = async ({email, password}) => {
  //   // const loadingToast = toast.loading("Logging into your account...");
  //   try {
  //     const loginResponse = await axios.post(
  //         `${import.meta.env.VITE_BACKEND_DOMAIN }/api/v1/users/login`,
  //         { email, password },
  //         { withCredentials: true }
  //     );

  //     if (loginResponse.data.data) {
  //         const userResponse = await axios.get(
  //             `${import.meta.env.VITE_BACKEND_DOMAIN }/api/v1/users/me`,
  //             { 
  //               withCredentials: true,
  //             }
  //         );
          
  //         if (userResponse.data.data) {
  //             // toast.success('Welcome back!');
  //             dispatch(login(userResponse.data.data));
  //             navigate("/")
  //         }
  //     }
  //       } catch (error) {
  //           console.log(error);
  //           const errorMessage = error.response?.data?.message || 'Login failed';
  //           toast.error(errorMessage);
  //           // dispatch(logout());
  //       } finally {
  //           setLoading(false);
  //       }
  // }

  const LoginResponse = async ({email, password}) => {
    try {
      const loginResponse = await axios.post(
          `${import.meta.env.VITE_BACKEND_DOMAIN }/api/v1/users/login`,
          { email, password },
          { withCredentials: true }
      );

      if (loginResponse.data.success) {
          const userResponse = await axios.get(
              `${import.meta.env.VITE_BACKEND_DOMAIN }/api/v1/users/me`,
              { 
                withCredentials: true,
              }
          );
          
          if (userResponse.data.success) {
              dispatch(login(userResponse.data.data));
              toast.success('Welcome back!');
              navigate("/profile");
          }
      }
    } catch (error) {
        console.error(error);
        const errorMessage = error.response?.data?.message || 'Login failed';
        toast.error(errorMessage);
        dispatch(logout());
    } finally {
        setLoading(false);
    }
}



  const validateForm = () => {
    const errors = {};
    
    if (!email) {
      errors.email = 'Email is required';
    }
    
    if (!password) {
      errors.password = 'Password is required';
    }
    
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      // In a real app, you would call your authentication API here
      LoginResponse({email, password})

      // Reset form after submission
      // setEmail('');
      // setPassword('');
    }
  };

  return (
    <div className="min-h-screen bg-light py-12 px-4 sm:px-6 lg:px-8 flex items-center justify-center">
      <Toaster position="top-center" reverseOrder={false} />
      <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-2xl shadow-lg relative overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute -top-10 -right-10 w-32 h-32 bg-primary-500/20 rounded-full"></div>
        <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-accent/20 rounded-full"></div>
        
        <div className="relative z-10">
          {/* Header */}
          <div className="text-center">
            {/* <Link to="/" className="flex items-center justify-center gap-2 mb-6">
              <div className="w-10 h-10 bg-primary-500 rounded-full flex items-center justify-center text-white font-bold">
                S
              </div>
              <span className="text-2xl font-sans text-primary-500">StoryTeller</span>
            </Link> */}
            <h2 className="text-3xl font-sans text-dark">Welcome Back!</h2>
            <p className="text-gray-600 mt-2">
              Sign in to access your account
            </p>
          </div>
          
          {/* Form */}
          <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
            <div className="space-y-4">
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                  Email Address
                </label>
                <div className="mt-1">
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className={`appearance-none relative block w-full px-3 py-3 border ${
                      formErrors.email ? 'border-red-500' : 'border-gray-300'
                    } rounded-lg placeholder-gray-500 focus:outline-none focus:ring-primary-500 focus:border-primary-500 focus:z-10 sm:text-sm`}
                    placeholder="you@example.com"
                  />
                  {formErrors.email && (
                    <p className="text-red-500 text-xs mt-1">{formErrors.email}</p>
                  )}
                </div>
              </div>
              
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                  Password
                </label>
                <div className="mt-1">
                  <input
                    id="password"
                    name="password"
                    type="password"
                    autoComplete="current-password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className={`appearance-none relative block w-full px-3 py-3 border ${
                      formErrors.password ? 'border-red-500' : 'border-gray-300'
                    } rounded-lg placeholder-gray-500 focus:outline-none focus:ring-primary-500 focus:border-primary-500 focus:z-10 sm:text-sm`}
                    placeholder="Your password"
                  />
                  {formErrors.password && (
                    <p className="text-red-500 text-xs mt-1">{formErrors.password}</p>
                  )}
                </div>
              </div>
            </div>
            
            <div className="flex items-center justify-end">
              {/* <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  checked={rememberMe}
                  onChange={() => setRememberMe(!rememberMe)}
                  className="h-4 w-4 text-primary-500 focus:ring-primary-500 border-gray-300 rounded"
                />
                <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-700">
                  Remember me
                </label>
              </div> */}
              
              <div className="text-sm">
                <a href="#" className="font-medium text-primary-500 hover:text-primary-600">
                  Forgot your password?
                </a>
              </div>
            </div>
            
            <div>
              <button
                type="submit"
                className="group relative w-full flex justify-center py-3 px-4 border border-transparent rounded-lg text-white font-medium bg-primary-500 hover:bg-primary-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
              >
                Sign In
              </button>
            </div>
          </form>
          
          {/* Social Login */}
          {/* <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">Or continue with</span>
              </div>
            </div>
            
            <div className="mt-6 grid grid-cols-2 gap-3">
              <div>
                <a
                  href="#"
                  className="w-full flex items-center justify-center px-4 py-2 border border-gray-300 rounded-lg shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
                >
                  <svg className="h-5 w-5 mr-2" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" />
                  </svg>
                  Google
                </a>
              </div>
              
              <div>
                <a
                  href="#"
                  className="w-full flex items-center justify-center px-4 py-2 border border-gray-300 rounded-lg shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
                >
                  <svg className="h-5 w-5 mr-2" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                  </svg>
                  Facebook
                </a>
              </div>
            </div>
          </div> */}
          
          {/* Link to signup */}
          <div className="text-center mt-6">
            <p className="text-sm text-gray-600">
              Don't have an account?
              <Link
                to="/signup"
                className="ml-1 font-medium text-primary-500 hover:text-primary-600"
              >
                Sign up
              </Link>
            </p>
          </div>
          
          {/* Terms */}
          <div className="text-center mt-4">
            <p className="text-xs text-gray-500">
              By signing in, you agree to our{' '}
              <Link to="/terms" className="underline hover:text-gray-700">Terms of Service</Link> and{' '}
              <Link to="/privacy" className="underline hover:text-gray-700">Privacy Policy</Link>.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;