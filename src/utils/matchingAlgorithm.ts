import { ProfileFormData } from '../components/ProfileForm';
import { UniversityMatch } from '../components/MatchResults';

const sampleUniversities = [
  {
    id: '1',
    name: 'Massachusetts Institute of Technology',
    country: 'ABD',
    city: 'Cambridge',
    ranking_global: 1,
    website: 'https://www.mit.edu',
    tuition_min: 53790,
    tuition_max: 53790,
    living_cost_annual: 18000,
    visa_difficulty_score: 45,
    visa_success_rate: 75,
    post_study_work_visa: true,
    work_visa_duration_months: 36,
    citizenship_pathway: true,
    citizenship_years: 5,
    residence_permit_ease_score: 60,
    acceptance_rate: 3.95,
  },
  {
    id: '2',
    name: 'University of Oxford',
    country: 'Ingiltere',
    city: 'Oxford',
    ranking_global: 2,
    website: 'https://www.ox.ac.uk',
    tuition_min: 30000,
    tuition_max: 45000,
    living_cost_annual: 15000,
    visa_difficulty_score: 30,
    visa_success_rate: 85,
    post_study_work_visa: true,
    work_visa_duration_months: 24,
    citizenship_pathway: true,
    citizenship_years: 6,
    residence_permit_ease_score: 70,
    acceptance_rate: 17.5,
  },
  {
    id: '3',
    name: 'Technical University of Munich',
    country: 'Almanya',
    city: 'Munchen',
    ranking_global: 37,
    website: 'https://www.tum.de',
    tuition_min: 0,
    tuition_max: 500,
    living_cost_annual: 12000,
    visa_difficulty_score: 25,
    visa_success_rate: 90,
    post_study_work_visa: true,
    work_visa_duration_months: 18,
    citizenship_pathway: true,
    citizenship_years: 8,
    residence_permit_ease_score: 85,
    acceptance_rate: 8,
  },
  {
    id: '4',
    name: 'University of Toronto',
    country: 'Kanada',
    city: 'Toronto',
    ranking_global: 21,
    website: 'https://www.utoronto.ca',
    tuition_min: 45000,
    tuition_max: 58000,
    living_cost_annual: 15000,
    visa_difficulty_score: 20,
    visa_success_rate: 92,
    post_study_work_visa: true,
    work_visa_duration_months: 36,
    citizenship_pathway: true,
    citizenship_years: 3,
    residence_permit_ease_score: 90,
    acceptance_rate: 43,
  },
  {
    id: '5',
    name: 'ETH Zurich',
    country: 'Isvicre',
    city: 'Zurich',
    ranking_global: 7,
    website: 'https://ethz.ch',
    tuition_min: 1200,
    tuition_max: 1500,
    living_cost_annual: 22000,
    visa_difficulty_score: 35,
    visa_success_rate: 80,
    post_study_work_visa: true,
    work_visa_duration_months: 6,
    citizenship_pathway: true,
    citizenship_years: 10,
    residence_permit_ease_score: 65,
    acceptance_rate: 8,
  },
  {
    id: '6',
    name: 'National University of Singapore',
    country: 'Singapur',
    city: 'Singapore',
    ranking_global: 8,
    website: 'https://www.nus.edu.sg',
    tuition_min: 27000,
    tuition_max: 38000,
    living_cost_annual: 15000,
    visa_difficulty_score: 30,
    visa_success_rate: 88,
    post_study_work_visa: true,
    work_visa_duration_months: 12,
    citizenship_pathway: false,
    citizenship_years: 0,
    residence_permit_ease_score: 55,
    acceptance_rate: 5,
  },
  {
    id: '7',
    name: 'University of Melbourne',
    country: 'Avustralya',
    city: 'Melbourne',
    ranking_global: 14,
    website: 'https://www.unimelb.edu.au',
    tuition_min: 35000,
    tuition_max: 45000,
    living_cost_annual: 18000,
    visa_difficulty_score: 25,
    visa_success_rate: 90,
    post_study_work_visa: true,
    work_visa_duration_months: 24,
    citizenship_pathway: true,
    citizenship_years: 4,
    residence_permit_ease_score: 85,
    acceptance_rate: 70,
  },
  {
    id: '8',
    name: 'Delft University of Technology',
    country: 'Hollanda',
    city: 'Delft',
    ranking_global: 47,
    website: 'https://www.tudelft.nl',
    tuition_min: 15000,
    tuition_max: 20000,
    living_cost_annual: 13000,
    visa_difficulty_score: 22,
    visa_success_rate: 92,
    post_study_work_visa: true,
    work_visa_duration_months: 12,
    citizenship_pathway: true,
    citizenship_years: 5,
    residence_permit_ease_score: 88,
    acceptance_rate: 50,
  },
];

