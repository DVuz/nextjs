'use client';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Activity,
  ArrowDown,
  ArrowUp,
  ChevronDown,
  ChevronUp,
  Code2,
  Copy,
  RefreshCw,
  Trash2,
  Zap,
} from 'lucide-react';
import { useState, useEffect, useRef, useMemo, useCallback } from 'react';

// Interfaces
interface RawCodeProps {
  code: string;
  fileName?: string;
  language?: string;
}

interface User {
  id: number;
  name: string;
  email: string;
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
              {copied ? <span className="text-xs">Copied!</span> : <Copy className="h-3.5 w-3.5" />}
            </Button>
          )}
          <Button
            size="sm"
            variant="ghost"
            onClick={() => setIsShown(!isShown)}
            className="h-8 px-3 text-slate-300 hover:text-white hover:bg-slate-600/50"
          >
            {isShown ? (
              <ChevronUp className="h-3.5 w-3.5" />
            ) : (
              <ChevronDown className="h-3.5 w-3.5" />
            )}
            <span className="ml-2 text-xs">{isShown ? 'Hide' : 'Show'}</span>
          </Button>
        </div>
      </div>

      {isShown && (
        <div className="relative bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
          <pre className="p-6 overflow-x-auto text-sm font-mono leading-relaxed max-h-[700px] text-slate-100">
            <code>{code}</code>
          </pre>
        </div>
      )}
    </div>
  );
}

