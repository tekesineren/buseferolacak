import React, { useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { motion } from 'framer-motion'

export default function FormFallback() {
  const navigate = useNavigate()
  const location = useLocation()
  const educationData = location.state?.educationData

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    skills: '',
    experience: '',
    languages: ''
  })

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [errors, setErrors] = useState({})

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
    // Clear error for this field
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }))
    }
  }

  const validateForm = () => {
    const newErrors = {}

    if (!formData.firstName.trim()) newErrors.firstName = 'First name is required'
    if (!formData.lastName.trim()) newErrors.lastName = 'Last name is required'
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email'
    }
    if (!formData.skills.trim()) newErrors.skills = 'Skills are required'
    if (!formData.experience.trim()) newErrors.experience = 'Experience is required'

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!validateForm()) return

    setIsSubmitting(true)

    try {
      // Combine education data with form data
      const profileData = {
        ...educationData,
        ...formData,
        skillsArray: formData.skills.split(',').map(s => s.trim()),
        languagesArray: formData.languages.split(',').map(l => l.trim()).filter(Boolean)
      }

      // Send to backend
      const response = await fetch('/api/profile/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify(profileData)
      })

      if (!response.ok) {
        throw new Error('Failed to create profile')
      }

      const result = await response.json()

      // Navigate to matches
      navigate('/matches', {
        state: { profileId: result.profileId }
      })
    } catch (error) {
      console.error('Error creating profile:', error)
      setErrors({ submit: 'Failed to create profile. Please try again.' })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 p-4">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <h1 className="text-4xl font-bold text-white mb-2">
            📝 Tell Us About Yourself
          </h1>
          <p className="text-slate-400">
            We couldn't extract your CV, but we can create your profile manually
          </p>
        </motion.div>

        {/* Form */}
        <motion.form
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          onSubmit={handleSubmit}
          className="bg-slate-700/50 border border-slate-600 rounded-xl p-8 backdrop-blur-xl"
        >
          {/* Full Name Row */}
          <div className="grid md:grid-cols-2 gap-6 mb-6">
            <div>
              <label className="block text-white font-semibold mb-2">
                First Name
              </label>
              <input
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                className={`w-full bg-slate-600 border rounded-lg px-4 py-3 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  errors.firstName ? 'border-red-500' : 'border-slate-500'
                }`}
                placeholder="John"
              />
              {errors.firstName && (
                <p className="text-red-400 text-sm mt-1">{errors.firstName}</p>
              )}
            </div>

            <div>
              <label className="block text-white font-semibold mb-2">
                Last Name
              </label>
              <input
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                className={`w-full bg-slate-600 border rounded-lg px-4 py-3 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  errors.lastName ? 'border-red-500' : 'border-slate-500'
                }`}
                placeholder="Doe"
              />
              {errors.lastName && (
                <p className="text-red-400 text-sm mt-1">{errors.lastName}</p>
              )}
            </div>
          </div>

          {/* Email */}
          <div className="mb-6">
            <label className="block text-white font-semibold mb-2">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className={`w-full bg-slate-600 border rounded-lg px-4 py-3 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                errors.email ? 'border-red-500' : 'border-slate-500'
              }`}
              placeholder="john@example.com"
            />
            {errors.email && (
              <p className="text-red-400 text-sm mt-1">{errors.email}</p>
            )}
          </div>

          {/* Phone */}
          <div className="mb-6">
            <label className="block text-white font-semibold mb-2">
              Phone (Optional)
            </label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="w-full bg-slate-600 border border-slate-500 rounded-lg px-4 py-3 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="+1 (555) 123-4567"
            />
          </div>

          {/* Skills */}
          <div className="mb-6">
            <label className="block text-white font-semibold mb-2">
              Skills (comma-separated)
            </label>
            <textarea
              name="skills"
              value={formData.skills}
              onChange={handleChange}
              rows="3"
              className={`w-full bg-slate-600 border rounded-lg px-4 py-3 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none ${
                errors.skills ? 'border-red-500' : 'border-slate-500'
              }`}
              placeholder="JavaScript, React, Node.js, Python, Data Analysis"
            />
            {errors.skills && (
              <p className="text-red-400 text-sm mt-1">{errors.skills}</p>
            )}
          </div>

          {/* Experience */}
          <div className="mb-6">
            <label className="block text-white font-semibold mb-2">
              Professional Experience
            </label>
            <textarea
              name="experience"
              value={formData.experience}
              onChange={handleChange}
              rows="3"
              className={`w-full bg-slate-600 border rounded-lg px-4 py-3 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none ${
                errors.experience ? 'border-red-500' : 'border-slate-500'
              }`}
              placeholder="e.g., 2 years as Software Developer at Tech Company..."
            />
            {errors.experience && (
              <p className="text-red-400 text-sm mt-1">{errors.experience}</p>
            )}
          </div>

          {/* Languages */}
          <div className="mb-6">
            <label className="block text-white font-semibold mb-2">
              Languages (comma-separated, optional)
            </label>
            <input
              type="text"
              name="languages"
              value={formData.languages}
              onChange={handleChange}
              className="w-full bg-slate-600 border border-slate-500 rounded-lg px-4 py-3 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="English (Fluent), Turkish (Native), German (Basic)"
            />
          </div>

          {/* Education Summary */}
          {educationData && (
            <div className="mb-6 p-4 bg-blue-500/10 border border-blue-500/30 rounded-lg">
              <p className="text-blue-300 text-sm font-semibold mb-2">
                ℹ️ Education Information
              </p>
              <p className="text-slate-300 text-sm">
                Level: <span className="font-semibold">{educationData.level}</span> | 
                Country: <span className="font-semibold">{educationData.country}</span> | 
                GPA: <span className="font-semibold">{educationData.gpa}</span>
              </p>
            </div>
          )}

          {/* Submit Error */}
          {errors.submit && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="mb-6 p-4 bg-red-500/10 border border-red-500/30 rounded-lg"
            >
              <p className="text-red-400 text-sm">{errors.submit}</p>
            </motion.div>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold py-3 rounded-lg transition-all duration-200 flex items-center justify-center gap-2"
          >
            {isSubmitting ? (
              <>
                <span className="animate-spin">⏳</span>
                Creating Profile...
              </>
            ) : (
              <>
                <span>✓</span>
                Create Profile & Find Matches
              </>
            )}
          </button>
        </motion.form>
      </div>
    </div>
  )
}
