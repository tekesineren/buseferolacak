'use client';

import { useState } from 'react';
import { User, GraduationCap, Globe, DollarSign, Award, Briefcase, Languages, Target, ShieldAlert } from 'lucide-react';

export type ScholarshipInterest = {
  type: 'none' | 'sports' | 'arts' | '';
  sports?: {
    gender: string;
    sport: string;
    position?: string;
    years_playing: string;
    level: string;
    achievements: string;
    team_name?: string;
    highlight_video?: string;
    is_licensed_in_turkey: boolean;
  }[];
  arts?: {
    field: string;
    portfolio_url?: string;
    years_experience: string;
    achievements: string;
    preferred_major?: string;
  }[];
};

export type SportActivity = {
  sport: string;
  position?: string;
  years_playing: string;
  level: string;
  achievements: string;
  team_name?: string;
  highlight_video?: string;
};

export type VisaRejection = {
  country: string;
  visa_type: string;
  rejection_date: string;
  rejection_reason: string;
  additional_details?: string;
};

export type FamilyLegalHistory = {
  criminal_record: boolean;
  criminal_record_details?: string;
  immigration_violation: boolean;
  immigration_violation_details?: string;
  deportation_history: boolean;
  deportation_details?: string;
  asylum_application: boolean;
  asylum_details?: string;
  overstay_history: boolean;
  overstay_details?: string;
};

export type AcademicHistory = {
  high_school: {
    name?: string;
    grade_level?: string;
    diploma_grade?: string;
    grade_9_math?: string;
    grade_9_science?: string;
    grade_9_english?: string;
    grade_9_social?: string;
    grade_10_math?: string;
    grade_10_science?: string;
    grade_10_english?: string;
    grade_10_social?: string;
    grade_11_math?: string;
    grade_11_science?: string;
    grade_11_english?: string;
    grade_11_social?: string;
    grade_12_math?: string;
    grade_12_science?: string;
    grade_12_english?: string;
    grade_12_social?: string;
    repeated_grade: boolean;
    repeated_grade_details?: string;
  };
  bachelor: {
    university_name?: string;
    major?: string;
    gpa?: string;
    graduation_year?: string;
    repeated_grade: boolean;
    repeated_grade_details?: string;
    double_major: boolean;
    double_major_field?: string;
    minor: boolean;
    minor_field?: string;
  };
  master?: {
    university_name?: string;
    major?: string;
    gpa?: string;
    graduation_year?: string;
    thesis_topic?: string;
  };
};

export type ProfileFormData = {
  program_type: 'high_school' | 'bachelor' | 'language_school' | 'master' | 'doctorate' | '';
  full_name: string;
  email: string;
  date_of_birth: string;
  nationality: string;
  current_education_level: string;
  target_degree_level: string;
  field_of_study: string;
  gpa: string;
  academic_history: AcademicHistory;
  career_goals: {
    primary_goal: string;
    research_interests: string[];
    dream_career: string;
  };
  visa_history: {
    has_rejections: boolean;
    rejections: VisaRejection[];
    family_legal_history: FamilyLegalHistory;
  };
  test_scores: {
    sat?: string;
    toefl?: string;
    ielts?: string;
    gre?: string;
  };
  languages: Array<{ language: string; proficiency: string }>;
  work_experience: Array<{ title: string; company: string; duration: string }>;
  sports_detailed: SportActivity[];
  scholarship_interest: ScholarshipInterest;
  extracurricular: {
    arts: string[];
    volunteer: string[];
  };
  achievements: Array<{ title: string; description: string }>;
  annual_budget: string;
  preferred_countries: string[];
  preferred_fields: string[];
};

type ProfileFormProps = {
  onSubmit: (data: ProfileFormData) => void;
  initialData?: ProfileFormData;
};

const emptyForm: ProfileFormData = {
  program_type: '',
  full_name: '',
  email: '',
  date_of_birth: '',
  nationality: '',
  current_education_level: '',
  target_degree_level: '',
  field_of_study: '',
  gpa: '',
  academic_history: {
    high_school: {
      repeated_grade: false,
    },
    bachelor: {
      repeated_grade: false,
      double_major: false,
      minor: false,
    },
  },
  career_goals: {
    primary_goal: '',
    research_interests: [],
    dream_career: '',
  },
  visa_history: {
    has_rejections: false,
    rejections: [],
    family_legal_history: {
      criminal_record: false,
      immigration_violation: false,
      deportation_history: false,
      asylum_application: false,
      overstay_history: false,
    },
  },
  test_scores: {},
  languages: [{ language: '', proficiency: '' }],
  work_experience: [],
  sports_detailed: [{ sport: '', years_playing: '', level: '', achievements: '' }],
  scholarship_interest: { type: '' },
  extracurricular: { arts: [], volunteer: [] },
  achievements: [{ title: '', description: '' }],
  annual_budget: '',
  preferred_countries: [],
  preferred_fields: [],
};

