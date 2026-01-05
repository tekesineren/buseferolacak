'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';

interface NavigationProps {
  isScrolled: boolean;
}

const navItems = [
  { name: 'Dashboard', href: '/dashboard' },
  { name: 'Explore Opportunities', href: '/explore', hasMegaMenu: true },
  { name: 'My Applications', href: '/applications', badge: 4 },
  { name: 'Mentorship', href: '/mentorship' },
  { name: 'Network', href: '/network' },
  { name: 'Saved', href: '/saved' },
];

const megaMenuCategories = [
  {
    title: 'By Sport',
    items: ['Basketball', 'Football', 'Soccer', 'Tennis', 'Swimming', 'Track & Field'],
  },
  {
    title: 'By Type',
    items: ['Scholarships', 'NIL Deals', 'Internships', 'Mentorships', 'Camps'],
  },
  {
    title: 'By Level',
    items: ['High School', 'College', 'Professional', 'Olympic'],
  },
  {
    title: 'Featured',
    items: ['Trending Now', 'Closing Soon', 'New This Week', 'Top Rated'],
  },
];

export default function Navigation({ isScrolled }: NavigationProps) {
  const [activeMegaMenu, setActiveMegaMenu] = useState<string | null>(null);
  const [focusedIndex, setFocusedIndex] = useState(-1);
  const navRef = useRef<HTMLElement>(null);
  const megaMenuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (megaMenuRef.current && !megaMenuRef.current.contains(event.target as Node)) {
        setActiveMegaMenu(null);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleKeyDown = (e: React.KeyboardEvent, index: number, hasMegaMenu?: boolean) => {
    switch (e.key) {
      case 'ArrowRight':
        e.preventDefault();
        setFocusedIndex((index + 1) % navItems.length);
        break;
      case 'ArrowLeft':
        e.preventDefault();
        setFocusedIndex(index === 0 ? navItems.length - 1 : index - 1);
        break;
      case 'Enter':
      case ' ':
        if (hasMegaMenu) {
          e.preventDefault();
          setActiveMegaMenu(activeMegaMenu === navItems[index].name ? null : navItems[index].name);
        }
        break;
      case 'Escape':
        setActiveMegaMenu(null);
        break;
    }
  };

  useEffect(() => {
    if (focusedIndex >= 0 && navRef.current) {
      const buttons = navRef.current.querySelectorAll('[role="menuitem"]');
      (buttons[focusedIndex] as HTMLElement)?.focus();
    }
  }, [focusedIndex]);

  return (
    <nav
      ref={navRef}
      className="mt-4"
      role="navigation"
      aria-label="Main navigation"
    >
      <ul className="flex items-center gap-1" role="menubar">
        {navItems.map((item, index) => (
          <li key={item.name} role="none" className="relative">
            {item.hasMegaMenu ? (
              <div ref={item.hasMegaMenu ? megaMenuRef : undefined}>
                <button
                  role="menuitem"
                  aria-haspopup="true"
                  aria-expanded={activeMegaMenu === item.name}
                  className={`
                    flex items-center gap-1 px-4 py-2 text-[15px] font-medium rounded-lg
                    transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500
                    ${activeMegaMenu === item.name
                      ? 'text-indigo-600 bg-indigo-50'
                      : 'text-gray-700 hover:text-gray-900 hover:bg-gray-100'
                    }
                  `}
                  onClick={() => setActiveMegaMenu(activeMegaMenu === item.name ? null : item.name)}
                  onKeyDown={(e) => handleKeyDown(e, index, item.hasMegaMenu)}
                >
                  {item.name}
                  <svg
                    className={`w-4 h-4 transition-transform duration-200 ${activeMegaMenu === item.name ? 'rotate-180' : ''}`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>

                {activeMegaMenu === item.name && (
                  <div
                    className="absolute top-full left-0 mt-2 w-[600px] bg-white rounded-xl shadow-xl border border-gray-100 p-6 z-50"
                    role="menu"
                  >
                    <div className="grid grid-cols-4 gap-6">
                      {megaMenuCategories.map((category) => (
                        <div key={category.title}>
                          <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">
                            {category.title}
                          </h3>
                          <ul className="space-y-2">
                            {category.items.map((subItem) => (
                              <li key={subItem}>
                                <Link
                                  href={`/explore?filter=${subItem.toLowerCase().replace(/ /g, '-')}`}
                                  className="block text-sm text-gray-600 hover:text-indigo-600 hover:pl-1 transition-all"
                                  role="menuitem"
                                  onClick={() => setActiveMegaMenu(null)}
                                >
                                  {subItem}
                                </Link>
                              </li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>
                    <div className="mt-6 pt-4 border-t border-gray-100">
                      <Link
                        href="/explore"
                        className="text-sm font-medium text-indigo-600 hover:text-indigo-700"
                        onClick={() => setActiveMegaMenu(null)}
                      >
                        View all opportunities →
                      </Link>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <Link
                href={item.href}
                role="menuitem"
                className="flex items-center gap-2 px-4 py-2 text-[15px] font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500"
                onKeyDown={(e) => handleKeyDown(e, index)}
              >
                {item.name}
                {item.badge && (
                  <span className="flex items-center justify-center min-w-[20px] h-5 px-1.5 text-xs font-medium text-white bg-indigo-600 rounded-full">
                    {item.badge}
                  </span>
                )}
              </Link>
            )}
          </li>
        ))}
      </ul>
    </nav>
  );
}
