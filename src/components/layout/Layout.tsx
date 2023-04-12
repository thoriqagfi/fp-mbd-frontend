import * as React from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import { Layout } from '@/types/layout';
import Head from 'next/head';

export default function Layout({
  children,
  title = 'This is the default title',
  navbar = true,
  footer = true
}: Layout) {
  return (
    <>
    <Head>
      <title>{title}</title>
    </Head>
    <div className='min-h-screen w-full overflow-x-hidden'>
      { navbar && <Navbar />}
      <main className=''>{children}</main>
      { footer && <Footer />}
    </div>
    </>
  );
}