import { LitElement, css, html } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import { sharedStyles } from '../styles/shared-styles';
import { getQuizState, saveQuizState, saveQuizResults } from '../store';
import { OLEVEL_SUBJECTS, getBestMappingForSubjects } from '../mockData';
import type { StudentLevel, ALevelTrack, CareerPath } from '../types';

@customElement('app-quiz')
export class AppQuiz extends LitElement {
  @state() private _step = 1;
  @state() private _level: StudentLevel | null = null;
  @state() private _selectedSubjects: string[] = [];
  @state() private _alevelTrack: ALevelTrack | null = null;
  @state() private _strength: string | null = null;
  @state() private _results: CareerPath[] = [];
  @state() private _completed = false;

  static styles = [
    sharedStyles,
    css`
      .quiz-page {
        padding: 16px;
        padding-bottom: calc(72px + env(safe-area-inset-bottom, 0px) + 16px);
        min-height: 100vh;
        animation: fadeIn 0.3s ease;
      }

      .step-indicator {
        display: flex;
        align-items: center;
        gap: 8px;
        margin-bottom: 24px;
      }

      .step-dot {
        width: 8px;
        height: 8px;
        border-radius: 50%;
        background: var(--gray-200);
        transition: all 0.3s;
      }

      .step-dot.active {
        background: var(--emerald);
        width: 24px;
        border-radius: 4px;
      }

      .step-dot.done {
        background: var(--emerald-light);
      }

      .question {
        font-size: 22px;
        font-weight: 700;
        color: var(--deep-blue);
        line-height: 1.3;
        margin-bottom: 24px;
      }

      .options {
        display: flex;
        flex-direction: column;
        gap: 12px;
      }

      .option-btn {
        display: flex;
        align-items: center;
        gap: 14px;
        padding: 18px 20px;
        border-radius: var(--radius-md);
        background: var(--surface);
        border: 2px solid var(--border);
        cursor: pointer;
        transition: all 0.2s ease;
        font-size: 16px;
        font-weight: 500;
        color: var(--text-primary);
        text-align: left;
        width: 100%;
        font-family: var(--font);
      }

      .option-btn:active {
        transform: scale(0.98);
      }

      .option-btn.selected {
        border-color: var(--emerald);
        background: rgba(0, 184, 148, 0.06);
        box-shadow: 0 0 0 3px var(--emerald-glow);
      }

      .option-btn .radio {
        width: 22px;
        height: 22px;
        border-radius: 50%;
        border: 2px solid var(--gray-300);
        display: flex;
        align-items: center;
        justify-content: center;
        flex-shrink: 0;
        transition: all 0.2s;
      }

      .option-btn.selected .radio {
        border-color: var(--emerald);
        background: var(--emerald);
      }

      .option-btn .radio-inner {
        width: 8px;
        height: 8px;
        border-radius: 50%;
        background: var(--white);
        opacity: 0;
        transition: opacity 0.2s;
      }

      .option-btn.selected .radio-inner {
        opacity: 1;
      }

      .option-btn .check {
        width: 22px;
        height: 22px;
        border-radius: 4px;
        border: 2px solid var(--gray-300);
        display: flex;
        align-items: center;
        justify-content: center;
        flex-shrink: 0;
        transition: all 0.2s;
        font-size: 12px;
        color: var(--white);
      }

      .option-btn.selected .check {
        border-color: var(--emerald);
        background: var(--emerald);
      }

      .subject-grid {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 10px;
      }

      .subject-chip {
        display: flex;
        align-items: center;
        gap: 8px;
        padding: 12px 14px;
        border-radius: var(--radius-md);
        background: var(--surface);
        border: 2px solid var(--border);
        cursor: pointer;
        transition: all 0.2s ease;
        font-size: 13px;
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

      .nav-buttons {
        display: flex;
        gap: 12px;
        margin-top: 28px;
      }

      .nav-buttons .btn {
        flex: 1;
      }

      .results-list {
        display: flex;
        flex-direction: column;
        gap: 16px;
        margin-top: 20px;
      }

      .result-card {
        background: var(--surface);
        border-radius: var(--radius-lg);
        padding: 20px;
        box-shadow: var(--shadow-md);
        border: 1px solid var(--border);
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
        font-size: 17px;
        font-weight: 700;
        color: var(--deep-blue);
        margin-bottom: 6px;
      }

      .result-card p {
        font-size: 13px;
        color: var(--gray-500);
        line-height: 1.5;
        margin-bottom: 12px;
      }

      .result-card .meta {
        display: flex;
        gap: 12px;
      }

      .result-card .meta span {
        font-size: 12px;
        color: var(--gray-400);
        display: flex;
        align-items: center;
        gap: 4px;
      }

      .result-card .meta .salary {
        color: var(--emerald);
        font-weight: 600;
      }

      .selection-count {
        font-size: 13px;
        color: var(--gray-400);
        margin-bottom: 12px;
        text-align: center;
      }

      .reset-btn {
        margin-top: 24px;
        background: transparent;
        border: 2px solid var(--gray-300);
        padding: 14px;
        border-radius: var(--radius-md);
        font-size: 15px;
        font-weight: 600;
        color: var(--gray-600);
        cursor: pointer;
        width: 100%;
        font-family: var(--font);
      }

      .reset-btn:active {
        background: var(--gray-100);
      }

      .result-header {
        text-align: center;
        margin-bottom: 20px;
      }

      .result-header .big-icon {
        font-size: 48px;
        margin-bottom: 12px;
      }

      .result-header h2 {
        font-size: 22px;
        font-weight: 800;
        color: var(--deep-blue);
        margin-bottom: 6px;
      }

      .result-header p {
        color: var(--gray-500);
        font-size: 14px;
      }
    `,
  ];

