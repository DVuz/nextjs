"use client";

import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import {
  AlertCircle,
  Check,
  ChevronRight,
  Code,
  Copy,
  Eye,
  FileCode,
  Info,
  Lightbulb,
  ListChecks,
  Palette,
  Shield,
  Sparkles,
  Zap,
  Layers,
  Terminal,
  BookOpen,
  Cpu,
  Filter
} from "lucide-react";

// Enhanced CodeBlock with dynamic styling based on content complexity
// @ts-ignore
const CodeBlock = ({ codeString, language = "jsx" }) => {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(codeString);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Analyze code content for dynamic styling
  const isMultiLine = codeString.includes('\n');
  const lineCount = codeString.split('\n').length;
  const isLongCode = codeString.length > 200;
  const isComplexCode = lineCount > 10 || codeString.length > 400;

  const getContainerStyles = () => {
    if (isComplexCode) {
      return "rounded-3xl border-2 border-slate-700/70 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 shadow-2xl";
    } else if (isMultiLine) {
      return "rounded-2xl border-2 border-slate-700/60 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 shadow-xl";
    } else {
      return "rounded-xl border border-slate-700/50 bg-gradient-to-r from-slate-950 to-slate-900 shadow-lg";
    }
  };

  const getHeaderStyles = () => {
    if (isComplexCode) {
      return "px-6 py-4 bg-slate-800/90 border-b-2 border-slate-700/70 backdrop-blur-sm";
    } else if (isMultiLine) {
      return "px-5 py-3 bg-slate-800/80 border-b-2 border-slate-700/60 backdrop-blur-sm";
    } else {
      return "px-4 py-2.5 bg-slate-800/70 border-b border-slate-700/50 backdrop-blur-sm";
    }
  };

  const getCodeStyles = () => {
    if (isComplexCode) {
      return "p-8 text-sm";
    } else if (isMultiLine) {
      return "p-6 text-sm";
    } else {
      return "p-4 text-sm";
    }
  };

  return (
    <div className={`overflow-hidden group transition-all duration-300 hover:shadow-3xl ${getContainerStyles()}`}>
      <div className={`flex items-center justify-between transition-all duration-300 ${getHeaderStyles()}`}>
        <div className="flex items-center gap-3">
          <div className="flex space-x-2">
            <div className={`rounded-full bg-red-500 shadow-sm ${isComplexCode ? 'w-4 h-4' : 'w-3.5 h-3.5'}`}></div>
            <div className={`rounded-full bg-yellow-500 shadow-sm ${isComplexCode ? 'w-4 h-4' : 'w-3.5 h-3.5'}`}></div>
            <div className={`rounded-full bg-green-500 shadow-sm ${isComplexCode ? 'w-4 h-4' : 'w-3.5 h-3.5'}`}></div>
          </div>
          <div className="flex items-center gap-2">
            <Badge variant="outline" className={`bg-transparent text-slate-300 border-slate-600/70 ${isComplexCode ? 'text-sm px-3 py-1' : 'text-xs px-2.5 py-0.5'}`}>
              {language.toUpperCase()}
            </Badge>
            {lineCount > 1 && (
              <Badge variant="outline" className={`bg-slate-700/30 text-slate-400 border-slate-600/50 ${isComplexCode ? 'text-xs px-2.5 py-1' : 'text-xs px-2 py-0.5'}`}>
                {lineCount} dòng
              </Badge>
            )}
            {isLongCode && (
              <Badge variant="outline" className="text-xs bg-blue-900/30 text-blue-300 border-blue-700/50 px-2 py-0.5">
                Nâng cao
              </Badge>
            )}
          </div>
        </div>

        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                size="sm"
                variant="ghost"
                className={`text-slate-400 hover:text-slate-100 hover:bg-slate-700/60 transition-all duration-200 rounded-lg border border-transparent hover:border-slate-600/30 ${
                  isComplexCode ? 'h-10 px-4' : 'h-9 px-3'
                }`}
                onClick={copyToClipboard}
              >
                {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                <span className="ml-2 text-xs font-medium">{copied ? "Đã sao chép" : "Sao chép"}</span>
              </Button>
            </TooltipTrigger>
            <TooltipContent side="left">
              <p className="text-xs">{copied ? "Đã sao chép vào clipboard" : "Sao chép code"}</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>

      <pre className={`overflow-x-auto font-mono leading-relaxed text-slate-200 scrollbar-thin scrollbar-thumb-slate-700 scrollbar-track-transparent ${getCodeStyles()}`}>
        <code className="block whitespace-pre">{codeString.trim()}</code>
      </pre>
    </div>
  );
};

// Enhanced ResultPreview component
// @ts-ignore
const ResultPreview = ({ children, title = "Kết quả" }) => (
  <div className="mt-6 rounded-2xl border-2 border-slate-200/50 dark:border-slate-700/60 bg-white/95 dark:bg-slate-800/95 backdrop-blur-sm shadow-xl overflow-hidden transition-all duration-300 hover:shadow-2xl hover:border-slate-300/60 dark:hover:border-slate-600/70">
    <div className="px-6 py-4 border-b-2 border-slate-200/40 dark:border-slate-700/50 bg-gradient-to-r from-slate-50/90 to-white/90 dark:from-slate-800/90 dark:to-slate-800/70 backdrop-blur-sm">
      <div className="flex items-center gap-3">
        <div className="h-9 w-9 rounded-2xl bg-primary/20 flex items-center justify-center ring-2 ring-primary/20">
          <Sparkles className="h-5 w-5 text-primary" />
        </div>
        <p className="text-sm font-semibold text-slate-700 dark:text-slate-300">{title}</p>
      </div>
    </div>
    <div className="p-6 bg-white/85 dark:bg-slate-800/75 backdrop-blur-sm">{children}</div>
  </div>
);

// Enhanced FeatureCard component
// @ts-ignore
const FeatureCard = ({ icon: Icon, title, children, index = 0 }) => (
  <div
    className="rounded-2xl border-2 border-slate-200/50 dark:border-slate-700/50 bg-white/95 dark:bg-slate-800/95 backdrop-blur-sm p-8 shadow-xl transition-all duration-300 hover:shadow-2xl hover:border-primary/40 dark:hover:border-primary/50 hover:-translate-y-2 group cursor-pointer"
    style={{ animationDelay: `${index * 100}ms` }}
  >
    <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/15 text-primary ring-4 ring-primary/10 group-hover:ring-primary/25 group-hover:bg-primary/20 group-hover:scale-110 transition-all duration-300">
      <Icon className="h-8 w-8" />
    </div>
    <h3 className="mb-4 font-bold text-xl text-slate-800 dark:text-slate-200 group-hover:text-primary transition-colors duration-300">{title}</h3>
    <div className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed group-hover:text-slate-700 dark:group-hover:text-slate-300 transition-colors duration-200">{children}</div>
  </div>
);

// Enhanced Card wrapper for consistent styling
// @ts-ignore
// @ts-ignore
const EnhancedCard = ({ children, className = "", ...props }) => {
  return (
    <Card
      className={`border-2 border-slate-200/50 dark:border-slate-700/50 bg-white/95 dark:bg-slate-800/95 backdrop-blur-sm shadow-xl hover:shadow-2xl transition-all duration-300 ${className}`} {...props}>
      {children}
    </Card>
  );
};

// Enhanced CardHeader for consistent styling
// @ts-ignore
// @ts-ignore
const EnhancedCardHeader = ({ children, className = "", ...props }) => (
  <CardHeader className={`border-b-2 border-slate-100/70 dark:border-slate-700/50 bg-gradient-to-r from-slate-50/90 to-white/90 dark:from-slate-800/90 dark:to-slate-800/70 backdrop-blur-sm ${className}`} {...props}>
    {children}
  </CardHeader>
);

// Rule item component
// @ts-ignore
// @ts-ignore
const RuleItem = ({ number, children, index = 0 }) => (
  <li
    className="flex items-start gap-4 p-5 rounded-2xl border-2 border-slate-200/30 dark:border-slate-700/30 bg-gradient-to-br from-white/50 to-slate-50/30 dark:from-slate-800/50 dark:to-slate-900/30 hover:border-primary/30 transition-all duration-300 group"
    style={{ animationDelay: `${index * 100}ms` }}
  >
    <div className="h-8 w-8 rounded-full bg-primary/15 text-primary font-bold text-sm flex items-center justify-center ring-2 ring-primary/20 group-hover:ring-primary/40 group-hover:bg-primary/25 transition-all duration-300 flex-shrink-0">
      {number}
    </div>
    <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 group-hover:text-slate-800 dark:group-hover:text-slate-200 transition-colors">{children}</p>
  </li>
);

// CSS to JSX mapping component
// @ts-ignore
// @ts-ignore
const CSSMapping = ({ css, jsx, index = 0 }) => (
  <div
    className="flex items-center justify-between p-4 rounded-xl border-2 border-slate-200/30 dark:border-slate-700/30 bg-gradient-to-r from-slate-50/50 to-white/50 dark:from-slate-800/50 dark:to-slate-900/50 hover:border-primary/20 transition-all duration-300 group"
    style={{ animationDelay: `${index * 50}ms` }}
  >
    <code className="text-sm bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300 px-3 py-2 rounded-lg font-mono font-medium">
      {css}
    </code>
    <ChevronRight className="h-5 w-5 text-slate-400 group-hover:text-primary transition-colors" />
    <code className="text-sm bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 px-3 py-2 rounded-lg font-mono font-medium">
      {jsx}
    </code>
  </div>
);

// Main component
export default function JSXPage() {
  // Basic data
  const name = "Người dùng";
  const element = <h1 className="text-xl font-bold">Xin chào, {name}</h1>;
  const listItems = ["Components", "Props", "State", "Hooks", "Context", "Effects"];
  const isLoggedIn = true;

  // Code examples with varying complexity
  const codeExampleBasic = `const element = <h1>Xin chào, thế giới!</h1>;`;

  const codeExampleExpression = `const name = "Người dùng";
const age = 25;
const isActive = true;

const element = (
  <div className="user-card">
    <h1>Xin chào, {name}!</h1>
    <p>Tuổi: {age}</p>
    <span className={isActive ? "active" : "inactive"}>
      {isActive ? "Đang hoạt động" : "Không hoạt động"}
    </span>
  </div>
);`;

  const codeExampleAttributes = `const UserAvatar = ({ user, size = "medium" }) => {
  const sizeClass = size === "large" ? "w-32 h-32" : "w-16 h-16";
  
  return (
    <img 
      src={user.avatar} 
      className={\`\${sizeClass} rounded-full border-2 border-white shadow-lg\`}
      alt={\`Avatar của \${user.name}\`}
      loading="lazy"
      onError={(e) => {
        e.target.src = "/default-avatar.png";
      }}
    />
  );
};`;

  const codeExampleLists = `const skills = [
  { id: 1, name: "React", level: "Expert", color: "blue" },
  { id: 2, name: "JavaScript", level: "Advanced", color: "yellow" },
  { id: 3, name: "TypeScript", level: "Intermediate", color: "blue" },
  { id: 4, name: "Node.js", level: "Advanced", color: "green" }
];

const SkillsList = () => (
  <div className="grid gap-4 md:grid-cols-2">
    {skills.map(skill => (
      <div 
        key={skill.id}
        className={\`p-4 rounded-lg border-l-4 border-\${skill.color}-500 bg-\${skill.color}-50\`}
      >
        <h3 className="font-bold text-lg">{skill.name}</h3>
        <p className="text-sm text-gray-600">{skill.level}</p>
        <div className={\`mt-2 h-2 bg-\${skill.color}-200 rounded-full\`}>
          <div 
            className={\`h-full bg-\${skill.color}-500 rounded-full transition-all duration-500\`}
            style={{ width: skill.level === "Expert" ? "90%" : "70%" }}
          />
        </div>
      </div>
    ))}
  </div>
);`;

  const codeExampleConditions = `const Dashboard = ({ user, notifications, isLoading }) => {
  // Nested conditional rendering
  const renderUserStatus = () => {
    if (isLoading) {
      return <div className="animate-pulse">Đang tải...</div>;
    }
    
    if (!user) {
      return <div className="text-red-600">Vui lòng đăng nhập</div>;
    }
    
    return (
      <div className="flex items-center gap-3">
        <div className={\`w-3 h-3 rounded-full \${user.isOnline ? "bg-green-500 animate-pulse" : "bg-gray-400"}\`} />
        <span>{user.isOnline ? "Đang trực tuyến" : "Ngoại tuyến"}</span>
      </div>
    );
  };

  return (
    <div className="dashboard p-6 bg-white rounded-lg shadow-lg">
      <header className="mb-6">
        <h1 className="text-2xl font-bold">Dashboard</h1>
        {renderUserStatus()}
      </header>

      {/* Conditional sections */}
      {user?.role === "admin" && (
        <section className="mb-6 p-4 bg-blue-50 rounded-lg">
          <h2 className="font-semibold text-blue-800">Quản trị viên</h2>
          <p className="text-sm text-blue-600">Bạn có quyền truy cập đầy đủ</p>
        </section>
      )}

      {notifications?.length > 0 ? (
        <div className="notifications">
          <h3 className="font-medium mb-3">
            Thông báo ({notifications.length})
          </h3>
          {notifications.map(notif => (
            <div key={notif.id} className="p-3 mb-2 bg-yellow-50 border-l-4 border-yellow-400">
              {notif.message}
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-500 text-center py-8">
          Không có thông báo mới
        </p>
      )}
    </div>
  );
};`;

  const codeExampleInlineStyle = `const StyledButton = ({ variant = "primary", size = "medium", children, ...props }) => {
  const baseStyle = {
    padding: size === "large" ? "16px 32px" : "12px 24px",
    borderRadius: "8px",
    border: "none",
    fontWeight: "600",
    cursor: "pointer",
    transition: "all 0.2s ease",
    fontSize: size === "large" ? "16px" : "14px",
    display: "inline-flex",
    alignItems: "center",
    gap: "8px"
  };

  const variantStyles = {
    primary: {
      backgroundColor: "#3b82f6",
      color: "white",
      boxShadow: "0 4px 12px rgba(59, 130, 246, 0.3)"
    },
    secondary: {
      backgroundColor: "#f1f5f9",
      color: "#334155",
      border: "2px solid #e2e8f0"
    },
    danger: {
      backgroundColor: "#ef4444",
      color: "white",
      boxShadow: "0 4px 12px rgba(239, 68, 68, 0.3)"
    }
  };

  const hoverStyles = {
    primary: { backgroundColor: "#2563eb", transform: "translateY(-1px)" },
    secondary: { backgroundColor: "#e2e8f0", transform: "translateY(-1px)" },
    danger: { backgroundColor: "#dc2626", transform: "translateY(-1px)" }
  };

  const [isHovered, setIsHovered] = useState(false);

  const finalStyle = {
    ...baseStyle,
    ...variantStyles[variant],
    ...(isHovered ? hoverStyles[variant] : {})
  };

  return (
    <button
      style={finalStyle}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      {...props}
    >
      {children}
    </button>
  );
};`;

  const codeExampleFragmentFull = `import React from 'react';

const UserProfile = ({ user, showActions = true, showBadges = true }) => {
  const formatJoinDate = (date) => {
    return new Date(date).toLocaleDateString('vi-VN', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <React.Fragment>
      {/* User Avatar & Basic Info */}
      <div className="flex items-center gap-4 mb-6">
        <img 
          src={user.avatar || "/default-avatar.png"}
          alt={user.name}
          className="w-24 h-24 rounded-full border-4 border-white shadow-lg"
        />
        <div>
          <h2 className="text-2xl font-bold text-slate-800">{user.name}</h2>
          <p className="text-slate-600">{user.email}</p>
          <p className="text-sm text-slate-500">
            Tham gia từ {formatJoinDate(user.joinDate)}
          </p>
        </div>
      </div>

      {/* Status Badges */}
      {showBadges && (
        <div className="flex gap-2 mb-4">
          <span className={\`px-3 py-1 rounded-full text-xs font-medium \${
            user.isVerified 
              ? "bg-green-100 text-green-800" 
              : "bg-gray-100 text-gray-800"
          }\`}>
            {user.isVerified ? "✓ Đã xác minh" : "Chưa xác minh"}
          </span>
          <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-medium">
            {user.role}
          </span>
          {user.isPremium && (
            <span className="px-3 py-1 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-full text-xs font-medium">
              ⭐ Premium
            </span>
          )}
        </div>
      )}

      {/* Bio Section */}
      {user.bio && (
        <div className="mb-6 p-4 bg-slate-50 rounded-lg">
          <h3 className="font-semibold text-slate-700 mb-2">Giới thiệu</h3>
          <p className="text-slate-600 leading-relaxed">{user.bio}</p>
        </div>
      )}

      {/* Action Buttons */}
      {showActions && (
        <div className="flex gap-3">
          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
            Gửi tin nhắn
          </button>
          <button className="px-4 py-2 border border-slate-300 text-slate-700 rounded-lg hover:bg-slate-50 transition-colors">
            Theo dõi
          </button>
        </div>
      )}
    </React.Fragment>
  );
};`;

  const codeExampleFragmentShort = `const Navigation = ({ items, currentPath, onNavigate }) => {
  const isActive = (path) => currentPath === path;
  
  return (
    <>
      {/* Main Navigation */}
      <nav className="flex items-center justify-between p-4 bg-white shadow-sm border-b">
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">L</span>
            </div>
            <span className="font-bold text-xl text-slate-800">LogoApp</span>
          </div>
          
          <div className="hidden md:flex space-x-1">
            {items.map(item => (
              <button
                key={item.id}
                onClick={() => onNavigate(item.href)}
                className={\`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 \${
                  isActive(item.href)
                    ? "bg-blue-100 text-blue-700 shadow-sm"
                    : "text-slate-600 hover:text-blue-600 hover:bg-slate-50"
                }\`}
              >
                {item.icon && <item.icon className="w-4 h-4 mr-2 inline" />}
                {item.label}
              </button>
            ))}
          </div>
        </div>

        {/* User Menu */}
        <div className="flex items-center gap-3">
          <button className="p-2 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-50">
            <Bell className="w-5 h-5" />
          </button>
          <button className="flex items-center gap-2 p-2 rounded-lg hover:bg-slate-50">
            <img src="/user-avatar.jpg" className="w-8 h-8 rounded-full" alt="User" />
            <ChevronDown className="w-4 h-4 text-slate-400" />
          </button>
        </div>
      </nav>

      {/* Mobile Navigation Indicator */}
      <div className="md:hidden border-b border-slate-200">
        <div className="px-4 py-2 text-sm text-slate-500">
          Điều hướng di động • {items.find(item => isActive(item.href))?.label}
        </div>
      </div>
    </>
  );
};`;

  // CSS to JSX mapping
  const cssToJsx = [
    { css: "background-color", jsx: "backgroundColor" },
    { css: "font-size", jsx: "fontSize" },
    { css: "border-radius", jsx: "borderRadius" },
    { css: "margin-top", jsx: "marginTop" },
    { css: "padding-left", jsx: "paddingLeft" },
    { css: "text-align", jsx: "textAlign" },
    { css: "box-shadow", jsx: "boxShadow" },
    { css: "z-index", jsx: "zIndex" },
    { css: "font-weight", jsx: "fontWeight" },
    { css: "line-height", jsx: "lineHeight" }
  ];

  // JSX rules
  const jsxRules = [
    "Phải có một phần tử gốc duy nhất hoặc sử dụng React.Fragment (<> </>)",
    "Đóng tất cả các thẻ, kể cả self-closing tags như <img />, <br />",
    "Thuộc tính 'class' phải được viết thành 'className'",
    "Thuộc tính 'for' phải được viết thành 'htmlFor'",
    "Sử dụng camelCase cho tất cả thuộc tính HTML (onClick, onMouseOver)",
    "Biểu thức JavaScript phải nằm trong ngoặc nhọn {}",
    "Style inline phải là object JavaScript, không phải string",
    "Tất cả thuộc tính boolean phải được viết đầy đủ hoặc sử dụng {true/false}"
  ];

  // Benefits of JSX with enhanced descriptions
  const jsxBenefits = [
    {
      title: "Cú pháp trực quan",
      desc: "Kết hợp HTML và JavaScript một cách tự nhiên, làm cho code dễ đọc và hiểu hơn cho developers",
      icon: Eye
    },
    {
      title: "Type Safety",
      desc: "Kiểm tra lỗi tại thời điểm compile với TypeScript, giảm thiểu bugs và tăng độ tin cậy",
      icon: Shield
    },
    {
      title: "Developer Experience",
      desc: "IntelliSense tốt hơn, auto-completion, refactoring tools và debugging experience được cải thiện",
      icon: Code
    },
    {
      title: "Component Reusability",
      desc: "Dễ dàng tái sử dụng và compose các UI components, tạo ra kiến trúc modular",
      icon: Layers
    },
    {
      title: "Performance Optimization",
      desc: "Tối ưu hóa tự động thông qua Virtual DOM diffing và tree shaking",
      icon: Cpu
    },
    {
      title: "Ecosystem Integration",
      desc: "Tích hợp mượt mà với các tools như Babel, Webpack, và build systems hiện đại",
      icon: Terminal
    }
  ];

  return (
    <div className="bg-gradient-to-br from-slate-50 via-slate-100 to-blue-50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 min-h-screen">
      <div className="container mx-auto py-20 px-4 max-w-6xl">
        {/* Enhanced Header */}
        <header className="text-center mb-20 animate-in fade-in slide-in-from-top-4 duration-1000">
          <Badge className="mb-8 px-6 py-3 bg-primary/10 text-primary border-primary/20 rounded-full text-sm font-semibold tracking-wide shadow-lg">
            <Sparkles className="w-4 h-4 mr-2" />
            React Fundamentals
          </Badge>

          <h1 className="text-6xl md:text-7xl font-black mt-6 mb-8 bg-gradient-to-r from-primary via-blue-600 to-purple-600 bg-clip-text text-transparent">
            Mastering JSX
          </h1>

          <p className="text-xl md:text-2xl text-slate-600 dark:text-slate-300 max-w-4xl mx-auto leading-relaxed">
            Khám phá sức mạnh của JSX - cú pháp mở rộng JavaScript giúp xây dựng UI React một cách trực quan, hiệu quả và mạnh mẽ
          </p>

          <Separator className="my-12 max-w-lg mx-auto opacity-30" />
        </header>

        {/* Enhanced Introduction Card */}
        <EnhancedCard className="mb-20 overflow-hidden animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-200">
          <EnhancedCardHeader>
            <div className="flex items-center gap-5">
              <div className="h-16 w-16 rounded-3xl bg-primary/15 flex items-center justify-center ring-4 ring-primary/10">
                <FileCode className="h-8 w-8 text-primary" />
              </div>
              <div>
                <CardTitle className="text-3xl font-bold">JSX Là Gì?</CardTitle>
                <CardDescription className="text-slate-500 dark:text-slate-400 text-lg mt-2">
                  JavaScript XML - Cú pháp mở rộng mạnh mẽ cho JavaScript
                </CardDescription>
              </div>
            </div>
          </EnhancedCardHeader>

          <CardContent className="pt-10 pb-8 px-8 space-y-8">
            <p className="text-slate-700 dark:text-slate-300 leading-relaxed text-lg">
              JSX (JavaScript XML) là một extension syntax cho JavaScript được phát triển bởi Facebook.
              Nó cho phép chúng ta viết markup giống HTML trực tiếp trong JavaScript,
              tạo ra một cách thức trực quan và mạnh mẽ để mô tả giao diện người dùng một cách declarative.
            </p>

            <CodeBlock codeString={codeExampleBasic} />

            <div className="flex items-start p-8 rounded-3xl border-l-4 border-primary/60 bg-gradient-to-r from-primary/5 to-primary/8 backdrop-blur-sm">
              <Info className="h-6 w-6 text-primary mt-1 mr-5 flex-shrink-0" />
              <div className="space-y-3">
                <h4 className="font-semibold text-slate-800 dark:text-slate-200">Lưu ý quan trọng</h4>
                <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300">
                  JSX không phải là HTML thuần túy. Nó được transpile thành các lệnh gọi hàm JavaScript
                  (<code className="bg-slate-100 dark:bg-slate-700 px-2 py-1 rounded text-xs">React.createElement()</code>)
                  thông qua các công cụ như Babel. Điều này cho phép React tối ưu hóa performance thông qua Virtual DOM
                  và cung cấp các tính năng mạnh mẽ như hot reloading và tree shaking.
                </p>
              </div>
            </div>
          </CardContent>
        </EnhancedCard>

        {/* Enhanced Examples Section */}
        <section className="mb-20 animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-400">
          <div className="flex items-center gap-4 mb-10">
            <div className="h-16 w-16 rounded-3xl bg-primary/15 flex items-center justify-center ring-4 ring-primary/10">
              <Code className="h-8 w-8 text-primary" />
            </div>
            <h2 className="text-4xl font-bold bg-gradient-to-r from-slate-800 to-slate-600 dark:from-slate-200 dark:to-slate-400 bg-clip-text text-transparent">
              Các Ví Dụ Thực Tế
            </h2>
          </div>

          <Tabs defaultValue="expressions" className="mt-8">
            <TabsList className="grid grid-cols-2 md:grid-cols-4 p-1.5 bg-slate-100/80 dark:bg-slate-800/80 backdrop-blur-sm rounded-2xl">
              <TabsTrigger value="expressions" className="rounded-xl data-[state=active]:bg-white dark:data-[state=active]:bg-slate-700 transition-all font-medium">
                Biểu Thức
              </TabsTrigger>
              <TabsTrigger value="attributes" className="rounded-xl data-[state=active]:bg-white dark:data-[state=active]:bg-slate-700 transition-all font-medium">
                Thuộc Tính
              </TabsTrigger>
              <TabsTrigger value="lists" className="rounded-xl data-[state=active]:bg-white dark:data-[state=active]:bg-slate-700 transition-all font-medium">
                Danh Sách
              </TabsTrigger>
              <TabsTrigger value="conditions" className="rounded-xl data-[state=active]:bg-white dark:data-[state=active]:bg-slate-700 transition-all font-medium">
                Điều Kiện
              </TabsTrigger>
            </TabsList>

            <TabsContent value="expressions" className="mt-10">
              <EnhancedCard className="overflow-hidden">
                <EnhancedCardHeader>
                  <CardTitle className="text-2xl font-bold">Biểu thức JavaScript trong JSX</CardTitle>
                  <CardDescription className="text-base">
                    Sử dụng ngoặc nhọn {} để nhúng biểu thức JavaScript phức tạp vào trong JSX
                  </CardDescription>
                </EnhancedCardHeader>
                <CardContent className="space-y-6 p-8">
                  <CodeBlock codeString={codeExampleExpression} />
                  <ResultPreview title="Demo component tương tác">
                    <div className="p-6 bg-gradient-to-br from-blue-50 to-purple-50 dark:from-slate-700 dark:to-slate-800 rounded-2xl space-y-4">
                      <h1 className="text-2xl font-bold text-slate-800 dark:text-slate-200">Xin chào, {name}!</h1>
                      <p className="text-slate-600 dark:text-slate-400">Tuổi: 25</p>
                      <span className="inline-flex items-center gap-2 px-3 py-1 bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300 rounded-full text-sm font-medium">
                        <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                        Đang hoạt động
                      </span>
                    </div>
                  </ResultPreview>
                </CardContent>
              </EnhancedCard>
            </TabsContent>

            <TabsContent value="attributes" className="mt-10">
              <EnhancedCard className="overflow-hidden">
                <EnhancedCardHeader>
                  <CardTitle className="text-2xl font-bold">Thuộc tính động trong JSX</CardTitle>
                  <CardDescription className="text-base">
                    Sử dụng props và state để tạo thuộc tính động với logic phức tạp
                  </CardDescription>
                </EnhancedCardHeader>
                <CardContent className="space-y-6 p-8">
                  <CodeBlock codeString={codeExampleAttributes} />
                  <ResultPreview title="Avatar component responsive">
                    <div className="flex items-center gap-6 p-6 bg-gradient-to-br from-slate-100 to-slate-200 dark:from-slate-700 dark:to-slate-800 rounded-2xl">
                      <img
                        src="https://via.placeholder.com/128/3b82f6/ffffff?text=User"
                        className="w-32 h-32 rounded-full border-4 border-white shadow-lg"
                        alt="Avatar của User"
                      />
                      <div className="space-y-2">
                        <h3 className="text-xl font-bold text-slate-800 dark:text-slate-200">Large Avatar</h3>
                        <p className="text-slate-600 dark:text-slate-400">Kích thước: 128x128px</p>
                        <p className="text-sm text-slate-500 dark:text-slate-500">Lazy loading & error handling</p>
                      </div>
                    </div>
                  </ResultPreview>
                </CardContent>
              </EnhancedCard>
            </TabsContent>

            <TabsContent value="lists" className="mt-10">
              <EnhancedCard className="overflow-hidden">
                <EnhancedCardHeader>
                  <CardTitle className="text-2xl font-bold">Render danh sách phức tạp</CardTitle>
                  <CardDescription className="text-base">
                    Map qua arrays để tạo các UI components với styling động
                  </CardDescription>
                </EnhancedCardHeader>
                <CardContent className="space-y-6 p-8">
                  <CodeBlock codeString={codeExampleLists} />
                  <ResultPreview title="Skills dashboard">
                    <div className="grid gap-4 md:grid-cols-2">
                      {[
                        { name: "React", level: "Expert", color: "blue" },
                        { name: "JavaScript", level: "Advanced", color: "yellow" },
                        { name: "TypeScript", level: "Intermediate", color: "blue" },
                        { name: "Node.js", level: "Advanced", color: "green" }
                      ].map((skill, index) => (
                        <div
                          key={index}
                          className={`p-4 rounded-lg border-l-4 border-${skill.color}-500 bg-${skill.color === 'yellow' ? 'yellow' : skill.color}-50 dark:bg-${skill.color}-900/20`}
                        >
                          <h3 className="font-bold text-lg text-slate-800 dark:text-slate-200">{skill.name}</h3>
                          <p className="text-sm text-slate-600 dark:text-slate-400">{skill.level}</p>
                          <div className="mt-2 h-2 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
                            <div
                              className={`h-full bg-${skill.color}-500 rounded-full transition-all duration-500`}
                              style={{ width: skill.level === "Expert" ? "90%" : skill.level === "Advanced" ? "75%" : "60%" }}
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </ResultPreview>
                </CardContent>
              </EnhancedCard>
            </TabsContent>

            <TabsContent value="conditions" className="mt-10">
              <EnhancedCard className="overflow-hidden">
                <EnhancedCardHeader>
                  <CardTitle className="text-2xl font-bold">Conditional Rendering nâng cao</CardTitle>
                  <CardDescription className="text-base">
                    Render có điều kiện phức tạp với nested logic và multiple states
                  </CardDescription>
                </EnhancedCardHeader>
                <CardContent className="space-y-6 p-8">
                  <CodeBlock codeString={codeExampleConditions} />
                  <ResultPreview title="Dashboard tương tác">
                    <div className="space-y-6 p-6 bg-white dark:bg-slate-800 rounded-2xl shadow-lg">
                      <header className="mb-6">
                        <h1 className="text-2xl font-bold text-slate-800 dark:text-slate-200">Dashboard</h1>
                        <div className="flex items-center gap-3 mt-2">
                          <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                          <span className="text-slate-600 dark:text-slate-400">Đang trực tuyến</span>
                        </div>
                      </header>

                      <section className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border-l-4 border-blue-500">
                        <h2 className="font-semibold text-blue-800 dark:text-blue-300">Quản trị viên</h2>
                        <p className="text-sm text-blue-600 dark:text-blue-400">Bạn có quyền truy cập đầy đủ hệ thống</p>
                      </section>

                      <div className="space-y-3">
                        <h3 className="font-medium text-slate-700 dark:text-slate-300">Thông báo (3)</h3>
                        {[
                          "Hệ thống sẽ bảo trì vào 2:00 AM",
                          "Bạn có 5 tin nhắn mới",
                          "Cập nhật bảo mật đã hoàn thành"
                        ].map((message, index) => (
                          <div key={index} className="p-3 bg-yellow-50 dark:bg-yellow-900/20 border-l-4 border-yellow-400 rounded">
                            <p className="text-sm text-yellow-800 dark:text-yellow-300">{message}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </ResultPreview>
                </CardContent>
              </EnhancedCard>
            </TabsContent>
          </Tabs>
        </section>

        {/* Enhanced Rules and Styles Grid */}
        <div className="grid gap-10 lg:grid-cols-2 mb-20 animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-600">
          <EnhancedCard className="overflow-hidden">
            <EnhancedCardHeader>
              <div className="flex items-center gap-5">
                <div className="h-14 w-14 rounded-2xl bg-primary/15 flex items-center justify-center ring-4 ring-primary/10">
                  <ListChecks className="h-7 w-7 text-primary" />
                </div>
                <div>
                  <CardTitle className="text-2xl font-bold">Quy tắc JSX</CardTitle>
                  <CardDescription className="text-base">
                    Những nguyên tắc cần tuân thủ khi viết JSX
                  </CardDescription>
                </div>
              </div>
            </EnhancedCardHeader>
            <CardContent className="p-8">
              <ul className="space-y-4">
                {jsxRules.map((rule, index) => (
                  <RuleItem key={index} number={index + 1} index={index}>
                    {rule}
                  </RuleItem>
                ))}
              </ul>
            </CardContent>
          </EnhancedCard>

          <EnhancedCard className="overflow-hidden">
            <EnhancedCardHeader>
              <div className="flex items-center gap-5">
                <div className="h-14 w-14 rounded-2xl bg-primary/15 flex items-center justify-center ring-4 ring-primary/10">
                  <Palette className="h-7 w-7 text-primary" />
                </div>
                <div>
                  <CardTitle className="text-2xl font-bold">CSS → JSX Mapping</CardTitle>
                  <CardDescription className="text-base">
                    Chuyển đổi CSS properties sang JSX style objects
                  </CardDescription>
                </div>
              </div>
            </EnhancedCardHeader>
            <CardContent className="p-8 space-y-6">
              <div className="space-y-3">
                {cssToJsx.map((attr, index) => (
                  <CSSMapping key={index} css={attr.css} jsx={attr.jsx} index={index} />
                ))}
              </div>
              <div className="mt-6 p-5 bg-slate-50 dark:bg-slate-700/50 rounded-xl">
                <h4 className="font-semibold text-slate-800 dark:text-slate-200 mb-3">Ví dụ Style Object:</h4>
                <CodeBlock codeString={`const styles = {
  backgroundColor: "#f1f5f9",
  fontSize: "16px",
  borderRadius: "8px",
  marginTop: "20px"
};`} language="javascript" />
              </div>
            </CardContent>
          </EnhancedCard>
        </div>

        {/* Enhanced Inline Styles Section */}
        <EnhancedCard className="mb-20 overflow-hidden animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-800">
          <EnhancedCardHeader>
            <div className="flex items-center gap-5">
              <div className="h-14 w-14 rounded-2xl bg-primary/15 flex items-center justify-center ring-4 ring-primary/10">
                <Palette className="h-7 w-7 text-primary" />
              </div>
              <div>
                <CardTitle className="text-2xl font-bold">Inline Styles Nâng Cao</CardTitle>
                <CardDescription className="text-base">
                  Tạo styled components với JavaScript objects và dynamic styling
                </CardDescription>
              </div>
            </div>
          </EnhancedCardHeader>
          <CardContent className="space-y-6 p-8">
            <CodeBlock codeString={codeExampleInlineStyle} />
            <ResultPreview title="Interactive styled button">
              <div className="flex gap-4 items-center justify-center p-6">
                <button
                  style={{
                    backgroundColor: "#3b82f6",
                    color: "white",
                    padding: "12px 24px",
                    borderRadius: "8px",
                    border: "none",
                    fontWeight: "600",
                    cursor: "pointer",
                    boxShadow: "0 4px 12px rgba(59, 130, 246, 0.3)"
                  }}
                  className="transition-all duration-200 hover:translate-y-[-1px] hover:shadow-lg"
                >
                  Primary Button
                </button>
                <button
                  style={{
                    backgroundColor: "#f1f5f9",
                    color: "#334155",
                    padding: "12px 24px",
                    borderRadius: "8px",
                    border: "2px solid #e2e8f0",
                    fontWeight: "600",
                    cursor: "pointer"
                  }}
                  className="transition-all duration-200 hover:translate-y-[-1px] hover:bg-slate-200"
                >
                  Secondary Button
                </button>
                <button
                  style={{
                    backgroundColor: "#ef4444",
                    color: "white",
                    padding: "12px 24px",
                    borderRadius: "8px",
                    border: "none",
                    fontWeight: "600",
                    cursor: "pointer",
                    boxShadow: "0 4px 12px rgba(239, 68, 68, 0.3)"
                  }}
                  className="transition-all duration-200 hover:translate-y-[-1px] hover:shadow-lg"
                >
                  Danger Button
                </button>
              </div>
            </ResultPreview>
          </CardContent>
        </EnhancedCard>

        {/* Enhanced Fragments Section */}
        <EnhancedCard className="mb-20 overflow-hidden animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-1000">
          <EnhancedCardHeader>
            <div className="flex items-center gap-5">
              <div className="h-14 w-14 rounded-2xl bg-primary/15 flex items-center justify-center ring-4 ring-primary/10">
                <Layers className="h-7 w-7 text-primary" />
              </div>
              <div>
                <CardTitle className="text-2xl font-bold">React Fragments</CardTitle>
                <CardDescription className="text-base">
                  Nhóm nhiều elements mà không tạo thêm DOM nodes
                </CardDescription>
              </div>
            </div>
          </EnhancedCardHeader>
          <CardContent className="space-y-6 p-8">
            <div className="prose prose-slate dark:prose-invert max-w-none">
              <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
                React Fragments cho phép bạn return multiple elements từ một component mà không cần wrapper div.
                Điều này giúp giữ DOM tree sạch sẽ và tránh các vấn đề về CSS layout.
              </p>
            </div>

            <Tabs defaultValue="full" className="w-full">
              <TabsList className="grid w-full grid-cols-2 h-auto bg-slate-100/50 dark:bg-slate-800/50 p-1 rounded-xl">
                <TabsTrigger
                  value="full"
                  className="py-3 data-[state=active]:bg-white dark:data-[state=active]:bg-slate-900 data-[state=active]:text-primary rounded-lg font-medium"
                >
                  React.Fragment
                </TabsTrigger>
                <TabsTrigger
                  value="short"
                  className="py-3 data-[state=active]:bg-white dark:data-[state=active]:bg-slate-900 data-[state=active]:text-primary rounded-lg font-medium"
                >
                  Short Syntax
                </TabsTrigger>
              </TabsList>
              <div className="mt-6">
                <TabsContent value="full" className="m-0">
                  <CodeBlock codeString={codeExampleFragmentFull} />
                </TabsContent>
                <TabsContent value="short" className="m-0">
                  <CodeBlock codeString={codeExampleFragmentShort} />
                </TabsContent>
              </div>
            </Tabs>

            <div className="mt-6 p-6 bg-blue-50 dark:bg-blue-900/20 rounded-xl border-l-4 border-blue-500">
              <div className="flex items-start gap-3">
                <Lightbulb className="h-5 w-5 text-blue-600 dark:text-blue-400 mt-0.5 flex-shrink-0" />
                <div>
                  <h4 className="font-semibold text-blue-800 dark:text-blue-200 mb-2">Khi nào sử dụng Fragments?</h4>
                  <ul className="text-sm text-blue-700 dark:text-blue-300 space-y-1">
                    <li>• Khi return multiple elements từ component</li>
                    <li>• Tránh wrapper divs không cần thiết</li>
                    <li>• Giữ CSS Grid/Flexbox layout đúng cấu trúc</li>
                    <li>• Cải thiện semantic HTML</li>
                  </ul>
                </div>
              </div>
            </div>
          </CardContent>
        </EnhancedCard>

        {/* Enhanced Benefits Section */}
        <div className="space-y-10 animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-1200">
          <div className="flex items-center gap-4 mb-8">
            <div className="h-16 w-16 rounded-3xl bg-primary/15 flex items-center justify-center ring-4 ring-primary/10">
              <Lightbulb className="h-8 w-8 text-primary" />
            </div>
            <h2 className="text-4xl font-bold bg-gradient-to-r from-slate-800 to-slate-600 dark:from-slate-200 dark:to-slate-400 bg-clip-text text-transparent">
              Lợi Ích Của JSX
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {jsxBenefits.map((benefit, index) => (
              <FeatureCard
                key={index}
                icon={benefit.icon}
                title={benefit.title}
                index={index}
              >
                {benefit.desc}
              </FeatureCard>
            ))}
          </div>
        </div>

        {/* Enhanced Footer */}
        <div className="mt-24 text-center space-y-8 animate-in fade-in duration-1000 delay-1400">
          <div className="p-8 bg-gradient-to-br from-primary/5 to-primary/10 rounded-3xl border-2 border-primary/20">
            <h3 className="text-2xl font-bold text-slate-800 dark:text-slate-200 mb-4">
              Tổng Kết
            </h3>
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed max-w-3xl mx-auto">
              JSX là một công cụ mạnh mẽ giúp developers React viết code một cách trực quan và hiệu quả.
              Với khả năng kết hợp JavaScript và HTML-like syntax, JSX không chỉ cải thiện developer experience
              mà còn tạo ra foundation vững chắc cho việc xây dựng các ứng dụng React phức tạp và scalable.
            </p>
          </div>

          <div className="flex items-center justify-center gap-6 flex-wrap">
            <Badge variant="outline" className="text-sm px-4 py-2 bg-blue-50 dark:bg-blue-950/30 border-blue-200 dark:border-blue-800 text-blue-700 dark:text-blue-300">
              <Code className="w-4 h-4 mr-2" />
              React
            </Badge>
            <Badge variant="outline" className="text-sm px-4 py-2 bg-purple-50 dark:bg-purple-950/30 border-purple-200 dark:border-purple-800 text-purple-700 dark:text-purple-300">
              <FileCode className="w-4 h-4 mr-2" />
              JSX
            </Badge>
            <Badge variant="outline" className="text-sm px-4 py-2 bg-green-50 dark:bg-green-950/30 border-green-200 dark:border-green-800 text-green-700 dark:text-green-300">
              <Terminal className="w-4 h-4 mr-2" />
              JavaScript
            </Badge>
            <Badge variant="outline" className="text-sm px-4 py-2 bg-orange-50 dark:bg-orange-950/30 border-orange-200 dark:border-orange-800 text-orange-700 dark:text-orange-300">
              <BookOpen className="w-4 h-4 mr-2" />
              Tutorial
            </Badge>
          </div>

          <p className="text-slate-500 dark:text-slate-400 max-w-2xl mx-auto text-sm">
            Bài viết này cung cấp một cái nhìn toàn diện về JSX, từ các khái niệm cơ bản đến những pattern nâng cao.
            Hãy thực hành với các ví dụ để master JSX trong React development của bạn.
          </p>
        </div>
      </div>
    </div>
  );
}