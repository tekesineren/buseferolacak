// ============================================
// VENTORA.AI - University Matching Algorithm
// Core Matching Engine
// ============================================

import {
  UserProfile,
  University,
  Program,
  MatchResult,
  MatchingConfig,
  DetailedScores,
  MatchInsight,
  ApplicationStatus,
  AcademicScore,
  FinancialScore,
  ProfileScore,
  PreferenceScore,
  DocumentScore,
  Reference,
  Publication,
  ResearchExperience,
  Extracurricular,
} from '../types';

// Default configuration
const DEFAULT_CONFIG: MatchingConfig = {
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
    excludeMissingPrerequisites: false,
    maxResults: 50,
    includeCategories: ['safety', 'match', 'reach', 'far_reach'],
  },
};

export class UniversityMatchingEngine {
  private config: MatchingConfig;
  private currentDate: Date;

  constructor(config?: Partial<MatchingConfig>) {
    this.config = { ...DEFAULT_CONFIG, ...config };
    this.currentDate = new Date();
  }

  // ============================================
  // MAIN MATCHING FUNCTION
  // ============================================
  
  public async matchUniversities(
    user: UserProfile,
    universities: University[]
  ): Promise<MatchResult[]> {
    const results: MatchResult[] = [];

    for (const university of universities) {
      for (const program of university.programs) {
        // Check basic eligibility first
        if (!this.passesBasicFilters(user, university, program)) {
          continue;
        }

        const matchResult = this.calculateMatch(user, university, program);
        
        if (matchResult.overallScore >= this.config.thresholds.minimumOverallScore) {
          results.push(matchResult);
        }
      }
    }

    // Sort by overall score descending
    results.sort((a, b) => b.overallScore - a.overallScore);

    // Apply max results limit
    return results.slice(0, this.config.filters.maxResults);
  }

  // ============================================
  // CORE CALCULATION
  // ============================================

  private calculateMatch(
    user: UserProfile,
    university: University,
    program: Program
  ): MatchResult {
    // Calculate all component scores
    const academicScore = this.calculateAcademicScore(user, program, university);
    const financialScore = this.calculateFinancialScore(user, program, university);
    const profileScore = this.calculateProfileScore(user, program);
    const preferenceScore = this.calculatePreferenceScore(user, university, program);
    const documentScore = this.calculateDocumentScore(user, program);

    const scores: DetailedScores = {
      academic: academicScore,
      financial: financialScore,
      profile: profileScore,
      preference: preferenceScore,
      documents: documentScore,
    };

    // Calculate weighted overall score
    const overallScore = this.calculateWeightedScore(scores);

    // Estimate admission chance
    const estimatedChance = this.estimateAdmissionChance(
      user,
      program,
      university,
      scores
    );

    // Determine match category
    const matchCategory = this.determineMatchCategory(estimatedChance);

    // Generate insights
    const insights = this.generateInsights(user, university, program, scores);

    // Calculate application status
    const applicationStatus = this.calculateApplicationStatus(user, program);

    return {
      university,
      program,
      overallScore,
      matchCategory,
      scores,
      insights,
      applicationStatus,
      estimatedChance,
    };
  }

  // ============================================
  // ACADEMIC SCORING
  // ============================================

  private calculateAcademicScore(
    user: UserProfile,
    program: Program,
    university: University
  ): AcademicScore {
    const gpaMatch = this.calculateGPAMatch(user, program, university);
    const testScoreMatch = this.calculateTestScoreMatch(user, program);
    const researchMatch = this.calculateResearchMatch(user, program);
    const publicationMatch = this.calculatePublicationMatch(user, program);
    const prerequisiteMatch = this.calculatePrerequisiteMatch(user, program);

    // Weights for academic components
    const weights = {
      gpa: 0.30,
      tests: 0.20,
      research: 0.25,
      publications: 0.15,
      prerequisites: 0.10,
    };

    const total =
      gpaMatch * weights.gpa +
      testScoreMatch * weights.tests +
      researchMatch * weights.research +
      publicationMatch * weights.publications +
      prerequisiteMatch * weights.prerequisites;

    return {
      total: Math.round(total),
      gpaMatch,
      testScoreMatch,
      researchMatch,
      publicationMatch,
      prerequisiteMatch,
    };
  }

  private calculateGPAMatch(
    user: UserProfile,
    program: Program,
    university: University
  ): number {
    const userGPA = user.academic.gpa.normalizedGPA;
    const requiredGPA = program.requirements.minimumGPA;
    const avgGPA = university.admissionStats.averageGPA;
    const gpaRange = university.admissionStats.gpaRange;

    // If user GPA is above average, give high score
    if (userGPA >= avgGPA) {
      return Math.min(100, 80 + ((userGPA - avgGPA) / (4.0 - avgGPA)) * 20);
    }

    // If user GPA is between minimum and average
    if (userGPA >= requiredGPA) {
      const rangePosition = (userGPA - requiredGPA) / (avgGPA - requiredGPA);
      return 50 + rangePosition * 30;
    }

    // If user GPA is below minimum but close
    const belowMinDiff = requiredGPA - userGPA;
    if (belowMinDiff <= 0.3) {
      return Math.max(20, 50 - belowMinDiff * 100);
    }

    // Significantly below minimum
    return Math.max(0, 20 - belowMinDiff * 30);
  }

