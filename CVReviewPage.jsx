import React, { useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { motion } from 'framer-motion'

export default function CVReviewPage() {
  const navigate = useNavigate()
  const location = useLocation()
  const { formData = {}, cvParsedData = {}, cvFile } = location.state || {}

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [activeTab, setActiveTab] = useState('form')

  const handleSubmit = async () => {
    setIsSubmitting(true)
    try {
      const payload = {
        formData,
        cvParsedData: cvParsedData || null,
        cvFileName: cvFile?.name || null,
        timestamp: new Date().toISOString()
      }

      // Save to Supabase
      const response = await fetch('/api/save-profile', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify(payload)
      })

      const result = await response.json()

      if (result.success) {
        // Navigate to matches
        navigate('/matches', {
          state: { profileId: result.profileId }
        })
      } else {
        alert('Error saving profile: ' + result.error)
      }
    } catch (error) {
      console.error('Error:', error)
      alert('Failed to save profile')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-r from-slate-800 to-slate-700 border-b border-slate-600 p-6"
      >
        <div className="max-w-6xl mx-auto">
          <h1 className="text-3xl font-bold text-white mb-2">
            ✅ Review Your Profile
          </h1>
          <p className="text-slate-400">
            Check all information before submitting
          </p>
        </div>
      </motion.div>

      {/* Content */}
      <div className="max-w-6xl mx-auto p-6">
        {/* Tabs */}
        <div className="flex gap-2 mb-6 border-b border-slate-700">
          <button
            onClick={() => setActiveTab('form')}
            className={`px-4 py-2 font-semibold border-b-2 transition-all ${
              activeTab === 'form'
                ? 'text-white border-blue-500'
                : 'text-slate-400 border-transparent hover:text-white'
            }`}
          >
            📋 Form Data
          </button>
          {cvParsedData && Object.keys(cvParsedData).length > 0 && (
            <button
              onClick={() => setActiveTab('cv')}
              className={`px-4 py-2 font-semibold border-b-2 transition-all ${
                activeTab === 'cv'
                  ? 'text-white border-blue-500'
                  : 'text-slate-400 border-transparent hover:text-white'
              }`}
            >
              📄 CV Data
            </button>
          )}
        </div>

        {/* Form Data Tab */}
        {activeTab === 'form' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="grid grid-cols-1 lg:grid-cols-2 gap-6"
          >
            {/* Personal Info */}
            <div className="bg-slate-800 rounded-xl border border-slate-700 p-6">
              <h3 className="text-lg font-bold text-white mb-4">👤 Personal Info</h3>
              <div className="space-y-3">
                <div>
                  <p className="text-sm text-slate-400">Ad Soyad</p>
                  <p className="text-white font-semibold">
                    {formData.firstName} {formData.lastName}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-slate-400">E-posta</p>
                  <p className="text-white">{formData.email}</p>
                </div>
                <div>
                  <p className="text-sm text-slate-400">Doğum Tarihi</p>
                  <p className="text-white">{formData.birthDate}</p>
                </div>
                <div>
                  <p className="text-sm text-slate-400">Uyruk</p>
                  <p className="text-white">{formData.nationality}</p>
                </div>
              </div>
            </div>

            {/* Education */}
            <div className="bg-slate-800 rounded-xl border border-slate-700 p-6">
              <h3 className="text-lg font-bold text-white mb-4">🎓 Education</h3>
              <div className="space-y-3">
                <div>
                  <p className="text-sm text-slate-400">Target Level</p>
                  <p className="text-white font-semibold">
                    {formData.targetEducationLevel}
                  </p>
                </div>
                {formData.universityName && (
                  <div>
                    <p className="text-sm text-slate-400">University</p>
                    <p className="text-white">{formData.universityName}</p>
                  </div>
                )}
                {formData.major && (
                  <div>
                    <p className="text-sm text-slate-400">Major</p>
                    <p className="text-white">{formData.major}</p>
                  </div>
                )}
                {formData.gpa && (
                  <div>
                    <p className="text-sm text-slate-400">GPA</p>
                    <p className="text-white font-semibold">{formData.gpa}/4.0</p>
                  </div>
                )}
              </div>
            </div>

            {/* Career */}
            <div className="bg-slate-800 rounded-xl border border-slate-700 p-6">
              <h3 className="text-lg font-bold text-white mb-4">🎯 Career</h3>
              <div className="space-y-3">
                <div>
                  <p className="text-sm text-slate-400">Primary Goal</p>
                  <p className="text-white">{formData.careerGoal1}</p>
                </div>
                <div>
                  <p className="text-sm text-slate-400">Dream Career</p>
                  <p className="text-white text-sm">{formData.dreamCareer}</p>
                </div>
              </div>
            </div>

            {/* Budget & Preferences */}
            <div className="bg-slate-800 rounded-xl border border-slate-700 p-6">
              <h3 className="text-lg font-bold text-white mb-4">💰 Preferences</h3>
              <div className="space-y-3">
                <div>
                  <p className="text-sm text-slate-400">Annual Budget</p>
                  <p className="text-white font-semibold">
                    ${formData.annualBudget}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-slate-400">Preferred Countries</p>
                  <p className="text-white text-sm">
                    {Array.isArray(formData.preferredCountries)
                      ? formData.preferredCountries.join(', ')
                      : formData.preferredCountries}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-slate-400">Preferred Fields</p>
                  <p className="text-white text-sm">
                    {formData.preferredFields}
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* CV Data Tab */}
        {activeTab === 'cv' && cvParsedData && Object.keys(cvParsedData).length > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="grid grid-cols-1 lg:grid-cols-2 gap-6"
          >
            {/* Skills */}
            {cvParsedData.skills && cvParsedData.skills.length > 0 && (
              <div className="bg-slate-800 rounded-xl border border-slate-700 p-6">
                <h3 className="text-lg font-bold text-white mb-4">🛠️ Skills</h3>
                <div className="flex flex-wrap gap-2">
                  {cvParsedData.skills.map((skill, idx) => (
                    <span
                      key={idx}
                      className="bg-blue-600/30 text-blue-200 px-3 py-1 rounded-full text-sm border border-blue-500/30"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Education from CV */}
            {cvParsedData.education && cvParsedData.education.length > 0 && (
              <div className="bg-slate-800 rounded-xl border border-slate-700 p-6">
                <h3 className="text-lg font-bold text-white mb-4">🎓 Education (CV)</h3>
                <div className="space-y-3">
                  {cvParsedData.education.map((edu, idx) => (
                    <div key={idx} className="p-3 bg-slate-700/50 rounded border border-slate-600">
                      <p className="text-white font-semibold text-sm">
                        {edu.institution}
                      </p>
                      <p className="text-slate-300 text-xs">
                        {edu.degree} {edu.field}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Experience */}
            {cvParsedData.experience && cvParsedData.experience.length > 0 && (
              <div className="bg-slate-800 rounded-xl border border-slate-700 p-6">
                <h3 className="text-lg font-bold text-white mb-4">💼 Experience</h3>
                <div className="space-y-3">
                  {cvParsedData.experience.map((exp, idx) => (
                    <div key={idx} className="p-3 bg-slate-700/50 rounded border border-slate-600">
                      <p className="text-white font-semibold text-sm">{exp.title}</p>
                      <p className="text-slate-300 text-xs">{exp.company}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Languages */}
            {cvParsedData.languages && cvParsedData.languages.length > 0 && (
              <div className="bg-slate-800 rounded-xl border border-slate-700 p-6">
                <h3 className="text-lg font-bold text-white mb-4">🗣️ Languages</h3>
                <div className="space-y-2">
                  {cvParsedData.languages.map((lang, idx) => (
                    <p key={idx} className="text-slate-300 text-sm">
                      {lang.language} - {lang.proficiency}
                    </p>
                  ))}
                </div>
              </div>
            )}
          </motion.div>
        )}

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex gap-3 mt-8 pt-6 border-t border-slate-700"
        >
          <button
            onClick={() => navigate('/start-matching')}
            className="flex-1 bg-slate-700 hover:bg-slate-600 text-white py-3 rounded-lg transition-colors"
          >
            ← Go Back
          </button>
          <button
            onClick={handleSubmit}
            disabled={isSubmitting}
            className="flex-1 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold py-3 rounded-lg transition-colors"
          >
            {isSubmitting ? '⏳ Saving...' : '✅ Confirm & Find Matches'}
          </button>
        </motion.div>
      </div>
    </div>
  )
}
