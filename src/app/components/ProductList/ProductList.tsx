// components/ProductList.jsx
'use client';

import Image from 'next/image';
import { useState, useEffect, useCallback, useMemo } from 'react';
import { motion } from 'framer-motion';
import { FiX } from 'react-icons/fi';
import { FaPlus } from 'react-icons/fa';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabaseClient';
import { listenToAuth } from '@/lib/auth';
import { useSearch } from '@/app/context/SearchContext';
import ProductCard from '@/app/components/ProductCard/ProductCard';
import type { User } from '@supabase/supabase-js';
import { Product } from '@/app/Types';




export default function ProductList({ category }: { category?: string }) {
  const [allProducts, setAllProducts] = useState<Product[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 6;
  const { searchResults, setSearchResults, setAllProducts: setSearchAllProducts } = useSearch();
  const router = useRouter();

  // ✅ متابعة المستخدم الحالي
  useEffect(() => {
    const unsubscribe = listenToAuth(setUser);
    return () => unsubscribe();
  }, []);

  // ✅ جلب جميع المنتجات
  const fetchProducts = useCallback(async () => {
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .order('created_at', { ascending: false });

    if (!error && data) {
      setAllProducts(data);
      setSearchResults(data);
      setSearchAllProducts(data);
    }
  }, [setSearchResults, setSearchAllProducts]);

  useEffect(() => {
    fetchProducts();

    // الاشتراك في التحديثات الفورية من Supabase
    const channel = supabase
      .channel('products-changes')
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'products' },
        () => {
          fetchProducts(); // تحديث تلقائي عند أي تعديل
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [fetchProducts]);

  // ✅ فلترة المنتجات حسب الفئة
  const filteredProducts = useMemo(() => {
    if (category) {
      return allProducts.filter(product => 
        product.category?.toLowerCase() === category.toLowerCase()
      );
    }
    return allProducts;
  }, [allProducts, category]);

  // ✅ المنتجات المعروضة (بحث + فلترة)
  const displayProducts = useMemo(() => {
    if (searchResults.length > 0) {
      // إذا كان هناك بحث، نطبق الفلترة على نتائج البحث
      if (category) {
        return searchResults.filter(product => 
          product.category?.toLowerCase() === category.toLowerCase()
        );
      }
      return searchResults;
    }
    // إذا لم يكن هناك بحث، نستخدم المنتجات المفلترة
    return filteredProducts;
  }, [searchResults, filteredProducts, category]);

  // ✅ حذف منتج (للأدمن فقط)
  const deleteProduct = useCallback(
    async (id?: number) => {
      if (!id) return alert('لم يتم تمرير رقم المنتج');
      if (user?.email !== 'admin@t2.com')
        return alert('🚫 ليس لديك صلاحية الحذف');
      if (!confirm('هل أنت متأكد من حذف هذا المنتج؟')) return;

      const { error } = await supabase.from('products').delete().eq('id', id);
      if (error) {
        console.error(error);
        alert('حدث خطأ أثناء الحذف');
      } else {
        alert('✅ تم حذف المنتج بنجاح');
        setIsModalOpen(false);
        setSelectedProduct(null);
        // لا حاجة لـ fetchProducts هنا لأن الـ subscription سيتولى التحديث
      }
    },
    [user]
  );

  const openModal = useCallback((product: Product) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  }, []);

  const closeModal = useCallback(() => {
    setSelectedProduct(null);
    setIsModalOpen(false);
  }, []);

  // ✅ التصفح بالصفحات
  const totalPages = Math.ceil(displayProducts.length / productsPerPage);
  const indexOfLast = currentPage * productsPerPage;
  const indexOfFirst = indexOfLast - productsPerPage;
  const currentProducts = displayProducts.slice(indexOfFirst, indexOfLast);

  // ✅ إعادة تعيين الصفحة عند تغيير الفئة أو نتائج البحث
  useEffect(() => {
    setCurrentPage(1);
  }, [category, searchResults]);

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
              {category ? category : "Shop"}
              
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
          {currentProducts.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">
                {category? category : 'Shop'}
              </p>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {currentProducts.map((product, index) => (
                  <div key={product.id || index} onClick={() => openModal(product)} className="cursor-pointer">
                    <ProductCard {...product} />
                  </div>
                ))}
              </div>

              {/* أزرار التصفح */}
              {totalPages > 1 && (
                <div className="flex justify-center mt-8 gap-2">
                  {Array.from({ length: totalPages }, (_, i) => (
                    <button
                      key={i}
                      onClick={() => setCurrentPage(i + 1)}
                      className={`px-4 py-2 rounded-full border ${
                        currentPage === i + 1
                          ? 'bg-amber-300 text-white border-amber-300'
                          : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-100'
                      }`}
                    >
                      {i + 1}
                    </button>
                  ))}
                </div>
              )}
            </>
          )}
        </div>
      </section>

      {/* نافذة التفاصيل */}
      {isModalOpen && selectedProduct && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="relative">
              <button
                onClick={closeModal}
                className="absolute top-4 right-4 text-gray-600 hover:text-gray-900 bg-white/80 hover:bg-white p-2 rounded-full z-50 transition"
              >
                <FiX className="text-2xl" />
              </button>

              <div className="p-6">
                <div className="flex justify-center items-center mb-4">
                  <Image
                    src={selectedProduct.image}
                    alt={selectedProduct.title}
                    width={600}
                    height={400}
                    className="object-contain max-h-[60vh] w-auto rounded-lg"
                    priority
                  />
                </div>

                <h3 className="text-xl font-semibold mb-4 text-gray-800 text-center">
                  {selectedProduct.title}
                </h3>

                {selectedProduct.category && (
                  <p className="text-gray-600 mb-2 text-center">
                     category : {selectedProduct.category}
                  </p>
                )}

                {user?.email === 'admin@t2.com' && (
                  <div className="flex justify-center gap-3 mt-6">
                    <button
                      onClick={() => deleteProduct(selectedProduct.id)}
                      className="bg-red-500 text-white px-6 py-2 rounded-lg cursor-pointer hover:bg-red-600 transition"
                    >
                      حذف المنتج
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}