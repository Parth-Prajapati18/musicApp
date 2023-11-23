"use client"
import React, { useState } from 'react';
import { useSpring, animated } from 'react-spring';

interface PopupProps {
  type: string;
  message: string;
}

const Popup: React.FC<PopupProps> = ({ type, message }) => {
  const [visible, setVisible] = useState(true);

  const animationProps = useSpring({
    opacity: visible ? 1 : 0,
    transform: visible ? 'translateY(0)' : 'translateY(-50px)',
  });

  // Close the popup after 3 seconds
  setTimeout(() => {
    setVisible(false);
  }, 2000);

  return (
    <animated.div
      style={{
        ...animationProps,
        position: 'fixed',
        top: '30px',
        left: '50%',
        transform: 'translateX(-50%)',
      }}
      className={`${type === 'success' ? 'bg-green-500' : 'bg-yellow-200'} rounded-md p-4 text-gray-700 font-semibold`}
    >
      <div>{message}</div>
    </animated.div>
  );
};

export default Popup;
