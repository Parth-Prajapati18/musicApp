import React from 'react';
import './globals.css'
import { Inter } from 'next/font/google'
import Navbar from './Components/header'
import { Providers } from "@/app/redux/provider";
import Sidebar from './Components/sidebar';

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Music App',
  description: 'App built by Parth',
}

export default function RootLayout({ children, }: { children: React.ReactNode }) {

  return (
    <html lang="en" style={{ backgroundColor: '#000' }}>
      <body className={inter.className}>
        <Providers>

          {/* Large screen */}
          <div className='md:grid grid-cols-6'>
            <div className="relative">
            <div className='hidden md:block h-screen fixed'>
              <Navbar/>
              <Sidebar />
            </div>
            </div>
            {/* Mobile */}
            <div className='md:hidden'>
            <Navbar />
             </div>
            {/* Mobile End */}
            <div className='col-span-5 bg-black md:mt-3 mx-1'>
              {children}
            </div>
          </div>

        </Providers>

      </body>
    </html>
  )
}
