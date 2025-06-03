'use client';
import React from 'react';
import Link from 'next/link';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  ArrowRight,
  Sparkles,
  Zap,
  Shield,
  Rocket,
  Code,
  Layers,
  Clock,
  Star,
  GitBranch,
  Activity,
  RefreshCw,
  Eye,
  Settings,
  Database,
  Cpu,
  BookOpen,
  Play,
  Terminal,
} from 'lucide-react';
import dynamic from 'next/dynamic';

// Import TimeAndClock component with dynamic loading to avoid SSR issues
const TimeAndClock = dynamic(() => import('@/app/useState/components/TimeAndClock'), {
  ssr: false,
});

export default function ModernLandingPage() {
  const features = [
    {
      icon: <Zap className="h-6 w-6" />,
      title: 'React Hooks',
      description: 'Học useState, useEffect, useContext và các hooks nâng cao',
      gradient: 'from-yellow-400 to-orange-500',
    },
    {
      icon: <Code className="h-6 w-6" />,
      title: 'JSX Mastery',
      description: 'Làm chủ cú pháp JSX và conditional rendering',
      gradient: 'from-blue-400 to-purple-500',
    },
    {
      icon: <Activity className="h-6 w-6" />,
      title: 'Component Lifecycle',
      description: 'Hiểu vòng đời component và performance optimization',
      gradient: 'from-green-400 to-teal-500',
    },
  ];

  const reactConcepts = [
    {
      icon: <Code className="h-8 w-8" />,
      title: 'JSX Fundamentals',
      description:
        'Học cú pháp JSX, expressions, attributes và conditional rendering với ví dụ thực tế',
      href: '/jsx',
      color: 'from-blue-500 to-indigo-600',
      badge: 'Cơ bản',
      examples: ['Biểu thức JavaScript', 'Thuộc tính động', 'Conditional rendering'],
    },
    {
      icon: <Settings className="h-8 w-8" />,
      title: 'useState Hook',
      description: 'Quản lý state trong function components với các patterns và best practices',
      href: '/useState',
      color: 'from-purple-500 to-pink-600',
      badge: 'Hook',
      examples: ['State management', 'Event handlers', 'Form controls'],
    },
    {
      icon: <RefreshCw className="h-8 w-8" />,
      title: 'useEffect Hook',
      description: 'Side effects, lifecycle methods và data fetching trong React components',
      href: '/useEffect',
      color: 'from-amber-500 to-red-500',
      badge: 'Lifecycle',
      examples: ['Data fetching', 'Event listeners', 'Cleanup functions'],
    },
    {
      icon: <Database className="h-8 w-8" />,
      title: 'useContext Hook',
      description: 'State management toàn cục và prop drilling solutions',
      href: '/useContext',
      color: 'from-green-500 to-emerald-600',
      badge: 'Global State',
      examples: ['Context providers', 'Consumer patterns', 'Theme switching'],
    },
    {
      icon: <Cpu className="h-8 w-8" />,
      title: 'useMemo Hook',
      description: 'Performance optimization và memoization techniques',
      href: '/useMemo',
      color: 'from-cyan-500 to-blue-600',
      badge: 'Performance',
      examples: ['Expensive calculations', 'Object memoization', 'Dependency arrays'],
    },
    {
      icon: <Zap className="h-8 w-8" />,
      title: 'useCallback Hook',
      description: 'Function memoization và preventing unnecessary re-renders',
      href: '/useCallback',
      color: 'from-violet-500 to-purple-600',
      badge: 'Optimization',
      examples: ['Function memoization', 'Event handlers', 'Child components'],
    },
    {
      icon: <Eye className="h-8 w-8" />,
      title: 'useRef Hook',
      description: 'DOM manipulation và persistent values across renders',
      href: '/useRef',
      color: 'from-rose-500 to-pink-600',
      badge: 'DOM',
      examples: ['DOM references', 'Persistent values', 'Focus management'],
    },
    {
      icon: <Activity className="h-8 w-8" />,
      title: 'Component Lifecycle',
      description: 'Vòng đời component từ mount đến unmount với class và function components',
      href: '/life-cirlce',
      color: 'from-orange-500 to-amber-600',
      badge: 'Lifecycle',
      examples: ['Mount/Unmount', 'Update phases', 'useEffect patterns'],
    },
  ];

  const practicalExamples = [
    {
      icon: <Terminal className="h-6 w-6" />,
      title: 'Component Testing',
      description: 'Test React components với Jest và React Testing Library',
      href: '/test',
      color: 'from-slate-500 to-gray-600',
    },
    {
      icon: <Layers className="h-6 w-6" />,
      title: 'Render Patterns',
      description: 'Các patterns render trong React như conditional, list, và composition',
      href: '/render',
      color: 'from-indigo-500 to-blue-600',
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 dark:from-slate-950 dark:via-slate-900 dark:to-blue-950">
      {/* Enhanced Navigation */}
      <nav className="border-b border-slate-200/60 dark:border-slate-800/60 bg-white/80 backdrop-blur-md dark:bg-slate-900/80 sticky top-0 z-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <Link href="/" className="flex items-center space-x-3 group">
                <div className="relative">
                  <div className="w-10 h-10 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-105">
                    <Sparkles className="h-6 w-6 text-white" />
                  </div>
                  <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white dark:border-slate-900 animate-pulse"></div>
                </div>
                <div>
                  <span className="font-black text-xl bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                    React Mastery
                  </span>
                  <div className="text-xs text-slate-500 dark:text-slate-400 font-medium">
                    Learn • Practice • Master
                  </div>
                </div>
              </Link>
            </div>

            <div className="hidden md:flex items-center space-x-1">
              <Link href="/jsx">
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-slate-600 hover:text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-950"
                >
                  JSX
                </Button>
              </Link>
              <Link href="/useState">
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-slate-600 hover:text-purple-600 hover:bg-purple-50 dark:hover:bg-purple-950"
                >
                  Hooks
                </Button>
              </Link>
              <Link href="/life-cirlce">
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-slate-600 hover:text-orange-600 hover:bg-orange-50 dark:hover:bg-orange-950"
                >
                  Lifecycle
                </Button>
              </Link>
              <div className="w-px h-6 bg-slate-200 dark:bg-slate-700 mx-2"></div>
              <Link href="/jsx">
                <Button
                  size="sm"
                  className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white shadow-md hover:shadow-lg transition-all"
                >
                  <Play className="h-4 w-4 mr-1" />
                  Bắt Đầu
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center py-20 lg:py-28">
          <div className="flex justify-center mb-6">
            <Badge className="bg-gradient-to-r from-blue-100 to-purple-100 text-blue-800 dark:from-blue-900 dark:to-purple-900 dark:text-blue-200 px-4 py-2 text-sm font-semibold border-0 shadow-md">
              <Sparkles className="w-4 h-4 mr-2" />
              Học React Từ Cơ Bản Đến Nâng Cao
            </Badge>
          </div>

          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black mb-6 leading-tight">
            <span className="bg-gradient-to-r from-slate-900 via-blue-800 to-purple-800 bg-clip-text text-transparent dark:from-white dark:via-blue-200 dark:to-purple-200">
              Master React
            </span>
            <br />
            <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
              Concepts & Hooks
            </span>
          </h1>

          <p className="text-xl lg:text-2xl text-slate-600 dark:text-slate-300 mb-12 max-w-4xl mx-auto leading-relaxed">
            Khám phá React từ JSX cơ bản đến các hooks nâng cao.
            <span className="font-semibold text-blue-600 dark:text-blue-400">
              Lý thuyết chi tiết
            </span>
            ,
            <span className="font-semibold text-purple-600 dark:text-purple-400">
              {' '}
              ví dụ thực tế
            </span>{' '}
            và
            <span className="font-semibold text-pink-600 dark:text-pink-400"> demo tương tác</span>.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
            <Link href="/jsx">
              <Button
                size="lg"
                className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white px-8 py-4 text-lg shadow-xl hover:shadow-2xl transition-all transform hover:scale-105"
              >
                <BookOpen className="mr-2 h-5 w-5" />
                Bắt Đầu Học
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Link href="/useState">
              <Button
                variant="outline"
                size="lg"
                className="px-8 py-4 text-lg border-2 border-slate-300 hover:bg-slate-100 dark:border-slate-700 dark:hover:bg-slate-800 transition-all"
              >
                <Zap className="mr-2 h-5 w-5" />
                Xem React Hooks
              </Button>
            </Link>
          </div>

          {/* Live Demo */}
          <div className="max-w-3xl mx-auto mb-20">
            <div className="bg-gradient-to-r from-blue-900/10 via-purple-900/10 to-pink-900/10 backdrop-blur-sm p-8 rounded-3xl shadow-2xl border border-white/20 dark:border-slate-700/30">
              <div className="flex items-center justify-center gap-3 mb-6">
                <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                <h3 className="text-2xl font-bold text-slate-800 dark:text-white">
                  Live Demo: useState + useEffect
                </h3>
                <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
              </div>

              <div className="transform hover:scale-105 transition-transform duration-300">
                <TimeAndClock />
              </div>

              <p className="mt-6 text-slate-600 dark:text-slate-300 leading-relaxed">
                Đồng hồ thời gian thực được xây dựng với{' '}
                <code className="bg-slate-200 dark:bg-slate-700 px-2 py-1 rounded">useState</code>{' '}
                và{' '}
                <code className="bg-slate-200 dark:bg-slate-700 px-2 py-1 rounded">useEffect</code>
              </p>

              <div className="flex justify-center gap-3 mt-6">
                <Link href="/useState">
                  <Button
                    variant="outline"
                    size="sm"
                    className="border-blue-500 text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-950"
                  >
                    <Settings className="mr-2 h-4 w-4" />
                    useState Code
                  </Button>
                </Link>
                <Link href="/useEffect">
                  <Button
                    variant="outline"
                    size="sm"
                    className="border-purple-500 text-purple-600 hover:bg-purple-50 dark:hover:bg-purple-950"
                  >
                    <RefreshCw className="mr-2 h-4 w-4" />
                    useEffect Code
                  </Button>
                </Link>
              </div>
            </div>
          </div>

          {/* Alert */}
          <Alert className="max-w-lg mx-auto bg-gradient-to-r from-green-50 to-emerald-50 border-green-200 dark:from-green-950 dark:to-emerald-950 dark:border-green-800 shadow-lg">
            <Sparkles className="h-5 w-5 text-green-600" />
            <AlertDescription className="text-green-700 dark:text-green-300 font-medium">
              🚀 Tham gia cùng <span className="font-bold">10,000+</span> lập trình viên học React
              hiệu quả
            </AlertDescription>
          </Alert>
        </div>

        {/* Features Overview */}
        <div className="grid md:grid-cols-3 gap-8 mb-24">
          {features.map((feature, index) => (
            <Card
              key={index}
              className="group hover:shadow-2xl transition-all duration-500 border-0 bg-white/60 backdrop-blur-sm dark:bg-slate-800/60 hover:scale-105 overflow-hidden"
            >
              <div className={`h-2 bg-gradient-to-r ${feature.gradient}`}></div>
              <CardHeader className="text-center pb-4">
                <div
                  className={`w-16 h-16 mx-auto mb-4 bg-gradient-to-r ${feature.gradient} rounded-2xl flex items-center justify-center text-white group-hover:scale-110 transition-transform duration-300 shadow-lg`}
                >
                  {feature.icon}
                </div>
                <CardTitle className="text-xl font-bold text-slate-900 dark:text-white">
                  {feature.title}
                </CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <CardDescription className="text-slate-600 dark:text-slate-300 text-base leading-relaxed">
                  {feature.description}
                </CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Main React Concepts */}
        <div className="mb-24">
          <div className="text-center mb-16">
            <div className="flex items-center justify-center gap-3 mb-6">
              <Star className="h-6 w-6 text-yellow-500 animate-pulse" />
              <h2 className="text-4xl lg:text-5xl font-black bg-gradient-to-r from-slate-900 to-blue-800 bg-clip-text text-transparent dark:from-white dark:to-blue-300">
                React Concepts
              </h2>
              <Star className="h-6 w-6 text-yellow-500 animate-pulse" />
            </div>
            <p className="text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto">
              Từng chủ đề được giải thích chi tiết với lý thuyết, ví dụ code và demo tương tác
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            {reactConcepts.map((concept, index) => (
              <Link href={concept.href} key={index} className="block group">
                <Card className="h-full hover:shadow-2xl transition-all duration-500 border-0 bg-white/80 backdrop-blur-sm dark:bg-slate-800/80 hover:scale-[1.02] overflow-hidden">
                  <div className={`h-3 bg-gradient-to-r ${concept.color}`}></div>

                  <CardHeader className="pb-4">
                    <div className="flex items-start justify-between mb-4">
                      <div
                        className={`w-16 h-16 bg-gradient-to-r ${concept.color} rounded-2xl flex items-center justify-center text-white group-hover:scale-110 transition-transform duration-300 shadow-lg`}
                      >
                        {concept.icon}
                      </div>
                      <Badge variant="secondary" className="text-xs font-semibold">
                        {concept.badge}
                      </Badge>
                    </div>

                    <CardTitle className="text-2xl font-bold text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                      {concept.title}
                    </CardTitle>
                  </CardHeader>

                  <CardContent className="space-y-4">
                    <CardDescription className="text-slate-600 dark:text-slate-300 text-base leading-relaxed">
                      {concept.description}
                    </CardDescription>

                    <div className="flex flex-wrap gap-2">
                      {concept.examples.map((example, idx) => (
                        <Badge
                          key={idx}
                          variant="outline"
                          className="text-xs bg-slate-50 dark:bg-slate-800 text-slate-600 dark:text-slate-300"
                        >
                          {example}
                        </Badge>
                      ))}
                    </div>

                    <div className="flex items-center text-sm text-blue-600 dark:text-blue-400 font-medium group-hover:text-blue-700 dark:group-hover:text-blue-300 transition-colors">
                      Xem chi tiết
                      <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>

        {/* Practical Examples */}
        <div className="mb-24">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4 text-slate-900 dark:text-white">
              Ví Dụ Thực Tế
            </h2>
            <p className="text-slate-600 dark:text-slate-300 text-lg">
              Áp dụng kiến thức vào các tình huống thực tế
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {practicalExamples.map((example, index) => (
              <Link href={example.href} key={index} className="block group">
                <Card className="h-full hover:shadow-xl transition-all duration-300 border border-slate-200 dark:border-slate-700 bg-white/60 backdrop-blur-sm dark:bg-slate-800/60 hover:scale-105 overflow-hidden">
                  <div className={`h-2 bg-gradient-to-r ${example.color}`}></div>
                  <CardHeader className="text-center pb-4">
                    <div
                      className={`w-14 h-14 mx-auto mb-4 bg-gradient-to-r ${example.color} rounded-xl flex items-center justify-center text-white group-hover:scale-110 transition-transform duration-300 shadow-md`}
                    >
                      {example.icon}
                    </div>
                    <CardTitle className="text-xl font-semibold text-slate-900 dark:text-white">
                      {example.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="text-center">
                    <CardDescription className="text-slate-600 dark:text-slate-300 text-base leading-relaxed">
                      {example.description}
                    </CardDescription>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>

        {/* Stats Section */}
        <div className="bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-3xl p-12 text-white text-center shadow-2xl mb-20 relative overflow-hidden">
          <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10"></div>
          <div className="relative z-10">
            <h2 className="text-3xl lg:text-4xl font-bold mb-8">
              Được Tin Dùng Bởi Developer Việt Nam
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 hover:bg-white/20 transition-all transform hover:scale-105">
                <div className="text-5xl lg:text-6xl font-black mb-2">8+</div>
                <div className="text-lg text-blue-100">React Concepts</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 hover:bg-white/20 transition-all transform hover:scale-105">
                <div className="text-5xl lg:text-6xl font-black mb-2">50+</div>
                <div className="text-lg text-purple-100">Code Examples</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 hover:bg-white/20 transition-all transform hover:scale-105">
                <div className="text-5xl lg:text-6xl font-black mb-2">100%</div>
                <div className="text-lg text-pink-100">Miễn Phí</div>
              </div>
            </div>
          </div>
        </div>

        {/* GitHub Section */}
        <div className="bg-gradient-to-br from-white to-slate-50 dark:from-slate-800 dark:to-slate-900 rounded-3xl p-12 shadow-xl border border-slate-200/60 dark:border-slate-700/60 mb-20">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
            <div className="lg:w-1/2">
              <div className="flex items-center gap-3 mb-4">
                <GitBranch className="h-8 w-8 text-slate-700 dark:text-slate-300" />
                <h2 className="text-3xl font-bold text-slate-900 dark:text-white">
                  Open Source Project
                </h2>
              </div>
              <p className="text-slate-600 dark:text-slate-300 mb-6 leading-relaxed text-lg">
                Toàn bộ source code được chia sẻ miễn phí. Bạn có thể clone, fork và contribute để
                cải thiện chất lượng nội dung.
              </p>
              <div className="flex gap-4">
                <Button className="bg-slate-900 hover:bg-slate-800 text-white dark:bg-slate-700 dark:hover:bg-slate-600 shadow-lg">
                  <GitBranch className="mr-2 h-5 w-5" />
                  Fork Project
                </Button>
                <Button variant="outline" className="border-slate-300 dark:border-slate-600">
                  <Star className="mr-2 h-5 w-5" />
                  Star on GitHub
                </Button>
              </div>
            </div>
            <div className="lg:w-1/2">
              <div className="bg-slate-900 dark:bg-slate-950 p-6 rounded-2xl shadow-inner border border-slate-700">
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                  <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  <span className="text-slate-400 text-sm ml-2">terminal</span>
                </div>
                <pre className="font-mono text-sm text-green-400 overflow-x-auto">
                  <code>{`$ git clone https://github.com/react-mastery/examples.git
$ cd examples
$ npm install
$ npm run dev

🚀 Server running on http://localhost:3000`}</code>
                </pre>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Enhanced Footer */}
      <footer className="border-t border-slate-200/60 dark:border-slate-800/60 bg-gradient-to-br from-white/80 to-slate-50/80 backdrop-blur-md dark:from-slate-900/80 dark:to-slate-950/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            <div className="lg:col-span-2">
              <Link href="/" className="flex items-center space-x-3 mb-6 group">
                <div className="w-12 h-12 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all">
                  <Sparkles className="h-7 w-7 text-white" />
                </div>
                <div>
                  <span className="font-black text-2xl bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                    React Mastery
                  </span>
                  <div className="text-sm text-slate-500 dark:text-slate-400">
                    Learn • Practice • Master
                  </div>
                </div>
              </Link>
              <p className="text-slate-600 dark:text-slate-300 mb-6 max-w-md leading-relaxed">
                Nền tảng học React toàn diện với lý thuyết chi tiết, ví dụ thực tế và demo tương
                tác. Hoàn toàn miễn phí cho cộng đồng developer Việt Nam.
              </p>
              <div className="flex gap-4">
                <Badge
                  variant="outline"
                  className="bg-blue-50 dark:bg-blue-950 text-blue-700 dark:text-blue-300"
                >
                  <BookOpen className="w-4 h-4 mr-2" />
                  8+ Concepts
                </Badge>
                <Badge
                  variant="outline"
                  className="bg-purple-50 dark:bg-purple-950 text-purple-700 dark:text-purple-300"
                >
                  <Code className="w-4 h-4 mr-2" />
                  50+ Examples
                </Badge>
              </div>
            </div>

            <div>
              <h3 className="font-bold text-slate-900 dark:text-white mb-6 text-lg">
                React Concepts
              </h3>
              <ul className="space-y-3 text-slate-600 dark:text-slate-300">
                <li>
                  <Link
                    href="/jsx"
                    className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors flex items-center gap-2"
                  >
                    <Code className="w-4 h-4" />
                    JSX Fundamentals
                  </Link>
                </li>
                <li>
                  <Link
                    href="/useState"
                    className="hover:text-purple-600 dark:hover:text-purple-400 transition-colors flex items-center gap-2"
                  >
                    <Settings className="w-4 h-4" />
                    useState Hook
                  </Link>
                </li>
                <li>
                  <Link
                    href="/useEffect"
                    className="hover:text-amber-600 dark:hover:text-amber-400 transition-colors flex items-center gap-2"
                  >
                    <RefreshCw className="w-4 h-4" />
                    useEffect Hook
                  </Link>
                </li>
                <li>
                  <Link
                    href="/life-cirlce"
                    className="hover:text-orange-600 dark:hover:text-orange-400 transition-colors flex items-center gap-2"
                  >
                    <Activity className="w-4 h-4" />
                    Component Lifecycle
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-bold text-slate-900 dark:text-white mb-6 text-lg">
                Advanced Topics
              </h3>
              <ul className="space-y-3 text-slate-600 dark:text-slate-300">
                <li>
                  <Link
                    href="/useContext"
                    className="hover:text-green-600 dark:hover:text-green-400 transition-colors flex items-center gap-2"
                  >
                    <Database className="w-4 h-4" />
                    useContext
                  </Link>
                </li>
                <li>
                  <Link
                    href="/useMemo"
                    className="hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors flex items-center gap-2"
                  >
                    <Cpu className="w-4 h-4" />
                    useMemo
                  </Link>
                </li>
                <li>
                  <Link
                    href="/useCallback"
                    className="hover:text-violet-600 dark:hover:text-violet-400 transition-colors flex items-center gap-2"
                  >
                    <Zap className="w-4 h-4" />
                    useCallback
                  </Link>
                </li>
                <li>
                  <Link
                    href="/useRef"
                    className="hover:text-rose-600 dark:hover:text-rose-400 transition-colors flex items-center gap-2"
                  >
                    <Eye className="w-4 h-4" />
                    useRef
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-slate-200/60 dark:border-slate-700/60 mt-12 pt-8">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              <p className="text-slate-600 dark:text-slate-300 text-center md:text-left">
                &copy; 2025 React Mastery. Made with ❤️ using Next.js, Tailwind CSS & shadcn/ui.
              </p>
              <div className="flex items-center gap-4">
                <Badge variant="outline" className="text-xs">
                  <Rocket className="w-3 h-3 mr-1" />
                  Next.js 15
                </Badge>
                <Badge variant="outline" className="text-xs">
                  <Zap className="w-3 h-3 mr-1" />
                  React 18
                </Badge>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
