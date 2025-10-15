'use client';
import Image from "next/image";
import { motion } from "framer-motion";
import { FaWhatsapp } from "react-icons/fa";
import Link from "next/link";

type ProductCardProps = {
  id?: number;
  title: string;
  image: string;
  whatsappNumber?: string;
  created_at?: string;
};

const ProductCard: React.FC<ProductCardProps> = ({ title, image, whatsappNumber }) => {
  const whatsappLink = `https://wa.me/96407754424278?text=مرحباً، أريد الاستفسار عن المنتج: ${encodeURIComponent(title)}`;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      viewport={{ once: true }}
      className="flex flex-col items-center text-center"
    >
      {/* الصورة */}
      <div className="relative w-full h-72 sm:h-80 md:h-96 overflow-hidden rounded-2xl">
        <Image
          src={image}
          alt={title}
          fill
           priority
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover hover:scale-105 transition-transform duration-500"
        />
      </div>

      {/* النص و الأزرار */}
      <h3 className="text-lg font-semibold mt-4 text-gray-800 text-center">{title}</h3>
     

      <div className="flex gap-3 mt-4">
        <Link
          href={whatsappLink}
          target="_blank"
          rel="noopener noreferrer"
          className="bg-green-500 flex items-center text-white px-4 py-2 rounded-lg hover:bg-green-600 transition"
        >
            < FaWhatsapp size={18} className="mr-2" />
           whatsapp
        </Link>
      </div>
    </motion.div>
  );
}

export default ProductCard;
