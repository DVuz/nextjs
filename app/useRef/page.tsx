'use client';

import { useState, useRef, useEffect, forwardRef, useImperativeHandle } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Target,
  Focus,
  Code2,
  Copy,
  Check,
  ChevronDown,
  ChevronUp,
  Sparkles,
  Zap,
  PlayCircle,
  PauseCircle,
  RotateCcw,
  MousePointer,
  Eye,
  Database,
  Clock,
  ArrowUp,
  ArrowDown,
  Search,
  Volume2,
  VolumeX,
} from 'lucide-react';

// Interfaces
interface RawCodeProps {
  code: string;
  fileName?: string;
  language?: string;
}

interface CustomInputRef {
  focus: () => void;
  clear: () => void;
  getValue: () => string;
}

interface VideoPlayerRef {
  play: () => void;
  pause: () => void;
  reset: () => void;
  getCurrentTime: () => number;
}

// Enhanced RawCode component
function RawCode({ code, fileName = 'Component.tsx', language = 'tsx' }: RawCodeProps) {
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
      <div className="flex items-center justify-between px-6 py-4 bg-gradient-to-r from-slate-700 via-slate-600 to-slate-700 border-b border-slate-500/30">
        <div className="flex items-center space-x-4">
          <div className="flex space-x-2">
            <div className="w-3.5 h-3.5 rounded-full bg-red-500 shadow-lg"></div>
            <div className="w-3.5 h-3.5 rounded-full bg-yellow-500 shadow-lg"></div>
            <div className="w-3.5 h-3.5 rounded-full bg-green-500 shadow-lg"></div>
          </div>
          <div className="flex items-center space-x-3">
            <Code2 className="h-4 w-4 text-slate-300" />
            <span className="text-sm font-bold text-slate-200">{fileName}</span>
            <Badge
              variant="outline"
              className="text-xs px-3 py-1 bg-blue-500/20 border-blue-400/50 text-blue-200"
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
              onClick={copyToClipboard}
              className="h-8 px-3 text-slate-300 hover:text-white hover:bg-slate-600/50"
            >
              {copied ? (
                <>
                  <Check className="h-3.5 w-3.5 mr-2 text-green-400" />
                  <span className="text-xs">Copied!</span>
                </>
              ) : (
                <>
                  <Copy className="h-3.5 w-3.5 mr-2" />
                  <span className="text-xs">Copy</span>
                </>
              )}
            </Button>
          )}
          <Button
            size="sm"
            variant="ghost"
            onClick={() => setIsShown(!isShown)}
            className="h-8 px-3 text-slate-300 hover:text-white hover:bg-slate-600/50"
          >
            {isShown ? (
              <>
                <ChevronUp className="h-3.5 w-3.5 mr-2" />
                <span className="text-xs">Hide</span>
              </>
            ) : (
              <>
                <ChevronDown className="h-3.5 w-3.5 mr-2" />
                <span className="text-xs">Show</span>
              </>
            )}
          </Button>
        </div>
      </div>

      {isShown && (
        <div className="relative bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
          <pre className="p-6 overflow-x-auto text-sm font-mono leading-relaxed max-h-[700px] text-slate-100">
            <code className="language-tsx">{code}</code>
          </pre>
        </div>
      )}
    </div>
  );
}

