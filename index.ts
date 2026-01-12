// ============================================
// VENTORA.AI - University Matching Algorithm
// Type Definitions
// ============================================

// User Profile Types
export interface UserProfile {
  personal: PersonalInfo;
  academic: AcademicProfile;
  financial: FinancialProfile;
  preferences: UniversityPreferences;
  documents: DocumentStatus;
}

export interface PersonalInfo {
  userId: string;
  name: string;
  email: string;
  nationality: string;
  currentCountry: string;
  dateOfBirth: Date;
  nativeLanguage: string;
  otherLanguages: LanguageProficiency[];
}

export interface LanguageProficiency {
  language: string;
  level: 'A1' | 'A2' | 'B1' | 'B2' | 'C1' | 'C2' | 'Native';
  certification?: string; // TOEFL, IELTS, etc.
  score?: number;
}

export interface AcademicProfile {
  currentDegree: DegreeLevel;
  targetDegree: DegreeLevel;
  gpa: GPAInfo;
  fieldOfStudy: string;
  targetFields: string[];
  institution: string;
  graduationYear: number;
  references: Reference[];
  researchExperience: ResearchExperience[];
  publications: Publication[];
  projects: Project[];
  extracurriculars: Extracurricular[];
  awards: Award[];
  workExperience: WorkExperience[];
  standardizedTests: StandardizedTest[];
}

export type DegreeLevel = 'high_school' | 'bachelors' | 'masters' | 'phd' | 'postdoc';

export interface GPAInfo {
  value: number;
  scale: number; // 4.0, 5.0, 10.0, 100, etc.
  normalizedGPA: number; // Converted to 4.0 scale
  classRank?: number;
  totalStudents?: number;
  percentile?: number;
}

export interface Reference {
  id: string;
  name: string;
  title: string;
  institution: string;
  email: string;
  relationship: 'professor' | 'supervisor' | 'employer' | 'mentor' | 'other';
  yearsKnown: number;
  strengthScore: number; // 1-10, self-assessed or AI-estimated
  letterReceived: boolean;
  academicWeight: number; // How academic vs professional is this reference
}

export interface ResearchExperience {
  id: string;
  title: string;
  institution: string;
  fieldOfStudy: string;
  description: string;
  startDate: Date;
  endDate?: Date;
  isOngoing: boolean;
  role: 'lead' | 'co-researcher' | 'assistant' | 'intern';
  supervisorName: string;
  outcomes: string[];
  relatedPublications: string[];
}

export interface Publication {
  id: string;
  title: string;
  journal: string;
  year: number;
  impactFactor?: number;
  citationCount: number;
  isFirstAuthor: boolean;
  authorPosition: number;
  totalAuthors: number;
  type: 'journal' | 'conference' | 'book_chapter' | 'preprint' | 'thesis';
  peerReviewed: boolean;
}

export interface Project {
  id: string;
  title: string;
  description: string;
  field: string;
  role: string;
  startDate: Date;
  endDate?: Date;
  isAcademic: boolean;
  outcomes: string[];
  technologies?: string[];
  teamSize: number;
  impact: 'local' | 'national' | 'international';
}

export interface Extracurricular {
  id: string;
  activity: string;
  organization: string;
  role: string;
  startDate: Date;
  endDate?: Date;
  hoursPerWeek: number;
  achievements: string[];
  leadershipLevel: 'member' | 'committee' | 'officer' | 'president' | 'founder';
  category: 'volunteer' | 'sports' | 'arts' | 'academic_club' | 'professional' | 'community' | 'other';
}

export interface Award {
  id: string;
  title: string;
  organization: string;
  year: number;
  level: 'departmental' | 'institutional' | 'regional' | 'national' | 'international';
  category: 'academic' | 'research' | 'leadership' | 'service' | 'athletic' | 'artistic' | 'other';
  description?: string;
}

export interface WorkExperience {
  id: string;
  company: string;
  position: string;
  startDate: Date;
  endDate?: Date;
  isCurrentJob: boolean;
  responsibilities: string[];
  achievements: string[];
  isRelevantToStudy: boolean;
  industry: string;
}

