'use client';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  AlertTriangle,
  Check,
  CheckCircle,
  ChevronDown,
  ChevronUp,
  Code2,
  Copy,
  Cpu,
  Plus,
  Search,
  Sparkles,
  Target,
  Timer,
  Trash2,
  User,
  Users,
  Zap,
} from 'lucide-react';
import { memo, ReactNode, useCallback, useMemo, useState } from 'react';

// Interfaces
interface RawCodeProps {
  code: string;
  fileName?: string;
  language?: string;
}

interface Todo {
  id: number;
  text: string;
  completed: boolean;
}

interface User {
  id: number;
  name: string;
  email: string;
  age: number;
}

interface PerformanceMetrics {
  renderCount: number;
  lastRender: string;
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

// Performance monitoring component
function PerformanceTracker({ name, children }: { name: string; children: ReactNode }) {
  const [metrics, setMetrics] = useState<PerformanceMetrics>({ renderCount: 0, lastRender: '' });

  useState(() => {
    setMetrics(prev => ({
      renderCount: prev.renderCount + 1,
      lastRender: new Date().toLocaleTimeString(),
    }));
  });

  return (
    <div className="border border-purple-200 dark:border-purple-700 rounded-xl p-4 bg-purple-50/50 dark:bg-purple-900/20">
      <div className="flex justify-between items-center mb-3">
        <span className="text-sm font-bold text-purple-800 dark:text-purple-200">{name}</span>
        <div className="flex items-center gap-2 text-xs text-purple-600 dark:text-purple-400">
          <Timer className="h-3 w-3" />
          <span>Renders: {metrics.renderCount}</span>
          <span>•</span>
          <span>Last: {metrics.lastRender}</span>
        </div>
      </div>
      {children}
    </div>
  );
}

// Demo Components
const ExpensiveChild = memo(function ExpensiveChild({
  onClick,
  name,
}: {
  onClick: () => void;
  name: string;
}) {
  const [renderCount, setRenderCount] = useState(0);

  useState(() => {
    setRenderCount(prev => prev + 1);
  });

  return (
    <PerformanceTracker name={`ExpensiveChild (${name})`}>
      <div className="space-y-3">
        <p className="text-sm text-slate-600 dark:text-slate-400">
          This component re-renders when props change
        </p>
        <Button onClick={onClick} size="sm" className="w-full">
          Click me! (Rendered {renderCount} times)
        </Button>
      </div>
    </PerformanceTracker>
  );
});

function CallbackBasicDemo() {
  const [count, setCount] = useState(0);
  const [name, setName] = useState('');

  // ❌ Without useCallback - creates new function every render
  const handleClickBad = () => {
    console.log('Button clicked without useCallback');
  };

  // ✅ With useCallback - function only recreated when dependencies change
  const handleClickGood = useCallback(() => {
    console.log('Button clicked with useCallback');
  }, []);

  return (
    <div className="bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-blue-900/30 dark:to-indigo-900/30 p-8 rounded-3xl border border-blue-200 dark:border-blue-700 shadow-xl">
      <h3 className="text-2xl font-black mb-6 flex items-center gap-3 text-blue-800 dark:text-blue-200">
        <Target className="h-6 w-6" />
        useCallback Basic Demo
      </h3>

      <div className="space-y-6">
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-bold mb-2 text-slate-700 dark:text-slate-300">
              Change name (triggers parent re-render):
            </label>
            <input
              type="text"
              value={name}
              onChange={e => setName(e.target.value)}
              className="w-full px-3 py-2 border border-blue-300 dark:border-blue-600 rounded-lg dark:bg-slate-800"
              placeholder="Type your name..."
            />
          </div>
          <div>
            <label className="block text-sm font-bold mb-2 text-slate-700 dark:text-slate-300">
              Counter: {count}
            </label>
            <Button onClick={() => setCount(c => c + 1)} className="w-full">
              Increment Counter
            </Button>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <ExpensiveChild onClick={handleClickBad} name="Without useCallback" />
          <ExpensiveChild onClick={handleClickGood} name="With useCallback" />
        </div>

        <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-700 rounded-xl p-4">
          <div className="flex items-center gap-2 text-yellow-800 dark:text-yellow-200 font-bold mb-2">
            <AlertTriangle className="h-5 w-5" />
            Observation
          </div>
          <p className="text-sm text-yellow-700 dark:text-yellow-300">
            Both components re-render when parent state changes, but the component with useCallback
            maintains referential equality of the onClick function, making it more
            optimization-friendly.
          </p>
        </div>
      </div>
    </div>
  );
}

function TodoListDemo() {
  const [todos, setTodos] = useState<Todo[]>([
    { id: 1, text: 'Learn useCallback', completed: false },
    { id: 2, text: 'Optimize React performance', completed: true },
    { id: 3, text: 'Build awesome apps', completed: false },
  ]);
  const [newTodo, setNewTodo] = useState('');
  const [filter, setFilter] = useState<'all' | 'active' | 'completed'>('all');

  // ✅ useCallback prevents unnecessary re-renders of TodoItem components
  const handleToggle = useCallback((id: number) => {
    setTodos(prev =>
      prev.map(todo => (todo.id === id ? { ...todo, completed: !todo.completed } : todo))
    );
  }, []);

  const handleDelete = useCallback((id: number) => {
    setTodos(prev => prev.filter(todo => todo.id !== id));
  }, []);

  const handleAdd = useCallback(() => {
    if (newTodo.trim()) {
      setTodos(prev => [
        ...prev,
        {
          id: Date.now(),
          text: newTodo.trim(),
          completed: false,
        },
      ]);
      setNewTodo('');
    }
  }, [newTodo]);

  const filteredTodos = useMemo(() => {
    switch (filter) {
      case 'active':
        return todos.filter(todo => !todo.completed);
      case 'completed':
        return todos.filter(todo => todo.completed);
      default:
        return todos;
    }
  }, [todos, filter]);

  return (
    <div className="bg-gradient-to-br from-green-50 to-emerald-100 dark:from-green-900/30 dark:to-emerald-900/30 p-8 rounded-3xl border border-green-200 dark:border-green-700 shadow-xl">
      <h3 className="text-2xl font-black mb-6 flex items-center gap-3 text-green-800 dark:text-green-200">
        <CheckCircle className="h-6 w-6" />
        Todo List with useCallback
      </h3>

      <div className="space-y-6">
        {/* Add Todo */}
        <div className="flex gap-2">
          <input
            type="text"
            value={newTodo}
            onChange={e => setNewTodo(e.target.value)}
            onKeyPress={e => e.key === 'Enter' && handleAdd()}
            className="flex-1 px-4 py-2 border border-green-300 dark:border-green-600 rounded-lg dark:bg-slate-800"
            placeholder="Add new todo..."
          />
          <Button onClick={handleAdd} className="bg-green-600 hover:bg-green-700">
            <Plus className="h-4 w-4" />
          </Button>
        </div>

        {/* Filter */}
        <div className="flex gap-2">
          {(['all', 'active', 'completed'] as const).map(f => (
            <Button
              key={f}
              onClick={() => setFilter(f)}
              variant={filter === f ? 'default' : 'outline'}
              size="sm"
              className="capitalize"
            >
              {f}
            </Button>
          ))}
        </div>

        {/* Todo List */}
        <div className="space-y-3">
          {filteredTodos.map(todo => (
            <TodoItem key={todo.id} todo={todo} onToggle={handleToggle} onDelete={handleDelete} />
          ))}
        </div>

        <div className="bg-green-100 dark:bg-green-900/50 rounded-xl p-4">
          <div className="flex items-center gap-2 text-green-800 dark:text-green-200 font-bold mb-2">
            <CheckCircle className="h-5 w-5" />
            Performance Benefits
          </div>
          <p className="text-sm text-green-700 dark:text-green-300">
            Each TodoItem is memoized and only re-renders when its specific todo changes, thanks to
            useCallback maintaining function reference equality.
          </p>
        </div>
      </div>
    </div>
  );
}

const TodoItem = memo(function TodoItem({
  todo,
  onToggle,
  onDelete,
}: {
  todo: Todo;
  onToggle: (id: number) => void;
  onDelete: (id: number) => void;
}) {
  const [renderCount, setRenderCount] = useState(0);

  useState(() => {
    setRenderCount(prev => prev + 1);
  });

  return (
    <div className="flex items-center gap-3 p-3 bg-white/60 dark:bg-slate-800/60 rounded-lg">
      <input
        type="checkbox"
        checked={todo.completed}
        onChange={() => onToggle(todo.id)}
        className="w-4 h-4 text-green-600"
      />
      <span className={`flex-1 ${todo.completed ? 'line-through text-slate-500' : ''}`}>
        {todo.text}
      </span>
      <span className="text-xs text-slate-500">#{renderCount}</span>
      <Button
        onClick={() => onDelete(todo.id)}
        size="sm"
        variant="destructive"
        className="h-8 w-8 p-0"
      >
        <Trash2 className="h-3 w-3" />
      </Button>
    </div>
  );
});

function SearchDemo() {
  const [users] = useState<User[]>([
    { id: 1, name: 'John Doe', email: 'john@example.com', age: 25 },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com', age: 30 },
    { id: 3, name: 'Bob Johnson', email: 'bob@example.com', age: 35 },
    { id: 4, name: 'Alice Brown', email: 'alice@example.com', age: 28 },
    { id: 5, name: 'Charlie Wilson', email: 'charlie@example.com', age: 32 },
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [minAge, setMinAge] = useState(0);

  // ✅ useCallback for search function
  const handleSearch = useCallback((term: string) => {
    setSearchTerm(term);
  }, []);

  // ✅ useMemo for expensive filtering
  const filteredUsers = useMemo(() => {
    console.log('🔍 Filtering users...');
    return users
      .filter(
        user =>
          user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          user.email.toLowerCase().includes(searchTerm.toLowerCase())
      )
      .filter(user => user.age >= minAge);
  }, [users, searchTerm, minAge]);

  return (
    <div className="bg-gradient-to-br from-purple-50 to-violet-100 dark:from-purple-900/30 dark:to-violet-900/30 p-8 rounded-3xl border border-purple-200 dark:border-purple-700 shadow-xl">
      <h3 className="text-2xl font-black mb-6 flex items-center gap-3 text-purple-800 dark:text-purple-200">
        <Search className="h-6 w-6" />
        Search with useCallback + useMemo
      </h3>

      <div className="space-y-6">
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-bold mb-2 text-slate-700 dark:text-slate-300">
              Search users:
            </label>
            <SearchInput onSearch={handleSearch} />
          </div>
          <div>
            <label className="block text-sm font-bold mb-2 text-slate-700 dark:text-slate-300">
              Minimum age: {minAge}
            </label>
            <input
              type="range"
              min="0"
              max="50"
              value={minAge}
              onChange={e => setMinAge(Number(e.target.value))}
              className="w-full"
            />
          </div>
        </div>

        <div className="grid gap-3">
          <div className="flex items-center gap-2 text-sm text-purple-700 dark:text-purple-300">
            <Users className="h-4 w-4" />
            Found {filteredUsers.length} users
          </div>
          {filteredUsers.map(user => (
            <UserCard key={user.id} user={user} />
          ))}
        </div>

        <div className="bg-purple-100 dark:bg-purple-900/50 rounded-xl p-4">
          <div className="flex items-center gap-2 text-purple-800 dark:text-purple-200 font-bold mb-2">
            <Cpu className="h-5 w-5" />
            Optimization Strategy
          </div>
          <p className="text-sm text-purple-700 dark:text-purple-300">
            useCallback prevents SearchInput from re-rendering unnecessarily, while useMemo caches
            the expensive filtering operation.
          </p>
        </div>
      </div>
    </div>
  );
}

const SearchInput = memo(function SearchInput({ onSearch }: { onSearch: (term: string) => void }) {
  const [renderCount, setRenderCount] = useState(0);

  useState(() => {
    setRenderCount(prev => prev + 1);
  });

  return (
    <div className="relative">
      <input
        type="text"
        onChange={e => onSearch(e.target.value)}
        className="w-full px-4 py-2 pl-10 border border-purple-300 dark:border-purple-600 rounded-lg dark:bg-slate-800"
        placeholder="Search by name or email..."
      />
      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
      <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-xs text-slate-500">
        #{renderCount}
      </span>
    </div>
  );
});

const UserCard = memo(function UserCard({ user }: { user: User }) {
  return (
    <div className="flex items-center gap-4 p-4 bg-white/60 dark:bg-slate-800/60 rounded-lg">
      <div className="w-10 h-10 bg-purple-200 dark:bg-purple-700 rounded-full flex items-center justify-center">
        <User className="h-5 w-5 text-purple-600 dark:text-purple-300" />
      </div>
      <div className="flex-1">
        <h4 className="font-bold text-slate-900 dark:text-white">{user.name}</h4>
        <p className="text-sm text-slate-600 dark:text-slate-400">{user.email}</p>
      </div>
      <div className="text-right">
        <span className="text-sm font-bold text-purple-600 dark:text-purple-400">
          {user.age} years
        </span>
      </div>
    </div>
  );
});

export default function UseCallbackPage() {
  const [activeTab, setActiveTab] = useState('intro');

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-orange-50/50 to-yellow-50/50 dark:from-slate-950 dark:via-orange-950/50 dark:to-yellow-950/50">
      {/* Hero Header */}
      <div className="relative bg-gradient-to-r from-orange-600 via-red-600 to-pink-600 text-white py-24 px-4 mb-16 shadow-2xl overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-10 left-10 w-20 h-20 bg-white/10 rounded-full animate-pulse"></div>
          <div className="absolute top-32 right-20 w-32 h-32 bg-white/5 rounded-full animate-bounce"></div>
          <div className="absolute bottom-20 left-1/4 w-16 h-16 bg-white/10 rounded-full animate-ping"></div>
        </div>

        <div className="container mx-auto max-w-7xl relative z-10">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-12 h-12 bg-white/20 backdrop-blur-md rounded-2xl flex items-center justify-center border border-white/30">
              <Zap className="h-6 w-6 text-white" />
            </div>
            <Badge className="bg-white/20 backdrop-blur-md text-white hover:bg-white/30 border-white/30 px-4 py-2 text-sm font-bold">
              ⚡ Performance Hook
            </Badge>
          </div>

          <h1 className="text-6xl sm:text-7xl font-black mb-8 leading-tight">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-white via-orange-100 to-yellow-100">
              useCallback
            </span>
            <div className="text-4xl sm:text-5xl mt-2 font-light text-white/90">
              Memoization Hook
            </div>
          </h1>

          <p className="text-xl text-white/90 max-w-4xl leading-relaxed font-medium">
            ⚡ Master useCallback - Hook tối ưu hóa performance bằng cách memoize functions, ngăn
            chặn unnecessary re-renders và cải thiện hiệu suất ứng dụng React
          </p>

          <div className="flex items-center gap-4 mt-8">
            <Sparkles className="h-5 w-5 text-yellow-300 animate-pulse" />
            <span className="text-white/80 text-sm font-medium">
              Từ cơ bản đến optimization patterns với React.memo
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
                gradient: 'from-orange-500 to-red-500',
              },
              {
                value: 'basic',
                icon: '🎯',
                text: 'Cơ bản',
                gradient: 'from-blue-500 to-indigo-500',
              },
              {
                value: 'optimization',
                icon: '⚡',
                text: 'Tối ưu',
                gradient: 'from-green-500 to-emerald-500',
              },
              {
                value: 'patterns',
                icon: '🏗️',
                text: 'Patterns',
                gradient: 'from-purple-500 to-violet-500',
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
                  <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-red-600 rounded-3xl flex items-center justify-center shadow-xl">
                    <span className="text-3xl">⚡</span>
                  </div>
                  <div>
                    <h2 className="text-4xl font-black text-slate-900 dark:text-white mb-2">
                      useCallback là gì?
                    </h2>
                    <p className="text-slate-600 dark:text-slate-400 text-lg">
                      Hook để memoize functions và tối ưu performance
                    </p>
                  </div>
                </div>

                <div className="prose prose-xl max-w-none dark:prose-invert mb-12">
                  <p className="text-slate-700 dark:text-slate-300 text-xl leading-relaxed">
                    <code className="bg-gradient-to-r from-orange-100 to-red-100 dark:from-orange-900/60 dark:to-red-900/60 px-3 py-2 rounded-lg text-orange-800 dark:text-orange-200 font-bold text-lg">
                      useCallback
                    </code>{' '}
                    là một Hook cho phép bạn{' '}
                    <span className="font-bold text-red-600 dark:text-red-400">
                      memoize một function
                    </span>{' '}
                    để nó không bị tạo lại trong mỗi lần render, trừ khi dependencies thay đổi. Điều
                    này giúp tối ưu hóa performance khi pass functions xuống child components.
                  </p>
                </div>

                <div className="grid lg:grid-cols-2 gap-8 mb-12">
                  <div className="bg-gradient-to-br from-red-50 via-orange-50 to-yellow-50 dark:from-red-900/30 dark:via-orange-900/30 dark:to-yellow-900/30 p-8 rounded-3xl border border-red-200/60 dark:border-red-800/60 shadow-xl">
                    <h4 className="font-black text-red-800 dark:text-red-300 mb-6 flex items-center gap-3 text-xl">
                      <span className="text-2xl">❌</span> Vấn đề không dùng useCallback
                    </h4>
                    <ul className="space-y-4 text-slate-700 dark:text-slate-300">
                      <li className="flex items-center gap-3 p-3 bg-white/60 dark:bg-slate-800/60 rounded-xl">
                        <span className="text-xl">🔄</span>
                        <span className="font-semibold">Function được tạo mới mỗi render</span>
                      </li>
                      <li className="flex items-center gap-3 p-3 bg-white/60 dark:bg-slate-800/60 rounded-xl">
                        <span className="text-xl">📉</span>
                        <span className="font-semibold">
                          Child components re-render không cần thiết
                        </span>
                      </li>
                      <li className="flex items-center gap-3 p-3 bg-white/60 dark:bg-slate-800/60 rounded-xl">
                        <span className="text-xl">🐌</span>
                        <span className="font-semibold">
                          Performance giảm với component tree lớn
                        </span>
                      </li>
                    </ul>
                  </div>

                  <div className="bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 dark:from-green-900/30 dark:via-emerald-900/30 dark:to-teal-900/30 p-8 rounded-3xl border border-green-200/60 dark:border-green-800/60 shadow-xl">
                    <h4 className="font-black text-green-800 dark:text-green-300 mb-6 flex items-center gap-3 text-xl">
                      <span className="text-2xl">✅</span> useCallback giải quyết
                    </h4>
                    <ul className="space-y-4 text-slate-700 dark:text-slate-300">
                      <li className="flex items-center gap-3 p-3 bg-white/60 dark:bg-slate-800/60 rounded-xl">
                        <span className="text-xl">🎯</span>
                        <span className="font-semibold">Function reference ổn định</span>
                      </li>
                      <li className="flex items-center gap-3 p-3 bg-white/60 dark:bg-slate-800/60 rounded-xl">
                        <span className="text-xl">⚡</span>
                        <span className="font-semibold">Tối ưu với React.memo</span>
                      </li>
                      <li className="flex items-center gap-3 p-3 bg-white/60 dark:bg-slate-800/60 rounded-xl">
                        <span className="text-xl">🚀</span>
                        <span className="font-semibold">Performance tốt hơn cho ứng dụng lớn</span>
                      </li>
                    </ul>
                  </div>
                </div>

                <RawCode
                  fileName="useCallback-basic.tsx"
                  code={`import { useState, useCallback } from 'react';

function Parent() {
  const [count, setCount] = useState(0);
  const [name, setName] = useState('');

  // ❌ Function tạo mới mỗi render
  const handleClickBad = () => {
    console.log('Clicked!');
  };

  // ✅ Function được memoize
  const handleClickGood = useCallback(() => {
    console.log('Clicked!');
  }, []); // Empty deps = function never changes

  // ✅ Function depends on count
  const handleIncrement = useCallback(() => {
    setCount(prev => prev + 1);
  }, []); // No deps needed for setState

  return (
    <div>
      <input value={name} onChange={(e) => setName(e.target.value)} />
      <Child onClick={handleClickGood} />
      <button onClick={handleIncrement}>Count: {count}</button>
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
                      Cách sử dụng cơ bản
                    </h2>
                    <p className="text-slate-600 dark:text-slate-400 text-lg">
                      Syntax và dependency array
                    </p>
                  </div>
                </div>

                <div className="space-y-16">
                  <div>
                    <h3 className="text-3xl font-black mb-6 text-slate-900 dark:text-white">
                      📝 Syntax cơ bản
                    </h3>
                    <RawCode
                      fileName="useCallback-syntax.tsx"
                      code={`const memoizedCallback = useCallback(
  () => {
    // Function body
    doSomething(a, b);
  },
  [a, b] // Dependencies array
);

// Equivalent to:
const memoizedCallback = useMemo(() => {
  return () => {
    doSomething(a, b);
  };
}, [a, b]);`}
                    />
                  </div>

                  <div>
                    <h3 className="text-3xl font-black mb-6 text-slate-900 dark:text-white">
                      🎛️ Dependency Array Patterns
                    </h3>
                    <RawCode
                      fileName="dependency-patterns.tsx"
                      code={`function Component() {
  const [count, setCount] = useState(0);
  const [name, setName] = useState('');

  // 1. No dependencies - function never changes
  const handleStatic = useCallback(() => {
    console.log('Static function');
  }, []);

  // 2. With dependencies - function changes when deps change
  const handleDynamic = useCallback(() => {
    console.log(\`Current count: \${count}\`);
  }, [count]);

  // 3. Function that uses setState - typically no deps needed
  const handleIncrement = useCallback(() => {
    setCount(prev => prev + 1); // prev is always current
  }, []);

  // 4. Multiple dependencies
  const handleSubmit = useCallback(() => {
    submitForm(name, count);
  }, [name, count]);

  // 5. Function reference as dependency
  const handleWithCallback = useCallback(() => {
    handleIncrement(); // Reference to another callback
  }, [handleIncrement]);

  return (
    <div>
      <input value={name} onChange={(e) => setName(e.target.value)} />
      <button onClick={handleIncrement}>Count: {count}</button>
      <ChildComponent onSubmit={handleSubmit} />
    </div>
  );
}`}
                    />
                  </div>

                  <div>
                    <h3 className="text-3xl font-black mb-6 text-slate-900 dark:text-white">
                      ⚠️ Common Mistakes
                    </h3>
                    <RawCode
                      fileName="common-mistakes.tsx"
                      code={`function Component() {
  const [user, setUser] = useState({ name: '', age: 0 });

  // ❌ Wrong: Missing dependencies
  const handleBad = useCallback(() => {
    console.log(user.name); // user not in deps!
  }, []);

  // ✅ Correct: Include all dependencies
  const handleGood = useCallback(() => {
    console.log(user.name);
  }, [user.name]); // or [user] if you need the whole object

  // ❌ Wrong: Overusing useCallback
  const handleTrivial = useCallback(() => {
    setUser({ name: 'John', age: 25 });
  }, []); // Unnecessary if this component doesn't pass it down

  // ✅ Better: Only use when passing to memoized children
  const handleOptimized = useCallback(() => {
    setUser({ name: 'John', age: 25 });
  }, []);

  return (
    <div>
      {/* Only use if MemoizedChild is wrapped with memo() */}
      <MemoizedChild onClick={handleOptimized} />
    </div>
  );
}`}
                    />
                  </div>
                </div>
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
                      Optimization Strategies
                    </h2>
                    <p className="text-slate-600 dark:text-slate-400 text-lg">
                      Kết hợp với React.memo và useMemo
                    </p>
                  </div>
                </div>

                <div className="space-y-16">
                  <div>
                    <h3 className="text-3xl font-black mb-6 text-slate-900 dark:text-white">
                      🔗 useCallback + React.memo
                    </h3>
                    <RawCode
                      fileName="memo-optimization.tsx"
                      code={`import { memo, useCallback, useState } from 'react';

// ✅ Memoized child component
const ExpensiveChild = memo(function ExpensiveChild({
  data,
  onUpdate,
  onDelete
}) {
  console.log('ExpensiveChild rendered');

  return (
    <div>
      <h3>{data.title}</h3>
      <button onClick={() => onUpdate(data.id)}>Update</button>
      <button onClick={() => onDelete(data.id)}>Delete</button>
    </div>
  );
});

function Parent() {
  const [items, setItems] = useState([]);
  const [counter, setCounter] = useState(0);

  // ✅ Stable function references
  const handleUpdate = useCallback((id) => {
    setItems(prev => prev.map(item =>
      item.id === id ? { ...item, updated: Date.now() } : item
    ));
  }, []);

  const handleDelete = useCallback((id) => {
    setItems(prev => prev.filter(item => item.id !== id));
  }, []);

  return (
    <div>
      {/* This won't cause ExpensiveChild to re-render */}
      <button onClick={() => setCounter(c => c + 1)}>
        Counter: {counter}
      </button>

      {items.map(item => (
        <ExpensiveChild
          key={item.id}
          data={item}
          onUpdate={handleUpdate}
          onDelete={handleDelete}
        />
      ))}
    </div>
  );
}`}
                    />
                  </div>

                  <div>
                    <h3 className="text-3xl font-black mb-6 text-slate-900 dark:text-white">
                      🎯 useCallback + useMemo
                    </h3>
                    <RawCode
                      fileName="callback-memo-combo.tsx"
                      code={`function SearchableList({ data }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortOrder, setSortOrder] = useState('asc');

  // ✅ Memoize expensive computation
  const filteredAndSorted = useMemo(() => {
    const filtered = data.filter(item =>
      item.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return filtered.sort((a, b) => {
      const order = sortOrder === 'asc' ? 1 : -1;
      return a.name.localeCompare(b.name) * order;
    });
  }, [data, searchTerm, sortOrder]);

  // ✅ Stable event handlers
  const handleSearch = useCallback((term) => {
    setSearchTerm(term);
  }, []);

  const handleSort = useCallback(() => {
    setSortOrder(prev => prev === 'asc' ? 'desc' : 'asc');
  }, []);

  return (
    <div>
      <SearchInput onSearch={handleSearch} />
      <SortButton onSort={handleSort} order={sortOrder} />
      <ItemList items={filteredAndSorted} />
    </div>
  );
}

// Memoized components
const SearchInput = memo(({ onSearch }) => {
  const [value, setValue] = useState('');

  return (
    <input
      value={value}
      onChange={(e) => {
        setValue(e.target.value);
        onSearch(e.target.value);
      }}
    />
  );
});`}
                    />
                  </div>

                  <div>
                    <h3 className="text-3xl font-black mb-6 text-slate-900 dark:text-white">
                      📊 Performance Measurement
                    </h3>
                    <RawCode
                      fileName="performance-profiling.tsx"
                      code={`import { Profiler } from 'react';

function App() {
  const onRenderCallback = useCallback((id, phase, actualDuration) => {
    console.log('Component:', id);
    console.log('Phase:', phase); // 'mount' or 'update'
    console.log('Duration:', actualDuration);
  }, []);

  return (
    <Profiler id="TodoList" onRender={onRenderCallback}>
      <TodoListWithOptimization />
    </Profiler>
  );
}

// You can also use React DevTools Profiler:
// 1. Install React DevTools
// 2. Go to Profiler tab
// 3. Record interactions
// 4. Analyze render times and causes`}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="patterns">
            <Card className="border-0 shadow-2xl bg-white/98 dark:bg-slate-800/98 backdrop-blur-md rounded-3xl overflow-hidden">
              <CardContent className="p-12">
                <div className="flex items-center gap-6 mb-10">
                  <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-violet-600 rounded-3xl flex items-center justify-center shadow-xl">
                    <span className="text-3xl">🏗️</span>
                  </div>
                  <div>
                    <h2 className="text-4xl font-black text-slate-900 dark:text-white mb-2">
                      Advanced Patterns
                    </h2>
                    <p className="text-slate-600 dark:text-slate-400 text-lg">
                      Patterns phổ biến và best practices
                    </p>
                  </div>
                </div>

                <div className="space-y-16">
                  <div>
                    <h3 className="text-3xl font-black mb-6 text-slate-900 dark:text-white">
                      🔄 Event Handlers Pattern
                    </h3>
                    <RawCode
                      fileName="event-handlers.tsx"
                      code={`function Form() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  // ✅ Generic update handler
  const handleFieldChange = useCallback((field) => (value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  }, []);

  // ✅ Specific handlers derived from generic one
  const handleNameChange = useCallback(
    (e) => handleFieldChange('name')(e.target.value),
    [handleFieldChange]
  );

  // ✅ Form submission
  const handleSubmit = useCallback(async (e) => {
    e.preventDefault();
    try {
      await submitForm(formData);
      setFormData({ name: '', email: '', message: '' });
    } catch (error) {
      console.error('Submission failed:', error);
    }
  }, [formData]);

  return (
    <form onSubmit={handleSubmit}>
      <FormField
        name="name"
        value={formData.name}
        onChange={handleFieldChange('name')}
      />
      <FormField
        name="email"
        value={formData.email}
        onChange={handleFieldChange('email')}
      />
      <button type="submit">Submit</button>
    </form>
  );
}`}
                    />
                  </div>

                  <div>
                    <h3 className="text-3xl font-black mb-6 text-slate-900 dark:text-white">
                      📡 API Calls Pattern
                    </h3>
                    <RawCode
                      fileName="api-pattern.tsx"
                      code={`function useApi() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const makeRequest = useCallback(async (url, options = {}) => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(url, options);
      if (!response.ok) throw new Error('Request failed');
      return await response.json();
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  return { makeRequest, loading, error };
}

function UserList() {
  const [users, setUsers] = useState([]);
  const { makeRequest, loading, error } = useApi();

  const fetchUsers = useCallback(async () => {
    try {
      const data = await makeRequest('/api/users');
      setUsers(data);
    } catch (err) {
      // Error is handled by useApi
    }
  }, [makeRequest]);

  const deleteUser = useCallback(async (id) => {
    try {
      await makeRequest(\`/api/users/\${id}\`, { method: 'DELETE' });
      setUsers(prev => prev.filter(user => user.id !== id));
    } catch (err) {
      // Error is handled by useApi
    }
  }, [makeRequest]);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  return (
    <div>
      {loading && <div>Loading...</div>}
      {error && <div>Error: {error}</div>}
      {users.map(user => (
        <UserCard
          key={user.id}
          user={user}
          onDelete={deleteUser}
        />
      ))}
    </div>
  );
}`}
                    />
                  </div>

                  <div>
                    <h3 className="text-3xl font-black mb-6 text-slate-900 dark:text-white">
                      🎛️ Custom Hooks Pattern
                    </h3>
                    <RawCode
                      fileName="custom-hooks.tsx"
                      code={`// Custom hook for form handling
function useForm(initialValues, validationRules) {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});

  const handleChange = useCallback((name, value) => {
    setValues(prev => ({ ...prev, [name]: value }));

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: null }));
    }
  }, [errors]);

  const validate = useCallback(() => {
    const newErrors = {};

    Object.keys(validationRules).forEach(field => {
      const rule = validationRules[field];
      const value = values[field];

      if (rule.required && !value) {
        newErrors[field] = \`\${field} is required\`;
      } else if (rule.pattern && !rule.pattern.test(value)) {
        newErrors[field] = rule.message;
      }
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }, [values, validationRules]);

  const reset = useCallback(() => {
    setValues(initialValues);
    setErrors({});
  }, [initialValues]);

  return {
    values,
    errors,
    handleChange,
    validate,
    reset,
    isValid: Object.keys(errors).length === 0
  };
}

// Usage
function ContactForm() {
  const { values, errors, handleChange, validate, reset } = useForm(
    { name: '', email: '', message: '' },
    {
      name: { required: true },
      email: {
        required: true,
        pattern: /^[^@]+@[^@]+\.[^@]+$/,
        message: 'Invalid email format'
      }
    }
  );

  const handleSubmit = useCallback(async (e) => {
    e.preventDefault();
    if (validate()) {
      await submitForm(values);
      reset();
    }
  }, [validate, values, reset]);

  return (
    <form onSubmit={handleSubmit}>
      {/* Form fields */}
    </form>
  );
}`}
                    />
                  </div>
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
                      Thử nghiệm useCallback trong thực tế
                    </p>
                  </div>
                </div>

                <div className="space-y-12">
                  <CallbackBasicDemo />
                  <TodoListDemo />
                  <SearchDemo />
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
