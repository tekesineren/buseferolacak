import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import SmartFormSection from '../components/SmartFormSection'
import CVSidePanel from '../components/CVSidePanel'

export default function SmartOnboarding() {
  const navigate = useNavigate()
  const [currentStep, setCurrentStep] = useState(1)
  const [allFormData, setAllFormData] = useState({})
  const [cvFile, setCVFile] = useState(null)
  const [cvParsedData, setCVParsedData] = useState(null)
  const [isParsing, setIsParsing] = useState(false)

  const handleCVFileSelect = (e) => {
    const file = e.target.files?.[0]
    if (file) {
      setCVFile(file)
    }
  }

  const handleFormChange = (sectionData) => {
    setAllFormData(prev => ({
      ...prev,
      ...sectionData
    }))
  }

  const handleCVParsed = (parsedData) => {
    setCVParsedData(parsedData)
  }

  const handleStepChange = (newStep) => {
    if (newStep >= 1 && newStep <= 7) {
      setCurrentStep(newStep)
    } else if (newStep === 8) {
      // All steps completed - go to review
      navigate('/cv-review', {
        state: {
          formData: allFormData,
          cvParsedData: cvParsedData,
          cvFile: cvFile
        }
      })
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-r from-slate-800 to-slate-700 border-b border-slate-600 p-6"
      >
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl font-bold text-white mb-2">
            ✨ Create Your Profile
          </h1>
          <p className="text-slate-400">
            Fill out your information and optionally upload your CV for AI parsing
          </p>
        </div>
      </motion.div>

      {/* Progress Bar */}
      <div className="bg-slate-800 border-b border-slate-700 px-6 py-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-semibold text-white">
              Step {currentStep} of 7
            </span>
            <span className="text-xs text-slate-400">
              {Math.round((currentStep / 7) * 100)}%
            </span>
          </div>
          <motion.div
            className="w-full bg-slate-700 rounded-full h-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <motion.div
              className="bg-gradient-to-r from-blue-500 to-purple-600 h-full rounded-full"
              animate={{ width: `${(currentStep / 7) * 100}%` }}
              transition={{ duration: 0.3 }}
            />
          </motion.div>
        </div>
      </div>

      {/* Main Content - Split Screen */}
      <div className="max-w-7xl mx-auto p-6">
        <div className="grid grid-cols-12 gap-6 h-[calc(100vh-300px)]">
          {/* Left: Form (65%) */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="col-span-12 lg:col-span-8 bg-slate-800 rounded-xl border border-slate-700 p-6 overflow-hidden flex flex-col"
          >
            <SmartFormSection
              onFormChange={handleFormChange}
              currentStep={currentStep}
              onStepChange={handleStepChange}
            />
          </motion.div>

          {/* Right: CV Panel (35%) */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="col-span-12 lg:col-span-4 rounded-xl overflow-hidden flex flex-col"
          >
            <div className="flex-1 flex flex-col bg-slate-800 border border-slate-700 rounded-xl overflow-hidden">
              {/* CV Upload */}
              <div className="p-4 border-b border-slate-700 bg-slate-750">
                <label className="flex items-center justify-center gap-2 p-4 border-2 border-dashed border-slate-600 rounded-lg cursor-pointer hover:border-blue-500 hover:bg-blue-500/5 transition-colors">
                  <span className="text-2xl">📤</span>
                  <div>
                    <p className="text-sm font-semibold text-white">Upload CV</p>
                    <p className="text-xs text-slate-400">PDF, DOC, DOCX</p>
                  </div>
                  <input
                    type="file"
                    accept=".pdf,.doc,.docx"
                    onChange={handleCVFileSelect}
                    className="hidden"
                  />
                </label>
              </div>

              {/* CV Side Panel */}
              <CVSidePanel
                cvFile={cvFile}
                onCVParsed={handleCVParsed}
                isParsing={isParsing}
              />
            </div>
          </motion.div>
        </div>
      </div>

      {/* Mobile Hint */}
      <div className="lg:hidden p-4 text-center">
        <p className="text-xs text-slate-500">
          💡 View on desktop for optimal split-screen experience
        </p>
      </div>
    </div>
  )
}
