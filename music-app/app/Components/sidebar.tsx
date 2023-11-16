"use client"
import Link from 'next/link';
import { IoHomeSharp, IoSearch } from "react-icons/io5";
import { MdOutlineAccountCircle, MdPlaylistPlay, MdOutlineLogout, MdLogin } from "react-icons/md";
import { TiUserAddOutline } from "react-icons/ti";
import { useSelector } from "react-redux";
import { RootState } from '../redux/store';

const Sidebar: React.FC = () => {

  const isAuthenticated = useSelector((state: RootState) => state.authReducer.isAuthenticated);
  
  return (
    <div className="bg-black md:mx-1 shadow-xl p-4 text-white h-5/6">
      <div className="mb-8 transition duration-300 ease-in-out hover:bg-gray-600 hover:rounded-md py-1 cursor-pointer hover:shadow-md">
        <IoHomeSharp className='inline-block mx-2 text-xl text-xl' />
        <Link href="/" passHref>
          Home
        </Link>
      </div>

      <div className="mb-8 transition duration-300 ease-in-out hover:bg-gray-600 hover:rounded-md py-1 cursor-pointer hover:shadow-md">
        <IoSearch className='inline-block mx-2 text-2xl' />
        <Link href="/search">
          Search
        </Link>
      </div>

      <div className="mb-8 transition duration-300 ease-in-out hover:bg-gray-600 hover:rounded-md py-1 cursor-pointer hover:shadow-md">
        <MdPlaylistPlay className='inline-block mx-2 text-2xl' />
        <Link href="/playlist">
          Library
        </Link>
      </div>


      <div className="mb-8 transition duration-300 ease-in-out hover:bg-gray-600 hover:rounded-md py-1 cursor-pointer hover:shadow-md">
        <MdOutlineAccountCircle className='inline-block mx-2 text-2xl' />
        <Link href="/account">
          Account
        </Link>
      </div>

      {
        isAuthenticated ? 
        <div className="mb-8 transition duration-300 ease-in-out hover:bg-gray-600 hover:rounded-md py-1 cursor-pointer hover:shadow-md">
              <MdOutlineLogout className='inline-block mx-2 text-2xl' />
              <Link href="/login" passHref>
                Log Out
              </Link>
            </div> 
            :
          (<>
            <div className="mb-8 transition duration-300 ease-in-out hover:bg-gray-600 hover:rounded-md py-1 cursor-pointer hover:shadow-md">
              <MdLogin className='inline-block mx-2 text-2xl' />
              <Link href="/login" passHref>
                Login
              </Link>
            </div>

            <div className="mb-8 transition duration-300 ease-in-out hover:bg-gray-600 hover:rounded-md py-1 cursor-pointer hover:shadow-md">
              <TiUserAddOutline className='inline-block mx-2 text-2xl' />
              <Link href="/signup" passHref>
                SingUp
              </Link>
            </div>
          </>)
      }

    </div>
  );
};

export default Sidebar;
