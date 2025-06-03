'use client';

import { useState, useContext, createContext, ReactNode } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Users,
  Settings,
  Moon,
  Sun,
  Globe,
  ShoppingCart,
  User,
  Bell,
  Code2,
  Copy,
  Check,
  ChevronDown,
  ChevronUp,
  Sparkles,
  Zap,
  Database,
  Shield,
  Palette,
} from 'lucide-react';

// Interfaces
interface RawCodeProps {
  code: string;
  fileName?: string;
  language?: string;
}

interface ThemeContextType {
  theme: 'light' | 'dark';
  toggleTheme: () => void;
}

interface AuthContextType {
  user: User | null;
  login: (user: User) => void;
  logout: () => void;
  isAuthenticated: boolean;
}

interface User {
  id: number;
  name: string;
  email: string;
  avatar: string;
}

interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
}

interface CartContextType {
  items: CartItem[];
  addItem: (item: CartItem) => void;
  removeItem: (id: number) => void;
  updateQuantity: (id: number, quantity: number) => void;
  total: number;
  itemCount: number;
}

interface NotificationContextType {
  notifications: Notification[];
  addNotification: (notification: Omit<Notification, 'id'>) => void;
  removeNotification: (id: string) => void;
}

interface Notification {
  id: string;
  type: 'success' | 'error' | 'warning' | 'info';
  message: string;
  title?: string;
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

// Context Implementations
const ThemeContext = createContext<ThemeContextType | undefined>(undefined);
const AuthContext = createContext<AuthContextType | undefined>(undefined);
const CartContext = createContext<CartContextType | undefined>(undefined);
const NotificationContext = createContext<NotificationContextType | undefined>(undefined);

// Theme Provider
function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const toggleTheme = () => setTheme(prev => (prev === 'light' ? 'dark' : 'light'));

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <div className={`theme-${theme}`}>{children}</div>
    </ThemeContext.Provider>
  );
}

// Auth Provider
function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const login = (userData: User) => setUser(userData);
  const logout = () => setUser(null);
  const isAuthenticated = !!user;

  return (
    <AuthContext.Provider value={{ user, login, logout, isAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
}

// Cart Provider
function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);

  const addItem = (newItem: CartItem) => {
    setItems(prev => {
      const existing = prev.find(item => item.id === newItem.id);
      if (existing) {
        return prev.map(item =>
          item.id === newItem.id ? { ...item, quantity: item.quantity + newItem.quantity } : item
        );
      }
      return [...prev, newItem];
    });
  };

  const removeItem = (id: number) => setItems(prev => prev.filter(item => item.id !== id));

  const updateQuantity = (id: number, quantity: number) => {
    if (quantity <= 0) {
      removeItem(id);
      return;
    }
    setItems(prev => prev.map(item => (item.id === id ? { ...item, quantity } : item)));
  };

  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <CartContext.Provider value={{ items, addItem, removeItem, updateQuantity, total, itemCount }}>
      {children}
    </CartContext.Provider>
  );
}

// Notification Provider
function NotificationProvider({ children }: { children: ReactNode }) {
  const [notifications, setNotifications] = useState<Notification[]>([]);

  const addNotification = (notification: Omit<Notification, 'id'>) => {
    const id = Math.random().toString(36).substr(2, 9);
    setNotifications(prev => [...prev, { ...notification, id }]);
    setTimeout(() => removeNotification(id), 5000);
  };

  const removeNotification = (id: string) => {
    setNotifications(prev => prev.filter(notif => notif.id !== id));
  };

  return (
    <NotificationContext.Provider value={{ notifications, addNotification, removeNotification }}>
      {children}
    </NotificationContext.Provider>
  );
}

