"use client";

import { useState } from "react";
import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";

type Product = {
  title: string;
  image: string;
  whatsappNumber: string;
};

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState<Product[]>([]);

  const handleSearch = () => {
    const storedProducts = JSON.parse(localStorage.getItem("products") || "[]");
    const results = storedProducts.filter((product: Product) =>
      product.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setSearchResults(results);
    localStorage.setItem("searchResults", JSON.stringify(results));
  };

  return (
    <>
      <Navbar
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        handleSearch={handleSearch}
      />
      <main>{children}</main>
      <Footer />
    </>
  );
}
