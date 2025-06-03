'use client';

import {Badge} from '@/components/ui/badge';
import {Button} from '@/components/ui/button';
import {Card, CardContent} from '@/components/ui/card';
import {Tabs, TabsContent, TabsList, TabsTrigger} from '@/components/ui/tabs';
import {
  Check,
  ChevronDown,
  ChevronUp,
  Code2,
  Copy,
  Pause,
  Play,
  RotateCcw,
  Sparkles,
  Zap,
} from 'lucide-react';
import {useEffect, useState} from 'react';
import Link from 'next/link';

// Interface cho props của RawCode
interface RawCodeProps {
  code: string;
  fileName?: string;
  language?: string;
}

// Interface cho props của UserProfile
interface User {
  id: number;
  name: string;
  email: string;
}

interface UserProfileProps {
  userId: number;
}

// Interface cho props của Countdown
interface CountdownProps {
  initialMinutes?: number;
  initialSeconds?: number;
}

// Interface cho Post data
interface Post {
  id: number;
  title: string;
  views: number;
  likes: number;
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
    <div
      className="mt-8 mb-10 border-0 rounded-2xl overflow-hidden shadow-2xl bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      {/* Terminal Header */}
      <div
        className="flex items-center justify-between px-6 py-4 bg-gradient-to-r from-slate-700 via-slate-600 to-slate-700 border-b border-slate-500/30">
        <div className="flex items-center space-x-4">
          <div className="flex space-x-2">
            <div
              className="w-3.5 h-3.5 rounded-full bg-red-500 shadow-lg hover:bg-red-400 transition-colors cursor-pointer"></div>
            <div
              className="w-3.5 h-3.5 rounded-full bg-yellow-500 shadow-lg hover:bg-yellow-400 transition-colors cursor-pointer"></div>
            <div
              className="w-3.5 h-3.5 rounded-full bg-green-500 shadow-lg hover:bg-green-400 transition-colors cursor-pointer"></div>
          </div>
          <div className="flex items-center space-x-3">
            <Code2 className="h-4 w-4 text-slate-300"/>
            <span className="text-sm font-bold text-slate-200 tracking-wide">{fileName}</span>
            <Badge
              variant="outline"
              className="text-xs px-3 py-1 bg-blue-500/20 border-blue-400/50 text-blue-200 font-mono"
            >
              {language}
            </Badge>
          </div>
        </div>

        <div className="flex items-center space-x-2">
          {isShown && (
            <Button
              size="sm"
              variant="ghost"
              className="h-8 px-3 text-slate-300 hover:text-white hover:bg-slate-600/50 transition-all duration-200 border border-slate-500/30 hover:border-slate-400/50"
              onClick={copyToClipboard}
            >
              {copied ? (
                <>
                  <Check className="h-3.5 w-3.5 mr-2 text-green-400"/>
                  <span className="text-xs font-semibold">Copied!</span>
                </>
              ) : (
                <>
                  <Copy className="h-3.5 w-3.5 mr-2"/>
                  <span className="text-xs font-semibold">Copy</span>
                </>
              )}
            </Button>
          )}

          <Button
            size="sm"
            variant="ghost"
            className="h-8 px-3 text-slate-300 hover:text-white hover:bg-slate-600/50 transition-all duration-200 border border-slate-500/30 hover:border-slate-400/50"
            onClick={() => setIsShown(!isShown)}
          >
            {isShown ? (
              <>
                <ChevronUp className="h-3.5 w-3.5 mr-2"/>
                <span className="text-xs font-semibold">Hide</span>
              </>
            ) : (
              <>
                <ChevronDown className="h-3.5 w-3.5 mr-2"/>
                <span className="text-xs font-semibold">Show</span>
              </>
            )}
          </Button>
        </div>
      </div>

      {/* Code block */}
      {isShown && (
        <div className="relative bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
          <pre
            className="p-6 overflow-x-auto text-sm font-mono leading-relaxed max-h-[700px] text-slate-100 selection:bg-blue-500/30">
            <code className="language-tsx">{code}</code>
          </pre>
          <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-slate-900/20 to-transparent"></div>
        </div>
      )}
    </div>
  );
}