export interface StandardizedTest {
  testType: 'GRE' | 'GMAT' | 'TOEFL' | 'IELTS' | 'SAT' | 'ACT' | 'LSAT' | 'MCAT' | 'OTHER';
  totalScore: number;
  maxScore: number;
  percentile?: number;
  sectionScores?: Record<string, number>;
  testDate: Date;
  expirationDate?: Date;
}

// Financial Profile
export interface FinancialProfile {
  annualBudget: number;
  currency: string;
  needsFinancialAid: boolean;
  aidTypes: ('scholarship' | 'grant' | 'loan' | 'assistantship' | 'fellowship')[];
  canSelfFund: boolean;
  maxTuitionWithoutAid: number;
  livingExpensesBudget: number;
  sponsorship?: {
    type: 'family' | 'employer' | 'government' | 'other';
    amount: number;
  };
}

// University Preferences
export interface UniversityPreferences {
  targetCountries: string[];
  preferredRegions?: string[];
  preferredCities?: string[];
  programLength: {
    min: number;
    max: number;
    unit: 'months' | 'years';
  };
  startSemester: 'fall' | 'spring' | 'summer' | 'any';
  startYear: number;
  universityType: ('public' | 'private' | 'research' | 'liberal_arts')[];
  campusSize: ('small' | 'medium' | 'large')[];
  importanceFactors: ImportanceFactors;
}

export interface ImportanceFactors {
  ranking: number; // 1-10
  researchOpportunities: number;
  location: number;
  cost: number;
  careerServices: number;
  diversity: number;
  campusLife: number;
  facultyQuality: number;
  industryConnections: number;
  programSpecialization: number;
}

// Document Status
export interface DocumentStatus {
  cv: DocumentInfo;
  statementOfPurpose: DocumentInfo;
  transcripts: DocumentInfo;
  recommendationLetters: DocumentInfo[];
  languageTestScores: DocumentInfo;
  standardizedTestScores: DocumentInfo;
  portfolio?: DocumentInfo;
  writingSample?: DocumentInfo;
  researchProposal?: DocumentInfo;
}

export interface DocumentInfo {
  status: 'not_started' | 'in_progress' | 'completed' | 'submitted';
  lastUpdated?: Date;
  quality?: number; // AI-assessed quality score 1-100
  feedback?: string[];
}

// University Database Types
export interface University {
  id: string;
  name: string;
  country: string;
  city: string;
  region: string;
  type: 'public' | 'private';
  websiteUrl: string;
  ranking: UniversityRanking;
  programs: Program[];
  admissionStats: AdmissionStatistics;
  financialInfo: UniversityFinancialInfo;
  campusInfo: CampusInfo;
}

export interface UniversityRanking {
  globalRank?: number;
  countryRank?: number;
  subjectRanks: Record<string, number>;
  source: string;
  year: number;
}

export interface Program {
  id: string;
  universityId: string;
  name: string;
  degree: DegreeLevel;
  department: string;
  field: string;
  subfields: string[];
  duration: {
    value: number;
    unit: 'months' | 'years';
  };
  language: string;
  deadline: ApplicationDeadline;
  requirements: ProgramRequirements;
  tuition: TuitionInfo;
  funding: FundingOption[];
  researchAreas: string[];
  facultyCount: number;
  studentCount: number;
  internationalStudentPercentage: number;
  employmentRate: number;
  averageSalaryAfterGraduation?: number;
}

export interface ApplicationDeadline {
  regularDeadline: Date;
  earlyDeadline?: Date;
  rollingAdmission: boolean;
  decisionDate: Date;
  semester: 'fall' | 'spring' | 'summer';
  year: number;
}

export interface ProgramRequirements {
  minimumGPA: number;
  gpaScale: number;
  requiredTests: RequiredTest[];
  languageRequirements: LanguageRequirement[];
  requiredDocuments: RequiredDocument[];
  prerequisites: string[];
  workExperienceYears?: number;
  interviewRequired: boolean;
  portfolioRequired: boolean;
  researchProposalRequired: boolean;
}

export interface RequiredTest {
  testType: string;
  minimumScore: number;
  maxScore: number;
  sectionMinimums?: Record<string, number>;
  required: boolean;
  alternatives?: string[];
}

export interface LanguageRequirement {
  language: string;
  minimumLevel: string;
  acceptedTests: {
    testName: string;
    minimumScore: number;
  }[];
}

