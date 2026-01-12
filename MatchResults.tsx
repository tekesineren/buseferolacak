// ============================================
// VENTORA.AI - Match Results Display Component
// React component for showing university matches
// ============================================

import React, { useState, useMemo } from 'react';

// Types
interface MatchResult {
  university: {
    id: string;
    name: string;
    country: string;
    city: string;
    websiteUrl: string;
    ranking: { globalRank?: number };
  };
  program: {
    id: string;
    name: string;
    degree: string;
    deadline: {
      regularDeadline: string;
      semester: string;
      year: number;
    };
    tuition: {
      internationalTuition: number;
      currency: string;
    };
    requirements: {
      requiredDocuments: Array<{
        documentType: string;
        description: string;
        required: boolean;
        quantity?: number;
      }>;
    };
  };
  overallScore: number;
  matchCategory: 'safety' | 'match' | 'reach' | 'far_reach';
  estimatedChance: number;
  scores: {
    academic: { total: number };
    financial: { total: number };
    profile: { total: number };
    preference: { total: number };
    documents: { total: number };
  };
  insights: Array<{
    type: 'strength' | 'weakness' | 'opportunity' | 'warning';
    category: string;
    message: string;
    action?: string;
    priority: 'high' | 'medium' | 'low';
  }>;
  applicationStatus: {
    deadlinePassed: boolean;
    daysUntilDeadline: number;
    documentsComplete: boolean;
    missingDocuments: string[];
    canApply: boolean;
    blockers: string[];
  };
}

interface MatchResultsProps {
  results: MatchResult[];
  onSelectProgram?: (result: MatchResult) => void;
}