export default function UseEffectPage() {
  const [activeTab, setActiveTab] = useState('intro');

  return (
    <div
      className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/50 to-purple-50/50 dark:from-slate-950 dark:via-blue-950/50 dark:to-purple-950/50">
      {/* Hero Header */}
      <div
        className="relative bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-white py-24 px-4 mb-16 shadow-2xl overflow-hidden">
        {/* Animated background patterns */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-10 left-10 w-20 h-20 bg-white/10 rounded-full animate-pulse"></div>
          <div className="absolute top-32 right-20 w-32 h-32 bg-white/5 rounded-full animate-bounce"></div>
          <div className="absolute bottom-20 left-1/4 w-16 h-16 bg-white/10 rounded-full animate-ping"></div>
        </div>

        <div className="container mx-auto max-w-7xl relative z-10">
          <div className="flex items-center gap-3 mb-8">
            <div
              className="w-12 h-12 bg-white/20 backdrop-blur-md rounded-2xl flex items-center justify-center border border-white/30">
              <Zap className="h-6 w-6 text-white"/>
            </div>
            <Badge
              className="bg-white/20 backdrop-blur-md text-white hover:bg-white/30 border-white/30 px-4 py-2 text-sm font-bold">
              🎣 React Hooks
            </Badge>
          </div>

          <h1 className="text-6xl sm:text-7xl font-black mb-8 leading-tight">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-white via-blue-100 to-purple-100">
              useEffect
            </span>
            <div className="text-4xl sm:text-5xl mt-2 font-light text-white/90">
              Side Effects Hook
            </div>
          </h1>

          <p className="text-xl text-white/90 max-w-4xl leading-relaxed font-medium">
            🚀 Khám phá useEffect - Hook mạnh mẽ nhất để quản lý các side effects, lifecycle methods
            và tương tác với thế giới bên ngoài React components
          </p>

          <div className="flex items-center gap-4 mt-8">
            <Sparkles className="h-5 w-5 text-yellow-300 animate-pulse"/>
            <span className="text-white/80 text-sm font-medium">
              Từ cơ bản đến nâng cao với các ví dụ thực tế
            </span>
          </div>
        </div>
      </div>

      <div className="container mx-auto max-w-7xl px-4 pb-32">
        <Tabs defaultValue="intro" value={activeTab} onValueChange={setActiveTab}>
          {/* Enhanced Tabs */}
          <TabsList
            className="bg-white/95 dark:bg-slate-800/95 backdrop-blur-xl p-3 shadow-2xl rounded-3xl border border-slate-200/50 dark:border-slate-700/50 mb-16 grid grid-cols-6 gap-2">
            <TabsTrigger
              value="intro"
              className="rounded-2xl data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500 data-[state=active]:to-indigo-500 data-[state=active]:text-white data-[state=active]:shadow-xl transition-all duration-300 font-semibold py-3"
            >
              <span className="text-base">📚</span>
              <span className="ml-2 hidden sm:inline">Giới thiệu</span>
            </TabsTrigger>
            <TabsTrigger
              value="basic"
              className="rounded-2xl data-[state=active]:bg-gradient-to-r data-[state=active]:from-green-500 data-[state=active]:to-emerald-500 data-[state=active]:text-white data-[state=active]:shadow-xl transition-all duration-300 font-semibold py-3"
            >
              <span className="text-base">🎯</span>
              <span className="ml-2 hidden sm:inline">Cơ bản</span>
            </TabsTrigger>
            <TabsTrigger
              value="dependency"
              className="rounded-2xl data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-500 data-[state=active]:to-violet-500 data-[state=active]:text-white data-[state=active]:shadow-xl transition-all duration-300 font-semibold py-3"
            >
              <span className="text-base">🔗</span>
              <span className="ml-2 hidden sm:inline">Dependencies</span>
            </TabsTrigger>
            <TabsTrigger
              value="cleanup"
              className="rounded-2xl data-[state=active]:bg-gradient-to-r data-[state=active]:from-orange-500 data-[state=active]:to-red-500 data-[state=active]:text-white data-[state=active]:shadow-xl transition-all duration-300 font-semibold py-3"
            >
              <span className="text-base">🧹</span>
              <span className="ml-2 hidden sm:inline">Cleanup</span>
            </TabsTrigger>
            <TabsTrigger
              value="examples"
              className="rounded-2xl data-[state=active]:bg-gradient-to-r data-[state=active]:from-pink-500 data-[state=active]:to-rose-500 data-[state=active]:text-white data-[state=active]:shadow-xl transition-all duration-300 font-semibold py-3"
            >
              <span className="text-base">🚀</span>
              <span className="ml-2 hidden sm:inline">Thực tế</span>
            </TabsTrigger>

            {/*  LInk to useEffect/exmaple*/}
            <Link
              href="/useEffect/examples"
              className="rounded-2xl bg-gradient-to-r from-teal-500 to-cyan-500 text-white shadow-xl transition-all duration-300 font-semibold py-3 flex items-center justify-center hover:scale-105 mb-4"
            >
              <span className="text-base">🌟</span>
              <span className="ml-2 hidden sm:inline">Ví dụ</span>
            </Link>
          </TabsList>

          {/* Tab Contents */}
          <TabsContent value="intro">
            <Card
              className="border-0 shadow-2xl bg-white/98 dark:bg-slate-800/98 backdrop-blur-md rounded-3xl overflow-hidden">
              <CardContent className="p-12">
                <div className="flex items-center gap-6 mb-10">
                  <div
                    className="w-16 h-16 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-3xl flex items-center justify-center shadow-xl">
                    <span className="text-3xl">🎣</span>
                  </div>
                  <div>
                    <h2 className="text-4xl font-black text-slate-900 dark:text-white mb-2">
                      useEffect là gì?
                    </h2>
                    <p className="text-slate-600 dark:text-slate-400 text-lg">
                      Hook để quản lý side effects trong React
                    </p>
                  </div>
                </div>

                <div className="prose prose-xl max-w-none dark:prose-invert mb-12">
                  <p className="text-slate-700 dark:text-slate-300 text-xl leading-relaxed">
                    <code
                      className="bg-gradient-to-r from-blue-100 to-indigo-100 dark:from-blue-900/60 dark:to-indigo-900/60 px-3 py-2 rounded-lg text-blue-800 dark:text-blue-200 font-bold text-lg">
                      useEffect
                    </code>{' '}
                    là một Hook trong React cho phép bạn thực hiện các{' '}
                    <span className="font-bold text-purple-600 dark:text-purple-400">
                      side effects
                    </span>{' '}
                    trong functional components. Side effects là những hoạt động không liên quan
                    trực tiếp đến việc render giao diện người dùng.
                  </p>
                </div>

                <div className="grid lg:grid-cols-2 gap-8 mb-12">
                  <div
                    className="bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-blue-900/30 dark:via-indigo-900/30 dark:to-purple-900/30 p-8 rounded-3xl border border-blue-200/60 dark:border-blue-800/60 shadow-xl">
                    <h4 className="font-black text-blue-800 dark:text-blue-300 mb-6 flex items-center gap-3 text-xl">
                      <span className="text-2xl">🔄</span> Side Effects phổ biến
                    </h4>
                    <ul className="space-y-4 text-slate-700 dark:text-slate-300">
                      <li className="flex items-center gap-3 p-3 bg-white/60 dark:bg-slate-800/60 rounded-xl">
                        <span className="text-xl">📡</span>
                        <span className="font-semibold">Gọi API / fetch dữ liệu</span>
                      </li>
                      <li className="flex items-center gap-3 p-3 bg-white/60 dark:bg-slate-800/60 rounded-xl">
                        <span className="text-xl">👂</span>
                        <span className="font-semibold">Đăng ký event listeners</span>
                      </li>
                      <li className="flex items-center gap-3 p-3 bg-white/60 dark:bg-slate-800/60 rounded-xl">
                        <span className="text-xl">🎯</span>
                        <span className="font-semibold">Thao tác trực tiếp với DOM</span>
                      </li>
                      <li className="flex items-center gap-3 p-3 bg-white/60 dark:bg-slate-800/60 rounded-xl">
                        <span className="text-xl">⏰</span>
                        <span className="font-semibold">Thiết lập timers/intervals</span>
                      </li>
                      <li className="flex items-center gap-3 p-3 bg-white/60 dark:bg-slate-800/60 rounded-xl">
                        <span className="text-xl">📝</span>
                        <span className="font-semibold">Logging và analytics</span>
                      </li>
                    </ul>
                  </div>

                  <div
                    className="bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 dark:from-green-900/30 dark:via-emerald-900/30 dark:to-teal-900/30 p-8 rounded-3xl border border-green-200/60 dark:border-green-800/60 shadow-xl">
                    <h4 className="font-black text-green-800 dark:text-green-300 mb-6 flex items-center gap-3 text-xl">
                      <span className="text-2xl">🔄</span> Lifecycle tương đương
                    </h4>
                    <ul className="space-y-4 text-slate-700 dark:text-slate-300">
                      <li className="flex items-center gap-3 p-3 bg-white/60 dark:bg-slate-800/60 rounded-xl">
                        <span className="text-xl">🟢</span>
                        <code className="text-sm font-bold bg-green-100 dark:bg-green-900/50 px-2 py-1 rounded">
                          componentDidMount
                        </code>
                      </li>
                      <li className="flex items-center gap-3 p-3 bg-white/60 dark:bg-slate-800/60 rounded-xl">
                        <span className="text-xl">🔄</span>
                        <code className="text-sm font-bold bg-blue-100 dark:bg-blue-900/50 px-2 py-1 rounded">
                          componentDidUpdate
                        </code>
                      </li>
                      <li className="flex items-center gap-3 p-3 bg-white/60 dark:bg-slate-800/60 rounded-xl">
                        <span className="text-xl">🔴</span>
                        <code className="text-sm font-bold bg-red-100 dark:bg-red-900/50 px-2 py-1 rounded">
                          componentWillUnmount
                        </code>
                      </li>
                    </ul>
                  </div>
                </div>

                <RawCode
                  fileName="useEffect-basic.tsx"
                  language="tsx"
                  code={`useEffect(() => {
  // Code thực hiện side effect ở đây
  console.log('Effect đã chạy');

  // Optional: Hàm cleanup
  return () => {
    console.log('Cleanup trước khi effect chạy lại hoặc component unmount');
  };
}, [/* dependency array - mảng phụ thuộc */]);`}
                />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="basic">
            <Card
              className="border-0 shadow-2xl bg-white/98 dark:bg-slate-800/98 backdrop-blur-md rounded-3xl overflow-hidden">
              <CardContent className="p-12">
                <div className="flex items-center gap-6 mb-10">
                  <div
                    className="w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-600 rounded-3xl flex items-center justify-center shadow-xl">
                    <span className="text-3xl">🎯</span>
                  </div>
                  <div>
                    <h2 className="text-4xl font-black text-slate-900 dark:text-white mb-2">
                      Sử dụng useEffect cơ bản
                    </h2>
                    <p className="text-slate-600 dark:text-slate-400 text-lg">
                      Hiểu về dependency array và lifecycle
                    </p>
                  </div>
                </div>

                <div className="space-y-16">
                  <div>
                    <h3 className="text-3xl font-black mb-6 text-slate-900 dark:text-white flex items-center gap-3">
                      <span className="text-2xl">🔄</span> Effect chạy sau mỗi lần render
                    </h3>
                    <p className="text-slate-700 dark:text-slate-300 mb-8 text-xl leading-relaxed">
                      Khi không có dependency array, effect sẽ chạy sau mỗi lần component render.
                    </p>

                    <RawCode
                      fileName="effect-every-render.tsx"
                      language="tsx"
                      code={`import { useState, useEffect } from 'react';

function ExampleComponent() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    // Chạy sau mỗi lần render
    console.log('Component đã render, count =', count);
  });

  return (
    <div>
      <p>Bạn đã click {count} lần</p>
      <button onClick={() => setCount(count + 1)}>
        Click tôi
      </button>
    </div>
  );
}`}
                    />
                  </div>

                  <div>
                    <h3 className="text-3xl font-black mb-6 text-slate-900 dark:text-white flex items-center gap-3">
                      <span className="text-2xl">🎯</span> Effect chỉ chạy một lần
                      (componentDidMount)
                    </h3>
                    <p className="text-slate-700 dark:text-slate-300 mb-8 text-xl leading-relaxed">
                      Với dependency array rỗng{' '}
                      <code className="bg-slate-200 dark:bg-slate-700 px-3 py-2 rounded-lg font-bold">
                        []
                      </code>
                      , effect chỉ chạy sau lần render đầu tiên.
                    </p>

                    <RawCode
                      fileName="effect-mount-only.tsx"
                      language="tsx"
                      code={`import { useState, useEffect } from 'react';

function FetchDataOnMount() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Chỉ chạy sau lần render đầu tiên
    async function fetchData() {
      try {
        const response = await fetch('https://api.example.com/data');
        const result = await response.json();
        setData(result);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []); // Mảng phụ thuộc rỗng

  if (loading) return <div>Đang tải dữ liệu...</div>;

  return (
    <div>
      <h2>Dữ liệu:</h2>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
}`}
                    />
                  </div>

                  <BasicEffectDemo/>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="dependency">
            <Card
              className="border-0 shadow-2xl bg-white/98 dark:bg-slate-800/98 backdrop-blur-md rounded-3xl overflow-hidden">
              <CardContent className="p-12">
                <div className="flex items-center gap-6 mb-10">
                  <div
                    className="w-16 h-16 bg-gradient-to-br from-purple-500 to-violet-600 rounded-3xl flex items-center justify-center shadow-xl">
                    <span className="text-3xl">🔗</span>
                  </div>
                  <div>
                    <h2 className="text-4xl font-black text-slate-900 dark:text-white mb-2">
                      Dependency Array
                    </h2>
                    <p className="text-slate-600 dark:text-slate-400 text-lg">
                      Kiểm soát khi nào effect được thực thi
                    </p>
                  </div>
                </div>

                <p className="text-xl text-slate-700 dark:text-slate-300 mb-12 leading-relaxed">
                  Mảng phụ thuộc là tham số thứ hai của useEffect, quyết định khi nào effect sẽ được
                  thực thi lại.
                </p>

                <div className="grid gap-8 mb-16">
                  <div
                    className="bg-gradient-to-br from-blue-50 via-blue-100 to-indigo-100 dark:from-blue-900/40 dark:via-blue-800/40 dark:to-indigo-800/40 p-8 rounded-3xl border border-blue-300/60 dark:border-blue-600/60 shadow-xl">
                    <h4 className="font-black mb-6 text-blue-800 dark:text-blue-300 flex items-center gap-3 text-xl">
                      <span className="text-2xl">🔄</span> Không có mảng phụ thuộc
                    </h4>
                    <RawCode
                      fileName="no-dependency.tsx"
                      language="tsx"
                      code={`useEffect(() => {
  // Effect này sẽ chạy sau mỗi lần render
  console.log('Chạy sau mỗi render');
});`}
                    />
                  </div>

                  <div
                    className="bg-gradient-to-br from-green-50 via-green-100 to-emerald-100 dark:from-green-900/40 dark:via-green-800/40 dark:to-emerald-800/40 p-8 rounded-3xl border border-green-300/60 dark:border-green-600/60 shadow-xl">
                    <h4 className="font-black mb-6 text-green-800 dark:text-green-300 flex items-center gap-3 text-xl">
                      <span className="text-2xl">🎯</span> Mảng phụ thuộc rỗng
                    </h4>
                    <RawCode
                      fileName="empty-dependency.tsx"
                      language="tsx"
                      code={`useEffect(() => {
  // Effect này chỉ chạy một lần sau lần render đầu tiên
  // (tương tự componentDidMount)
  console.log('Chỉ chạy một lần');
}, []);`}
                    />
                  </div>

                  <div
                    className="bg-gradient-to-br from-purple-50 via-purple-100 to-violet-100 dark:from-purple-900/40 dark:via-purple-800/40 dark:to-violet-800/40 p-8 rounded-3xl border border-purple-300/60 dark:border-purple-600/60 shadow-xl">
                    <h4
                      className="font-black mb-6 text-purple-800 dark:text-purple-300 flex items-center gap-3 text-xl">
                      <span className="text-2xl">🎛️</span> Mảng phụ thuộc có giá trị
                    </h4>
                    <RawCode
                      fileName="with-dependency.tsx"
                      language="tsx"
                      code={`useEffect(() => {
  // Effect này chạy khi một trong các giá trị
  // trong mảng phụ thuộc thay đổi
  console.log('Dependency thay đổi');
}, [prop1, state2]);`}
                    />
                  </div>
                </div>

                <RawCode
                  fileName="search-component.tsx"
                  language="tsx"
                  code={`import { useState, useEffect } from 'react';

function SearchComponent() {
  const [searchTerm, setSearchTerm] = useState('');
  const [results, setResults] = useState([]);

  useEffect(() => {
    // Effect chỉ chạy khi searchTerm thay đổi
    if (searchTerm.length === 0) {
      setResults([]);
      return;
    }

    // Giả định hàm tìm kiếm
    const fetchResults = async () => {
      const response = await fetch(
        \`https://api.example.com/search?q=\${searchTerm}\`
      );
      const data = await response.json();
      setResults(data.results);
    };

    // Thêm debounce để tránh gọi API quá nhiều
    const timerId = setTimeout(fetchResults, 500);

    // Cleanup function để hủy timer nếu searchTerm thay đổi nhanh
    return () => clearTimeout(timerId);
  }, [searchTerm]); // Chỉ chạy lại khi searchTerm thay đổi

  return (
    <div>
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="Tìm kiếm..."
        className="border border-gray-300 rounded px-3 py-2"
      />
      <ul className="mt-4">
        {results.map(item => (
          <li key={item.id} className="py-1">{item.name}</li>
        ))}
      </ul>
    </div>
  );
}`}
                />

                <DependencyDemo/>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="cleanup">
            <Card
              className="border-0 shadow-2xl bg-white/98 dark:bg-slate-800/98 backdrop-blur-md rounded-3xl overflow-hidden">
              <CardContent className="p-12">
                <div className="flex items-center gap-6 mb-10">
                  <div
                    className="w-16 h-16 bg-gradient-to-br from-orange-500 to-red-600 rounded-3xl flex items-center justify-center shadow-xl">
                    <span className="text-3xl">🧹</span>
                  </div>
                  <div>
                    <h2 className="text-4xl font-black text-slate-900 dark:text-white mb-2">
                      Cleanup Function
                    </h2>
                    <p className="text-slate-600 dark:text-slate-400 text-lg">
                      Dọn dẹp resources và memory leaks
                    </p>
                  </div>
                </div>

                <div
                  className="bg-gradient-to-r from-amber-50 via-orange-50 to-red-50 dark:from-amber-900/30 dark:via-orange-900/30 dark:to-red-900/30 p-8 rounded-3xl border border-amber-300/60 dark:border-amber-600/60 mb-12 shadow-xl">
                  <p className="text-amber-800 dark:text-amber-300 font-bold text-xl flex items-center gap-3">
                    <span className="text-2xl">💡</span>
                    <span>
                      <strong>Cleanup function</strong> là một hàm được trả về từ effect callback,
                      giúp bạn "dọn dẹp" trước khi component unmount hoặc trước khi effect chạy lại.
                    </span>
                  </p>
                </div>

                <div className="space-y-12">
                  <div>
                    <h3 className="text-2xl font-black mb-8 text-slate-900 dark:text-white">
                      🕐 Khi nào cleanup function được gọi?
                    </h3>
                    <div className="grid md:grid-cols-2 gap-6">
                      <div
                        className="bg-gradient-to-br from-red-50 to-rose-100 dark:from-red-900/30 dark:to-rose-900/30 p-6 rounded-2xl border border-red-300/60 dark:border-red-600/60 shadow-lg">
                        <span className="text-red-600 dark:text-red-400 font-black text-lg flex items-center gap-2">
                          <span className="text-xl">📤</span> Trước khi component unmount
                        </span>
                      </div>
                      <div
                        className="bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-blue-900/30 dark:to-indigo-900/30 p-6 rounded-2xl border border-blue-300/60 dark:border-blue-600/60 shadow-lg">
                        <span className="text-blue-600 dark:text-blue-400 font-black text-lg flex items-center gap-2">
                          <span className="text-xl">🔄</span> Trước khi effect chạy lại
                        </span>
                      </div>
                    </div>
                  </div>

                  <RawCode
                    fileName="cleanup-basic.tsx"
                    language="tsx"
                    code={`useEffect(() => {
  // 1. Effect code
  console.log('Effect đã chạy');

  // 2. Cleanup function
  return () => {
    console.log('Cleanup');
    // Dọn dẹp resources: hủy subscriptions, clear timers, etc.
  };
}, [dependency]);`}
                  />

                  <RawCode
                    fileName="window-resize-listener.tsx"
                    language="tsx"
                    code={`import { useState, useEffect } from 'react';

// Tìm và thay thế WindowResizeListener component

function WindowResizeListener() {
  const [windowWidth, setWindowWidth] = useState(0); // Luôn bắt đầu với 0
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    setWindowWidth(window.innerWidth);

    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  if (!mounted) {
    return <div>Đang tải...</div>;
  }

  return (
    <div>
      <p>Chiều rộng hiện tại của cửa sổ: {windowWidth}px</p>
    </div>
  );
}`}
                  />

                  <CleanupDemo/>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="examples">
            <Card
              className="border-0 shadow-2xl bg-white/98 dark:bg-slate-800/98 backdrop-blur-md rounded-3xl overflow-hidden">
              <CardContent className="p-12">
                <div className="flex items-center gap-6 mb-10">
                  <div
                    className="w-16 h-16 bg-gradient-to-br from-pink-500 to-rose-600 rounded-3xl flex items-center justify-center shadow-xl">
                    <span className="text-3xl">🚀</span>
                  </div>
                  <div>
                    <h2 className="text-4xl font-black text-slate-900 dark:text-white mb-2">
                      Ví dụ thực tế
                    </h2>
                    <p className="text-slate-600 dark:text-slate-400 text-lg">
                      Áp dụng useEffect vào dự án thực tế
                    </p>
                  </div>
                </div>

                <div className="space-y-20">
                  <div>
                    <h3 className="text-3xl font-black mb-8 text-slate-900 dark:text-white flex items-center gap-3">
                      <span className="text-2xl">📡</span> 1. Lấy dữ liệu từ API
                    </h3>
                    <RawCode
                      fileName="user-profile.tsx"
                      language="tsx"
                      code={`import { useState, useEffect } from 'react';

interface User {
  id: number;
  name: string;
  email: string;
}

interface UserProfileProps {
  userId: number;
}

function UserProfile({ userId }: UserProfileProps) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;
    setLoading(true);

    async function fetchUserData() {
      try {
        const response = await fetch(\`https://api.example.com/users/\${userId}\`);

        if (!response.ok) {
          throw new Error('Không thể lấy dữ liệu người dùng');
        }

        const userData: User = await response.json();

        if (isMounted) {
          setUser(userData);
          setError(null);
        }
      } catch (err) {
        if (isMounted) {
          setError(err instanceof Error ? err.message : 'Có lỗi xảy ra');
          setUser(null);
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    }

    fetchUserData();

    // Cleanup để ngăn việc cập nhật state trên component đã unmount
    return () => {
      isMounted = false;
    };
  }, [userId]); // Chạy lại khi userId thay đổi

  if (loading) return <div>Đang tải...</div>;
  if (error) return <div>Lỗi: {error}</div>;
  if (!user) return <div>Không tìm thấy người dùng</div>;

  return (
    <div>
      <h2>{user.name}</h2>
      <p>Email: {user.email}</p>
      {/* Hiển thị thêm thông tin người dùng */}
    </div>
  );
}`}
                    />
                  </div>

                  <div>
                    <h3 className="text-3xl font-black mb-8 text-slate-900 dark:text-white flex items-center gap-3">
                      <span className="text-2xl">⏰</span> 2. Đồng hồ đếm ngược
                    </h3>
                    <RawCode
                      fileName="countdown-timer.tsx"
                      language="tsx"
                      code={`import { useState, useEffect } from 'react';

interface CountdownProps {
  initialMinutes?: number;
  initialSeconds?: number;
}

function Countdown({ initialMinutes = 5, initialSeconds = 0 }: CountdownProps) {
  const [minutes, setMinutes] = useState(initialMinutes);
  const [seconds, setSeconds] = useState(initialSeconds);
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    let intervalId: NodeJS.Timeout;

    if (isRunning) {
      intervalId = setInterval(() => {
        if (seconds > 0) {
          setSeconds(seconds - 1);
        } else if (minutes > 0) {
          setMinutes(minutes - 1);
          setSeconds(59);
        } else {
          // Khi đếm về 0
          clearInterval(intervalId);
          setIsRunning(false);
          alert('Hết giờ!');
        }
      }, 1000);
    }

    // Cleanup để clear interval khi component unmount hoặc dependencies thay đổi
    return () => {
      if (intervalId) clearInterval(intervalId);
    };
  }, [isRunning, minutes, seconds]);

  const handleStart = () => setIsRunning(true);
  const handlePause = () => setIsRunning(false);
  const handleReset = () => {
    setIsRunning(false);
    setMinutes(initialMinutes);
    setSeconds(initialSeconds);
  };

  return (
    <div className="text-center">
      <div className="text-4xl font-bold mb-6 font-mono bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
        {String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
      </div>
      <div className="space-x-4">
        {!isRunning ? (
          <button
            onClick={handleStart}
            className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
          >
            ▶️ Bắt đầu
          </button>
        ) : (
          <button
            onClick={handlePause}
            className="px-6 py-2 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700 transition-colors"
          >
            ⏸️ Tạm dừng
          </button>
        )}
        <button
          onClick={handleReset}
          className="px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
        >
          🔄 Đặt lại
        </button>
      </div>
    </div>
  );
}`}
                    />
                  </div>

                  <div>
                    <h3 className="text-3xl font-black mb-8 text-slate-900 dark:text-white flex items-center gap-3">
                      <span className="text-2xl">💾</span> 3. Lưu trữ trong localStorage
                    </h3>
                    <RawCode
                      fileName="local-storage-demo.tsx"
                      language="tsx"
                      code={`import { useState, useEffect } from 'react';

function LocalStorageDemo() {
  // Đọc giá trị ban đầu từ localStorage hoặc sử dụng giá trị mặc định
  const [theme, setTheme] = useState(() => {
    if (typeof window !== 'undefined') {
      const savedTheme = localStorage.getItem('theme');
      return savedTheme || 'light';
    }
    return 'light';
  });

  // Lưu vào localStorage mỗi khi theme thay đổi
  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('theme', theme);
      // Thêm class vào body để áp dụng theme
      document.body.className = theme;
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prevTheme => prevTheme === 'light' ? 'dark' : 'light');
  };

  return (
    <div className="p-6">
      <p className="mb-4">Theme hiện tại: <strong>{theme}</strong></p>
      <button
        onClick={toggleTheme}
        className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
      >
        🎨 Chuyển đổi theme
      </button>
    </div>
  );
}`}
                    />
                  </div>

                  <CountdownDemo/>
                  <RealWorldExampleDemo/>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}

// Enhanced Demo Components với thiết kế đẹp hơn
function BasicEffectDemo() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    document.title = `Bạn đã click ${count} lần`;
  }, [count]);

  return (
    <div
      className="bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-blue-900/40 dark:via-indigo-900/40 dark:to-purple-900/40 p-10 rounded-3xl border border-blue-200/60 dark:border-blue-700/60 shadow-2xl">
      <h3 className="text-2xl font-black mb-8 text-blue-800 dark:text-blue-300 flex items-center gap-3">
        <span className="text-2xl">🎯</span> Demo: Thay đổi tiêu đề trang
      </h3>
      <p className="mb-8 text-slate-700 dark:text-slate-300 text-lg leading-relaxed">
        Tiêu đề trang web sẽ thay đổi khi bạn click nút bên dưới. Kiểm tra tab của trình duyệt!
      </p>
      <div className="flex items-center gap-6">
        <button
          onClick={() => setCount(count + 1)}
          className="px-8 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-2xl hover:from-blue-700 hover:to-indigo-700 transition-all duration-300 shadow-xl transform hover:scale-105 font-bold text-lg"
        >
          🖱️ Click tôi ({count})
        </button>
        <div
          className="text-slate-600 dark:text-slate-400 bg-white/70 dark:bg-slate-800/70 px-6 py-3 rounded-xl backdrop-blur-sm border border-slate-200/50 dark:border-slate-600/50">
          👆 Kiểm tra tiêu đề tab của trình duyệt
        </div>
      </div>
    </div>
  );
}

