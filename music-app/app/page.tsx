'use client'
import './Components/LoadingSpinner.css';
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import axios from 'axios';
import { MdPlaylistAdd } from "react-icons/md";
import { AiFillLike, AiFillDislike } from "react-icons/ai";
import { useSelector } from "react-redux";
import { RootState } from './redux/store';


interface Audiobook {
  name: string;
  image: string;
  artist: string;
  songurl: string;
}

function addToPlayList(songid, userId, playlistid) {

  

}

const Page: React.FC = () => {

  const isAuthenticated = useSelector((state: RootState) => state.authReducer.isAuthenticated);
  const [audiobooks, setAudiobooks] = useState<Audiobook[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:3000/audiobook');
        const data: { audiobooks: Audiobook[] } = response.data;
        setAudiobooks(data.audiobooks);
      } catch (error) {
        console.error('Error Fetching the data: ', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div className='text-white'>
      <h1 className='m-2 font-bold text-2xl'>Suggested Songs</h1>

      {loading ? (
        <div className='loading-spinner'></div>
      ) : (
        <div className='flex flex-wrap content-center justify-center'>
          {audiobooks.map((audiobook, index) => (
            <div key={index} className='m-1 md:m-4 w-full sm:w-1/2 md:w-1/4 lg:w-1/5 xl:w-1/6'>
              <Link href={audiobook.songurl}>
                <Image
                  src={audiobook.image}
                  alt={`${audiobook.name} cover`}
                  width={200}
                  height={200}
                  className='object-cover mb-2'
                  loading='lazy' // Enable native lazy loading
                />
                <p className='text-sm'>{audiobook.name}</p>
                <p className='text-xs text-gray-500'>{audiobook.artist}</p>
              </Link>

              {
              isAuthenticated ? 
              <>
              <button className='text-gray-500 mr-2'><AiFillLike/></button>
              <button className='text-gray-500 mr-2'><AiFillDislike/></button>              
              <button onClick={addToPlayList()} className='text-gray-500'><MdPlaylistAdd/></button>
              </>
              : '' }

            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Page;