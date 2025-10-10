// components/Footer.tsx
import { FaInstagram, FaTiktok, FaFacebookF, FaPhone } from 'react-icons/fa';
import Image from "next/image";
import Link from 'next/link';
import { FaLocationDot } from 'react-icons/fa6';
const Footer = () => {
  return (
    <footer className="text-black bg-amber-300 py-8 px-4">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row md:justify-between items-center ">
        {/* Logo */}
        <div className="mb-6 md:mb-0">
        <Image src="/Logo/t2-logo.jpg" alt="logo" width={150} height={66} 
        
        className="h-auto rounded-2xl " />
        </div>

        {/* Location */}
        <div className="mb-6 md:mb-5 md:text-left">
         
          <Link 
            href="https://maps.google.com/?q=35.431221,44.336586"
           className="font-bold text-lg text-center flex items-center gap-2">كركوك - شارع المطار نهاية جسر المعارض 
            <FaLocationDot />
          </Link>
        </div>

        {/* Social Media */}
        <div className=' flex flex-col items-center justify-center'>
          <div className="flex space-x-4 items-center">
          <Link
            href="https://www.instagram.com/kmalyat_t2?igsh=dzR3bmljaTVnb3o0&utm_source=qr"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-white transition"
          >
            <FaInstagram size={24} />
          </Link>
          <Link
            href="https://www.tiktok.com/@.t22068?_t=ZS-90GoM4u2HUQ&_r=1"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-white transition"
          >
            <FaTiktok size={24} />
          </Link>
          <Link
            href="https://www.facebook.com/share/1BWTSax4xn/?mibextid=wwXIfr"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-white transition"
          >
            <FaFacebookF size={24} />
          </Link>
         

        </div>
        <div className='mt-6'>
           <Link href="https://wa.me/9647734000428" className="flex items-center justify-center flex-row gap-2 font-extrabold">

              <FaPhone className="text-black" />
               009647734000428
            </Link>
         </div>
         <div className='mt-6'>
           <Link href="https://wa.me/96407754424278" className="flex items-center justify-center flex-row gap-2 font-extrabold">

              <FaPhone className="text-black" />
               0096407754424278
            </Link>
         </div>
        </div>
        
      </div>

      {/* Footer Bottom */}
      <div className="mt-13 text-center text-sm text-black font-extrabold ">
       All rights reserved to T2 Accessories  © {new Date().getFullYear()} 
      </div>
    </footer>
  );
};

export default Footer;