function DependencyDemo() {
  const [count, setCount] = useState(0);
  const [name, setName] = useState('');

  useEffect(() => {
    console.log('Name changed:', name);
  }, [name]);

  return (
    <div
      className="bg-gradient-to-br from-purple-50 via-violet-50 to-fuchsia-50 dark:from-purple-900/40 dark:via-violet-900/40 dark:to-fuchsia-900/40 p-10 rounded-3xl border border-purple-200/60 dark:border-purple-700/60 shadow-2xl">
      <h3 className="text-2xl font-black mb-8 text-purple-800 dark:text-purple-300 flex items-center gap-3">
        <span className="text-2xl">🔗</span> Demo: Dependency Array
      </h3>
      <div className="space-y-8">
        <div>
          <label className="block mb-4 text-slate-700 dark:text-slate-300 font-bold text-lg">
            📝 Nhập tên (effect chạy khi thay đổi):
          </label>
          <input
            type="text"
            value={name}
            onChange={e => setName(e.target.value)}
            className="w-full px-6 py-4 border-2 border-purple-300 dark:border-purple-600 rounded-2xl dark:bg-slate-800 focus:ring-4 focus:ring-purple-500/30 focus:border-purple-500 transition-all text-lg font-medium"
            placeholder="Nhập tên của bạn..."
          />
          <p className="mt-3 text-slate-600 dark:text-slate-400">
            🔍 Mở console để thấy effect chạy khi input thay đổi
          </p>
        </div>

        <div>
          <button
            onClick={() => setCount(count + 1)}
            className="px-8 py-4 bg-gradient-to-r from-purple-600 to-violet-600 text-white rounded-2xl hover:from-purple-700 hover:to-violet-700 transition-all duration-300 shadow-xl transform hover:scale-105 font-bold text-lg"
          >
            📊 Count: {count} (không trigger effect)
          </button>
        </div>
      </div>
    </div>
  );
}

