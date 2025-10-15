'use client';

import Image from 'next/image';
import { useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { FiX } from 'react-icons/fi';
import { FaPlus } from 'react-icons/fa';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabaseClient';
import { listenToAuth } from '@/lib/auth';
import { useSearch } from './context/SearchContext';
import ProductCard from './components/ProductCard/ProductCard';
import type { User } from '@supabase/supabase-js';

interface Product {
  id?: number;
  title: string;
  image: string;
  whatsappNumber?: string;
  created_at?: string;
}

export default function Home() {
  const [products, setProducts] = useState<Product[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 6;
  const { searchResults, setSearchResults, allProducts, setAllProducts, searchTerm, setSearchTerm } = useSearch();
  const router = useRouter();
  

  // ✅ متابعة المستخدم الحالي
  useEffect(() => {
    const unsubscribe = listenToAuth(setUser);
    return () => unsubscribe();
  }, []);

  // ✅ جلب المنتجات (باستخدام useCallback لتثبيت الدالة)
  const fetchProducts = useCallback(async () => {
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .order('created_at', { ascending: false });

      if (!error && data) {
      setSearchResults(data);
      setAllProducts(data); // ✅ مزامنة مع الـ Context لجميع المكونات
    }
  }, [setSearchResults, setAllProducts]);
  
  useEffect(() => {
    fetchProducts();

    // الاشتراك في التحديثات الفورية من Supabase
    const channel = supabase
      .channel('products-changes')
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'products' },
        () => {
          fetchProducts(); // تحديث القائمة تلقائيًا
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [fetchProducts]); // ✅ الثابتة باستخدام useCallback

  // حذف المنتج (للأدمن فقط)
  const deleteProduct = useCallback(
    async (id?: number) => {
      try {
        if (!id) return console.warn('❗ لم يتم تمرير رقم المنتج');
        if (user?.email !== 'admin@t2.com')
          return console.warn('🚫 ليس لديك صلاحية الحذف');
        if (!confirm('هل أنت متأكد أنك تريد حذف هذا المنتج؟')) return;

        const { error } = await supabase.from('products').delete().eq('id', id);

        if (error) {
          console.error('حدث خطأ أثناء الحذف:', error.message);
          alert('❌ فشل في حذف المنتج');
          return;
        }

        alert('✅ تم حذف المنتج بنجاح');
        setIsModalOpen(false);
        setSelectedProduct(null);
      } catch (err) {
        console.error('Unexpected error:', err);
      }
    },
    [user]
  );

  // فتح/إغلاق التفاصيل
  const openModal = useCallback((product: Product) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  }, []);

  const closeModal = useCallback(() => {
    setSelectedProduct(null);
    setIsModalOpen(false);
  }, []);

  // التصفح بالصفحات
  const displayProducts = searchResults.length > 0 ? searchResults : products;
  const totalPages = Math.ceil(displayProducts.length / productsPerPage);
  const indexOfLast = currentPage * productsPerPage;
  const indexOfFirst = indexOfLast - productsPerPage;
  const currentProducts = displayProducts.slice(indexOfFirst, indexOfLast);

  return (
    <>
      <section className="py-12 bg-gray-100 min-h-screen">
        <div className="container mx-auto px-4">
          {/* العنوان وأزرار الأدمن */}
          <div className="flex justify-between items-center mb-8 px-4">
            <motion.h2
              className="text-2xl md:text-3xl font-bold text-gray-800"
              initial={{ opacity: 0, y: -20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              Shop
            </motion.h2>

            {user?.email === 'admin@t2.com' && (
              <button
                onClick={() => router.push('/add-product')}
                className="text-white bg-amber-300 px-4 py-2 rounded-lg hover:bg-amber-400 transition text-sm font-medium flex items-center gap-1"
              >
                <FaPlus /> إضافة منتج
              </button>
            )}
          </div>

          {/* عرض المنتجات */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {currentProducts.map((product, index) => (
              <div
                key={index}
                onClick={() => openModal(product as Product)}
                className="cursor-pointer"
              >
                <ProductCard {...product} />
              </div>
            ))}
          </div>

          {/* أزرار التصفح */}
          <div className="flex justify-center mt-8 gap-2">
            {Array.from({ length: totalPages }, (_, i) => (
              <button
                key={i}
                onClick={() => setCurrentPage(i + 1)}
                className={`px-4 py-2 rounded-full border ${
                  currentPage === i + 1
                    ? 'bg-amber-300 text-white'
                    : 'bg-white text-gray-700 hover:bg-gray-100'
                }`}
              >
                {i + 1}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* نافذة التفاصيل */}
      {isModalOpen && selectedProduct && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
          <div className="shadow-lg p-6 text-center relative">
            <button
              onClick={closeModal}
              className="absolute top-7 right-7 text-white bg-black/60 hover:bg-black/80 p-2 rounded-full z-50"
            >
              <FiX className="text-3xl cursor-pointer " />
            </button>

            <div className="flex justify-center items-center w-full ">
              <Image
                src={selectedProduct.image}
                alt={selectedProduct.title}
                width={800}
                height={600}
                className="object-contain max-h-[80vh] w-auto rounded-xl"
                priority
              />
           </div>
            <h3 className="text-lg font-semibold mb-2 text-black">
              {selectedProduct.title}
            </h3>

            {user?.email === 'admin@t2.com' && (
              <div className="flex justify-center gap-3 mt-4">
                <button
                  onClick={() => deleteProduct(selectedProduct.id)}
                  className="bg-red-500 text-white px-6 py-2 rounded-lg cursor-pointer hover:bg-red-600 transition"
                >
                  حذف
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}
