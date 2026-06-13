import { LitElement, css, html } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import { sharedStyles } from '../styles/shared-styles';
import {
  OLEVEL_SUBJECTS,
  getBestMappingForSubjects,
  getMappingForCombination,
  getCombinationByCode,
  getAllComboCodes,
} from '../mockData';
import type { CareerPath, Degree } from '../types';

@customElement('app-mapper')
export class AppMapper extends LitElement {
  @state() private _view: 'landing' | 'olevel' | 'alevel' = 'landing';
  @state() private _selectedSubjects: string[] = [];
  @state() private _selectedCombo = '';
  @state() private _mappedCareers: CareerPath[] = [];
  @state() private _mappedDegrees: Degree[] = [];
  @state() private _suggestedCombo = '';
  @state() private _showResults = false;

  static styles = [
    sharedStyles,
    css`
      .mapper-page {
        padding: 16px;
        padding-bottom: calc(72px + env(safe-area-inset-bottom, 0px) + 16px);
        min-height: 100vh;
        animation: fadeIn 0.3s ease;
      }

      /* Landing page */
      .landing-header {
        text-align: center;
        margin-bottom: 32px;
        padding-top: 16px;
      }

      .landing-header .hero-icon {
        font-size: 56px;
        margin-bottom: 12px;
      }

      .landing-header h2 {
        font-size: 22px;
        font-weight: 800;
        color: var(--deep-blue);
        margin-bottom: 8px;
      }

      .landing-header p {
        font-size: 14px;
        color: var(--gray-500);
        line-height: 1.6;
        max-width: 320px;
        margin: 0 auto;
      }

      .level-buttons {
        display: flex;
        flex-direction: column;
        gap: 16px;
        margin-top: 8px;
      }

      .level-btn {
        display: flex;
        align-items: center;
        gap: 16px;
        padding: 24px 20px;
        border-radius: var(--radius-lg);
        border: 2px solid var(--border);
        background: var(--surface);
        cursor: pointer;
        transition: all 0.25s ease;
        font-family: var(--font);
        text-align: left;
        width: 100%;
        box-shadow: var(--shadow-sm);
      }

      .level-btn:active {
        transform: scale(0.97);
      }

      .level-btn:hover {
        border-color: var(--emerald);
        box-shadow: var(--shadow-md);
      }

      .level-btn .btn-icon {
        width: 56px;
        height: 56px;
        border-radius: 16px;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 28px;
        flex-shrink: 0;
      }

      .level-btn.olevel .btn-icon {
        background: linear-gradient(135deg, rgba(0, 184, 148, 0.15), rgba(0, 184, 148, 0.05));
      }

      .level-btn.alevel .btn-icon {
        background: linear-gradient(135deg, rgba(11, 29, 58, 0.12), rgba(11, 29, 58, 0.04));
      }

      .level-btn .btn-text {
        flex: 1;
      }

      .level-btn .btn-text h3 {
        font-size: 17px;
        font-weight: 700;
        color: var(--deep-blue);
        margin-bottom: 4px;
      }

      .level-btn .btn-text p {
        font-size: 13px;
        color: var(--gray-500);
        line-height: 1.4;
        margin: 0;
      }

      .level-btn .btn-arrow {
        font-size: 20px;
        color: var(--gray-300);
        flex-shrink: 0;
        transition: transform 0.2s ease, color 0.2s ease;
      }

      .level-btn:hover .btn-arrow {
        color: var(--emerald);
        transform: translateX(4px);
      }

      /* Back navigation */
      .back-bar {
        display: flex;
        align-items: center;
        gap: 12px;
        margin-bottom: 20px;
      }

      .back-btn {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 40px;
        height: 40px;
        border-radius: 12px;
        background: var(--gray-100);
        border: none;
        cursor: pointer;
        font-size: 18px;
        color: var(--gray-600);
        transition: all 0.2s ease;
        font-family: var(--font);
        flex-shrink: 0;
      }

      .back-btn:active {
        transform: scale(0.93);
        background: var(--gray-200);
      }

      .back-bar .page-label {
        font-size: 18px;
        font-weight: 700;
        color: var(--deep-blue);
      }

      .section-title {
        font-size: 18px;
        font-weight: 700;
        color: var(--deep-blue);
        margin-bottom: 6px;
      }

      .section-desc {
        font-size: 14px;
        color: var(--gray-500);
        margin-bottom: 16px;
        line-height: 1.5;
      }

      .subject-grid {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 8px;
      }

      .subject-chip {
        display: flex;
        align-items: center;
        gap: 8px;
        padding: 10px 12px;
        border-radius: var(--radius-md);
        background: var(--surface);
        border: 2px solid var(--border);
        cursor: pointer;
        transition: all 0.2s ease;
        font-size: 12px;
        font-weight: 500;
        color: var(--text-primary);
        text-align: left;
        width: 100%;
        font-family: var(--font);
        line-height: 1.3;
      }

      .subject-chip:active {
        transform: scale(0.97);
      }

      .subject-chip.selected {
        border-color: var(--deep-blue);
        background: rgba(11, 29, 58, 0.05);
      }

      .subject-chip.disabled {
        opacity: 0.4;
        pointer-events: none;
      }

      .subject-chip .num {
        width: 20px;
        height: 20px;
        border-radius: 50%;
        background: var(--gray-200);
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 11px;
        font-weight: 700;
        color: var(--gray-600);
        flex-shrink: 0;
      }

      .subject-chip.selected .num {
        background: var(--deep-blue);
        color: var(--white);
      }

      .combo-select {
        width: 100%;
        padding: 16px;
        border-radius: var(--radius-md);
        border: 2px solid var(--border);
        font-size: 15px;
        font-weight: 500;
        font-family: var(--font);
        color: var(--text-primary);
        background: var(--surface);
        appearance: none;
        background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='8' viewBox='0 0 12 8'%3E%3Cpath fill='%23475569' d='M1.41 0L6 4.58 10.59 0 12 1.41l-6 6-6-6z'/%3E%3C/svg%3E");
        background-repeat: no-repeat;
        background-position: right 16px center;
        cursor: pointer;
        transition: border-color 0.2s;
      }

      .combo-select:focus {
        border-color: var(--emerald);
      }

      .results-section {
        margin-top: 24px;
      }

      .combo-badge {
        display: inline-block;
        padding: 4px 12px;
        border-radius: var(--radius-sm);
        background: var(--deep-blue);
        color: var(--white);
        font-size: 14px;
        font-weight: 700;
        letter-spacing: 1px;
        margin-bottom: 12px;
      }

      .result-card {
        background: var(--surface);
        border-radius: var(--radius-lg);
        padding: 20px;
        box-shadow: var(--shadow-md);
        border: 1px solid var(--border);
        margin-bottom: 16px;
        animation: slideUp 0.4s ease;
      }

      .tag-chip {
        display: inline-flex;
        align-items: center;
        gap: 6px;
        padding: 5px 12px 5px 8px;
        border-radius: 20px;
        font-size: 12px;
        font-weight: 600;
        letter-spacing: 0.3px;
        margin-bottom: 12px;
        width: fit-content;
        border: 1.5px solid transparent;
        backdrop-filter: blur(4px);
        transition: transform 0.15s ease, box-shadow 0.15s ease;
      }

      .tag-chip:active {
        transform: scale(0.96);
      }

      .tag-chip .tag-emoji {
        font-size: 15px;
        line-height: 1;
      }

      .tag-chip .tag-label {
        text-transform: capitalize;
      }

      /* Tag color themes */
      .tag-brain  { background: rgba(139, 92, 246, 0.12); color: #6D28D9; border-color: rgba(139, 92, 246, 0.25); }
      .tag-chart  { background: rgba(59, 130, 246, 0.12); color: #1D4ED8; border-color: rgba(59, 130, 246, 0.25); }
      .tag-shield { background: rgba(239, 68, 68, 0.11);  color: #B91C1C; border-color: rgba(239, 68, 68, 0.22); }
      .tag-cloud  { background: rgba(96, 165, 250, 0.14); color: #1E40AF; border-color: rgba(96, 165, 250, 0.28); }
      .tag-robot  { background: rgba(107, 114, 128, 0.12); color: #374151; border-color: rgba(107, 114, 128, 0.25); }
      .tag-dna    { background: rgba(236, 72, 153, 0.12); color: #BE185D; border-color: rgba(236, 72, 153, 0.22); }
      .tag-drone  { background: rgba(34, 197, 94, 0.12);  color: #15803D; border-color: rgba(34, 197, 94, 0.22); }
      .tag-rocket { background: rgba(249, 115, 22, 0.12); color: #C2410C; border-color: rgba(249, 115, 22, 0.22); }
      .tag-pill   { background: rgba(168, 85, 247, 0.12); color: #7E22CE; border-color: rgba(168, 85, 247, 0.22); }
      .tag-leaf   { background: rgba(34, 197, 94, 0.12);  color: #166534; border-color: rgba(34, 197, 94, 0.22); }
      .tag-wallet { background: rgba(234, 179, 8, 0.14);  color: #92400E; border-color: rgba(234, 179, 8, 0.28); }
      .tag-calc   { background: rgba(99, 102, 241, 0.12); color: #3730A3; border-color: rgba(99, 102, 241, 0.22); }
      .tag-chain  { background: rgba(20, 184, 166, 0.12); color: #0F766E; border-color: rgba(20, 184, 166, 0.22); }
      .tag-cash   { background: rgba(34, 197, 94, 0.12);  color: #166534; border-color: rgba(34, 197, 94, 0.22); }
      .tag-default { background: rgba(100, 116, 139, 0.1); color: #334155; border-color: rgba(100, 116, 139, 0.2); }

      .result-card h3 {
        font-size: 16px;
        font-weight: 700;
        color: var(--deep-blue);
        margin-bottom: 4px;
      }

      .result-card .sub {
        font-size: 12px;
        color: var(--gray-400);
        margin-bottom: 8px;
      }

      .result-card p {
        font-size: 13px;
        color: var(--gray-500);
        line-height: 1.5;
        margin-bottom: 8px;
      }

      .result-card .meta {
        display: flex;
        gap: 12px;
        flex-wrap: wrap;
      }

      .result-card .meta span {
        font-size: 12px;
        color: var(--gray-400);
      }

      .result-card .meta .salary {
        color: var(--emerald);
        font-weight: 600;
      }

      .empty-state {
        text-align: center;
        padding: 40px 20px;
        color: var(--gray-400);
      }

      .empty-state .icon {
        font-size: 48px;
        margin-bottom: 16px;
      }

      .empty-state h3 {
        color: var(--gray-500);
        font-size: 16px;
        margin-bottom: 8px;
      }

      .empty-state p {
        font-size: 13px;
        line-height: 1.5;
      }

      .hint {
        display: flex;
        align-items: center;
        gap: 8px;
        padding: 12px 16px;
        background: rgba(0, 184, 148, 0.08);
        border-radius: var(--radius-md);
        font-size: 13px;
        color: var(--gray-600);
        margin-bottom: 16px;
      }

      .hint span {
        font-size: 16px;
      }
    `,
  ];

