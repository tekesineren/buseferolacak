'use client';

import { GraduationCap, DollarSign, Globe, Award, TrendingUp, MapPin, CheckCircle, AlertTriangle } from 'lucide-react';

export type UniversityMatch = {
  university: {
    id: string;
    name: string;
    country: string;
    city: string;
    ranking_global?: number;
    website?: string;
  };
  match: {
    overall_match_score: number;
    academic_match_score: number;
    financial_match_score: number;
    visa_match_score: number;
    scholarship_potential_score: number;
    post_graduation_score: number;
    estimated_total_cost: number;
    estimated_scholarship_amount: number;
    visa_difficulty_assessment: string;
    post_graduation_opportunities: string;
    match_reasoning: string;
  };
  scholarships: Array<{
    name: string;
    type: string;
    amount_max: number;
    why_eligible: string;
  }>;
};

type MatchResultsProps = {
  matches: UniversityMatch[];
  onBack: () => void;
  programType?: string;
};

export default function MatchResults({ matches, onBack, programType }: MatchResultsProps) {
  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-600 bg-green-50 border-green-200';
    if (score >= 60) return 'text-blue-600 bg-blue-50 border-blue-200';
    if (score >= 40) return 'text-yellow-600 bg-yellow-50 border-yellow-200';
    return 'text-red-600 bg-red-50 border-red-200';
  };

  return (
    <div className="max-w-7xl mx-auto">
      <div className="mb-8">
        <button
          onClick={onBack}
          className="text-blue-600 hover:text-blue-700 mb-4"
        >
          ← Profili Duzenle
        </button>
        <h1 className="text-4xl font-bold text-gray-900 mb-2">
          Sizin Icin En Uygun {programType === 'high_school' ? 'Liseler' : programType === 'language_school' ? 'Dil Okullari' : 'Universiteler'}
        </h1>
        <p className="text-gray-600">
          {matches.length} {programType === 'high_school' ? 'lise' : programType === 'language_school' ? 'dil okulu' : 'universite'} profilinizle eslestirildi
        </p>
      </div>

      <div className="space-y-6">
        {matches.map((item, index) => {
          const school = (item as Record<string, unknown>).school as UniversityMatch['university'] || item.university;
          const matchScore = (item as Record<string, unknown>).matchScore !== undefined 
            ? (item as Record<string, unknown>).matchScore as number 
            : item.match.overall_match_score;

          return (
            <div
              key={school.id}
              className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow"
            >
              <div className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <span className="text-3xl font-bold text-gray-400">#{index + 1}</span>
                      <div>
                        <h2 className="text-2xl font-bold text-gray-900">{school.name}</h2>
                        <div className="flex items-center gap-2 text-gray-600 mt-1">
                          <MapPin size={16} />
                          <span>{school.city}, {school.country}</span>
                          {school.ranking_global && (
                            <span className="ml-4 text-sm bg-gray-100 px-2 py-1 rounded">
                              Dunya Siralamasi: #{school.ranking_global}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="text-center">
                    <div className={`text-5xl font-bold ${getScoreColor(matchScore).split(' ')[0]}`}>
                      {Math.round(matchScore)}%
                    </div>
                    <div className="text-sm text-gray-500 mt-1">Genel Uyum</div>
                  </div>
                </div>

                {item.match && (
                  <>
                    <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-6">
                      <div className="text-center p-3 bg-gray-50 rounded-lg">
                        <div className="flex items-center justify-center mb-1">
                          <GraduationCap size={20} className="text-gray-600" />
                        </div>
                        <div className="text-2xl font-bold text-gray-900">{item.match.academic_match_score}%</div>
                        <div className="text-xs text-gray-600">Akademik</div>
                      </div>

                      <div className="text-center p-3 bg-gray-50 rounded-lg">
                        <div className="flex items-center justify-center mb-1">
                          <DollarSign size={20} className="text-gray-600" />
                        </div>
                        <div className="text-2xl font-bold text-gray-900">{item.match.financial_match_score}%</div>
                        <div className="text-xs text-gray-600">Mali Uyum</div>
                      </div>

                      <div className="text-center p-3 bg-gray-50 rounded-lg">
                        <div className="flex items-center justify-center mb-1">
                          <Globe size={20} className="text-gray-600" />
                        </div>
                        <div className="text-2xl font-bold text-gray-900">{item.match.visa_match_score}%</div>
                        <div className="text-xs text-gray-600">Vize Kolayligi</div>
                      </div>

                      <div className="text-center p-3 bg-gray-50 rounded-lg">
                        <div className="flex items-center justify-center mb-1">
                          <Award size={20} className="text-gray-600" />
                        </div>
                        <div className="text-2xl font-bold text-gray-900">{item.match.scholarship_potential_score}%</div>
                        <div className="text-xs text-gray-600">Burs Potansiyeli</div>
                      </div>

                      <div className="text-center p-3 bg-gray-50 rounded-lg">
                        <div className="flex items-center justify-center mb-1">
                          <TrendingUp size={20} className="text-gray-600" />
                        </div>
                        <div className="text-2xl font-bold text-gray-900">{item.match.post_graduation_score}%</div>
                        <div className="text-xs text-gray-600">Mezuniyet Sonrasi</div>
                      </div>
                    </div>

                    <div className="grid md:grid-cols-3 gap-4 mb-6">
                      <div className="border border-gray-200 rounded-lg p-4">
                        <div className="text-sm text-gray-600 mb-1">Tahmini Yillik Maliyet</div>
                        <div className="text-2xl font-bold text-gray-900">
                          ${item.match.estimated_total_cost.toLocaleString()}
                        </div>
                      </div>

                      <div className="border border-green-200 rounded-lg p-4 bg-green-50">
                        <div className="text-sm text-green-700 mb-1">Tahmini Burs Tutari</div>
                        <div className="text-2xl font-bold text-green-700">
                          ${item.match.estimated_scholarship_amount.toLocaleString()}
                        </div>
                      </div>

                      <div className="border border-blue-200 rounded-lg p-4 bg-blue-50">
                        <div className="text-sm text-blue-700 mb-1">Net Maliyet</div>
                        <div className="text-2xl font-bold text-blue-700">
                          ${(item.match.estimated_total_cost - item.match.estimated_scholarship_amount).toLocaleString()}
                        </div>
                      </div>
                    </div>
                  </>
                )}

                {item.scholarships && item.scholarships.length > 0 && (
                  <div className="mb-6">
                    <h3 className="font-semibold text-gray-900 mb-3">Uygun Burs Firsatlari</h3>
                    <div className="space-y-3">
                      {item.scholarships.map((scholarship, idx) => (
                        <div key={idx} className="border-2 border-green-200 rounded-lg p-4 bg-green-50">
                          <div className="flex justify-between items-start mb-3">
                            <div>
                              <div className="font-semibold text-gray-900 text-lg">{scholarship.name}</div>
                              <div className="text-sm text-gray-600 mt-1">
                                <span className="inline-block bg-green-100 text-green-700 px-2 py-1 rounded">
                                  {scholarship.type === 'academic' && 'Akademik Burs'}
                                  {scholarship.type === 'athletic' && 'Spor Bursu'}
                                  {scholarship.type === 'artistic' && 'Sanat Bursu'}
                                  {scholarship.type === 'need-based' && 'Ihtiyac Bazli'}
                                  {scholarship.type === 'country-specific' && 'Ulke Ozel'}
                                </span>
                              </div>
                            </div>
                            <div className="text-right">
                              <div className="text-2xl font-bold text-green-600">
                                ${scholarship.amount_max.toLocaleString()}
                              </div>
                              <div className="text-xs text-green-700">Max. Burs Tutari</div>
                            </div>
                          </div>
                          <div className="bg-white border border-green-200 rounded-lg p-3">
                            <div className="text-sm font-medium text-green-900 mb-1">
                              Profiliniz Neden Uygun:
                            </div>
                            <p className="text-sm text-gray-700">
                              {scholarship.why_eligible}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {item.match && (
                  <div className="space-y-3">
                    <div className={`border rounded-lg p-4 ${getScoreColor(item.match.visa_match_score)}`}>
                      <h4 className="font-semibold mb-1">Vize Degerlendirmesi</h4>
                      <p className="text-sm">{item.match.visa_difficulty_assessment}</p>
                    </div>

                    <div className="border rounded-lg p-4 bg-purple-50 border-purple-200">
                      <h4 className="font-semibold text-purple-800 mb-1">Mezuniyet Sonrasi Firsatlar</h4>
                      <p className="text-sm text-purple-700">{item.match.post_graduation_opportunities}</p>
                    </div>

                    <div className="border rounded-lg p-4 bg-gray-50">
                      <h4 className="font-semibold text-gray-800 mb-1">Neden Uygunsunuz</h4>
                      <p className="text-sm text-gray-700">{item.match.match_reasoning}</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
