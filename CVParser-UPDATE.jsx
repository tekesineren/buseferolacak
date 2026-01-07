import React, { useState, useRef } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { motion } from 'framer-motion'

export default function CVParser() {
  const navigate = useNavigate()
  const location = useLocation()
  const educationData = location.state?.educationData

  const fileInputRef = useRef(null)
  const [file, setFile] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const [progress, setProgress] = useState(0)
  const [parseResult, setParseResult] = useState(null)

  const handleFileSelect = (e) => {
    const selectedFile = e.target.files?.[0]
    if (selectedFile) {
      setFile(selectedFile)
      setError('')
      setProgress(0)
      setParseResult(null)
    }
  }

  const handleDragOver = (e) => {
    e.preventDefault()
    e.currentTarget.classList.add('border-blue-500', 'bg-blue-500/10')
  }

  const handleDragLeave = (e) => {
    e.currentTarget.classList.remove('border-blue-500', 'bg-blue-500/10')
  }

  const handleDrop = (e) => {
    e.preventDefault()
    e.currentTarget.classList.remove('border-blue-500', 'bg-blue-500/10')
    const droppedFile = e.dataTransfer.files?.[0]
    if (droppedFile) {
      setFile(droppedFile)
      setError('')
      setProgress(0)
      setParseResult(null)
    }
  }

  const uploadAndParse = async () => {
    if (!file) {
      setError('Please select a CV file')
      return
    }

    setIsLoading(true)
    setProgress(0)
    setError('')

    try {
      // Read file as base64
      const reader = new FileReader()

      reader.onprogress = (e) => {
        const percentComplete = Math.round((e.loaded / e.total) * 40) // 0-40% for upload
        setProgress(percentComplete)
      }

      reader.onload = async () => {
        try {
          setProgress(50) // 50% - uploading to API

          const base64String = reader.result.split(',')[1]
          const mimeType = file.type || 'application/pdf'

          // Send to backend
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

          setProgress(80) // 80% - processing

          const result = await response.json()

          setProgress(100) // 100% - done

          if (result.success) {
            // ✅ OCR SUCCESS
            setParseResult(result.data)
            console.log('✅ CV Parsed successfully:', result.data)

            // Wait a moment then navigate to review
            setTimeout(() => {
              navigate('/cv-review', {
                state: {
                  parsedData: result.data,
                  educationData: educationData
                }
              })
            }, 1000)
          } else {
            // ❌ OCR FAILED - SHOW FALLBACK OPTION
            console.error('❌ OCR parsing failed:', result.error)
            setError(result.error || 'Failed to parse CV')

            if (result.fallbackRequired) {
              // Show option to use form instead
              setParseResult({
                fallbackRequired: true,
                error: result.error
              })
            }
          }
        } catch (parseError) {
          console.error('Error:', parseError)
          setError('Failed to process CV. Please try the form instead.')
          setParseResult({
            fallbackRequired: true,
            error: 'Processing error'
          })
        }
      }

      reader.onerror = () => {
        setError('Failed to read file')
        setIsLoading(false)
      }

      reader.readAsDataURL(file)
    } catch (err) {
      console.error('Upload error:', err)
      setError('Failed to upload file')
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 p-4">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-bold text-white mb-2">
            📄 Upload Your CV
          </h1>
          <p className="text-slate-400">
            Let our AI analyze your CV and extract your profile information
          </p>
        </motion.div>

        {/* Upload Section */}
        {!parseResult ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            {/* Drop Zone */}
            <div
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              className="border-2 border-dashed border-slate-600 hover:border-slate-400 rounded-xl p-12 text-center transition-colors cursor-pointer bg-slate-700/20"
              onClick={() => fileInputRef.current?.click()}
            >
              <div className="text-5xl mb-4">📁</div>
              <h3 className="text-xl font-semibold text-white mb-2">
                Drop your CV here
              </h3>
              <p className="text-slate-400 mb-4">
                or click to select (PDF, DOC, DOCX)
              </p>
              <input
                ref={fileInputRef}
                type="file"
                accept=".pdf,.doc,.docx,.txt"
                onChange={handleFileSelect}
                className="hidden"
              />
            </div>

            {/* Selected File Info */}
            {file && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-4"
              >
                <p className="text-blue-300 font-semibold">
                  ✓ Selected: {file.name}
                </p>
                <p className="text-blue-200 text-sm">
                  {(file.size / 1024).toFixed(2)} KB
                </p>
              </motion.div>
            )}

            {/* Error Message */}
            {error && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="bg-red-500/10 border border-red-500/30 rounded-lg p-4"
              >
                <p className="text-red-400 font-semibold">⚠️ {error}</p>
              </motion.div>
            )}

            {/* Parse Button */}
            <button
              onClick={uploadAndParse}
              disabled={!file || isLoading}
              className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold py-4 rounded-lg transition-all duration-200"
            >
              {isLoading ? (
                <div className="flex items-center justify-center gap-2">
                  <span className="animate-spin">⏳</span>
                  Analyzing CV... ({progress}%)
                </div>
              ) : (
                '✓ Analyze CV with AI'
              )}
            </button>

            {/* Progress Bar */}
            {isLoading && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="w-full bg-slate-700 rounded-full h-2"
              >
                <motion.div
                  className="bg-gradient-to-r from-blue-500 to-purple-500 h-full rounded-full"
                  animate={{ width: `${progress}%` }}
                  transition={{ duration: 0.3 }}
                />
              </motion.div>
            )}

            {/* Alternative Option */}
            <div className="text-center">
              <p className="text-slate-400 text-sm mb-2">
                Prefer to fill out a form instead?
              </p>
              <button
                onClick={() =>
                  navigate('/profile-form', { state: { educationData } })
                }
                className="text-blue-400 hover:text-blue-300 font-semibold transition-colors"
              >
                Use Form Instead →
              </button>
            </div>
          </motion.div>
        ) : (
          /* Fallback Form Option */
          parseResult.fallbackRequired && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-yellow-500/10 border border-yellow-500/30 rounded-xl p-8 text-center"
            >
              <div className="text-5xl mb-4">⚠️</div>
              <h2 className="text-2xl font-bold text-white mb-2">
                Couldn't Parse CV
              </h2>
              <p className="text-slate-400 mb-6">
                We couldn't automatically extract your CV information. Please fill
                out the form instead.
              </p>
              <button
                onClick={() =>
                  navigate('/form-fallback', {
                    state: { educationData }
                  })
                }
                className="bg-gradient-to-r from-yellow-500 to-orange-600 hover:from-yellow-600 hover:to-orange-700 text-white font-semibold py-3 px-8 rounded-lg transition-all duration-200 inline-block"
              >
                Fill Form Instead →
              </button>
            </motion.div>
          )
        )}
      </div>
    </div>
  )
}