  private _toggleSubject(id: string) {
    if (this._selectedSubjects.includes(id)) {
      this._selectedSubjects = this._selectedSubjects.filter(s => s !== id);
    } else if (this._selectedSubjects.length < 3) {
      this._selectedSubjects = [...this._selectedSubjects, id];
    }
    if (this._selectedSubjects.length === 3) {
      this._computeOLevelResults();
    } else {
      this._showResults = false;
    }
    this.requestUpdate();
  }

  private _computeOLevelResults() {
    const mapping = getBestMappingForSubjects(this._selectedSubjects);
    this._mappedCareers = mapping.careers;
    this._suggestedCombo = mapping.suggestedALevel || '';
    this._mappedDegrees = [];
    this._showResults = true;
  }

  private _onComboChange(e: Event) {
    const val = (e.target as HTMLSelectElement).value;
    this._selectedCombo = val;
    if (val) {
      this._computeALevelResults(val);
    } else {
      this._showResults = false;
    }
  }

  private _computeALevelResults(code: string) {
    const mapping = getMappingForCombination(code);
    if (mapping) {
      this._mappedDegrees = mapping.degrees;
      this._mappedCareers = mapping.careers;
    } else {
      this._mappedDegrees = [];
      this._mappedCareers = [];
    }
    this._showResults = true;
  }

