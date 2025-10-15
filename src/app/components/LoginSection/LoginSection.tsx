'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { FaFacebookF, FaInstagram, FaTiktok } from 'react-icons/fa';
import { login, logout, listenToAuth } from '@/lib/auth';
import { User } from '@supabase/supabase-js';


const LoginSection = () => {
  const [formData, setFormData] = useState({
    usernameOrEmail: '',
    password: '',
    rememberMe: false
  });
    const [user, setUser] = useState<User | null>(null);

  // ✅ متابعة المستخدم الحالي من Firebase
  useEffect(() => {
   const unsubscribe = listenToAuth((currentUser: User | null) => {
     setUser(currentUser);
   });
   return () => unsubscribe();
 }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  // ✅ تسجيل الدخول عبر Firebase
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await login(formData.usernameOrEmail, formData.password);
      alert('✅ تم تسجيل دخول الأدمن بنجاح');
      window.location.href = '/';
    } catch (err) {
      console.error(err);
      alert('❌ اسم المستخدم أو كلمة المرور غير صحيحة');
    }
  };

  // ✅ تسجيل الخروج
  const handleLogout = async () => {
    await logout();
    alert('👋 تم تسجيل الخروج بنجاح');
    window.location.href = '/';
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md max-w-md mx-auto">
      <h2 className="text-2xl font-bold mb-6 text-center">
        {user ? 'Welcome Admin' : 'Login'}
      </h2>

      {/* 🔐 إذا لم يكن المستخدم مسجل دخول */}
      {!user ? (
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="usernameOrEmail" className="block text-sm font-medium text-gray-700 mb-1">
              Email address *
            </label>
            <input
              type="email"
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
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-300"
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
                className="h-4 w-4 text-amber-300 border-gray-300 rounded"
              />
              <label htmlFor="rememberMe" className="ml-2 text-sm text-gray-700">
                Remember me
              </label>
            </div>
            <Link href="#" className="text-sm text-gray-700 hover:text-amber-400">
              Lost your password?
            </Link>
          </div>

          <button
            type="submit"
            className="w-full bg-amber-400 cursor-pointer text-white py-2 px-4 rounded-md hover:bg-amber-500 transition"
          >
            Log in
          </button>
        </form>
      ) : (
        <button
          onClick={handleLogout}
          className="w-full bg-gray-200 text-gray-800 py-2 rounded-md hover:bg-gray-300 transition"
        >
          Logout ({user.email})
        </button>
      )}

      {/* 🔍 بحث ومتابعة السوشيال */}
      <div className="mt-6 pt-6 border-t border-gray-200">
        <h3 className="text-lg font-medium mb-4">Search</h3>
        <div className="flex">
          <input
            type="text"
            placeholder="Search"
            className="flex-grow px-3 py-2 border border-gray-300 rounded-l-md focus:ring-2 focus:ring-amber-300 focus:outline-none"
          />
          <button className="bg-gray-200 px-4 py-2 rounded-r-md hover:bg-gray-300 transition">
            🔍
          </button>
        </div>
      </div>

      <div className="mt-6">
        <h4 className="font-medium mb-2">Follow Us On</h4>
        <div className="flex space-x-4">
          <Link href="https://www.instagram.com/kmalyat_t2?igsh=dzR3bmljaTVnb3o0&utm_source=qr" target="_blank" className="text-pink-700 hover:opacity-80">
            <FaInstagram size={24} />
          </Link>
          <Link href="https://www.tiktok.com/@.t22068?_t=ZS-90GoM4u2HUQ&_r=1" target="_blank" className="text-black hover:opacity-80">
            <FaTiktok size={24} />
          </Link>
          <Link href="https://www.facebook.com/share/1BWTSax4xn/?mibextid=wwXIfr" target="_blank" className="text-blue-600 hover:opacity-80">
            <FaFacebookF size={24} />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LoginSection;