// Main Component
const MatchResults: React.FC<MatchResultsProps> = ({ results, onSelectProgram }) => {
  const [filter, setFilter] = useState<'all' | 'safety' | 'match' | 'reach' | 'far_reach'>('all');
  const [sortBy, setSortBy] = useState<'score' | 'deadline' | 'chance'>('score');
  const [expandedCard, setExpandedCard] = useState<string | null>(null);

  const filteredAndSorted = useMemo(() => {
    let filtered = filter === 'all' 
      ? results 
      : results.filter(r => r.matchCategory === filter);

    return filtered.sort((a, b) => {
      switch (sortBy) {
        case 'score':
          return b.overallScore - a.overallScore;
        case 'deadline':
          return a.applicationStatus.daysUntilDeadline - b.applicationStatus.daysUntilDeadline;
        case 'chance':
          return b.estimatedChance - a.estimatedChance;
        default:
          return 0;
      }
    });
  }, [results, filter, sortBy]);

  const categoryCount = useMemo(() => ({
    all: results.length,
    safety: results.filter(r => r.matchCategory === 'safety').length,
    match: results.filter(r => r.matchCategory === 'match').length,
    reach: results.filter(r => r.matchCategory === 'reach').length,
    far_reach: results.filter(r => r.matchCategory === 'far_reach').length,
  }), [results]);

  return (
    <div className="match-results">
      <style>{`
        .match-results {
          font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
          max-width: 1200px;
          margin: 0 auto;
          padding: 24px;
        }

        .results-header {
          margin-bottom: 32px;
        }

        .results-title {
          font-size: 28px;
          font-weight: 700;
          color: #1a1a2e;
          margin-bottom: 8px;
        }

        .results-subtitle {
          color: #6b7280;
          font-size: 16px;
        }

        .filters-bar {
          display: flex;
          gap: 16px;
          margin-bottom: 24px;
          flex-wrap: wrap;
          align-items: center;
        }

        .filter-group {
          display: flex;
          gap: 8px;
          background: #f3f4f6;
          padding: 4px;
          border-radius: 12px;
        }

        .filter-btn {
          padding: 8px 16px;
          border: none;
          background: transparent;
          border-radius: 8px;
          cursor: pointer;
          font-size: 14px;
          font-weight: 500;
          color: #6b7280;
          transition: all 0.2s;
        }

        .filter-btn:hover {
          color: #1a1a2e;
        }

        .filter-btn.active {
          background: white;
          color: #1a1a2e;
          box-shadow: 0 1px 3px rgba(0,0,0,0.1);
        }

        .filter-btn .count {
          margin-left: 4px;
          font-size: 12px;
          opacity: 0.7;
        }

        .sort-select {
          padding: 8px 16px;
          border: 1px solid #e5e7eb;
          border-radius: 8px;
          font-size: 14px;
          color: #374151;
          background: white;
          cursor: pointer;
        }

        .results-grid {
          display: grid;
          gap: 20px;
        }

        .match-card {
          background: white;
          border-radius: 16px;
          border: 1px solid #e5e7eb;
          overflow: hidden;
          transition: all 0.3s;
        }

        .match-card:hover {
          border-color: #6366f1;
          box-shadow: 0 4px 12px rgba(99, 102, 241, 0.15);
        }

        .card-header {
          padding: 20px 24px;
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          gap: 16px;
        }

        .university-info {
          flex: 1;
        }

        .university-name {
          font-size: 20px;
          font-weight: 600;
          color: #1a1a2e;
          margin-bottom: 4px;
        }

        .program-name {
          font-size: 15px;
          color: #6b7280;
          margin-bottom: 8px;
        }

        .location {
          display: flex;
          align-items: center;
          gap: 4px;
          font-size: 13px;
          color: #9ca3af;
        }

        .match-badge {
          padding: 6px 12px;
          border-radius: 20px;
          font-size: 13px;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }

        .match-badge.safety {
          background: #d1fae5;
          color: #065f46;
        }

        .match-badge.match {
          background: #dbeafe;
          color: #1e40af;
        }

        .match-badge.reach {
          background: #fef3c7;
          color: #92400e;
        }

        .match-badge.far_reach {
          background: #fee2e2;
          color: #991b1b;
        }

        .card-stats {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 16px;
          padding: 16px 24px;
          background: #f9fafb;
          border-top: 1px solid #e5e7eb;
        }

        .stat-item {
          text-align: center;
        }

        .stat-value {
          font-size: 24px;
          font-weight: 700;
          color: #1a1a2e;
        }

        .stat-value.chance {
          color: #6366f1;
        }

        .stat-label {
          font-size: 12px;
          color: #9ca3af;
          text-transform: uppercase;
          letter-spacing: 0.5px;
          margin-top: 2px;
        }

        .card-details {
          padding: 20px 24px;
          border-top: 1px solid #e5e7eb;
        }

        .details-section {
          margin-bottom: 20px;
        }

        .details-section:last-child {
          margin-bottom: 0;
        }

        .section-title {
          font-size: 14px;
          font-weight: 600;
          color: #374151;
          margin-bottom: 12px;
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .deadline-info {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 12px 16px;
          background: #f9fafb;
          border-radius: 8px;
        }

        .deadline-status {
          font-size: 14px;
          font-weight: 500;
        }

        .deadline-status.urgent {
          color: #dc2626;
        }

        .deadline-status.soon {
          color: #f59e0b;
        }

        .deadline-status.ok {
          color: #10b981;
        }

        .deadline-status.passed {
          color: #6b7280;
          text-decoration: line-through;
        }

        .budget-info {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 12px 16px;
          background: #f9fafb;
          border-radius: 8px;
        }

        .budget-amount {
          font-size: 18px;
          font-weight: 600;
          color: #1a1a2e;
        }

        .budget-period {
          font-size: 12px;
          color: #9ca3af;
        }

        .documents-dropdown {
          background: #f9fafb;
          border-radius: 8px;
          overflow: hidden;
        }

        .dropdown-header {
          padding: 12px 16px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          cursor: pointer;
          user-select: none;
        }

        .dropdown-header:hover {
          background: #f3f4f6;
        }

        .dropdown-title {
          font-size: 14px;
          color: #374151;
        }

        .dropdown-icon {
          transition: transform 0.2s;
        }

        .dropdown-icon.expanded {
          transform: rotate(180deg);
        }

        .dropdown-content {
          padding: 0 16px 16px;
        }

        .document-item {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 8px 0;
          font-size: 14px;
          color: #4b5563;
          border-bottom: 1px solid #e5e7eb;
        }

        .document-item:last-child {
          border-bottom: none;
        }

        .document-required {
          color: #dc2626;
          font-size: 12px;
        }

        .document-optional {
          color: #9ca3af;
          font-size: 12px;
        }

        .insights-list {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        .insight-item {
          display: flex;
          align-items: flex-start;
          gap: 10px;
          padding: 10px 12px;
          border-radius: 8px;
          font-size: 13px;
        }

        .insight-item.strength {
          background: #d1fae5;
          color: #065f46;
        }

        .insight-item.weakness {
          background: #fee2e2;
          color: #991b1b;
        }

        .insight-item.opportunity {
          background: #dbeafe;
          color: #1e40af;
        }

        .insight-item.warning {
          background: #fef3c7;
          color: #92400e;
        }

        .insight-icon {
          flex-shrink: 0;
          font-size: 16px;
        }

        .card-actions {
          display: flex;
          gap: 12px;
          padding: 16px 24px;
          border-top: 1px solid #e5e7eb;
          background: #f9fafb;
        }

        .action-btn {
          flex: 1;
          padding: 12px 16px;
          border-radius: 8px;
          font-size: 14px;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.2s;
          text-align: center;
          text-decoration: none;
        }

        .action-btn.primary {
          background: #6366f1;
          color: white;
          border: none;
        }

        .action-btn.primary:hover {
          background: #4f46e5;
        }

        .action-btn.secondary {
          background: white;
          color: #374151;
          border: 1px solid #e5e7eb;
        }

        .action-btn.secondary:hover {
          background: #f3f4f6;
        }

        .expand-btn {
          background: none;
          border: none;
          color: #6366f1;
          font-size: 14px;
          cursor: pointer;
          padding: 8px 0;
          width: 100%;
          text-align: center;
        }

        .expand-btn:hover {
          text-decoration: underline;
        }

        .score-bars {
          display: grid;
          gap: 8px;
        }

        .score-bar-item {
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .score-bar-label {
          width: 80px;
          font-size: 12px;
          color: #6b7280;
        }

        .score-bar-track {
          flex: 1;
          height: 6px;
          background: #e5e7eb;
          border-radius: 3px;
          overflow: hidden;
        }

        .score-bar-fill {
          height: 100%;
          border-radius: 3px;
          transition: width 0.3s;
        }

        .score-bar-fill.high {
          background: #10b981;
        }

        .score-bar-fill.medium {
          background: #f59e0b;
        }

        .score-bar-fill.low {
          background: #ef4444;
        }

        .score-bar-value {
          width: 30px;
          font-size: 12px;
          font-weight: 600;
          color: #374151;
          text-align: right;
        }

        .empty-state {
          text-align: center;
          padding: 60px 20px;
          color: #6b7280;
        }

        .empty-state-icon {
          font-size: 48px;
          margin-bottom: 16px;
        }

        .empty-state-title {
          font-size: 18px;
          font-weight: 600;
          color: #374151;
          margin-bottom: 8px;
        }
      `}</style>

      <div className="results-header">
        <h1 className="results-title">Your University Matches</h1>
        <p className="results-subtitle">
          Based on your profile, we found {results.length} programs that match your criteria
        </p>
      </div>

      <div className="filters-bar">
        <div className="filter-group">
          {(['all', 'safety', 'match', 'reach', 'far_reach'] as const).map(cat => (
            <button
              key={cat}
              className={`filter-btn ${filter === cat ? 'active' : ''}`}
              onClick={() => setFilter(cat)}
            >
              {cat === 'far_reach' ? 'Far Reach' : cat.charAt(0).toUpperCase() + cat.slice(1)}
              <span className="count">({categoryCount[cat]})</span>
            </button>
          ))}
        </div>

        <select 
          className="sort-select" 
          value={sortBy} 
          onChange={(e) => setSortBy(e.target.value as any)}
        >
          <option value="score">Sort by Match Score</option>
          <option value="chance">Sort by Admission Chance</option>
          <option value="deadline">Sort by Deadline</option>
        </select>
      </div>

      {filteredAndSorted.length === 0 ? (
        <div className="empty-state">
          <div className="empty-state-icon">🔍</div>
          <div className="empty-state-title">No matches found</div>
          <p>Try adjusting your filters or preferences</p>
        </div>
      ) : (
        <div className="results-grid">
          {filteredAndSorted.map(result => (
            <MatchCard
              key={`${result.university.id}-${result.program.id}`}
              result={result}
              isExpanded={expandedCard === `${result.university.id}-${result.program.id}`}
              onToggleExpand={() => setExpandedCard(
                expandedCard === `${result.university.id}-${result.program.id}` 
                  ? null 
                  : `${result.university.id}-${result.program.id}`
              )}
              onSelect={() => onSelectProgram?.(result)}
            />
          ))}
        </div>
      )}
    </div>
  );
};