  private calculateTestScoreMatch(user: UserProfile, program: Program): number {
    const requiredTests = program.requirements.requiredTests;
    
    if (requiredTests.length === 0) {
      return 100; // No tests required
    }

    let totalScore = 0;
    let matchedTests = 0;

    for (const required of requiredTests) {
      const userTest = user.academic.standardizedTests.find(
        (t) => t.testType === required.testType
      );

      if (!userTest) {
        if (required.required) {
          totalScore += 0; // Missing required test
        }
        continue;
      }

      // Check if test is still valid
      if (userTest.expirationDate && userTest.expirationDate < this.currentDate) {
        totalScore += 20; // Expired test
        matchedTests++;
        continue;
      }

      // Calculate score match
      const normalizedUserScore = userTest.totalScore / userTest.maxScore;
      const normalizedRequired = required.minimumScore / required.maxScore;

      if (normalizedUserScore >= normalizedRequired) {
        const excess = normalizedUserScore - normalizedRequired;
        totalScore += Math.min(100, 75 + excess * 100);
      } else {
        const deficit = normalizedRequired - normalizedUserScore;
        totalScore += Math.max(0, 75 - deficit * 150);
      }

      matchedTests++;
    }

    if (matchedTests === 0) {
      return requiredTests.every((t) => !t.required) ? 70 : 0;
    }

    return Math.round(totalScore / requiredTests.length);
  }

  private calculateResearchMatch(user: UserProfile, program: Program): number {
    const research = user.academic.researchExperience;
    
    // Base score for having any research
    if (research.length === 0) {
      // Check if research is expected for this program level
      if (user.academic.targetDegree === 'phd') {
        return 30; // Research expected for PhD
      }
      if (user.academic.targetDegree === 'masters') {
        return 50; // Some programs don't require research
      }
      return 70; // Undergrad typically doesn't need research
    }

    let score = 50; // Base score for having research

    // Evaluate each research experience
    for (const exp of research) {
      // Role weight
      const roleWeights: Record<string, number> = {
        lead: 15,
        'co-researcher': 10,
        assistant: 6,
        intern: 3,
      };
      score += roleWeights[exp.role] || 3;

      // Duration bonus (months)
      const startDate = new Date(exp.startDate);
      const endDate = exp.endDate ? new Date(exp.endDate) : this.currentDate;
      const months = this.monthsBetween(startDate, endDate);
      score += Math.min(10, months * 0.5);

      // Field relevance
      if (this.isFieldRelevant(exp.fieldOfStudy, program.field)) {
        score += 10;
      }

      // Outcomes/publications
      score += Math.min(10, exp.outcomes.length * 2);
    }

    return Math.min(100, score);
  }

  private calculatePublicationMatch(user: UserProfile, program: Program): number {
    const publications = user.academic.publications;
    
    if (publications.length === 0) {
      // Check program level expectations
      if (user.academic.targetDegree === 'phd') {
        return 40; // Publications helpful but not always required
      }
      return 60; // Lower levels don't typically require publications
    }

    let score = 50;

    for (const pub of publications) {
      // Type weight
      const typeWeights: Record<string, number> = {
        journal: 15,
        conference: 10,
        book_chapter: 8,
        preprint: 5,
        thesis: 3,
      };
      score += typeWeights[pub.type] || 3;

      // First author bonus
      if (pub.isFirstAuthor) {
        score += 10;
      } else if (pub.authorPosition <= 3) {
        score += 5;
      }

      // Impact factor and citations
      if (pub.impactFactor && pub.impactFactor > 5) {
        score += Math.min(15, pub.impactFactor);
      }
      if (pub.citationCount > 0) {
        score += Math.min(10, pub.citationCount * 0.5);
      }

      // Peer reviewed
      if (pub.peerReviewed) {
        score += 5;
      }
    }

    return Math.min(100, score);
  }

  private calculatePrerequisiteMatch(user: UserProfile, program: Program): number {
    const prerequisites = program.requirements.prerequisites;
    
    if (prerequisites.length === 0) {
      return 100;
    }

    // This would need course matching logic in a real implementation
    // For now, provide a simplified version
    const fieldMatch = user.academic.targetFields.some((f) =>
      this.isFieldRelevant(f, program.field)
    );

    if (fieldMatch) {
      return 85;
    }

    // Check if current degree aligns
    if (this.degreeAligns(user.academic.currentDegree, program.degree)) {
      return 70;
    }

    return 50;
  }

  // ============================================
  // PROFILE SCORING (SOFT FACTORS)
  // ============================================

