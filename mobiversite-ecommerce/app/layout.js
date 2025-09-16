import "./globals.css";
import { AuthProvider } from "@/context/AuthContext";
import { CardProvider } from "@/context/CardContext";
import { WishlistProvider } from "@/context/WishlistContext";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import "./assets/custom.scss";
import { Toaster } from "react-hot-toast";

export const metadata = {
  title: "Mobiversite - E-Commerce Store",
  description: "Shop the latest products at Mobiversite.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col bg-gray-50 text-gray-900">
        <AuthProvider>
          <CardProvider>
            <WishlistProvider>
              <Navbar />
              <main className="flex-1 container mx-auto all-container">
                {children}
              </main>
              <Footer />
              <Toaster position="top-center" />
            </WishlistProvider>
          </CardProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
