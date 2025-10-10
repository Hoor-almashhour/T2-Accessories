'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { FaPlus } from 'react-icons/fa';

export default function AddProductPage() {
  const router = useRouter();

  const [title, setTitle] = useState('');
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64 = reader.result as string;
        setImageFile(file);
        setImagePreview(base64);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!title || !imageFile) {
      alert('⚠ يرجى تعبئة جميع الحقول قبل الحفظ');
      return;
    }

    setIsSubmitting(true);

    try {
      // جلب المنتجات الحالية من localStorage
      const existing = JSON.parse(localStorage.getItem('products') || '[]');

      const newProduct = {
        title,
        image: imagePreview,
        whatsappNumber: "9647754424278" // ⚠ أضف هذا الحقل المطلوب
      };

      // حفظ المنتج الجديد
      const updatedProducts = [...existing, newProduct];
      localStorage.setItem('products', JSON.stringify(updatedProducts));

      // ⚠ الانتظار قليلاً للتأكد من حفظ البيانات
      await new Promise(resolve => setTimeout(resolve, 500));
      
      alert('✅ تم إضافة المنتج بنجاح');
      
      // ⚠ استخدام replace بدلاً من push للتأكد من تحديث الصفحة
      router.replace('/');
      router.refresh(); // ⚡ إضافة هذا السطر لتحديث الصفحة
      
    } catch (error) {
      console.error('Error saving product:', error);
      alert('❌ حدث خطأ أثناء حفظ المنتج');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="px-4 sm:px-6 lg:px-20 bg-gray-100 py-10 sm:py-20">
      <div className="mx-auto max-w-lg">
        <h1 className="text-xl flex items-center justify-center gap-3 md:text-3xl font-bold text-gray-800 mb-8">
          <FaPlus className='text-2xl text-gray-800 font-bold' /> 
          إضافة منتج جديد
        </h1>

        <form
          onSubmit={handleSubmit}
          className="bg-white shadow-lg rounded-2xl p-6 sm:p-11 space-y-6"
        >
          {/* إدخال العنوان الرئيسي */}
          <div>
            <label className="block text-gray-700 font-medium mb-2">
              Title
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Product Title"
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-amber-400"
              disabled={isSubmitting}
            />
          </div>

          {/* رفع الصورة */}
          <div>
            <label className="block text-gray-700 font-medium mb-2">
              Image
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="w-full text-gray-700"
              disabled={isSubmitting}
            />
            {imagePreview && (
              <div className="mt-4">
                <Image
                  src={imagePreview}
                  alt="Preview"
                  width={400}
                  height={300}
                  className="rounded-xl shadow-md w-full h-48 sm:h-64 object-cover"
                />
              </div>
            )}
          </div>

          {/* زر الإرسال */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full cursor-pointer text-sm bg-amber-400 hover:bg-amber-500 text-white font-semibold py-3 rounded-lg transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? '⏳ جاري الحفظ...' : '💾 Save Product'}
          </button>
        </form>
      </div>
    </section>
  );
}