export type LanguageSchool = {
  id: string;
  name: string;
  country: string;
  city: string;
  programs: string[];
  duration_weeks_min: number;
  duration_weeks_max: number;
  weekly_cost: number;
  accommodation_weekly?: number;
  rating: number;
  class_size_max: number;
  accreditations: string[];
  facilities: string[];
  visa_difficulty: 'easy' | 'moderate' | 'difficult';
  part_time_work_allowed: boolean;
  pathway_programs: boolean;
  scholarship_available: boolean;
  age_min: number;
};

export const languageSchools: LanguageSchool[] = [
  {
    id: 'ec-london',
    name: 'EC English London',
    country: 'United Kingdom',
    city: 'London',
    programs: ['General English', 'Academic English', 'IELTS Prep', 'Cambridge Exam Prep', 'Business English'],
    duration_weeks_min: 1,
    duration_weeks_max: 52,
    weekly_cost: 350,
    accommodation_weekly: 250,
    rating: 4.5,
    class_size_max: 15,
    accreditations: ['British Council', 'English UK'],
    facilities: ['Library', 'Computer Lab', 'Student Lounge', 'Free WiFi'],
    visa_difficulty: 'moderate',
    part_time_work_allowed: false,
    pathway_programs: true,
    scholarship_available: false,
    age_min: 16
  },
  {
    id: 'kaplan-ny',
    name: 'Kaplan International - New York',
    country: 'United States',
    city: 'New York',
    programs: ['General English', 'Intensive English', 'TOEFL Prep', 'Business English'],
    duration_weeks_min: 2,
    duration_weeks_max: 52,
    weekly_cost: 450,
    accommodation_weekly: 400,
    rating: 4.6,
    class_size_max: 15,
    accreditations: ['ACCET', 'English USA'],
    facilities: ['Computer Lab', 'Student Lounge', 'Library', 'Outdoor Space'],
    visa_difficulty: 'difficult',
    part_time_work_allowed: false,
    pathway_programs: true,
    scholarship_available: false,
    age_min: 16
  },
  {
    id: 'ilsc-toronto',
    name: 'ILSC Toronto',
    country: 'Canada',
    city: 'Toronto',
    programs: ['General English', 'Academic English', 'IELTS Prep', 'Business English', 'University Pathway'],
    duration_weeks_min: 1,
    duration_weeks_max: 48,
    weekly_cost: 320,
    accommodation_weekly: 220,
    rating: 4.4,
    class_size_max: 16,
    accreditations: ['Languages Canada'],
    facilities: ['Computer Lab', 'Student Lounge', 'Kitchen', 'Free WiFi'],
    visa_difficulty: 'easy',
    part_time_work_allowed: true,
    pathway_programs: true,
    scholarship_available: true,
    age_min: 16
  },
  {
    id: 'els-sydney',
    name: 'ELS Universal English College Sydney',
    country: 'Australia',
    city: 'Sydney',
    programs: ['General English', 'Academic English', 'IELTS Prep', 'Cambridge Exam Prep'],
    duration_weeks_min: 1,
    duration_weeks_max: 60,
    weekly_cost: 280,
    accommodation_weekly: 240,
    rating: 4.3,
    class_size_max: 18,
    accreditations: ['NEAS', 'English Australia'],
    facilities: ['Computer Lab', 'Student Lounge', 'Library', 'Kitchen'],
    visa_difficulty: 'moderate',
    part_time_work_allowed: true,
    pathway_programs: true,
    scholarship_available: false,
    age_min: 18
  },
  {
    id: 'ilac-vancouver',
    name: 'ILAC Vancouver',
    country: 'Canada',
    city: 'Vancouver',
    programs: ['General English', 'Academic English', 'IELTS Prep', 'University Pathway', 'Business English'],
    duration_weeks_min: 2,
    duration_weeks_max: 52,
    weekly_cost: 310,
    accommodation_weekly: 230,
    rating: 4.7,
    class_size_max: 15,
    accreditations: ['Languages Canada', 'ALTO'],
    facilities: ['Computer Lab', 'Student Lounge', 'Kitchen', 'Free WiFi', 'Game Room'],
    visa_difficulty: 'easy',
    part_time_work_allowed: true,
    pathway_programs: true,
    scholarship_available: true,
    age_min: 16
  },
];