function CleanupDemo() {
  const [isSubscribed, setIsSubscribed] = useState(false);

  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (isSubscribed) {
      console.log('✅ Subscription started');

      interval = setInterval(() => {
        console.log('📡 Receiving data...');
      }, 2000);

      return () => {
        console.log('🧹 Cleanup: Subscription ended');
        if (interval) clearInterval(interval);
      };
    }
  }, [isSubscribed]);

  return (
    <div
      className="bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 dark:from-green-900/40 dark:via-emerald-900/40 dark:to-teal-900/40 p-10 rounded-3xl border border-green-200/60 dark:border-green-700/60 shadow-2xl">
      <h3 className="text-2xl font-black mb-8 text-green-800 dark:text-green-300 flex items-center gap-3">
        <span className="text-2xl">🧹</span> Demo: Cleanup Function
      </h3>
      <p className="mb-8 text-slate-700 dark:text-slate-300 text-lg leading-relaxed">
        Toggle subscription để thấy cleanup function hoạt động. Mở console để xem logs!
      </p>
      <div className="flex items-center gap-6">
        <button
          onClick={() => setIsSubscribed(!isSubscribed)}
          className={`px-8 py-4 rounded-2xl transition-all duration-300 shadow-xl transform hover:scale-105 font-bold text-lg flex items-center gap-3 ${
            isSubscribed
              ? 'bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-700 hover:to-rose-700 text-white'
              : 'bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white'
          }`}
        >
          {isSubscribed ? (
            <>
              <span className="text-xl">❌</span> Hủy đăng ký
            </>
          ) : (
            <>
              <span className="text-xl">✅</span> Đăng ký
            </>
          )}
        </button>

        {isSubscribed && (
          <div
            className="flex items-center gap-3 text-green-700 dark:text-green-400 bg-white/70 dark:bg-slate-800/70 px-6 py-3 rounded-xl backdrop-blur-sm border border-green-200/50 dark:border-green-600/50">
            <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
            <span className="font-bold">Đang nhận dữ liệu...</span>
          </div>
        )}
      </div>
    </div>
  );
}

