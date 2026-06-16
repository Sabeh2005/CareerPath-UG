import { LitElement, css, html } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import { sharedStyles } from '../styles/shared-styles';
import { getTagEmoji, getTagClass, formatSalary } from '../utils';
import {
  OLEVEL_SUBJECTS,
  getBestMappingForSubjects,
  getCombinationByCode,
  getAllComboCodes,
} from '../mockData';
import type { CareerPath } from '../types';
import { router, resolveRouterPath } from '../router';
import { getMapperState, saveMapperState, MAPPER_KEY } from '../store';

@customElement('app-mapper')
export class AppMapper extends LitElement {
  @state() private _view: 'landing' | 'olevel' | 'alevel' = 'landing';
  @state() private _selectedSubjects: string[] = [];
  @state() private _mappedCareers: CareerPath[] = [];
  @state() private _suggestedCombo = '';
  @state() private _showResults = false;

  connectedCallback() {
    super.connectedCallback();
    if (localStorage.getItem(MAPPER_KEY)) {
      const saved = getMapperState();
      this._view = saved.mode;
      if (saved.mode === 'olevel' && saved.olevelSubjects.length > 0) {
        this._selectedSubjects = saved.olevelSubjects;
        if (this._selectedSubjects.length === 3) {
          this._computeOLevelResults();
        }
      }
    }
  }

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

      /* Back navigation - removed, header handles back nav */