// Demo Components
function FocusInputDemo() {
  const inputRef = useRef<HTMLInputElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const focusInput = () => {
    inputRef.current?.focus();
  };

  const focusTextarea = () => {
    textareaRef.current?.focus();
  };

  const clearInput = () => {
    if (inputRef.current) {
      inputRef.current.value = '';
      inputRef.current.focus();
    }
  };

  return (
    <div className="bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-blue-900/30 dark:to-indigo-900/30 p-8 rounded-3xl border border-blue-200 dark:border-blue-700 shadow-xl">
      <h3 className="text-2xl font-black mb-6 flex items-center gap-3 text-blue-800 dark:text-blue-200">
        <Focus className="h-6 w-6" />
        DOM Element Access Demo
      </h3>

      <div className="space-y-6">
        <div>
          <label className="block text-sm font-bold mb-2 text-slate-700 dark:text-slate-300">
            Input Field:
          </label>
          <input
            ref={inputRef}
            type="text"
            className="w-full px-4 py-2 border border-blue-300 dark:border-blue-600 rounded-lg dark:bg-slate-800"
            placeholder="Click buttons below to interact with this input"
          />
        </div>

        <div>
          <label className="block text-sm font-bold mb-2 text-slate-700 dark:text-slate-300">
            Textarea:
          </label>
          <textarea
            ref={textareaRef}
            className="w-full px-4 py-2 border border-blue-300 dark:border-blue-600 rounded-lg dark:bg-slate-800"
            rows={3}
            placeholder="This textarea can also be focused programmatically"
          />
        </div>

        <div className="flex gap-3 flex-wrap">
          <Button onClick={focusInput} className="bg-blue-600 hover:bg-blue-700">
            <Focus className="h-4 w-4 mr-2" />
            Focus Input
          </Button>
          <Button onClick={focusTextarea} variant="outline">
            <Target className="h-4 w-4 mr-2" />
            Focus Textarea
          </Button>
          <Button onClick={clearInput} variant="destructive">
            <RotateCcw className="h-4 w-4 mr-2" />
            Clear Input
          </Button>
        </div>

        <div className="bg-blue-100 dark:bg-blue-900/50 rounded-xl p-4">
          <div className="flex items-center gap-2 text-blue-800 dark:text-blue-200 font-bold mb-2">
            <Eye className="h-5 w-5" />
            Observation
          </div>
          <p className="text-sm text-blue-700 dark:text-blue-300">
            useRef gives you direct access to DOM elements. Notice how we can focus and manipulate
            these elements imperatively without triggering re-renders.
          </p>
        </div>
      </div>
    </div>
  );
}

