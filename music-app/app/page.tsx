'use client'
import './Components/LoadingSpinner.css';
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import axios from 'axios';

interface Audiobook {
  name: string;
  image: string;
  artist: string;
  songurl: string;
}

const Page: React.FC = () => {

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
        <div className='flex flex-wrap'>
          {audiobooks.map((audiobook, index) => (
            <div key={index} className='m-4 w-full sm:w-1/2 md:w-1/4 lg:w-1/5 xl:w-1/6'>
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
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Page;