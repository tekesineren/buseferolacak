import React from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'

// Pages
import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
import CVParser from './pages/CVParser'

// New Pages (Add to existing imports)
import OnboardingFlow from './pages/OnboardingFlow'
import EducationQuiz from './pages/EducationQuiz'
import FormFallback from './pages/FormFallback'

// Protected Route
const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem('token')
  return token ? children : <Navigate to="/login" replace />
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* NEW: Onboarding Flow */}
        <Route
          path="/start-matching"
          element={
            <ProtectedRoute>
              <OnboardingFlow />
            </ProtectedRoute>
          }
        />

        {/* NEW: Education Quiz */}
        <Route
          path="/education-quiz"
          element={
            <ProtectedRoute>
              <EducationQuiz />
            </ProtectedRoute>
          }
        />

        {/* CV Parser with fallback */}
        <Route
          path="/cv-parser"
          element={
            <ProtectedRoute>
              <CVParser />
            </ProtectedRoute>
          }
        />

        {/* NEW: Form Fallback (for failed OCR) */}
        <Route
          path="/form-fallback"
          element={
            <ProtectedRoute>
              <FormFallback />
            </ProtectedRoute>
          }
        />

        {/* Catch-all */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  )
}

/**
 * ROUTING FLOW:
 *
 * Home → "Start Matching Now" → /start-matching (OnboardingFlow)
 *   ├─ Upload CV → /cv-parser (CVParser)
 *   │   ├─ Success → CV data extracted
 *   │   └─ Failed → /form-fallback (FormFallback)
 *   └─ Fill Form → /education-quiz (EducationQuiz)
 *       ├─ Select Level → Country → GPA
 *       └─ Continue → /cv-parser or /form-fallback
 */