export default function ComponentLifecyclePage() {
  const [activeTab, setActiveTab] = useState('function-intro');

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/50 to-purple-50/50 dark:from-slate-950 dark:via-blue-950/50 dark:to-purple-950/50">
      {/* Hero Header */}
      <div className="relative bg-gradient-to-r from-orange-600 via-amber-600 to-yellow-600 text-white py-24 px-4 mb-16 shadow-2xl overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-10 left-10 w-20 h-20 bg-white/10 rounded-full animate-pulse"></div>
          <div className="absolute top-32 right-20 w-32 h-32 bg-white/5 rounded-full animate-bounce"></div>
          <div className="absolute bottom-20 left-1/4 w-16 h-16 bg-white/10 rounded-full animate-ping"></div>
        </div>

        <div className="container mx-auto max-w-7xl relative z-10">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-12 h-12 bg-white/20 backdrop-blur-md rounded-2xl flex items-center justify-center border border-white/30">
              <Activity className="h-6 w-6 text-white" />
            </div>
            <Badge className="bg-white/20 backdrop-blur-md text-white hover:bg-white/30 border-white/30 px-4 py-2 text-sm font-bold">
              🪝 React Hooks Lifecycle
            </Badge>
          </div>

          <h1 className="text-6xl sm:text-7xl font-black mb-8 leading-tight">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-white via-orange-100 to-yellow-100">
              Function Component
            </span>
            <div className="text-4xl sm:text-5xl mt-2 font-light text-white/90">
              Lifecycle với useEffect
            </div>
          </h1>

          <p className="text-xl text-white/90 max-w-4xl leading-relaxed font-medium">
            🪝 Tìm hiểu cách quản lý lifecycle trong Function Components với React Hooks - từ
            useEffect cơ bản đến các patterns nâng cao
          </p>
        </div>
      </div>

      <div className="container mx-auto max-w-7xl px-4 pb-32">
        <Tabs defaultValue="function-intro" value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="bg-white/95 dark:bg-slate-800/95 backdrop-blur-xl p-3 shadow-2xl rounded-3xl border border-slate-200/50 dark:border-slate-700/50 mb-16 grid grid-cols-5 gap-2">
            <TabsTrigger
              value="function-intro"
              className="rounded-2xl data-[state=active]:bg-gradient-to-r data-[state=active]:from-orange-500 data-[state=active]:to-amber-500 data-[state=active]:text-white font-semibold py-3"
            >
              <span className="text-base">🪝</span>
              <span className="ml-2 hidden sm:inline">Function</span>
            </TabsTrigger>
            <TabsTrigger
              value="useeffect"
              className="rounded-2xl data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500 data-[state=active]:to-indigo-500 data-[state=active]:text-white font-semibold py-3"
            >
              <span className="text-base">⚡</span>
              <span className="ml-2 hidden sm:inline">useEffect</span>
            </TabsTrigger>
            <TabsTrigger
              value="patterns"
              className="rounded-2xl data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-500 data-[state=active]:to-violet-500 data-[state=active]:text-white font-semibold py-3"
            >
              <span className="text-base">🎯</span>
              <span className="ml-2 hidden sm:inline">Patterns</span>
            </TabsTrigger>
            <TabsTrigger
              value="comparison"
              className="rounded-2xl data-[state=active]:bg-gradient-to-r data-[state=active]:from-green-500 data-[state=active]:to-emerald-500 data-[state=active]:text-white font-semibold py-3"
            >
              <span className="text-base">⚖️</span>
              <span className="ml-2 hidden sm:inline">So sánh</span>
            </TabsTrigger>
            <TabsTrigger
              value="advanced"
              className="rounded-2xl data-[state=active]:bg-gradient-to-r data-[state=active]:from-red-500 data-[state=active]:to-rose-500 data-[state=active]:text-white font-semibold py-3"
            >
              <span className="text-base">🚀</span>
              <span className="ml-2 hidden sm:inline">Nâng cao</span>
            </TabsTrigger>
          </TabsList>

          {/* Function Component Introduction */}
          <TabsContent value="function-intro">
            <Card className="border-0 shadow-2xl bg-white/98 dark:bg-slate-800/98 backdrop-blur-md rounded-3xl">
              <CardContent className="p-12">
                <div className="flex items-center gap-6 mb-10">
                  <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-amber-600 rounded-3xl flex items-center justify-center shadow-xl">
                    <span className="text-3xl">🪝</span>
                  </div>
                  <div>
                    <h2 className="text-4xl font-black text-slate-900 dark:text-white mb-2">
                      Function Component Lifecycle
                    </h2>
                    <p className="text-slate-600 dark:text-slate-400 text-lg">
                      Quản lý vòng đời component với React Hooks
                    </p>
                  </div>
                </div>

                <div className="prose prose-xl max-w-none dark:prose-invert mb-12">
                  <p className="text-slate-700 dark:text-slate-300 text-xl leading-relaxed mb-6">
                    <span className="font-bold text-orange-600 dark:text-orange-400">
                      Function Components
                    </span>{' '}
                    sử dụng React Hooks để quản lý lifecycle, state và side effects. Hook chính để
                    xử lý lifecycle là{' '}
                    <code className="bg-slate-200 dark:bg-slate-700 px-2 py-1 rounded">
                      useEffect
                    </code>
                    .
                  </p>
                </div>

                <div className="grid lg:grid-cols-2 gap-8 mb-16">
                  <div className="bg-gradient-to-br from-orange-50 to-amber-100 dark:from-orange-900/30 dark:to-amber-900/30 p-8 rounded-3xl border border-orange-200/60 shadow-xl">
                    <h4 className="text-2xl font-bold mb-6 text-orange-800 dark:text-orange-200 flex items-center gap-3">
                      <Zap className="h-6 w-6" />
                      Ưu điểm
                    </h4>
                    <ul className="space-y-3 text-slate-700 dark:text-slate-300">
                      <li>✅ Code ngắn gọn, dễ đọc</li>
                      <li>✅ Performance tốt hơn</li>
                      <li>✅ Hooks linh hoạt</li>
                      <li>✅ Dễ test và debug</li>
                      <li>✅ Functional programming</li>
                    </ul>
                  </div>

                  <div className="bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-blue-900/30 dark:to-indigo-900/30 p-8 rounded-3xl border border-blue-200/60 shadow-xl">
                    <h4 className="text-2xl font-bold mb-6 text-blue-800 dark:text-blue-200 flex items-center gap-3">
                      <Activity className="h-6 w-6" />
                      useEffect thay thế
                    </h4>
                    <ul className="space-y-3 text-slate-700 dark:text-slate-300">
                      <li>🔄 componentDidMount</li>
                      <li>🔄 componentDidUpdate</li>
                      <li>🔄 componentWillUnmount</li>
                      <li>🔄 Tất cả trong 1 hook</li>
                    </ul>
                  </div>
                </div>

                <RawCode
                  fileName="basic-function-component.tsx"
                  code={`// Function Component cơ bản với lifecycle
function MyComponent({ userId }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Thay thế componentDidMount + componentWillUnmount
  useEffect(() => {
    console.log('Component mounted!');

    // Cleanup function (componentWillUnmount)
    return () => {
      console.log('Component will unmount!');
    };
  }, []); // Empty deps = chỉ chạy khi mount/unmount

  // Thay thế componentDidUpdate
  useEffect(() => {
    if (userId) {
      fetchUser(userId);
    }
  }, [userId]); // Dependency array = chạy khi userId thay đổi

  const fetchUser = async (id) => {
    setLoading(true);
    try {
      const response = await fetch(\`/api/users/\${id}\`);
      const userData = await response.json();
      setUser(userData);
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div>
      <h1>{user?.name}</h1>
      <p>{user?.email}</p>
    </div>
  );
}`}
                />
              </CardContent>
            </Card>
          </TabsContent>

          {/* useEffect Deep Dive */}
          <TabsContent value="useeffect">
            <Card className="border-0 shadow-2xl bg-white/98 dark:bg-slate-800/98 backdrop-blur-md rounded-3xl">
              <CardContent className="p-12">
                <div className="flex items-center gap-6 mb-10">
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-3xl flex items-center justify-center shadow-xl">
                    <span className="text-3xl">⚡</span>
                  </div>
                  <div>
                    <h2 className="text-4xl font-black text-slate-900 dark:text-white mb-2">
                      useEffect Chi Tiết
                    </h2>
                    <p className="text-slate-600 dark:text-slate-400 text-lg">
                      Hook mạnh mẽ nhất để quản lý side effects
                    </p>
                  </div>
                </div>

                <div className="space-y-16">
                  {/* Mount Effect */}
                  <div>
                    <h3 className="text-3xl font-black mb-6 text-slate-900 dark:text-white flex items-center gap-3">
                      <span className="text-2xl">🌱</span> Mount Effect (componentDidMount)
                    </h3>

                    <RawCode
                      fileName="mount-effect.tsx"
                      code={`function DataComponent() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  // Chạy 1 lần khi component mount
  useEffect(() => {
    console.log('Component mounted - fetching initial data');

    const fetchData = async () => {
      try {
        const response = await fetch('/api/data');
        const result = await response.json();
        setData(result);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();

    // Setup event listeners
    const handleResize = () => console.log('Window resized');
    window.addEventListener('resize', handleResize);

    // Setup intervals
    const interval = setInterval(() => {
      console.log('Interval tick');
    }, 5000);

    // Cleanup function - chạy khi unmount
    return () => {
      console.log('Cleaning up...');
      window.removeEventListener('resize', handleResize);
      clearInterval(interval);
    };
  }, []); // Empty dependency array!

  if (loading) return <div>Loading...</div>;

  return (
    <div>
      {data.map(item => (
        <div key={item.id}>{item.name}</div>
      ))}
    </div>
  );
}`}
                    />
                  </div>

                  {/* Update Effect */}
                  <div>
                    <h3 className="text-3xl font-black mb-6 text-slate-900 dark:text-white flex items-center gap-3">
                      <span className="text-2xl">🔄</span> Update Effect (componentDidUpdate)
                    </h3>

                    <RawCode
                      fileName="update-effect.tsx"
                      code={`function UserProfile({ userId, theme }) {
  const [user, setUser] = useState(null);
  const [posts, setPosts] = useState([]);

  // Chạy khi userId thay đổi
  useEffect(() => {
    console.log('userId changed:', userId);

    if (!userId) return;

    const fetchUser = async () => {
      const response = await fetch(\`/api/users/\${userId}\`);
      const userData = await response.json();
      setUser(userData);
    };

    fetchUser();
  }, [userId]); // Dependency: userId

  // Chạy khi user thay đổi
  useEffect(() => {
    if (!user) return;

    console.log('User loaded, fetching posts');

    const fetchPosts = async () => {
      const response = await fetch(\`/api/users/\${user.id}/posts\`);
      const postsData = await response.json();
      setPosts(postsData);
    };

    fetchPosts();
  }, [user]); // Dependency: user

  // Chạy khi theme thay đổi
  useEffect(() => {
    console.log('Theme changed:', theme);
    document.body.className = theme;

    return () => {
      document.body.className = '';
    };
  }, [theme]); // Dependency: theme

  // Multiple dependencies
  useEffect(() => {
    console.log('User or theme changed');
    // Logic khi user HOẶC theme thay đổi
  }, [user, theme]); // Multiple dependencies

  return (
    <div>
      {user && (
        <>
          <h1>{user.name}</h1>
          <div>
            {posts.map(post => (
              <article key={post.id}>
                <h3>{post.title}</h3>
                <p>{post.content}</p>
              </article>
            ))}
          </div>
        </>
      )}
    </div>
  );
}`}
                    />
                  </div>

                  {/* Cleanup Effect */}
                  <div>
                    <h3 className="text-3xl font-black mb-6 text-slate-900 dark:text-white flex items-center gap-3">
                      <span className="text-2xl">🧹</span> Cleanup Effect (componentWillUnmount)
                    </h3>

                    <RawCode
                      fileName="cleanup-effect.tsx"
                      code={`function ChatRoom({ roomId }) {
  const [messages, setMessages] = useState([]);
  const [connectionStatus, setConnectionStatus] = useState('disconnected');

  useEffect(() => {
    console.log(\`Connecting to room: \${roomId}\`);

    // WebSocket connection
    const ws = new WebSocket(\`ws://localhost:8080/rooms/\${roomId}\`);

    ws.onopen = () => {
      console.log('Connected to chat room');
      setConnectionStatus('connected');
    };

    ws.onmessage = (event) => {
      const message = JSON.parse(event.data);
      setMessages(prev => [...prev, message]);
    };

    ws.onclose = () => {
      console.log('Disconnected from chat room');
      setConnectionStatus('disconnected');
    };

    // Timer for heartbeat
    const heartbeat = setInterval(() => {
      if (ws.readyState === WebSocket.OPEN) {
        ws.send(JSON.stringify({ type: 'ping' }));
      }
    }, 30000);

    // AbortController for API calls
    const abortController = new AbortController();

    // Fetch initial messages
    fetch(\`/api/rooms/\${roomId}/messages\`, {
      signal: abortController.signal
    })
    .then(response => response.json())
    .then(data => setMessages(data))
    .catch(error => {
      if (error.name !== 'AbortError') {
        console.error('Error fetching messages:', error);
      }
    });

    // CLEANUP FUNCTION - Quan trọng!
    return () => {
      console.log('Cleaning up chat room connection');

      // Đóng WebSocket
      if (ws.readyState === WebSocket.OPEN) {
        ws.close();
      }

      // Xóa timer
      clearInterval(heartbeat);

      // Hủy API requests
      abortController.abort();

      // Reset status
      setConnectionStatus('disconnected');
    };
  }, [roomId]); // Chạy lại khi roomId thay đổi

  // Separate effect for typing indicator
  useEffect(() => {
    let typingTimer;

    const handleTyping = () => {
      // Logic for typing indicator
      clearTimeout(typingTimer);
      typingTimer = setTimeout(() => {
        // Stop typing indicator
      }, 1000);
    };

    return () => {
      clearTimeout(typingTimer);
    };
  }, []);

  return (
    <div>
      <div>Status: {connectionStatus}</div>
      <div className="messages">
        {messages.map(msg => (
          <div key={msg.id}>{msg.text}</div>
        ))}
      </div>
      <input placeholder="Type a message..." />
    </div>
  );
}`}
                    />
                  </div>

                  <UseEffectDemo />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Advanced Patterns */}
          <TabsContent value="patterns">
            <Card className="border-0 shadow-2xl bg-white/98 dark:bg-slate-800/98 backdrop-blur-md rounded-3xl">
              <CardContent className="p-12">
                <div className="flex items-center gap-6 mb-10">
                  <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-violet-600 rounded-3xl flex items-center justify-center shadow-xl">
                    <span className="text-3xl">🎯</span>
                  </div>
                  <div>
                    <h2 className="text-4xl font-black text-slate-900 dark:text-white mb-2">
                      Advanced Patterns
                    </h2>
                    <p className="text-slate-600 dark:text-slate-400 text-lg">
                      Các patterns nâng cao với useEffect
                    </p>
                  </div>
                </div>

                <div className="space-y-16">
                  <div>
                    <h3 className="text-3xl font-black mb-6 text-slate-900 dark:text-white">
                      🔗 Custom Hooks
                    </h3>

                    <RawCode
                      fileName="custom-hooks.tsx"
                      code={`// Custom hook để fetch data
function useApi(url) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const abortController = new AbortController();

    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await fetch(url, {
          signal: abortController.signal
        });
        const result = await response.json();
        setData(result);
        setError(null);
      } catch (err) {
        if (err.name !== 'AbortError') {
          setError(err.message);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchData();

    return () => {
      abortController.abort();
    };
  }, [url]);

  return { data, loading, error };
}

// Custom hook cho WebSocket
function useWebSocket(url) {
  const [socket, setSocket] = useState(null);
  const [messages, setMessages] = useState([]);
  const [connectionStatus, setConnectionStatus] = useState('Disconnected');

  useEffect(() => {
    const ws = new WebSocket(url);
    setSocket(ws);

    ws.onopen = () => setConnectionStatus('Connected');
    ws.onclose = () => setConnectionStatus('Disconnected');
    ws.onmessage = (event) => {
      const message = JSON.parse(event.data);
      setMessages(prev => [...prev, message]);
    };

    return () => {
      ws.close();
    };
  }, [url]);

  const sendMessage = useCallback((message) => {
    if (socket?.readyState === WebSocket.OPEN) {
      socket.send(JSON.stringify(message));
    }
  }, [socket]);

  return { messages, connectionStatus, sendMessage };
}

// Sử dụng custom hooks
function MyComponent() {
  const { data, loading, error } = useApi('/api/users');
  const { messages, connectionStatus, sendMessage } = useWebSocket('ws://localhost:8080');

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <div>Connection: {connectionStatus}</div>
      <div>{data?.map(item => <div key={item.id}>{item.name}</div>)}</div>
    </div>
  );
}`}
                    />
                  </div>

                  <div>
                    <h3 className="text-3xl font-black mb-6 text-slate-900 dark:text-white">
                      🎭 Conditional Effects
                    </h3>

                    <RawCode
                      fileName="conditional-effects.tsx"
                      code={`function ConditionalEffects({ isVisible, userId, enablePolling }) {
  const [data, setData] = useState(null);

  // Effect chỉ chạy khi component visible
  useEffect(() => {
    if (!isVisible) return;

    console.log('Component is now visible');

    const handleFocus = () => {
      console.log('Window focused');
    };

    window.addEventListener('focus', handleFocus);

    return () => {
      window.removeEventListener('focus', handleFocus);
    };
  }, [isVisible]);

  // Effect với early return
  useEffect(() => {
    if (!userId || !enablePolling) return;

    console.log('Starting polling for user:', userId);

    const interval = setInterval(async () => {
      try {
        const response = await fetch(\`/api/users/\${userId}\`);
        const userData = await response.json();
        setData(userData);
      } catch (error) {
        console.error('Polling error:', error);
      }
    }, 5000);

    return () => {
      console.log('Stopping polling');
      clearInterval(interval);
    };
  }, [userId, enablePolling]);

  // Effect với nested conditions
  useEffect(() => {
    if (!data) return;

    if (data.status === 'premium') {
      console.log('User is premium, enabling advanced features');
      // Enable premium features
    } else {
      console.log('User is basic, showing upgrade prompt');
      // Show upgrade prompt after delay
      const timer = setTimeout(() => {
        console.log('Show upgrade modal');
      }, 10000);

      return () => clearTimeout(timer);
    }
  }, [data]);

  return <div>User data component</div>;
}`}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Class vs Function Comparison */}
          <TabsContent value="comparison">
            <Card className="border-0 shadow-2xl bg-white/98 dark:bg-slate-800/98 backdrop-blur-md rounded-3xl">
              <CardContent className="p-12">
                <div className="flex items-center gap-6 mb-10">
                  <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-600 rounded-3xl flex items-center justify-center shadow-xl">
                    <span className="text-3xl">⚖️</span>
                  </div>
                  <div>
                    <h2 className="text-4xl font-black text-slate-900 dark:text-white mb-2">
                      Class vs Function Components
                    </h2>
                    <p className="text-slate-600 dark:text-slate-400 text-lg">
                      So sánh chi tiết giữa 2 cách tiếp cận
                    </p>
                  </div>
                </div>

                <div className="grid lg:grid-cols-2 gap-8 mb-12">
                  <div className="bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-800/50 dark:to-slate-900/50 p-8 rounded-3xl border border-slate-200/60 shadow-xl">
                    <h4 className="text-2xl font-bold mb-6 text-slate-800 dark:text-slate-200">
                      Class Component
                    </h4>
                    <RawCode
                      fileName="class-example.tsx"
                      code={`class UserComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: null,
      loading: true
    };
  }

  async componentDidMount() {
    const user = await fetchUser(this.props.userId);
    this.setState({ user, loading: false });

    window.addEventListener('resize', this.handleResize);
  }

  componentDidUpdate(prevProps) {
    if (prevProps.userId !== this.props.userId) {
      this.fetchNewUser();
    }
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.handleResize);
  }

  handleResize = () => {
    console.log('Window resized');
  }

  fetchNewUser = async () => {
    this.setState({ loading: true });
    const user = await fetchUser(this.props.userId);
    this.setState({ user, loading: false });
  }

  render() {
    if (this.state.loading) {
      return <div>Loading...</div>;
    }

    return <div>{this.state.user?.name}</div>;
  }
}`}
                    />
                  </div>

                  <div className="bg-gradient-to-br from-orange-50 to-amber-100 dark:from-orange-900/30 dark:to-amber-900/30 p-8 rounded-3xl border border-orange-200/60 shadow-xl">
                    <h4 className="text-2xl font-bold mb-6 text-orange-800 dark:text-orange-200">
                      Function Component
                    </h4>
                    <RawCode
                      fileName="function-example.tsx"
                      code={`function UserComponent({ userId }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // componentDidMount + componentWillUnmount
  useEffect(() => {
    const handleResize = () => {
      console.log('Window resized');
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  // componentDidMount + componentDidUpdate cho userId
  useEffect(() => {
    const fetchUserData = async () => {
      setLoading(true);
      const userData = await fetchUser(userId);
      setUser(userData);
      setLoading(false);
    };

    fetchUserData();
  }, [userId]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return <div>{user?.name}</div>;
}`}
                    />
                  </div>
                </div>

                <ComparisonTable />
              </CardContent>
            </Card>
          </TabsContent>

          {/* Advanced Topics */}
          <TabsContent value="advanced">
            <Card className="border-0 shadow-2xl bg-white/98 dark:bg-slate-800/98 backdrop-blur-md rounded-3xl">
              <CardContent className="p-12">
                <div className="flex items-center gap-6 mb-10">
                  <div className="w-16 h-16 bg-gradient-to-br from-red-500 to-rose-600 rounded-3xl flex items-center justify-center shadow-xl">
                    <span className="text-3xl">🚀</span>
                  </div>
                  <div>
                    <h2 className="text-4xl font-black text-slate-900 dark:text-white mb-2">
                      Advanced Topics
                    </h2>
                    <p className="text-slate-600 dark:text-slate-400 text-lg">
                      Performance optimization và best practices
                    </p>
                  </div>
                </div>

                <div className="space-y-16">
                  <div>
                    <h3 className="text-3xl font-black mb-6 text-slate-900 dark:text-white">
                      ⚡ Performance Optimization
                    </h3>

                    <RawCode
                      fileName="performance-optimization.tsx"
                      code={`function OptimizedComponent({ items, onItemClick, theme }) {
  const [filteredItems, setFilteredItems] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  // useMemo để tránh tính toán lại không cần thiết
  const expensiveValue = useMemo(() => {
    console.log('Computing expensive value...');
    return items.reduce((acc, item) => acc + item.value, 0);
  }, [items]); // Chỉ tính lại khi items thay đổi

  // useCallback để tránh re-render con không cần thiết
  const handleSearch = useCallback((term) => {
    setSearchTerm(term);
  }, []); // Stable function reference

  const optimizedItemClick = useCallback((itemId) => {
    onItemClick(itemId);
  }, [onItemClick]); // Phụ thuộc vào onItemClick

  // Effect với dependency được optimize
  useEffect(() => {
    console.log('Filtering items...');

    const filtered = items.filter(item =>
      item.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    setFilteredItems(filtered);
  }, [items, searchTerm]); // Chỉ dependencies cần thiết

  // Effect cleanup với AbortController
  useEffect(() => {
    const controller = new AbortController();

    const fetchAdditionalData = async () => {
      try {
        const response = await fetch('/api/additional-data', {
          signal: controller.signal
        });
        // Handle response
      } catch (error) {
        if (error.name !== 'AbortError') {
          console.error('Fetch error:', error);
        }
      }
    };

    fetchAdditionalData();

    return () => {
      controller.abort(); // Cancel pending requests
    };
  }, []);

  return (
    <div>
      <div>Total Value: {expensiveValue}</div>
      <SearchBox onSearch={handleSearch} />
      <ItemList
        items={filteredItems}
        onItemClick={optimizedItemClick}
      />
    </div>
  );
}

// Memoized child component
const ItemList = React.memo(({ items, onItemClick }) => {
  console.log('ItemList rendered');

  return (
    <div>
      {items.map(item => (
        <div key={item.id} onClick={() => onItemClick(item.id)}>
          {item.name}
        </div>
      ))}
    </div>
  );
});`}
                    />
                  </div>

                  <AdvancedDemo />
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
function UseEffectDemo() {
  const [showDemo, setShowDemo] = useState(false);
  const [logs, setLogs] = useState<string[]>([]);

  const addLog = (message: string) => {
    setLogs(prev => [...prev, `${new Date().toLocaleTimeString()}: ${message}`]);
  };

  return (
    <div className="bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-blue-900/30 dark:to-indigo-900/30 p-10 rounded-3xl border border-blue-200/60 shadow-xl">
      <h3 className="text-2xl font-black mb-8 text-blue-800 dark:text-blue-300 flex items-center gap-3">
        <span className="text-2xl">⚡</span> Interactive useEffect Demo
      </h3>

      <div className="flex gap-4 mb-8">
        <Button
          onClick={() => {
            setShowDemo(true);
            addLog('Mounting component...');
          }}
          className="bg-blue-600 hover:bg-blue-700"
        >
          Mount Component
        </Button>
        <Button
          onClick={() => {
            setShowDemo(false);
            addLog('Unmounting component...');
          }}
          variant="destructive"
        >
          Unmount Component
        </Button>
        <Button onClick={() => setLogs([])} variant="outline">
          Clear Logs
        </Button>
      </div>

      {showDemo && <InteractiveDemo onLog={addLog} />}

      <div className="mt-8 bg-slate-900 text-blue-400 p-4 rounded-lg font-mono text-sm max-h-40 overflow-y-auto">
        {logs.map((log, index) => (
          <div key={index}>{log}</div>
        ))}
      </div>
    </div>
  );
}

