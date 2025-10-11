"use client";
import Footer from "./components/Footer/Footer";
import Navbar from "./components/Navbar/Navbar";
import { SearchProvider } from "./context/SearchContext";

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  return (
    <SearchProvider>
      <Navbar />
      <main>{children}</main>
      <Footer />
    </SearchProvider>
  );
}
