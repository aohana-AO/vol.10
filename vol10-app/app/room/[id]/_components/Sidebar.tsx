"use client";
import React, { useState } from "react";

export default function Sidebar({
  chatgpt,
  palm,
  llama,
  claude,
}: {
  chatgpt: number;
  palm: number;
  llama: number;
  claude: number;
}) {
  const [showSidebar, setShowSidebar] = useState(false);

  const handleClick = () => {
    setShowSidebar((prevState) => !prevState);
  };

  if (!showSidebar) {
    return (
      <div className="mt-8">
        <button
          className="flex flex-col justify-around h-6 w-6 mt-3"
          onClick={handleClick}
        >
          <span className="w-6 h-0.5 bg-blue-900"></span>
          <span className="w-6 h-0.5 bg-blue-900"></span>
          <span className="w-6 h-0.5 bg-blue-900"></span>
        </button>
      </div>
    );
  }

  return (
    <div className="fixed mt-1 top-100 left-0 h-screen w-48 bg-gray-800 bg-opacity-80 p-5 z-[50]">
      <button className="relative w-6 h-6" onClick={handleClick}>
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,400,0,0"
        />
        <span className="material-symbols-outlined text-white">close</span>
      </button>
      <ul>
        {chatgpt !== 0 && (
          <li className="text-white border border-white rounded-lg p-2 mb-2 mt-3">
            <details>
              <summary>ChatGPT</summary>
              {/* <p className="text-xs pl-3">選択した性格と説明</p> */}
            </details>
          </li>
        )}

        {palm !== 0 && (
          <li className="text-white border border-white rounded-lg p-2 mb-2 mt-3">
            <details>
              <summary>PaLM</summary>
              {/* <p className="text-xs pl-3">選択した性格と説明</p> */}
            </details>
          </li>
        )}
        {llama !== 0 && (
          <li className="text-white border border-white rounded-lg p-2 mb-2 mt-3">
            <details>
              <summary>LLaMA2</summary>
              {/* <p className="text-xs pl-3">選択した性格と説明</p> */}
            </details>
          </li>
        )}
        {claude !== 0 && (
          <li className="text-white border border-white rounded-lg p-2 mb-2 mt-3">
            <details>
              <summary>Claude2</summary>
              {/* <p className="text-xs pl-3">選択した性格と説明</p> */}
            </details>
          </li>
        )}
      </ul>
    </div>
  );
}