function InteractiveDemo({ onLog }: { onLog: (message: string) => void }) {
  const [count, setCount] = useState(0);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    onLog('useEffect: Component mounted (empty deps)');
    return () => onLog('useEffect cleanup: Component unmounting');
  }, []);

  useEffect(() => {
    if (count > 0) {
      onLog(`useEffect: Count updated to ${count}`);
    }
  }, [count]);

  return (
    <div className="bg-white/70 p-6 rounded-xl border space-y-4">
      <h4 className="font-bold">Interactive Demo</h4>
      <p>Count: {count}</p>
      <div className="flex gap-2">
        <Button onClick={() => setCount(c => c + 1)} size="sm">
          Increment
        </Button>
        <Button onClick={() => setCount(0)} size="sm" variant="outline">
          Reset
        </Button>
      </div>
    </div>
  );
}

function ComparisonTable() {
  return (
    <div className="bg-gradient-to-br from-gray-50 to-slate-100 dark:from-gray-800/50 dark:to-slate-900/50 p-8 rounded-3xl">
      <h3 className="text-2xl font-bold mb-6 text-center">Bảng so sánh chi tiết</h3>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b-2">
              <th className="text-left p-4 font-bold">Aspect</th>
              <th className="text-left p-4 font-bold text-slate-600">Class Component</th>
              <th className="text-left p-4 font-bold text-orange-600">Function Component</th>
            </tr>
          </thead>
          <tbody className="space-y-2">
            <tr className="border-b">
              <td className="p-4 font-semibold">Syntax</td>
              <td className="p-4">Dài, phức tạp</td>
              <td className="p-4">✅ Ngắn gọn, dễ đọc</td>
            </tr>
            <tr className="border-b">
              <td className="p-4 font-semibold">Performance</td>
              <td className="p-4">Chậm hơn</td>
              <td className="p-4">✅ Nhanh hơn, optimized</td>
            </tr>
            <tr className="border-b">
              <td className="p-4 font-semibold">Testing</td>
              <td className="p-4">Khó test</td>
              <td className="p-4">✅ Dễ test hơn</td>
            </tr>
            <tr className="border-b">
              <td className="p-4 font-semibold">Reusability</td>
              <td className="p-4">Hạn chế</td>
              <td className="p-4">✅ Custom hooks</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

function AdvancedDemo() {
  const [items] = useState([
    { id: 1, name: 'Item 1', value: 10 },
    { id: 2, name: 'Item 2', value: 20 },
    { id: 3, name: 'Item 3', value: 30 },
  ]);

  const totalValue = useMemo(() => {
    console.log('Computing total...');
    return items.reduce((sum, item) => sum + item.value, 0);
  }, [items]);

  const handleItemClick = useCallback((id: number) => {
    console.log('Item clicked:', id);
  }, []);

  return (
    <div className="bg-gradient-to-br from-red-50 to-rose-100 dark:from-red-900/30 dark:to-rose-900/30 p-10 rounded-3xl border border-red-200/60 shadow-xl">
      <h3 className="text-2xl font-black mb-8 text-red-800 dark:text-red-300">Performance Demo</h3>
      <div>Total Value: {totalValue}</div>
      <div className="mt-4 space-y-2">
        {items.map(item => (
          <div
            key={item.id}
            className="p-2 bg-white/50 rounded cursor-pointer"
            onClick={() => handleItemClick(item.id)}
          >
            {item.name} - {item.value}
          </div>
        ))}
      </div>
    </div>
  );
}