  private calculateProfileScore(user: UserProfile, program: Program): ProfileScore {
    const referenceStrength = this.calculateReferenceStrength(user.academic.references);
    const extracurricularMatch = this.calculateExtracurricularMatch(
      user.academic.extracurriculars,
      program
    );
    const workExperienceMatch = this.calculateWorkExperienceMatch(
      user.academic.workExperience,
      program
    );
    const leadershipScore = this.calculateLeadershipScore(user);
    const uniquenessScore = this.calculateUniquenessScore(user);

    const weights = {
      references: 0.35,
      extracurriculars: 0.20,
      work: 0.15,
      leadership: 0.15,
      uniqueness: 0.15,
    };

    const total =
      referenceStrength * weights.references +
      extracurricularMatch * weights.extracurriculars +
      workExperienceMatch * weights.work +
      leadershipScore * weights.leadership +
      uniquenessScore * weights.uniqueness;

    return {
      total: Math.round(total),
      referenceStrength,
      extracurricularMatch,
      workExperienceMatch,
      leadershipScore,
      uniquenessScore,
    };
  }

  private calculateReferenceStrength(references: Reference[]): number {
    if (references.length === 0) {
      return 20; // Very low - references are critical
    }

    let score = 0;
    const academicRefs = references.filter((r) => r.academicWeight >= 0.7);
    const professionalRefs = references.filter((r) => r.academicWeight < 0.7);

    // Academic references are usually more important
    for (const ref of academicRefs) {
      let refScore = ref.strengthScore * 8; // Base from strength score

      // Relationship type bonus
      if (ref.relationship === 'professor' || ref.relationship === 'supervisor') {
        refScore += 10;
      }

      // Years known bonus
      if (ref.yearsKnown >= 2) {
        refScore += 10;
      } else if (ref.yearsKnown >= 1) {
        refScore += 5;
      }

      // Letter received bonus
      if (ref.letterReceived) {
        refScore += 5;
      }

      score += Math.min(40, refScore);
    }

    // Professional references (less weight)
    for (const ref of professionalRefs) {
      let refScore = ref.strengthScore * 5;

      if (ref.relationship === 'employer') {
        refScore += 5;
      }

      if (ref.letterReceived) {
        refScore += 3;
      }

      score += Math.min(20, refScore);
    }

    // Ideal: 2-3 strong academic references
    if (academicRefs.length >= 2 && academicRefs.every((r) => r.strengthScore >= 7)) {
      score += 10;
    }

    return Math.min(100, score);
  }

  private calculateExtracurricularMatch(
    activities: Extracurricular[],
    program: Program
  ): number {
    if (activities.length === 0) {
      return 40;
    }

    let score = 40;

    // Calculate engagement depth
    const totalHours = activities.reduce(
      (sum, a) => sum + a.hoursPerWeek * this.getActivityDurationWeeks(a),
      0
    );

    score += Math.min(20, totalHours / 100);

    // Diversity of activities
    const categories = new Set(activities.map((a) => a.category));
    score += Math.min(15, categories.size * 3);

    // Leadership in activities
    const leadershipActivities = activities.filter(
      (a) => a.leadershipLevel === 'president' || 
             a.leadershipLevel === 'founder' ||
             a.leadershipLevel === 'officer'
    );
    score += Math.min(15, leadershipActivities.length * 5);

    // Achievements
    const totalAchievements = activities.reduce(
      (sum, a) => sum + a.achievements.length,
      0
    );
    score += Math.min(10, totalAchievements * 2);

    return Math.min(100, score);
  }

  private calculateWorkExperienceMatch(
    workExp: any[],
    program: Program
  ): number {
    if (workExp.length === 0) {
      // Some programs prefer work experience
      if (program.requirements.workExperienceYears) {
        return 30;
      }
      return 60;
    }

    let score = 50;

    // Calculate total years of experience
    let totalMonths = 0;
    for (const exp of workExp) {
      const start = new Date(exp.startDate);
      const end = exp.endDate ? new Date(exp.endDate) : this.currentDate;
      totalMonths += this.monthsBetween(start, end);
    }

    const totalYears = totalMonths / 12;
    const requiredYears = program.requirements.workExperienceYears || 0;

    if (totalYears >= requiredYears) {
      score += 20;
    } else if (requiredYears > 0) {
      score += (totalYears / requiredYears) * 20;
    }

    // Relevance to study
    const relevantExp = workExp.filter((e) => e.isRelevantToStudy);
    score += Math.min(20, relevantExp.length * 10);

    // Achievements
    const totalAchievements = workExp.reduce(
      (sum, e) => sum + e.achievements.length,
      0
    );
    score += Math.min(10, totalAchievements * 2);

    return Math.min(100, score);
  }

  private calculateLeadershipScore(user: UserProfile): number {
    let score = 40;

    // From extracurriculars
    const leadershipRoles = user.academic.extracurriculars.filter(
      (e) => e.leadershipLevel !== 'member' && e.leadershipLevel !== 'committee'
    );

    for (const role of leadershipRoles) {
      const levelBonus: Record<string, number> = {
        founder: 20,
        president: 15,
        officer: 10,
      };
      score += levelBonus[role.leadershipLevel] || 0;
    }

    // From research
    const leadResearch = user.academic.researchExperience.filter(
      (r) => r.role === 'lead'
    );
    score += leadResearch.length * 10;

    // From projects
    const leadProjects = user.academic.projects.filter(
      (p) => p.role.toLowerCase().includes('lead') || 
             p.role.toLowerCase().includes('founder')
    );
    score += leadProjects.length * 8;

    // From awards
    const leadershipAwards = user.academic.awards.filter(
      (a) => a.category === 'leadership'
    );
    score += leadershipAwards.length * 5;

    return Math.min(100, score);
  }

