import { LitElement, css, html } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import { sharedStyles } from '../styles/shared-styles';

import { COMBINATION_MAPPINGS } from '../mockData';
import { formatSalary } from '../utils';
import '../components/header';
import type { CareerPath, Degree } from '../types';

interface TaggedCareer extends CareerPath {
  combinations: string[];
}

interface TaggedDegree extends Degree {
  combinations: string[];
}

@customElement('app-careers-list')
export class AppCareersList extends LitElement {
  @state() private _searchTerm = '';
  @state() private _activeTab: 'careers' | 'degrees' = 'careers';

  static styles = [
    sharedStyles,
    css`
      .page-container {
        padding: 16px;
        padding-bottom: calc(72px + env(safe-area-inset-bottom, 0px) + 16px);
        min-height: 100vh;
      }



      .search-box {
        margin-bottom: 20px;
        position: relative;
      }

      .search-box input {
        width: 100%;
        padding: 16px 16px 16px 48px;
        border-radius: var(--radius-lg);
        border: 1px solid var(--border);
        background: var(--surface);
        color: var(--text-primary);
        font-size: 16px;
        box-shadow: var(--shadow-sm);
        transition: all 0.3s ease;
        box-sizing: border-box;
      }

      .search-box input:focus {
        outline: none;
        border-color: var(--emerald);
        box-shadow: 0 0 0 3px rgba(0, 184, 148, 0.2);
      }

      .search-icon {
        position: absolute;
        left: 16px;
        top: 50%;
        transform: translateY(-50%);
        color: var(--gray-400);
        font-size: 20px;
      }

      .tabs {
        display: flex;
        gap: 8px;
        margin-bottom: 24px;
        background: var(--surface);
        padding: 6px;
        border-radius: var(--radius-lg);
        border: 1px solid var(--border);
        box-shadow: var(--shadow-sm);
      }

      .tab {
        flex: 1;
        padding: 12px;
        border: none;
        background: transparent;
        color: var(--text-secondary);
        font-weight: 700;
        font-size: 15px;
        border-radius: var(--radius-md);
        cursor: pointer;
        transition: all 0.2s ease;
        -webkit-tap-highlight-color: transparent;
      }

      .tab.active {
        background: var(--emerald);
        color: var(--white);
        box-shadow: 0 2px 8px rgba(0, 184, 148, 0.3);
      }

      .list-grid {
        display: grid;
        grid-template-columns: 1fr;
        gap: 16px;
      }

      /* Career Item Styles */
      .career-item {
        background: var(--surface);
        border-radius: var(--radius-lg);
        border: 1px solid var(--border);
        padding: 20px;
        box-shadow: var(--shadow-sm);
        display: flex;
        flex-direction: column;
        gap: 12px;
      }

      .career-header {
        display: flex;
        gap: 16px;
        align-items: flex-start;
      }

      .career-info {
        flex: 1;
      }

      .career-info h3 {
        font-size: 18px;
        font-weight: 800;
        color: var(--text-primary);
        margin: 0 0 6px;
        line-height: 1.2;
      }

      .career-info p {
        font-size: 14px;
        color: var(--text-secondary);
        margin: 0;
        line-height: 1.5;
      }



      /* Degree Item Styles */
      .degree-item {
        background: var(--surface);
        border-radius: var(--radius-lg);
        border: 1px solid var(--border);
        padding: 20px;
        box-shadow: var(--shadow-sm);
      }

      .degree-item h3 {
        font-size: 18px;
        font-weight: 800;
        color: var(--text-primary);
        margin: 0 0 8px;
        line-height: 1.3;
      }

      .degree-item .uni {
        font-size: 14px;
        color: var(--emerald);
        font-weight: 700;
        margin-bottom: 8px;
        display: flex;
        align-items: center;
        gap: 6px;
      }

      .degree-item p {
        font-size: 14px;
        color: var(--text-secondary);
        margin: 0;
        line-height: 1.5;
      }

      /* Tags */
      .tags {
        display: flex;
        flex-wrap: wrap;
        gap: 8px;
        margin-top: 16px;
        padding-top: 16px;
        border-top: 1px dashed var(--border);
      }

      .tag {
        background: var(--gray-100);
        color: var(--gray-600);
        padding: 4px 10px;
        border-radius: 8px;
        font-size: 12px;
        font-weight: 700;
        letter-spacing: 0.5px;
        border: 1px solid var(--border);
        transition: all 0.2s ease;
      }

      .tag:hover {
        background: var(--gray-200);
      }

      /* Dark Theme */
      :host-context(html[data-theme="dark"]) .tabs {
        background: var(--surface-secondary, #242B3D);
        border-color: var(--border, #2E3548);
      }

      :host-context(html[data-theme="dark"]) .career-item,
      :host-context(html[data-theme="dark"]) .degree-item {
        background: var(--surface-secondary, #242B3D);
        border-color: var(--border, #2E3548);
      }

      :host-context(html[data-theme="dark"]) .tag {
        background: var(--surface, #1A1F2E);
        color: var(--gray-400);
        border-color: var(--border, #2E3548);
      }

      :host-context(html[data-theme="dark"]) .tag:hover {
        background: var(--gray-800);
      }
    `
  ];

