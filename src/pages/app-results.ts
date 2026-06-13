import { LitElement, css, html } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import { sharedStyles } from '../styles/shared-styles';
import { getQuizResults, clearQuiz } from '../store';
import type { CareerPath } from '../types';

@customElement('app-results')
export class AppResults extends LitElement {
  @state() private _results: CareerPath[] = [];
  @state() private _hasResults = false;

  static styles = [
    sharedStyles,
    css`
      .results-page {
        padding: 16px;
        padding-bottom: calc(72px + env(safe-area-inset-bottom, 0px) + 16px);
        min-height: 100vh;
        animation: fadeIn 0.3s ease;
      }

      .header-section {
        text-align: center;
        padding: 24px 0;
      }

      .header-section .icon {
        font-size: 48px;
        margin-bottom: 12px;
      }

      .header-section h2 {
        font-size: 22px;
        font-weight: 800;
        color: var(--deep-blue);
        margin-bottom: 6px;
      }

      .header-section p {
        color: var(--gray-500);
        font-size: 14px;
      }

      .date-badge {
        display: inline-block;
        padding: 4px 12px;
        border-radius: var(--radius-full);
        background: var(--gray-100);
        font-size: 12px;
        color: var(--gray-500);
        margin-top: 8px;
      }

      .results-list {
        display: flex;
        flex-direction: column;
        gap: 16px;
        margin-top: 8px;
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
        flex-wrap: wrap;
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

      .actions {
        display: flex;
        flex-direction: column;
        gap: 12px;
        margin-top: 24px;
      }

      .empty-state {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        text-align: center;
        padding: 60px 24px;
        min-height: 60vh;
      }

      .empty-state .big-icon {
        font-size: 64px;
        margin-bottom: 20px;
      }

      .empty-state h2 {
        font-size: 20px;
        font-weight: 700;
        color: var(--deep-blue);
        margin-bottom: 8px;
      }

      .empty-state p {
        font-size: 14px;
        color: var(--gray-500);
        line-height: 1.6;
        max-width: 280px;
        margin-bottom: 24px;
      }

      .suggestion-chips {
        display: flex;
        flex-wrap: wrap;
        gap: 8px;
        justify-content: center;
        margin-top: 16px;
      }

      .suggestion-chip {
        padding: 10px 18px;
        border-radius: var(--radius-full);
        background: var(--gray-100);
        color: var(--gray-600);
        font-size: 13px;
        font-weight: 500;
        cursor: pointer;
        border: none;
        font-family: var(--font);
        transition: all 0.2s;
      }

      .suggestion-chip:active {
        background: var(--gray-200);
        transform: scale(0.97);
      }
    `,
  ];

  connectedCallback() {
    super.connectedCallback();
    this._loadResults();
  }

  private static readonly _TAG_EMOJI: Record<string, string> = {
    brain: '🧠', chart: '📊', shield: '🛡️', cloud: '☁️',
    robot: '🤖', dna: '🧬', drone: '🚁', rocket: '🚀',
    pill: '💊', leaf: '🌿', wallet: '💳', calc: '🧮',
    chain: '🔗', cash: '💵',
  };

  private _getTagEmoji(icon: string): string {
    return AppResults._TAG_EMOJI[icon] ?? '🏷️';
  }

  private _getTagClass(icon: string): string {
    return AppResults._TAG_EMOJI[icon] ? icon : 'default';
  }

  private _loadResults() {
    this._results = getQuizResults();
    this._hasResults = this._results.length > 0;
  }

  private _clearResults() {
    clearQuiz();
    this._results = [];
    this._hasResults = false;
    this.requestUpdate();
  }

  render() {
    return html`
      <app-header title="My Results"></app-header>
      <div class="results-page">
        ${this._hasResults
          ? this._renderSavedResults()
          : this._renderEmptyState()}
      </div>
    `;
  }

  private _renderSavedResults() {
    return html`
      <div class="header-section">
        <div class="icon">📊</div>
        <h2>Your Career Matches</h2>
        <p>Based on your Career Match Quiz responses</p>
        <div class="date-badge">Saved results</div>
      </div>

      <div class="results-list">
        ${this._results.map(
          (r, i) => html`
            <div class="result-card" style="animation-delay: ${i * 0.08}s">
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

      <div class="actions">
        <button class="btn btn-outline" @click=${this._clearResults}>
          Clear Results
        </button>
      </div>
    `;
  }

  private _renderEmptyState() {
    return html`
      <div class="empty-state">
        <div class="big-icon">🔍</div>
        <h2>No Results Yet</h2>
        <p>
          Take the Career Match Quiz to discover modern, high-earning careers that match your subjects and interests.
        </p>
        <div class="suggestion-chips">
          <button class="suggestion-chip" @click=${() => window.location.href = '/quiz'}>
            Take the Quiz 🎯
          </button>
          <button class="suggestion-chip" @click=${() => window.location.href = '/mapper'}>
            Explore Mapper 🗺️
          </button>
        </div>
      </div>
    `;
  }
}