  connectedCallback() {
    super.connectedCallback();
    const saved = getQuizState();
    if (saved.completed && saved.results) {
      this._step = saved.step;
      this._level = saved.level || null;
      this._selectedSubjects = saved.selectedSubjects;
      this._alevelTrack = saved.alevelTrack || null;
      this._strength = saved.strength || null;
      this._completed = true;
      this._results = saved.results;
    } else if (saved.step > 1) {
      this._step = saved.step;
      this._level = saved.level || null;
      this._selectedSubjects = saved.selectedSubjects;
      this._alevelTrack = saved.alevelTrack || null;
      this._strength = saved.strength || null;
    }
  }

  private _save() {
    saveQuizState({
      step: this._step,
      level: this._level || undefined,
      selectedSubjects: this._selectedSubjects,
      alevelTrack: this._alevelTrack || undefined,
      strength: this._strength || undefined,
      completed: this._completed,
      results: this._results,
    });
  }

  private _selectLevel(level: StudentLevel) {
    this._level = level;
    this._step = 2;
    this._save();
  }

  private _toggleSubject(id: string) {
    if (this._selectedSubjects.includes(id)) {
      this._selectedSubjects = this._selectedSubjects.filter(s => s !== id);
    } else if (this._selectedSubjects.length < 3) {
      this._selectedSubjects = [...this._selectedSubjects, id];
    }
    this.requestUpdate();
  }

  private _confirmSubjects() {
    const mapping = getBestMappingForSubjects(this._selectedSubjects);
    this._results = mapping.careers;
    this._completed = true;
    this._step = 4;
    saveQuizResults(this._results);
    this._save();
  }

  private _selectTrack(track: ALevelTrack) {
    this._alevelTrack = track;
    this._step = 3;
    this._save();
  }

  private _selectStrength(strength: string) {
    this._strength = strength;
    this._computeALevelResults();
  }

  private static readonly _TAG_EMOJI: Record<string, string> = {
    brain: '🧠', chart: '📊', shield: '🛡️', cloud: '☁️',
    robot: '🤖', dna: '🧬', drone: '🚁', rocket: '🚀',
    pill: '💊', leaf: '🌿', wallet: '💳', calc: '🧮',
    chain: '🔗', cash: '💵',
  };

  private _getTagEmoji(icon: string): string {
    return AppQuiz._TAG_EMOJI[icon] ?? '🏷️';
  }

  private _getTagClass(icon: string): string {
    return AppQuiz._TAG_EMOJI[icon] ? icon : 'default';
  }

