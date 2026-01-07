import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'

export default function OnboardingFlow() {
  const navigate = useNavigate()
  const [selected, setSelected] = useState(null)

  const options = [
    {
      id: 'upload',
      title: 'Upload CV',
      description: 'I have a CV ready to upload',
      icon: '📄',
      color: 'from-blue-500 to-blue-600'
    },
    {
      id: 'form',
      title: 'Fill Form',
      description: 'I prefer to fill out a form',
      icon: '📝',
      color: 'from-purple-500 to-purple-600'
    }
  ]

  const handleSelect = (id) => {
    setSelected(id)
    setTimeout(() => {
      if (id === 'upload') {
        navigate('/cv-parser', { state: { mode: 'upload' } })
      } else {
        navigate('/education-quiz', { state: { mode: 'form' } })
      }
    }, 300)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 flex items-center justify-center p-4">
      <div className="max-w-2xl w-full">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Let's Get Started 🎓
          </h1>
          <p className="text-xl text-slate-400">
            Choose how you'd like to provide your information
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6">
          {options.map((option, index) => (
            <motion.button
              key={option.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              onClick={() => handleSelect(option.id)}
              className={`relative group overflow-hidden rounded-2xl p-8 text-left transform transition-all duration-300 ${
                selected === option.id
                  ? 'ring-2 ring-white scale-105'
                  : 'hover:scale-105'
              }`}
            >
              {/* Background gradient */}
              <div
                className={`absolute inset-0 bg-gradient-to-br ${option.color} opacity-80 group-hover:opacity-100 transition-opacity`}
              />

              {/* Glass effect overlay */}
              <div className="absolute inset-0 backdrop-blur-xl bg-white/10" />

              {/* Content */}
              <div className="relative z-10">
                <div className="text-5xl mb-4">{option.icon}</div>
                <h2 className="text-2xl font-bold text-white mb-2">
                  {option.title}
                </h2>
                <p className="text-white/90">{option.description}</p>

                {/* Selection indicator */}
                {selected === option.id && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute top-4 right-4 w-6 h-6 bg-white rounded-full flex items-center justify-center"
                  >
                    <span className="text-slate-900 font-bold">✓</span>
                  </motion.div>
                )}
              </div>

              {/* Border effect */}
              <div
                className="absolute inset-0 rounded-2xl border border-white/20 group-hover:border-white/40 transition-colors"
              />
            </motion.button>
          ))}
        </div>

        {/* Info text */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="text-center text-slate-400 mt-12"
        >
          Both options help us match you with the best universities for your profile
        </motion.p>
      </div>
    </div>
  )
}