  private calculateUniquenessScore(user: UserProfile): number {
    let score = 50;

    // International experience
    if (user.personal.currentCountry !== user.personal.nationality) {
      score += 10;
    }

    // Multiple languages
    const fluentLanguages = user.personal.otherLanguages.filter(
      (l) => ['B2', 'C1', 'C2', 'Native'].includes(l.level)
    );
    score += Math.min(15, fluentLanguages.length * 5);

    // Diverse research areas
    const researchFields = new Set(
      user.academic.researchExperience.map((r) => r.fieldOfStudy)
    );
    if (researchFields.size > 1) {
      score += 10;
    }

    // Unique combinations (e.g., tech + arts)
    const extracurricularCategories = new Set(
      user.academic.extracurriculars.map((e) => e.category)
    );
    if (extracurricularCategories.size >= 3) {
      score += 10;
    }

    // High-impact projects
    const internationalProjects = user.academic.projects.filter(
      (p) => p.impact === 'international'
    );
    score += internationalProjects.length * 5;

    return Math.min(100, score);
  }

  // ============================================
  // FINANCIAL SCORING
  // ============================================

  private calculateFinancialScore(
    user: UserProfile,
    program: Program,
    university: University
  ): FinancialScore {
    const affordability = this.calculateAffordability(user, program, university);
    const fundingAvailability = this.calculateFundingAvailability(user, program);
    const costOfLivingMatch = this.calculateCostOfLivingMatch(user, university);

    const weights = {
      affordability: 0.50,
      funding: 0.35,
      costOfLiving: 0.15,
    };

    const total =
      affordability * weights.affordability +
      fundingAvailability * weights.funding +
      costOfLivingMatch * weights.costOfLiving;

    return {
      total: Math.round(total),
      affordability,
      fundingAvailability,
      costOfLivingMatch,
    };
  }

  private calculateAffordability(
    user: UserProfile,
    program: Program,
    university: University
  ): number {
    const annualCost =
      program.tuition.internationalTuition + 
      university.financialInfo.averageCostOfLiving;

    const userBudget = user.financial.annualBudget;

    if (userBudget >= annualCost) {
      const surplus = userBudget - annualCost;
      return Math.min(100, 80 + (surplus / annualCost) * 20);
    }

    // Calculate deficit
    const deficit = annualCost - userBudget;
    const deficitRatio = deficit / annualCost;

    if (deficitRatio <= 0.2) {
      return 70 - deficitRatio * 50; // 60-70
    } else if (deficitRatio <= 0.5) {
      return 60 - deficitRatio * 60; // 30-60
    } else {
      return Math.max(10, 40 - deficitRatio * 40);
    }
  }

  private calculateFundingAvailability(
    user: UserProfile,
    program: Program
  ): number {
    const funding = program.funding;
    
    if (funding.length === 0) {
      return user.financial.canSelfFund ? 60 : 30;
    }

    let score = 40;

    // Check for full funding options
    const fullFunding = funding.filter((f) => f.coverage === 'full');
    if (fullFunding.length > 0) {
      score += 25;
    }

    // Check for need-based aid if user needs it
    if (user.financial.needsFinancialAid) {
      const needBasedOptions = funding.filter((f) => f.needBased);
      score += Math.min(20, needBasedOptions.length * 5);
    }

    // Merit-based options
    const meritOptions = funding.filter((f) => f.meritBased);
    score += Math.min(15, meritOptions.length * 3);

    // Assistantships/fellowships (often come with stipend)
    const assistantships = funding.filter(
      (f) => f.type === 'assistantship' || f.type === 'fellowship'
    );
    if (assistantships.length > 0) {
      score += 10;
    }

    return Math.min(100, score);
  }

  private calculateCostOfLivingMatch(
    user: UserProfile,
    university: University
  ): number {
    const livingBudget = user.financial.livingExpensesBudget;
    const avgLivingCost = university.financialInfo.averageCostOfLiving;

    if (livingBudget >= avgLivingCost * 1.2) {
      return 100; // Comfortable margin
    } else if (livingBudget >= avgLivingCost) {
      return 80;
    } else if (livingBudget >= avgLivingCost * 0.8) {
      return 60;
    } else if (livingBudget >= avgLivingCost * 0.6) {
      return 40;
    } else {
      return 20;
    }
  }

  // ============================================
  // PREFERENCE SCORING
  // ============================================

