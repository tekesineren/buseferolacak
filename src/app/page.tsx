'use client';

import { useState, useRef } from 'react';

const sports = [
  'Football', 'Basketball', 'Tennis', 'Swimming', 'Track & Field', 
  'Gymnastics', 'Volleyball', 'Rowing', 'Soccer', 'Baseball', 'Golf', 'Wrestling'
];

const academicLevels = ['High School', "Bachelor's", "Master's"];

const countries = [
  'United States', 'United Kingdom', 'Canada', 'Australia', 'Germany', 
  'France', 'Spain', 'Netherlands', 'Japan', 'South Korea'
];

const fundingOptions = ['Full Scholarship', 'Partial Scholarship', 'Any'];

const mockScholarships = [
  { id: 1, university: 'Stanford University', sport: 'Swimming', type: 'Full Scholarship', country: 'United States', amount: '$65,000/year', deadline: 'March 15, 2026', minGpa: 3.5, maxAge: 25, level: "Bachelor's" },
  { id: 2, university: 'University of Michigan', sport: 'Football', type: 'Full Scholarship', country: 'United States', amount: '$58,000/year', deadline: 'February 28, 2026', minGpa: 3.0, maxAge: 22, level: "Bachelor's" },
  { id: 3, university: 'UCLA', sport: 'Basketball', type: 'Partial Scholarship', country: 'United States', amount: '$35,000/year', deadline: 'April 1, 2026', minGpa: 2.8, maxAge: 24, level: "Bachelor's" },
  { id: 4, university: 'University of Cambridge', sport: 'Rowing', type: 'Full Scholarship', country: 'United Kingdom', amount: '£45,000/year', deadline: 'January 31, 2026', minGpa: 3.7, maxAge: 28, level: "Master's" },
  { id: 5, university: 'University of Toronto', sport: 'Tennis', type: 'Partial Scholarship', country: 'Canada', amount: 'CAD $30,000/year', deadline: 'March 30, 2026', minGpa: 3.2, maxAge: 26, level: "Bachelor's" },
  { id: 6, university: 'University of Sydney', sport: 'Track & Field', type: 'Full Scholarship', country: 'Australia', amount: 'AUD $55,000/year', deadline: 'February 15, 2026', minGpa: 3.4, maxAge: 24, level: "Bachelor's" },
  { id: 7, university: 'Duke University', sport: 'Basketball', type: 'Full Scholarship', country: 'United States', amount: '$62,000/year', deadline: 'March 1, 2026', minGpa: 3.3, maxAge: 22, level: "Bachelor's" },
  { id: 8, university: 'University of Oxford', sport: 'Rowing', type: 'Full Scholarship', country: 'United Kingdom', amount: '£50,000/year', deadline: 'December 15, 2025', minGpa: 3.8, maxAge: 30, level: "Master's" },
  { id: 9, university: 'Technical University Munich', sport: 'Gymnastics', type: 'Partial Scholarship', country: 'Germany', amount: '€25,000/year', deadline: 'April 15, 2026', minGpa: 3.0, maxAge: 23, level: "Bachelor's" },
  { id: 10, university: 'University of British Columbia', sport: 'Volleyball', type: 'Full Scholarship', country: 'Canada', amount: 'CAD $45,000/year', deadline: 'March 20, 2026', minGpa: 3.1, maxAge: 25, level: "Bachelor's" },
  { id: 11, university: 'USC', sport: 'Swimming', type: 'Full Scholarship', country: 'United States', amount: '$60,000/year', deadline: 'February 1, 2026', minGpa: 3.4, maxAge: 23, level: "Bachelor's" },
  { id: 12, university: 'Loughborough University', sport: 'Track & Field', type: 'Partial Scholarship', country: 'United Kingdom', amount: '£20,000/year', deadline: 'May 1, 2026', minGpa: 2.9, maxAge: 26, level: "Bachelor's" },
];

const testimonials = [
  { name: 'Sarah Johnson', role: 'Swimming Scholar, Stanford', quote: 'This platform helped me find my dream scholarship. I never thought I could afford a US education until I found this resource.', avatar: 'SJ' },
  { name: 'Marcus Chen', role: 'Basketball Scholar, Duke', quote: 'The filtering system made it so easy to find scholarships that matched my profile. I applied to 5 and got accepted to 3!', avatar: 'MC' },
  { name: 'Emma Williams', role: 'Tennis Scholar, Toronto', quote: 'As an international student, finding sports scholarships was overwhelming. This site simplified everything.', avatar: 'EW' },
];