  private _navigateToLevel(level: 'olevel' | 'alevel') {
    this._view = level;
    this._showResults = false;
    this._selectedSubjects = [];
    this._selectedCombo = '';
    this._mappedCareers = [];
    this._mappedDegrees = [];
    this._suggestedCombo = '';
  }

  private _backToLanding() {
    this._view = 'landing';
    this._showResults = false;
    this._selectedSubjects = [];
    this._selectedCombo = '';
    this._mappedCareers = [];
    this._mappedDegrees = [];
    this._suggestedCombo = '';
  }

  render() {
    return html`
      <app-header title="Subject Mapper"></app-header>
      <div class="mapper-page">
        ${this._view === 'landing' ? this._renderLanding() : ''}
        ${this._view === 'olevel' ? this._renderOLevelView() : ''}
        ${this._view === 'alevel' ? this._renderALevelView() : ''}
      </div>
    `;
  }

  private _renderLanding() {
    return html`
      <div class="landing-header">
        <div class="hero-icon">🗺️</div>
        <h2>Choose Your Level</h2>
        <p>Select whether you want to explore O-Level subjects or A-Level combinations to discover your career path.</p>
      </div>

      <div class="level-buttons">
        <button class="level-btn olevel" @click=${() => this._navigateToLevel('olevel')}>
          <div class="btn-icon">📚</div>
          <div class="btn-text">
            <h3>O-Level</h3>
            <p>Pick your top 3 subjects to get A-Level combo suggestions and career matches.</p>
          </div>
          <span class="btn-arrow">›</span>
        </button>

        <button class="level-btn alevel" @click=${() => this._navigateToLevel('alevel')}>
          <div class="btn-icon">🎓</div>
          <div class="btn-text">
            <h3>A-Level</h3>
            <p>Select your subject combination to see matching degrees and modern careers.</p>
          </div>
          <span class="btn-arrow">›</span>
        </button>
      </div>
    `;
  }

