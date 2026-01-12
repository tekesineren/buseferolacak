# 🎓 Ventora.ai University Matching Algorithm

A sophisticated, multi-factor university matching algorithm designed to help students find the best graduate programs based on their academic profile, preferences, and application readiness.

## 🌟 Features

### Core Matching Engine
- **Multi-dimensional scoring** across 5 major categories:
  - Academic (GPA, test scores, research, publications)
  - Profile (references, extracurriculars, leadership)
  - Financial (affordability, funding availability)
  - Preference (location, program fit, career alignment)
  - Documents (completeness, quality, deadlines)

- **Match categorization**: Safety, Match, Reach, Far Reach
- **Admission chance estimation** based on historical data
- **Actionable insights** for each match

### Analyzers
- **SOP Analyzer**: AI-powered Statement of Purpose quality assessment
- **Reference Analyzer**: Evaluate and optimize recommendation letters

### UI Components
- **MatchResults**: Ready-to-use React component for displaying matches

## 📦 Installation

```bash
npm install ventora-matching
# or
yarn add ventora-matching
```

## 🚀 Quick Start

```typescript
import { MatchingService, UserProfile, University } from 'ventora-matching';

// Initialize the service
const matchingService = new MatchingService();

// Get matches
const response = await matchingService.getMatches(userProfile, universities);

if (response.success) {
  console.log(`Found ${response.data.matches.length} matching programs`);
  
  response.data.matches.forEach(match => {
    console.log(`
      ${match.university.name} - ${match.program.name}
      Category: ${match.matchCategory}
      Score: ${match.overallScore}/100
      Admission Chance: ${match.estimatedChance}%
    `);
  });
}
```

## 📊 Scoring System

### Weight Distribution (Configurable)

| Category | Default Weight | Description |
|----------|---------------|-------------|
| Academic | 35% | GPA, test scores, research, publications |
| Profile | 25% | References, extracurriculars, leadership |
| Financial | 15% | Budget match, funding availability |
| Preference | 15% | Location, program fit, career goals |
| Documents | 10% | Completeness, quality, deadlines |

### Match Categories

| Category | Admission Chance | Description |
|----------|-----------------|-------------|
| Safety | ≥75% | High likelihood of admission |
| Match | 45-74% | Good fit, reasonable chance |
| Reach | 20-44% | Competitive, possible with strong app |
| Far Reach | <20% | Highly competitive, lower probability |

## 🔧 Configuration

```typescript
const matchingService = new MatchingService({
  weights: {
    academic: 0.35,
    financial: 0.15,
    profile: 0.25,
    preference: 0.15,
    documents: 0.10,
  },
  thresholds: {
    safetyMinChance: 75,
    matchMinChance: 45,
    reachMinChance: 20,
    minimumOverallScore: 30,
  },
  filters: {
    excludeDeadlinePassed: true,
    excludeUnaffordable: false,
    maxResults: 50,
    includeCategories: ['safety', 'match', 'reach', 'far_reach'],
  },
});
```

## 📝 SOP Analysis

Analyze and improve Statement of Purpose quality:

```typescript
const sopAnalysis = matchingService.analyzeStatementOfPurpose(
  sopText,
  'Computer Science',  // Program field
  'MIT',               // University name
  'phd'                // Degree level
);

console.log(`Overall Score: ${sopAnalysis.data.overallScore}/100`);
console.log('Category Scores:', sopAnalysis.data.categoryScores);
console.log('Suggestions:', sopAnalysis.data.suggestions);
```

### SOP Scoring Categories
- **Clarity** - Readability and flow
- **Structure** - Organization and logical progression
- **Relevance** - Field and program alignment
- **Specificity** - Concrete examples and details
- **Motivation** - Demonstrated passion and drive
- **Future Goals** - Clear career objectives
- **Uniqueness** - Personal differentiation
- **Academic Fit** - University/faculty alignment
- **Writing Quality** - Grammar and vocabulary

## 👥 Reference Analysis

Evaluate and optimize recommendation letters:

```typescript
const refAnalysis = matchingService.analyzeReferences(userProfile);

console.log(`Overall Strength: ${refAnalysis.data.overallStrength}/100`);
console.log('Balance:', refAnalysis.data.balance);
console.log('Recommendations:', refAnalysis.data.recommendations);
```