function PersistentValueDemo() {
  const [count, setCount] = useState(0);
  const renderCountRef = useRef(0);
  const previousCountRef = useRef<number | undefined>(undefined);

  // Update render count on every render
  renderCountRef.current = renderCountRef.current + 1;

  // Store previous count value
  useEffect(() => {
    previousCountRef.current = count;
  });

  const increment = () => setCount(c => c + 1);
  const decrement = () => setCount(c => c - 1);
  const reset = () => setCount(0);

  return (
    <div className="bg-gradient-to-br from-green-50 to-emerald-100 dark:from-green-900/30 dark:to-emerald-900/30 p-8 rounded-3xl border border-green-200 dark:border-green-700 shadow-xl">
      <h3 className="text-2xl font-black mb-6 flex items-center gap-3 text-green-800 dark:text-green-200">
        <Database className="h-6 w-6" />
        Persistent Values Demo
      </h3>

      <div className="space-y-6">
        <div className="grid md:grid-cols-3 gap-4">
          <div className="bg-white/60 dark:bg-slate-800/60 p-4 rounded-xl text-center">
            <div className="text-3xl font-black text-green-600 dark:text-green-400 mb-2">
              {count}
            </div>
            <div className="text-sm text-slate-600 dark:text-slate-400 font-bold">
              Current Count
            </div>
          </div>

          <div className="bg-white/60 dark:bg-slate-800/60 p-4 rounded-xl text-center">
            <div className="text-3xl font-black text-blue-600 dark:text-blue-400 mb-2">
              {previousCountRef.current ?? 0}
            </div>
            <div className="text-sm text-slate-600 dark:text-slate-400 font-bold">
              Previous Count
            </div>
          </div>

          <div className="bg-white/60 dark:bg-slate-800/60 p-4 rounded-xl text-center">
            <div className="text-3xl font-black text-purple-600 dark:text-purple-400 mb-2">
              {renderCountRef.current}
            </div>
            <div className="text-sm text-slate-600 dark:text-slate-400 font-bold">Render Count</div>
          </div>
        </div>

        <div className="flex gap-3 justify-center">
          <Button onClick={increment} className="bg-green-600 hover:bg-green-700">
            <ArrowUp className="h-4 w-4 mr-2" />
            Increment
          </Button>
          <Button onClick={decrement} variant="outline">
            <ArrowDown className="h-4 w-4 mr-2" />
            Decrement
          </Button>
          <Button onClick={reset} variant="destructive">
            <RotateCcw className="h-4 w-4 mr-2" />
            Reset
          </Button>
        </div>

        <div className="bg-green-100 dark:bg-green-900/50 rounded-xl p-4">
          <div className="flex items-center gap-2 text-green-800 dark:text-green-200 font-bold mb-2">
            <Database className="h-5 w-5" />
            Key Points
          </div>
          <ul className="text-sm text-green-700 dark:text-green-300 space-y-1">
            <li>• renderCountRef tracks renders without causing re-renders</li>
            <li>• previousCountRef persists the previous state value</li>
            <li>• Values persist across renders but don't trigger updates</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

function TimerDemo() {
  const [seconds, setSeconds] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const startTimer = () => {
    if (!isRunning) {
      setIsRunning(true);
      intervalRef.current = setInterval(() => {
        setSeconds(prev => prev + 1);
      }, 1000);
    }
  };

  const stopTimer = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    setIsRunning(false);
  };

  const resetTimer = () => {
    stopTimer();
    setSeconds(0);
  };

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);

  const formatTime = (totalSeconds: number) => {
    const mins = Math.floor(totalSeconds / 60);
    const secs = totalSeconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="bg-gradient-to-br from-purple-50 to-violet-100 dark:from-purple-900/30 dark:to-violet-900/30 p-8 rounded-3xl border border-purple-200 dark:border-purple-700 shadow-xl">
      <h3 className="text-2xl font-black mb-6 flex items-center gap-3 text-purple-800 dark:text-purple-200">
        <Clock className="h-6 w-6" />
        Timer with useRef
      </h3>

      <div className="text-center space-y-6">
        <div className="text-6xl font-black font-mono text-purple-600 dark:text-purple-400">
          {formatTime(seconds)}
        </div>

        <div className="flex gap-4 justify-center">
          <Button
            onClick={startTimer}
            disabled={isRunning}
            className="bg-green-600 hover:bg-green-700 disabled:opacity-50"
          >
            <PlayCircle className="h-4 w-4 mr-2" />
            Start
          </Button>
          <Button
            onClick={stopTimer}
            disabled={!isRunning}
            className="bg-red-600 hover:bg-red-700 disabled:opacity-50"
          >
            <PauseCircle className="h-4 w-4 mr-2" />
            Stop
          </Button>
          <Button onClick={resetTimer} variant="outline">
            <RotateCcw className="h-4 w-4 mr-2" />
            Reset
          </Button>
        </div>

        <div className="bg-purple-100 dark:bg-purple-900/50 rounded-xl p-4">
          <div className="flex items-center gap-2 text-purple-800 dark:text-purple-200 font-bold mb-2">
            <Clock className="h-5 w-5" />
            Timer Implementation
          </div>
          <p className="text-sm text-purple-700 dark:text-purple-300">
            useRef stores the interval ID so we can clear it later. This prevents memory leaks and
            allows us to control the timer without re-creating the interval on every render.
          </p>
        </div>
      </div>
    </div>
  );
}

// Custom Input Component with forwardRef
const CustomInput = forwardRef<CustomInputRef, { placeholder?: string }>(function CustomInput(
  { placeholder = 'Enter text...' },
  ref
) {
  const inputRef = useRef<HTMLInputElement>(null);

  useImperativeHandle(ref, () => ({
    focus: () => {
      inputRef.current?.focus();
    },
    clear: () => {
      if (inputRef.current) {
        inputRef.current.value = '';
      }
    },
    getValue: () => {
      return inputRef.current?.value || '';
    },
  }));

  return (
    <input
      ref={inputRef}
      type="text"
      placeholder={placeholder}
      className="w-full px-4 py-2 border border-orange-300 dark:border-orange-600 rounded-lg dark:bg-slate-800 focus:ring-2 focus:ring-orange-500"
    />
  );
});