const faqs = [
  { question: 'What GPA do I need for a sports scholarship?', answer: 'GPA requirements vary by university and scholarship type. Most Division I schools in the US require a minimum 2.3 GPA, while top-tier programs often look for 3.0 or higher. International scholarships may have different requirements.' },
  { question: 'Can international students apply for sports scholarships?', answer: 'Yes! Many universities worldwide offer sports scholarships to international students. You may need to provide additional documentation such as visa eligibility, English proficiency tests, and credential evaluations.' },
  { question: 'When should I start applying for sports scholarships?', answer: 'Start your search 12-18 months before your intended enrollment date. Many scholarships have deadlines 6-12 months in advance. Early applications often have better chances of success.' },
  { question: 'What documents do I need for a sports scholarship application?', answer: 'Typically you need: academic transcripts, athletic resume/highlight videos, coach recommendations, standardized test scores, personal statement, and proof of athletic achievements or rankings.' },
  { question: 'Are sports scholarships only for elite athletes?', answer: 'No! While elite athletes get the most attention, many programs offer scholarships for developing athletes, walk-ons, and students who demonstrate potential. Partial scholarships are also widely available.' },
];

export default function Home() {
  const [formData, setFormData] = useState({
    sport: '',
    academicLevel: '',
    countries: [] as string[],
    gpa: 3.0,
    age: 20,
    funding: '',
  });
  const [results, setResults] = useState<typeof mockScholarships>([]);
  const [hasSearched, setHasSearched] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [showCountryDropdown, setShowCountryDropdown] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [countryError, setCountryError] = useState(false);
  const resultsRef = useRef<HTMLDivElement>(null);

  const isFormValid = formData.sport && formData.academicLevel && formData.countries.length > 0 && formData.funding;

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (formData.countries.length === 0) {
      setCountryError(true);
      return;
    }
    setCountryError(false);
    
    const filtered = mockScholarships.filter(s => {
      if (formData.sport && s.sport !== formData.sport) return false;
      if (formData.academicLevel && s.level !== formData.academicLevel) return false;
      if (formData.countries.length > 0 && !formData.countries.includes(s.country)) return false;
      if (formData.gpa < s.minGpa) return false;
      if (formData.age > s.maxAge) return false;
      if (formData.funding === 'Full Scholarship' && s.type !== 'Full Scholarship') return false;
      if (formData.funding === 'Partial Scholarship' && s.type !== 'Partial Scholarship') return false;
      return true;
    });

    setResults(filtered);
    setHasSearched(true);
    
    setTimeout(() => {
      resultsRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  const toggleCountry = (country: string) => {
    setFormData(prev => ({
      ...prev,
      countries: prev.countries.includes(country)
        ? prev.countries.filter(c => c !== country)
        : [...prev.countries, country]
    }));
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <span className="text-2xl font-bold text-blue-600">ScholarshipHub</span>
              </div>
              <nav className="hidden md:ml-10 md:flex space-x-8">
                <a href="#features" className="text-gray-600 hover:text-blue-600 transition">Features</a>
                <a href="#scholarships" className="text-gray-600 hover:text-blue-600 transition">Scholarships</a>
                <a href="#testimonials" className="text-gray-600 hover:text-blue-600 transition">Success Stories</a>
                <a href="#faq" className="text-gray-600 hover:text-blue-600 transition">FAQ</a>
              </nav>
            </div>
            <div className="hidden md:flex items-center space-x-4">
              <button className="text-gray-600 hover:text-blue-600 transition font-medium">Sign In</button>
              <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition font-medium">Sign Up Free</button>
            </div>
            <button 
              className="md:hidden p-2"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
          {mobileMenuOpen && (
            <div className="md:hidden pb-4">
              <nav className="flex flex-col space-y-2">
                <a href="#features" className="text-gray-600 hover:text-blue-600 py-2">Features</a>
                <a href="#scholarships" className="text-gray-600 hover:text-blue-600 py-2">Scholarships</a>
                <a href="#testimonials" className="text-gray-600 hover:text-blue-600 py-2">Success Stories</a>
                <a href="#faq" className="text-gray-600 hover:text-blue-600 py-2">FAQ</a>
                <button className="text-left text-gray-600 hover:text-blue-600 py-2">Sign In</button>
                <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 w-full">Sign Up Free</button>
              </nav>
            </div>
          )}
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-600 via-blue-700 to-teal-600 text-white py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
              Find Your Perfect Sports Scholarship Globally
            </h1>
            <p className="text-xl sm:text-2xl text-blue-100 mb-8">
              Connect with universities offering scholarships for your sport. Access 5,000+ opportunities worth over $2.5 billion in funding.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="#search" className="bg-white text-blue-600 px-8 py-4 rounded-xl font-semibold text-lg hover:bg-blue-50 transition shadow-lg">
                Start Your Search
              </a>
              <button className="border-2 border-white text-white px-8 py-4 rounded-xl font-semibold text-lg hover:bg-white/10 transition">
                Watch Demo
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Value Proposition Cards */}
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center p-6 rounded-2xl bg-gradient-to-br from-blue-50 to-teal-50 border border-blue-100">
              <div className="text-4xl font-bold text-blue-600 mb-2">5,000+</div>
              <div className="text-gray-600 font-medium">Active Scholarships</div>
              <p className="text-gray-500 text-sm mt-2">Updated daily from universities worldwide</p>
            </div>
            <div className="text-center p-6 rounded-2xl bg-gradient-to-br from-teal-50 to-blue-50 border border-teal-100">
              <div className="text-4xl font-bold text-teal-600 mb-2">$2.5B+</div>
              <div className="text-gray-600 font-medium">Total Funding Available</div>
              <p className="text-gray-500 text-sm mt-2">Across all sports and academic levels</p>
            </div>
            <div className="text-center p-6 rounded-2xl bg-gradient-to-br from-blue-50 to-teal-50 border border-blue-100">
              <div className="text-4xl font-bold text-blue-600 mb-2">95%</div>
              <div className="text-gray-600 font-medium">Success Rate</div>
              <p className="text-gray-500 text-sm mt-2">Of matched athletes receive offers</p>
            </div>
          </div>
        </div>
      </section>

      {/* Search Form Section */}
      <section id="search" className="py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">Find Your Scholarship Match</h2>
            <p className="text-gray-600 text-lg">Tell us about yourself and we will find the best opportunities for you</p>
          </div>
          
          <form onSubmit={handleSearch} className="bg-white rounded-2xl shadow-xl p-6 sm:p-8 space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              {/* Sport Type */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Sport Type *</label>
                <select
                  required
                  value={formData.sport}
                  onChange={(e) => setFormData({...formData, sport: e.target.value})}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition bg-white"
                >
                  <option value="">Select your sport</option>
                  {sports.map(sport => (
                    <option key={sport} value={sport}>{sport}</option>
                  ))}
                </select>
              </div>

              {/* Academic Level */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Academic Level *</label>
                <select
                  required
                  value={formData.academicLevel}
                  onChange={(e) => setFormData({...formData, academicLevel: e.target.value})}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition bg-white"
                >
                  <option value="">Select level</option>
                  {academicLevels.map(level => (
                    <option key={level} value={level}>{level}</option>
                  ))}
                </select>
              </div>

              {/* Country/Region Multi-select */}
              <div className="relative">
                <label className="block text-sm font-semibold text-gray-700 mb-2">Country/Region *</label>
                <button
                  type="button"
                  onClick={() => setShowCountryDropdown(!showCountryDropdown)}
                  className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition bg-white text-left flex justify-between items-center ${countryError ? 'border-red-500' : 'border-gray-300'}`}
                >
                  <span className={formData.countries.length > 0 ? 'text-gray-900' : 'text-gray-400'}>
                    {formData.countries.length > 0 
                      ? `${formData.countries.length} selected` 
                      : 'Select countries'}
                  </span>
                  <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                {showCountryDropdown && (
                  <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-xl shadow-lg max-h-60 overflow-auto">
                    {countries.map(country => (
                      <label key={country} className="flex items-center px-4 py-2 hover:bg-gray-50 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={formData.countries.includes(country)}
                          onChange={() => {
                            toggleCountry(country);
                            setCountryError(false);
                          }}
                          className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                        />
                        <span className="ml-3 text-gray-700">{country}</span>
                      </label>
                    ))}
                  </div>
                )}
                {countryError && (
                  <p className="text-red-500 text-sm mt-1">Please select at least one country</p>
                )}
              </div>

              {/* Funding Need */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Funding Need *</label>
                <select
                  required
                  value={formData.funding}
                  onChange={(e) => setFormData({...formData, funding: e.target.value})}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition bg-white"
                >
                  <option value="">Select funding type</option>
                  {fundingOptions.map(option => (
                    <option key={option} value={option}>{option}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* GPA Slider */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                GPA / Academic Performance: <span className="text-blue-600">{formData.gpa.toFixed(1)}</span>
              </label>
              <input
                type="range"
                min="2.0"
                max="4.0"
                step="0.1"
                value={formData.gpa}
                onChange={(e) => setFormData({...formData, gpa: parseFloat(e.target.value)})}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
              />
              <div className="flex justify-between text-sm text-gray-500 mt-1">
                <span>2.0</span>
                <span>4.0</span>
              </div>
            </div>

            {/* Age Slider */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Age: <span className="text-blue-600">{formData.age} years</span>
              </label>
              <input
                type="range"
                min="16"
                max="35"
                value={formData.age}
                onChange={(e) => setFormData({...formData, age: parseInt(e.target.value)})}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
              />
              <div className="flex justify-between text-sm text-gray-500 mt-1">
                <span>16</span>
                <span>35</span>
              </div>
            </div>

            <button
              type="submit"
              disabled={!isFormValid}
              className={`w-full py-4 rounded-xl font-semibold text-lg transition shadow-lg flex items-center justify-center gap-2 ${
                isFormValid 
                  ? 'bg-gradient-to-r from-blue-600 to-teal-600 text-white hover:from-blue-700 hover:to-teal-700' 
                  : 'bg-gray-300 text-gray-500 cursor-not-allowed'
              }`}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              Find Scholarships
            </button>
          </form>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">Everything You Need to Succeed</h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">Our comprehensive platform provides all the tools and resources to find and secure your sports scholarship</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="p-8 rounded-2xl border border-gray-200 hover:border-blue-300 hover:shadow-lg transition">
              <div className="w-14 h-14 bg-blue-100 rounded-xl flex items-center justify-center mb-6">
                <svg className="w-7 h-7 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Scholarship Database</h3>
              <p className="text-gray-600">Access our comprehensive database of 5,000+ verified scholarships from universities across 50+ countries.</p>
            </div>
            
            <div className="p-8 rounded-2xl border border-gray-200 hover:border-teal-300 hover:shadow-lg transition">
              <div className="w-14 h-14 bg-teal-100 rounded-xl flex items-center justify-center mb-6">
                <svg className="w-7 h-7 text-teal-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Application Support</h3>
              <p className="text-gray-600">Get guidance on crafting winning applications, including essay reviews and interview preparation tips.</p>
            </div>
            
            <div className="p-8 rounded-2xl border border-gray-200 hover:border-blue-300 hover:shadow-lg transition">
              <div className="w-14 h-14 bg-blue-100 rounded-xl flex items-center justify-center mb-6">
                <svg className="w-7 h-7 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Match Manager</h3>
              <p className="text-gray-600">Track your applications, deadlines, and communications with universities all in one organized dashboard.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Results Section */}
      <section id="scholarships" ref={resultsRef} className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              {hasSearched ? `Found ${results.length} Matching Scholarships` : 'Available Scholarships'}
            </h2>
            <p className="text-gray-600 text-lg">
              {hasSearched 
                ? results.length > 0 
                  ? 'Based on your criteria, here are the best matches for you'
                  : 'Try adjusting your filters to find more opportunities'
                : 'Use the search form above to find scholarships tailored to your profile'}
            </p>
          </div>

          {(hasSearched ? results : mockScholarships.slice(0, 6)).length > 0 && (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {(hasSearched ? results : mockScholarships.slice(0, 6)).map(scholarship => (
                <div key={scholarship.id} className="bg-white rounded-2xl shadow-md hover:shadow-xl transition p-6 border border-gray-100">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="font-bold text-lg text-gray-900">{scholarship.university}</h3>
                      <p className="text-blue-600 font-medium">{scholarship.sport}</p>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      scholarship.type === 'Full Scholarship' 
                        ? 'bg-green-100 text-green-700' 
                        : 'bg-yellow-100 text-yellow-700'
                    }`}>
                      {scholarship.type}
                    </span>
                  </div>
                  
                  <div className="space-y-2 mb-6">
                    <div className="flex items-center text-gray-600">
                      <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                      {scholarship.country}
                    </div>
                    <div className="flex items-center text-gray-600">
                      <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      {scholarship.amount}
                    </div>
                    <div className="flex items-center text-gray-600">
                      <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      Deadline: {scholarship.deadline}
                    </div>
                  </div>
                  
                  <button className="w-full bg-blue-600 text-white py-3 rounded-xl font-semibold hover:bg-blue-700 transition">
                    Apply Now
                  </button>
                </div>
              ))}
            </div>
          )}

          {hasSearched && results.length === 0 && (
            <div className="text-center py-12 bg-white rounded-2xl">
              <svg className="w-16 h-16 text-gray-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <h3 className="text-xl font-bold text-gray-700 mb-2">No scholarships found</h3>
              <p className="text-gray-500">Try broadening your search criteria to see more results</p>
            </div>
          )}
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">Success Stories</h2>
            <p className="text-gray-600 text-lg">Hear from athletes who found their dream scholarships through our platform</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-gradient-to-br from-blue-50 to-teal-50 rounded-2xl p-8 border border-blue-100">
                <div className="flex items-center mb-6">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-teal-600 rounded-full flex items-center justify-center text-white font-bold">
                    {testimonial.avatar}
                  </div>
                  <div className="ml-4">
                    <div className="font-bold text-gray-900">{testimonial.name}</div>
                    <div className="text-sm text-gray-600">{testimonial.role}</div>
                  </div>
                </div>
                <p className="text-gray-700 italic">&quot;{testimonial.quote}&quot;</p>
                <div className="flex mt-4 text-yellow-400">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="py-16 bg-gray-50">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">Frequently Asked Questions</h2>
            <p className="text-gray-600 text-lg">Everything you need to know about sports scholarships</p>
          </div>
          
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div key={index} className="bg-white rounded-xl border border-gray-200 overflow-hidden">
                <button
                  onClick={() => setOpenFaq(openFaq === index ? null : index)}
                  className="w-full px-6 py-4 flex items-center justify-between text-left hover:bg-gray-50 transition"
                >
                  <span className="font-semibold text-gray-900">{faq.question}</span>
                  <svg 
                    className={`w-5 h-5 text-gray-500 transform transition-transform ${openFaq === index ? 'rotate-180' : ''}`} 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                {openFaq === index && (
                  <div className="px-6 pb-4">
                    <p className="text-gray-600">{faq.answer}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-blue-600 via-blue-700 to-teal-600 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold mb-6">Start Your Scholarship Journey Today</h2>
          <p className="text-xl text-blue-100 mb-8">Join thousands of athletes who have found their perfect scholarship match. It is free to get started.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-white text-blue-600 px-8 py-4 rounded-xl font-semibold text-lg hover:bg-blue-50 transition shadow-lg">
              Create Free Account
            </button>
            <button className="border-2 border-white text-white px-8 py-4 rounded-xl font-semibold text-lg hover:bg-white/10 transition">
              Talk to an Advisor
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-400 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <span className="text-2xl font-bold text-white">ScholarshipHub</span>
              <p className="mt-4 text-sm">Connecting athletes with educational opportunities worldwide since 2020.</p>
              <div className="flex space-x-4 mt-4">
                <a href="#" className="hover:text-white transition">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
                </a>
                <a href="#" className="hover:text-white transition">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/></svg>
                </a>
                <a href="#" className="hover:text-white transition">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.6.11.82-.26.82-.577v-2.234c-3.338.726-4.042-1.61-4.042-1.61-.546-1.387-1.333-1.757-1.333-1.757-1.09-.745.083-.73.083-.73 1.205.085 1.84 1.238 1.84 1.238 1.07 1.834 2.807 1.304 3.492.997.108-.775.42-1.305.763-1.605-2.665-.305-5.467-1.334-5.467-5.93 0-1.31.468-2.382 1.236-3.22-.124-.303-.536-1.524.117-3.176 0 0 1.008-.322 3.3 1.23A11.5 11.5 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.29-1.552 3.297-1.23 3.297-1.23.655 1.653.243 2.874.12 3.176.77.838 1.234 1.91 1.234 3.22 0 4.61-2.807 5.624-5.479 5.92.43.37.823 1.102.823 2.222v3.293c0 .32.218.694.825.576C20.565 21.796 24 17.3 24 12c0-6.627-5.373-12-12-12z"/></svg>
                </a>
                <a href="#" className="hover:text-white transition">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>
                </a>
              </div>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">Product</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="hover:text-white transition">Features</a></li>
                <li><a href="#" className="hover:text-white transition">Pricing</a></li>
                <li><a href="#" className="hover:text-white transition">Universities</a></li>
                <li><a href="#" className="hover:text-white transition">Success Stories</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">Resources</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="hover:text-white transition">Blog</a></li>
                <li><a href="#" className="hover:text-white transition">Guides</a></li>
                <li><a href="#" className="hover:text-white transition">Help Center</a></li>
                <li><a href="#" className="hover:text-white transition">Contact Us</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">Legal</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="hover:text-white transition">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-white transition">Terms of Service</a></li>
                <li><a href="#" className="hover:text-white transition">Cookie Policy</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 pt-8 text-center text-sm">
            <p>&copy; {new Date().getFullYear()} ScholarshipHub. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