function CountdownDemo({initialMinutes = 1, initialSeconds = 30}: CountdownProps) {
  const [minutes, setMinutes] = useState(initialMinutes);
  const [seconds, setSeconds] = useState(initialSeconds);
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    let intervalId: NodeJS.Timeout;

    if (isRunning) {
      intervalId = setInterval(() => {
        if (seconds > 0) {
          setSeconds(seconds - 1);
        } else if (minutes > 0) {
          setMinutes(minutes - 1);
          setSeconds(59);
        } else {
          clearInterval(intervalId);
          setIsRunning(false);
          alert('⏰ Hết giờ!');
        }
      }, 1000);
    }

    return () => {
      if (intervalId) clearInterval(intervalId);
    };
  }, [isRunning, minutes, seconds]);

  const handleReset = () => {
    setIsRunning(false);
    setMinutes(initialMinutes);
    setSeconds(initialSeconds);
  };

  return (
    <div
      className="bg-gradient-to-br from-orange-50 via-red-50 to-pink-50 dark:from-orange-900/40 dark:via-red-900/40 dark:to-pink-900/40 p-10 rounded-3xl border border-orange-200/60 dark:border-orange-700/60 shadow-2xl">
      <h3 className="text-2xl font-black mb-8 text-orange-800 dark:text-orange-300 flex items-center gap-3">
        <span className="text-2xl">⏰</span> Demo: Countdown Timer
      </h3>

      <div className="text-center">
        <div
          className="text-7xl font-black mb-8 font-mono bg-gradient-to-r from-orange-600 via-red-600 to-pink-600 bg-clip-text text-transparent">
          {String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
        </div>

        <div className="flex justify-center gap-6">
          <Button
            onClick={() => setIsRunning(!isRunning)}
            className={`px-8 py-4 rounded-2xl font-bold text-lg flex items-center gap-3 shadow-xl transform hover:scale-105 transition-all duration-300 ${
              isRunning
                ? 'bg-gradient-to-r from-yellow-600 to-amber-600 hover:from-yellow-700 hover:to-amber-700 text-white'
                : 'bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white'
            }`}
          >
            {isRunning ? (
              <>
                <Pause className="h-5 w-5"/>
                Tạm dừng
              </>
            ) : (
              <>
                <Play className="h-5 w-5"/>
                Bắt đầu
              </>
            )}
          </Button>

          <Button
            onClick={handleReset}
            className="px-8 py-4 rounded-2xl font-bold text-lg flex items-center gap-3 shadow-xl transform hover:scale-105 transition-all duration-300 bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-700 hover:to-rose-700 text-white"
          >
            <RotateCcw className="h-5 w-5"/>
            Đặt lại
          </Button>
        </div>
      </div>
    </div>
  );
}