// Demo Components
function BasicContextDemo() {
  const themeContext = useContext(ThemeContext);
  if (!themeContext) throw new Error('Must be used within ThemeProvider');
  const { theme, toggleTheme } = themeContext;

  return (
    <div
      className={`p-8 rounded-3xl border-2 transition-all duration-300 ${
        theme === 'dark'
          ? 'bg-slate-800 border-slate-600 text-white'
          : 'bg-white border-slate-200 text-slate-900'
      }`}
    >
      <h3 className="text-2xl font-black mb-6 flex items-center gap-3">
        <Palette className="h-6 w-6" />
        Theme Demo: {theme}
      </h3>
      <p className="mb-6 text-lg">
        Current theme: <span className="font-bold">{theme}</span>
      </p>
      <Button onClick={toggleTheme} className="flex items-center gap-3 px-6 py-3 rounded-xl">
        {theme === 'dark' ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
        Switch to {theme === 'dark' ? 'Light' : 'Dark'} Mode
      </Button>
    </div>
  );
}

function AuthDemo() {
  const authContext = useContext(AuthContext);
  const notificationContext = useContext(NotificationContext);
  if (!authContext || !notificationContext) throw new Error('Missing providers');

  const { user, login, logout, isAuthenticated } = authContext;
  const { addNotification } = notificationContext;

  const handleLogin = () => {
    const userData: User = { id: 1, name: 'Dũng Vũ', email: 'dung@example.com', avatar: '👨‍💻' };
    login(userData);
    addNotification({
      type: 'success',
      title: 'Login Successful',
      message: `Welcome back, ${userData.name}!`,
    });
  };

  const handleLogout = () => {
    logout();
    addNotification({
      type: 'info',
      title: 'Logged Out',
      message: 'You have been logged out successfully',
    });
  };

  return (
    <div className="bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-blue-900/30 dark:to-indigo-900/30 p-8 rounded-3xl border border-blue-200 dark:border-blue-700 shadow-xl">
      <h3 className="text-2xl font-black mb-6 flex items-center gap-3 text-blue-800 dark:text-blue-200">
        <Shield className="h-6 w-6" />
        Authentication Demo
      </h3>
      {isAuthenticated ? (
        <div className="space-y-4">
          <div className="flex items-center gap-4 p-4 bg-white/60 dark:bg-slate-800/60 rounded-xl">
            <span className="text-3xl">{user?.avatar}</span>
            <div>
              <h4 className="font-bold text-lg">{user?.name}</h4>
              <p className="text-slate-600 dark:text-slate-400">{user?.email}</p>
            </div>
          </div>
          <Button onClick={handleLogout} variant="destructive" className="w-full">
            <User className="h-4 w-4 mr-2" />
            Logout
          </Button>
        </div>
      ) : (
        <div className="text-center">
          <p className="mb-6 text-slate-700 dark:text-slate-300">You are not logged in</p>
          <Button onClick={handleLogin} className="w-full">
            <User className="h-4 w-4 mr-2" />
            Login as Demo User
          </Button>
        </div>
      )}
    </div>
  );
}

function CartDemo() {
  const cartContext = useContext(CartContext);
  const notificationContext = useContext(NotificationContext);
  if (!cartContext || !notificationContext) throw new Error('Missing providers');

  const { items, addItem, removeItem, updateQuantity, total, itemCount } = cartContext;
  const { addNotification } = notificationContext;

  const products = [
    { id: 1, name: 'MacBook Pro', price: 2499, emoji: '💻' },
    { id: 2, name: 'iPhone 15', price: 999, emoji: '📱' },
    { id: 3, name: 'AirPods Pro', price: 249, emoji: '🎧' },
  ];

  const handleAddToCart = (product: (typeof products)[0]) => {
    addItem({ id: product.id, name: product.name, price: product.price, quantity: 1 });
    addNotification({
      type: 'success',
      title: 'Added to Cart',
      message: `${product.name} has been added to your cart`,
    });
  };

  return (
    <div className="bg-gradient-to-br from-green-50 to-emerald-100 dark:from-green-900/30 dark:to-emerald-900/30 p-8 rounded-3xl border border-green-200 dark:border-green-700 shadow-xl">
      <h3 className="text-2xl font-black mb-6 flex items-center gap-3 text-green-800 dark:text-green-200">
        <ShoppingCart className="h-6 w-6" />
        Shopping Cart Demo ({itemCount} items)
      </h3>

      <div className="grid gap-4 mb-6">
        {products.map(product => (
          <div
            key={product.id}
            className="flex items-center justify-between p-4 bg-white/60 dark:bg-slate-800/60 rounded-xl"
          >
            <div className="flex items-center gap-3">
              <span className="text-2xl">{product.emoji}</span>
              <div>
                <h4 className="font-bold">{product.name}</h4>
                <p className="text-green-600 dark:text-green-400 font-bold">${product.price}</p>
              </div>
            </div>
            <Button
              onClick={() => handleAddToCart(product)}
              size="sm"
              className="bg-green-600 hover:bg-green-700"
            >
              Add to Cart
            </Button>
          </div>
        ))}
      </div>

      {items.length > 0 && (
        <div className="border-t border-green-200 dark:border-green-700 pt-6">
          <h4 className="font-bold mb-4">Cart Items:</h4>
          <div className="space-y-3">
            {items.map(item => (
              <div
                key={item.id}
                className="flex items-center justify-between p-3 bg-white/80 dark:bg-slate-800/80 rounded-lg"
              >
                <div>
                  <span className="font-semibold">{item.name}</span>
                  <span className="text-sm text-slate-600 dark:text-slate-400 ml-2">
                    ${item.price} x {item.quantity}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                  >
                    -
                  </Button>
                  <span className="w-8 text-center">{item.quantity}</span>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                  >
                    +
                  </Button>
                  <Button size="sm" variant="destructive" onClick={() => removeItem(item.id)}>
                    Remove
                  </Button>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-4 p-4 bg-green-100 dark:bg-green-900/50 rounded-xl">
            <div className="flex justify-between text-xl font-bold">
              <span>Total:</span>
              <span>${total}</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function NotificationDisplay() {
  const notificationContext = useContext(NotificationContext);
  if (!notificationContext) throw new Error('Must be used within NotificationProvider');
  const { notifications, removeNotification } = notificationContext;

  if (notifications.length === 0) return null;

  return (
    <div className="fixed top-4 right-4 z-50 space-y-2">
      {notifications.map(notification => (
        <div
          key={notification.id}
          className={`p-4 rounded-lg shadow-lg max-w-sm animate-in slide-in-from-right ${
            notification.type === 'success'
              ? 'bg-green-500 text-white'
              : notification.type === 'error'
              ? 'bg-red-500 text-white'
              : notification.type === 'warning'
              ? 'bg-yellow-500 text-white'
              : 'bg-blue-500 text-white'
          }`}
        >
          <div className="flex justify-between items-start">
            <div>
              {notification.title && <h4 className="font-bold text-sm">{notification.title}</h4>}
              <p className="text-sm">{notification.message}</p>
            </div>
            <Button
              size="sm"
              variant="ghost"
              onClick={() => removeNotification(notification.id)}
              className="text-white hover:bg-white/20 h-6 w-6 p-0"
            >
              ×
            </Button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default function UseContextPage() {
  const [activeTab, setActiveTab] = useState('intro');

  return (
    <ThemeProvider>
      <AuthProvider>
        <CartProvider>
          <NotificationProvider>
            <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/50 to-purple-50/50 dark:from-slate-950 dark:via-blue-950/50 dark:to-purple-950/50">
              <NotificationDisplay />

              {/* Hero Header */}
              <div className="relative bg-gradient-to-r from-purple-600 via-pink-600 to-red-600 text-white py-24 px-4 mb-16 shadow-2xl overflow-hidden">
                <div className="absolute inset-0 opacity-20">
                  <div className="absolute top-10 left-10 w-20 h-20 bg-white/10 rounded-full animate-pulse"></div>
                  <div className="absolute top-32 right-20 w-32 h-32 bg-white/5 rounded-full animate-bounce"></div>
                  <div className="absolute bottom-20 left-1/4 w-16 h-16 bg-white/10 rounded-full animate-ping"></div>
                </div>

                <div className="container mx-auto max-w-7xl relative z-10">
                  <div className="flex items-center gap-3 mb-8">
                    <div className="w-12 h-12 bg-white/20 backdrop-blur-md rounded-2xl flex items-center justify-center border border-white/30">
                      <Database className="h-6 w-6 text-white" />
                    </div>
                    <Badge className="bg-white/20 backdrop-blur-md text-white hover:bg-white/30 border-white/30 px-4 py-2 text-sm font-bold">
                      🔗 React Context
                    </Badge>
                  </div>

                  <h1 className="text-6xl sm:text-7xl font-black mb-8 leading-tight">
                    <span className="bg-clip-text text-transparent bg-gradient-to-r from-white via-purple-100 to-pink-100">
                      useContext
                    </span>
                    <div className="text-4xl sm:text-5xl mt-2 font-light text-white/90">
                      Global State Management
                    </div>
                  </h1>

                  <p className="text-xl text-white/90 max-w-4xl leading-relaxed font-medium">
                    🌐 Khám phá useContext - Giải pháp hoàn hảo để chia sẻ dữ liệu giữa các
                    components mà không cần prop drilling, quản lý state toàn cục một cách hiệu quả
                  </p>

                  <div className="flex items-center gap-4 mt-8">
                    <Sparkles className="h-5 w-5 text-yellow-300 animate-pulse" />
                    <span className="text-white/80 text-sm font-medium">
                      Từ Context cơ bản đến Advanced Patterns với TypeScript
                    </span>
                  </div>
                </div>
              </div>

              <div className="container mx-auto max-w-7xl px-4 pb-32">
                <Tabs defaultValue="intro" value={activeTab} onValueChange={setActiveTab}>
                  <TabsList className="bg-white/95 dark:bg-slate-800/95 backdrop-blur-xl p-3 shadow-2xl rounded-3xl border border-slate-200/50 dark:border-slate-700/50 mb-16 grid grid-cols-4 gap-2">
                    {[
                      {
                        value: 'intro',
                        icon: '📚',
                        text: 'Giới thiệu',
                        gradient: 'from-purple-500 to-pink-500',
                      },
                      {
                        value: 'basic',
                        icon: '🎯',
                        text: 'Cơ bản',
                        gradient: 'from-blue-500 to-indigo-500',
                      },
                      {
                        value: 'provider',
                        icon: '🏭',
                        text: 'Provider',
                        gradient: 'from-green-500 to-emerald-500',
                      },
                      {
                        value: 'examples',
                        icon: '🚀',
                        text: 'Demo',
                        gradient: 'from-teal-500 to-cyan-500',
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
                          <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-600 rounded-3xl flex items-center justify-center shadow-xl">
                            <span className="text-3xl">🔗</span>
                          </div>
                          <div>
                            <h2 className="text-4xl font-black text-slate-900 dark:text-white mb-2">
                              useContext là gì?
                            </h2>
                            <p className="text-slate-600 dark:text-slate-400 text-lg">
                              Hook để truy cập Context trong React
                            </p>
                          </div>
                        </div>

                        <div className="prose prose-xl max-w-none dark:prose-invert mb-12">
                          <p className="text-slate-700 dark:text-slate-300 text-xl leading-relaxed">
                            <code className="bg-gradient-to-r from-purple-100 to-pink-100 dark:from-purple-900/60 dark:to-pink-900/60 px-3 py-2 rounded-lg text-purple-800 dark:text-purple-200 font-bold text-lg">
                              useContext
                            </code>{' '}
                            là một Hook cho phép bạn đọc và subscribe tới{' '}
                            <span className="font-bold text-pink-600 dark:text-pink-400">
                              context
                            </span>{' '}
                            từ component. Context giúp bạn truyền dữ liệu qua component tree mà
                            không cần phải pass props xuống từng level.
                          </p>
                        </div>

                        <div className="grid lg:grid-cols-2 gap-8 mb-12">
                          <div className="bg-gradient-to-br from-red-50 via-pink-50 to-rose-50 dark:from-red-900/30 dark:via-pink-900/30 dark:to-rose-900/30 p-8 rounded-3xl border border-red-200/60 dark:border-red-800/60 shadow-xl">
                            <h4 className="font-black text-red-800 dark:text-red-300 mb-6 flex items-center gap-3 text-xl">
                              <span className="text-2xl">❌</span> Vấn đề Prop Drilling
                            </h4>
                            <ul className="space-y-4 text-slate-700 dark:text-slate-300">
                              <li className="flex items-center gap-3 p-3 bg-white/60 dark:bg-slate-800/60 rounded-xl">
                                <span className="text-xl">📤</span>
                                <span className="font-semibold">Pass props qua nhiều levels</span>
                              </li>
                              <li className="flex items-center gap-3 p-3 bg-white/60 dark:bg-slate-800/60 rounded-xl">
                                <span className="text-xl">🔄</span>
                                <span className="font-semibold">
                                  Components trung gian không dùng data
                                </span>
                              </li>
                              <li className="flex items-center gap-3 p-3 bg-white/60 dark:bg-slate-800/60 rounded-xl">
                                <span className="text-xl">😵</span>
                                <span className="font-semibold">Code khó maintain và refactor</span>
                              </li>
                            </ul>
                          </div>

                          <div className="bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 dark:from-green-900/30 dark:via-emerald-900/30 dark:to-teal-900/30 p-8 rounded-3xl border border-green-200/60 dark:border-green-800/60 shadow-xl">
                            <h4 className="font-black text-green-800 dark:text-green-300 mb-6 flex items-center gap-3 text-xl">
                              <span className="text-2xl">✅</span> Context giải quyết
                            </h4>
                            <ul className="space-y-4 text-slate-700 dark:text-slate-300">
                              <li className="flex items-center gap-3 p-3 bg-white/60 dark:bg-slate-800/60 rounded-xl">
                                <span className="text-xl">🎯</span>
                                <span className="font-semibold">
                                  Truy cập trực tiếp từ bất kỳ component nào
                                </span>
                              </li>
                              <li className="flex items-center gap-3 p-3 bg-white/60 dark:bg-slate-800/60 rounded-xl">
                                <span className="text-xl">🏗️</span>
                                <span className="font-semibold">
                                  Tách biệt logic và presentation
                                </span>
                              </li>
                              <li className="flex items-center gap-3 p-3 bg-white/60 dark:bg-slate-800/60 rounded-xl">
                                <span className="text-xl">⚡</span>
                                <span className="font-semibold">Performance tối ưu với memo</span>
                              </li>
                            </ul>
                          </div>
                        </div>

                        <RawCode
                          fileName="useContext-basic.tsx"
                          code={`import { createContext, useContext } from 'react';

// 1. Tạo Context
const ThemeContext = createContext();

// 2. Sử dụng Context
function Button() {
  const theme = useContext(ThemeContext);
  return (
    <button className={theme === 'dark' ? 'dark-button' : 'light-button'}>
      Click me
    </button>
  );
}

// 3. Provide Context
function App() {
  return (
    <ThemeContext.Provider value="dark">
      <Button />
    </ThemeContext.Provider>
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
                              Ba bước cơ bản để sử dụng Context
                            </p>
                          </div>
                        </div>

                        <div className="space-y-16">
                          <div>
                            <h3 className="text-3xl font-black mb-6 text-slate-900 dark:text-white">
                              1️⃣ Tạo Context
                            </h3>
                            <RawCode
                              fileName="create-context.tsx"
                              code={`import { createContext } from 'react';

// Context đơn giản
const ThemeContext = createContext('light');

// Context với TypeScript
interface User {
  id: number;
  name: string;
  email: string;
}

interface AuthContextType {
  user: User | null;
  login: (user: User) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);`}
                            />
                          </div>

                          <div>
                            <h3 className="text-3xl font-black mb-6 text-slate-900 dark:text-white">
                              2️⃣ Provide Context
                            </h3>
                            <RawCode
                              fileName="provider.tsx"
                              code={`function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  const login = (userData) => setUser(userData);
  const logout = () => setUser(null);

  const value = {
    user,
    login,
    logout,
    isAuthenticated: !!user
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}`}
                            />
                          </div>

                          <div>
                            <h3 className="text-3xl font-black mb-6 text-slate-900 dark:text-white">
                              3️⃣ Consume Context
                            </h3>
                            <RawCode
                              fileName="consume-context.tsx"
                              code={`function Header() {
  const auth = useContext(AuthContext);

  if (!auth) {
    throw new Error('Header must be used within AuthProvider');
  }

  const { user, login, logout, isAuthenticated } = auth;

  return (
    <header>
      {isAuthenticated ? (
        <div>
          <span>Welcome, {user.name}!</span>
          <button onClick={logout}>Logout</button>
        </div>
      ) : (
        <button onClick={() => login({ id: 1, name: 'John' })}>
          Login
        </button>
      )}
    </header>
  );
}

// Custom Hook pattern
function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
}`}
                            />
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </TabsContent>

                  <TabsContent value="provider">
                    <Card className="border-0 shadow-2xl bg-white/98 dark:bg-slate-800/98 backdrop-blur-md rounded-3xl overflow-hidden">
                      <CardContent className="p-12">
                        <div className="flex items-center gap-6 mb-10">
                          <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-600 rounded-3xl flex items-center justify-center shadow-xl">
                            <span className="text-3xl">🏭</span>
                          </div>
                          <div>
                            <h2 className="text-4xl font-black text-slate-900 dark:text-white mb-2">
                              Provider Patterns
                            </h2>
                            <p className="text-slate-600 dark:text-slate-400 text-lg">
                              Các pattern phổ biến và best practices
                            </p>
                          </div>
                        </div>

                        <div className="space-y-16">
                          <div>
                            <h3 className="text-3xl font-black mb-6 text-slate-900 dark:text-white">
                              🎯 State Management Provider
                            </h3>
                            <RawCode
                              fileName="state-provider.tsx"
                              code={`import { createContext, useContext, useReducer } from 'react';

interface TodoState {
  todos: Todo[];
  filter: 'all' | 'active' | 'completed';
}

type TodoAction =
  | { type: 'ADD_TODO'; payload: string }
  | { type: 'TOGGLE_TODO'; payload: number }
  | { type: 'DELETE_TODO'; payload: number };

const TodoContext = createContext<TodoContextType | undefined>(undefined);

function todoReducer(state: TodoState, action: TodoAction): TodoState {
  switch (action.type) {
    case 'ADD_TODO':
      return {
        ...state,
        todos: [...state.todos, {
          id: Date.now(),
          text: action.payload,
          completed: false,
        }],
      };
    case 'TOGGLE_TODO':
      return {
        ...state,
        todos: state.todos.map(todo =>
          todo.id === action.payload
            ? { ...todo, completed: !todo.completed }
            : todo
        ),
      };
    default:
      return state;
  }
}

export function TodoProvider({ children }) {
  const [state, dispatch] = useReducer(todoReducer, {
    todos: [],
    filter: 'all',
  });

  const addTodo = (text: string) => {
    dispatch({ type: 'ADD_TODO', payload: text });
  };

  const toggleTodo = (id: number) => {
    dispatch({ type: 'TOGGLE_TODO', payload: id });
  };

  return (
    <TodoContext.Provider value={{ state, addTodo, toggleTodo }}>
      {children}
    </TodoContext.Provider>
  );
}`}
                            />
                          </div>

                          <div>
                            <h3 className="text-3xl font-black mb-6 text-slate-900 dark:text-white">
                              🔄 Async Data Provider
                            </h3>
                            <RawCode
                              fileName="async-provider.tsx"
                              code={`export function UserProvider({ children }) {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/users');
      const data = await response.json();
      setUsers(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const addUser = async (userData) => {
    try {
      const response = await fetch('/api/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userData),
      });
      const newUser = await response.json();
      setUsers(prev => [...prev, newUser]);
    } catch (err) {
      setError(err.message);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <UserContext.Provider value={{
      users, loading, error, fetchUsers, addUser
    }}>
      {children}
    </UserContext.Provider>
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
                          <div className="w-16 h-16 bg-gradient-to-br from-teal-500 to-cyan-600 rounded-3xl flex items-center justify-center shadow-xl">
                            <span className="text-3xl">🚀</span>
                          </div>
                          <div>
                            <h2 className="text-4xl font-black text-slate-900 dark:text-white mb-2">
                              Live Demos
                            </h2>
                            <p className="text-slate-600 dark:text-slate-400 text-lg">
                              Thử nghiệm Context trong thực tế
                            </p>
                          </div>
                        </div>

                        <div className="space-y-12">
                          <BasicContextDemo />
                          <AuthDemo />
                          <CartDemo />
                        </div>
                      </CardContent>
                    </Card>
                  </TabsContent>
                </Tabs>
              </div>
            </div>
          </NotificationProvider>
        </CartProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}
