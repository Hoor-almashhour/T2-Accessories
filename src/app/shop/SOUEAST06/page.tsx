'use client';
import React from 'react'
import Image from "next/image";
import { motion } from 'framer-motion';
const page = () => {
  return (
    <div className='w-full text-center flex flex-col items-center p-5'>
        <div className=""> <Image src="/shop/logo6.png" alt="logo" width={400} height={400} className="h-auto w-auto " /></div>
        <motion.p 
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="font-extrabold shadow-amber-500 shadow-xl text-black text-4xl text-center">
            coming Soon...
        </motion.p>
    </div>
  )
}

export default page