function RealWorldExampleDemo() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true);
      await new Promise(resolve => setTimeout(resolve, 1500));

      setPosts([
        {id: 1, title: 'Giới thiệu về React Hooks', views: 1250, likes: 89},
        {id: 2, title: 'Cách sử dụng useEffect', views: 890, likes: 67},
        {id: 3, title: 'Quản lý state với useState', views: 2100, likes: 156},
        {id: 4, title: 'Custom Hooks trong React', views: 750, likes: 43},
      ]);
      setLoading(false);
    };

    fetchPosts();
  }, []);

  return (
    <div
      className="bg-gradient-to-br from-amber-50 via-yellow-50 to-orange-50 dark:from-amber-900/40 dark:via-yellow-900/40 dark:to-orange-900/40 p-10 rounded-3xl border border-amber-200/60 dark:border-amber-700/60 shadow-2xl">
      <h3 className="text-2xl font-black mb-8 text-amber-800 dark:text-amber-300 flex items-center gap-3">
        <span className="text-2xl">📡</span> Demo: Lấy dữ liệu từ API
      </h3>

      {loading ? (
        <div className="flex items-center justify-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-4 border-amber-600 border-t-transparent"></div>
          <span className="ml-4 text-amber-700 dark:text-amber-300 text-lg font-bold">
            Đang tải dữ liệu...
          </span>
        </div>
      ) : (
        <div className="space-y-6">
          <p className="text-slate-700 dark:text-slate-300 mb-6 text-lg font-semibold">
            📋 Danh sách bài viết (mô phỏng data từ API):
          </p>
          <div className="grid gap-4">
            {posts.map(post => (
              <div
                key={post.id}
                className="bg-white/80 dark:bg-slate-800/80 p-6 rounded-2xl border border-amber-200/60 dark:border-amber-700/60 hover:shadow-xl transition-all duration-300 hover:scale-[1.02]"
              >
                <h4 className="font-black text-slate-900 dark:text-white mb-3 text-lg">
                  {post.title}
                </h4>
                <div className="flex items-center gap-6 text-slate-600 dark:text-slate-400">
                  <span className="flex items-center gap-2 font-semibold">
                    <span className="text-lg">👁️</span> {post.views.toLocaleString()} views
                  </span>
                  <span className="flex items-center gap-2 font-semibold">
                    <span className="text-lg">❤️</span> {post.likes} likes
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