  private calculatePreferenceScore(
    user: UserProfile,
    university: University,
    program: Program
  ): PreferenceScore {
    const locationMatch = this.calculateLocationMatch(user, university);
    const programFitMatch = this.calculateProgramFitMatch(user, program);
    const culturalFitMatch = this.calculateCulturalFitMatch(user, university);
    const careerAlignmentMatch = this.calculateCareerAlignmentMatch(user, program);

    const weights = {
      location: 0.30,
      programFit: 0.35,
      cultural: 0.15,
      career: 0.20,
    };

    const total =
      locationMatch * weights.location +
      programFitMatch * weights.programFit +
      culturalFitMatch * weights.cultural +
      careerAlignmentMatch * weights.career;

    return {
      total: Math.round(total),
      locationMatch,
      programFitMatch,
      culturalFitMatch,
      careerAlignmentMatch,
    };
  }

  private calculateLocationMatch(user: UserProfile, university: University): number {
    let score = 50;

    // Country preference
    if (user.preferences.targetCountries.includes(university.country)) {
      score += 30;
    }

    // City preference
    if (user.preferences.preferredCities?.includes(university.city)) {
      score += 15;
    }

    // Region preference
    if (user.preferences.preferredRegions?.includes(university.region)) {
      score += 10;
    }

    // Weight by user's importance factor
    const locationImportance = user.preferences.importanceFactors.location / 10;
    
    return Math.min(100, score) * locationImportance + (100 * (1 - locationImportance) * 0.5);
  }

  private calculateProgramFitMatch(user: UserProfile, program: Program): number {
    let score = 40;

    // Field match
    if (user.academic.targetFields.some((f) => this.isFieldRelevant(f, program.field))) {
      score += 30;
    }

    // Subfield match
    const subFieldMatches = user.academic.targetFields.filter((f) =>
      program.subfields.some((sf) => this.isFieldRelevant(f, sf))
    );
    score += Math.min(15, subFieldMatches.length * 5);

    // Program duration match
    const userMinMonths = 
      user.preferences.programLength.unit === 'years'
        ? user.preferences.programLength.min * 12
        : user.preferences.programLength.min;
    const userMaxMonths = 
      user.preferences.programLength.unit === 'years'
        ? user.preferences.programLength.max * 12
        : user.preferences.programLength.max;
    const programMonths =
      program.duration.unit === 'years'
        ? program.duration.value * 12
        : program.duration.value;

    if (programMonths >= userMinMonths && programMonths <= userMaxMonths) {
      score += 10;
    }

    // Research areas match (for research programs)
    if (program.researchAreas.length > 0) {
      const matchingAreas = user.academic.researchExperience.filter((r) =>
        program.researchAreas.some((area) => this.isFieldRelevant(r.fieldOfStudy, area))
      );
      score += Math.min(10, matchingAreas.length * 5);
    }

    return Math.min(100, score);
  }

  private calculateCulturalFitMatch(user: UserProfile, university: University): number {
    let score = 50;

    // Language proficiency for country
    const universityPrograms = university.programs;
    const programLanguages = new Set(universityPrograms.map((p) => p.language));
    
    for (const lang of programLanguages) {
      if (user.personal.nativeLanguage === lang) {
        score += 25;
        break;
      }
      const proficiency = user.personal.otherLanguages.find(
        (l) => l.language.toLowerCase() === lang.toLowerCase()
      );
      if (proficiency && ['B2', 'C1', 'C2'].includes(proficiency.level)) {
        score += 15;
        break;
      }
    }

    // International student percentage (diversity comfort)
    if (university.campusInfo.internationalStudentPercentage >= 20) {
      score += 10;
    }

    // Diversity preference
    const diversityImportance = user.preferences.importanceFactors.diversity / 10;
    if (university.campusInfo.diversityIndex >= 0.7) {
      score += 15 * diversityImportance;
    }

    return Math.min(100, score);
  }

  private calculateCareerAlignmentMatch(user: UserProfile, program: Program): number {
    let score = 50;

    // Employment rate
    if (program.employmentRate >= 0.9) {
      score += 25;
    } else if (program.employmentRate >= 0.8) {
      score += 15;
    } else if (program.employmentRate >= 0.7) {
      score += 5;
    }

    // Industry connections importance
    const careerImportance = user.preferences.importanceFactors.careerServices / 10;
    if (program.averageSalaryAfterGraduation) {
      score += 15 * careerImportance;
    }

    // Relevance to current work (if continuing career)
    const relevantWorkExp = user.academic.workExperience.filter(
      (w) => w.isRelevantToStudy
    );
    if (relevantWorkExp.length > 0) {
      score += 10;
    }

    return Math.min(100, score);
  }

  // ============================================
  // DOCUMENT SCORING
  // ============================================

  private calculateDocumentScore(user: UserProfile, program: Program): DocumentScore {
    const completeness = this.calculateDocumentCompleteness(user, program);
    const quality = this.calculateDocumentQuality(user);
    const deadlineStatus = this.calculateDeadlineStatus(user, program);

    const weights = {
      completeness: 0.40,
      quality: 0.35,
      deadline: 0.25,
    };

    const total =
      completeness * weights.completeness +
      quality * weights.quality +
      deadlineStatus * weights.deadline;

    return {
      total: Math.round(total),
      completeness,
      quality,
      deadlineStatus,
    };
  }

