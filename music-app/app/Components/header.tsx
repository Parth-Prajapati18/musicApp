"use client"
import Link from 'next/link';
import { useState, useRef } from 'react';
import { useSelector } from "react-redux";
import { RootState } from '../redux/store';
import Image from 'next/image';
import logo from '@/public/Assets/logo.png'
import { RxHamburgerMenu, RxCross1 } from 'react-icons/rx'

const Navbar: React.FC = () => {

    const isAuthenticated = useSelector((state: RootState) => state.authReducer.isAuthenticated);
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const sidebarRef = useRef(null);

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    const closeSidebar = () => {
        setIsSidebarOpen(false);
    };

    const handleSidebarClick = (e: any) => {
        e.stopPropagation();
    };

    const handleOutsideClick = () => {
        if (isSidebarOpen) {
            closeSidebar();
        }
    };

    return (

        <div>

            <div className="p-4 bg-black md:mt-3 md:mx-1 shadow-xl">

                <div className="flex justify-between items-center">

                    {/* Logo */}
                    <div className="flex items-center">
                        <Link href="/" passHref className="text-white text-2xl font-bold flex items-center">
                            <Image className='text-white' src={logo} alt="Logo" width={120} height={120} />
                        </Link>
                    </div>


                    {isAuthenticated ? (
                        <button onClick={toggleSidebar} className="md:hidden text-white text-2xl focus:outline-none">
                            {/* Phone Hamburger */}
                            <RxHamburgerMenu />
                        </button>
                    ) : (
                        <div className="md:hidden flex space-x-4">
                            <div className='py-1'>
                                <Link href="/login" passHref className="text-white">
                                    Login
                                </Link>
                            </div>
                            <div className="text-black bg-white border rounded-md py-1">
                                <Link href="/signup" passHref className='mx-3'>
                                    Sign Up
                                </Link>
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {/* Mobile side Bar */}
            {isSidebarOpen && (
                <div  className='relative'>
                    <div
                        className="md:hidden bg-black fixed inset-0 opacity-30 z-10"
                        onClick={handleOutsideClick}
                    ></div>
                    <div
                        className="md:hidden bg-black h-screen w-64 absolute top-0 right-0 transform translate-x-0 transition-transform"
                        ref={sidebarRef}
                        onClick={handleSidebarClick}
                    >
                        <div className="md:hidden text-white p-4">
                            <button
                                onClick={toggleSidebar}
                                className="text-2xl focus:outline-none md:hidden"
                            >
                                <RxCross1 />
                            </button>
                            {/* Sidebar content */}
                        </div>
                    </div>
                </div>
            )}


        </div>
    );
};

export default Navbar;
