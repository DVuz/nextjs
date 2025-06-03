'use client';
import React, { useState } from 'react';

export default function Page() {
  const [count, setCount] = useState(0);
  const [message, setMessage] = useState('Initial message');
  const [time, setTime] = useState('');
  const [staticText, setStaticText] = useState('Static text');

  // Tất cả functions đều KHÔNG memoize - tạo mới mỗi lần render
  const handleClick1 = () => {
    console.log('🔴 Function 1 clicked');
    setMessage(`Updated from Child 1 at ${new Date().toLocaleTimeString()}`);
  };

  const handleClick2 = () => {
    console.log('🟢 Function 2 clicked');
    setTime(new Date().toLocaleTimeString());
  };

  const handleClick3 = () => {
    console.log('🟡 Function 3 clicked - count:', count);
    setMessage(`Count is ${count} at ${new Date().toLocaleTimeString()}`);
  };

  console.log('🔄 Parent RENDER - Count:', count);

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-3xl font-bold text-center mb-6">
          🧪 React Re-render Test (No memo/useCallback)
        </h1>

        {/* THEORY SECTION - Moved to top */}
        <div className="bg-white p-6 rounded shadow mb-6">
          <h2 className="text-2xl font-bold mb-4 text-center">📚 Lý thuyết React Re-render</h2>

          {/* Basic Rules */}
          <div className="bg-yellow-50 border border-yellow-300 rounded p-4 mb-6">
            <h3 className="font-bold text-yellow-800 mb-3">
              📋 Quy tắc cơ bản (KHÔNG có memo/useCallback):
            </h3>
            <ul className="text-sm space-y-2 text-yellow-700">
              <li className="flex items-start">
                <span className="mr-2">🔄</span>
                <strong>Parent re-render</strong> → Tất cả Child nhận props từ Parent sẽ re-render
              </li>
              <li className="flex items-start">
                <span className="mr-2">🎯</span>
                <strong>Child own state thay đổi</strong> → Chỉ Child đó re-render
              </li>
              <li className="flex items-start">
                <span className="mr-2">📦</span>
                <strong>Props thay đổi</strong> → Child re-render
              </li>
              <li className="flex items-start">
                <span className="mr-2">⚡</span>
                <strong>Function props luôn "mới"</strong> → Child luôn re-render (nếu nhận
                function)
              </li>
              <li className="flex items-start">
                <span className="mr-2">🚫</span>
                <strong>Không nhận props</strong> → Child không bị ảnh hưởng bởi Parent
              </li>
            </ul>
          </div>

          {/* Test Scenarios */}
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-blue-50 border border-blue-300 rounded p-4">
              <h3 className="font-bold text-blue-800 mb-3">🧪 Test Scenarios:</h3>
              <ol className="text-sm space-y-2 text-blue-700">
                <li>
                  <strong>Click "Tăng Count":</strong> Parent re-render → Child với props re-render
                </li>
                <li>
                  <strong>Click "Update Message":</strong> Tương tự như trên
                </li>
                <li>
                  <strong>Click "Update Static Text":</strong> Static Child re-render (props đổi)
                </li>
                <li>
                  <strong>Click "Child's Own Button":</strong> Chỉ Independent Child re-render
                </li>
                <li>
                  <strong>Click Child buttons:</strong> Gọi Parent function → Parent re-render
                </li>
              </ol>
            </div>

            <div className="bg-green-50 border border-green-300 rounded p-4">
              <h3 className="font-bold text-green-800 mb-3">📊 Component Types:</h3>
              <ul className="text-sm space-y-2 text-green-700">
                <li>
                  <strong>👶 Child (với function props):</strong> Re-render khi Parent re-render
                </li>
                <li>
                  <strong>🟦 Independent Child:</strong> Chỉ re-render khi own state đổi
                </li>
                <li>
                  <strong>🟪 Static Child:</strong> Re-render khi text props đổi
                </li>
                <li>
                  <strong>🔄 Parent:</strong> Re-render khi bất kỳ state nào đổi
                </li>
              </ul>
            </div>
          </div>

          {/* Instructions */}
          <div className="mt-6 bg-gray-50 border border-gray-300 rounded p-4">
            <h3 className="font-bold text-gray-800 mb-3">🔍 Cách test:</h3>
            <ol className="text-sm space-y-1 text-gray-700">
              <li>
                1. <strong>Mở Console (F12)</strong> để xem logs từ components
              </li>
              <li>
                2. <strong>Click các buttons</strong> và quan sát logs
              </li>
              <li>
                3. <strong>So sánh</strong>: Component nào re-render, component nào không
              </li>
              <li>
                4. <strong>Hiểu pattern</strong>: Function props → Child luôn re-render
              </li>
            </ol>
          </div>
        </div>

        {/* Current State Display */}
        <div className="bg-white p-4 rounded shadow mb-6">
          <h2 className="font-bold mb-3">📊 Current State:</h2>
          <div className="grid grid-cols-4 gap-4 text-sm">
            <div>
              Count: <strong className="text-blue-600">{count}</strong>
            </div>
            <div>
              Message: <strong className="text-green-600">{message}</strong>
            </div>
            <div>
              Time: <strong className="text-purple-600">{time}</strong>
            </div>
            <div>
              Static: <strong className="text-gray-600">{staticText}</strong>
            </div>
          </div>
        </div>

        {/* Parent Control Buttons */}
        <div className="bg-white p-4 rounded shadow mb-6">
          <h2 className="font-bold mb-3">🎮 Parent Control Buttons:</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            <button
              onClick={() => setCount(c => c + 1)}
              className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
            >
              🔢 Tăng Count ({count})
            </button>
            <button
              onClick={() => setMessage(`Direct update ${Date.now()}`)}
              className="bg-orange-500 text-white px-4 py-2 rounded hover:bg-orange-600"
            >
              📝 Update Message
            </button>
            <button
              onClick={() => setTime(new Date().toLocaleTimeString())}
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
              ⏰ Update Time
            </button>
            <button
              onClick={() => setStaticText(`New text ${Date.now()}`)}
              className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
            >
              📄 Update Static Text
            </button>
          </div>
        </div>

        {/* Child Components Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <Child handleClick={handleClick1} label="Child 1" />
          <Child handleClick={handleClick2} label="Child 2" />
          <Child handleClick={handleClick3} label="Child 3" />
          <IndependentChild />
        </div>

        {/* Static Child */}
        <div className="mb-6">
          <StaticChild text={staticText} />
        </div>

        {/* Expected Results */}
        <div className="bg-white p-6 rounded shadow">
          <h2 className="font-bold mb-4">📋 Kết quả mong đợi chi tiết:</h2>

          <div className="space-y-4">
            <div className="border-l-4 border-red-500 pl-4">
              <h3 className="font-semibold text-red-700">Click "Tăng Count"</h3>
              <p className="text-sm text-gray-600">
                • Parent re-render ✅ (count state đổi)
                <br />
                • Child 1, 2, 3 re-render ✅ (nhận function mới từ Parent)
                <br />
                • Independent Child skip ❌ (không nhận props từ Parent)
                <br />• Static Child skip ❌ (staticText không đổi)
              </p>
            </div>

            <div className="border-l-4 border-orange-500 pl-4">
              <h3 className="font-semibold text-orange-700">Click "Update Message"</h3>
              <p className="text-sm text-gray-600">
                • Parent re-render ✅ (message state đổi)
                <br />
                • Child 1, 2, 3 re-render ✅ (nhận function mới)
                <br />
                • Independent Child skip ❌<br />• Static Child skip ❌
              </p>
            </div>

            <div className="border-l-4 border-gray-500 pl-4">
              <h3 className="font-semibold text-gray-700">Click "Update Static Text"</h3>
              <p className="text-sm text-gray-600">
                • Parent re-render ✅ (staticText state đổi)
                <br />
                • Child 1, 2, 3 re-render ✅ (nhận function mới)
                <br />
                • Independent Child skip ❌<br />• Static Child re-render ✅ (text props thay đổi)
              </p>
            </div>

            <div className="border-l-4 border-purple-500 pl-4">
              <h3 className="font-semibold text-purple-700">Click "Child's Own Button"</h3>
              <p className="text-sm text-gray-600">
                • Parent skip ❌ (không có state nào của Parent đổi)
                <br />
                • Independent Child re-render ✅ (own childCount state đổi)
                <br />• Các Child khác skip ❌ (Parent không re-render)
              </p>
            </div>

            <div className="border-l-4 border-blue-500 pl-4">
              <h3 className="font-semibold text-blue-700">Click buttons trong Child 1, 2, 3</h3>
              <p className="text-sm text-gray-600">
                • Function được gọi → Parent state thay đổi (message/time)
                <br />
                • Parent re-render ✅<br />
                • Tất cả Child 1, 2, 3 re-render ✅ (nhận function mới)
                <br />• Independent Child skip ❌
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Child component KHÔNG có React.memo - sẽ re-render mỗi khi Parent re-render
const Child = ({ handleClick, label }: { handleClick: () => void; label: string }) => {
  console.log(`👶 ${label} - Child RENDER`);
  return (
    <div className="border-2 border-blue-300 p-4 bg-blue-50 rounded">
      <h3 className="font-bold mb-2">{label}</h3>
      <button
        onClick={handleClick}
        className="bg-blue-500 text-white px-3 py-2 rounded hover:bg-blue-600"
      >
        Click Child Button
      </button>
      <div className="text-xs text-gray-600 mt-1">Sẽ re-render mỗi khi Parent re-render</div>
    </div>
  );
};

// Independent Child - có state riêng, không nhận props từ Parent
const IndependentChild = () => {
  const [childCount, setChildCount] = useState(0);
  console.log('🟦 Independent Child RENDER - Own count:', childCount);

  return (
    <div className="border-2 border-purple-300 p-4 bg-purple-50 rounded">
      <h3 className="font-bold mb-2">Independent Child</h3>
      <div className="mb-2">
        Child's own count: <strong>{childCount}</strong>
      </div>
      <button
        onClick={() => setChildCount(c => c + 1)}
        className="bg-purple-500 text-white px-3 py-2 rounded hover:bg-purple-600"
      >
        Child's Own Button
      </button>
      <div className="text-xs text-gray-600 mt-1">Chỉ re-render khi own state thay đổi</div>
    </div>
  );
};

// Static Child - không có state, không nhận function props
const StaticChild = ({ text }: { text: string }) => {
  console.log('🟪 Static Child RENDER');
  return (
    <div className="border-2 border-gray-300 p-4 bg-gray-50 rounded">
      <h3 className="font-bold mb-2">Static Child</h3>
      <div className="text-sm">{text}</div>
      <div className="text-xs text-gray-600 mt-1">Re-render khi props thay đổi</div>
    </div>
  );
};
