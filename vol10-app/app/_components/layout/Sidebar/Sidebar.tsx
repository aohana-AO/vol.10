"use client";
import React, { useState } from "react";

export default function Sidebar() {
  const [showSidebar, setShowSidebar] = useState(false);

  const handleClick = () => {
    setShowSidebar((prevState) => !prevState);
  };

  if (!showSidebar) {
    return (
      <button
        className="flex flex-col justify-around h-6 w-6"
        onClick={handleClick}
      >
        <span className="w-6 h-0.5 bg-white"></span>
        <span className="w-6 h-0.5 bg-white"></span>
        <span className="w-6 h-0.5 bg-white"></span>
      </button>
    );
  }

  return (
    <div className="fixed top-100 left-0 h-screen w-48 bg-gray-800 p-5 z-[50]">
      <button className="relative w-6 h-6" onClick={handleClick}>
        <span className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-6 h-0.5 bg-white"></span>
      </button>
      <ul>
        <li className="text-white">Item 1</li>
        <li className="text-white">Item 2</li>
        <li className="text-white">Item 3</li>
      </ul>
    </div>
  );
}
