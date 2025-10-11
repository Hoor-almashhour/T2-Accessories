'use client';

import Link from 'next/link';
import { useState } from 'react';
import { FaFacebookF, FaInstagram, FaTiktok } from 'react-icons/fa';


const LoginSection = () => {
  const [formData, setFormData] = useState({
    usernameOrEmail: '',
    password: '',
    rememberMe: false
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle login logic here
    console.log('Login data:', formData);
  };

  return (
  
    <div className="bg-white p-6 rounded-lg shadow-md max-w-md mx-auto">
      <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
      
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="usernameOrEmail" className="block text-sm font-medium text-gray-700 mb-1">
            Username or email address *
          </label>
          <input
            type="text"
            id="usernameOrEmail"
            name="usernameOrEmail"
            value={formData.usernameOrEmail}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-300"
          />
        </div>
        
        <div className="mb-4">
          <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
            Password *
          </label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border border-gray-100 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-300"
          />
        </div>
        
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center">
            <input
              type="checkbox"
              id="rememberMe"
              name="rememberMe"
              checked={formData.rememberMe}
              onChange={handleChange}
              className="h-4 w-4 text-amber-300 focus:ring-amber-300 border-gray-100 rounded"
            />
            <label htmlFor="rememberMe" className="ml-2 block text-sm text-gray-700">
              Remember me
            </label>
          </div>
          
          <Link href="#" className="text-sm text-gray-700 hover:text-amber-300">
            Lost your password?
          </Link>
        </div>
        
        <button
          type="submit"
          className="w-full bg-amber-300 text-white py-2 px-4 rounded-md hover:bg-amber-300 focus:outline-none focus:ring-2 focus:ring-amber-300 focus:ring-offset-2 transition-colors"
        >
          Log in
        </button>
      </form>
      
      <div className="mt-6 pt-6 border-t border-gray-200">
        <h3 className="text-lg font-medium mb-4">Search</h3>
        <div className="flex  w-full ">
          <input
            type="text"
            placeholder="Search"
            className="flex-grow  w-full px-3 py-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-amber-300"
          />
          <button className="bg-gray-200  px-4 py-2 rounded-r-md hover:bg-gray-300 transition-colors">
            🔍
          </button>
        </div>
      </div>
    
      
      <div className="mt-6">
        
        
        <div>
          <h4 className="font-medium mb-2">Follow Us On</h4>
          <div className="flex space-x-4">
            <Link
            href="https://www.instagram.com/kmalyat_t2?igsh=dzR3bmljaTVnb3o0&utm_source=qr"
            target="_blank"
            rel="noopener noreferrer"
            className="text-pink-800 hover:transition"
          >
            <FaInstagram size={24} />
          </Link>
          <Link
            href="https://www.tiktok.com/@.t22068?_t=ZS-90GoM4u2HUQ&_r=1"
            target="_blank"
            rel="noopener noreferrer"
            className="text-black hover:transition"
          >
            <FaTiktok size={24} />
          </Link>
          <Link
            href="https://www.facebook.com/share/1BWTSax4xn/?mibextid=wwXIfr"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:transition"
          >
            <FaFacebookF size={24} />
          </Link>
          </div>
        </div>
      </div>
    </div>
   
  );
};

export default LoginSection