  private _renderOLevelView() {
    return html`
      <div class="back-bar">
        <button class="back-btn" @click=${this._backToLanding}>←</button>
        <span class="page-label">O-Level</span>
      </div>
      ${this._renderOLevel()}
      ${this._showResults ? this._renderResults() : html`
        <div class="empty-state">
          <div class="icon">📚</div>
          <h3>Select 3 subjects</h3>
          <p>Pick your top 3 O-Level subjects above to see suggested A-Level combinations and modern careers.</p>
        </div>
      `}
    `;
  }

  private _renderALevelView() {
    return html`
      <div class="back-bar">
        <button class="back-btn" @click=${this._backToLanding}>←</button>
        <span class="page-label">A-Level</span>
      </div>
      ${this._renderALevel()}
      ${this._showResults ? this._renderResults() : html`
        <div class="empty-state">
          <div class="icon">🎓</div>
          <h3>Select a combination</h3>
          <p>Select your A-Level combination from the dropdown to see matching degrees and careers.</p>
        </div>
      `}
    `;
  }

  private _renderOLevel() {
    return html`
      <div class="section-title">Select Your Top 3 Subjects</div>
      <div class="section-desc">Pick the O-Level subjects you enjoy most or perform best in.</div>

      <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:12px;">
        <span style="font-size:13px;color:var(--gray-400);">${this._selectedSubjects.length}/3 selected</span>
      </div>

      <div class="subject-grid">
        ${OLEVEL_SUBJECTS.map(
          s => html`
            <button
              class="subject-chip ${this._selectedSubjects.includes(s.id) ? 'selected' : ''} ${this._selectedSubjects.length >= 3 && !this._selectedSubjects.includes(s.id) ? 'disabled' : ''}"
              @click=${() => this._toggleSubject(s.id)}
            >
              <span class="num">${this._selectedSubjects.indexOf(s.id) + 1 || '•'}</span>
              <span>${s.name}</span>
            </button>
          `
        )}
      </div>
    `;
  }

