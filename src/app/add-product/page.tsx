'use client';
import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabaseClient";
import { useRouter } from "next/navigation";
import { listenToAuth } from "@/lib/auth";
import type { User } from "@supabase/supabase-js";
import { FaPlus } from "react-icons/fa";
import Image from "next/image";

const CATEGORIES = [
  "JETOUR T1",
  "JETOUR T2", 
  "JETOUR DASHING",
  "JETOUR X70",
  "JETOUR X90",
  "JETOUR L6",
  "BYD",
  "Dodge Ram",
  "FORD",
  "GMC ",
  "HAVAL",
  "MG",
  "SOUEAST06",
  "SOUEAST07",
  "SOUEAST09",
  "TANK 300" ,
  "TOYOTA"
];


export default function AddProduct() {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [category, setCategory] = useState("");
  const [preview, setPreview] = useState<string | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const unsubscribe = listenToAuth(setUser);
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (!file) return setPreview(null);
    const objectUrl = URL.createObjectURL(file);
    setPreview(objectUrl);
    return () => URL.revokeObjectURL(objectUrl);
  }, [file]);

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user || user.email !== "admin@t2.com") {
      alert("❌ فقط الأدمن يمكنه الإضافة!");
      return;
    }
    if (!title || !file || !category ) {
      alert("⚠️ تأكد من إدخال اسم المنتج واختيار صورة");
      return;
    }

    setIsSubmitting(true);
    try {
      const fileName = `${Date.now()}_${file.name}`;
      const { error: uploadError } = await supabase.storage
        .from("products")
        .upload(fileName, file);

      if (uploadError) throw uploadError;

      const { data: publicUrlData } = supabase.storage
        .from("products")
        .getPublicUrl(fileName);

      const imageUrl = publicUrlData.publicUrl;

      const { error } = await supabase
        .from("products")
        .insert([{ title, image: imageUrl,category , created_at: new Date() }]);

      if (error) throw error;

      alert("✅ تم إضافة المنتج بنجاح!");
      setTitle("");
      setCategory("");
      setFile(null);
      setPreview(null);
        if (category === "JETOUR T1") {
        router.push("/JETOUR/T1");
      } else {
        router.push("/");
      }
    } catch (err) {
      console.error(err);
      alert("حدث خطأ أثناء إضافة المنتج");
    } finally {
      setIsSubmitting(false);
    }

  };

  return (
    <section className="px-4 sm:px-6 lg:px-20 py-10 bg-gray-100 min-h-screen">
      <div className="max-w-lg mx-auto">
        <h1 className="text-3xl font-bold flex items-center justify-center gap-3 mb-8 text-gray-800 text-center">
          <FaPlus /> إضافة منتج جديد
        </h1>
        <form onSubmit={handleAdd} className="bg-white shadow-lg rounded-2xl p-6 space-y-6">
          <input
            type="text"
            placeholder="اسم المنتج"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full border px-3 py-2 rounded-lg"
            disabled={isSubmitting}
          />
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setFile(e.target.files?.[0] || null)}
            className="w-full border px-3 py-2 rounded-lg"
            disabled={isSubmitting}
          />
          {preview && (
             <Image
                  src={preview}
                  alt="Preview"
                  width={400}
                  height={300}
                  className="rounded-xl shadow-md w-full h-48 sm:h-64 object-cover"
                />
          )}

          {/* ✅ حقل الفئة */}
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full border px-3 py-2 rounded-lg"
            disabled={isSubmitting}
          >
            <option value="">اختر الفئة</option>
            {CATEGORIES.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-amber-400 py-3 rounded-lg text-white font-semibold hover:bg-amber-500 transition"
          >
            {isSubmitting ? "⏳ جاري الحفظ..." : "💾 حفظ المنتج"}
          </button>
        </form>
      </div>
    </section>
  );
}
