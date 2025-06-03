'use client';

import React, { useState, useEffect } from 'react';

export default function Header() {
  const [darkMode, setDarkMode] = useState(false);
  const [mounted, setMounted] = useState(false);

  // Load theme from localStorage on mount
  useEffect(() => {
    setMounted(true);
    const savedTheme = localStorage.getItem('theme');
    const isDark = savedTheme === 'true';

    setDarkMode(isDark);

    // Apply theme immediately
    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, []);

  // Toggle dark mode
  const toggleDarkMode = () => {
    const newState = !darkMode;
    setDarkMode(newState);
    localStorage.setItem('theme', String(newState));

    if (newState) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  };

  // Prevent hydration mismatch
  if (!mounted) {
    return (
      <header className="flex items-center justify-between p-6 bg-white dark:bg-gray-900 border-b transition-colors">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">useState Example</h1>
        <div className="flex items-center gap-3">
          <span className="text-sm text-gray-600 dark:text-gray-400">Dark Mode</span>
          <div className="w-11 h-6 bg-gray-200 rounded-full opacity-50"></div>
        </div>
      </header>
    );
  }

  return (
    <header className="flex items-center justify-between p-6 bg-white dark:bg-gray-900 border-b transition-colors duration-300">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">useState Example</h1>
        <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
          Testing React useState hook with dark mode toggle
        </p>
      </div>

      <div className="flex items-center gap-4">
        <span className="text-sm font-medium text-gray-600 dark:text-gray-400">
          {darkMode ? '🌙 Dark' : '☀️ Light'}
        </span>

        {/* Custom Toggle Switch */}
        <button
          onClick={toggleDarkMode}
          className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
            darkMode ? 'bg-blue-600' : 'bg-gray-300 border border-gray-400'
          }`}
          aria-pressed={darkMode}
          aria-label="Toggle dark mode"
        >
          <span
            className={`inline-block h-4 w-4 transform rounded-full bg-white shadow-lg transition-transform duration-200 ${
              darkMode ? 'translate-x-6' : 'translate-x-1'
            }`}
          />
        </button>

        {/* Status indicator */}
        <div className="flex items-center gap-2">
          <div
            className={`w-2 h-2 rounded-full ${darkMode ? 'bg-blue-500' : 'bg-yellow-500'}`}
          ></div>
          <span className="text-xs text-gray-500 dark:text-gray-400">
            {darkMode ? 'Dark mode active' : 'Light mode active'}
          </span>
        </div>
      </div>
    </header>
  );
}
