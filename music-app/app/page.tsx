"use client"
import React from "react";
import type { InferGetServerSidePropsType, GetServerSideProps } from 'next'
import axios from "axios";

interface Audiobook {
  id: string;
  name: string;
  descreption: string;
  images: { url: string; height: number; width: number }[];
}

interface Props {
  audiobooks: Audiobook[];
}

export const getServerSideProps = (async () => {
  const response = await axios.get(
    'https://api.spotify.com/v1/audiobooks?ids=18yVqkdbdRvS24c0Ilj2ci%2C1HGw3J3NxZO1TP1BTtVhpZ%2C7iHfbu1YPACw6oZPAFJtqe',
    {
      headers: {
        Authorization: 'Bearer YOUR_ACCESS_TOKEN', 
      },
    }
  );

  const audiobooks = response.data.audiobooks || [];
  return{ props: { audiobooks } }

}) satisfies GetServerSideProps <{
  audiobooks: Audiobook
}>


export default function Page({audiobooks}: InferGetServerSidePropsType<typeof getServerSideProps>) {

  console.log(audiobooks)

  return (
    <>
      <h1 className="text-white font-bold">Suggested Songs</h1>

    </>
  );
}