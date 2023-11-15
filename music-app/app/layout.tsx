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
    <html lang="en" style={{backgroundColor : '#121212'}}>
      <body className={inter.className}>

        <Providers>

          {/* Mobile */}
          <div className='md:hidden'>
            <Navbar />
          </div>

          {/* Large screen */}
          <div className='hidden md:grid grid-cols-6'>
            <div className='h-screen'>
              <Navbar />
              <Sidebar/>
            </div>
            <div className='col-span-5 bg-black mt-3 mx-1'>
              {children}
            </div>
          </div>

        </Providers>

      </body>
    </html>
  )
}
