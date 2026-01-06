import { languageSchools, LanguageSchool } from './languageSchoolDatabase';
import { ProfileFormData } from '../components/ProfileForm';

type LanguageSchoolMatch = {
  school: LanguageSchool;
  matchScore: number;
  matchCategory: 'Safety' | 'Target' | 'Reach';
  estimatedTotalCost: number;
  financialFit: number;
  visaFit: number;
  recommendedDuration: number;
  pros: string[];
  cons: string[];
};

function calculateVisaDifficultyScore(difficulty: string): number {
  switch (difficulty) {
    case 'easy': return 100;
    case 'moderate': return 70;
    case 'difficult': return 40;
    default: return 50;
  }
}

export function calculateLanguageSchoolMatches(profile: ProfileFormData): LanguageSchoolMatch[] {
  const budget = parseFloat(profile.annual_budget) || 15000;
  const preferredCountries = profile.preferred_countries || [];

  const matches: LanguageSchoolMatch[] = languageSchools.map(school => {
    let matchScore = 0;
    const pros: string[] = [];
    const cons: string[] = [];

    const recommendedDuration = 24;
    const totalWeeklyCost = school.weekly_cost + (school.accommodation_weekly || 0);
    const estimatedTotalCost = totalWeeklyCost * recommendedDuration;

    const countryMatch = preferredCountries.length === 0 ||
                        preferredCountries.includes(school.country);
    if (countryMatch && preferredCountries.length > 0) {
      matchScore += 25;
      pros.push(`Tercih ettiginiz ulke: ${school.country}`);
    }

    const financialFit = Math.max(0, 100 - ((estimatedTotalCost - budget) / budget) * 100);
    matchScore += financialFit * 0.35;

    if (estimatedTotalCost <= budget * 0.7) {
      pros.push(`Butcenizin icinde (${estimatedTotalCost.toFixed(0)}$)`);
    } else if (estimatedTotalCost <= budget) {
      pros.push(`Butcenize uygun (${estimatedTotalCost.toFixed(0)}$)`);
    } else {
      cons.push(`Butcenizi asiyor (${estimatedTotalCost.toFixed(0)}$)`);
    }

    const visaDifficultyScore = calculateVisaDifficultyScore(school.visa_difficulty);
    const visaFit = visaDifficultyScore;
    matchScore += visaFit * 0.2;

    if (school.visa_difficulty === 'easy') {
      pros.push('Vize almak kolay');
    } else if (school.visa_difficulty === 'difficult') {
      cons.push('Vize sureci zorlu');
    }

    if (school.part_time_work_allowed) {
      matchScore += 10;
      pros.push('Part-time calisma izni var');
    }

    if (school.pathway_programs) {
      matchScore += 10;
      pros.push('Universite pathway programi mevcut');
    }

    if (school.scholarship_available) {
      matchScore += 5;
      pros.push('Burs imkani var');
    }

    const ratingScore = (school.rating / 5) * 10;
    matchScore += ratingScore;

    if (school.rating >= 4.5) {
      pros.push(`Yuksek degerlendirme (${school.rating}/5)`);
    }

    if (school.class_size_max <= 12) {
      pros.push('Kucuk sinif mevcudu (daha fazla ilgi)');
      matchScore += 5;
    }

    const matchCategory: 'Safety' | 'Target' | 'Reach' =
      matchScore >= 80 ? 'Safety' : matchScore >= 60 ? 'Target' : 'Reach';

    return {
      school,
      matchScore: Math.min(100, Math.max(0, matchScore)),
      matchCategory,
      estimatedTotalCost,
      financialFit,
      visaFit,
      recommendedDuration,
      pros,
      cons
    };
  });

  return matches
    .filter(match => match.matchScore >= 30)
    .sort((a, b) => b.matchScore - a.matchScore)
    .slice(0, 30);
}
