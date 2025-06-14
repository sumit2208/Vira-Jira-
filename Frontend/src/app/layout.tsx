import type { Metadata } from "next";
import {
  ClerkProvider,
  SignedIn,
  SignedOut,
  SignIn,
} from "@clerk/nextjs";
import { Inter } from "next/font/google";
import "./globals.css"; 
import Sidebar from "@/components/Sidebar";
import Providers from "@/components/Providers";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata: Metadata = {
  title: "Vira | Management",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <html lang="en" className={inter.variable}>
        <body className="font-sans antialiased"> 
          <SignedOut>
            <div className="flex justify-center items-center h-screen">
              <SignIn routing="hash" />
            </div>
          </SignedOut> 
          <SignedIn>
            <Providers>
            <div className="flex gap-2"> 
              <div className="w-64"> 
                 <Sidebar/>
              </div> 
              <main className="flex-1 max-h-max px-8">{children}</main>
            </div>
            </Providers>
          </SignedIn>
        </body>
      </html>
    </ClerkProvider>
  );
}
