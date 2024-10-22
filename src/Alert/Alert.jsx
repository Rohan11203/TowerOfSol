// Toast.js
import React from "react";

const Toast = ({ message, onClose }) => {
  return (
    <div className="fixed bottom-4 right-4 bg-gradient-to-r from-green-400 to-green-600 text-white p-4 rounded-lg shadow-lg z-50 transition-all duration-300 ease-in-out transform opacity-100 scale-100">
      <div className="flex items-center justify-between">
        <span className="font-bold">{message}</span>
        <button
          onClick={onClose}
          className="ml-4 text-white hover:text-gray-200 transition duration-200 ease-in-out"
        >
          &times;
        </button>
      </div>
      <div className="mt-2">
        <span className="text-sm italic">Your rewards are on the way!</span>
      </div>
    </div>
  );
};

export default Toast;
