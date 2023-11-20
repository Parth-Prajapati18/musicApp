"use client"
import '../Components/LoadingSpinner.css';
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
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredAudiobooks, setFilteredAudiobooks] = useState<Audiobook[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:3000/audiobook');
        const data: { audiobooks: Audiobook[] } = response.data;
        setAudiobooks(data.audiobooks);
        setFilteredAudiobooks(data.audiobooks);
      } catch (error) {
        console.error('Error Fetching the data: ', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);

    const filtered = audiobooks.filter(
      (audiobook) =>
        audiobook.name.toLowerCase().includes(query) ||
        audiobook.artist.toLowerCase().includes(query)
    );

    setFilteredAudiobooks(filtered);
  };

  return (
    <div className='text-white'>
      <h1 className='m-2 font-bold text-2xl'>Suggested Songs</h1>

      <div className='mb-4'>
        <input
          type='text'
          placeholder='Search...'
          value={searchQuery}
          onChange={handleSearchChange}
          className='p-2 border border-white rounded-md text-black'
        />
      </div>

      {loading ? (
        <div className='loading-spinner'></div>
      ) : (
        <div className='flex flex-wrap'>
          {filteredAudiobooks.map((audiobook, index) => (
            <div key={index} className='m-4 w-full sm:w-1/2 md:w-1/4 lg:w-1/5 xl:w-1/6'>
              <Link href={audiobook.songurl}>
                <Image
                  src={audiobook.image}
                  alt={`${audiobook.name} cover`}
                  width={200}
                  height={200}
                  className='object-cover mb-2'
                  loading='lazy'
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