  private calculateDocumentCompleteness(user: UserProfile, program: Program): number {
    const required = program.requirements.requiredDocuments;
    const userDocs = user.documents;
    let completed = 0;
    let total = 0;

    for (const req of required) {
      total++;
      
      // Map document types to user document status
      const docMap: Record<string, string> = {
        'cv': 'cv',
        'resume': 'cv',
        'statement_of_purpose': 'statementOfPurpose',
        'sop': 'statementOfPurpose',
        'personal_statement': 'statementOfPurpose',
        'transcripts': 'transcripts',
        'language_test': 'languageTestScores',
        'standardized_test': 'standardizedTestScores',
        'portfolio': 'portfolio',
        'writing_sample': 'writingSample',
        'research_proposal': 'researchProposal',
      };

      const docKey = docMap[req.documentType.toLowerCase().replace(/ /g, '_')];
      if (docKey && (userDocs as any)[docKey]?.status === 'completed') {
        completed++;
      }
    }

    // Check recommendation letters separately
    const reqLetters = required.find((r) => 
      r.documentType.toLowerCase().includes('recommendation') ||
      r.documentType.toLowerCase().includes('letter')
    );
    if (reqLetters) {
      const requiredCount = reqLetters.quantity || 2;
      const receivedCount = userDocs.recommendationLetters.filter(
        (l) => l.status === 'completed'
      ).length;
      if (receivedCount >= requiredCount) {
        completed++;
      }
      total++;
    }

    if (total === 0) return 100;
    return Math.round((completed / total) * 100);
  }

  private calculateDocumentQuality(user: UserProfile): number {
    const docs = user.documents;
    const qualityScores: number[] = [];

    // Core documents quality
    if (docs.statementOfPurpose.quality) {
      qualityScores.push(docs.statementOfPurpose.quality);
    }
    if (docs.cv.quality) {
      qualityScores.push(docs.cv.quality);
    }

    // Recommendation letters (average quality)
    const letterQualities = docs.recommendationLetters
      .filter((l) => l.quality)
      .map((l) => l.quality!);
    if (letterQualities.length > 0) {
      qualityScores.push(
        letterQualities.reduce((a, b) => a + b, 0) / letterQualities.length
      );
    }

    if (qualityScores.length === 0) {
      return 50; // No quality data available
    }

    return Math.round(
      qualityScores.reduce((a, b) => a + b, 0) / qualityScores.length
    );
  }

  private calculateDeadlineStatus(user: UserProfile, program: Program): number {
    const deadline = new Date(program.deadline.regularDeadline);
    const daysUntil = this.daysBetween(this.currentDate, deadline);

    if (daysUntil < 0) {
      return 0; // Deadline passed
    }

    // Check document preparation status
    const incompleteImportantDocs = 
      user.documents.statementOfPurpose.status !== 'completed' ||
      user.documents.cv.status !== 'completed';

    if (incompleteImportantDocs) {
      if (daysUntil < 7) return 20;
      if (daysUntil < 14) return 40;
      if (daysUntil < 30) return 60;
      return 80;
    }

    // Documents ready
    if (daysUntil < 7) return 70;
    if (daysUntil < 14) return 85;
    return 100;
  }

  // ============================================
  // ADMISSION CHANCE ESTIMATION
  // ============================================

  private estimateAdmissionChance(
    user: UserProfile,
    program: Program,
    university: University,
    scores: DetailedScores
  ): number {
    // Base chance from acceptance rate
    let baseChance = university.admissionStats.acceptanceRate * 100;

    // Adjust based on international status
    if (user.personal.nationality !== university.country) {
      const intlRate = university.admissionStats.internationalAcceptanceRate;
      if (intlRate) {
        baseChance = intlRate * 100;
      }
    }

    // Academic adjustment
    const academicMod = (scores.academic.total - 70) / 100;
    baseChance += baseChance * academicMod * 0.4;

    // Profile adjustment
    const profileMod = (scores.profile.total - 70) / 100;
    baseChance += baseChance * profileMod * 0.3;

    // Document readiness adjustment
    const docMod = (scores.documents.total - 70) / 100;
    baseChance += baseChance * docMod * 0.2;

    // GPA specific adjustment
    if (user.academic.gpa.normalizedGPA >= university.admissionStats.averageGPA) {
      baseChance += 10;
    } else if (user.academic.gpa.normalizedGPA < program.requirements.minimumGPA) {
      baseChance -= 20;
    }

    // Clamp to reasonable range
    return Math.max(5, Math.min(95, Math.round(baseChance)));
  }

  private determineMatchCategory(
    estimatedChance: number
  ): 'safety' | 'match' | 'reach' | 'far_reach' {
    if (estimatedChance >= this.config.thresholds.safetyMinChance) {
      return 'safety';
    }
    if (estimatedChance >= this.config.thresholds.matchMinChance) {
      return 'match';
    }
    if (estimatedChance >= this.config.thresholds.reachMinChance) {
      return 'reach';
    }
    return 'far_reach';
  }

  // ============================================
  // INSIGHTS GENERATION
  // ============================================

