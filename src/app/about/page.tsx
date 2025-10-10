'use client';

import { motion } from 'framer-motion';
import { FaWhatsapp, FaCarSide, FaHandshake, FaGem } from 'react-icons/fa';
import Link from 'next/link';

export default function AboutPage() {
  return (
    <section className="bg-gray-100 py-16 px-6 md:px-20">
      <div className="max-w-4xl mx-auto text-center">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-3xl md:text-4xl font-bold text-gray-800 mb-6"
        >
          من نحن
        </motion.h1>

         <p className="text-gray-600 text-lg leading-relaxed mb-8">
          أهلاً وسهلاً بكم في <strong className='text-amber-300'>متجرنا الإلكتروني</strong> المتخصص في بيع
          <strong> إكسسوارات وملحقات  كافة أنواع السيارات</strong> نحن نسعى لتوفير أفضل
          المنتجات الأصلية والمضمونة لعملائنا في جميع أنحاء الوطن العربي، مع التركيز
          على الجودة العالية والتصميم العملي
        </p>

        <div className="grid md:grid-cols-3 gap-8 text-gray-700 mt-10">
          <div className="bg-white rounded-2xl shadow p-6">
            <FaCarSide className="text-amber-400 text-4xl mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">رسالتنا</h3>
            <p>تقديم تجربة تسوق مريحة وسريعة مع منتجات موثوقة وعالية الجودة</p>
          </div>

          <div className="bg-white rounded-2xl shadow p-6">
            <FaGem className="text-amber-400 text-4xl mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">رؤيتنا</h3>
            <p>أن نكون الوجهة الأولى لعشاق السيارات ومحبي التميز</p>
          </div>

          <div className="bg-white rounded-2xl shadow p-6">
            <FaHandshake className="text-amber-400 text-4xl mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">لماذا نحن؟</h3>
            <ul dir="rtl"  className="list-disc list-inside text-start text-gray-600">
              <li>منتجات مختارة بعناية</li>
              <li>أسعار تنافسية</li>
              <li>دعم فني وخدمة عملاء</li>
              <li>شحن سريع وآمن</li>
            </ul>
          </div>
        </div>

        <div className="mt-12">
          <Link
            href="https://wa.me/96407754424278"
            target="_blank"
            className="inline-flex items-center gap-2 bg-green-500 text-white px-6 py-3 rounded-lg hover:bg-green-600 transition"
          >
            <FaWhatsapp className="text-xl" />
            تواصل معنا عبر واتساب
          </Link>
        </div>
      </div>
    </section>
  );
}
