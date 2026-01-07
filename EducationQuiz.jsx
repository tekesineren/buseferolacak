import React, { useState, useMemo } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { motion } from 'framer-motion'
import { educationSystems } from '../config/educationConfig'

export default function EducationQuiz() {
  const navigate = useNavigate()
  const location = useLocation()
  const mode = location.state?.mode || 'form'

  const [step, setStep] = useState('level') // level -> country -> gpa
  const [selectedLevel, setSelectedLevel] = useState(null)
  const [selectedCountry, setSelectedCountry] = useState(null)
  const [gpaValue, setGpaValue] = useState('')
  const [error, setError] = useState('')

  const educationLevels = [
    { id: 'highschool', label: 'High School', icon: '🏫' },
    { id: 'bachelors', label: "Bachelor's Degree", icon: '🎓' },
    { id: 'masters', label: "Master's Degree", icon: '📚' },
    { id: 'phd', label: 'PhD', icon: '🔬' }
  ]

  // Get countries based on selected education level
  const availableCountries = useMemo(() => {
    if (!selectedLevel) return []
    return educationSystems[selectedLevel] || []
  }, [selectedLevel])

  // Get GPA system details based on selected country
  const gpaSystem = useMemo(() => {
    if (!selectedLevel || !selectedCountry) return null
    const level = educationSystems[selectedLevel]
    if (!level) return null
    const country = level.find(c => c.id === selectedCountry)
    return country ? country.gpaSystem : null
  }, [selectedLevel, selectedCountry])

  const handleLevelSelect = (levelId) => {
    setSelectedLevel(levelId)
    setSelectedCountry(null)
    setGpaValue('')
    setError('')
    setStep('country')
  }

  const handleCountrySelect = (countryId) => {
    setSelectedCountry(countryId)
    setGpaValue('')
    setError('')
    setStep('gpa')
  }

  const validateGPA = () => {
    if (!gpaValue.trim()) {
      setError('Please enter your GPA')
      return false
    }

    if (!gpaSystem) return false

    const value = parseFloat(gpaValue)
    if (isNaN(value)) {
      setError('Please enter a valid number')
      return false
    }

    if (value < 0 || value > gpaSystem.maxScore) {
      setError(`GPA should be between 0 and ${gpaSystem.maxScore}`)
      return false
    }

    setError('')
    return true
  }

  const handleContinue = () => {
    if (!validateGPA()) return

    // Save education data
    const educationData = {
      level: selectedLevel,
      country: selectedCountry,
      gpa: parseFloat(gpaValue),
      gpaSystem: gpaSystem.label,
      mode: mode
    }

    // Navigate based on mode
    if (mode === 'form') {
      navigate('/profile-form', { state: { educationData } })
    } else {
      navigate('/cv-parser', { state: { educationData } })
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 flex items-center justify-center p-4">
      <div className="max-w-2xl w-full">
        {/* Progress indicator */}
        <div className="mb-12">
          <div className="flex justify-between mb-4">
            <span className={`text-sm font-semibold ${step === 'level' ? 'text-white' : 'text-slate-400'}`}>
              Education Level
            </span>
            <span className={`text-sm font-semibold ${step === 'country' ? 'text-white' : 'text-slate-400'}`}>
              Country
            </span>
            <span className={`text-sm font-semibold ${step === 'gpa' ? 'text-white' : 'text-slate-400'}`}>
              GPA
            </span>
          </div>
          <div className="w-full bg-slate-700 rounded-full h-2">
            <motion.div
              className="bg-gradient-to-r from-blue-500 to-purple-500 h-full rounded-full"
              initial={{ width: '0%' }}
              animate={{
                width: step === 'level' ? '33%' : step === 'country' ? '66%' : '100%'
              }}
              transition={{ duration: 0.3 }}
            />
          </div>
        </div>

        {/* Step: Education Level */}
        {step === 'level' && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <h1 className="text-4xl font-bold text-white mb-2">Education Level</h1>
            <p className="text-slate-400 mb-8">What's your current or intended education level?</p>

            <div className="grid grid-cols-2 gap-4">
              {educationLevels.map((level, idx) => (
                <motion.button
                  key={level.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: idx * 0.05 }}
                  onClick={() => handleLevelSelect(level.id)}
                  className="bg-slate-700/50 hover:bg-slate-600 border border-slate-600 rounded-xl p-6 text-white transition-all duration-200 group"
                >
                  <div className="text-4xl mb-3 group-hover:scale-110 transition-transform">{level.icon}</div>
                  <div className="font-semibold">{level.label}</div>
                </motion.button>
              ))}
            </div>
          </motion.div>
        )}

        {/* Step: Country */}
        {step === 'country' && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <h1 className="text-4xl font-bold text-white mb-2">Where did/will you study?</h1>
            <p className="text-slate-400 mb-8">Select the country of your education</p>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {availableCountries.map((country, idx) => (
                <motion.button
                  key={country.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: idx * 0.03 }}
                  onClick={() => handleCountrySelect(country.id)}
                  className="bg-slate-700/50 hover:bg-slate-600 border border-slate-600 rounded-lg p-4 text-white transition-all duration-200"
                >
                  <div className="font-semibold text-sm">{country.name}</div>
                </motion.button>
              ))}
            </div>

            <button
              onClick={() => {
                setSelectedCountry(null)
                setStep('level')
              }}
              className="mt-8 text-slate-400 hover:text-white transition-colors"
            >
              ← Back
            </button>
          </motion.div>
        )}

        {/* Step: GPA */}
        {step === 'gpa' && gpaSystem && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <h1 className="text-4xl font-bold text-white mb-2">What's your GPA?</h1>
            <p className="text-slate-400 mb-8">
              {gpaSystem.label} ({gpaSystem.minScore}-{gpaSystem.maxScore})
            </p>

            <div className="bg-slate-700/50 border border-slate-600 rounded-xl p-8">
              <input
                type="number"
                value={gpaValue}
                onChange={(e) => {
                  setGpaValue(e.target.value)
                  setError('')
                }}
                placeholder={`Enter GPA (e.g., ${gpaSystem.example})`}
                step={gpaSystem.step}
                min={gpaSystem.minScore}
                max={gpaSystem.maxScore}
                className="w-full bg-slate-600 border border-slate-500 rounded-lg px-4 py-3 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4"
              />

              {error && (
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-red-400 text-sm mb-4"
                >
                  ⚠️ {error}
                </motion.p>
              )}

              <p className="text-slate-400 text-sm mb-6">
                {gpaSystem.helpText}
              </p>

              <button
                onClick={handleContinue}
                disabled={!gpaValue}
                className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold py-3 rounded-lg transition-all duration-200"
              >
                Continue
              </button>
            </div>

            <button
              onClick={() => {
                setSelectedCountry(null)
                setGpaValue('')
                setStep('country')
              }}
              className="mt-8 text-slate-400 hover:text-white transition-colors"
            >
              ← Back
            </button>
          </motion.div>
        )}
      </div>
    </div>
  )
}
