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
    localStorage.setItem("products", JSON.stringify(updated));
    closeModal();
  };

  const editProduct = (title: string) => {
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

            <Link
              href="/add-product"
              className="text-white bg-amber-300 px-4 py-2 rounded-lg hover:bg-amber-400 transition text-sm font-medium"
            >
              + Add Product
            </Link>
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
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl shadow-lg p-6 w-80 text-center relative">
            <button
              onClick={closeModal}
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-800"
            >
              <FiX className=" ext-gray-500 text-lg cursor-pointer" />
            </button>

            <Image
              src={selectedProduct.image}
              alt={selectedProduct.title}
              width={250}
              height={250}
              className="rounded-lg w-full h-48 object-cover mb-4"
            />
            <h3 className="text-lg font-semibold mb-2">
              {selectedProduct.title}
            </h3>

            <div className="flex justify-center gap-3 mt-4">
              <button
                onClick={() => editProduct(selectedProduct.title)}
                className="bg-amber-300 text-white px-7 py-2 rounded-lg hover:bg-amber-500 transition"
              >
                Edit
              </button>
              <button
                onClick={() => deleteProduct(selectedProduct.title)}
                className="bg-black text-white px-5 py-2 rounded-lg hover:bg-gray-700 transition"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