export function calculateMatches(profile: ProfileFormData): UniversityMatch[] {
  const budget = parseInt(profile.annual_budget) || 50000;
  const preferredCountries = profile.preferred_countries || [];
  const gpa = parseFloat(profile.gpa) || 3.0;

  return sampleUniversities
    .map((uni) => {
      const avgTuition = (uni.tuition_min + uni.tuition_max) / 2;
      const totalCost = avgTuition + uni.living_cost_annual;

      let academicScore = 70;
      if (gpa >= 3.8) academicScore = 95;
      else if (gpa >= 3.5) academicScore = 85;
      else if (gpa >= 3.0) academicScore = 75;
      else academicScore = 60;

      let financialScore = budget >= totalCost ? 100 : Math.round((budget / totalCost) * 100);

      let visaScore = uni.visa_success_rate;

      let scholarshipScore = 50;
      if (gpa >= 3.8) scholarshipScore = 90;
      else if (gpa >= 3.5) scholarshipScore = 75;
      else if (gpa >= 3.0) scholarshipScore = 60;

      let postGradScore = 60;
      if (uni.post_study_work_visa) postGradScore += 20;
      if (uni.citizenship_pathway) postGradScore += 15;

      let countryBonus = preferredCountries.includes(uni.country) ? 10 : 0;

      const overallScore = Math.round(
        academicScore * 0.3 +
        financialScore * 0.25 +
        visaScore * 0.2 +
        scholarshipScore * 0.15 +
        postGradScore * 0.1 +
        countryBonus
      );

      const estimatedScholarship = gpa >= 3.5 ? Math.round(totalCost * 0.3) : Math.round(totalCost * 0.1);

      return {
        university: {
          id: uni.id,
          name: uni.name,
          country: uni.country,
          city: uni.city,
          ranking_global: uni.ranking_global,
          website: uni.website,
        },
        match: {
          overall_match_score: overallScore,
          academic_match_score: academicScore,
          financial_match_score: financialScore,
          visa_match_score: visaScore,
          scholarship_potential_score: scholarshipScore,
          post_graduation_score: postGradScore,
          estimated_total_cost: totalCost,
          estimated_scholarship_amount: estimatedScholarship,
          visa_difficulty_assessment: visaScore >= 85 ? 'Vize almak kolay' : visaScore >= 70 ? 'Orta zorluk' : 'Vize zor',
          post_graduation_opportunities: uni.post_study_work_visa
            ? `${uni.work_visa_duration_months} ay calisma izni, ${uni.citizenship_pathway ? `${uni.citizenship_years} yilda vatandaslik` : 'vatandaslik yok'}`
            : 'Calisma izni yok',
          match_reasoning: `GPA'niz (${gpa}) bu universite icin ${academicScore >= 80 ? 'cok uygun' : 'uygun'}. ${financialScore >= 80 ? 'Butceniz yeterli.' : 'Burs basvurusu onemli.'}`,
        },
        scholarships: gpa >= 3.5
          ? [
              {
                name: 'Merit Scholarship',
                type: 'academic',
                amount_max: estimatedScholarship,
                why_eligible: `${gpa} GPA ile akademik burs icin uygununuz`,
              },
            ]
          : [],
      };
    })
    .sort((a, b) => b.match.overall_match_score - a.match.overall_match_score)
    .slice(0, 10);
}