function ForwardRefDemo() {
  const customInputRef = useRef<CustomInputRef>(null);
  const [value, setValue] = useState('');

  const handleFocus = () => {
    customInputRef.current?.focus();
  };

  const handleClear = () => {
    customInputRef.current?.clear();
    setValue('');
  };

  const handleGetValue = () => {
    const currentValue = customInputRef.current?.getValue();
    setValue(currentValue || '');
  };

  return (
    <div className="bg-gradient-to-br from-orange-50 to-red-100 dark:from-orange-900/30 dark:to-red-900/30 p-8 rounded-3xl border border-orange-200 dark:border-orange-700 shadow-xl">
      <h3 className="text-2xl font-black mb-6 flex items-center gap-3 text-orange-800 dark:text-orange-200">
        <Target className="h-6 w-6" />
        forwardRef + useImperativeHandle Demo
      </h3>

      <div className="space-y-6">
        <div>
          <label className="block text-sm font-bold mb-2 text-slate-700 dark:text-slate-300">
            Custom Input Component:
          </label>
          <CustomInput ref={customInputRef} placeholder="Type something here..." />
        </div>

        <div className="flex gap-3 flex-wrap">
          <Button onClick={handleFocus} className="bg-orange-600 hover:bg-orange-700">
            <Focus className="h-4 w-4 mr-2" />
            Focus Input
          </Button>
          <Button onClick={handleClear} variant="outline">
            <RotateCcw className="h-4 w-4 mr-2" />
            Clear Input
          </Button>
          <Button onClick={handleGetValue} variant="secondary">
            <Search className="h-4 w-4 mr-2" />
            Get Value
          </Button>
        </div>

        {value && (
          <div className="bg-white/60 dark:bg-slate-800/60 p-4 rounded-xl">
            <p className="text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">
              Current Value:
            </p>
            <p className="text-lg font-mono text-orange-600 dark:text-orange-400">"{value}"</p>
          </div>
        )}

        <div className="bg-orange-100 dark:bg-orange-900/50 rounded-xl p-4">
          <div className="flex items-center gap-2 text-orange-800 dark:text-orange-200 font-bold mb-2">
            <Target className="h-5 w-5" />
            Advanced Pattern
          </div>
          <p className="text-sm text-orange-700 dark:text-orange-300">
            This demonstrates forwardRef + useImperativeHandle to expose custom methods from child
            components to parent components.
          </p>
        </div>
      </div>
    </div>
  );
}

function ScrollToTopDemo() {
  const topRef = useRef<HTMLDivElement>(null);

  const scrollToTop = () => {
    topRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="bg-gradient-to-br from-teal-50 to-cyan-100 dark:from-teal-900/30 dark:to-cyan-900/30 p-8 rounded-3xl border border-teal-200 dark:border-teal-700 shadow-xl">
      <div ref={topRef}>
        <h3 className="text-2xl font-black mb-6 flex items-center gap-3 text-teal-800 dark:text-teal-200">
          <MousePointer className="h-6 w-6" />
          Scroll Behavior Demo
        </h3>
      </div>

      <div className="space-y-4 max-h-64 overflow-y-auto bg-white/60 dark:bg-slate-800/60 p-4 rounded-xl">
        {Array.from({ length: 20 }, (_, i) => (
          <div key={i} className="p-4 bg-teal-100 dark:bg-teal-900/50 rounded-lg">
            <h4 className="font-bold text-teal-800 dark:text-teal-300">Item #{i + 1}</h4>
            <p className="text-sm text-slate-600 dark:text-slate-400">
              This is some content for item {i + 1}. Scroll down to see more items, then use the
              button below to scroll back to the top.
            </p>
          </div>
        ))}
      </div>

      <Button onClick={scrollToTop} className="w-full mt-4 bg-teal-600 hover:bg-teal-700">
        <ArrowUp className="h-4 w-4 mr-2" />
        Scroll to Top
      </Button>
    </div>
  );
}

