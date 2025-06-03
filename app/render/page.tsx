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
  RefreshCw,
  AlertTriangle,
} from 'lucide-react';
import {useEffect, useState, useRef, memo, useCallback, useMemo} from 'react';

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
  email: string;
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
            <Code2 className="h-4 w-4 text-slate-300"/>
            <span className="text-sm font-bold text-slate-200 tracking-wide">{fileName}</span>
            <Badge variant="outline" className="text-xs px-3 py-1 bg-blue-500/20 border-blue-400/50 text-blue-200 font-mono">
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
          <pre className="p-6 overflow-x-auto text-sm font-mono leading-relaxed max-h-[700px] text-slate-100 selection:bg-blue-500/30">
            <code className="language-tsx">{code}</code>
          </pre>
          <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-slate-900/20 to-transparent"></div>
        </div>
      )}
    </div>
  );
}

export default function ReactRerenderPage() {
  const [activeTab, setActiveTab] = useState('intro');

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/50 to-purple-50/50 dark:from-slate-950 dark:via-blue-950/50 dark:to-purple-950/50">
      {/* Hero Header */}
      <div className="relative bg-gradient-to-r from-red-600 via-orange-600 to-yellow-600 text-white py-24 px-4 mb-16 shadow-2xl overflow-hidden">
        {/* Animated background patterns */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-10 left-10 w-20 h-20 bg-white/10 rounded-full animate-pulse"></div>
          <div className="absolute top-32 right-20 w-32 h-32 bg-white/5 rounded-full animate-bounce"></div>
          <div className="absolute bottom-20 left-1/4 w-16 h-16 bg-white/10 rounded-full animate-ping"></div>
        </div>

        <div className="container mx-auto max-w-7xl relative z-10">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-12 h-12 bg-white/20 backdrop-blur-md rounded-2xl flex items-center justify-center border border-white/30">
              <RefreshCw className="h-6 w-6 text-white"/>
            </div>
            <Badge className="bg-white/20 backdrop-blur-md text-white hover:bg-white/30 border-white/30 px-4 py-2 text-sm font-bold">
              🔄 React Core
            </Badge>
          </div>

          <h1 className="text-6xl sm:text-7xl font-black mb-8 leading-tight">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-white via-orange-100 to-yellow-100">
              Re-render
            </span>
            <div className="text-4xl sm:text-5xl mt-2 font-light text-white/90">
              Lifecycle & Performance
            </div>
          </h1>

          <p className="text-xl text-white/90 max-w-4xl leading-relaxed font-medium">
            🚀 Hiểu sâu về cơ chế re-render trong React - khi nào component render lại,
            tại sao và cách tối ưu hóa performance cho ứng dụng của bạn
          </p>

          <div className="flex items-center gap-4 mt-8">
            <Sparkles className="h-5 w-5 text-yellow-300 animate-pulse"/>
            <span className="text-white/80 text-sm font-medium">
              Từ cơ bản đến nâng cao với demo thực tế và performance tips
            </span>
          </div>
        </div>
      </div>

      <div className="container mx-auto max-w-7xl px-4 pb-32">
        <Tabs defaultValue="intro" value={activeTab} onValueChange={setActiveTab}>
          {/* Enhanced Tabs */}
          <TabsList className="bg-white/95 dark:bg-slate-800/95 backdrop-blur-xl p-3 shadow-2xl rounded-3xl border border-slate-200/50 dark:border-slate-700/50 mb-16 grid grid-cols-5 gap-2">
            <TabsTrigger
              value="intro"
              className="rounded-2xl data-[state=active]:bg-gradient-to-r data-[state=active]:from-red-500 data-[state=active]:to-orange-500 data-[state=active]:text-white data-[state=active]:shadow-xl transition-all duration-300 font-semibold py-3"
            >
              <span className="text-base">📚</span>
              <span className="ml-2 hidden sm:inline">Giới thiệu</span>
            </TabsTrigger>
            <TabsTrigger
              value="basic"
              className="rounded-2xl data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500 data-[state=active]:to-indigo-500 data-[state=active]:text-white data-[state=active]:shadow-xl transition-all duration-300 font-semibold py-3"
            >
              <span className="text-base">🎯</span>
              <span className="ml-2 hidden sm:inline">Cơ bản</span>
            </TabsTrigger>
            <TabsTrigger
              value="triggers"
              className="rounded-2xl data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-500 data-[state=active]:to-violet-500 data-[state=active]:text-white data-[state=active]:shadow-xl transition-all duration-300 font-semibold py-3"
            >
              <span className="text-base">🔥</span>
              <span className="ml-2 hidden sm:inline">Triggers</span>
            </TabsTrigger>
            <TabsTrigger
              value="optimization"
              className="rounded-2xl data-[state=active]:bg-gradient-to-r data-[state=active]:from-green-500 data-[state=active]:to-emerald-500 data-[state=active]:text-white data-[state=active]:shadow-xl transition-all duration-300 font-semibold py-3"
            >
              <span className="text-base">⚡</span>
              <span className="ml-2 hidden sm:inline">Tối ưu</span>
            </TabsTrigger>
            <TabsTrigger
              value="examples"
              className="rounded-2xl data-[state=active]:bg-gradient-to-r data-[state=active]:from-pink-500 data-[state=active]:to-rose-500 data-[state=active]:text-white data-[state=active]:shadow-xl transition-all duration-300 font-semibold py-3"
            >
              <span className="text-base">🚀</span>
              <span className="ml-2 hidden sm:inline">Demo</span>
            </TabsTrigger>
          </TabsList>

          {/* Tab Contents */}
          <TabsContent value="intro">
            <Card className="border-0 shadow-2xl bg-white/98 dark:bg-slate-800/98 backdrop-blur-md rounded-3xl overflow-hidden">
              <CardContent className="p-12">
                <div className="flex items-center gap-6 mb-10">
                  <div className="w-16 h-16 bg-gradient-to-br from-red-500 to-orange-600 rounded-3xl flex items-center justify-center shadow-xl">
                    <span className="text-3xl">🔄</span>
                  </div>
                  <div>
                    <h2 className="text-4xl font-black text-slate-900 dark:text-white mb-2">
                      Re-render là gì?
                    </h2>
                    <p className="text-slate-600 dark:text-slate-400 text-lg">
                      Hiểu về lifecycle và cơ chế render của React
                    </p>
                  </div>
                </div>

                <div className="prose prose-xl max-w-none dark:prose-invert mb-12">
                  <p className="text-slate-700 dark:text-slate-300 text-xl leading-relaxed">
                    <code className="bg-gradient-to-r from-red-100 to-orange-100 dark:from-red-900/60 dark:to-orange-900/60 px-3 py-2 rounded-lg text-red-800 dark:text-red-200 font-bold text-lg">
                      Re-render
                    </code>{' '}
                    là quá trình React thực thi lại function component hoặc gọi lại render method của class component
                    để tạo ra{' '}
                    <span className="font-bold text-purple-600 dark:text-purple-400">
                      Virtual DOM mới
                    </span>{' '}
                    và so sánh với Virtual DOM cũ để cập nhật UI.
                  </p>
                </div>

                <div className="grid lg:grid-cols-2 gap-8 mb-12">
                  <div className="bg-gradient-to-br from-red-50 via-orange-50 to-yellow-50 dark:from-red-900/30 dark:via-orange-900/30 dark:to-yellow-900/30 p-8 rounded-3xl border border-red-200/60 dark:border-red-800/60 shadow-xl">
                    <h4 className="font-black text-red-800 dark:text-red-300 mb-6 flex items-center gap-3 text-xl">
                      <span className="text-2xl">🔥</span> Khi nào component re-render?
                    </h4>
                    <ul className="space-y-4 text-slate-700 dark:text-slate-300">
                      <li className="flex items-center gap-3 p-3 bg-white/60 dark:bg-slate-800/60 rounded-xl">
                        <span className="text-xl">📊</span>
                        <span className="font-semibold">State thay đổi (useState, useReducer)</span>
                      </li>
                      <li className="flex items-center gap-3 p-3 bg-white/60 dark:bg-slate-800/60 rounded-xl">
                        <span className="text-xl">📦</span>
                        <span className="font-semibold">Props thay đổi từ parent</span>
                      </li>
                      <li className="flex items-center gap-3 p-3 bg-white/60 dark:bg-slate-800/60 rounded-xl">
                        <span className="text-xl">🎯</span>
                        <span className="font-semibold">Context value thay đổi</span>
                      </li>
                      <li className="flex items-center gap-3 p-3 bg-white/60 dark:bg-slate-800/60 rounded-xl">
                        <span className="text-xl">👨‍👩‍👦</span>
                        <span className="font-semibold">Parent component re-render</span>
                      </li>
                      <li className="flex items-center gap-3 p-3 bg-white/60 dark:bg-slate-800/60 rounded-xl">
                        <span className="text-xl">🔄</span>
                        <span className="font-semibold">forceUpdate() được gọi</span>
                      </li>
                    </ul>
                  </div>

                  <div className="bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-blue-900/30 dark:via-indigo-900/30 dark:to-purple-900/30 p-8 rounded-3xl border border-blue-200/60 dark:border-blue-800/60 shadow-xl">
                    <h4 className="font-black text-blue-800 dark:text-blue-300 mb-6 flex items-center gap-3 text-xl">
                      <span className="text-2xl">⚡</span> Render cycle
                    </h4>
                    <ul className="space-y-4 text-slate-700 dark:text-slate-300">
                      <li className="flex items-center gap-3 p-3 bg-white/60 dark:bg-slate-800/60 rounded-xl">
                        <span className="text-xl">🎬</span>
                        <span className="font-semibold">Trigger render</span>
                      </li>
                      <li className="flex items-center gap-3 p-3 bg-white/60 dark:bg-slate-800/60 rounded-xl">
                        <span className="text-xl">🎨</span>
                        <span className="font-semibold">Render component</span>
                      </li>
                      <li className="flex items-center gap-3 p-3 bg-white/60 dark:bg-slate-800/60 rounded-xl">
                        <span className="text-xl">🔍</span>
                        <span className="font-semibold">Reconciliation (diffing)</span>
                      </li>
                      <li className="flex items-center gap-3 p-3 bg-white/60 dark:bg-slate-800/60 rounded-xl">
                        <span className="text-xl">💻</span>
                        <span className="font-semibold">Commit to DOM</span>
                      </li>
                    </ul>
                  </div>
                </div>

                <RawCode
                  fileName="render-basics.tsx"
                  language="tsx"
                  code={`function Component() {
  const [count, setCount] = useState(0);

  console.log('🔄 Component render/re-render'); // Log mỗi lần render

  // Trigger re-render
  const handleClick = () => {
    setCount(count + 1); // State thay đổi → re-render
  };

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={handleClick}>Increment</button>
    </div>
  );
}`}
                />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="basic">
            <Card className="border-0 shadow-2xl bg-white/98 dark:bg-slate-800/98 backdrop-blur-md rounded-3xl overflow-hidden">
              <CardContent className="p-12">
                <div className="flex items-center gap-6 mb-10">
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-3xl flex items-center justify-center shadow-xl">
                    <span className="text-3xl">🎯</span>
                  </div>
                  <div>
                    <h2 className="text-4xl font-black text-slate-900 dark:text-white mb-2">
                      Cơ chế Re-render cơ bản
                    </h2>
                    <p className="text-slate-600 dark:text-slate-400 text-lg">
                      Hiểu rõ khi nào và tại sao component render lại
                    </p>
                  </div>
                </div>

                <div className="space-y-16">
                  <div>
                    <h3 className="text-3xl font-black mb-6 text-slate-900 dark:text-white flex items-center gap-3">
                      <span className="text-2xl">📊</span> State Changes
                    </h3>
                    <p className="text-slate-700 dark:text-slate-300 mb-8 text-xl leading-relaxed">
                      Khi state của component thay đổi, React sẽ schedule một re-render để cập nhật UI.
                    </p>

                    <RawCode
                      fileName="state-rerender.tsx"
                      language="tsx"
                      code={`function Counter() {
  const [count, setCount] = useState(0);
  const [message, setMessage] = useState('Hello');

  console.log('🔄 Counter component render');

  return (
    <div>
      <p>Count: {count}</p>
      <p>Message: {message}</p>

      {/* Mỗi click sẽ trigger re-render */}
      <button onClick={() => setCount(count + 1)}>
        Increment Count
      </button>

      <button onClick={() => setMessage('Updated!')}>
        Update Message
      </button>
    </div>
  );
}`}
                    />
                  </div>

                  <div>
                    <h3 className="text-3xl font-black mb-6 text-slate-900 dark:text-white flex items-center gap-3">
                      <span className="text-2xl">📦</span> Props Changes
                    </h3>
                    <p className="text-slate-700 dark:text-slate-300 mb-8 text-xl leading-relaxed">
                      Component sẽ re-render khi nhận props mới từ parent component.
                    </p>

                    <RawCode
                      fileName="props-rerender.tsx"
                      language="tsx"
                      code={`// Child component
function ChildComponent({ name, age }) {
  console.log('👶 Child component render');

  return (
    <div>
      <h3>{name}</h3>
      <p>Age: {age}</p>
    </div>
  );
}

// Parent component
function ParentComponent() {
  const [userAge, setUserAge] = useState(25);

  console.log('👨‍👩‍👦 Parent component render');

  return (
    <div>
      {/* Child sẽ re-render khi userAge thay đổi */}
      <ChildComponent name="John" age={userAge} />

      <button onClick={() => setUserAge(userAge + 1)}>
        Increase Age
      </button>
    </div>
  );
}`}
                    />
                  </div>

                  <div>
                    <h3 className="text-3xl font-black mb-6 text-slate-900 dark:text-white flex items-center gap-3">
                      <span className="text-2xl">👨‍👩‍👦</span> Parent Re-render
                    </h3>
                    <p className="text-slate-700 dark:text-slate-300 mb-8 text-xl leading-relaxed">
                      Khi parent re-render, tất cả children cũng sẽ re-render (trừ khi được optimize).
                    </p>

                    <RawCode
                      fileName="parent-rerender.tsx"
                      language="tsx"
                      code={`function Parent() {
  const [parentState, setParentState] = useState(0);
  const [unrelatedState, setUnrelatedState] = useState('');

  console.log('👨‍👩‍👦 Parent render');

  return (
    <div>
      <h2>Parent State: {parentState}</h2>

      {/* Child sẽ re-render dù props không đổi */}
      <Child message="Static message" />

      <button onClick={() => setParentState(parentState + 1)}>
        Update Parent State
      </button>

      {/* Ngay cả khi update unrelated state */}
      <button onClick={() => setUnrelatedState(Date.now().toString())}>
        Update Unrelated State
      </button>
    </div>
  );
}

function Child({ message }) {
  console.log('👶 Child render - Message:', message);

  return <div>Child: {message}</div>;
}`}
                    />
                  </div>

                  <BasicRerenderDemo />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="triggers">
            <Card className="border-0 shadow-2xl bg-white/98 dark:bg-slate-800/98 backdrop-blur-md rounded-3xl overflow-hidden">
              <CardContent className="p-12">
                <div className="flex items-center gap-6 mb-10">
                  <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-violet-600 rounded-3xl flex items-center justify-center shadow-xl">
                    <span className="text-3xl">🔥</span>
                  </div>
                  <div>
                    <h2 className="text-4xl font-black text-slate-900 dark:text-white mb-2">
                      Re-render Triggers
                    </h2>
                    <p className="text-slate-600 dark:text-slate-400 text-lg">
                      Tất cả các nguyên nhân gây ra re-render
                    </p>
                  </div>
                </div>

                <div className="grid gap-8 mb-16">
                  <div className="bg-gradient-to-br from-red-50 via-red-100 to-rose-100 dark:from-red-900/40 dark:via-red-800/40 dark:to-rose-800/40 p-8 rounded-3xl border border-red-300/60 dark:border-red-600/60 shadow-xl">
                    <h4 className="font-black mb-6 text-red-800 dark:text-red-300 flex items-center gap-3 text-xl">
                      <span className="text-2xl">📊</span> 1. State Updates
                    </h4>
                    <RawCode
                      fileName="state-triggers.tsx"
                      language="tsx"
                      code={`// useState
const [count, setCount] = useState(0);
setCount(1); // ✅ Trigger re-render
setCount(1); // ❌ No re-render (same value)

// useReducer
const [state, dispatch] = useReducer(reducer, initialState);
dispatch({ type: 'INCREMENT' }); // ✅ Trigger re-render

// setState với object/array mới
const [user, setUser] = useState({ name: 'John' });
setUser({ ...user, age: 25 }); // ✅ Trigger re-render
setUser(user); // ❌ No re-render (same reference)`}
                    />
                  </div>

                  <div className="bg-gradient-to-br from-blue-50 via-blue-100 to-indigo-100 dark:from-blue-900/40 dark:via-blue-800/40 dark:to-indigo-800/40 p-8 rounded-3xl border border-blue-300/60 dark:border-blue-600/60 shadow-xl">
                    <h4 className="font-black mb-6 text-blue-800 dark:text-blue-300 flex items-center gap-3 text-xl">
                      <span className="text-2xl">📦</span> 2. Props Changes
                    </h4>
                    <RawCode
                      fileName="props-triggers.tsx"
                      language="tsx"
                      code={`// Primitive props
<Child name="John" age={25} />
<Child name="Jane" age={25} /> // ✅ name changed → re-render

// Object/Array props
<Child user={{ name: 'John' }} />
<Child user={{ name: 'John' }} /> // ✅ New object → re-render

// Function props
<Child onClick={() => console.log('click')} />
// ✅ New function mỗi render → re-render`}
                    />
                  </div>

                  <div className="bg-gradient-to-br from-green-50 via-green-100 to-emerald-100 dark:from-green-900/40 dark:via-green-800/40 dark:to-emerald-800/40 p-8 rounded-3xl border border-green-300/60 dark:border-green-600/60 shadow-xl">
                    <h4 className="font-black mb-6 text-green-800 dark:text-green-300 flex items-center gap-3 text-xl">
                      <span className="text-2xl">🎯</span> 3. Context Changes
                    </h4>
                    <RawCode
                      fileName="context-triggers.tsx"
                      language="tsx"
                      code={`const ThemeContext = createContext();

function App() {
  const [theme, setTheme] = useState('light');

  return (
    <ThemeContext.Provider value={theme}>
      <Child /> {/* ✅ Re-render khi theme thay đổi */}
    </ThemeContext.Provider>
  );
}

function Child() {
  const theme = useContext(ThemeContext);
  // Component này sẽ re-render khi theme context thay đổi
  return <div className={theme}>Content</div>;
}`}
                    />
                  </div>

                  <div className="bg-gradient-to-br from-orange-50 via-orange-100 to-amber-100 dark:from-orange-900/40 dark:via-orange-800/40 dark:to-amber-800/40 p-8 rounded-3xl border border-orange-300/60 dark:border-orange-600/60 shadow-xl">
                    <h4 className="font-black mb-6 text-orange-800 dark:text-orange-300 flex items-center gap-3 text-xl">
                      <span className="text-2xl">👨‍👩‍👦</span> 4. Parent Re-render
                    </h4>
                    <RawCode
                      fileName="parent-triggers.tsx"
                      language="tsx"
                      code={`function Parent() {
  const [count, setCount] = useState(0);

  return (
    <div>
      {/* Tất cả children sẽ re-render khi Parent re-render */}
      <ChildA />
      <ChildB />
      <ChildC />

      <button onClick={() => setCount(count + 1)}>
        Update Parent State
      </button>
    </div>
  );
}

// ❌ Tất cả children re-render không cần thiết
// ✅ Solution: React.memo, useMemo, useCallback`}
                    />
                  </div>
                </div>

                <TriggersDemo />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="optimization">
            <Card className="border-0 shadow-2xl bg-white/98 dark:bg-slate-800/98 backdrop-blur-md rounded-3xl overflow-hidden">
              <CardContent className="p-12">
                <div className="flex items-center gap-6 mb-10">
                  <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-600 rounded-3xl flex items-center justify-center shadow-xl">
                    <span className="text-3xl">⚡</span>
                  </div>
                  <div>
                    <h2 className="text-4xl font-black text-slate-900 dark:text-white mb-2">
                      Tối ưu Re-render
                    </h2>
                    <p className="text-slate-600 dark:text-slate-400 text-lg">
                      Kỹ thuật ngăn chặn unnecessary re-renders
                    </p>
                  </div>
                </div>

                <div className="space-y-12">
                  <div>
                    <h3 className="text-2xl font-black mb-8 text-slate-900 dark:text-white">
                      🛡️ Optimization Techniques
                    </h3>
                    <div className="grid md:grid-cols-3 gap-6 mb-8">
                      <div className="bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-blue-900/30 dark:to-indigo-900/30 p-6 rounded-2xl border border-blue-300/60 dark:border-blue-600/60 shadow-lg">
                        <span className="text-blue-600 dark:text-blue-400 font-black text-lg flex items-center gap-2">
                          <span className="text-xl">🧠</span> React.memo
                        </span>
                        <p className="text-sm text-blue-700 dark:text-blue-300 mt-2">
                          Memoize component, skip re-render nếu props không đổi
                        </p>
                      </div>
                      <div className="bg-gradient-to-br from-purple-50 to-violet-100 dark:from-purple-900/30 dark:to-violet-900/30 p-6 rounded-2xl border border-purple-300/60 dark:border-purple-600/60 shadow-lg">
                        <span className="text-purple-600 dark:text-purple-400 font-black text-lg flex items-center gap-2">
                          <span className="text-xl">🎣</span> useCallback
                        </span>
                        <p className="text-sm text-purple-700 dark:text-purple-300 mt-2">
                          Memoize functions, giữ reference ổn định
                        </p>
                      </div>
                      <div className="bg-gradient-to-br from-green-50 to-emerald-100 dark:from-green-900/30 dark:to-emerald-900/30 p-6 rounded-2xl border border-green-300/60 dark:border-green-600/60 shadow-lg">
                        <span className="text-green-600 dark:text-green-400 font-black text-lg flex items-center gap-2">
                          <span className="text-xl">🧮</span> useMemo
                        </span>
                        <p className="text-sm text-green-700 dark:text-green-300 mt-2">
                          Memoize values, tránh tính toán lại
                        </p>
                      </div>
                    </div>

                    <RawCode
                      fileName="optimization-example.tsx"
                      language="tsx"
                      code={`// ❌ Không optimize - Child re-render mỗi lần Parent re-render
function Parent() {
  const [count, setCount] = useState(0);

  const handleClick = () => console.log('clicked'); // Function mới mỗi render
  const config = { theme: 'dark' }; // Object mới mỗi render

  return <Child onClick={handleClick} config={config} />;
}

// ✅ Optimize với memo + useCallback + useMemo
function OptimizedParent() {
  const [count, setCount] = useState(0);

  // Memoize function
  const handleClick = useCallback(() => {
    console.log('clicked');
  }, []);

  // Memoize object
  const config = useMemo(() => ({
    theme: 'dark',
    showDetails: true
  }), []);

  return <MemoizedChild onClick={handleClick} config={config} />;
}

// Memoize component
const MemoizedChild = memo(function Child({ onClick, config }) {
  console.log('Child render'); // Chỉ log khi props thực sự thay đổi
  return <button onClick={onClick}>Click me</button>;
});`}
                    />
                  </div>

                  <OptimizationDemo />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="examples">
            <Card className="border-0 shadow-2xl bg-white/98 dark:bg-slate-800/98 backdrop-blur-md rounded-3xl overflow-hidden">
              <CardContent className="p-12">
                <div className="flex items-center gap-6 mb-10">
                  <div className="w-16 h-16 bg-gradient-to-br from-pink-500 to-rose-600 rounded-3xl flex items-center justify-center shadow-xl">
                    <span className="text-3xl">🚀</span>
                  </div>
                  <div>
                    <h2 className="text-4xl font-black text-slate-900 dark:text-white mb-2">
                      Demo thực tế
                    </h2>
                    <p className="text-slate-600 dark:text-slate-400 text-lg">
                      Quan sát re-render behavior trong action
                    </p>
                  </div>
                </div>

                <div className="space-y-20">
                  <RealtimeRerenderDemo />
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}

// Demo Components
function BasicRerenderDemo() {
  const [count, setCount] = useState(0);
  const [message, setMessage] = useState('Hello');
  const renderCount = useRef(0);

  renderCount.current += 1;

  console.log('🔄 Parent render #', renderCount.current);

  return (
    <div className="bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-blue-900/40 dark:via-indigo-900/40 dark:to-purple-900/40 p-10 rounded-3xl border border-blue-200/60 dark:border-blue-700/60 shadow-2xl">
      <h3 className="text-2xl font-black mb-8 text-blue-800 dark:text-blue-300 flex items-center gap-3">
        <span className="text-2xl">🎯</span> Demo: State-triggered Re-render
      </h3>

      <div className="space-y-6">
        <div className="bg-white/70 dark:bg-slate-800/70 p-6 rounded-2xl">
          <p className="text-lg font-semibold">Render count: <span className="text-blue-600">#{renderCount.current}</span></p>
          <p className="text-lg">Count: <strong>{count}</strong></p>
          <p className="text-lg">Message: <strong>{message}</strong></p>
        </div>

        <div className="flex gap-4">
          <Button
            onClick={() => setCount(count + 1)}
            className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700"
          >
            Increase Count
          </Button>
          <Button
            onClick={() => setMessage(`Updated at ${Date.now()}`)}
            className="bg-gradient-to-r from-purple-600 to-violet-600 hover:from-purple-700 hover:to-violet-700"
          >
            Update Message
          </Button>
        </div>

        <div className="text-sm text-slate-600 dark:text-slate-400 bg-yellow-50 dark:bg-yellow-900/20 p-4 rounded-xl">
          <strong>💡 Quan sát:</strong> Mỗi khi click button, component re-render và render count tăng.
          Check console để thấy logs!
        </div>
      </div>
    </div>
  );
}

function TriggersDemo() {
  const [parentState, setParentState] = useState(0);
  const renderCount = useRef(0);

  renderCount.current += 1;

  const ChildComponent = ({ label }: { label: string }) => {
    const childRenderCount = useRef(0);
    childRenderCount.current += 1;

    console.log(`👶 ${label} render #${childRenderCount.current}`);

    return (
      <div className="bg-white/60 dark:bg-slate-800/60 p-4 rounded-xl border">
        <h4 className="font-bold">{label}</h4>
        <p className="text-sm text-slate-600 dark:text-slate-400">Renders: #{childRenderCount.current}</p>
      </div>
    );
  };

  return (
    <div className="bg-gradient-to-br from-purple-50 via-violet-50 to-fuchsia-50 dark:from-purple-900/40 dark:via-violet-900/40 dark:to-fuchsia-900/40 p-10 rounded-3xl border border-purple-200/60 dark:border-purple-700/60 shadow-2xl">
      <h3 className="text-2xl font-black mb-8 text-purple-800 dark:text-purple-300 flex items-center gap-3">
        <span className="text-2xl">🔥</span> Demo: Parent Re-render triggers Children
      </h3>

      <div className="space-y-6">
        <div className="bg-white/70 dark:bg-slate-800/70 p-6 rounded-2xl">
          <p className="text-lg font-semibold">Parent renders: <span className="text-purple-600">#{renderCount.current}</span></p>
          <p className="text-lg">Parent state: <strong>{parentState}</strong></p>
        </div>

        <div className="grid grid-cols-3 gap-4">
          <ChildComponent label="Child A" />
          <ChildComponent label="Child B" />
          <ChildComponent label="Child C" />
        </div>

        <Button
          onClick={() => setParentState(parentState + 1)}
          className="bg-gradient-to-r from-purple-600 to-violet-600 hover:from-purple-700 hover:to-violet-700"
        >
          Update Parent State
        </Button>

        <div className="text-sm text-slate-600 dark:text-slate-400 bg-orange-50 dark:bg-orange-900/20 p-4 rounded-xl">
          <strong>⚠️ Vấn đề:</strong> Khi parent re-render, tất cả children cũng re-render dù props không đổi.
          Điều này có thể gây performance issues!
        </div>
      </div>
    </div>
  );
}

function OptimizationDemo() {
  const [count, setCount] = useState(0);
  const [message, setMessage] = useState('Hello');

  // Không optimize
  const NormalChild = ({ onClick }: { onClick: () => void }) => {
    const renderCount = useRef(0);
    renderCount.current += 1;
    console.log('👶 Normal Child render #', renderCount.current);

    return (
      <div className="bg-red-50 dark:bg-red-900/20 p-4 rounded-xl border border-red-200 dark:border-red-800">
        <h4 className="font-bold text-red-700 dark:text-red-300">Normal Child</h4>
        <p className="text-sm">Renders: #{renderCount.current}</p>
        <Button onClick={onClick} size="sm" className="mt-2">Click me</Button>
      </div>
    );
  };

  // Optimize với memo + useCallback
  const OptimizedChild = memo(({ onClick }: { onClick: () => void }) => {
    const renderCount = useRef(0);
    renderCount.current += 1;
    console.log('👶 Optimized Child render #', renderCount.current);

    return (
      <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-xl border border-green-200 dark:border-green-800">
        <h4 className="font-bold text-green-700 dark:text-green-300">Optimized Child</h4>
        <p className="text-sm">Renders: #{renderCount.current}</p>
        <Button onClick={onClick} size="sm" className="mt-2">Click me</Button>
      </div>
    );
  });

  // Function không memoize - tạo mới mỗi render
  const handleNormalClick = () => console.log('Normal click');

  // Function memoize với useCallback
  const handleOptimizedClick = useCallback(() => {
    console.log('Optimized click');
  }, []);

  return (
    <div className="bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 dark:from-green-900/40 dark:via-emerald-900/40 dark:to-teal-900/40 p-10 rounded-3xl border border-green-200/60 dark:border-green-700/60 shadow-2xl">
      <h3 className="text-2xl font-black mb-8 text-green-800 dark:text-green-300 flex items-center gap-3">
        <span className="text-2xl">⚡</span> Demo: Optimization Comparison
      </h3>

      <div className="space-y-6">
        <div className="bg-white/70 dark:bg-slate-800/70 p-6 rounded-2xl">
          <p className="text-lg">Count: <strong>{count}</strong></p>
          <p className="text-lg">Message: <strong>{message}</strong></p>
        </div>

        <div className="grid grid-cols-2 gap-6">
          <NormalChild onClick={handleNormalClick} />
          <OptimizedChild onClick={handleOptimizedClick} />
        </div>

        <div className="flex gap-4">
          <Button
            onClick={() => setCount(count + 1)}
            className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700"
          >
            Update Count
          </Button>
          <Button
            onClick={() => setMessage(`Updated ${Date.now()}`)}
            className="bg-gradient-to-r from-purple-600 to-violet-600 hover:from-purple-700 hover:to-violet-700"
          >
            Update Message
          </Button>
        </div>

        <div className="text-sm text-slate-600 dark:text-slate-400 bg-blue-50 dark:bg-blue-900/20 p-4 rounded-xl">
          <strong>✅ Kết quả:</strong> Normal Child re-render mỗi lần parent state thay đổi,
          nhưng Optimized Child chỉ render lần đầu (vì được memo và onClick function ổn định).
        </div>
      </div>
    </div>
  );
}

function RealtimeRerenderDemo() {
  const [logs, setLogs] = useState<string[]>([]);
  const [count, setCount] = useState(0);
  const [name, setName] = useState('');

  const addLog = (message: string) => {
    const timestamp = new Date().toLocaleTimeString();
    setLogs(prev => [...prev.slice(-9), `[${timestamp}] ${message}`]);
  };

  const TrackedComponent = ({ label, value }: { label: string; value: any }) => {
    const renderCount = useRef(0);
    renderCount.current += 1;

    useEffect(() => {
      addLog(`${label} rendered (#${renderCount.current})`);
    });

    return (
      <div className="bg-white/60 dark:bg-slate-800/60 p-4 rounded-xl">
        <h4 className="font-bold">{label}</h4>
        <p>Value: {value}</p>
        <p className="text-sm text-slate-600">Renders: #{renderCount.current}</p>
      </div>
    );
  };

  return (
    <div className="bg-gradient-to-br from-pink-50 via-rose-50 to-red-50 dark:from-pink-900/40 dark:via-rose-900/40 dark:to-red-900/40 p-10 rounded-3xl border border-pink-200/60 dark:border-pink-700/60 shadow-2xl">
      <h3 className="text-2xl font-black mb-8 text-pink-800 dark:text-pink-300 flex items-center gap-3">
        <span className="text-2xl">📊</span> Real-time Re-render Tracker
      </h3>

      <div className="grid lg:grid-cols-2 gap-8">
        <div className="space-y-6">
          <div className="space-y-4">
            <div>
              <label className="block mb-2 font-semibold">Count: {count}</label>
              <Button
                onClick={() => setCount(count + 1)}
                className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700"
              >
                Increment Count
              </Button>
            </div>

            <div>
              <label className="block mb-2 font-semibold">Name:</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-3 py-2 border rounded-lg dark:bg-slate-800"
                placeholder="Enter name..."
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <TrackedComponent label="Count Component" value={count} />
            <TrackedComponent label="Name Component" value={name} />
          </div>
        </div>

        <div className="bg-black/90 text-green-400 p-4 rounded-xl font-mono text-sm h-64 overflow-y-auto">
          <div className="font-bold mb-2">📋 Render Logs:</div>
          {logs.length === 0 ? (
            <div className="text-gray-500">No renders yet...</div>
          ) : (
            logs.map((log, index) => (
              <div key={index} className="py-1">{log}</div>
            ))
          )}
        </div>
      </div>

      <div className="mt-6 text-sm text-slate-600 dark:text-slate-400 bg-amber-50 dark:bg-amber-900/20 p-4 rounded-xl">
        <strong>📈 Theo dõi:</strong> Quan sát logs để thấy component nào render khi nào.
        Mỗi thay đổi state sẽ trigger re-render của các components liên quan.
      </div>
    </div>
  );
}
