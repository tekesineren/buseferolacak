'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useScrollHeader } from '@/hooks/useScrollHeader';
import Navigation from './Navigation';

export default function Header() {
  const { isScrolled, isHidden } = useScrollHeader(50, 100);
  const [isMac, setIsMac] = useState(false);

  useEffect(() => {
    setIsMac(navigator.platform.toUpperCase().indexOf('MAC') >= 0);
  }, []);

  const handleSearchKeydown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      (e.target as HTMLInputElement).blur();
    }
  };

  useEffect(() => {
    const handleKeydown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        const searchInput = document.getElementById('global-search');
        searchInput?.focus();
      }
    };

    window.addEventListener('keydown', handleKeydown);
    return () => window.removeEventListener('keydown', handleKeydown);
  }, []);

  return (
    <>
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[1001] focus:px-4 focus:py-2 focus:bg-indigo-600 focus:text-white focus:rounded-md"
      >
        Skip to main content
      </a>

      <header
        className={`
          fixed top-0 left-0 right-0 z-[1000]
          transition-all duration-300 ease-[cubic-bezier(0.4,0,0.2,1)]
          motion-reduce:transition-none
          ${isScrolled
            ? 'bg-white/95 backdrop-blur-[10px] shadow-[0_2px_15px_rgba(0,0,0,0.1)] py-[15px] px-[50px]'
            : 'bg-transparent py-[25px] px-[50px]'
          }
          ${isHidden ? '-translate-y-full' : 'translate-y-0'}
        `}
        role="banner"
      >
        <div className="max-w-[1440px] mx-auto">
          <div className="flex items-center justify-between gap-8">
            <div className="flex items-center gap-3 flex-shrink-0">
              <Link
                href="/"
                className="flex items-center gap-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 rounded-lg"
                aria-label="Ventora - Go to homepage"
              >
                <div
                  className={`
                    bg-gradient-to-br from-indigo-600 to-purple-600 rounded-xl flex items-center justify-center
                    transition-all duration-300 motion-reduce:transition-none
                    ${isScrolled ? 'w-8 h-8' : 'w-10 h-10'}
                  `}
                >
                  <span className={`text-white font-bold ${isScrolled ? 'text-lg' : 'text-xl'}`}>V</span>
                </div>
                <span className={`font-bold text-gray-900 transition-all duration-300 motion-reduce:transition-none ${isScrolled ? 'text-xl' : 'text-2xl'}`}>
                  Ventora
                </span>
              </Link>
            </div>

            <div className="flex-1 max-w-[500px] min-w-[400px]">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <svg
                    className="w-5 h-5 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    />
                  </svg>
                </div>
                <input
                  id="global-search"
                  type="search"
                  placeholder="Search opportunities, companies, or mentors..."
                  className={`
                    w-full pl-11 pr-16 py-2.5 rounded-full
                    border border-gray-200 bg-gray-50/80
                    text-sm text-gray-900 placeholder-gray-500
                    focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent focus:bg-white
                    transition-all duration-200
                  `}
                  onKeyDown={handleSearchKeydown}
                  aria-label="Search opportunities, companies, or mentors"
                />
                <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                  <kbd className="hidden sm:inline-flex items-center gap-1 px-2 py-1 text-xs font-medium text-gray-400 bg-gray-100 rounded border border-gray-200">
                    {isMac ? '⌘' : 'Ctrl'}K
                  </kbd>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3 flex-shrink-0">
              <Link
                href="/post"
                className="hidden md:inline-flex items-center px-4 py-2 bg-indigo-600 text-white text-sm font-medium rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition-colors"
              >
                Post Opportunity
              </Link>

              <button
                className="relative p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-colors"
                aria-label="Messages - 3 unread"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
                <span className="absolute -top-0.5 -right-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-[10px] font-medium text-white">
                  3
                </span>
              </button>

              <button
                className="relative p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-colors"
                aria-label="Notifications - 5 unread"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                </svg>
                <span className="absolute -top-0.5 -right-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-[10px] font-medium text-white">
                  5
                </span>
              </button>

              <button
                className="flex items-center gap-2 p-1 rounded-lg hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-colors"
                aria-label="Open profile menu"
                aria-haspopup="true"
              >
                <div className={`
                  rounded-full bg-gradient-to-br from-indigo-400 to-purple-500 flex items-center justify-center
                  transition-all duration-300 motion-reduce:transition-none
                  ${isScrolled ? 'w-8 h-8' : 'w-9 h-9'}
                `}>
                  <span className="text-white text-sm font-medium">JD</span>
                </div>
                <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
            </div>
          </div>

          <Navigation isScrolled={isScrolled} />
        </div>
      </header>

      <div className={`transition-all duration-300 ${isScrolled ? 'h-[120px]' : 'h-[140px]'}`} />
    </>
  );
}