### Reference Scoring Factors
- **Relationship Type** - Professor, supervisor, employer
- **Academic Weight** - How academic vs professional
- **Tenure** - Years of acquaintance
- **Strength Score** - Expected endorsement quality
- **Relevance** - Fit for target degree level

## ⚛️ React Component

```tsx
import { MatchResults } from 'ventora-matching';

function App() {
  const handleSelectProgram = (result) => {
    console.log('Selected:', result.university.name);
  };

  return (
    <MatchResults 
      results={matchResults} 
      onSelectProgram={handleSelectProgram}
    />
  );
}
```

### Features
- Filter by match category (Safety/Match/Reach/Far Reach)
- Sort by score, deadline, or admission chance
- Expandable cards with detailed insights
- Required documents dropdown
- Score breakdown visualization
- Deadline status indicators

## 🌍 GPA Normalization

Supports multiple GPA scales:

| Scale | Countries |
|-------|-----------|
| 4.0 | USA, Canada |
| 5.0 | India, Nigeria |
| 10.0 | India, Netherlands, Israel |
| 100 | Turkey, Pakistan, China |
| UK Classification | UK, Australia |
| German (1-5) | Germany, Austria |
| French (20) | France, Belgium, Morocco |

```typescript
import { normalizeGPA } from 'ventora-matching';

const normalized = normalizeGPA(8.5, 10, 'India'); // Returns ~3.8
```

## 📈 API Response Structure

```typescript
interface MatchingResponse {
  success: boolean;
  data: {
    matches: MatchResult[];
    summary: {
      totalMatches: number;
      safetySchools: number;
      matchSchools: number;
      reachSchools: number;
      farReachSchools: number;
      averageScore: number;
      averageChance: number;
      topMatch: MatchResult;
      upcomingDeadlines: DeadlineInfo[];
    };
    recommendations: ProfileRecommendation[];
  };
  timestamp: string;
}
```

## 🎯 Match Result Structure

```typescript
interface MatchResult {
  university: University;
  program: Program;
  overallScore: number;           // 0-100
  matchCategory: 'safety' | 'match' | 'reach' | 'far_reach';
  estimatedChance: number;        // 0-100%
  scores: {
    academic: { total, gpaMatch, testScoreMatch, ... };
    financial: { total, affordability, fundingAvailability, ... };
    profile: { total, referenceStrength, extracurricularMatch, ... };
    preference: { total, locationMatch, programFitMatch, ... };
    documents: { total, completeness, quality, ... };
  };
  insights: MatchInsight[];       // Strengths, weaknesses, opportunities
  applicationStatus: {
    deadlinePassed: boolean;
    daysUntilDeadline: number;
    documentsComplete: boolean;
    missingDocuments: string[];
    canApply: boolean;
    blockers: string[];
  };
}
```

## 🗂️ Project Structure

```
ventora-matching/
├── src/
│   ├── types/
│   │   └── index.ts           # All TypeScript interfaces
│   ├── core/
│   │   └── matching-engine.ts # Main matching algorithm
│   ├── analyzers/
│   │   ├── sop-analyzer.ts    # SOP quality analysis
│   │   └── reference-analyzer.ts # Reference strength analysis
│   ├── utils/
│   │   └── scoring-utils.ts   # GPA normalization, helpers
│   ├── components/
│   │   └── MatchResults.tsx   # React UI component
│   ├── api/
│   │   └── matching-service.ts # API service layer
│   └── index.ts               # Main exports
├── package.json
├── tsconfig.json
└── README.md
```

## 🔮 Roadmap

- [ ] Machine learning model for admission prediction
- [ ] Historical admission data integration
- [ ] Interview preparation module
- [ ] Application timeline generator
- [ ] Visa requirement checker
- [ ] Cost of living calculator
- [ ] Alumni network analysis
- [ ] Professor research match

## 📄 License

MIT License - see LICENSE file for details.

## 🤝 Contributing

Contributions welcome! Please read our contributing guidelines before submitting PRs.

---

Built with ❤️ by [Ventora.ai](https://ventora.ai)
