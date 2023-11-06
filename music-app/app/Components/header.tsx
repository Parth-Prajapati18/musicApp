"use client"
import Link from 'next/link';
import { useState, useRef } from 'react';
import Image from 'next/image';
import logo from '@/public/Assets/logo.png'
import { RxHamburgerMenu, RxCross1 } from 'react-icons/rx'

const Navbar: React.FC = () => {

    const [isSignedIn, setIsSignedIn] = useState(false);
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    const sidebarRef = useRef(null);

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    const closeSidebar = () => {
        setIsSidebarOpen(false);
    };

    const handleSidebarClick = (e: any) => {
        e.stopPropagation(); // Prevent the click event from closing the sidebar
    };

    const handleOutsideClick = () => {
        if (isSidebarOpen) {
            closeSidebar();
        }
    };

    return (
        <div className="bg-black p-4">

            <div className="flex justify-between items-center">
                
                <div className="flex items-center">
                    <Link href="/" passHref className="text-white text-2xl font-bold flex items-center">
                        <Image className='text-white' src={logo} alt="Logo" width={120} height={120} />
                    </Link>
                </div>

                {isSignedIn ? (
                    <button onClick={toggleSidebar} className="text-white text-2xl focus:outline-none md:hidden">
                        <RxHamburgerMenu />
                    </button>
                ) : (
                    <div className="flex space-x-4">
                        <Link href="/login" passHref className="text-white">
                            Login
                        </Link>
                        <div className="text-black bg-white rounded-xl">
                        <Link href="/signup" passHref className='m-3'>
                            Sign Up
                        </Link>
                        </div>
                    </div>
                )}
            </div>


            {isSidebarOpen && (
                <>
                    <div
                        className="md:hidden fixed inset-0 bg-black opacity-30 z-10"
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
                                <RxCross1/>
                            </button>
                            {/* Sidebar content */}
                        </div>
                    </div>
                </>
            )}

        </div>
    );
};

export default Navbar;
