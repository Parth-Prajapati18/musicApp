import './globals.css'
import { Inter } from 'next/font/google'
import Navbar from './Components/header'
import { Providers } from "@/app/redux/provider";

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Music App',
  description: 'App built by Parth',
}

export default function RootLayout({ children,}: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>
        <Navbar/>
        {children}
        </Providers>
        </body>
    </html>
  )
}