export interface RequiredDocument {
  documentType: string;
  description: string;
  required: boolean;
  quantity?: number; // e.g., 3 recommendation letters
  specificInstructions?: string;
}

export interface TuitionInfo {
  annualTuition: number;
  totalProgramCost: number;
  currency: string;
  domesticTuition?: number;
  internationalTuition: number;
  feesIncluded: boolean;
  additionalFees: number;
}

export interface FundingOption {
  type: 'scholarship' | 'grant' | 'fellowship' | 'assistantship' | 'loan';
  name: string;
  amount: number;
  currency: string;
  coverage: 'full' | 'partial' | 'variable';
  coveragePercentage?: number;
  meritBased: boolean;
  needBased: boolean;
  eligibilityCriteria: string[];
  applicationRequired: boolean;
  deadline?: Date;
}

export interface AdmissionStatistics {
  acceptanceRate: number;
  averageGPA: number;
  gpaRange: { min: number; max: number };
  averageTestScores: Record<string, number>;
  applicantsLastYear: number;
  enrolledLastYear: number;
  internationalAcceptanceRate?: number;
  yieldRate: number;
}

export interface UniversityFinancialInfo {
  averageCostOfLiving: number;
  currency: string;
  averageScholarshipAmount: number;
  percentReceivingAid: number;
  workStudyAvailable: boolean;
  onCampusHousingCost: number;
}

export interface CampusInfo {
  size: 'small' | 'medium' | 'large';
  totalStudents: number;
  undergraduateStudents: number;
  graduateStudents: number;
  internationalStudentPercentage: number;
  studentFacultyRatio: number;
  researchFunding: number;
  campusSafetyRating: number;
  diversityIndex: number;
}

// Matching Result Types
export interface MatchResult {
  university: University;
  program: Program;
  overallScore: number;
  matchCategory: 'safety' | 'match' | 'reach' | 'far_reach';
  scores: DetailedScores;
  insights: MatchInsight[];
  applicationStatus: ApplicationStatus;
  estimatedChance: number; // 0-100 percentage
}

export interface DetailedScores {
  academic: AcademicScore;
  financial: FinancialScore;
  profile: ProfileScore;
  preference: PreferenceScore;
  documents: DocumentScore;
}

export interface AcademicScore {
  total: number;
  gpaMatch: number;
  testScoreMatch: number;
  researchMatch: number;
  publicationMatch: number;
  prerequisiteMatch: number;
}

export interface FinancialScore {
  total: number;
  affordability: number;
  fundingAvailability: number;
  costOfLivingMatch: number;
}

export interface ProfileScore {
  total: number;
  referenceStrength: number;
  extracurricularMatch: number;
  workExperienceMatch: number;
  leadershipScore: number;
  uniquenessScore: number;
}

export interface PreferenceScore {
  total: number;
  locationMatch: number;
  programFitMatch: number;
  culturalFitMatch: number;
  careerAlignmentMatch: number;
}

export interface DocumentScore {
  total: number;
  completeness: number;
  quality: number;
  deadlineStatus: number;
}

export interface MatchInsight {
  type: 'strength' | 'weakness' | 'opportunity' | 'warning';
  category: string;
  message: string;
  actionable: boolean;
  action?: string;
  priority: 'high' | 'medium' | 'low';
}

export interface ApplicationStatus {
  deadlinePassed: boolean;
  daysUntilDeadline: number;
  documentsComplete: boolean;
  missingDocuments: string[];
  estimatedPreparationTime: number; // hours
  canApply: boolean;
  blockers: string[];
}

// Algorithm Configuration
export interface MatchingConfig {
  weights: MatchingWeights;
  thresholds: MatchingThresholds;
  filters: MatchingFilters;
}

export interface MatchingWeights {
  academic: number;
  financial: number;
  profile: number;
  preference: number;
  documents: number;
}

export interface MatchingThresholds {
  safetyMinChance: number; // e.g., 80%
  matchMinChance: number; // e.g., 50%
  reachMinChance: number; // e.g., 25%
  minimumOverallScore: number;
}

export interface MatchingFilters {
  excludeDeadlinePassed: boolean;
  excludeUnaffordable: boolean;
  excludeMissingPrerequisites: boolean;
  maxResults: number;
  includeCategories: ('safety' | 'match' | 'reach' | 'far_reach')[];
}
