import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navLinks = [
    { name: 'Features', href: '#features' },
    { name: 'Universities', href: '#universities' },
    { name: 'Pricing', href: '#pricing' },
    { name: 'FAQ', href: '#faq' },
  ]

  return (
    <motion.header
      className={`fixed top-0 w-full z-50 transition-all duration-500 ${
        isScrolled
          ? 'bg-white/95 backdrop-blur-md shadow-lg py-4'
          : 'bg-transparent py-6'
      }`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className={`w-10 h-10 rounded-lg ${
              isScrolled ? 'bg-blue-600' : 'bg-white/20'
            } flex items-center justify-center text-white font-bold text-lg`}>
              V
            </div>
            <span className={`font-bold text-xl ${
              isScrolled ? 'text-gray-900' : 'text-white'
            }`}>
              Ventora
            </span>
          </div>

          <nav className="hidden md:flex gap-8 items-center">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className={`font-medium transition-colors ${
                  isScrolled
                    ? 'text-gray-700 hover:text-blue-600'
                    : 'text-white/80 hover:text-white'
                }`}
              >
                {link.name}
              </a>
            ))}
          </nav>

          <div className="hidden md:flex gap-4 items-center">
            <button className={`px-6 py-2 rounded-lg font-medium transition-colors ${
              isScrolled
                ? 'text-gray-700 hover:text-blue-600'
                : 'text-white/80 hover:text-white'
            }`}>
              Login
            </button>
            <button className={`px-6 py-2 rounded-lg font-medium ${
              isScrolled
                ? 'bg-blue-600 text-white hover:bg-blue-700'
                : 'bg-white/20 text-white hover:bg-white/30 border border-white/20'
            } transition-all`}>
              Get Started
            </button>
          </div>

          <button
            className={`md:hidden p-2 rounded-lg ${
              isScrolled ? 'hover:bg-gray-100' : 'hover:bg-white/10'
            }`}
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            <svg className={`w-6 h-6 ${isScrolled ? 'text-gray-900' : 'text-white'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>

        {isMobileMenuOpen && (
          <motion.div
            className="md:hidden mt-4 pb-4"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className={`block px-4 py-2 rounded-lg ${
                  isScrolled
                    ? 'text-gray-700 hover:bg-gray-100'
                    : 'text-white hover:bg-white/10'
                }`}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {link.name}
              </a>
            ))}
          </motion.div>
        )}
      </div>
    </motion.header>
  )
}
