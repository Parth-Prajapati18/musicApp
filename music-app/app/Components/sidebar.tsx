" use client"
import Link from 'next/link';

const Sidebar = () => {
  return (
    <div className="bg-black md:mt-3 md:mx-1 shadow-xl p-4 text-white h-5/6">
      <div className="mb-8">
        <Link href="/">
          Home
        </Link>
      </div>
      <div className="mb-8">
        <Link href="/browse">
          Browse
        </Link>
      </div>
      <div className="mb-8">
        <Link href="/search">
          Search
        </Link>
      </div>
      <div className="mb-8">
        <Link href="/account">
          Account
        </Link>
      </div>
      <div className="mb-8">
        <Link href="/playlist">
          Playlist
        </Link>
      </div>
    </div>
  );
};

export default Sidebar;
