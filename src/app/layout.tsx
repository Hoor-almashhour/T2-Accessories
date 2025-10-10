import "./globals.css";
import { Inter } from "next/font/google";
import ClientLayout from "./ClientLayout";
import { SearchProvider } from "./context/SearchContext";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "T2 Accessories",
  description: "Car accessories shop for Jetour and other cars",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ar">
      <body className={inter.className}>
       <SearchProvider>
          <ClientLayout>
            {children}
          </ClientLayout>
        </SearchProvider>
      </body>
    </html>
  );
}
