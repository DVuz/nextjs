'use client';
import React, { useState, useMemo, memo, useCallback, useEffect } from 'react';

// Interface cho props của RawCode
interface RawCodeProps {
  code: string;
  fileName?: string;
  language?: string;
}

// Interface cho User data
interface User {
  id: number;
  name: string;
  age: number;
  city: string;
  salary: number;
  department: string;
  isActive: boolean;
}

// Interface cho Product data
interface Product {
  id: number;
  name: string;
  price: number;
  category: string;
  rating: number;
  inStock: boolean;
}

// Interface cho Chart data
interface ChartData {
  label: string;
  value: number;
  color: string;
}

// Enhanced RawCode component với thiết kế terminal đẹp
function RawCode({code, fileName = 'Component.tsx', language = 'tsx'}: RawCodeProps) {
  const [isShown, setIsShown] = useState(false);
  const [copied, setCopied] = useState(false);

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  return (
    <div className="mt-8 mb-10 border-0 rounded-2xl overflow-hidden shadow-2xl bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      {/* Terminal Header */}
      <div className="flex items-center justify-between px-6 py-4 bg-gradient-to-r from-slate-700 via-slate-600 to-slate-700 border-b border-slate-500/30">
        <div className="flex items-center space-x-4">
          <div className="flex space-x-2">
            <div className="w-3.5 h-3.5 rounded-full bg-red-500 shadow-lg hover:bg-red-400 transition-colors cursor-pointer"></div>
            <div className="w-3.5 h-3.5 rounded-full bg-yellow-500 shadow-lg hover:bg-yellow-400 transition-colors cursor-pointer"></div>
            <div className="w-3.5 h-3.5 rounded-full bg-green-500 shadow-lg hover:bg-green-400 transition-colors cursor-pointer"></div>
          </div>
          <div className="flex items-center space-x-3">
            <span className="text-sm font-bold text-slate-200 tracking-wide">{fileName}</span>
            <span className="text-xs px-3 py-1 bg-blue-500/20 border border-blue-400/50 text-blue-200 font-mono rounded">
              {language}
            </span>
          </div>
        </div>

        <div className="flex items-center space-x-2">
          {isShown && (
            <button
              className="h-8 px-3 text-slate-300 hover:text-white hover:bg-slate-600/50 transition-all duration-200 border border-slate-500/30 hover:border-slate-400/50 rounded text-xs font-semibold"
              onClick={copyToClipboard}
            >
              {copied ? '✅ Copied!' : '📋 Copy'}
            </button>
          )}

          <button
            className="h-8 px-3 text-slate-300 hover:text-white hover:bg-slate-600/50 transition-all duration-200 border border-slate-500/30 hover:border-slate-400/50 rounded text-xs font-semibold"
            onClick={() => setIsShown(!isShown)}
          >
            {isShown ? '🔼 Hide' : '🔽 Show'}
          </button>
        </div>
      </div>

      {/* Code block */}
      {isShown && (
        <div className="relative bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
          <pre className="p-6 overflow-x-auto text-sm font-mono leading-relaxed max-h-[700px] text-green-300 selection:bg-blue-500/30">
            <code>{code}</code>
          </pre>
        </div>
      )}
    </div>
  );
}

