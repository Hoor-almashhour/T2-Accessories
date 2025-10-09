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

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!title || !imageFile) {
      alert('⚠️ يرجى تعبئة جميع الحقول قبل الحفظ');
      return;
    }

    // جلب المنتجات الحالية من localStorage
    const existing = JSON.parse(localStorage.getItem('products') || '[]');

    const newProduct = {
      title,
      image: imagePreview,
    };

    // حفظ المنتج الجديد
    localStorage.setItem('products', JSON.stringify([...existing, newProduct]));

    alert('✅ تم إضافة المنتج بنجاح');
    router.push('/');
  };

  return (
    <section className="px-20 bg-gray-100 py-25 ">
      <div className="container mx-auto px-4 max-w-lg ">
        <h1 className="text-2xl flex items-center  justify-center gap-3 md:text-3xl  font-bold  text-gray-800 mb-8">
          <FaPlus className='text-2xl text-gray-800 font-bold' /> 
          إضافة منتج جديد
        </h1>

        <form
          onSubmit={handleSubmit}
          className="bg-white shadow-lg rounded-2xl p-11 space-y-6"
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
              placeholder="مثال: أرضية كاملة لسيارات جيتور"
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-amber-400"
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
            />
            {imagePreview && (
              <div className="mt-4">
                <Image
                  src={imagePreview}
                  alt="Preview"
                  width={400}
                  height={300}
                  className="rounded-xl shadow-md w-full h-64 object-cover"
                />
              </div>
            )}
          </div>

          {/* زر الإرسال */}
          <button
            type="submit"
            className="w-full bg-amber-400 hover:bg-amber-500 text-white font-semibold py-2 rounded-lg transition"
          >
            💾 Save Product
          </button>
        </form>
      </div>
    </section>
  );
}
