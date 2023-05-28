import * as React from 'react';
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

interface LayoutProps {
  children: React.ReactNode;
  navbar?: boolean;
  footer?: boolean;
}

export default function Layout({
  children,
  navbar = true,
  footer = true,
}: LayoutProps) {
  return (
    <>
      {navbar && <Navbar />}
      <main className="bg-white">{children}</main>
      {footer && <Footer />}
    </>
  );
}