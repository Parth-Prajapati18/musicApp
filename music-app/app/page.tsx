"use client"
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from './redux/store'; 

function Home() {
  const isAuthenticated = useSelector((state: RootState) => state.authReducer.isAuthenticated);
  const dispatch = useDispatch();

  console.log({ isAuthenticated });

  return (
    <>
      <h1>Heading</h1>
      <p>Hello Parth</p>
    </>
  );
}

export default Home;