  private _renderALevel() {
    const combos = getAllComboCodes();

    return html`
      <div class="section-title">Your A-Level Combination</div>
      <div class="section-desc">Select your exact subject combination to see matching degree programs and careers.</div>

      <select class="combo-select" @change=${this._onComboChange} .value=${this._selectedCombo}>
        <option value="">-- Select combination --</option>
        ${combos.map(
          code => {
            const combo = getCombinationByCode(code);
            return html`
              <option value=${code}>${code} — ${combo?.fullName || ''}</option>
            `;
          }
        )}
      </select>

      ${this._selectedCombo ? html`
        <div class="hint">
          <span>💡</span>
          <span>${getCombinationByCode(this._selectedCombo)?.fullName}</span>
        </div>
      ` : ''}
    `;
  }

  private static readonly _TAG_EMOJI: Record<string, string> = {
    brain: '🧠', chart: '📊', shield: '🛡️', cloud: '☁️',
    robot: '🤖', dna: '🧬', drone: '🚁', rocket: '🚀',
    pill: '💊', leaf: '🌿', wallet: '💳', calc: '🧮',
    chain: '🔗', cash: '💵',
  };

  private _getTagEmoji(icon: string): string {
    return AppMapper._TAG_EMOJI[icon] ?? '🏷️';
  }

  private _getTagClass(icon: string): string {
    return AppMapper._TAG_EMOJI[icon] ? icon : 'default';
  }

  private _renderResults() {
    const combo = this._view === 'olevel' ? this._suggestedCombo : this._selectedCombo;

    return html`
      <div class="results-section">
        ${combo ? html`
          <div class="combo-badge">${combo}</div>
        ` : ''}

        ${this._mappedDegrees.length > 0 ? html`
          <div class="section-title" style="font-size:16px;margin-top:16px;">🎓 Recommended Degrees</div>
          ${this._mappedDegrees.map(
            d => html`
              <div class="result-card">
                <h3>${d.name}</h3>
                <div class="sub">${d.university} · ${d.duration}</div>
                <p>${d.description}</p>
              </div>
            `
          )}
        ` : ''}

        ${this._mappedCareers.length > 0 ? html`
          <div class="section-title" style="font-size:16px;margin-top:16px;">🚀 Modern Career Paths</div>
          ${this._mappedCareers.map(
            r => html`
              <div class="result-card">
                <div class="tag-chip tag-${this._getTagClass(r.icon)}">
                  <span class="tag-emoji">${this._getTagEmoji(r.icon)}</span>
                  <span class="tag-label">${r.icon}</span>
                </div>
                <h3>${r.title}</h3>
                <p>${r.description}</p>
                <div class="meta">
                  <span class="salary">💰 ${r.avgSalary}</span>
                  <span>📈 ${r.growthPotential}</span>
                </div>
              </div>
            `
          )}
        ` : ''}
      </div>
    `;
  }
}
