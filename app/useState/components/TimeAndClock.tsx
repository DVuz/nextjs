"use client";
import {useState, useEffect} from "react";

export default function TimeAndClock() {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // Lấy giờ, phút, giây
  const hours = time.getHours();
  const minutes = time.getMinutes();
  const seconds = time.getSeconds();

  // Thêm số 0 phía trước nếu cần
  const formatNumber = (num: number) => num < 10 ? `0${num}` : num;

  return (
    <div>
      <div className="flex items-center justify-center gap-2">
        <h2 className="text-xl font-semibold">Thời gian hiện tại:</h2>
        <div
          className="flex items-center justify-center bg-gray-900 text-green-400 p-4 rounded-lg shadow-lg font-mono text-5xl">
          <span className="bg-gray-800 px-3 py-2 rounded">{formatNumber(hours)}</span>
          <span className="mx-1">:</span>
          <span className="bg-gray-800 px-3 py-2 rounded">{formatNumber(minutes)}</span>
          <span className="mx-1">:</span>
          <span className="bg-gray-800 px-3 py-2 rounded">{formatNumber(seconds)}</span>
        </div>
      </div>
    </div>
  );
}