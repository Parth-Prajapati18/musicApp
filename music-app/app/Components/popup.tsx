"use client"
import React from 'react';

interface PopupProps {
  type: 'success' | 'warning';
  message: string;
  onClose: () => void;
}

const Popup: React.FC<PopupProps> = ({ type, message, onClose }) => {
  const popupClasses = `fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 p-4 rounded-md ${
    type === 'success' ? 'bg-green-500' : 'bg-yellow-500'
  } text-white`;

  return (
    <div className={popupClasses}>
      <button className="absolute top-2 right-2 text-white" onClick={onClose}>
        Close
      </button>
      {type === 'success' && <span className="mr-2">🎉</span>}
      {type === 'warning' && <span className="mr-2">⚠️</span>}
      <span>{message}</span>
    </div>
  );
};

export default Popup;