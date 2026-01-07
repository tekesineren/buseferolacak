import React from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'

// Pages
import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'

// NEW: Smart Onboarding Pages
import SmartOnboarding from './pages/SmartOnboarding'
import CVReviewPage from './pages/CVReviewPage'

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

        {/* NEW: Smart Onboarding (Split-screen Form + CV) */}
        <Route
          path="/start-matching"
          element={
            <ProtectedRoute>
              <SmartOnboarding />
            </ProtectedRoute>
          }
        />

        {/* NEW: CV Review (Form + CV Combined Review) */}
        <Route
          path="/cv-review"
          element={
            <ProtectedRoute>
              <CVReviewPage />
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
 * UPDATED ROUTING FLOW:
 *
 * Home → "Start Matching Now" → /start-matching (SmartOnboarding)
 *   ├─ LEFT SIDE: 7-Step Form (Progress 1/7 - 7/7)
 *   │   ├─ Section 1: Program Type
 *   │   ├─ Section 2: Personal & Academic Info
 *   │   ├─ Section 3: Career Goals
 *   │   ├─ Section 4: Visa History
 *   │   ├─ Section 5: Languages & Test Scores
 *   │   ├─ Section 6: Sports/Arts & Scholarships
 *   │   └─ Section 7: Budget & Preferences
 *   │
 *   └─ RIGHT SIDE: CV Upload & Parsing (Optional)
 *       ├─ Upload CV (PDF, DOC, DOCX)
 *       ├─ Click "Parse CV with AI"
 *       └─ View parsed data (Skills, Education, Experience, Languages)
 *
 * After Step 7 Completed → /cv-review (CVReviewPage)
 *   ├─ Tab 1: Review Form Data
 *   ├─ Tab 2: Review CV Data (if uploaded)
 *   └─ "Confirm & Find Matches" → /matches (with profileId)
 *       └─ Save to Supabase + Show university matches
 */
