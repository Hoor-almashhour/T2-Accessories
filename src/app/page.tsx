'use client';

import Image from "next/image";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";

import Link from "next/link";
import ProductCard from "./components/ProductCard/ProductCard";
import { FiX } from "react-icons/fi";
import { useSearch } from "./context/SearchContext";

type Product = {
  title: string;
  image: string;
  whatsappNumber: string;
};

export default function Home() {
  const [role, setRole] = useState<string | null>(null);
  const [products, setProducts] = useState<Product[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);


  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 6; 

  const { searchResults, setSearchResults } = useSearch();

  


  // ✅ قراءة المنتجات من localStorage عند تحميل الصفحة
   useEffect(() => {
    const storedProducts = JSON.parse(localStorage.getItem("products") || "[]");

    const defaultProducts: Product[] = [
      {
        title: "T2 أرضية أحادية طبقة كاملة لسيارات جيتور",
        image: "/product/photo1.jpg",
        whatsappNumber: "9647754424278",
      },
      {
        title: "T2 أرضية أحادية طبقة كاملة لسيارات جيتور",
        image: "/product/photo4.jpg",
        whatsappNumber: "9647754424278",
      },
      {
        title: "T2 حقيبة جانبية لجيتور",
        image: "/product/photo3.jpg",
        whatsappNumber: "9647754424278",
      },
      {
        title: "T2 حقيبة جانبية لجيتور",
        image: "/product/photo2.jpg",
        whatsappNumber: "9647754424278",
      },
      {
        title: "T2 درج جانبي طويل وثقيل لجيتور",
        image: "/product/photo5.jpg",
        whatsappNumber: "9647754424278",
      },
      {
        title: "T2 درج جانبي طويل وثقيل لجيتور",
        image: "/product/photo6.jpg",
        whatsappNumber: "9647754424278",
      },
    ];
      

    const data = storedProducts.length ? storedProducts : defaultProducts;
    setProducts(data);
    setSearchResults(data); // أول مرة نملأ البحث بالكل
  }, [setSearchResults]);


    useEffect(() => {
    if (typeof window !== "undefined") {
      const storedRole = localStorage.getItem("role");
      setRole(storedRole);
    }
  }, []);

  const displayProducts = searchResults.length > 0 ? searchResults : products;


  // ✅ الاستماع لتغييرات localStorage من التبويبات الأخرى
    useEffect(() => {
      const handleStorageChange = () => {
        const storedProducts = JSON.parse(localStorage.getItem("products") || "[]");
        setProducts(storedProducts);
        setCurrentPage(1); // العودة للصفحة الأولى عند إضافة منتج جديد
      };

      window.addEventListener('storage', handleStorageChange);
    
      return () => {
        window.removeEventListener('storage', handleStorageChange);
      };
   }, []);
    



  const totalPages = Math.ceil(products.length / productsPerPage);

  const openModal = (product: Product) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedProduct(null);
  };

    const deleteProduct = (title: string) => {
      const updated = products.filter((p) => p.title !== title);
      setProducts(updated);
      setSearchResults(updated);
      localStorage.setItem("products", JSON.stringify(updated));
      closeModal();
   };
  const editProduct = (title: string) => {
    if (role !== 'admin') return;
    alert(`فتح صفحة تعديل المنتج: ${title}`);
    closeModal();
  };

    const indexOfLast = currentPage * productsPerPage;
    const indexOfFirst = indexOfLast - productsPerPage;
    const currentProducts = products.slice(indexOfFirst, indexOfLast);
  return (
    <>
      <section className="py-12 bg-gray-100">
        <div className="container mx-auto px-4">
          {/* العنوان + زر الإضافة */}
          <div className="flex justify-between items-center mb-8 text-center px-4">
            <motion.h2
              className="text-2xl md:text-3xl font-bold text-gray-800"
              initial={{ opacity: 0, y: -20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              Shop
            </motion.h2>
            {role === "admin" && (
              <Link
                href="/add-product"
                className="text-white bg-amber-300 px-4 py-2 rounded-lg hover:bg-amber-400 transition text-sm font-medium"
              >
                + Add Product
              </Link>
            )}
          </div>

          {/* شبكة المنتجات */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
           {displayProducts.map((product, index) => (
              <div
                key={index}
                onClick={() => openModal(product)}
                className="cursor-pointer"
              >
                <ProductCard {...product} />
              </div>
            ))}
          </div>

          {/* ✅ أزرار التنقل بين الصفحات */}
          <div className="flex justify-center mt-8 gap-2">
            {Array.from({ length: totalPages }, (_, i) => (
              <button
                key={i}
                onClick={() => setCurrentPage(i + 1)}
                className={`px-4 py-2 rounded-full border cursor-pointer ${
                  currentPage === i + 1
                    ? "bg-amber-300 text-white"
                    : "bg-white text-gray-700 hover:bg-gray-100"
                } transition`}
              >
                {i + 1}
              </button>
            ))}
          </div>
        </div>
      </section>
         {/* نافذة التعديل / الحذف */}
          {isModalOpen && selectedProduct && (
              <div
                className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 cursor-zoom-out"
                onClick={closeModal}
              >
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3 }}
                  className="relative"
                  onClick={e => e.stopPropagation()} 
                >
              
                <Image
                  src={selectedProduct.image}
                  alt={selectedProduct.title}
                  width={400}
                  height={600}
                  className="object-contain max-h-[80vh] w-auto rounded-xl"
                  priority
                />
                   
                {/* زر الإغلاق في الزاوية */}
                <button
                  onClick={closeModal}
                  className="absolute top-3 cursor-pointer right-3 text-white bg-black/50 hover:bg-black/70 p-2 rounded-full"
                >
                  <FiX className="text-2xl" />
                </button>

                {/* اسم المنتج يظهر في الأسفل */}
                <div className="mt-4 px-3 w-full flex justify-center">
                  <p className="text-white text-center text-sm sm:text-base md:text-lg font-semibold leading-relaxed break-words max-w-[90%] bg-black/50 px-3 py-2 rounded-lg">
                    {selectedProduct.title}
                  </p>
                </div>
              </motion.div>
           
              {role === "admin" && (
                <div className="flex justify-center gap-3 mt-4 flex-wrap px-3">
                  <button
                    onClick={() => editProduct(selectedProduct.title)}
                    className="bg-amber-300 text-white px-6 py-2 rounded-lg hover:bg-amber-500 transition text-sm sm:text-base"
                  >
                     Edit
                  </button>
                  <button
                    onClick={() => deleteProduct(selectedProduct.title)}
                    className="bg-white text-black px-4 py-2 rounded-lg hover:bg-gray-700 transition text-sm sm:text-base"
                  >
                     Delete
                  </button>
               </div>
              )}
          </div>
        )}
    </>
  );
}
