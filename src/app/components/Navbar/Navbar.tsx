
'use client';
import Image from "next/image";
import { useState } from 'react';
import Link from 'next/link';
import { FaSearch, FaUser, FaBars, FaTimes, FaPhone,  } from 'react-icons/fa';
import { MdKeyboardArrowDown, MdKeyboardArrowLeft } from "react-icons/md";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const toggleSearch = () => {
    setIsSearchOpen(!isSearchOpen);
  };

  return (
    <nav className="bg-gray-200 shadow-lg">
      {/* الشريط العلوي */}
      <div className="bg-amber-300 text-white  py-5 px-4 ">
        <div className="container mx-auto flex justify-between items-center text-sm  mt-5 flex-wrap gap-5">
          <span className="flex items-center gap-2">
            <span>100% Secure Delivery Without Contacting The Courier</span>
          </span>
          
          <div className="flex items-center gap-4">
            <Link href="https://wa.me/96407754424278" className=" flex items-center gap-2 underline">
              <FaPhone className="text-white" />
              Need Help? Call Us : +964 07754424278
            </Link>
          </div>
        </div>
      </div>

      {/* الشريط الرئيسي */}
      <div className="containter mx-auto  max-w-7xl  mt-[-10px]
                 ">
         <div className="md:flex md:items-center md:justify-between md:flex-row md:py-4 bg-white rounded-2xl md:h-[66px]
             h-[250px] mx-10 flex flex-col items-center py-3.5">
          {/* الشعار */} 
          <div className="flex items-center space-x-8 rtl:space-x-reverse ">
               
            <Image src="/Logo/t2-logo.jpg" alt="logo" width={150} height={66}
            priority
             className=" rounded-2xl " />
            
          </div>

         
          {/* شريط البحث - للشاشات المتوسطة والكبيرة */}
            <div className="w-full flex items-center flex-1 md:max-w-2xl ">
                <div className="flex w-full bg-gray-100 rounded-lg overflow-hidden mx-3 ">
                    <input
                    type="text"
                    placeholder="Products Search..."
                    className="flex-1 px-3 py-2 bg-gray-100 focus:outline-none focus:ring-2 focus:ring-amber-300 focus:border-transparent"
                    />
        
                </div>
                <div className="mx-3 ">
                    <button className="w-32 rounded-lg px-3 py-2 bg-black text-white text-sm hover:bg-gray-800 transition-colors ">
                      Search Now
                    </button>
                </div>
            </div>


          {/* الأيقونات */}
          <div className="flex items-center space-x-4 rtl:space-x-reverse mx-4">

                {/* أيقونة المستخدم */}
                <button className="flex items-center space-x-1 text-gray-700 hover:text-amber-300  transition-colors">
                    <FaUser size={16} />
                    <Link href="/MyAccountPage" className=" sm:inline">Login</Link>
                </button>
          </div>
        </div>
      </div>

      {/* القائمة الرئيسية */}
      <div className=" bg-gray-200 py-5 px-4 ">
        <div className="container px-4 mx-auto ">
          {/* للشاشات الكبيرة */}
          <div className="hidden lg:flex items-center justify-between  flex-row-reverse ">
            <div className="flex items-center space-x-8 rtl:space-x-reverse">
              <Link href="/" className="text-gray-700 hover:text-amber-300 transition-colors font-medium">
                Home
              </Link>
              <Link href="/about" className="text-gray-700 hover:text-amber-300 transition-colors font-medium">
                About Us
              </Link>
              <div className="relative group">
                <button className="flex items-center space-x-1 text-gray-700 hover:text-amber-300 transition-colors font-medium">
                  <span>Shop</span>
                  <MdKeyboardArrowDown className="w-4 h-4"  /> 
                 
                </button>
                {/* قائمة Shop الفرعية */}
                <div className="absolute top-full left-0 mt-2 w-48 bg-white shadow-lg rounded-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50">
                  <div className="py-2">
                    {/* JETOUR مع قائمة فرعية */}
                    <div className="relative group/item">
                    <button className="flex items-center justify-between w-full px-4 py-2 text-gray-700 hover:bg-gray-100 hover:text-amber-300">
                        JETOUR
                        <MdKeyboardArrowLeft className="ml-2" />
                    </button>

                    {/* القائمة الفرعية الخاصة بـ JETOUR */}
                    <div className="absolute top-0 right-full mt-0 w-48 bg-white shadow-lg rounded-lg opacity-0 invisible group-hover/item:opacity-100 group-hover/item:visible transition-all duration-300 z-50">
                        <div className="py-2">
                        <Link href="/shop/JETOUR/T1" className="block px-4 py-2 text-gray-700 hover:bg-gray-100 hover:text-amber-300">
                            JETOUR T1
                        </Link>    
                        <Link href="/shop/JETOUR/T2" className="block px-4 py-2 text-gray-700 hover:bg-gray-100 hover:text-amber-300">
                            JETOUR T2
                        </Link>
                        <Link href="/shop/JETOUR/X70" className="block px-4 py-2 text-gray-700 hover:bg-gray-100 hover:text-amber-300">
                            JETOUR X70
                        </Link>
                        <Link href="/shop/JETOUR/X90" className="block px-4 py-2 text-gray-700 hover:bg-gray-100 hover:text-amber-300">
                            JETOUR X90
                        </Link>
                        <Link href="/shop/JETOUR/Daishing" className="block px-4 py-2 text-gray-700 hover:bg-gray-100 hover:text-amber-300">
                            JETOUR Dasihing
                        </Link>
                        <Link href="/shop/JETOUR/L6" className="block px-4 py-2 text-gray-700 hover:bg-gray-100 hover:text-amber-300">
                            JETOUR L6
                        </Link>
                        </div>
                    </div>
                    </div>

                    <Link href="/shop/MG" className="block px-4 py-2 text-gray-700 hover:bg-gray-100 hover:text-amber-300">
                      MG
                    </Link>
                    <Link href="/shop/HAVAL" className="block px-4 py-2 text-gray-700 hover:bg-gray-100 hover:text-amber-300">
                      HAVAL
                    </Link>
                    <Link href="/shop/TOYOTA" className="block px-4 py-2 text-gray-700 hover:bg-gray-100 hover:text-amber-300">
                      TOYOTA
                    </Link>
                    <Link href="/shop/SOUEAST09" className="block px-4 py-2 text-gray-700 hover:bg-gray-100 hover:text-amber-300">
                      SOUEAST 09
                    </Link>
                    <Link href="/shop/SOUEAST07" className="block px-4 py-2 text-gray-700 hover:bg-gray-100 hover:text-amber-300">
                       SOUEAST 07
                    </Link>
                    <Link href="/shop/SOUEAST06" className="block px-4 py-2 text-gray-700 hover:bg-gray-100 hover:text-amber-300">
                        SOUEAST 06
                    </Link>
                    <Link href="/shop/DodgRAM" className="block px-4 py-2 text-gray-700 hover:bg-gray-100 hover:text-amber-300">
                      Dodg RAM
                    </Link>
                    <Link href="/shop/FORD" className="block px-4 py-2 text-gray-700 hover:bg-gray-100 hover:text-amber-300">
                      FORD
                    </Link>
                    <Link href="/shop/GMC" className="block text-sm px-4 py-2 text-gray-700 hover:bg-gray-100 hover:text-amber-300">
                      GMC SEERA & SELVRADO
                    </Link>
                    <Link href="/shop/BYD" className="block px-4 py-2 text-gray-700 hover:bg-gray-100 hover:text-amber-300">
                      BYD
                    </Link>
                    <Link href="/shop/TANK" className="block px-4 py-2 text-gray-700 hover:bg-gray-100 hover:text-amber-300">
                      TANK 300
                    </Link>
                  </div>
                </div>
              </div>
            </div>

            {/* Select a category للشاشات الكبيرة */}
            <div className="flex items-center space-x-4 rtl:space-x-reverse">
              <span className="text-gray-600 font-medium">Select a category</span>
            </div>
          </div>

          {/* القائمة للشاشات الصغيرة */}
          {isMenuOpen && (
            <div className=" bg-white py-4 border-t border-gray-200 md:hidden">
              <div className="flex flex-col space-y-4">
                <Link 
                  href="/" 
                  className="text-gray-700 hover:text-amber-300 transition-colors font-medium py-2"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Home
                </Link>
                <Link 
                  href="/about" 
                  className="text-gray-700 hover:text-amber-300 transition-colors font-medium py-2"
                  onClick={() => setIsMenuOpen(false)}
                >
                  About Us
                </Link>
                <div>
                  <button className="flex items-center justify-between w-full text-gray-700 hover:text-amber-300 transition-colors font-medium py-2">
                    <span>Shop</span>
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                  {/* قائمة فرعية للجوال */}
                  <div className="pl-4 mt-2 space-y-2">
                     <Link href="/shop/JETOUR" className="block  text-gray-600 hover:text-amber-300">
                      JETOUR
                    </Link>
                    <Link href="/shop/TOYOTA" className="block text-gray-600 hover:text-amber-300">
                      TOYOTA
                    </Link>
                    <Link href="/shop/MG" className="block text-gray-600 hover:text-amber-300">
                      MG
                    </Link>
                    <Link href="/shop/HAVAL" className="block text-gray-600 hover:text-amber-300">
                      HAVAL
                    </Link>
                  </div>
                </div>
                
                {/* Select a category للجوال */}
                <div className="pt-4  bg-gray-200 py-10 px-4 ">
                  <span className="text-gray-600 font-medium">Select a category</span>
                   <button 
                        onClick={toggleMenu}
                        className=" text-gray-700 hover:text-amber-300 transition-colors md:hidden"
                        >
                        {isMenuOpen ? <FaTimes size={20} /> : <FaBars size={20} />}
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;