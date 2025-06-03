"use client"
import {useState} from "react";
import {useEffect} from "react";

export default function InputState() {
  const [inputValue, setInputValue] = useState("");

  return (
    <div className="flex flex-col space-y-4">
      <input
        type="text"
        placeholder="Type something..."
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        className="w-full p-2 border border-gray-300 rounded"
      />
      <p className="text-sm text-gray-600">Current input value: {inputValue}</p>
    </div>
  );
}