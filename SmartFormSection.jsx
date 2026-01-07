import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { formSections, validateField, getVisibleFields } from '../config/formConfig'

export default function SmartFormSection({ onFormChange, currentStep, onStepChange }) {
  const [formData, setFormData] = useState({})
  const [errors, setErrors] = useState({})
  const [touched, setTouched] = useState({})

  const section = formSections[currentStep - 1]
  const visibleFields = getVisibleFields(section, formData)

  const handleFieldChange = (fieldId, value) => {
    const newData = { ...formData, [fieldId]: value }
    setFormData(newData)
    
    // Revalidate if touched
    if (touched[fieldId]) {
      validateFormField(fieldId, value)
    }

    // Notify parent
    onFormChange(newData)
  }

  const handleFieldBlur = (fieldId) => {
    setTouched(prev => ({ ...prev, [fieldId]: true }))
    const field = visibleFields.find(f => f.id === fieldId)
    if (field) {
      validateFormField(fieldId, formData[fieldId])
    }
  }

  const validateFormField = (fieldId, value) => {
    const field = visibleFields.find(f => f.id === fieldId)
    if (!field) return

    const error = validateField(field, value)
    setErrors(prev => ({
      ...prev,
      [fieldId]: error
    }))
  }

  const validateSection = () => {
    const sectionErrors = {}
    let hasErrors = false

    visibleFields.forEach(field => {
      const error = validateField(field, formData[field.id])
      if (error) {
        sectionErrors[field.id] = error
        hasErrors = true
      }
    })

    setErrors(sectionErrors)
    setTouched(
      visibleFields.reduce((acc, f) => ({ ...acc, [f.id]: true }), {})
    )

    return !hasErrors
  }

  const handleNext = () => {
    if (validateSection()) {
      onStepChange(currentStep + 1)
    }
  }

  const handlePrev = () => {
    onStepChange(currentStep - 1)
  }

  const renderField = (field) => {
    const value = formData[field.id] || ''
    const error = errors[field.id]
    const isTouched = touched[field.id]

    switch (field.type) {
      case 'text':
      case 'email':
        return (
          <motion.div
            key={field.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-4"
          >
            <label className="block text-sm font-semibold text-white mb-2">
              {field.label} {field.required && <span className="text-red-400">*</span>}
            </label>
            <input
              type={field.type}
              value={value}
              onChange={(e) => handleFieldChange(field.id, e.target.value)}
              onBlur={() => handleFieldBlur(field.id)}
              placeholder={field.placeholder}
              className={`w-full bg-slate-600 border rounded-lg px-4 py-2 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                isTouched && error ? 'border-red-500' : 'border-slate-500'
              }`}
            />
            {isTouched && error && (
              <p className="text-red-400 text-xs mt-1">⚠️ {error}</p>
            )}
          </motion.div>
        )

      case 'number':
        return (
          <motion.div
            key={field.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-4"
          >
            <label className="block text-sm font-semibold text-white mb-2">
              {field.label} {field.required && <span className="text-red-400">*</span>}
            </label>
            <input
              type="number"
              value={value}
              onChange={(e) => handleFieldChange(field.id, e.target.value)}
              onBlur={() => handleFieldBlur(field.id)}
              placeholder={field.placeholder}
              min={field.min}
              max={field.max}
              step={field.step || 1}
              className={`w-full bg-slate-600 border rounded-lg px-4 py-2 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                isTouched && error ? 'border-red-500' : 'border-slate-500'
              }`}
            />
            {isTouched && error && (
              <p className="text-red-400 text-xs mt-1">⚠️ {error}</p>
            )}
          </motion.div>
        )

      case 'date':
        return (
          <motion.div
            key={field.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-4"
          >
            <label className="block text-sm font-semibold text-white mb-2">
              {field.label} {field.required && <span className="text-red-400">*</span>}
            </label>
            <input
              type="date"
              value={value}
              onChange={(e) => handleFieldChange(field.id, e.target.value)}
              onBlur={() => handleFieldBlur(field.id)}
              className={`w-full bg-slate-600 border rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                isTouched && error ? 'border-red-500' : 'border-slate-500'
              }`}
            />
            {isTouched && error && (
              <p className="text-red-400 text-xs mt-1">⚠️ {error}</p>
            )}
          </motion.div>
        )

      case 'select':
        return (
          <motion.div
            key={field.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-4"
          >
            <label className="block text-sm font-semibold text-white mb-2">
              {field.label} {field.required && <span className="text-red-400">*</span>}
            </label>
            {field.multiple ? (
              <div className="space-y-2">
                {field.options.map(option => (
                  <label key={option.value} className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={(Array.isArray(value) ? value : []).includes(option.value)}
                      onChange={(e) => {
                        const newValue = e.target.checked
                          ? [...(Array.isArray(value) ? value : []), option.value]
                          : (Array.isArray(value) ? value : []).filter(v => v !== option.value)
                        handleFieldChange(field.id, newValue)
                      }}
                      className="w-4 h-4 rounded border-slate-500"
                    />
                    <span className="text-white text-sm">{option.label}</span>
                  </label>
                ))}
              </div>
            ) : (
              <select
                value={value}
                onChange={(e) => handleFieldChange(field.id, e.target.value)}
                onBlur={() => handleFieldBlur(field.id)}
                className={`w-full bg-slate-600 border rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  isTouched && error ? 'border-red-500' : 'border-slate-500'
                }`}
              >
                <option value="">Seçiniz...</option>
                {field.options.map(opt => (
                  <option key={opt.value} value={opt.value}>{opt.label}</option>
                ))}
              </select>
            )}
            {isTouched && error && (
              <p className="text-red-400 text-xs mt-1">⚠️ {error}</p>
            )}
          </motion.div>
        )

      case 'checkbox':
        return (
          <motion.div
            key={field.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-4 flex items-center gap-2"
          >
            <input
              type="checkbox"
              id={field.id}
              checked={value === true}
              onChange={(e) => handleFieldChange(field.id, e.target.checked)}
              className="w-5 h-5 rounded border-slate-500 cursor-pointer"
            />
            <label htmlFor={field.id} className="text-white text-sm cursor-pointer">
              {field.label}
            </label>
          </motion.div>
        )

      case 'textarea':
        return (
          <motion.div
            key={field.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-4"
          >
            <label className="block text-sm font-semibold text-white mb-2">
              {field.label} {field.required && <span className="text-red-400">*</span>}
            </label>
            <textarea
              value={value}
              onChange={(e) => handleFieldChange(field.id, e.target.value)}
              onBlur={() => handleFieldBlur(field.id)}
              placeholder={field.placeholder}
              rows="3"
              className={`w-full bg-slate-600 border rounded-lg px-4 py-2 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none ${
                isTouched && error ? 'border-red-500' : 'border-slate-500'
              }`}
            />
            {isTouched && error && (
              <p className="text-red-400 text-xs mt-1">⚠️ {error}</p>
            )}
          </motion.div>
        )

      case 'url':
        return (
          <motion.div
            key={field.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-4"
          >
            <label className="block text-sm font-semibold text-white mb-2">
              {field.label}
              {field.required && <span className="text-red-400">*</span>}
            </label>
            <input
              type="url"
              value={value}
              onChange={(e) => handleFieldChange(field.id, e.target.value)}
              onBlur={() => handleFieldBlur(field.id)}
              placeholder={field.placeholder}
              className={`w-full bg-slate-600 border rounded-lg px-4 py-2 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                isTouched && error ? 'border-red-500' : 'border-slate-500'
              }`}
            />
            {isTouched && error && (
              <p className="text-red-400 text-xs mt-1">⚠️ {error}</p>
            )}
          </motion.div>
        )

      case 'array':
        return (
          <motion.div
            key={field.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-4 p-4 bg-slate-700/30 rounded-lg border border-slate-600"
          >
            <label className="block text-sm font-semibold text-white mb-3">
              {field.label} {field.required && <span className="text-red-400">*</span>}
            </label>
            <div className="space-y-3">
              {Array.isArray(value) && value.length > 0 ? (
                value.map((item, idx) => (
                  <div key={idx} className="p-3 bg-slate-600 rounded-lg">
                    {field.fields.map(subField => (
                      <div key={subField.id} className="mb-2">
                        <input
                          type={subField.type === 'select' ? 'text' : subField.type}
                          value={item[subField.id] || ''}
                          onChange={(e) => {
                            const newArr = [...value]
                            newArr[idx] = { ...item, [subField.id]: e.target.value }
                            handleFieldChange(field.id, newArr)
                          }}
                          placeholder={subField.label}
                          className="w-full bg-slate-500 border border-slate-400 rounded px-3 py-1 text-white text-sm placeholder-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500 mb-1"
                        />
                      </div>
                    ))}
                    <button
                      onClick={() => {
                        const newArr = value.filter((_, i) => i !== idx)
                        handleFieldChange(field.id, newArr)
                      }}
                      className="text-red-400 text-xs hover:text-red-300"
                    >
                      ✕ Sil
                    </button>
                  </div>
                ))
              ) : null}
              <button
                onClick={() => {
                  const newItem = field.fields.reduce((acc, f) => ({ ...acc, [f.id]: '' }), {})
                  handleFieldChange(field.id, [...(Array.isArray(value) ? value : []), newItem])
                }}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white text-sm py-2 rounded transition-colors"
              >
                + {field.label} Ekle
              </button>
            </div>
          </motion.div>
        )

      default:
        return null
    }
  }

  return (
    <div className="h-full flex flex-col">
      {/* Section Title */}
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-white mb-1">{section.title}</h2>
        <p className="text-slate-400">{section.description}</p>
      </div>

      {/* Fields */}
      <div className="flex-1 overflow-y-auto pr-4 space-y-2">
        {visibleFields.map(field => renderField(field))}
      </div>

      {/* Navigation */}
      <div className="flex gap-3 mt-6 pt-6 border-t border-slate-600">
        <button
          onClick={handlePrev}
          disabled={currentStep === 1}
          className="flex-1 bg-slate-700 hover:bg-slate-600 disabled:opacity-50 disabled:cursor-not-allowed text-white py-2 rounded-lg transition-colors"
        >
          ← Geri
        </button>
        <button
          onClick={handleNext}
          className="flex-1 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white py-2 rounded-lg transition-colors"
        >
          {currentStep === 7 ? 'Tamamla ✓' : 'İleri →'}
        </button>
      </div>
    </div>
  )
}