// Match Card Component
interface MatchCardProps {
  result: MatchResult;
  isExpanded: boolean;
  onToggleExpand: () => void;
  onSelect: () => void;
}

const MatchCard: React.FC<MatchCardProps> = ({ 
  result, 
  isExpanded, 
  onToggleExpand,
  onSelect 
}) => {
  const [docsExpanded, setDocsExpanded] = useState(false);

  const getDeadlineStatus = () => {
    const days = result.applicationStatus.daysUntilDeadline;
    if (result.applicationStatus.deadlinePassed) {
      return { class: 'passed', text: 'Deadline passed' };
    }
    if (days <= 7) {
      return { class: 'urgent', text: `${days} days left!` };
    }
    if (days <= 30) {
      return { class: 'soon', text: `${days} days left` };
    }
    return { class: 'ok', text: `${days} days left` };
  };

  const deadlineStatus = getDeadlineStatus();

  const formatCurrency = (amount: number, currency: string) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currency,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const getScoreClass = (score: number) => {
    if (score >= 70) return 'high';
    if (score >= 50) return 'medium';
    return 'low';
  };

  const getInsightIcon = (type: string) => {
    switch (type) {
      case 'strength': return '✓';
      case 'weakness': return '✗';
      case 'opportunity': return '★';
      case 'warning': return '⚠';
      default: return '•';
    }
  };

  return (
    <div className="match-card">
      <div className="card-header">
        <div className="university-info">
          <h3 className="university-name">{result.university.name}</h3>
          <p className="program-name">{result.program.name}</p>
          <span className="location">
            📍 {result.university.city}, {result.university.country}
            {result.university.ranking.globalRank && (
              <> • #{result.university.ranking.globalRank} Global</>
            )}
          </span>
        </div>
        <span className={`match-badge ${result.matchCategory}`}>
          {result.matchCategory.replace('_', ' ')}
        </span>
      </div>

      <div className="card-stats">
        <div className="stat-item">
          <div className="stat-value">{result.overallScore}</div>
          <div className="stat-label">Match Score</div>
        </div>
        <div className="stat-item">
          <div className="stat-value chance">{result.estimatedChance}%</div>
          <div className="stat-label">Admission Chance</div>
        </div>
        <div className="stat-item">
          <div className="stat-value">
            {formatCurrency(result.program.tuition.internationalTuition, result.program.tuition.currency)}
          </div>
          <div className="stat-label">Annual Tuition</div>
        </div>
      </div>

      <div className="card-details">
        {/* Deadline Section */}
        <div className="details-section">
          <div className="section-title">
            📅 Application Deadline
          </div>
          <div className="deadline-info">
            <span className={`deadline-status ${deadlineStatus.class}`}>
              {deadlineStatus.text}
            </span>
            <span style={{ color: '#9ca3af', fontSize: '13px' }}>
              • {new Date(result.program.deadline.regularDeadline).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })}
            </span>
          </div>
        </div>

        {/* Budget Section */}
        <div className="details-section">
          <div className="section-title">
            💰 Annual Cost
          </div>
          <div className="budget-info">
            <div>
              <div className="budget-amount">
                {formatCurrency(result.program.tuition.internationalTuition, result.program.tuition.currency)}
              </div>
              <div className="budget-period">Tuition per year</div>
            </div>
            <a 
              href={result.university.websiteUrl} 
              target="_blank" 
              rel="noopener noreferrer"
              style={{ color: '#6366f1', fontSize: '13px' }}
            >
              View official fees →
            </a>
          </div>
        </div>

        {/* Required Documents Dropdown */}
        <div className="details-section">
          <div className="section-title">
            📄 Required Documents
          </div>
          <div className="documents-dropdown">
            <div 
              className="dropdown-header"
              onClick={() => setDocsExpanded(!docsExpanded)}
            >
              <span className="dropdown-title">
                {result.program.requirements.requiredDocuments.length} documents required
              </span>
              <span className={`dropdown-icon ${docsExpanded ? 'expanded' : ''}`}>
                ▼
              </span>
            </div>
            {docsExpanded && (
              <div className="dropdown-content">
                {result.program.requirements.requiredDocuments.map((doc, idx) => (
                  <div key={idx} className="document-item">
                    <span>{doc.documentType}</span>
                    {doc.quantity && <span>({doc.quantity})</span>}
                    {doc.required ? (
                      <span className="document-required">Required</span>
                    ) : (
                      <span className="document-optional">Optional</span>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {isExpanded && (
          <>
            {/* Score Breakdown */}
            <div className="details-section">
              <div className="section-title">📊 Score Breakdown</div>
              <div className="score-bars">
                {[
                  { label: 'Academic', score: result.scores.academic.total },
                  { label: 'Profile', score: result.scores.profile.total },
                  { label: 'Financial', score: result.scores.financial.total },
                  { label: 'Preference', score: result.scores.preference.total },
                  { label: 'Documents', score: result.scores.documents.total },
                ].map(item => (
                  <div key={item.label} className="score-bar-item">
                    <span className="score-bar-label">{item.label}</span>
                    <div className="score-bar-track">
                      <div 
                        className={`score-bar-fill ${getScoreClass(item.score)}`}
                        style={{ width: `${item.score}%` }}
                      />
                    </div>
                    <span className="score-bar-value">{item.score}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Insights */}
            {result.insights.length > 0 && (
              <div className="details-section">
                <div className="section-title">💡 Insights</div>
                <div className="insights-list">
                  {result.insights.slice(0, 5).map((insight, idx) => (
                    <div key={idx} className={`insight-item ${insight.type}`}>
                      <span className="insight-icon">{getInsightIcon(insight.type)}</span>
                      <div>
                        <div>{insight.message}</div>
                        {insight.action && (
                          <div style={{ marginTop: '4px', opacity: 0.8, fontSize: '12px' }}>
                            → {insight.action}
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Missing Documents Warning */}
            {result.applicationStatus.missingDocuments.length > 0 && (
              <div className="details-section">
                <div className="section-title" style={{ color: '#dc2626' }}>
                  ⚠️ Missing Documents
                </div>
                <div className="insights-list">
                  {result.applicationStatus.missingDocuments.map((doc, idx) => (
                    <div key={idx} className="insight-item warning">
                      {doc}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </>
        )}
      </div>

      <button className="expand-btn" onClick={onToggleExpand}>
        {isExpanded ? 'Show Less ↑' : 'Show More Details ↓'}
      </button>

      <div className="card-actions">
        <a 
          href={result.university.websiteUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="action-btn secondary"
        >
          Visit Website
        </a>
        <button 
          className="action-btn primary"
          onClick={onSelect}
          disabled={result.applicationStatus.deadlinePassed}
        >
          {result.applicationStatus.deadlinePassed ? 'Deadline Passed' : 'Add to My List'}
        </button>
      </div>
    </div>
  );
};

export default MatchResults;