      .back-bar {
        margin-bottom: 16px;
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

      .combo-list {
        display: flex;
        flex-direction: column;
        gap: 8px;
      }

      .combo-item {
        display: flex;
        align-items: center;
        gap: 12px;
        padding: 14px 16px;
        border-radius: var(--radius-md);
        background: var(--surface);
        border: 2px solid var(--border);
        cursor: pointer;
        transition: all 0.2s ease;
        font-family: var(--font);
        text-align: left;
        width: 100%;
      }

      .combo-item:hover {
        border-color: var(--emerald);
        background: rgba(0, 184, 148, 0.02);
      }

      .combo-item:active {
        transform: scale(0.98);
      }

      .combo-item .code-badge {
        min-width: 44px;
        height: 32px;
        border-radius: 8px;
        background: var(--deep-blue);
        color: var(--white);
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 12px;
        font-weight: 800;
        letter-spacing: 0.5px;
        flex-shrink: 0;
        transition: background-color 0.2s ease;
      }

      .combo-item:hover .code-badge {
        background: var(--emerald);
      }

      .combo-item .combo-info {
        flex: 1;
        min-width: 0;
      }

      .combo-item .combo-name {
        font-size: 13px;
        font-weight: 600;
        color: var(--deep-blue);
        line-height: 1.3;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }

      .combo-item .combo-cat {
        display: inline-block;
        font-size: 11px;
        font-weight: 600;
        padding: 2px 8px;
        border-radius: 10px;
        margin-top: 4px;
      }

      .cat-sciences { background: rgba(59, 130, 246, 0.1); color: #1D4ED8; }
      .cat-arts     { background: rgba(168, 85, 247, 0.1);  color: #7E22CE; }
      .cat-business { background: rgba(234, 179, 8, 0.12);  color: #92400E; }
      .cat-mixed    { background: rgba(34, 197, 94, 0.1);   color: #15803D; }
      .cat-languages{ background: rgba(239, 68, 68, 0.1);   color: #B91C1C; }

      .combo-item .chevron-arrow {
        font-size: 20px;
        color: var(--gray-300);
        flex-shrink: 0;
        transition: transform 0.2s ease, color 0.2s ease;
      }

      .combo-item:hover .chevron-arrow {
        color: var(--emerald);
        transform: translateX(4px);
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

      :host-context(html[data-theme="dark"]) .level-btn {
        background: var(--surface-secondary, #242B3D);
        border-color: var(--border, #2E3548);
      }

      :host-context(html[data-theme="dark"]) .level-btn.alevel .btn-icon {
        background: linear-gradient(135deg, rgba(226, 232, 240, 0.12), rgba(226, 232, 240, 0.04));
      }

      :host-context(html[data-theme="dark"]) .combo-item {
        background: var(--surface-secondary, #242B3D);
        border-color: var(--border, #2E3548);
      }

      :host-context(html[data-theme="dark"]) .combo-item .code-badge {
        background: var(--deep-blue-raw, #0B1D3A);
      }

      :host-context(html[data-theme="dark"]) .cat-sciences { background: rgba(59, 130, 246, 0.3); color: #93C5FD; }
      :host-context(html[data-theme="dark"]) .cat-arts { background: rgba(168, 85, 247, 0.3); color: #D8B4FE; }
      :host-context(html[data-theme="dark"]) .cat-business { background: rgba(234, 179, 8, 0.3); color: #FDE047; }
      :host-context(html[data-theme="dark"]) .cat-mixed { background: rgba(34, 197, 94, 0.3); color: #86EFAC; }
      :host-context(html[data-theme="dark"]) .cat-languages { background: rgba(239, 68, 68, 0.3); color: #FCA5A5; }

      :host-context(html[data-theme="dark"]) .result-card {
        background: var(--surface-secondary, #242B3D);
        border-color: var(--border, #2E3548);
      }

      :host-context(html[data-theme="dark"]) .subject-chip {
        background: var(--surface-secondary, #242B3D);
        border-color: var(--border, #2E3548);
      }

      :host-context(html[data-theme="dark"]) .subject-chip.selected {
        border-color: var(--emerald, #00B894);
        background: rgba(0, 184, 148, 0.1);
      }

      :host-context(html[data-theme="dark"]) .subject-chip.selected .num {
        background: var(--emerald, #00B894);
        color: var(--white, #FFFFFF);
      }

      :host-context(html[data-theme="dark"]) .combo-badge {
        background: var(--deep-blue-raw, #0B1D3A);
      }

      :host-context(html[data-theme="dark"]) .tag-chip {
        border-color: rgba(255, 255, 255, 0.2);
      }

      :host-context(html[data-theme="dark"]) .tag-brain { background: rgba(139, 92, 246, 0.3); color: #C4B5FD; border-color: rgba(139, 92, 246, 0.5); }
      :host-context(html[data-theme="dark"]) .tag-chart { background: rgba(59, 130, 246, 0.3); color: #93C5FD; border-color: rgba(59, 130, 246, 0.5); }
      :host-context(html[data-theme="dark"]) .tag-shield { background: rgba(239, 68, 68, 0.3); color: #FCA5A5; border-color: rgba(239, 68, 68, 0.5); }
      :host-context(html[data-theme="dark"]) .tag-cloud { background: rgba(96, 165, 250, 0.3); color: #BFDBFE; border-color: rgba(96, 165, 250, 0.5); }
      :host-context(html[data-theme="dark"]) .tag-robot { background: rgba(107, 114, 128, 0.3); color: #D1D5DB; border-color: rgba(107, 114, 128, 0.5); }
      :host-context(html[data-theme="dark"]) .tag-dna { background: rgba(236, 72, 153, 0.3); color: #FBCFE8; border-color: rgba(236, 72, 153, 0.5); }
      :host-context(html[data-theme="dark"]) .tag-drone { background: rgba(34, 197, 94, 0.3); color: #86EFAC; border-color: rgba(34, 197, 94, 0.5); }
      :host-context(html[data-theme="dark"]) .tag-rocket { background: rgba(249, 115, 22, 0.3); color: #FDBA74; border-color: rgba(249, 115, 22, 0.5); }
      :host-context(html[data-theme="dark"]) .tag-pill { background: rgba(168, 85, 247, 0.3); color: #D8B4FE; border-color: rgba(168, 85, 247, 0.5); }
      :host-context(html[data-theme="dark"]) .tag-leaf { background: rgba(34, 197, 94, 0.3); color: #86EFAC; border-color: rgba(34, 197, 94, 0.5); }
      :host-context(html[data-theme="dark"]) .tag-wallet { background: rgba(234, 179, 8, 0.3); color: #FDE047; border-color: rgba(234, 179, 8, 0.5); }
      :host-context(html[data-theme="dark"]) .tag-calc { background: rgba(99, 102, 241, 0.3); color: #A5B4FC; border-color: rgba(99, 102, 241, 0.5); }
      :host-context(html[data-theme="dark"]) .tag-chain { background: rgba(20, 184, 166, 0.3); color: #5EEAD4; border-color: rgba(20, 184, 166, 0.5); }
      :host-context(html[data-theme="dark"]) .tag-cash { background: rgba(34, 197, 94, 0.3); color: #86EFAC; border-color: rgba(34, 197, 94, 0.5); }
      :host-context(html[data-theme="dark"]) .tag-globe { background: rgba(59, 130, 246, 0.3); color: #93C5FD; border-color: rgba(59, 130, 246, 0.5); }
      :host-context(html[data-theme="dark"]) .tag-megaphone { background: rgba(234, 179, 8, 0.3); color: #FDE047; border-color: rgba(234, 179, 8, 0.5); }
      :host-context(html[data-theme="dark"]) .tag-write { background: rgba(139, 92, 246, 0.3); color: #C4B5FD; border-color: rgba(139, 92, 246, 0.5); }
      :host-context(html[data-theme="dark"]) .tag-tool { background: rgba(107, 114, 128, 0.3); color: #D1D5DB; border-color: rgba(107, 114, 128, 0.5); }
      :host-context(html[data-theme="dark"]) .tag-city { background: rgba(59, 130, 246, 0.3); color: #93C5FD; border-color: rgba(59, 130, 246, 0.5); }
      :host-context(html[data-theme="dark"]) .tag-default { background: rgba(100, 116, 139, 0.3); color: #CBD5E1; border-color: rgba(100, 116, 139, 0.5); }
    `,
  ];

  private _toggleSubject(id: string) {
    if (this._selectedSubjects.includes(id)) {
      this._selectedSubjects = this._selectedSubjects.filter(s => s !== id);
    } else if (this._selectedSubjects.length < 3) {
      this._selectedSubjects = [...this._selectedSubjects, id];
    }
    saveMapperState({ mode: 'olevel', olevelSubjects: this._selectedSubjects, selectedCombo: '' });
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
    this._showResults = true;
  }

  private _navigateToLevel(level: 'olevel' | 'alevel') {
    this._view = level;
    this._showResults = false;
    this._selectedSubjects = [];
    this._mappedCareers = [];
    this._suggestedCombo = '';
    saveMapperState({ mode: level, olevelSubjects: [], selectedCombo: '' });
  }

  render() {
    return html`
      <app-header></app-header>
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
        <span class="page-label">A-Level</span>
      </div>
      ${this._renderALevel()}
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

  private _getCategoryClass(category: string): string {
    return 'cat-' + category.toLowerCase();
  }

  private _renderALevel() {
    const combos = getAllComboCodes();

    return html`
      <div class="section-title">Your A-Level Combination</div>
      <div class="section-desc">Tap your subject combination to see matching degrees and careers.</div>

      <div class="combo-list">
        ${combos.map(
          code => {
            const combo = getCombinationByCode(code);
            if (!combo) return '';
            return html`
              <button
                class="combo-item"
                @click=${() => router.navigate(resolveRouterPath('combination/' + code))}
              >
                <span class="code-badge">${code}</span>
                <div class="combo-info">
                  <div class="combo-name">${combo.fullName}</div>
                  <span class="combo-cat ${this._getCategoryClass(combo.category)}">${combo.category}</span>
                </div>
                <span class="chevron-arrow">›</span>
              </button>
            `;
          }
        )}
      </div>
    `;
  }

  private _renderResults() {
    const combo = this._suggestedCombo;

    return html`
      <div class="results-section">
        ${combo ? html`
          <div class="combo-badge-container" style="display: flex; align-items: center; justify-content: space-between; background: var(--gray-50); padding: 12px 16px; border-radius: var(--radius-md); border: 1px dashed var(--border); margin-bottom: 20px;">
            <div>
              <span style="font-size: 11px; color: var(--gray-400); display: block; text-transform: uppercase; font-weight: 700; letter-spacing: 0.5px; margin-bottom: 4px;">Suggested A-Level Combination</span>
              <span style="font-size: 15px; font-weight: 800; color: var(--deep-blue);">${getCombinationByCode(combo)?.fullName || combo}</span>
            </div>
            <button class="btn btn-outline" style="min-height: 38px; padding: 6px 12px; font-size: 12px; width: auto; font-weight: 700; border-radius: var(--radius-sm);" @click=${() => router.navigate(resolveRouterPath('combination/' + combo))}>
              View Details &rarr;
            </button>
          </div>
        ` : ''}

        ${this._mappedCareers.length > 0 ? html`
          <div class="section-title" style="font-size:16px;margin-top:16px;">🚀 Modern Career Paths</div>
          ${this._mappedCareers.map(
            r => html`
              <div class="result-card">
                <div class="tag-chip tag-${getTagClass(r.icon)}">
                  <span class="tag-emoji">${getTagEmoji(r.icon)}</span>
                  <span class="tag-label">${r.icon}</span>
                </div>
                <h3>${r.title}</h3>
                <p>${r.description}</p>
                <div class="meta">
                  <span class="salary">💰 ${formatSalary(r.avgSalary)}</span>
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
