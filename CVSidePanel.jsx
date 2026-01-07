import React, { useState } from 'react'
import { motion } from 'framer-motion'

export default function CVSidePanel({ cvFile, onCVParsed, isParsing }) {
  const [showParseButton, setShowParseButton] = useState(false)
  const [parsedData, setParsedData] = useState(null)

  const handleParseCV = async () => {
    if (!cvFile) return

    try {
      const reader = new FileReader()
      reader.onload = async () => {
        const base64String = reader.result.split(',')[1]
        const mimeType = cvFile.type || 'application/pdf'

        const response = await fetch('/api/parse-cv', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          },
          body: JSON.stringify({
            documentBase64: base64String,
            documentType: mimeType
          })
        })

        const result = await response.json()

        if (result.success) {
          setParsedData(result.data)
          onCVParsed(result.data)
        } else {
          alert('CV parsing failed: ' + result.error)
        }
      }
      reader.readAsDataURL(cvFile)
    } catch (error) {
      console.error('Error:', error)
      alert('Failed to parse CV')
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      className="h-full flex flex-col bg-gradient-to-b from-slate-800 to-slate-900 border-l border-slate-700"
    >
      {/* Header */}
      <div className="p-4 border-b border-slate-700">
        <h3 className="text-lg font-bold text-white">📄 CV Parsing</h3>
        <p className="text-xs text-slate-400 mt-1">Optional - Upload & Parse your CV</p>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-4">
        {!cvFile ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="h-full flex flex-col items-center justify-center text-center"
          >
            <div className="text-5xl mb-3">📁</div>
            <p className="text-slate-400 text-sm">
              No CV file selected yet. Upload a CV on the left to see parsed data here.
            </p>
          </motion.div>
        ) : !parsedData ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="space-y-4"
          >
            {/* File Info */}
            <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-3">
              <p className="text-blue-300 text-sm font-semibold truncate">
                ✓ {cvFile.name}
              </p>
              <p className="text-blue-200 text-xs">
                {(cvFile.size / 1024).toFixed(2)} KB
              </p>
            </div>

            {/* Parse Button */}
            <button
              onClick={handleParseCV}
              disabled={isParsing}
              className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold py-3 rounded-lg transition-all duration-200 text-sm"
            >
              {isParsing ? (
                <div className="flex items-center justify-center gap-2">
                  <span className="animate-spin">⏳</span>
                  Parsing...
                </div>
              ) : (
                '🎯 Parse CV with AI'
              )}
            </button>

            <p className="text-slate-500 text-xs text-center">
              Click the button to extract CV data
            </p>
          </motion.div>
        ) : (
          /* Parsed Data Display */
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="space-y-4"
          >
            <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-3">
              <p className="text-green-300 text-sm font-semibold">✅ CV Parsed Successfully!</p>
            </div>

            {/* Skills */}
            {parsedData.skills && parsedData.skills.length > 0 && (
              <div>
                <h4 className="text-sm font-semibold text-white mb-2">🛠️ Skills</h4>
                <div className="flex flex-wrap gap-1">
                  {parsedData.skills.slice(0, 8).map((skill, idx) => (
                    <span
                      key={idx}
                      className="text-xs bg-blue-600/30 text-blue-200 px-2 py-1 rounded border border-blue-500/30"
                    >
                      {skill}
                    </span>
                  ))}
                  {parsedData.skills.length > 8 && (
                    <span className="text-xs text-slate-400 px-2 py-1">
                      +{parsedData.skills.length - 8} more
                    </span>
                  )}
                </div>
              </div>
            )}

            {/* Education */}
            {parsedData.education && parsedData.education.length > 0 && (
              <div>
                <h4 className="text-sm font-semibold text-white mb-2">🎓 Education</h4>
                <div className="space-y-2">
                  {parsedData.education.slice(0, 3).map((edu, idx) => (
                    <div
                      key={idx}
                      className="text-xs bg-slate-700/50 p-2 rounded border border-slate-600"
                    >
                      <p className="text-white font-semibold">{edu.institution || 'Unknown'}</p>
                      <p className="text-slate-300">
                        {edu.degree || ''} {edu.field || ''}
                      </p>
                      {edu.graduation_year && (
                        <p className="text-slate-400">{edu.graduation_year}</p>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Experience */}
            {parsedData.experience && parsedData.experience.length > 0 && (
              <div>
                <h4 className="text-sm font-semibold text-white mb-2">💼 Experience</h4>
                <div className="space-y-2">
                  {parsedData.experience.slice(0, 3).map((exp, idx) => (
                    <div
                      key={idx}
                      className="text-xs bg-slate-700/50 p-2 rounded border border-slate-600"
                    >
                      <p className="text-white font-semibold">{exp.title || 'Position'}</p>
                      <p className="text-slate-300">{exp.company || 'Company'}</p>
                      {exp.duration && (
                        <p className="text-slate-400">{exp.duration}</p>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Languages */}
            {parsedData.languages && parsedData.languages.length > 0 && (
              <div>
                <h4 className="text-sm font-semibold text-white mb-2">🗣️ Languages</h4>
                <div className="space-y-1">
                  {parsedData.languages.slice(0, 4).map((lang, idx) => (
                    <p key={idx} className="text-xs text-slate-300">
                      {lang.language || 'Language'} - {lang.proficiency || 'Level'}
                    </p>
                  ))}
                </div>
              </div>
            )}

            <button
              onClick={() => setParsedData(null)}
              className="w-full bg-slate-700 hover:bg-slate-600 text-white text-sm py-2 rounded transition-colors"
            >
              ↻ Parse Again
            </button>
          </motion.div>
        )}
      </div>
    </motion.div>
  )
}