  private _computeALevelResults() {
    const track = this._alevelTrack;
    const strength = this._strength;

    let careers: CareerPath[] = [];

    if (track === 'sciences') {
      if (strength === 'data') {
        careers = [
          { title: 'Data Scientist', description: 'Analyze complex datasets to drive business and scientific decisions.', avgSalary: '$95K-$160K', growthPotential: 'Very High', icon: '📊' },
          { title: 'AI/Machine Learning Engineer', description: 'Build intelligent systems that learn and adapt.', avgSalary: '$110K-$170K', growthPotential: 'Very High', icon: '🧠' },
          { title: 'Cloud Solutions Architect', description: 'Design scalable cloud infrastructure for enterprises.', avgSalary: '$120K-$180K', growthPotential: 'High', icon: '☁️' },
        ];
      } else if (strength === 'creative') {
        careers = [
          { title: 'Robotics Engineer', description: 'Design and program autonomous robotic systems.', avgSalary: '$85K-$130K', growthPotential: 'High', icon: '🤖' },
          { title: 'IoT Solutions Architect', description: 'Build connected device ecosystems for smart environments.', avgSalary: '$100K-$160K', growthPotential: 'Very High', icon: '📡' },
          { title: 'Hardware Design Engineer', description: 'Create electronic systems and components.', avgSalary: '$90K-$140K', growthPotential: 'Moderate', icon: '🔧' },
        ];
      } else {
        careers = [
          { title: 'Cybersecurity Analyst', description: 'Protect networks and data from cyber threats.', avgSalary: '$90K-$140K', growthPotential: 'High', icon: '🛡️' },
          { title: 'Bio-informatics Scientist', description: 'Use computation to solve biological problems.', avgSalary: '$85K-$130K', growthPotential: 'High', icon: '🧬' },
          { title: 'Precision Agriculture Technologist', description: 'Apply tech to optimize farming and food production.', avgSalary: '$70K-$110K', growthPotential: 'High', icon: '🌱' },
        ];
      }
    } else if (track === 'arts') {
      if (strength === 'data') {
        careers = [
          { title: 'ESG Consultant', description: 'Guide sustainability and governance strategy.', avgSalary: '$80K-$130K', growthPotential: 'Very High', icon: '🌍' },
          { title: 'Public Policy Director', description: 'Shape organizational and government policy.', avgSalary: '$90K-$150K', growthPotential: 'Moderate', icon: '🏛️' },
          { title: 'Geo-Spatial Data Analyst', description: 'Analyze geographic data for planning decisions.', avgSalary: '$70K-$110K', growthPotential: 'High', icon: '🗺️' },
        ];
      } else {
        careers = [
          { title: 'UX Writer', description: 'Craft user-centered content for digital products.', avgSalary: '$70K-$110K', growthPotential: 'High', icon: '✍️' },
          { title: 'Digital Content Strategist', description: 'Plan content for global digital brands.', avgSalary: '$70K-$115K', growthPotential: 'High', icon: '📄' },
          { title: 'Technical Writer', description: 'Document complex products for diverse audiences.', avgSalary: '$65K-$100K', growthPotential: 'Moderate', icon: '📝' },
        ];
      }
    } else {
      if (strength === 'data') {
        careers = [
          { title: 'Quantitative Analyst', description: 'Build models for investment and trading.', avgSalary: '$120K-$200K', growthPotential: 'High', icon: '📈' },
          { title: 'FinTech Product Manager', description: 'Lead digital financial product development.', avgSalary: '$100K-$160K', growthPotential: 'High', icon: '💳' },
          { title: 'Blockchain Strategist', description: 'Design blockchain solutions for business.', avgSalary: '$110K-$180K', growthPotential: 'Very High', icon: '⛓️' },
        ];
      } else {
        careers = [
          { title: 'Venture Capital Analyst', description: 'Invest in high-growth technology startups.', avgSalary: '$80K-$150K', growthPotential: 'Moderate', icon: '💰' },
          { title: 'Digital Marketing Director', description: 'Lead data-driven marketing strategies.', avgSalary: '$100K-$170K', growthPotential: 'High', icon: '📣' },
          { title: 'Startup Founder', description: 'Build and scale your own tech venture.', avgSalary: '$100K-$500K+', growthPotential: 'Very High', icon: '🚀' },
        ];
      }
    }

    this._results = careers;
    this._completed = true;
    this._step = 4;
    saveQuizResults(this._results);
    this._save();
  }

  private _reset() {
    this._step = 1;
    this._level = null;
    this._selectedSubjects = [];
    this._alevelTrack = null;
    this._strength = null;
    this._results = [];
    this._completed = false;
    localStorage.removeItem('careerpath_quiz');
    localStorage.removeItem('careerpath_quiz_results');
    this.requestUpdate();
  }

  private _strengthOptions(): { id: string; label: string }[] {
    if (this._alevelTrack === 'sciences') {
      return [
        { id: 'data', label: 'Analyzing data & patterns' },
        { id: 'creative', label: 'Building & creating things' },
        { id: 'research', label: 'Research & experimentation' },
      ];
    }
    if (this._alevelTrack === 'arts') {
      return [
        { id: 'data', label: 'Research & analysis' },
        { id: 'creative', label: 'Writing & communication' },
      ];
    }
    return [
      { id: 'data', label: 'Numbers & analytics' },
      { id: 'creative', label: 'Strategy & leadership' },
    ];
  }

