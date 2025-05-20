import { Inter } from "next/font/google";
import "./globals.css";

import { ClerkProvider } from "@clerk/nextjs";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const inter = Inter({subsets: ["latin"]});

export const metadata={
  title:"Welth",
  description:"One Stop Finance Platform"
}

export default function RootLayout({ children }) {
  return (
    <ClerkProvider>
       <html lang="en">
        <body className={`${inter.className}`}>
          {/*-----Header------ */}
          <Header/>

          <main className="min-h-screen">{children}</main>
       
          {/*----Footer---- */}
          <Footer />
        </body>
      </html>

    </ClerkProvider>
    
  );
}
