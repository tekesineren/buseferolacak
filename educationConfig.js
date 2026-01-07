/**
 * Education Systems by Country & Level
 * Auto-detects GPA format based on country + education level
 */

export const educationSystems = {
  highschool: [
    {
      id: 'turkey',
      name: '🇹🇷 Turkey',
      gpaSystem: {
        label: 'Ortalama (100 üzerinden)',
        minScore: 0,
        maxScore: 100,
        step: 0.01,
        example: '85.50',
        helpText: 'Lise ortalamanız 0-100 arasında giriniz'
      }
    },
    {
      id: 'usa',
      name: '🇺🇸 USA',
      gpaSystem: {
        label: 'GPA',
        minScore: 0,
        maxScore: 4.0,
        step: 0.01,
        example: '3.85',
        helpText: 'Your high school GPA on a 4.0 scale'
      }
    },
    {
      id: 'uk',
      name: '🇬🇧 UK',
      gpaSystem: {
        label: 'A-Level Grade',
        minScore: 0,
        maxScore: 100,
        step: 1,
        example: '92',
        helpText: 'Your average A-Level grade as percentage'
      }
    },
    {
      id: 'germany',
      name: '🇩🇪 Germany',
      gpaSystem: {
        label: 'Abitur Grade',
        minScore: 1.0,
        maxScore: 6.0,
        step: 0.1,
        example: '1.5',
        helpText: 'Abitur Durchschnittsnote (1.0 = best, 6.0 = worst)'
      }
    },
    {
      id: 'france',
      name: '🇫🇷 France',
      gpaSystem: {
        label: 'Baccalauréat Grade',
        minScore: 0,
        maxScore: 20,
        step: 0.25,
        example: '16.50',
        helpText: 'Your Baccalauréat grade out of 20'
      }
    },
    {
      id: 'canada',
      name: '🇨🇦 Canada',
      gpaSystem: {
        label: 'GPA',
        minScore: 0,
        maxScore: 4.0,
        step: 0.01,
        example: '3.75',
        helpText: 'Your high school GPA on a 4.0 scale'
      }
    }
  ],

  bachelors: [
    {
      id: 'turkey',
      name: '🇹🇷 Turkey',
      gpaSystem: {
        label: 'GPA (4.0 scale)',
        minScore: 0,
        maxScore: 4.0,
        step: 0.01,
        example: '3.45',
        helpText: 'Most Turkish universities use 4.0 GPA scale'
      }
    },
    {
      id: 'usa',
      name: '🇺🇸 USA',
      gpaSystem: {
        label: 'GPA',
        minScore: 0,
        maxScore: 4.0,
        step: 0.01,
        example: '3.75',
        helpText: 'Your cumulative undergraduate GPA'
      }
    },
    {
      id: 'uk',
      name: '🇬🇧 UK',
      gpaSystem: {
        label: 'Degree Classification',
        minScore: 0,
        maxScore: 100,
        step: 1,
        example: '78',
        helpText: 'Your final degree percentage (1st Class: 70+, 2:1: 60-69)'
      }
    },
    {
      id: 'germany',
      name: '🇩🇪 Germany',
      gpaSystem: {
        label: 'Diploma Grade',
        minScore: 1.0,
        maxScore: 5.0,
        step: 0.1,
        example: '1.8',
        helpText: 'Your diploma grade (1.0 = excellent, 5.0 = fail)'
      }
    },
    {
      id: 'france',
      name: '🇫🇷 France',
      gpaSystem: {
        label: 'Licence Grade',
        minScore: 0,
        maxScore: 20,
        step: 0.25,
        example: '14.50',
        helpText: 'Your Licence degree grade out of 20'
      }
    },
    {
      id: 'canada',
      name: '🇨🇦 Canada',
      gpaSystem: {
        label: 'GPA',
        minScore: 0,
        maxScore: 4.0,
        step: 0.01,
        example: '3.65',
        helpText: 'Your cumulative undergraduate GPA'
      }
    },
    {
      id: 'australia',
      name: '🇦🇺 Australia',
      gpaSystem: {
        label: 'WAM (Weighted Average Mark)',
        minScore: 0,
        maxScore: 100,
        step: 0.1,
        example: '75.50',
        helpText: 'Your Weighted Average Mark as percentage'
      }
    },
    {
      id: 'netherlands',
      name: '🇳🇱 Netherlands',
      gpaSystem: {
        label: 'GPA (4.0 scale)',
        minScore: 0,
        maxScore: 10,
        step: 0.1,
        example: '8.5',
        helpText: 'Your final grade out of 10'
      }
    }
  ],

  masters: [
    {
      id: 'turkey',
      name: '🇹🇷 Turkey',
      gpaSystem: {
        label: 'GPA (4.0 scale)',
        minScore: 0,
        maxScore: 4.0,
        step: 0.01,
        example: '3.65',
        helpText: 'Your master\'s program GPA'
      }
    },
    {
      id: 'usa',
      name: '🇺🇸 USA',
      gpaSystem: {
        label: 'GPA',
        minScore: 0,
        maxScore: 4.0,
        step: 0.01,
        example: '3.85',
        helpText: 'Your graduate GPA'
      }
    },
    {
      id: 'uk',
      name: '🇬🇧 UK',
      gpaSystem: {
        label: 'Master\'s Grade',
        minScore: 0,
        maxScore: 100,
        step: 1,
        example: '82',
        helpText: 'Your master\'s degree average (Distinction: 70+, Merit: 60-69)'
      }
    },
    {
      id: 'germany',
      name: '🇩🇪 Germany',
      gpaSystem: {
        label: 'Master Grade',
        minScore: 1.0,
        maxScore: 5.0,
        step: 0.1,
        example: '1.5',
        helpText: 'Your master\'s degree grade (1.0 = excellent, 5.0 = fail)'
      }
    },
    {
      id: 'france',
      name: '🇫🇷 France',
      gpaSystem: {
        label: 'Master Grade',
        minScore: 0,
        maxScore: 20,
        step: 0.25,
        example: '15.75',
        helpText: 'Your master\'s degree grade out of 20'
      }
    },
    {
      id: 'canada',
      name: '🇨🇦 Canada',
      gpaSystem: {
        label: 'GPA',
        minScore: 0,
        maxScore: 4.0,
        step: 0.01,
        example: '3.75',
        helpText: 'Your graduate GPA'
      }
    }
  ],

  phd: [
    {
      id: 'turkey',
      name: '🇹🇷 Turkey',
      gpaSystem: {
        label: 'GPA (4.0 scale)',
        minScore: 0,
        maxScore: 4.0,
        step: 0.01,
        example: '3.75',
        helpText: 'Your PhD program GPA'
      }
    },
    {
      id: 'usa',
      name: '🇺🇸 USA',
      gpaSystem: {
        label: 'GPA',
        minScore: 0,
        maxScore: 4.0,
        step: 0.01,
        example: '3.90',
        helpText: 'Your PhD GPA (if tracked)'
      }
    },
    {
      id: 'uk',
      name: '🇬🇧 UK',
      gpaSystem: {
        label: 'Research Performance',
        minScore: 0,
        maxScore: 100,
        step: 1,
        example: '85',
        helpText: 'Your research and thesis evaluation'
      }
    },
    {
      id: 'germany',
      name: '🇩🇪 Germany',
      gpaSystem: {
        label: 'Doctorate Grade',
        minScore: 1.0,
        maxScore: 5.0,
        step: 0.1,
        example: '1.3',
        helpText: 'Your doctorate grade (1.0 = summa cum laude, 5.0 = fail)'
      }
    },
    {
      id: 'france',
      name: '🇫🇷 France',
      gpaSystem: {
        label: 'Doctorate Grade',
        minScore: 0,
        maxScore: 20,
        step: 0.25,
        example: '16.00',
        helpText: 'Your doctorate thesis grade out of 20'
      }
    }
  ]
}

/**
 * Helper function to get GPA system for a specific level and country
 */
export const getGPASystem = (level, countryId) => {
  const levelData = educationSystems[level]
  if (!levelData) return null

  const country = levelData.find(c => c.id === countryId)
  return country ? country.gpaSystem : null
}

/**
 * Convert GPA to standardized 4.0 scale for comparison
 */
export const normalizeGPA = (gpaValue, sourceSystem) => {
  const { minScore, maxScore } = sourceSystem
  const range = maxScore - minScore

  // Normalize to 0-1 first
  const normalized = (gpaValue - minScore) / range

  // Convert to 4.0 scale
  return normalized * 4.0
}
