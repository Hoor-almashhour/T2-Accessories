'use client';
import Image from "next/image";
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { FaUser, FaBars, FaTimes, FaPhone } from 'react-icons/fa';
import { MdKeyboardArrowDown, MdKeyboardArrowLeft } from "react-icons/md";
import { motion } from 'framer-motion';
import { useSearch } from "@/app/context/SearchContext";

const Navbar: React.FC = () => {
  
  const { searchTerm, setSearchTerm, handleSearch } = useSearch();

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isShopOpen, setIsShopOpen] = useState(false);
  

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const toggleShop = () => setIsShopOpen(!isShopOpen);



  return (
    <nav className="bg-gray-200 shadow-lg relative">
      {/* الشريط العلوي */}
      <div className="bg-amber-300 text-white py-5 px-4 ">
        <div className="container mx-auto flex flex-col sm:flex-row justify-between items-center text-sm mt-5 text-center sm:text-left gap-2 ">
          <div>
            <motion.strong 
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="font-extrabold shadow-amber-50 text-black text-center text-2xl">  T2 كماليات <br/></motion.strong>
            <motion.p 
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="font-extrabold shadow-amber-50 text-black">لبيع قطع غيار واكسسوارات  جيتور وكافة أنواع السيارات 
            
          </motion.p>
          </div>
          
          <div className="flex items-center gap-4">
            <Link href="https://wa.me/96407754424278" className="flex items-center gap-2 underline font-bold text-black">
              <FaPhone className="text-black" />
               +964 07754424278
            </Link>
          </div>
        </div>
      </div>

      {/* الشريط الرئيسي */}
      <div className="container mx-auto max-w-7xl mt-[-10px]">
        <div className="md:flex md:items-center md:justify-between md:flex-row md:py-4 bg-white rounded-2xl md:h-[66px]
             h-[250px] mx-10 flex flex-col items-center py-3.5 relative">

          {/* الشعار */}
          <div className="flex items-center space-x-8 rtl:space-x-reverse">
            <Image src="/Logo/t2-logo.jpg" alt="logo" width={150} height={66}
              priority
              className="rounded-2xl" />
          </div>

          {/* شريط البحث - للشاشات المتوسطة والكبيرة */}
            <div className="w-full flex items-center flex-1 md:max-w-2xl ">
                <div className="flex w-full  bg-gray-100 rounded-lg overflow-hidden mx-3 ">
                    <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="Products Search..."
                    className=" flex-1  w-full px-2 py-2 bg-gray-100 border-gray-300 rounded-lg"
                    />
        
                </div>
                <div className="mx-3 ">
                    <button 
                      onClick={handleSearch}
                      className="w-32 cursor-pointer rounded-lg px-3 py-2 bg-black text-white text-sm hover:bg-gray-800 transition-colors ">
                      Search Now
                    </button>
                </div>
            </div>

          {/* الأيقونات */}
          <div className="flex items-center space-x-4 rtl:space-x-reverse mx-4">
            {/* أيقونة المستخدم */}
            <button className="flex items-center space-x-1 text-gray-700 hover:text-amber-300 transition-colors">
              <FaUser size={16} />
              <Link href="/MyAccountPage" className="sm:inline">Login</Link>
            </button>
          </div>
        </div>
      </div>
       {/* القائمة الرئيسية */}
      <div className=" bg-gray-200 py-5 px-4 ">
        <div className=" container md:px-10 mx-auto ">
           {/* زر الهمبرغر (للجوال فقط) */}
           <div className="flex justify-center md:hidden mt-2"> 
              <button
                onClick={toggleMenu}
                className=" text-gray-700  hover:text-amber-300 transition-colors md:hidden"
              >
                {isMenuOpen ? <FaTimes size={22} /> : <FaBars size={22} />}
              </button>
            </div> 
            {/* القائمة عند فتح الهمبرغر */}
            {isMenuOpen && (
              <div className="fixed inset-0 bg-white z-50 flex flex-col items-center justify-start pt-20 px-6 overflow-y-auto transition-all">
                <button
                  onClick={toggleMenu}
                  className="absolute top-5 right-5 text-gray-700 hover:text-blue-600"
                >
                  <FaTimes size={28} />
                </button>

                <nav className="flex flex-col items-center space-y-6 text-lg font-medium">
                  <Link href="/" onClick={toggleMenu} className="hover:text-blue-600">Home</Link>
                  <Link href="/about" onClick={toggleMenu} className="hover:text-blue-600">About Us</Link>

                  {/* قسم شوب */}
                  <div className="w-full text-center">
                    <button
                      onClick={toggleShop}
                      className="flex items-center justify-center w-full hover:text-blue-600"
                    >
                      <span>Shop</span>
                      <MdKeyboardArrowDown
                        className={`ml-1 transform transition-transform ${isShopOpen ? 'rotate-180' : ''}`}
                      />
                    </button>

                    {isShopOpen && (
                      <div className="mt-3 flex flex-col items-center space-y-2 text-gray-700 text-base">
                        {/* Jetour submenu */}
                        <details className="w-full">
                          <summary className="cursor-pointer hover:text-blue-600">JETOUR</summary>
                          <div className="flex flex-col space-y-1 mt-2">
                            <Link href="/shop/JETOUR/T1" onClick={toggleMenu}>JETOUR T1</Link>
                            <Link href="/shop/JETOUR/T2" onClick={toggleMenu}>JETOUR T2</Link>
                            <Link href="/shop/JETOUR/X70" onClick={toggleMenu}>JETOUR X70</Link>
                            <Link href="/shop/JETOUR/X90" onClick={toggleMenu}>JETOUR X90</Link>
                            <Link href="/shop/JETOUR/Daishing" onClick={toggleMenu}>JETOUR Dasihing</Link>
                            <Link href="/shop/JETOUR/L6" onClick={toggleMenu}>JETOUR L6</Link>
                          </div>
                        </details>

                        {/* باقي الشركات */}
                        <Link href="/shop/MG" onClick={toggleMenu}>MG</Link>
                        <Link href="/shop/HAVAL" onClick={toggleMenu}>HAVAL</Link>
                        <Link href="/shop/TOYOTA" onClick={toggleMenu}>TOYOTA</Link>
                        <Link href="/shop/SOUEAST09" onClick={toggleMenu}>SOUEAST 09</Link>
                        <Link href="/shop/SOUEAST07" onClick={toggleMenu}>SOUEAST 07</Link>
                        <Link href="/shop/SOUEAST06" onClick={toggleMenu}>SOUEAST 06</Link>
                        <Link href="/shop/DodgRAM" onClick={toggleMenu}>DODG RAM</Link>
                        <Link href="/shop/FORD" onClick={toggleMenu}>FORD</Link>
                        <Link href="/shop/GMC" onClick={toggleMenu}>GMC SEERA & SELVRADO</Link>
                        <Link href="/shop/BYD" onClick={toggleMenu}>BYD</Link>
                        <Link href="/shop/TANK" onClick={toggleMenu}>TANK 300</Link>
                      </div>
                    )}
                  </div>
                </nav>
              </div>
            )}
          {/* للشاشات الكبيرة */}
          <div className="hidden md:flex items-center justify-between  flex-row-reverse ">
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
        </div>
        </div>  
    </nav>
  );
};

export default Navbar;
