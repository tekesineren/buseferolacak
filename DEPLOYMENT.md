# 🚀 SMART ONBOARDING DEPLOYMENT GUIDE

## 📋 FILES CREATED

### Config
- ✅ `src/config/formConfig.js` - 7 sections, validation, conditional logic

### Components  
- ✅ `src/components/SmartFormSection.jsx` - Form renderer (all field types)
- ✅ `src/components/CVSidePanel.jsx` - CV upload & parsing display

### Pages
- ✅ `src/pages/SmartOnboarding.jsx` - Split-screen container (65/35)
- ✅ `src/pages/CVReviewPage.jsx` - Form + CV review before submit

### Routes
- ✅ `App-ROUTES-UPDATE.jsx` - New routes setup

---

## 🔧 INSTALLATION STEPS

### Step 1: Copy Files
```bash
# Create directories
mkdir -p src/config
mkdir -p src/components

# Copy files
cp formConfig.js src/config/
cp SmartFormSection.jsx src/components/
cp CVSidePanel.jsx src/components/
cp SmartOnboarding.jsx src/pages/
cp CVReviewPage.jsx src/pages/
```

### Step 2: Update App.jsx
Replace your current `src/App.jsx` with content from `App-ROUTES-UPDATE.jsx`

### Step 3: Install Dependencies (if needed)
```bash
npm install framer-motion  # Already installed probably
```

### Step 4: Update Home Page Button
In `src/pages/Home.jsx`, update the button that should trigger onboarding:
```jsx
<button onClick={() => navigate('/start-matching')}>
  Let's Start a Match 🚀
</button>
```

### Step 5: Create Backend Endpoint
Create `/api/save-profile` endpoint in your backend:
```javascript
// backend/routes/profile.js
POST /api/save-profile
- Accepts: { formData, cvParsedData, cvFileName }
- Saves to Supabase 'profiles' table
- Returns: { success: true, profileId: "..." }
```

---

## 🎨 FEATURES INCLUDED

### ✅ 7-Section Smart Form
1. **Program Type** - Select from 5 options
2. **Personal & Academic** - Name, email, dates, education level
3. **Career Goals** - Career goals, research interests, work experience
4. **Visa History** - Checkboxes for visa-related questions
5. **Languages & Tests** - SAT, TOEFL, IELTS, GRE scores + languages
6. **Sports/Arts** - Scholarship interests + activities (dynamic array)
7. **Budget & Preferences** - Annual budget, countries, fields

### ✅ Conditional Fields
- Lise/Lisans/Masters/PhD - Different fields shown based on selection
- Work Experience - Only show if "Var" selected
- Sports Activities - Only show if "Var" selected

### ✅ Validation
- All fields required (as per your request)
- Email validation
- Number range validation (min/max)
- Dynamic validation on blur
- Full section validation before next step

### ✅ Split-Screen (65/35)
- **Left 65%**: Form (scrollable, full section visible)
- **Right 35%**: CV upload + parsing display
- Responsive (mobile: stacked)

### ✅ CV Parsing
- Upload PDF/DOC/DOCX
- Click "Parse CV with AI" button
- Display: Skills, Education, Experience, Languages
- Optional (not required)

### ✅ Progress Tracking
- Step indicator (1/7, 2/7, etc)
- Progress bar (animated)
- Back/Next buttons with validation

### ✅ Review Page
- Two tabs: Form Data + CV Data
- See exactly what will be saved
- Edit button (go back to form)
- Final "Confirm & Find Matches" button
- Saves to Supabase + navigates to /matches

---

## 🔌 API ENDPOINTS NEEDED

### 1. `/api/parse-cv` (EXISTING)
Should already be working from before
```
POST /api/parse-cv
Body: { documentBase64, documentType }
Response: { success: true, data: { skills, education, experience, languages } }
```

### 2. `/api/save-profile` (NEW - CREATE THIS)
```
POST /api/save-profile
Headers: { Authorization: Bearer {token} }
Body: {
  formData: { firstName, lastName, email, ... },
  cvParsedData: { skills, education, ... },
  cvFileName: "resume.pdf",
  timestamp: "2024-01-07T20:00:00Z"
}
Response: {
  success: true,
  profileId: "uuid-from-supabase"
}
```

---

## 🗄️ SUPABASE TABLE STRUCTURE

Create `profiles` table:
```sql
CREATE TABLE profiles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id),
  
  -- Form Data (JSONB for flexibility)
  form_data JSONB,
  
  -- CV Data (Optional)
  cv_data JSONB,
  cv_file_name TEXT,
  
  -- Metadata
  created_at TIMESTAMP DEFAULT now(),
  updated_at TIMESTAMP DEFAULT now(),
  
  UNIQUE(user_id)
);

-- Create index for user lookups
CREATE INDEX profiles_user_id_idx ON profiles(user_id);
```

---

## 🚀 GIT PUSH

```bash
# Add all files
git add .

# Commit
git commit -m "feat: Smart 7-section form with split-screen CV parsing (65/35 layout)"

# Push
git push origin main
```

---

## 📱 MOBILE RESPONSIVENESS

- Desktop (lg): 65/35 split-screen
- Tablet/Mobile: Stacked (100%)
- Form scrolls vertically
- CV panel below on mobile

---

## ⚠️ IMPORTANT NOTES

1. **Validation**: All 7 sections have required validation
2. **Conditional Logic**: Fields appear/disappear based on selections
3. **Array Fields**: Work Experience, Sports Activities can have multiple entries
4. **Progress**: Shows 1/7, 2/7, ... 7/7 as user progresses
5. **Review Page**: Data can be reviewed before final submit
6. **Supabase**: Profile saved with form + CV data combined

---

## 🎯 NEXT STEPS (After Deploy)

1. Test form with all 7 sections
2. Verify CV parsing works
3. Check Supabase records saving correctly
4. Test validation errors
5. Verify mobile responsiveness
6. Create /matches page (shows university matches)

---

## 💡 CUSTOMIZATION TIPS

### Add more countries?
Edit `formConfig.js` → section 7 → preferredCountries options

### Change validation rules?
Edit `formConfig.js` → validateField function

### Change colors/styles?
All components use Tailwind + design system tokens
Edit `className` attributes in component files

### Add new field?
1. Add to `formConfig.js` section
2. Validation rule in `validateField`
3. Render logic already handles all types

---

**You're all set! 🎉 Push to git and test!**