  render() {
    if (this._completed && this._results.length > 0) {
      return this._renderResults();
    }

    return html`
      <app-header title="Career Quiz"></app-header>
      <div class="quiz-page">
        <div class="step-indicator">
          <div class="step-dot ${this._step >= 1 ? 'active' : ''} ${this._step > 1 ? 'done' : ''}"></div>
          <div class="step-dot ${this._step >= 2 ? 'active' : ''} ${this._step > 2 ? 'done' : ''}"></div>
          <div class="step-dot ${this._step >= 3 ? 'active' : ''} ${this._step > 3 ? 'done' : ''}"></div>
        </div>

        ${this._step === 1 ? this._renderStep1() : ''}
        ${this._step === 2 && this._level === 'olevel' ? this._renderStep2OLevel() : ''}
        ${this._step === 2 && this._level === 'alevel' ? this._renderStep2ALevel() : ''}
        ${this._step === 3 ? this._renderStep3() : ''}
      </div>
    `;
  }

  private _renderStep1() {
    return html`
      <div class="question">What level are you currently in?</div>
      <div class="options">
        <button class="option-btn" @click=${() => this._selectLevel('olevel')}>
          <div class="radio"><div class="radio-inner"></div></div>
          <span>O-Level (S1 - S4)</span>
        </button>
        <button class="option-btn" @click=${() => this._selectLevel('alevel')}>
          <div class="radio"><div class="radio-inner"></div></div>
          <span>A-Level (S5 - S6)</span>
        </button>
      </div>
    `;
  }

  private _renderStep2OLevel() {
    return html`
      <div class="question">Select your top 3 favorite subjects</div>
      <div class="selection-count">
        ${this._selectedSubjects.length}/3 selected
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
      <div class="nav-buttons">
        <button class="btn btn-secondary" @click=${() => { this._step = 1; this._level = null; this.requestUpdate(); }}>
          Back
        </button>
        <button
          class="btn btn-primary"
          ?disabled=${this._selectedSubjects.length !== 3}
          style=${this._selectedSubjects.length === 3 ? '' : 'opacity:0.5;pointer-events:none'}
          @click=${this._confirmSubjects}
        >
          See Results
        </button>
      </div>
    `;
  }

  private _renderStep2ALevel() {
    return html`
      <div class="question">What is your A-Level Track?</div>
      <div class="options">
        <button class="option-btn" @click=${() => this._selectTrack('sciences')}>
          <div class="radio"><div class="radio-inner"></div></div>
          <div>
            <div style="font-weight:600;">Pure Sciences</div>
            <div style="font-size:13px;color:var(--gray-400);margin-top:2px;">PCM, BCM, PCB, PEM, PMT...</div>
          </div>
        </button>
        <button class="option-btn" @click=${() => this._selectTrack('arts')}>
          <div class="radio"><div class="radio-inner"></div></div>
          <div>
            <div style="font-weight:600;">Arts & Humanities</div>
            <div style="font-size:13px;color:var(--gray-400);margin-top:2px;">HEG, HEL, HGA, HGL, HED...</div>
          </div>
        </button>
        <button class="option-btn" @click=${() => this._selectTrack('business')}>
          <div class="radio"><div class="radio-inner"></div></div>
          <div>
            <div style="font-weight:600;">Business / Economics</div>
            <div style="font-size:13px;color:var(--gray-400);margin-top:2px;">MEG, MEA, MEE, SEC, EEG...</div>
          </div>
        </button>
      </div>
      <div class="nav-buttons">
        <button class="btn btn-secondary" @click=${() => { this._step = 1; this._level = null; this.requestUpdate(); }}>
          Back
        </button>
      </div>
    `;
  }

  private _renderStep3() {
    const options = this._strengthOptions();
    return html`
      <div class="question">What describes you best?</div>
      <div class="options">
        ${options.map(
          o => html`
            <button class="option-btn" @click=${() => this._selectStrength(o.id)}>
              <div class="radio"><div class="radio-inner"></div></div>
              <span>${o.label}</span>
            </button>
          `
        )}
      </div>
      <div class="nav-buttons">
        <button class="btn btn-secondary" @click=${() => { this._step = 2; this._alevelTrack = null; this.requestUpdate(); }}>
          Back
        </button>
      </div>
    `;
  }

  private _renderResults() {
    return html`
      <app-header title="Your Results"></app-header>
      <div class="quiz-page">
        <div class="result-header">
          <div class="big-icon">🎉</div>
          <h2>Your Career Matches</h2>
          <p>Based on your responses, here are modern careers you should explore</p>
        </div>

        <div class="results-list">
          ${this._results.map(
            (r, i) => html`
              <div class="result-card" style="animation-delay: ${i * 0.1}s">
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
        </div>

        <p style="text-align:center;color:var(--gray-400);font-size:13px;margin-top:16px;">
          Results saved — you can view them anytime from the Results tab
        </p>

        <button class="reset-btn" @click=${this._reset}>Retake Quiz</button>
      </div>
    `;
  }
}