export default function ProfileForm({ onSubmit, initialData }: ProfileFormProps) {
  const [formData, setFormData] = useState<ProfileFormData>(initialData || emptyForm);
  const [currentStep, setCurrentStep] = useState(-1);

  const steps = [
    { title: 'Program Tipi', icon: Target },
    { title: 'Temel & Akademik Bilgiler', icon: User },
    { title: 'Kariyer Hedefleri', icon: Target },
    { title: 'Vize Gecmisi', icon: ShieldAlert },
    { title: 'Dil & Test Skorlari', icon: Languages },
    { title: 'Deneyim, Aktiviteler & Basarilar', icon: Briefcase },
    { title: 'Butce & Tercihler', icon: DollarSign },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      onSubmit(formData);
    }
  };

  const renderStep = () => {
    switch (currentStep) {
      case -1:
        return (
          <div className="space-y-6">
            <div className="bg-gradient-to-r from-blue-50 to-green-50 border border-blue-200 rounded-lg p-6 mb-6">
              <h3 className="text-2xl font-bold text-blue-900 mb-3">Ventora'ya Hos Geldiniz!</h3>
              <p className="text-blue-800 mb-4">
                Size en uygun egitim yolunu cizmek icin hangi seviyede egitim ariyorsunuz?
              </p>
            </div>

            <div className="space-y-4">
              <label className="block">
                <input
                  type="radio"
                  name="program_type"
                  value="high_school"
                  checked={formData.program_type === 'high_school'}
                  onChange={(e) => setFormData({ ...formData, program_type: e.target.value as ProfileFormData['program_type'] })}
                  className="sr-only peer"
                />
                <div className="border-2 border-gray-300 rounded-lg p-5 cursor-pointer hover:border-blue-500 peer-checked:border-blue-600 peer-checked:bg-blue-50 transition-all">
                  <div className="flex items-start gap-4">
                    <div className="w-5 h-5 rounded-full border-2 border-gray-300 peer-checked:border-blue-600 peer-checked:bg-blue-600 mt-1"></div>
                    <div className="flex-1">
                      <h4 className="text-lg font-semibold text-gray-900 mb-2">Lise Egitimi</h4>
                      <p className="text-sm text-gray-600">
                        Yurtdisinda lise okumak istiyorum. Boarding school ve uluslararasi lise programlari ariyorum.
                      </p>
                    </div>
                  </div>
                </div>
              </label>

              <label className="block">
                <input
                  type="radio"
                  name="program_type"
                  value="language_school"
                  checked={formData.program_type === 'language_school'}
                  onChange={(e) => setFormData({ ...formData, program_type: e.target.value as ProfileFormData['program_type'] })}
                  className="sr-only peer"
                />
                <div className="border-2 border-gray-300 rounded-lg p-5 cursor-pointer hover:border-blue-500 peer-checked:border-blue-600 peer-checked:bg-blue-50 transition-all">
                  <div className="flex items-start gap-4">
                    <div className="w-5 h-5 rounded-full border-2 border-gray-300 peer-checked:border-blue-600 peer-checked:bg-blue-600 mt-1"></div>
                    <div className="flex-1">
                      <h4 className="text-lg font-semibold text-gray-900 mb-2">Dil Okulu</h4>
                      <p className="text-sm text-gray-600">
                        Yabanci dil ogrenmek ve gelistirmek icin dil okulu programlari ariyorum.
                      </p>
                    </div>
                  </div>
                </div>
              </label>

              <label className="block">
                <input
                  type="radio"
                  name="program_type"
                  value="bachelor"
                  checked={formData.program_type === 'bachelor'}
                  onChange={(e) => setFormData({ ...formData, program_type: e.target.value as ProfileFormData['program_type'] })}
                  className="sr-only peer"
                />
                <div className="border-2 border-gray-300 rounded-lg p-5 cursor-pointer hover:border-blue-500 peer-checked:border-blue-600 peer-checked:bg-blue-50 transition-all">
                  <div className="flex items-start gap-4">
                    <div className="w-5 h-5 rounded-full border-2 border-gray-300 peer-checked:border-blue-600 peer-checked:bg-blue-600 mt-1"></div>
                    <div className="flex-1">
                      <h4 className="text-lg font-semibold text-gray-900 mb-2">Lisans (Bachelor's Degree)</h4>
                      <p className="text-sm text-gray-600">
                        Universite lisans programi ariyorum. Ilk universite diplomami almak istiyorum.
                      </p>
                    </div>
                  </div>
                </div>
              </label>

              <label className="block">
                <input
                  type="radio"
                  name="program_type"
                  value="master"
                  checked={formData.program_type === 'master'}
                  onChange={(e) => setFormData({ ...formData, program_type: e.target.value as ProfileFormData['program_type'] })}
                  className="sr-only peer"
                />
                <div className="border-2 border-gray-300 rounded-lg p-5 cursor-pointer hover:border-blue-500 peer-checked:border-blue-600 peer-checked:bg-blue-50 transition-all">
                  <div className="flex items-start gap-4">
                    <div className="w-5 h-5 rounded-full border-2 border-gray-300 peer-checked:border-blue-600 peer-checked:bg-blue-600 mt-1"></div>
                    <div className="flex-1">
                      <h4 className="text-lg font-semibold text-gray-900 mb-2">Yuksek Lisans (Master's Degree)</h4>
                      <p className="text-sm text-gray-600">
                        Lisans sonrasi uzmanlik yapmak istiyorum. Master programlari ve arastirma firsatlari ariyorum.
                      </p>
                    </div>
                  </div>
                </div>
              </label>

              <label className="block">
                <input
                  type="radio"
                  name="program_type"
                  value="doctorate"
                  checked={formData.program_type === 'doctorate'}
                  onChange={(e) => setFormData({ ...formData, program_type: e.target.value as ProfileFormData['program_type'] })}
                  className="sr-only peer"
                />
                <div className="border-2 border-gray-300 rounded-lg p-5 cursor-pointer hover:border-blue-500 peer-checked:border-blue-600 peer-checked:bg-blue-50 transition-all">
                  <div className="flex items-start gap-4">
                    <div className="w-5 h-5 rounded-full border-2 border-gray-300 peer-checked:border-blue-600 peer-checked:bg-blue-600 mt-1"></div>
                    <div className="flex-1">
                      <h4 className="text-lg font-semibold text-gray-900 mb-2">Doktora (PhD)</h4>
                      <p className="text-sm text-gray-600">
                        Akademik kariyer ve arastirma yapmak istiyorum. Doktora programlari ve tam burslu firsatlar ariyorum.
                      </p>
                    </div>
                  </div>
                </div>
              </label>
            </div>

            {formData.program_type && (
              <div className="bg-green-50 border border-green-300 rounded-lg p-4 mt-6">
                <p className="text-sm text-green-800">
                  <strong>Harika!</strong> Seciminize gore size ozel bir yol haritasi olusturacagiz.
                  Devam ederek profilinizi tamamlayin.
                </p>
              </div>
            )}
          </div>
        );

      case 0:
        return (
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Ad Soyad</label>
              <input
                type="text"
                value={formData.full_name}
                onChange={(e) => setFormData({ ...formData, full_name: e.target.value })}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">E-posta</label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Dogum Tarihi</label>
              <input
                type="date"
                value={formData.date_of_birth}
                onChange={(e) => setFormData({ ...formData, date_of_birth: e.target.value })}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Uyruk</label>
              <input
                type="text"
                value={formData.nationality}
                onChange={(e) => setFormData({ ...formData, nationality: e.target.value })}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Turkiye"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Mevcut Egitim Seviyesi</label>
              <select
                value={formData.current_education_level}
                onChange={(e) => setFormData({ ...formData, current_education_level: e.target.value })}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="">Seciniz</option>
                <option value="high_school">Lise</option>
                <option value="bachelor">Lisans</option>
                <option value="master">Yuksek Lisans</option>
                <option value="doctorate">Doktora</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">GPA/Not Ortalamasi</label>
              <input
                type="text"
                value={formData.gpa}
                onChange={(e) => setFormData({ ...formData, gpa: e.target.value })}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="3.5"
              />
            </div>
          </div>
        );

      case 1:
        return (
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Kariyer Hedefiniz</label>
              <input
                type="text"
                value={formData.career_goals.primary_goal}
                onChange={(e) => setFormData({ 
                  ...formData, 
                  career_goals: { ...formData.career_goals, primary_goal: e.target.value } 
                })}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Yazilim muhendisi olmak"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Hayalinizdeki Meslek</label>
              <input
                type="text"
                value={formData.career_goals.dream_career}
                onChange={(e) => setFormData({ 
                  ...formData, 
                  career_goals: { ...formData.career_goals, dream_career: e.target.value } 
                })}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Google'da calismak"
              />
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <input
                type="checkbox"
                checked={formData.visa_history.has_rejections}
                onChange={(e) => setFormData({ 
                  ...formData, 
                  visa_history: { ...formData.visa_history, has_rejections: e.target.checked } 
                })}
                className="w-5 h-5"
              />
              <label className="text-sm font-medium text-gray-700">Daha once vize reddedildi mi?</label>
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">TOEFL Skoru</label>
              <input
                type="text"
                value={formData.test_scores.toefl || ''}
                onChange={(e) => setFormData({ 
                  ...formData, 
                  test_scores: { ...formData.test_scores, toefl: e.target.value } 
                })}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="100"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">IELTS Skoru</label>
              <input
                type="text"
                value={formData.test_scores.ielts || ''}
                onChange={(e) => setFormData({ 
                  ...formData, 
                  test_scores: { ...formData.test_scores, ielts: e.target.value } 
                })}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="7.0"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">SAT Skoru</label>
              <input
                type="text"
                value={formData.test_scores.sat || ''}
                onChange={(e) => setFormData({ 
                  ...formData, 
                  test_scores: { ...formData.test_scores, sat: e.target.value } 
                })}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="1400"
              />
            </div>
          </div>
        );

      case 4:
        return (
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-gray-900">Spor Aktiviteleri</h3>
            {formData.sports_detailed.map((sport, index) => (
              <div key={index} className="border border-gray-200 rounded-lg p-4 space-y-3">
                <input
                  type="text"
                  value={sport.sport}
                  onChange={(e) => {
                    const updated = [...formData.sports_detailed];
                    updated[index] = { ...updated[index], sport: e.target.value };
                    setFormData({ ...formData, sports_detailed: updated });
                  }}
                  placeholder="Spor adi (orn: Futbol)"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <input
                  type="text"
                  value={sport.level}
                  onChange={(e) => {
                    const updated = [...formData.sports_detailed];
                    updated[index] = { ...updated[index], level: e.target.value };
                    setFormData({ ...formData, sports_detailed: updated });
                  }}
                  placeholder="Seviye (orn: Profesyonel)"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            ))}
          </div>
        );

      case 5:
        return (
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Yillik Butce (USD)</label>
              <input
                type="text"
                value={formData.annual_budget}
                onChange={(e) => setFormData({ ...formData, annual_budget: e.target.value })}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="50000"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Tercih Edilen Ulkeler</label>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                {['ABD', 'Ingiltere', 'Almanya', 'Kanada', 'Avustralya', 'Hollanda'].map((country) => (
                  <label key={country} className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={formData.preferred_countries.includes(country)}
                      onChange={(e) => {
                        const updated = e.target.checked
                          ? [...formData.preferred_countries, country]
                          : formData.preferred_countries.filter((c) => c !== country);
                        setFormData({ ...formData, preferred_countries: updated });
                      }}
                      className="w-4 h-4"
                    />
                    <span className="text-sm text-gray-700">{country}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-8">
      <div className="mb-8">
        {currentStep >= 0 && (
          <div className="flex items-center justify-between mb-4">
            <button
              type="button"
              onClick={() => setCurrentStep(currentStep - 1)}
              className="text-blue-600 hover:text-blue-700"
            >
              Geri
            </button>
            <div className="text-sm text-gray-500">
              Adim {currentStep + 1} / {steps.length}
            </div>
          </div>
        )}
        {currentStep >= 0 && (
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-blue-600 h-2 rounded-full transition-all"
              style={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
            />
          </div>
        )}
      </div>

      <form onSubmit={handleSubmit}>
        {renderStep()}

        <div className="mt-8">
          <button
            type="submit"
            disabled={currentStep === -1 && !formData.program_type}
            className="w-full bg-blue-600 text-white py-4 rounded-lg font-semibold hover:bg-blue-700 transition disabled:bg-gray-300 disabled:cursor-not-allowed"
          >
            {currentStep === steps.length - 1 ? 'Eslestirmeleri Goster' : 'Devam Et'}
          </button>
        </div>
      </form>
    </div>
  );
}