export default function UseMemoPage() {
  const [activeSection, setActiveSection] = useState('theory');

  const sections = [
    { id: 'theory', name: '📚 Lý thuyết', icon: '🧠' },
    { id: 'basic', name: '🎯 Cơ bản', icon: '⚡' },
    { id: 'advanced', name: '🚀 Nâng cao', icon: '🔥' },
    { id: 'examples', name: '💼 Thực tế', icon: '🌟' },
    { id: 'performance', name: '📊 Performance', icon: '⚡' },
    { id: 'patterns', name: '🎨 Patterns', icon: '✨' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/50 to-purple-50/50">
      {/* Hero Header */}
      <div className="relative bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-white py-24 px-4 mb-16 shadow-2xl overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-10 left-10 w-20 h-20 bg-white/10 rounded-full animate-pulse"></div>
          <div className="absolute top-32 right-20 w-32 h-32 bg-white/5 rounded-full animate-bounce"></div>
          <div className="absolute bottom-20 left-1/4 w-16 h-16 bg-white/10 rounded-full animate-ping"></div>
        </div>

        <div className="container mx-auto max-w-7xl relative z-10">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-12 h-12 bg-white/20 backdrop-blur-md rounded-2xl flex items-center justify-center border border-white/30">
              <span className="text-2xl">🧠</span>
            </div>
            <span className="bg-white/20 backdrop-blur-md text-white border-white/30 px-4 py-2 text-sm font-bold rounded-lg">
              🎣 React Hooks
            </span>
          </div>

          <h1 className="text-6xl sm:text-7xl font-black mb-8 leading-tight">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-white via-blue-100 to-purple-100">
              useMemo
            </span>
            <div className="text-4xl sm:text-5xl mt-2 font-light text-white/90">
              Memoization Hook
            </div>
          </h1>

          <p className="text-xl text-white/90 max-w-4xl leading-relaxed font-medium">
            🚀 Tối ưu performance React app với useMemo - Hook mạnh mẽ để cache expensive calculations
            và prevent unnecessary re-computations
          </p>

          <div className="flex items-center gap-4 mt-8">
            <span className="text-2xl animate-pulse">✨</span>
            <span className="text-white/80 text-sm font-medium">
              Từ cơ bản đến patterns nâng cao với demos thực tế
            </span>
          </div>
        </div>
      </div>

      <div className="container mx-auto max-w-7xl px-4 pb-32">
        {/* Navigation */}
        <div className="bg-white/95 backdrop-blur-xl p-3 shadow-2xl rounded-3xl border border-slate-200/50 mb-16">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-2">
            {sections.map((section) => (
              <button
                key={section.id}
                onClick={() => setActiveSection(section.id)}
                className={`rounded-2xl transition-all duration-300 font-semibold py-3 px-4 ${
                  activeSection === section.id
                    ? 'bg-gradient-to-r from-blue-500 to-indigo-500 text-white shadow-xl scale-105'
                    : 'hover:bg-slate-100 text-slate-700'
                }`}
              >
                <span className="text-base">{section.icon}</span>
                <span className="ml-2 hidden sm:inline text-sm">{section.name}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Content Sections */}
        {activeSection === 'theory' && <TheorySection />}
        {activeSection === 'basic' && <BasicSection />}
        {activeSection === 'advanced' && <AdvancedSection />}
        {activeSection === 'examples' && <ExamplesSection />}
        {activeSection === 'performance' && <PerformanceSection />}
        {activeSection === 'patterns' && <PatternsSection />}
      </div>
    </div>
  );
}

// Theory Section
function TheorySection() {
  return (
    <div className="space-y-8">
      <div className="bg-white rounded-lg shadow-lg p-8">
        <h2 className="text-3xl font-bold mb-6 text-center text-blue-700 flex items-center justify-center gap-3">
          <span className="text-4xl">🧠</span>
          Lý thuyết useMemo
        </h2>

        {/* What is useMemo */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-8">
          <h3 className="font-bold text-blue-800 mb-4 text-xl">🤔 useMemo là gì?</h3>
          <p className="text-blue-700 mb-4 text-lg leading-relaxed">
            <strong>useMemo</strong> là React Hook giúp <strong>memoize</strong> (cache) kết quả của một phép tính.
            Nó chỉ tính toán lại khi <strong>dependencies</strong> thay đổi, giúp tối ưu performance.
          </p>
          <div className="bg-white p-4 rounded border border-blue-300">
            <code className="text-sm text-blue-800">
              const memoizedValue = useMemo(() =&gt; expensiveCalculation(a, b), [a, b]);
            </code>
          </div>
        </div>

        {/* Core Concepts */}
        <div className="grid md:grid-cols-2 gap-8 mb-8">
          <div className="bg-green-50 border border-green-200 rounded-lg p-6">
            <h4 className="font-bold text-green-800 mb-4 text-lg">✅ Khi nào dùng useMemo:</h4>
            <ul className="space-y-2 text-green-700">
              <li className="flex items-start gap-2">
                <span className="text-green-600">•</span>
                <span>Expensive calculations (loops, math operations)</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-600">•</span>
                <span>Filtering/sorting large arrays</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-600">•</span>
                <span>Creating complex objects/arrays</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-600">•</span>
                <span>Derived state from props/state</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-600">•</span>
                <span>Preventing child re-renders</span>
              </li>
            </ul>
          </div>

          <div className="bg-red-50 border border-red-200 rounded-lg p-6">
            <h4 className="font-bold text-red-800 mb-4 text-lg">❌ Khi KHÔNG nên dùng:</h4>
            <ul className="space-y-2 text-red-700">
              <li className="flex items-start gap-2">
                <span className="text-red-600">•</span>
                <span>Simple calculations (a + b)</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-red-600">•</span>
                <span>Dependencies change frequently</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-red-600">•</span>
                <span>Primitive values that change rarely</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-red-600">•</span>
                <span>Over-optimization (premature optimization)</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-red-600">•</span>
                <span>Every computed value</span>
              </li>
            </ul>
          </div>
        </div>

        {/* How it works */}
        <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 mb-8">
          <h4 className="font-bold text-gray-800 mb-4 text-lg">🔄 Cách hoạt động:</h4>
          <div className="space-y-4">
            <div className="flex items-center gap-4 p-3 bg-white rounded border-l-4 border-blue-500">
              <span className="text-2xl">1️⃣</span>
              <span>Lần đầu: Thực hiện calculation và cache kết quả</span>
            </div>
            <div className="flex items-center gap-4 p-3 bg-white rounded border-l-4 border-green-500">
              <span className="text-2xl">2️⃣</span>
              <span>Re-render: So sánh dependencies với lần trước</span>
            </div>
            <div className="flex items-center gap-4 p-3 bg-white rounded border-l-4 border-yellow-500">
              <span className="text-2xl">3️⃣</span>
              <span>Nếu giống: Trả về cached value (không tính lại)</span>
            </div>
            <div className="flex items-center gap-4 p-3 bg-white rounded border-l-4 border-purple-500">
              <span className="text-2xl">4️⃣</span>
              <span>Nếu khác: Thực hiện calculation mới và update cache</span>
            </div>
          </div>
        </div>

        {/* Comparison */}
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
          <h4 className="font-bold text-yellow-800 mb-4 text-lg">⚖️ So sánh với các hooks khác:</h4>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-white p-4 rounded border border-purple-300">
              <h5 className="font-bold text-purple-700 mb-2">useMemo</h5>
              <ul className="text-sm space-y-1 text-purple-600">
                <li>• Memoize <strong>values</strong></li>
                <li>• Return computed result</li>
                <li>• Cache expensive calculations</li>
              </ul>
            </div>
            <div className="bg-white p-4 rounded border border-blue-300">
              <h5 className="font-bold text-blue-700 mb-2">useCallback</h5>
              <ul className="text-sm space-y-1 text-blue-600">
                <li>• Memoize <strong>functions</strong></li>
                <li>• Return memoized function</li>
                <li>• Prevent function recreation</li>
              </ul>
            </div>
            <div className="bg-white p-4 rounded border border-green-300">
              <h5 className="font-bold text-green-700 mb-2">React.memo</h5>
              <ul className="text-sm space-y-1 text-green-600">
                <li>• Memoize <strong>components</strong></li>
                <li>• Skip re-render if props same</li>
                <li>• Component-level optimization</li>
              </ul>
            </div>
          </div>
        </div>

        <RawCode
          fileName="useMemo-syntax.tsx"
          code={`// Basic syntax
const memoizedValue = useMemo(
  () => {
    // Expensive calculation here
    return computeExpensiveValue(a, b);
  },
  [a, b] // Dependencies array
);

// Real example
const expensiveSum = useMemo(() => {
  console.log('Computing expensive sum...');
  return items.reduce((sum, item) => sum + item.value, 0);
}, [items]); // Only recalculate when items change`}
        />
      </div>
    </div>
  );
}

// Basic Section
function BasicSection() {
  return (
    <div className="space-y-8">
      <div className="bg-white rounded-lg shadow-lg p-8">
        <h2 className="text-3xl font-bold mb-6 text-center text-green-700 flex items-center justify-center gap-3">
          <span className="text-4xl">🎯</span>
          Sử dụng useMemo cơ bản
        </h2>

        {/* Basic Usage */}
        <div className="space-y-12">
          <div>
            <h3 className="text-2xl font-bold mb-6 text-gray-800">🧮 1. Expensive Calculation</h3>
            <p className="text-gray-600 mb-6 text-lg">
              Ví dụ cơ bản nhất: cache kết quả của một phép tính phức tạp
            </p>

            <RawCode
              fileName="expensive-calculation.tsx"
              code={`function ExpensiveComponent({ number }: { number: number }) {
  // ❌ WITHOUT useMemo - Calculate every render
  const expensiveValueBad = calculateExpensiveValue(number);

  // ✅ WITH useMemo - Only calculate when number changes
  const expensiveValueGood = useMemo(() => {
    console.log('🧮 Calculating expensive value...');
    return calculateExpensiveValue(number);
  }, [number]);

  return (
    <div>
      <p>Result: {expensiveValueGood}</p>
    </div>
  );
}

function calculateExpensiveValue(num: number): number {
  // Simulate expensive operation
  let result = 0;
  for (let i = 0; i < 1000000; i++) {
    result += num * Math.random();
  }
  return Math.round(result);
}`}
            />

            <ExpensiveCalculationDemo />
          </div>

          <div>
            <h3 className="text-2xl font-bold mb-6 text-gray-800">🔍 2. Array Filtering</h3>
            <p className="text-gray-600 mb-6 text-lg">
              Filter large datasets efficiently with useMemo
            </p>

            <RawCode
              fileName="array-filtering.tsx"
              code={`function UserList({ users, filter }: { users: User[], filter: string }) {
  // ❌ WITHOUT useMemo - Filter every render
  const filteredUsersBad = users.filter(user =>
    user.name.toLowerCase().includes(filter.toLowerCase())
  );

  // ✅ WITH useMemo - Only filter when users or filter changes
  const filteredUsersGood = useMemo(() => {
    console.log('🔍 Filtering users...');
    return users.filter(user =>
      user.name.toLowerCase().includes(filter.toLowerCase())
    );
  }, [users, filter]);

  return (
    <div>
      <p>Found {filteredUsersGood.length} users</p>
      <ul>
        {filteredUsersGood.map(user => (
          <li key={user.id}>{user.name}</li>
        ))}
      </ul>
    </div>
  );
}`}
            />

            <FilteringDemo />
          </div>

          <div>
            <h3 className="text-2xl font-bold mb-6 text-gray-800">📦 3. Object Creation</h3>
            <p className="text-gray-600 mb-6 text-lg">
              Create stable object references to prevent child re-renders
            </p>

            <RawCode
              fileName="object-creation.tsx"
              code={`function ParentComponent({ threshold }: { threshold: number }) {
  const [count, setCount] = useState(0);

  // ❌ WITHOUT useMemo - New object every render
  const configBad = {
    threshold,
    isActive: threshold > 10,
    timestamp: Date.now() // Always different!
  };

  // ✅ WITH useMemo - Stable object reference
  const configGood = useMemo(() => ({
    threshold,
    isActive: threshold > 10,
    metadata: 'stable-value'
  }), [threshold]);

  return (
    <div>
      <button onClick={() => setCount(c => c + 1)}>
        Count: {count}
      </button>
      <ChildComponent config={configGood} />
    </div>
  );
}

const ChildComponent = memo(({ config }: { config: any }) => {
  console.log('👶 Child rendered');
  return <div>Child with config</div>;
});`}
            />

            <ObjectMemoDemo />
          </div>
        </div>
      </div>
    </div>
  );
}

// Advanced Section
function AdvancedSection() {
  return (
    <div className="space-y-8">
      <div className="bg-white rounded-lg shadow-lg p-8">
        <h2 className="text-3xl font-bold mb-6 text-center text-purple-700 flex items-center justify-center gap-3">
          <span className="text-4xl">🚀</span>
          useMemo Nâng cao
        </h2>

        <div className="space-y-12">
          <div>
            <h3 className="text-2xl font-bold mb-6 text-gray-800">🔄 1. Complex Dependencies</h3>
            <p className="text-gray-600 mb-6 text-lg">
              Sử dụng useMemo với multiple dependencies và complex logic
            </p>

            <RawCode
              fileName="complex-dependencies.tsx"
              code={`function ComplexCalculation({
  data,
  filterType,
  sortOrder,
  threshold
}: {
  data: Product[];
  filterType: string;
  sortOrder: 'asc' | 'desc';
  threshold: number;
}) {
  const processedData = useMemo(() => {
    console.log('🔄 Processing complex data...');

    // Step 1: Filter
    let filtered = data.filter(item => {
      switch (filterType) {
        case 'expensive': return item.price > threshold;
        case 'cheap': return item.price <= threshold;
        case 'inStock': return item.inStock;
        default: return true;
      }
    });

    // Step 2: Sort
    filtered.sort((a, b) => {
      const multiplier = sortOrder === 'asc' ? 1 : -1;
      return (a.price - b.price) * multiplier;
    });

    // Step 3: Add computed properties
    return filtered.map(item => ({
      ...item,
      priceCategory: item.price > threshold ? 'Premium' : 'Standard',
      discount: item.price > threshold ? 0.1 : 0.05
    }));
  }, [data, filterType, sortOrder, threshold]);

  return (
    <div>
      <p>Processed {processedData.length} items</p>
      {/* Render processed data */}
    </div>
  );
}`}
            />

            <ComplexDependenciesDemo />
          </div>

          <div>
            <h3 className="text-2xl font-bold mb-6 text-gray-800">🎯 2. Conditional Memoization</h3>
            <p className="text-gray-600 mb-6 text-lg">
              Only memoize when certain conditions are met
            </p>

            <RawCode
              fileName="conditional-memo.tsx"
              code={`function ConditionalMemo({ items, shouldOptimize }: {
  items: any[];
  shouldOptimize: boolean;
}) {
  // Only use memoization for large datasets
  const processedItems = useMemo(() => {
    if (!shouldOptimize || items.length < 100) {
      // Skip memoization for small datasets
      return items.map(item => ({ ...item, processed: true }));
    }

    console.log('🎯 Using memoization for large dataset');
    return items.map(item => ({
      ...item,
      processed: true,
      expensiveCalculation: heavyComputation(item)
    }));
  }, shouldOptimize ? [items] : [items, Math.random()]); // Conditional deps

  return <div>Processed {processedItems.length} items</div>;
}`}
            />
          </div>

          <div>
            <h3 className="text-2xl font-bold mb-6 text-gray-800">🧪 3. useMemo with Custom Hooks</h3>
            <p className="text-gray-600 mb-6 text-lg">
              Combine useMemo with custom hooks for powerful abstractions
            </p>

            <RawCode
              fileName="custom-hooks-memo.tsx"
              code={`// Custom hook with memoization
function useFilteredData<T>(
  data: T[],
  filterFn: (item: T) => boolean,
  sortFn?: (a: T, b: T) => number
) {
  const filteredData = useMemo(() => {
    console.log('🧪 Filtering data in custom hook');
    let result = data.filter(filterFn);

    if (sortFn) {
      result = result.sort(sortFn);
    }

    return result;
  }, [data, filterFn, sortFn]);

  const stats = useMemo(() => ({
    total: data.length,
    filtered: filteredData.length,
    percentage: (filteredData.length / data.length) * 100
  }), [data.length, filteredData.length]);

  return { filteredData, stats };
}

// Usage
function DataTable({ users }: { users: User[] }) {
  const [minAge, setMinAge] = useState(18);

  const filterFn = useCallback(
    (user: User) => user.age >= minAge,
    [minAge]
  );

  const sortFn = useCallback(
    (a: User, b: User) => a.age - b.age,
    []
  );

  const { filteredData, stats } = useFilteredData(users, filterFn, sortFn);

  return (
    <div>
      <p>Showing {stats.filtered} of {stats.total} users</p>
      {/* Render table */}
    </div>
  );
}`}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

// Examples Section
function ExamplesSection() {
  return (
    <div className="space-y-8">
      <div className="bg-white rounded-lg shadow-lg p-8">
        <h2 className="text-3xl font-bold mb-6 text-center text-orange-700 flex items-center justify-center gap-3">
          <span className="text-4xl">💼</span>
          Ví dụ thực tế
        </h2>

        <div className="space-y-12">
          <div>
            <h3 className="text-2xl font-bold mb-6 text-gray-800">📊 1. Dashboard Analytics</h3>
            <DashboardDemo />
          </div>

          <div>
            <h3 className="text-2xl font-bold mb-6 text-gray-800">🛒 2. E-commerce Product Filter</h3>
            <EcommerceDemo />
          </div>

          <div>
            <h3 className="text-2xl font-bold mb-6 text-gray-800">📈 3. Data Visualization</h3>
            <ChartDemo />
          </div>
        </div>
      </div>
    </div>
  );
}

// Performance Section
function PerformanceSection() {
  return (
    <div className="space-y-8">
      <div className="bg-white rounded-lg shadow-lg p-8">
        <h2 className="text-3xl font-bold mb-6 text-center text-red-700 flex items-center justify-center gap-3">
          <span className="text-4xl">📊</span>
          Performance Analysis
        </h2>

        <PerformanceDemo />
      </div>
    </div>
  );
}

// Patterns Section
function PatternsSection() {
  return (
    <div className="space-y-8">
      <div className="bg-white rounded-lg shadow-lg p-8">
        <h2 className="text-3xl font-bold mb-6 text-center text-indigo-700 flex items-center justify-center gap-3">
          <span className="text-4xl">🎨</span>
          Common Patterns
        </h2>

        <div className="space-y-12">
          <div>
            <h3 className="text-2xl font-bold mb-6 text-gray-800">🔄 1. Derived State Pattern</h3>
            <RawCode
              fileName="derived-state.tsx"
              code={`function UserProfile({ user }: { user: User }) {
  // Derived state with memoization
  const userStats = useMemo(() => ({
    isVIP: user.totalSpent > 10000,
    loyaltyLevel: user.totalSpent > 5000 ? 'Gold' : 'Silver',
    discountRate: user.totalSpent > 10000 ? 0.15 : 0.1,
    nextLevelAmount: user.totalSpent > 5000 ? 10000 - user.totalSpent : 5000 - user.totalSpent
  }), [user.totalSpent]);

  return (
    <div>
      <h2>{user.name}</h2>
      <p>Level: {userStats.loyaltyLevel}</p>
      <p>Discount: {userStats.discountRate * 100}%</p>
    </div>
  );
}`}
            />
          </div>

          <div>
            <h3 className="text-2xl font-bold mb-6 text-gray-800">🎯 2. Selector Pattern</h3>
            <RawCode
              fileName="selector-pattern.tsx"
              code={`// Memoized selectors
function useUserSelectors(users: User[]) {
  const activeUsers = useMemo(
    () => users.filter(user => user.isActive),
    [users]
  );

  const usersByDepartment = useMemo(
    () => users.reduce((acc, user) => {
      acc[user.department] = acc[user.department] || [];
      acc[user.department].push(user);
      return acc;
    }, {} as Record<string, User[]>),
    [users]
  );

  const totalSalary = useMemo(
    () => users.reduce((sum, user) => sum + user.salary, 0),
    [users]
  );

  return { activeUsers, usersByDepartment, totalSalary };
}`}
            />
          </div>

          <div>
            <h3 className="text-2xl font-bold mb-6 text-gray-800">🧩 3. Factory Pattern</h3>
            <RawCode
              fileName="factory-pattern.tsx"
              code={`function ConfigFactory({ type, options }: { type: string, options: any }) {
  const config = useMemo(() => {
    switch (type) {
      case 'development':
        return {
          apiUrl: 'http://localhost:3000',
          debug: true,
          ...options
        };
      case 'production':
        return {
          apiUrl: 'https://api.production.com',
          debug: false,
          ...options
        };
      default:
        return options;
    }
  }, [type, options]);

  return <ConfigProvider config={config} />;
}`}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

// Demo Components
function ExpensiveCalculationDemo() {
  const [count, setCount] = useState(0);
  const [factor, setFactor] = useState(1);

  const expensiveValueWithout = expensiveCalculation(factor);

  const expensiveValueWith = useMemo(() => {
    console.log('🧮 Calculating with useMemo...');
    return expensiveCalculation(factor);
  }, [factor]);

  return (
    <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-6 rounded-lg border border-blue-200 mt-6">
      <h4 className="font-bold text-blue-800 mb-4">🧪 Live Demo: Expensive Calculation</h4>

      <div className="grid grid-cols-2 gap-4 mb-4 text-sm">
        <div>Count: <strong>{count}</strong></div>
        <div>Factor: <strong>{factor}</strong></div>
      </div>

      <div className="flex gap-2 mb-6">
        <button
          onClick={() => setCount(c => c + 1)}
          className="bg-blue-500 text-white px-4 py-2 rounded text-sm hover:bg-blue-600"
        >
          Tăng Count (không ảnh hưởng calculation)
        </button>
        <button
          onClick={() => setFactor(f => f + 1)}
          className="bg-green-500 text-white px-4 py-2 rounded text-sm hover:bg-green-600"
        >
          Tăng Factor (trigger calculation)
        </button>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        <div className="bg-red-50 border border-red-200 p-4 rounded">
          <h5 className="font-bold text-red-700 mb-2">❌ WITHOUT useMemo:</h5>
          <div>Result: <strong>{expensiveValueWithout}</strong></div>
          <div className="text-xs text-red-600 mt-1">Tính lại mỗi render</div>
        </div>
        <div className="bg-green-50 border border-green-200 p-4 rounded">
          <h5 className="font-bold text-green-700 mb-2">✅ WITH useMemo:</h5>
          <div>Result: <strong>{expensiveValueWith}</strong></div>
          <div className="text-xs text-green-600 mt-1">Chỉ tính khi factor thay đổi</div>
        </div>
      </div>
    </div>
  );
}

function FilteringDemo() {
  const [users] = useState<User[]>(generateUsers(1000));
  const [filter, setFilter] = useState('');
  const [count, setCount] = useState(0);

  const filteredUsersWithout = users.filter(user =>
    user.name.toLowerCase().includes(filter.toLowerCase())
  );

  const filteredUsersWith = useMemo(() => {
    console.log('🔍 Filtering users with useMemo...');
    return users.filter(user =>
      user.name.toLowerCase().includes(filter.toLowerCase())
    );
  }, [users, filter]);

  return (
    <div className="bg-gradient-to-br from-green-50 to-emerald-50 p-6 rounded-lg border border-green-200 mt-6">
      <h4 className="font-bold text-green-800 mb-4">🧪 Live Demo: Array Filtering</h4>

      <div className="mb-4">
        <input
          type="text"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          placeholder="Filter users by name..."
          className="w-full px-3 py-2 border rounded-lg"
        />
      </div>

      <div className="flex justify-between items-center mb-4">
        <div>Total Users: <strong>{users.length}</strong></div>
        <div>Filtered: <strong>{filteredUsersWith.length}</strong></div>
        <button
          onClick={() => setCount(c => c + 1)}
          className="bg-blue-500 text-white px-4 py-2 rounded text-sm hover:bg-blue-600"
        >
          Re-render ({count})
        </button>
      </div>

      <div className="text-sm text-gray-600">
        🧪 Type in filter và click "Re-render". Check console - filtering chỉ chạy khi filter thay đổi.
      </div>
    </div>
  );
}

function ObjectMemoDemo() {
  const [count, setCount] = useState(0);
  const [threshold, setThreshold] = useState(10);

  const configWithout = {
    threshold: threshold,
    showDetails: threshold > 5,
    timestamp: Date.now()
  };

  const configWith = useMemo(() => ({
    threshold: threshold,
    showDetails: threshold > 5,
    metadata: 'stable-value'
  }), [threshold]);

  return (
    <div className="bg-gradient-to-br from-purple-50 to-violet-50 p-6 rounded-lg border border-purple-200 mt-6">
      <h4 className="font-bold text-purple-800 mb-4">🧪 Live Demo: Object Memoization</h4>

      <div className="grid grid-cols-2 gap-4 mb-4">
        <div>Count: <strong>{count}</strong></div>
        <div>Threshold: <strong>{threshold}</strong></div>
      </div>

      <div className="flex gap-2 mb-6">
        <button
          onClick={() => setCount(c => c + 1)}
          className="bg-blue-500 text-white px-4 py-2 rounded text-sm hover:bg-blue-600"
        >
          Tăng Count
        </button>
        <button
          onClick={() => setThreshold(t => t + 1)}
          className="bg-green-500 text-white px-4 py-2 rounded text-sm hover:bg-green-600"
        >
          Tăng Threshold
        </button>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <h5 className="font-bold text-red-700 mb-2">❌ WITHOUT useMemo:</h5>
          <ChildComponent config={configWithout} />
        </div>
        <div>
          <h5 className="font-bold text-green-700 mb-2">✅ WITH useMemo:</h5>
          <ChildComponent config={configWith} />
        </div>
      </div>
    </div>
  );
}

function ComplexDependenciesDemo() {
  const [products] = useState<Product[]>(generateProducts(100));
  const [filterType, setFilterType] = useState('all');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
  const [threshold, setThreshold] = useState(50);

  const processedData = useMemo(() => {
    console.log('🔄 Processing complex data...');

    let filtered = products.filter(item => {
      switch (filterType) {
        case 'expensive': return item.price > threshold;
        case 'cheap': return item.price <= threshold;
        case 'inStock': return item.inStock;
        default: return true;
      }
    });

    filtered.sort((a, b) => {
      const multiplier = sortOrder === 'asc' ? 1 : -1;
      return (a.price - b.price) * multiplier;
    });

    return filtered.map(item => ({
      ...item,
      priceCategory: item.price > threshold ? 'Premium' : 'Standard',
      discount: item.price > threshold ? 0.1 : 0.05
    }));
  }, [products, filterType, sortOrder, threshold]);

  return (
    <div className="bg-gradient-to-br from-orange-50 to-red-50 p-6 rounded-lg border border-orange-200 mt-6">
      <h4 className="font-bold text-orange-800 mb-4">🧪 Live Demo: Complex Dependencies</h4>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <select
          value={filterType}
          onChange={(e) => setFilterType(e.target.value)}
          className="px-3 py-2 border rounded"
        >
          <option value="all">All Products</option>
          <option value="expensive">Expensive</option>
          <option value="cheap">Cheap</option>
          <option value="inStock">In Stock</option>
        </select>

        <select
          value={sortOrder}
          onChange={(e) => setSortOrder(e.target.value as 'asc' | 'desc')}
          className="px-3 py-2 border rounded"
        >
          <option value="asc">Price: Low to High</option>
          <option value="desc">Price: High to Low</option>
        </select>

        <input
          type="range"
          min="10"
          max="100"
          value={threshold}
          onChange={(e) => setThreshold(Number(e.target.value))}
          className="px-3 py-2"
        />

        <div className="text-sm">Threshold: ${threshold}</div>
      </div>

      <div className="text-center p-4 bg-white rounded border">
        <p className="text-lg font-bold">Processed {processedData.length} products</p>
        <p className="text-sm text-gray-600">Check console để xem khi nào processing chạy</p>
      </div>
    </div>
  );
}

function DashboardDemo() {
  const [data] = useState(generateAnalyticsData());
  const [dateRange, setDateRange] = useState(30);
  const [metric, setMetric] = useState('revenue');

  const analytics = useMemo(() => {
    console.log('📊 Computing analytics...');
    const filtered = data.filter(d => d.date >= Date.now() - dateRange * 24 * 60 * 60 * 1000);

    return {
      total: filtered.reduce((sum, d) => sum + d[metric], 0),
      average: filtered.reduce((sum, d) => sum + d[metric], 0) / filtered.length,
      growth: calculateGrowth(filtered, metric),
      trend: calculateTrend(filtered, metric)
    };
  }, [data, dateRange, metric]);

  return (
    <div className="bg-gradient-to-br from-blue-50 to-cyan-50 p-6 rounded-lg border border-blue-200">
      <h4 className="font-bold text-blue-800 mb-4">📊 Dashboard Analytics</h4>

      <div className="grid grid-cols-2 gap-4 mb-6">
        <select
          value={dateRange}
          onChange={(e) => setDateRange(Number(e.target.value))}
          className="px-3 py-2 border rounded"
        >
          <option value={7}>Last 7 days</option>
          <option value={30}>Last 30 days</option>
          <option value={90}>Last 90 days</option>
        </select>

        <select
          value={metric}
          onChange={(e) => setMetric(e.target.value)}
          className="px-3 py-2 border rounded"
        >
          <option value="revenue">Revenue</option>
          <option value="users">Users</option>
          <option value="orders">Orders</option>
        </select>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded shadow">
          <div className="text-sm text-gray-600">Total {metric}</div>
          <div className="text-2xl font-bold">{analytics.total.toLocaleString()}</div>
        </div>
        <div className="bg-white p-4 rounded shadow">
          <div className="text-sm text-gray-600">Average</div>
          <div className="text-2xl font-bold">{Math.round(analytics.average).toLocaleString()}</div>
        </div>
        <div className="bg-white p-4 rounded shadow">
          <div className="text-sm text-gray-600">Growth</div>
          <div className="text-2xl font-bold text-green-600">+{analytics.growth}%</div>
        </div>
        <div className="bg-white p-4 rounded shadow">
          <div className="text-sm text-gray-600">Trend</div>
          <div className="text-2xl font-bold">{analytics.trend}</div>
        </div>
      </div>
    </div>
  );
}

function EcommerceDemo() {
  const [products] = useState<Product[]>(generateProducts(50));
  const [filters, setFilters] = useState({
    category: 'all',
    minPrice: 0,
    maxPrice: 100,
    inStock: false
  });

  const filteredProducts = useMemo(() => {
    console.log('🛒 Filtering products...');
    return products.filter(product => {
      if (filters.category !== 'all' && product.category !== filters.category) return false;
      if (product.price < filters.minPrice || product.price > filters.maxPrice) return false;
      if (filters.inStock && !product.inStock) return false;
      return true;
    });
  }, [products, filters]);

  return (
    <div className="bg-gradient-to-br from-green-50 to-teal-50 p-6 rounded-lg border border-green-200">
      <h4 className="font-bold text-green-800 mb-4">🛒 Product Filter</h4>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <select
          value={filters.category}
          onChange={(e) => setFilters(f => ({ ...f, category: e.target.value }))}
          className="px-3 py-2 border rounded"
        >
          <option value="all">All Categories</option>
          <option value="electronics">Electronics</option>
          <option value="clothing">Clothing</option>
          <option value="books">Books</option>
        </select>

        <input
          type="range"
          min="0"
          max="100"
          value={filters.minPrice}
          onChange={(e) => setFilters(f => ({ ...f, minPrice: Number(e.target.value) }))}
        />

        <input
          type="range"
          min="0"
          max="100"
          value={filters.maxPrice}
          onChange={(e) => setFilters(f => ({ ...f, maxPrice: Number(e.target.value) }))}
        />

        <label className="flex items-center">
          <input
            type="checkbox"
            checked={filters.inStock}
            onChange={(e) => setFilters(f => ({ ...f, inStock: e.target.checked }))}
            className="mr-2"
          />
          In Stock Only
        </label>
      </div>

      <div className="bg-white p-4 rounded shadow">
        <p className="text-lg font-bold">
          Found {filteredProducts.length} products
        </p>
        <p className="text-sm text-gray-600">
          Price range: ${filters.minPrice} - ${filters.maxPrice}
        </p>
      </div>
    </div>
  );
}

function ChartDemo() {
  const [rawData] = useState(generateChartData());
  const [chartType, setChartType] = useState('bar');
  const [groupBy, setGroupBy] = useState('category');

  const chartData = useMemo(() => {
    console.log('📈 Processing chart data...');
    const grouped = rawData.reduce((acc, item) => {
      const key = item[groupBy];
      acc[key] = (acc[key] || 0) + item.value;
      return acc;
    }, {} as Record<string, number>);

    return Object.entries(grouped).map(([label, value]) => ({
      label,
      value,
      color: getRandomColor()
    }));
  }, [rawData, groupBy]);

  return (
    <div className="bg-gradient-to-br from-purple-50 to-pink-50 p-6 rounded-lg border border-purple-200">
      <h4 className="font-bold text-purple-800 mb-4">📈 Data Visualization</h4>

      <div className="grid grid-cols-2 gap-4 mb-6">
        <select
          value={chartType}
          onChange={(e) => setChartType(e.target.value)}
          className="px-3 py-2 border rounded"
        >
          <option value="bar">Bar Chart</option>
          <option value="pie">Pie Chart</option>
          <option value="line">Line Chart</option>
        </select>

        <select
          value={groupBy}
          onChange={(e) => setGroupBy(e.target.value)}
          className="px-3 py-2 border rounded"
        >
          <option value="category">Group by Category</option>
          <option value="region">Group by Region</option>
          <option value="month">Group by Month</option>
        </select>
      </div>

      <div className="bg-white p-4 rounded shadow">
        <div className="space-y-2">
          {chartData.map((item, index) => (
            <div key={index} className="flex items-center justify-between">
              <span className="font-medium">{item.label}</span>
              <div className="flex items-center gap-2">
                <div
                  className="w-4 h-4 rounded"
                  style={{ backgroundColor: item.color }}
                ></div>
                <span className="font-bold">{item.value}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function PerformanceDemo() {
  const [iterations, setIterations] = useState(10000);
  const [withMemo, setWithMemo] = useState(true);
  const [results, setResults] = useState<{ withMemo: number; withoutMemo: number } | null>(null);

  const runPerformanceTest = () => {
    // Test without useMemo
    const startWithout = performance.now();
    for (let i = 0; i < 100; i++) {
      expensiveCalculation(iterations);
    }
    const timeWithout = performance.now() - startWithout;

    // Test with useMemo (simulate by caching)
    const startWith = performance.now();
    let cached = expensiveCalculation(iterations);
    for (let i = 0; i < 100; i++) {
      // Return cached value
      cached;
    }
    const timeWith = performance.now() - startWith;

    setResults({
      withoutMemo: Math.round(timeWithout),
      withMemo: Math.round(timeWith)
    });
  };

  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-br from-red-50 to-orange-50 p-6 rounded-lg border border-red-200">
        <h4 className="font-bold text-red-800 mb-4">⚡ Performance Comparison</h4>

        <div className="grid grid-cols-2 gap-4 mb-6">
          <div>
            <label className="block text-sm font-medium mb-2">Iterations:</label>
            <input
              type="range"
              min="1000"
              max="50000"
              step="1000"
              value={iterations}
              onChange={(e) => setIterations(Number(e.target.value))}
              className="w-full"
            />
            <div className="text-sm text-gray-600">{iterations.toLocaleString()}</div>
          </div>

          <div className="flex items-end">
            <button
              onClick={runPerformanceTest}
              className="bg-red-500 text-white px-6 py-2 rounded hover:bg-red-600 font-semibold"
            >
              🚀 Run Test
            </button>
          </div>
        </div>

        {results && (
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-red-100 p-4 rounded border border-red-300">
              <h5 className="font-bold text-red-800 mb-2">❌ Without useMemo:</h5>
              <div className="text-2xl font-bold">{results.withoutMemo}ms</div>
              <div className="text-sm text-red-600">Calculates every time</div>
            </div>
            <div className="bg-green-100 p-4 rounded border border-green-300">
              <h5 className="font-bold text-green-800 mb-2">✅ With useMemo:</h5>
              <div className="text-2xl font-bold">{results.withMemo}ms</div>
              <div className="text-sm text-green-600">Uses cached value</div>
            </div>
          </div>
        )}

        {results && (
          <div className="mt-4 p-4 bg-yellow-50 border border-yellow-300 rounded">
            <p className="text-yellow-800 font-semibold">
              🎯 Performance improvement: {Math.round((results.withoutMemo / results.withMemo) * 100)}% faster with useMemo!
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

// Child Component for Object Demo
const ChildComponent = memo(({ config }: { config: any }) => {
  console.log('👶 Child component render');
  return (
    <div className="bg-blue-50 p-3 rounded border">
      <div className="text-sm">
        <strong>Config:</strong> {JSON.stringify(config, null, 2)}
      </div>
      <div className="text-xs text-gray-600 mt-1">
        Check console để xem child có re-render không
      </div>
    </div>
  );
});

// Helper Functions
function expensiveCalculation(num: number): number {
  let result = 0;
  for (let i = 0; i < num; i++) {
    result += Math.sqrt(i) * Math.random();
  }
  return Math.round(result);
}

function generateUsers(count: number): User[] {
  const departments = ['Engineering', 'Marketing', 'Sales', 'HR', 'Finance'];
  const cities = ['Hanoi', 'HCMC', 'Danang', 'Haiphong', 'Can Tho'];

  return Array.from({ length: count }, (_, i) => ({
    id: i + 1,
    name: `User ${i + 1}`,
    age: 20 + (i % 50),
    city: cities[i % cities.length],
    salary: 30000 + (i % 70000),
    department: departments[i % departments.length],
    isActive: Math.random() > 0.3
  }));
}

function generateProducts(count: number): Product[] {
  const categories = ['electronics', 'clothing', 'books', 'sports'];

  return Array.from({ length: count }, (_, i) => ({
    id: i + 1,
    name: `Product ${i + 1}`,
    price: Math.round(Math.random() * 100),
    category: categories[i % categories.length],
    rating: Math.round(Math.random() * 5),
    inStock: Math.random() > 0.2
  }));
}

function generateAnalyticsData() {
  return Array.from({ length: 100 }, (_, i) => ({
    date: Date.now() - i * 24 * 60 * 60 * 1000,
    revenue: Math.round(Math.random() * 10000),
    users: Math.round(Math.random() * 1000),
    orders: Math.round(Math.random() * 100)
  }));
}

function generateChartData() {
  const categories = ['A', 'B', 'C', 'D'];
  const regions = ['North', 'South', 'East', 'West'];
  const months = ['Jan', 'Feb', 'Mar', 'Apr'];

  return Array.from({ length: 50 }, (_, i) => ({
    category: categories[i % categories.length],
    region: regions[i % regions.length],
    month: months[i % months.length],
    value: Math.round(Math.random() * 100)
  }));
}

function calculateGrowth(data: any[], metric: string): number {
  if (data.length < 2) return 0;
  const latest = data[0][metric];
  const previous = data[1][metric];
  return Math.round(((latest - previous) / previous) * 100);
}

function calculateTrend(data: any[], metric: string): string {
  if (data.length < 3) return 'Stable';
  const recent = data.slice(0, 3).map(d => d[metric]);
  const avg = recent.reduce((a, b) => a + b, 0) / recent.length;
  return recent[0] > avg * 1.1 ? 'Up' : recent[0] < avg * 0.9 ? 'Down' : 'Stable';
}

function getRandomColor(): string {
  const colors = ['#3B82F6', '#EF4444', '#10B981', '#F59E0B', '#8B5CF6', '#06B6D4'];
  return colors[Math.floor(Math.random() * colors.length)];
}
