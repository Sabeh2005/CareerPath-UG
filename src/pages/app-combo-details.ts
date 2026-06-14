import { LitElement, css, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { sharedStyles } from '../styles/shared-styles';
import { getTagEmoji, getTagClass, formatSalary } from '../utils';
import { getCombinationByCode, getMappingForCombination } from '../mockData';

@customElement('app-combo-details')
export class AppComboDetails extends LitElement {
  @property({ type: String }) code = '';

  static styles = [
    sharedStyles,
    css`
      .details-page {
        padding: 16px;
        padding-bottom: calc(72px + env(safe-area-inset-bottom, 0px) + 16px);
        min-height: 100vh;
        animation: fadeIn 0.3s ease;
      }

      /* Hero Section */
      .hero-section {
        background: linear-gradient(135deg, var(--deep-blue-dark) 0%, var(--deep-blue) 100%);
        border-radius: var(--radius-lg);
        padding: 24px 20px;
        color: var(--white);
        margin-bottom: 24px;
        box-shadow: var(--shadow-lg);
        border: 1px solid rgba(255, 255, 255, 0.08);
      }

      .hero-header {
        display: flex;
        align-items: center;
        gap: 16px;
        margin-bottom: 16px;
      }

      .combo-badge-large {
        font-size: 24px;
        font-weight: 900;
        letter-spacing: 1px;
        background: linear-gradient(135deg, var(--emerald) 0%, var(--emerald-dark) 100%);
        color: var(--white);
        padding: 12px 20px;
        border-radius: 16px;
        box-shadow: 0 8px 20px rgba(0, 184, 148, 0.3);
        flex-shrink: 0;
      }

      .hero-title-group {
        flex: 1;
      }

      .hero-title-group h2 {
        font-size: 20px;
        font-weight: 800;
        margin-bottom: 4px;
        color: var(--white);
        line-height: 1.3;
      }

      .combo-cat-badge {
        display: inline-block;
        font-size: 11px;
        font-weight: 700;
        text-transform: uppercase;
        letter-spacing: 0.5px;
        padding: 3px 10px;
        border-radius: 10px;
      }

      .cat-sciences { background: rgba(59, 130, 246, 0.2); color: #93C5FD; }
      .cat-arts     { background: rgba(168, 85, 247, 0.2);  color: #D8B4FE; }
      .cat-business { background: rgba(234, 179, 8, 0.24);  color: #FDE047; }
      .cat-mixed    { background: rgba(34, 197, 94, 0.2);   color: #86EFAC; }
      .cat-languages{ background: rgba(239, 68, 68, 0.2);   color: #FCA5A5; }

      .subjects-list {
        display: flex;
        flex-wrap: wrap;
        gap: 8px;
        margin-top: 12px;
        border-top: 1px solid rgba(255, 255, 255, 0.1);
        padding-top: 12px;
      }

      .subject-pill {
        background: rgba(255, 255, 255, 0.08);
        border: 1px solid rgba(255, 255, 255, 0.12);
        color: rgba(255, 255, 255, 0.9);
        padding: 4px 12px;
        border-radius: var(--radius-full);
        font-size: 12px;
        font-weight: 500;
      }

      /* Results Cards */
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

      /* Empty State */
      .empty-state {
        text-align: center;
        padding: 60px 20px;
        color: var(--gray-400);
        min-height: 60vh;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
      }

      .empty-state .icon {
        font-size: 48px;
        margin-bottom: 16px;
      }

      .empty-state h3 {
        color: var(--gray-500);
        font-size: 18px;
        margin-bottom: 8px;
        font-weight: 700;
      }

      .empty-state p {
        font-size: 14px;
        line-height: 1.5;
        margin-bottom: 24px;
        max-width: 280px;
      }

      :host-context(html[data-theme="dark"]) .hero-section {
        background: linear-gradient(135deg, var(--deep-blue-dark-raw, #071126) 0%, var(--deep-blue-raw, #0B1D3A) 100%);
        border-color: rgba(255, 255, 255, 0.1);
      }

      :host-context(html[data-theme="dark"]) .result-card {
        background: var(--surface-secondary, #242B3D);
        border-color: var(--border, #2E3548);
      }

      :host-context(html[data-theme="dark"]) .cat-sciences { background: rgba(59, 130, 246, 0.3); color: #93C5FD; }
      :host-context(html[data-theme="dark"]) .cat-arts { background: rgba(168, 85, 247, 0.3); color: #D8B4FE; }
      :host-context(html[data-theme="dark"]) .cat-business { background: rgba(234, 179, 8, 0.3); color: #FDE047; }
      :host-context(html[data-theme="dark"]) .cat-mixed { background: rgba(34, 197, 94, 0.3); color: #86EFAC; }
      :host-context(html[data-theme="dark"]) .cat-languages { background: rgba(239, 68, 68, 0.3); color: #FCA5A5; }

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

  private _getCategoryClass(category: string): string {
    return 'cat-' + category.toLowerCase();
  }

  render() {
    const codeUpper = (this.code || '').toUpperCase();
    const combo = getCombinationByCode(codeUpper);
    const mapping = getMappingForCombination(codeUpper);

    if (!combo || !mapping) {
      return html`
        <app-header></app-header>
        <div class="details-page">
          <div class="empty-state">
            <div class="icon">🔍</div>
            <h3>Combination Not Found</h3>
            <p>We couldn't find matching information for the combination code "${this.code}".</p>
            <p style="color: var(--gray-500); font-size: 13px;">Use the back button above to return.</p>
          </div>
        </div>
      `;
    }

    return html`
      <app-header></app-header>
      <div class="details-page">
        <!-- Hero Card -->
        <div class="hero-section">
          <div class="hero-header">
            <div class="combo-badge-large">${codeUpper}</div>
            <div class="hero-title-group">
              <h2>${combo.fullName}</h2>
              <span class="combo-cat-badge ${this._getCategoryClass(combo.category)}">
                ${combo.category}
              </span>
            </div>
          </div>
          <div class="subjects-list">
            ${combo.subjects.map(s => html`<span class="subject-pill">${s}</span>`)}
          </div>
        </div>

        <!-- Recommended Degrees Section -->
        <div class="section-title" style="font-size:17px;margin-top:16px;">🎓 Recommended Degrees</div>
        ${mapping.degrees.length > 0
          ? mapping.degrees.map(
              (d, i) => html`
                <div class="result-card" style="animation-delay: ${i * 0.05}s">
                  <h3>${d.name}</h3>
                  <div class="sub">${d.university} · ${d.duration}</div>
                  <p>${d.description}</p>
                </div>
              `
            )
          : html`
              <p style="font-size:13px;color:var(--gray-400);margin-bottom:24px;">No recommended degrees listed for this combination.</p>
            `}

        <!-- Modern Career Paths Section -->
        <div class="section-title" style="font-size:17px;margin-top:24px;">🚀 Modern Career Paths</div>
        ${mapping.careers.length > 0
          ? mapping.careers.map(
              (r, i) => html`
                <div class="result-card" style="animation-delay: ${(mapping.degrees.length + i) * 0.05}s">
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
            )
          : html`
              <p style="font-size:13px;color:var(--gray-400);">No modern careers listed for this combination.</p>
            `}
      </div>
    `;
  }
}
