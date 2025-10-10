"use client";
import { createContext, useContext, useState, ReactNode } from "react";

type Product = {
  title: string;
  image: string;
  whatsappNumber: string;
};

type SearchContextType = {
  searchTerm: string;
  setSearchTerm: (value: string) => void;
  searchResults: Product[];
  setSearchResults: (products: Product[]) => void;
  handleSearch: (allProducts: Product[]) => void;
};

const SearchContext = createContext<SearchContextType | undefined>(undefined);

export const SearchProvider = ({ children }: { children: ReactNode }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState<Product[]>([]);

  const handleSearch = (allProducts: Product[]) => {
    if (!searchTerm.trim()) {
      setSearchResults(allProducts);
      return;
    }

    const results = allProducts.filter((p) =>
      p.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setSearchResults(results);
  };

  return (
    <SearchContext.Provider
      value={{ searchTerm, setSearchTerm, searchResults, setSearchResults, handleSearch }}
    >
      {children}
    </SearchContext.Provider>
  );
};

// ✅ Hook جاهز للاستخدام في أي كومبوننت
export const useSearch = () => {
  const context = useContext(SearchContext);
  if (!context) throw new Error("useSearch must be used within a SearchProvider");
  return context;
};
