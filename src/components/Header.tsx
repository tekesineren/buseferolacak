import { useState, useEffect, useRef } from 'react';
import { ChevronDown, Menu, X } from 'lucide-react';
import headerImage from '@/assets/61b7c4bf16746e98ae9b69c193ba0391fb32af47.png';

export function Header() {
  const [isServicesOpen, setIsServicesOpen] = useState(false);
  const [isSectorsOpen, setIsSectorsOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const sectorsDropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsServicesOpen(false);
      }
      if (sectorsDropdownRef.current && !sectorsDropdownRef.current.contains(event.target as Node)) {
        setIsSectorsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setIsScrolled(scrollPosition > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const servicesMenu = [
    {
      category: 'Sports & Athletics Career Management',
      items: [
        'Career Planning and Placement',
        'Scholarship and Contract Negotiations',
        'NIL (Name, Image, Likeness) Services'
      ]
    },
    {
      category: 'Academics Career Management',
      items: [
        'AI-Powered Program Matching System',
        'Academic Counseling and Support'
      ]
    }
  ];

  return (
    <>
      {/* Sticky Navigation */}
      <nav 
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-700 ease-in-out ${
          isScrolled 
            ? 'opacity-100 translate-y-0' 
            : 'opacity-0 -translate-y-4 pointer-events-none'
        }`}
        style={{
          clipPath: isScrolled 
            ? 'ellipse(100% 100% at 50% 0%)' 
            : 'ellipse(100% 0% at 50% 0%)',
          transition: 'clip-path 0.7s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.7s ease-in-out, transform 0.7s ease-in-out'
        }}
      >
        <div className="bg-white/95 backdrop-blur-md shadow-lg">
          <div className="container mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              {/* Logo/Brand */}
              <div className="text-gray-800 text-2xl font-bold">
                Ventora
              </div>

              {/* Desktop Menu */}
              <div className="hidden md:flex items-center gap-8">
                {/* Services with Dropdown */}
                <div className="relative" ref={dropdownRef}>
                  <button
                    onClick={() => setIsServicesOpen(!isServicesOpen)}
                    className="text-gray-800 hover:text-gray-600 transition-colors flex items-center gap-1 py-2 font-[Montserrat]"
                  >
                    Services
                    <ChevronDown className={`w-4 h-4 transition-transform ${isServicesOpen ? 'rotate-180' : ''}`} />
                  </button>

                  {/* Dropdown Menu */}
                  {isServicesOpen && (
                    <div className="absolute top-full left-0 mt-2 w-80 bg-white rounded-lg shadow-xl z-[9999]">
                      {/* Triangle Arrow */}
                      <div className="absolute -top-2 left-8 w-4 h-4 bg-white transform rotate-45"></div>
                      
                      <div className="relative overflow-hidden rounded-lg">
                        {servicesMenu.map((section, idx) => (
                          <div key={idx} className={idx > 0 ? 'border-t border-gray-200' : ''}>
                            <div className="px-4 py-3 bg-gray-50">
                              <h3 className="text-sm font-semibold text-gray-700">
                                {section.category}
                              </h3>
                            </div>
                            <div className="py-2">
                              {section.items.map((item, itemIdx) => (
                                <a
                                  key={itemIdx}
                                  href="#"
                                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
                                  onClick={() => setIsServicesOpen(false)}
                                >
                                  {item}
                                </a>
                              ))}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {/* Sectors with Dropdown */}
                <div className="relative" ref={sectorsDropdownRef}>
                  <button
                    onClick={() => setIsSectorsOpen(!isSectorsOpen)}
                    className="text-gray-800 hover:text-gray-600 transition-colors flex items-center gap-1 py-2 font-[Montserrat]"
                  >
                    Sectors
                    <ChevronDown className={`w-4 h-4 transition-transform ${isSectorsOpen ? 'rotate-180' : ''}`} />
                  </button>

                  {/* Dropdown Menu */}
                  {isSectorsOpen && (
                    <div className="absolute top-full left-0 mt-2 w-80 bg-white rounded-lg shadow-xl overflow-hidden">
                      <div className="py-2">
                        <a
                          href="#"
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
                          onClick={() => setIsSectorsOpen(false)}
                        >
                          Education
                        </a>
                        <a
                          href="#"
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
                          onClick={() => setIsSectorsOpen(false)}
                        >
                          Athlete Representation
                        </a>
                        <a
                          href="#"
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
                          onClick={() => setIsSectorsOpen(false)}
                        >
                          Digital Branding
                        </a>
                        <a
                          href="#"
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
                          onClick={() => setIsSectorsOpen(false)}
                        >
                          NIL Marketing Management
                        </a>
                      </div>
                    </div>
                  )}
                </div>

                {/* Other Menu Items */}
                <a href="#" className="text-gray-800 hover:text-gray-600 transition-colors py-2 font-[Montserrat]">
                  Insights
                </a>
                <a href="#" className="text-gray-800 hover:text-gray-600 transition-colors py-2 font-[Montserrat]">
                  About Us
                </a>
                <a href="#" className="text-gray-800 hover:text-gray-600 transition-colors py-2 font-[Montserrat]">
                  Career
                </a>
              </div>

              {/* Mobile Menu Button */}
              <button
                className="md:hidden text-gray-800"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              >
                {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>

            {/* Mobile Menu */}
            {isMobileMenuOpen && (
              <div className="md:hidden mt-4 bg-white rounded-lg shadow-xl overflow-hidden">
                {/* Services Section */}
                <div className="border-b border-gray-200">
                  <button
                    onClick={() => setIsServicesOpen(!isServicesOpen)}
                    className="w-full px-4 py-3 text-left text-gray-800 hover:bg-gray-100 flex items-center justify-between"
                  >
                    Services
                    <ChevronDown className={`w-4 h-4 transition-transform ${isServicesOpen ? 'rotate-180' : ''}`} />
                  </button>
                  
                  {isServicesOpen && (
                    <div className="bg-gray-50">
                      {servicesMenu.map((section, idx) => (
                        <div key={idx}>
                          <div className="px-4 py-2">
                            <h3 className="text-xs font-semibold text-gray-600 uppercase">
                              {section.category}
                            </h3>
                          </div>
                          <div className="pb-2">
                            {section.items.map((item, itemIdx) => (
                              <a
                                key={itemIdx}
                                href="#"
                                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-200"
                                onClick={() => {
                                  setIsMobileMenuOpen(false);
                                  setIsServicesOpen(false);
                                }}
                              >
                                {item}
                              </a>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Sectors Section */}
                <div className="border-b border-gray-200">
                  <button
                    onClick={() => setIsSectorsOpen(!isSectorsOpen)}
                    className="w-full px-4 py-3 text-left text-gray-800 hover:bg-gray-100 flex items-center justify-between"
                  >
                    Sectors
                    <ChevronDown className={`w-4 h-4 transition-transform ${isSectorsOpen ? 'rotate-180' : ''}`} />
                  </button>
                  
                  {isSectorsOpen && (
                    <div className="bg-gray-50">
                      <div className="pb-2">
                        <a
                          href="#"
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-200"
                          onClick={() => {
                            setIsMobileMenuOpen(false);
                            setIsSectorsOpen(false);
                          }}
                        >
                          Education
                        </a>
                        <a
                          href="#"
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-200"
                          onClick={() => {
                            setIsMobileMenuOpen(false);
                            setIsSectorsOpen(false);
                          }}
                        >
                          Athlete Representation
                        </a>
                        <a
                          href="#"
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-200"
                          onClick={() => {
                            setIsMobileMenuOpen(false);
                            setIsSectorsOpen(false);
                          }}
                        >
                          Digital Branding
                        </a>
                        <a
                          href="#"
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-200"
                          onClick={() => {
                            setIsMobileMenuOpen(false);
                            setIsSectorsOpen(false);
                          }}
                        >
                          NIL Marketing Management
                        </a>
                      </div>
                    </div>
                  )}
                </div>

                {/* Other Menu Items */}
                <a
                  href="#"
                  className="block px-4 py-3 text-gray-800 hover:bg-gray-100 border-b border-gray-200"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Insights
                </a>
                <a
                  href="#"
                  className="block px-4 py-3 text-gray-800 hover:bg-gray-100 border-b border-gray-200"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  About Us
                </a>
                <a
                  href="#"
                  className="block px-4 py-3 text-gray-800 hover:bg-gray-100"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Career
                </a>
              </div>
            )}
          </div>
        </div>
      </nav>

      {/* Header with Background Image */}
      <header className="relative w-full">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <img 
            src={headerImage} 
            alt="Header background" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/50"></div>
        </div>

        {/* Transparent Navigation (visible on page load) */}
        <nav className="relative z-[100] container mx-auto px-4 py-6">
          <div className="flex items-center">
            {/* Logo/Brand */}
            <div className="text-white text-2xl font-bold">
              Ventora
            </div>

            {/* Desktop Menu - Centered */}
            <div className="hidden md:flex items-center gap-8 absolute left-1/2 -translate-x-1/2">
              {/* Services with Dropdown */}
              <div 
                className="relative" 
                ref={dropdownRef}
                onMouseEnter={() => setIsServicesOpen(true)}
                onMouseLeave={() => setIsServicesOpen(false)}
              >
                <button
                  onMouseEnter={() => setIsServicesOpen(true)}
                  className="text-white hover:text-[#FF6B00] transition-colors py-2 font-[Montserrat]"
                >
                  Services
                </button>

                {/* Dropdown Menu */}
                {isServicesOpen && (
                  <div className="absolute top-full left-0 mt-2 w-80 bg-white rounded-lg shadow-xl overflow-hidden">
                    {servicesMenu.map((section, idx) => (
                      <div key={idx} className={idx > 0 ? 'border-t border-gray-200' : ''}>
                        <div className="px-4 py-3 bg-gray-50">
                          <h3 className="text-sm font-semibold text-gray-700">
                            {section.category}
                          </h3>
                        </div>
                        <div className="py-2">
                          {section.items.map((item, itemIdx) => (
                            <a
                              key={itemIdx}
                              href="#"
                              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
                              onClick={() => setIsServicesOpen(false)}
                            >
                              {item}
                            </a>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Sectors with Dropdown */}
              <div 
                className="relative" 
                ref={sectorsDropdownRef}
                onMouseEnter={() => setIsSectorsOpen(true)}
                onMouseLeave={() => setIsSectorsOpen(false)}
              >
                <button
                  onMouseEnter={() => setIsSectorsOpen(true)}
                  className="text-white hover:text-[#FF6B00] transition-colors py-2 font-[Montserrat]"
                >
                  Sectors
                </button>

                {/* Dropdown Menu */}
                {isSectorsOpen && (
                  <div className="absolute top-full left-0 mt-2 w-80 bg-white rounded-lg shadow-xl overflow-hidden">
                    <div className="py-2">
                      <a
                        href="#"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
                        onClick={() => setIsSectorsOpen(false)}
                      >
                        Education
                      </a>
                      <a
                        href="#"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
                        onClick={() => setIsSectorsOpen(false)}
                      >
                        Athlete Representation
                      </a>
                      <a
                        href="#"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
                        onClick={() => setIsSectorsOpen(false)}
                      >
                        Digital Branding
                      </a>
                      <a
                        href="#"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
                        onClick={() => setIsSectorsOpen(false)}
                      >
                        NIL Marketing Management
                      </a>
                    </div>
                  </div>
                )}
              </div>

              {/* Other Menu Items */}
              <a href="#" className="text-white hover:text-[#FF6B00] transition-colors py-2 font-[Montserrat]">
                Insights
              </a>
              <a href="#" className="text-white hover:text-[#FF6B00] transition-colors py-2 font-[Montserrat]">
                About Us
              </a>
              <a href="#" className="text-white hover:text-[#FF6B00] transition-colors py-2 font-[Montserrat]">
                Career
              </a>
            </div>

            {/* Book a Demo Button - Desktop */}
            <div className="hidden md:block ml-auto">
              <a 
                href="#" 
                className="bg-[#FF6B00] hover:bg-white text-white hover:text-[#FF6B00] hover:border-[#FF6B00] border-2 border-[#FF6B00] px-6 py-2.5 rounded-full font-[Montserrat] transition-colors"
              >
                Book a Demo
              </a>
            </div>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden text-white ml-auto"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

          {/* Mobile Menu */}
          {isMobileMenuOpen && (
            <div className="md:hidden mt-4 bg-white/95 backdrop-blur-sm rounded-lg shadow-xl overflow-hidden">
              {/* Services Section */}
              <div className="border-b border-gray-200">
                <button
                  onClick={() => setIsServicesOpen(!isServicesOpen)}
                  className="w-full px-4 py-3 text-left text-gray-800 hover:bg-gray-100 flex items-center justify-between"
                >
                  Services
                  <ChevronDown className={`w-4 h-4 transition-transform ${isServicesOpen ? 'rotate-180' : ''}`} />
                </button>
                
                {isServicesOpen && (
                  <div className="bg-gray-50">
                    {servicesMenu.map((section, idx) => (
                      <div key={idx}>
                        <div className="px-4 py-2">
                          <h3 className="text-xs font-semibold text-gray-600 uppercase">
                            {section.category}
                          </h3>
                        </div>
                        <div className="pb-2">
                          {section.items.map((item, itemIdx) => (
                            <a
                              key={itemIdx}
                              href="#"
                              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-200"
                              onClick={() => {
                                setIsMobileMenuOpen(false);
                                setIsServicesOpen(false);
                              }}
                            >
                              {item}
                            </a>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Sectors Section */}
              <div className="border-b border-gray-200">
                <button
                  onClick={() => setIsSectorsOpen(!isSectorsOpen)}
                  className="w-full px-4 py-3 text-left text-gray-800 hover:bg-gray-100 flex items-center justify-between"
                >
                  Sectors
                  <ChevronDown className={`w-4 h-4 transition-transform ${isSectorsOpen ? 'rotate-180' : ''}`} />
                </button>
                
                {isSectorsOpen && (
                  <div className="bg-gray-50">
                    <div className="pb-2">
                      <a
                        href="#"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-200"
                        onClick={() => {
                          setIsMobileMenuOpen(false);
                          setIsSectorsOpen(false);
                        }}
                      >
                        Education
                      </a>
                      <a
                        href="#"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-200"
                        onClick={() => {
                          setIsMobileMenuOpen(false);
                          setIsSectorsOpen(false);
                        }}
                      >
                        Athlete Representation
                      </a>
                      <a
                        href="#"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-200"
                        onClick={() => {
                          setIsMobileMenuOpen(false);
                          setIsSectorsOpen(false);
                        }}
                      >
                        Digital Branding
                      </a>
                      <a
                        href="#"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-200"
                        onClick={() => {
                          setIsMobileMenuOpen(false);
                          setIsSectorsOpen(false);
                        }}
                      >
                        NIL Marketing Management
                      </a>
                    </div>
                  </div>
                )}
              </div>

              {/* Other Menu Items */}
              <a
                href="#"
                className="block px-4 py-3 text-gray-800 hover:bg-gray-100 border-b border-gray-200"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Insights
              </a>
              <a
                href="#"
                className="block px-4 py-3 text-gray-800 hover:bg-gray-100 border-b border-gray-200"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                About Us
              </a>
              <a
                href="#"
                className="block px-4 py-3 text-gray-800 hover:bg-gray-100"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Career
              </a>
            </div>
          )}
        </nav>

        {/* Header Content */}
        <div className="relative z-10 container mx-auto px-4 py-20 md:py-32">
          <div className="flex flex-col lg:flex-row gap-12 items-start justify-between">
            {/* Left side - Headlines */}
            <div className="max-w-3xl">
              <h1 className="md:text-7xl lg:text-8xl font-bold text-white mb-2 leading-tight text-[70px]">
                Smart Solutions,
              </h1>
              <h2 className="md:text-6xl lg:text-7xl font-bold text-white leading-tight text-[40px] font-normal not-italic">
                Brighter Futures.
              </h2>
            </div>
            
            {/* Right side - Description */}
            <div className="max-w-xl lg:mr-4">
              <p className="text-lg md:text-xl text-white/90 leading-relaxed text-left font-[Montserrat]">
                Ventora delivers integrated career management services that build confidence and help navigate NIL, scholarships, academic pathways while while securing opportunites across education, athelete representation, NIL marketing and digital branding sectors.
              </p>
              
              {/* Action Buttons */}
              <div className="flex gap-4 mt-8">
                <a 
                  href="#" 
                  className="bg-white hover:bg-[#FF6B00] text-gray-800 hover:text-white px-6 py-2.5 rounded-full font-[Montserrat] transition-colors"
                >
                  About Ventora
                </a>
                <a 
                  href="#" 
                  className="bg-[#2C3E50] hover:bg-white text-white hover:text-gray-800 px-6 py-2.5 rounded-full font-[Montserrat] transition-colors"
                >
                  Get in Touch
                </a>
              </div>
            </div>
          </div>
        </div>
      </header>
    </>
  );
}