  connectedCallback() {
    super.connectedCallback();
    const params = new URLSearchParams(window.location.search);
    const q = params.get('q');
    const tab = params.get('tab');
    
    if (q) {
      this._searchTerm = decodeURIComponent(q).toLowerCase();
    }
    if (tab === 'careers' || tab === 'degrees') {
      this._activeTab = tab;
    }
  }

  private _handleSearch(e: Event) {
    const input = e.target as HTMLInputElement;
    this._searchTerm = input.value.toLowerCase();
  }


  render() {
    const careersMap = new Map<string, TaggedCareer>();
    const degreesMap = new Map<string, TaggedDegree>();

    COMBINATION_MAPPINGS.forEach(combo => {
      combo.careers.forEach(career => {
        if (!careersMap.has(career.title)) {
          careersMap.set(career.title, { ...career, combinations: [] });
        }
        const c = careersMap.get(career.title)!;
        if (!c.combinations.includes(combo.code)) {
          c.combinations.push(combo.code);
        }
      });
      combo.degrees.forEach(degree => {
        if (!degreesMap.has(degree.name)) {
          degreesMap.set(degree.name, { ...degree, combinations: [] });
        }
        const d = degreesMap.get(degree.name)!;
        if (!d.combinations.includes(combo.code)) {
          d.combinations.push(combo.code);
        }
      });
    });

    let careers = Array.from(careersMap.values());
    let degrees = Array.from(degreesMap.values());

    if (this._searchTerm) {
      careers = careers.filter(c => 
        c.title.toLowerCase().includes(this._searchTerm) ||
        c.combinations.some(combo => combo.toLowerCase().includes(this._searchTerm))
      );
      degrees = degrees.filter(d => 
        d.name.toLowerCase().includes(this._searchTerm) ||
        d.university.toLowerCase().includes(this._searchTerm) ||
        d.combinations.some(combo => combo.toLowerCase().includes(this._searchTerm))
      );
    }

    return html`
      <app-header pageTitle="Careers & Degrees"></app-header>
      <div class="page-container">
        <div class="search-box">
          <span class="search-icon">🔍</span>
          <input 
            type="text" 
            placeholder="Search ${this._activeTab} or combinations..." 
            .value=${this._searchTerm}
            @input=${this._handleSearch}
          />
        </div>

        <div class="tabs">
          <button 
            class="tab ${this._activeTab === 'careers' ? 'active' : ''}" 
            @click=${() => this._activeTab = 'careers'}
          >
            Careers
          </button>
          <button 
            class="tab ${this._activeTab === 'degrees' ? 'active' : ''}" 
            @click=${() => this._activeTab = 'degrees'}
          >
            Degrees
          </button>
        </div>

        <div class="list-grid">
          ${this._activeTab === 'careers' ? html`
            ${careers.length === 0 ? html`
              <div style="text-align: center; padding: 40px; color: var(--gray-500);">
                No careers found matching "${this._searchTerm}"
              </div>
            ` : ''}
            ${careers.map(career => html`
              <div class="career-item">
                <div class="career-header">
                  <div class="career-info">
                    <h3>${career.title}</h3>
                    <p>${career.description}</p>
                  </div>
                </div>
                <div class="meta" style="display: flex; gap: 12px; flex-wrap: wrap; margin-top: 4px;">
                  <span class="salary" style="color: var(--emerald); font-weight: 600; font-size: 13px;">💰 ${formatSalary(career.avgSalary)}</span>
                  <span style="color: var(--gray-500); font-size: 13px;">📈 ${career.growthPotential}</span>
                </div>
                <div class="tags">
                  ${career.combinations.map(combo => html`
                    <span class="tag">${combo}</span>
                  `)}
                </div>
              </div>
            `)}
          ` : html`
            ${degrees.length === 0 ? html`
              <div style="text-align: center; padding: 40px; color: var(--gray-500);">
                No degrees found matching "${this._searchTerm}"
              </div>
            ` : ''}
            ${degrees.map(degree => html`
              <div class="degree-item">
                <h3>${degree.name}</h3>
                <div class="uni">
                  <span>🏛️</span> ${degree.university}
                </div>
                <p>${degree.description}</p>
                <div class="tags">
                  ${degree.combinations.map(combo => html`
                    <span class="tag">${combo}</span>
                  `)}
                </div>
              </div>
            `)}
          `}
        </div>
      </div>
    `;
  }
}