export default function UseRefPage() {
  const [activeTab, setActiveTab] = useState('intro');

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-emerald-50/50 to-teal-50/50 dark:from-slate-950 dark:via-emerald-950/50 dark:to-teal-950/50">
      {/* Hero Header */}
      <div className="relative bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 text-white py-24 px-4 mb-16 shadow-2xl overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-10 left-10 w-20 h-20 bg-white/10 rounded-full animate-pulse"></div>
          <div className="absolute top-32 right-20 w-32 h-32 bg-white/5 rounded-full animate-bounce"></div>
          <div className="absolute bottom-20 left-1/4 w-16 h-16 bg-white/10 rounded-full animate-ping"></div>
        </div>

        <div className="container mx-auto max-w-7xl relative z-10">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-12 h-12 bg-white/20 backdrop-blur-md rounded-2xl flex items-center justify-center border border-white/30">
              <Target className="h-6 w-6 text-white" />
            </div>
            <Badge className="bg-white/20 backdrop-blur-md text-white hover:bg-white/30 border-white/30 px-4 py-2 text-sm font-bold">
              🎯 React Hook
            </Badge>
          </div>

          <h1 className="text-6xl sm:text-7xl font-black mb-8 leading-tight">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-white via-emerald-100 to-teal-100">
              useRef
            </span>
            <div className="text-4xl sm:text-5xl mt-2 font-light text-white/90">Reference Hook</div>
          </h1>

          <p className="text-xl text-white/90 max-w-4xl leading-relaxed font-medium">
            🎯 Khám phá useRef - Hook đa năng để truy cập DOM elements, lưu trữ mutable values và
            tạo references không gây re-render khi thay đổi
          </p>

          <div className="flex items-center gap-4 mt-8">
            <Sparkles className="h-5 w-5 text-yellow-300 animate-pulse" />
            <span className="text-white/80 text-sm font-medium">
              Từ DOM manipulation đến advanced patterns với forwardRef
            </span>
          </div>
        </div>
      </div>

      <div className="container mx-auto max-w-7xl px-4 pb-32">
        <Tabs defaultValue="intro" value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="bg-white/95 dark:bg-slate-800/95 backdrop-blur-xl p-3 shadow-2xl rounded-3xl border border-slate-200/50 dark:border-slate-700/50 mb-16 grid grid-cols-5 gap-2">
            {[
              {
                value: 'intro',
                icon: '📚',
                text: 'Giới thiệu',
                gradient: 'from-emerald-500 to-teal-500',
              },
              {
                value: 'dom',
                icon: '🎯',
                text: 'DOM Access',
                gradient: 'from-blue-500 to-indigo-500',
              },
              {
                value: 'values',
                icon: '💾',
                text: 'Mutable Values',
                gradient: 'from-purple-500 to-violet-500',
              },
              {
                value: 'patterns',
                icon: '🏗️',
                text: 'Patterns',
                gradient: 'from-orange-500 to-red-500',
              },
              {
                value: 'examples',
                icon: '🚀',
                text: 'Demo',
                gradient: 'from-pink-500 to-rose-500',
              },
            ].map(tab => (
              <TabsTrigger
                key={tab.value}
                value={tab.value}
                className={`rounded-2xl data-[state=active]:bg-gradient-to-r data-[state=active]:${tab.gradient} data-[state=active]:text-white data-[state=active]:shadow-xl transition-all duration-300 font-semibold py-3`}
              >
                <span className="text-base">{tab.icon}</span>
                <span className="ml-2 hidden sm:inline">{tab.text}</span>
              </TabsTrigger>
            ))}
          </TabsList>

          {/* Tab Contents */}
          <TabsContent value="intro">
            <Card className="border-0 shadow-2xl bg-white/98 dark:bg-slate-800/98 backdrop-blur-md rounded-3xl overflow-hidden">
              <CardContent className="p-12">
                <div className="flex items-center gap-6 mb-10">
                  <div className="w-16 h-16 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-3xl flex items-center justify-center shadow-xl">
                    <span className="text-3xl">🎯</span>
                  </div>
                  <div>
                    <h2 className="text-4xl font-black text-slate-900 dark:text-white mb-2">
                      useRef là gì?
                    </h2>
                    <p className="text-slate-600 dark:text-slate-400 text-lg">
                      Hook để tạo mutable references
                    </p>
                  </div>
                </div>

                <div className="prose prose-xl max-w-none dark:prose-invert mb-12">
                  <p className="text-slate-700 dark:text-slate-300 text-xl leading-relaxed">
                    <code className="bg-gradient-to-r from-emerald-100 to-teal-100 dark:from-emerald-900/60 dark:to-teal-900/60 px-3 py-2 rounded-lg text-emerald-800 dark:text-emerald-200 font-bold text-lg">
                      useRef
                    </code>{' '}
                    là một Hook cho phép bạn tạo ra một{' '}
                    <span className="font-bold text-teal-600 dark:text-teal-400">
                      mutable reference
                    </span>{' '}
                    có thể tồn tại qua các lần render mà không gây ra re-render khi giá trị thay
                    đổi.
                  </p>
                </div>

                <div className="grid lg:grid-cols-2 gap-8 mb-12">
                  <div className="bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50 dark:from-emerald-900/30 dark:via-teal-900/30 dark:to-cyan-900/30 p-8 rounded-3xl border border-emerald-200/60 dark:border-emerald-800/60 shadow-xl">
                    <h4 className="font-black text-emerald-800 dark:text-emerald-300 mb-6 flex items-center gap-3 text-xl">
                      <span className="text-2xl">🎯</span> Use Cases chính
                    </h4>
                    <ul className="space-y-4 text-slate-700 dark:text-slate-300">
                      <li className="flex items-center gap-3 p-3 bg-white/60 dark:bg-slate-800/60 rounded-xl">
                        <span className="text-xl">🔍</span>
                        <span className="font-semibold">Truy cập DOM elements</span>
                      </li>
                      <li className="flex items-center gap-3 p-3 bg-white/60 dark:bg-slate-800/60 rounded-xl">
                        <span className="text-xl">💾</span>
                        <span className="font-semibold">Lưu trữ mutable values</span>
                      </li>
                      <li className="flex items-center gap-3 p-3 bg-white/60 dark:bg-slate-800/60 rounded-xl">
                        <span className="text-xl">⏱️</span>
                        <span className="font-semibold">Store timer IDs</span>
                      </li>
                      <li className="flex items-center gap-3 p-3 bg-white/60 dark:bg-slate-800/60 rounded-xl">
                        <span className="text-xl">📝</span>
                        <span className="font-semibold">Previous state values</span>
                      </li>
                    </ul>
                  </div>

                  <div className="bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-blue-900/30 dark:via-indigo-900/30 dark:to-purple-900/30 p-8 rounded-3xl border border-blue-200/60 dark:border-blue-800/60 shadow-xl">
                    <h4 className="font-black text-blue-800 dark:text-blue-300 mb-6 flex items-center gap-3 text-xl">
                      <span className="text-2xl">⚡</span> useRef vs useState
                    </h4>
                    <div className="space-y-4 text-slate-700 dark:text-slate-300">
                      <div className="p-3 bg-white/60 dark:bg-slate-800/60 rounded-xl">
                        <div className="font-bold text-green-600 dark:text-green-400 mb-1">
                          useRef:
                        </div>
                        <div className="text-sm">Không gây re-render khi thay đổi</div>
                      </div>
                      <div className="p-3 bg-white/60 dark:bg-slate-800/60 rounded-xl">
                        <div className="font-bold text-blue-600 dark:text-blue-400 mb-1">
                          useState:
                        </div>
                        <div className="text-sm">Gây re-render khi state thay đổi</div>
                      </div>
                      <div className="p-3 bg-white/60 dark:bg-slate-800/60 rounded-xl">
                        <div className="font-bold text-purple-600 dark:text-purple-400 mb-1">
                          Kết hợp:
                        </div>
                        <div className="text-sm">Sử dụng cả hai để tối ưu performance</div>
                      </div>
                    </div>
                  </div>
                </div>

                <RawCode
                  fileName="useRef-basic.tsx"
                  code={`import { useRef, useState } from 'react';

function MyComponent() {
  // useRef trả về object với thuộc tính .current
  const myRef = useRef(null);
  const countRef = useRef(0);
  const [, forceRender] = useState({});

  const handleClick = () => {
    // Thay đổi ref.current không gây re-render
    countRef.current = countRef.current + 1;
    console.log('Clicked', countRef.current, 'times');

    // Force re-render để thấy giá trị mới
    forceRender({});
  };

  return (
    <div>
      <input ref={myRef} type="text" />
      <button onClick={() => myRef.current?.focus()}>
        Focus Input
      </button>
      <button onClick={handleClick}>
        Click count: {countRef.current}
      </button>
    </div>
  );
}`}
                />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="dom">
            <Card className="border-0 shadow-2xl bg-white/98 dark:bg-slate-800/98 backdrop-blur-md rounded-3xl overflow-hidden">
              <CardContent className="p-12">
                <div className="flex items-center gap-6 mb-10">
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-3xl flex items-center justify-center shadow-xl">
                    <span className="text-3xl">🎯</span>
                  </div>
                  <div>
                    <h2 className="text-4xl font-black text-slate-900 dark:text-white mb-2">
                      DOM Element Access
                    </h2>
                    <p className="text-slate-600 dark:text-slate-400 text-lg">
                      Truy cập và thao tác với DOM elements
                    </p>
                  </div>
                </div>

                <div className="space-y-16">
                  <div>
                    <h3 className="text-3xl font-black mb-6 text-slate-900 dark:text-white">
                      🔍 Basic DOM Access
                    </h3>
                    <RawCode
                      fileName="dom-access.tsx"
                      code={`import { useRef, useEffect } from 'react';

function FocusInput() {
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    // Focus input khi component mount
    inputRef.current?.focus();
  }, []);

  const handleButtonClick = () => {
    // Programmatically focus input
    inputRef.current?.focus();
  };

  const handleClear = () => {
    if (inputRef.current) {
      inputRef.current.value = '';
      inputRef.current.focus();
    }
  };

  return (
    <div>
      <input
        ref={inputRef}
        type="text"
        placeholder="This input will be focused on mount"
      />
      <button onClick={handleButtonClick}>Focus Input</button>
      <button onClick={handleClear}>Clear & Focus</button>
    </div>
  );
}`}
                    />
                  </div>

                  <div>
                    <h3 className="text-3xl font-black mb-6 text-slate-900 dark:text-white">
                      📏 Measuring Elements
                    </h3>
                    <RawCode
                      fileName="measure-elements.tsx"
                      code={`function MeasureElement() {
  const divRef = useRef<HTMLDivElement>(null);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  const measureElement = () => {
    if (divRef.current) {
      const { offsetWidth, offsetHeight } = divRef.current;
      setDimensions({ width: offsetWidth, height: offsetHeight });
    }
  };

  return (
    <div>
      <div
        ref={divRef}
        style={{
          width: '200px',
          height: '100px',
          backgroundColor: 'lightblue',
          padding: '20px',
          margin: '10px'
        }}
      >
        Measure this element!
      </div>

      <button onClick={measureElement}>Get Dimensions</button>

      <p>Width: {dimensions.width}px</p>
      <p>Height: {dimensions.height}px</p>
    </div>
  );
}`}
                    />
                  </div>

                  <FocusInputDemo />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="values">
            <Card className="border-0 shadow-2xl bg-white/98 dark:bg-slate-800/98 backdrop-blur-md rounded-3xl overflow-hidden">
              <CardContent className="p-12">
                <div className="flex items-center gap-6 mb-10">
                  <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-violet-600 rounded-3xl flex items-center justify-center shadow-xl">
                    <span className="text-3xl">💾</span>
                  </div>
                  <div>
                    <h2 className="text-4xl font-black text-slate-900 dark:text-white mb-2">
                      Mutable Values
                    </h2>
                    <p className="text-slate-600 dark:text-slate-400 text-lg">
                      Lưu trữ values không gây re-render
                    </p>
                  </div>
                </div>

                <div className="space-y-16">
                  <div>
                    <h3 className="text-3xl font-black mb-6 text-slate-900 dark:text-white">
                      🔢 Storing Previous Values
                    </h3>
                    <RawCode
                      fileName="previous-values.tsx"
                      code={`function PreviousValueTracker() {
  const [count, setCount] = useState(0);
  const previousCountRef = useRef<number>();

  useEffect(() => {
    // Store previous value after render
    previousCountRef.current = count;
  });

  return (
    <div>
      <p>Current count: {count}</p>
      <p>Previous count: {previousCountRef.current}</p>
      <button onClick={() => setCount(count + 1)}>
        Increment
      </button>
    </div>
  );
}`}
                    />
                  </div>

                  <div>
                    <h3 className="text-3xl font-black mb-6 text-slate-900 dark:text-white">
                      ⏰ Timer References
                    </h3>
                    <RawCode
                      fileName="timer-ref.tsx"
                      code={`function Timer() {
  const [seconds, setSeconds] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const startTimer = () => {
    if (intervalRef.current) return; // Already running

    setIsRunning(true);
    intervalRef.current = setInterval(() => {
      setSeconds(prev => prev + 1);
    }, 1000);
  };

  const stopTimer = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    setIsRunning(false);
  };

  const resetTimer = () => {
    stopTimer();
    setSeconds(0);
  };

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);

  return (
    <div>
      <div>Time: {seconds}s</div>
      <button onClick={startTimer} disabled={isRunning}>
        Start
      </button>
      <button onClick={stopTimer} disabled={!isRunning}>
        Stop
      </button>
      <button onClick={resetTimer}>Reset</button>
    </div>
  );
}`}
                    />
                  </div>

                  <PersistentValueDemo />
                  <TimerDemo />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="patterns">
            <Card className="border-0 shadow-2xl bg-white/98 dark:bg-slate-800/98 backdrop-blur-md rounded-3xl overflow-hidden">
              <CardContent className="p-12">
                <div className="flex items-center gap-6 mb-10">
                  <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-red-600 rounded-3xl flex items-center justify-center shadow-xl">
                    <span className="text-3xl">🏗️</span>
                  </div>
                  <div>
                    <h2 className="text-4xl font-black text-slate-900 dark:text-white mb-2">
                      Advanced Patterns
                    </h2>
                    <p className="text-slate-600 dark:text-slate-400 text-lg">
                      forwardRef và useImperativeHandle
                    </p>
                  </div>
                </div>

                <div className="space-y-16">
                  <div>
                    <h3 className="text-3xl font-black mb-6 text-slate-900 dark:text-white">
                      📤 forwardRef Pattern
                    </h3>
                    <RawCode
                      fileName="forward-ref.tsx"
                      code={`import { forwardRef, useRef } from 'react';

// Child component with forwardRef
const CustomInput = forwardRef<HTMLInputElement, { placeholder?: string }>(
  function CustomInput({ placeholder }, ref) {
    return (
      <input
        ref={ref}
        type="text"
        placeholder={placeholder}
        className="border p-2 rounded"
      />
    );
  }
);

// Parent component
function Parent() {
  const inputRef = useRef<HTMLInputElement>(null);

  const focusInput = () => {
    inputRef.current?.focus();
  };

  return (
    <div>
      <CustomInput ref={inputRef} placeholder="Custom input" />
      <button onClick={focusInput}>Focus Custom Input</button>
    </div>
  );
}`}
                    />
                  </div>

                  <div>
                    <h3 className="text-3xl font-black mb-6 text-slate-900 dark:text-white">
                      🎛️ useImperativeHandle
                    </h3>
                    <RawCode
                      fileName="imperative-handle.tsx"
                      code={`import { forwardRef, useImperativeHandle, useRef } from 'react';

interface VideoPlayerRef {
  play: () => void;
  pause: () => void;
  reset: () => void;
  getCurrentTime: () => number;
}

const VideoPlayer = forwardRef<VideoPlayerRef, { src: string }>(
  function VideoPlayer({ src }, ref) {
    const videoRef = useRef<HTMLVideoElement>(null);

    useImperativeHandle(ref, () => ({
      play: () => {
        videoRef.current?.play();
      },
      pause: () => {
        videoRef.current?.pause();
      },
      reset: () => {
        if (videoRef.current) {
          videoRef.current.currentTime = 0;
          videoRef.current.pause();
        }
      },
      getCurrentTime: () => {
        return videoRef.current?.currentTime || 0;
      }
    }));

    return <video ref={videoRef} src={src} controls />;
  }
);

// Usage
function App() {
  const playerRef = useRef<VideoPlayerRef>(null);

  return (
    <div>
      <VideoPlayer ref={playerRef} src="video.mp4" />
      <button onClick={() => playerRef.current?.play()}>Play</button>
      <button onClick={() => playerRef.current?.pause()}>Pause</button>
      <button onClick={() => playerRef.current?.reset()}>Reset</button>
    </div>
  );
}`}
                    />
                  </div>

                  <ForwardRefDemo />
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
                      Interactive Demos
                    </h2>
                    <p className="text-slate-600 dark:text-slate-400 text-lg">
                      Thử nghiệm useRef trong thực tế
                    </p>
                  </div>
                </div>

                <div className="space-y-12">
                  <ScrollToTopDemo />
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}

