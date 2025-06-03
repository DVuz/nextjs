'use client';
import React, { useState, memo } from 'react';

// Child component với React.memo
const Child = memo(({ onClick, label }: { onClick: () => void; label: string }) => {
  console.log(`👶 ${label} render`);
  return (
    <div className="border-2 border-blue-300 p-4 m-4 bg-blue-50 rounded-lg">
      <h4 className="font-semibold mb-3 text-blue-800">{label}</h4>
      <button
        onClick={onClick}
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors"
      >
        Click me
      </button>
      <div className="mt-2 text-xs text-blue-600">💡 Child được wrap với React.memo</div>
    </div>
  );
});

// ❌ Không có useCallback
export default function WithoutCallbackExample() {
  const [count, setCount] = useState(0);
  const [message, setMessage] = useState('Initial message');

  // ❌ Function tạo mới mỗi lần render
  const handleChildClick = () => {
    console.log('🔴 Child WITHOUT useCallback clicked');
    setMessage(`Clicked at ${new Date().toLocaleTimeString()}`);
  };

  console.log('🔴 Parent WITHOUT useCallback render - Count:', count);

  return (
    <div className="min-h-screen bg-red-50 p-6">
      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h1 className="text-3xl font-bold text-red-700 mb-6 text-center">
            ❌ WITHOUT useCallback
          </h1>

          {/* Current State */}
          <div className="bg-red-100 border border-red-300 rounded-lg p-4 mb-6">
            <h3 className="font-bold text-red-800 mb-2">📊 Current State:</h3>
            <div className="space-y-2 text-sm">
              <div>
                <strong>Count:</strong>{' '}
                <span className="bg-red-200 px-2 py-1 rounded">{count}</span>
              </div>
              <div>
                <strong>Message:</strong>{' '}
                <span className="bg-red-200 px-2 py-1 rounded">{message}</span>
              </div>
            </div>
          </div>

          {/* Action Button */}
          <div className="mb-6">
            <button
              onClick={() => setCount(c => c + 1)}
              className="w-full bg-red-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-red-600 transition-colors"
            >
              🔢 Tăng Count (sẽ làm Child re-render)
            </button>
          </div>

          {/* Child Component */}
          <Child
            onClick={handleChildClick}
            label="Child Component (sẽ re-render khi count thay đổi)"
          />

          {/* Explanation */}
          <div className="mt-6 bg-yellow-50 border border-yellow-300 rounded-lg p-4">
            <h3 className="font-bold text-yellow-800 mb-2">🔍 Điều gì xảy ra:</h3>
            <ol className="text-sm space-y-1 text-yellow-700">
              <li>1. Click "Tăng Count" → Parent re-render</li>
              <li>
                2. <code>handleChildClick</code> function được tạo mới
              </li>
              <li>3. Child nhận props mới (function reference khác)</li>
              <li>4. React.memo detect props change → Child re-render</li>
            </ol>
          </div>

          {/* Code Display */}
          <div className="mt-6 bg-gray-50 border rounded-lg p-4">
            <h3 className="font-bold mb-2">📝 Code:</h3>
            <pre className="text-sm bg-white p-3 rounded overflow-x-auto">
              {`// ❌ Function tạo mới mỗi lần render
const handleChildClick = () => {
  console.log('Child clicked');
  setMessage(\`Clicked at \${new Date().toLocaleTimeString()}\`);
};

// Mỗi lần Parent re-render:
// → handleChildClick là function mới
// → Child nhận props mới
// → Child re-render (dù có React.memo)`}
            </pre>
          </div>

          {/* Test Instructions */}
          <div className="mt-6 bg-blue-50 border border-blue-300 rounded-lg p-4">
            <h3 className="font-bold text-blue-800 mb-2">🧪 Cách test:</h3>
            <ol className="text-sm space-y-1 text-blue-700">
              <li>1. Mở Console (F12)</li>
              <li>2. Click "Tăng Count" nhiều lần</li>
              <li>3. Quan sát: Child re-render mỗi lần Parent re-render</li>
              <li>4. Click "Click me" để test functionality</li>
            </ol>
          </div>
        </div>
      </div>
    </div>
  );
}
