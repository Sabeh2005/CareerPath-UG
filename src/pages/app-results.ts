import { LitElement, css, html } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import { sharedStyles } from '../styles/shared-styles';
import { getTagEmoji, getTagClass, formatSalary } from '../utils';
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

      :host-context(html[data-theme="dark"]) .result-card {
        background: var(--surface-secondary, #242B3D);
        border-color: var(--border, #2E3548);
      }

      :host-context(html[data-theme="dark"]) .date-badge {
        background: var(--surface-secondary, #242B3D);
        color: var(--gray-500, #9CA3AF);
      }

      :host-context(html[data-theme="dark"]) .suggestion-chip {
        background: var(--surface-secondary, #242B3D);
        color: var(--gray-500, #9CA3AF);
      }

      :host-context(html[data-theme="dark"]) .suggestion-chip:active {
        background: var(--border, #2E3548);
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

  connectedCallback() {
    super.connectedCallback();
    this._loadResults();
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