  private generateInsights(
    user: UserProfile,
    university: University,
    program: Program,
    scores: DetailedScores
  ): MatchInsight[] {
    const insights: MatchInsight[] = [];

    // Academic insights
    if (scores.academic.gpaMatch >= 80) {
      insights.push({
        type: 'strength',
        category: 'Academic',
        message: `Your GPA is competitive for ${university.name}`,
        actionable: false,
        priority: 'medium',
      });
    } else if (scores.academic.gpaMatch < 50) {
      insights.push({
        type: 'weakness',
        category: 'Academic',
        message: 'Your GPA is below the typical range for admitted students',
        actionable: true,
        action: 'Consider highlighting strong upward trends or exceptional achievements in other areas',
        priority: 'high',
      });
    }

    // Reference insights
    if (scores.profile.referenceStrength < 60) {
      insights.push({
        type: 'weakness',
        category: 'References',
        message: 'Your recommendation letters could be strengthened',
        actionable: true,
        action: 'Consider seeking references from professors who know your work well or from research supervisors',
        priority: 'high',
      });
    }

    // Research insights for PhD programs
    if (program.degree === 'phd' && scores.academic.researchMatch < 60) {
      insights.push({
        type: 'warning',
        category: 'Research',
        message: 'PhD programs typically expect significant research experience',
        actionable: true,
        action: 'Look for research assistant positions or independent research projects in your field',
        priority: 'high',
      });
    }

    // Financial insights
    if (scores.financial.affordability < 50) {
      insights.push({
        type: 'warning',
        category: 'Financial',
        message: 'This program may exceed your budget',
        actionable: true,
        action: 'Explore scholarship and assistantship opportunities - this program offers funding options',
        priority: 'medium',
      });
    }

    if (scores.financial.fundingAvailability >= 70) {
      insights.push({
        type: 'opportunity',
        category: 'Financial',
        message: `${program.funding.length} funding opportunities available`,
        actionable: true,
        action: 'Apply for available scholarships and assistantships early',
        priority: 'medium',
      });
    }

    // Deadline insights
    const daysUntilDeadline = this.daysBetween(
      this.currentDate,
      new Date(program.deadline.regularDeadline)
    );

    if (daysUntilDeadline < 0) {
      insights.push({
        type: 'warning',
        category: 'Deadline',
        message: 'Application deadline has passed',
        actionable: false,
        priority: 'high',
      });
    } else if (daysUntilDeadline < 14) {
      insights.push({
        type: 'warning',
        category: 'Deadline',
        message: `Only ${daysUntilDeadline} days until deadline`,
        actionable: true,
        action: 'Prioritize completing your application materials immediately',
        priority: 'high',
      });
    }

    // Document insights
    if (scores.documents.completeness < 100) {
      const missing = this.getMissingDocuments(user, program);
      insights.push({
        type: 'warning',
        category: 'Documents',
        message: `Missing documents: ${missing.join(', ')}`,
        actionable: true,
        action: 'Complete all required documents before applying',
        priority: 'high',
      });
    }

    // Statement of Purpose quality
    if (user.documents.statementOfPurpose.quality && 
        user.documents.statementOfPurpose.quality < 70) {
      insights.push({
        type: 'opportunity',
        category: 'Documents',
        message: 'Your Statement of Purpose could be improved',
        actionable: true,
        action: 'Consider getting feedback from mentors or using our SOP review service',
        priority: 'medium',
      });
    }

    // Program fit insights
    if (scores.preference.programFitMatch >= 80) {
      insights.push({
        type: 'strength',
        category: 'Program Fit',
        message: 'This program aligns well with your academic interests and background',
        actionable: false,
        priority: 'low',
      });
    }

    return insights.sort((a, b) => {
      const priorityOrder = { high: 0, medium: 1, low: 2 };
      return priorityOrder[a.priority] - priorityOrder[b.priority];
    });
  }

  // ============================================
  // APPLICATION STATUS
  // ============================================

  private calculateApplicationStatus(
    user: UserProfile,
    program: Program
  ): ApplicationStatus {
    const deadline = new Date(program.deadline.regularDeadline);
    const daysUntil = this.daysBetween(this.currentDate, deadline);
    const deadlinePassed = daysUntil < 0;

    const missingDocuments = this.getMissingDocuments(user, program);
    const documentsComplete = missingDocuments.length === 0;

    // Estimate preparation time
    let estimatedTime = 0;
    if (user.documents.statementOfPurpose.status !== 'completed') {
      estimatedTime += 20; // hours for SOP
    }
    if (user.documents.cv.status !== 'completed') {
      estimatedTime += 5;
    }
    estimatedTime += missingDocuments.length * 3;

    // Determine blockers
    const blockers: string[] = [];
    if (deadlinePassed) {
      blockers.push('Deadline has passed');
    }
    if (!documentsComplete) {
      blockers.push(`Missing ${missingDocuments.length} required documents`);
    }

    // Check prerequisites
    if (program.requirements.minimumGPA > user.academic.gpa.normalizedGPA) {
      blockers.push('GPA below minimum requirement');
    }

    return {
      deadlinePassed,
      daysUntilDeadline: Math.max(0, daysUntil),
      documentsComplete,
      missingDocuments,
      estimatedPreparationTime: estimatedTime,
      canApply: blockers.length === 0,
      blockers,
    };
  }

