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
  @state() private _mode: 'olevel' | 'alevel' = 'olevel';
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

      .mode-toggle {
        display: flex;
        background: var(--gray-100);
        border-radius: var(--radius-md);
        padding: 4px;
        margin-bottom: 24px;
      }

      .mode-btn {
        flex: 1;
        padding: 12px;
        border-radius: 8px;
        font-size: 14px;
        font-weight: 600;
        background: transparent;
        color: var(--gray-500);
        cursor: pointer;
        transition: all 0.2s;
        text-align: center;
        font-family: var(--font);
        border: none;
      }

      .mode-btn.active {
        background: var(--white);
        color: var(--deep-blue);
        box-shadow: var(--shadow-sm);
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

      .result-card .r-icon {
        width: 40px;
        height: 40px;
        border-radius: 12px;
        background: rgba(0, 184, 148, 0.12);
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 20px;
        margin-bottom: 12px;
      }

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

  render() {
    return html`
      <app-header title="Subject Mapper"></app-header>
      <div class="mapper-page">
        <div class="mode-toggle">
          <button
            class="mode-btn ${this._mode === 'olevel' ? 'active' : ''}"
            @click=${() => { this._mode = 'olevel'; this._showResults = false; this._selectedSubjects = []; this._selectedCombo = ''; }}
          >
            O-Level
          </button>
          <button
            class="mode-btn ${this._mode === 'alevel' ? 'active' : ''}"
            @click=${() => { this._mode = 'alevel'; this._showResults = false; this._selectedSubjects = []; this._selectedCombo = ''; }}
          >
            A-Level
          </button>
        </div>

        ${this._mode === 'olevel' ? this._renderOLevel() : this._renderALevel()}

        ${this._showResults ? this._renderResults() : html`
          <div class="empty-state">
            <div class="icon">${this._mode === 'olevel' ? '📚' : '🎓'}</div>
            <h3>Select ${this._mode === 'olevel' ? '3 subjects' : 'a combination'}</h3>
            <p>${this._mode === 'olevel'
              ? 'Pick your top 3 O-Level subjects above to see suggested A-Level combinations and modern careers.'
              : 'Select your A-Level combination from the dropdown to see matching degrees and careers.'}
            </p>
          </div>
        `}
      </div>
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

  private _renderResults() {
    const combo = this._mode === 'olevel' ? this._suggestedCombo : this._selectedCombo;

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
                <div class="r-icon">${r.icon}</div>
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