  private getMissingDocuments(user: UserProfile, program: Program): string[] {
    const missing: string[] = [];
    const required = program.requirements.requiredDocuments;

    for (const req of required) {
      if (!req.required) continue;

      const docType = req.documentType.toLowerCase();

      if (docType.includes('cv') || docType.includes('resume')) {
        if (user.documents.cv.status !== 'completed') {
          missing.push('CV/Resume');
        }
      } else if (docType.includes('statement') || docType.includes('sop')) {
        if (user.documents.statementOfPurpose.status !== 'completed') {
          missing.push('Statement of Purpose');
        }
      } else if (docType.includes('transcript')) {
        if (user.documents.transcripts.status !== 'completed') {
          missing.push('Transcripts');
        }
      } else if (docType.includes('recommendation') || docType.includes('letter')) {
        const requiredCount = req.quantity || 2;
        const receivedCount = user.documents.recommendationLetters.filter(
          (l) => l.status === 'completed'
        ).length;
        if (receivedCount < requiredCount) {
          missing.push(`Recommendation Letters (${receivedCount}/${requiredCount})`);
        }
      }
    }

    // Check language test if required
    if (program.requirements.languageRequirements.length > 0) {
      if (user.documents.languageTestScores.status !== 'completed') {
        missing.push('Language Test Scores');
      }
    }

    return missing;
  }

  // ============================================
  // HELPER FUNCTIONS
  // ============================================

  private passesBasicFilters(
    user: UserProfile,
    university: University,
    program: Program
  ): boolean {
    // Check deadline
    if (this.config.filters.excludeDeadlinePassed) {
      const deadline = new Date(program.deadline.regularDeadline);
      if (deadline < this.currentDate) {
        return false;
      }
    }

    // Check country preference
    if (user.preferences.targetCountries.length > 0) {
      if (!user.preferences.targetCountries.includes(university.country)) {
        return false;
      }
    }

    // Check degree level
    if (program.degree !== user.academic.targetDegree) {
      return false;
    }

    // Check semester preference
    if (user.preferences.startSemester !== 'any') {
      if (program.deadline.semester !== user.preferences.startSemester) {
        return false;
      }
    }

    // Check year preference
    if (program.deadline.year !== user.preferences.startYear) {
      return false;
    }

    return true;
  }

  private calculateWeightedScore(scores: DetailedScores): number {
    return Math.round(
      scores.academic.total * this.config.weights.academic +
      scores.financial.total * this.config.weights.financial +
      scores.profile.total * this.config.weights.profile +
      scores.preference.total * this.config.weights.preference +
      scores.documents.total * this.config.weights.documents
    );
  }

  private isFieldRelevant(field1: string, field2: string): boolean {
    const f1 = field1.toLowerCase().trim();
    const f2 = field2.toLowerCase().trim();

    if (f1 === f2) return true;
    if (f1.includes(f2) || f2.includes(f1)) return true;

    // Common field mappings
    const fieldGroups: string[][] = [
      ['computer science', 'cs', 'computing', 'software engineering', 'informatics'],
      ['artificial intelligence', 'ai', 'machine learning', 'ml', 'deep learning'],
      ['data science', 'data analytics', 'statistics', 'applied statistics'],
      ['biology', 'biological sciences', 'life sciences', 'biosciences'],
      ['physics', 'applied physics', 'physical sciences'],
      ['chemistry', 'chemical sciences', 'applied chemistry'],
      ['business', 'management', 'mba', 'business administration'],
      ['economics', 'applied economics', 'economic sciences'],
      ['psychology', 'cognitive science', 'behavioral science'],
      ['engineering', 'applied engineering', 'engineering sciences'],
    ];

    for (const group of fieldGroups) {
      const f1InGroup = group.some((g) => f1.includes(g) || g.includes(f1));
      const f2InGroup = group.some((g) => f2.includes(g) || g.includes(f2));
      if (f1InGroup && f2InGroup) return true;
    }

    return false;
  }

  private degreeAligns(current: string, target: string): boolean {
    const progression: Record<string, string[]> = {
      high_school: ['bachelors'],
      bachelors: ['masters', 'phd'],
      masters: ['phd', 'postdoc'],
      phd: ['postdoc'],
    };

    return progression[current]?.includes(target) || false;
  }

  private monthsBetween(start: Date, end: Date): number {
    return (
      (end.getFullYear() - start.getFullYear()) * 12 +
      (end.getMonth() - start.getMonth())
    );
  }

  private daysBetween(start: Date, end: Date): number {
    const msPerDay = 24 * 60 * 60 * 1000;
    return Math.floor((end.getTime() - start.getTime()) / msPerDay);
  }

  private getActivityDurationWeeks(activity: Extracurricular): number {
    const start = new Date(activity.startDate);
    const end = activity.endDate ? new Date(activity.endDate) : this.currentDate;
    const msPerWeek = 7 * 24 * 60 * 60 * 1000;
    return Math.floor((end.getTime() - start.getTime()) / msPerWeek);
  }
}

export default UniversityMatchingEngine;
