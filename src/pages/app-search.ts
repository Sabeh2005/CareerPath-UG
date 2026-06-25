import { LitElement, css, html } from 'lit';
import { customElement, state, query } from 'lit/decorators.js';
import { sharedStyles } from '../styles/shared-styles';
import { router, resolveRouterPath } from '../router';
import { ALEVEL_COMBINATIONS, COMBINATION_MAPPINGS } from '../mockData';
import { formatSalary } from '../utils';
import type { CareerPath, Degree } from '../types';
import '../components/header';

interface TaggedCareer extends CareerPath {
  combinations: string[];
}

interface TaggedDegree extends Degree {
  combinations: string[];
}

type FilterType = 'all' | 'combinations' | 'degrees' | 'careers';

@customElement('app-search')
export class AppSearch extends LitElement {
  @state() private _searchTerm = '';
  @state() private _activeFilter: FilterType = 'all';

  @query('.search-input') private _searchInput!: HTMLInputElement;

  static styles = [
    sharedStyles,
    css`
      .search-page {
        background: var(--background);
        min-height: 100vh;
        display: flex;
        flex-direction: column;
      }

      .search-container {
        position: sticky;
        top: var(--header-height, 56px);
        z-index: 90;
        background: var(--surface);
        padding: 16px;
        box-shadow: 0 2px 10px rgba(0,0,0,0.05);
        border-bottom: 1px solid var(--border);
      }

      .search-bar-wrapper {
        flex: 1;
        position: relative;
      }

      .search-input {
        width: 100%;
        padding: 12px 16px 12px 40px;
        border-radius: var(--radius-full);
        border: 1px solid var(--border);
        background: var(--gray-50);
        color: var(--text-primary);
        font-size: 16px;
        box-sizing: border-box;
      }

      .search-input:focus {
        outline: none;
        border-color: var(--emerald);
        background: var(--surface);
        box-shadow: 0 0 0 3px rgba(0, 184, 148, 0.1);
      }

      .search-icon {
        position: absolute;
        left: 14px;
        top: 50%;
        transform: translateY(-50%);
        color: var(--gray-400);
      }

      .clear-btn {
        position: absolute;
        right: 14px;
        top: 50%;
        transform: translateY(-50%);
        background: var(--gray-200);
        color: var(--gray-600);
        border: none;
        width: 20px;
        height: 20px;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 12px;
        cursor: pointer;
      }

      .filters-scroll {
        display: flex;
        gap: 8px;
        overflow-x: auto;
        padding: 12px 0 0;
        scrollbar-width: none;
      }
      .filters-scroll::-webkit-scrollbar {
        display: none;
      }

      .filter-chip {
        white-space: nowrap;
        padding: 8px 16px;
        border-radius: var(--radius-full);
        border: 1px solid var(--border);
        background: var(--surface);
        color: var(--text-secondary);
        font-size: 14px;
        font-weight: 600;
        cursor: pointer;
        transition: all 0.2s;
      }

      .filter-chip.active {
        background: var(--emerald);
        color: white;
        border-color: var(--emerald);
      }

      .results-container {
        padding: 16px;
        flex: 1;
        overflow-y: auto;
      }

      .result-section {
        margin-bottom: 24px;
      }

      .section-title {
        font-size: 16px;
        font-weight: 800;
        color: var(--text-primary);
        margin: 0 0 12px;
        text-transform: uppercase;
        letter-spacing: 0.5px;
      }

      .list-grid {
        display: grid;
        grid-template-columns: 1fr;
        gap: 12px;
      }

      /* Reusing styles for cards */
      .result-card {
        background: var(--surface);
        border-radius: var(--radius-lg);
        border: 1px solid var(--border);
        padding: 16px;
        box-shadow: var(--shadow-sm);
        cursor: pointer;
        transition: transform 0.2s, box-shadow 0.2s;
      }
      .result-card:active {
        transform: scale(0.98);
      }

      .card-header h3 {
        margin: 0 0 4px;
        font-size: 16px;
        font-weight: 700;
        color: var(--text-primary);
      }

      .card-desc {
        font-size: 13px;
        color: var(--text-secondary);
        margin: 0 0 8px;
        line-height: 1.4;
      }

      .meta-row {
        display: flex;
        gap: 12px;
        flex-wrap: wrap;
        font-size: 12px;
        margin-top: 8px;
      }

      .highlight {
        color: var(--emerald);
        font-weight: 600;
      }

      .empty-state {
        text-align: center;
        padding: 40px 20px;
        color: var(--gray-500);
      }

      :host-context(html[data-theme="dark"]) .search-container,
      :host-context(html[data-theme="dark"]) .result-card {
        background: var(--surface-secondary, #242B3D);
        border-color: var(--border, #2E3548);
      }
      :host-context(html[data-theme="dark"]) .search-input {
        background: var(--surface, #1A1F2E);
        border-color: var(--border, #2E3548);
      }
    `
  ];

  firstUpdated() {
    // Auto focus search input on load
    setTimeout(() => {
      if (this._searchInput) {
        this._searchInput.focus();
      }
    }, 100);
  }

  private _handleInput(e: Event) {
    const input = e.target as HTMLInputElement;
    this._searchTerm = input.value;
  }

  private _clearSearch() {
    this._searchTerm = '';
    if (this._searchInput) {
      this._searchInput.value = '';
      this._searchInput.focus();
    }
  }

  private _navigateCombo(code: string) {
    router.navigate(resolveRouterPath(`combination/${code}`));
  }

  private _navigateCareer(title: string) {
    router.navigate(resolveRouterPath(`careers-list?q=${encodeURIComponent(title)}&tab=careers`));
  }

  private _navigateDegree(name: string) {
    router.navigate(resolveRouterPath(`careers-list?q=${encodeURIComponent(name)}&tab=degrees`));
  }

  render() {
    const term = this._searchTerm.toLowerCase().trim();
    
    // Process Data
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

    let combinations = [...ALEVEL_COMBINATIONS];
    let careers = Array.from(careersMap.values());
    let degrees = Array.from(degreesMap.values());

    if (term) {
      combinations = combinations.filter(c => 
        c.code.toLowerCase().includes(term) || 
        c.fullName.toLowerCase().includes(term)
      );
      careers = careers.filter(c => 
        c.title.toLowerCase().includes(term) ||
        c.description.toLowerCase().includes(term)
      );
      degrees = degrees.filter(d => 
        d.name.toLowerCase().includes(term) ||
        d.university.toLowerCase().includes(term)
      );
    }

    const showCombos = (this._activeFilter === 'all' || this._activeFilter === 'combinations') && combinations.length > 0;
    const showDegrees = (this._activeFilter === 'all' || this._activeFilter === 'degrees') && degrees.length > 0;
    const showCareers = (this._activeFilter === 'all' || this._activeFilter === 'careers') && careers.length > 0;

    const noResults = term && !showCombos && !showDegrees && !showCareers;

    return html`
      <div class="search-page">
        <app-header pageTitle="Search"></app-header>
        <div class="search-container">
          <div class="search-bar-wrapper">
            <div class="search-input-container">
              <span class="search-icon">🔍</span>
              <input 
                class="search-input"
                type="text" 
                placeholder="Search..."
                .value=${this._searchTerm}
                @input=${this._handleInput}
              />
              ${this._searchTerm ? html`
                <button class="clear-btn" @click=${this._clearSearch}>✕</button>
              ` : ''}
            </div>
          </div>
          <div class="filters-scroll">
            <button 
              class="filter-chip ${this._activeFilter === 'all' ? 'active' : ''}"
              @click=${() => this._activeFilter = 'all'}
            >All</button>
            <button 
              class="filter-chip ${this._activeFilter === 'combinations' ? 'active' : ''}"
              @click=${() => this._activeFilter = 'combinations'}
            >Combinations</button>
            <button 
              class="filter-chip ${this._activeFilter === 'degrees' ? 'active' : ''}"
              @click=${() => this._activeFilter = 'degrees'}
            >Degrees</button>
            <button 
              class="filter-chip ${this._activeFilter === 'careers' ? 'active' : ''}"
              @click=${() => this._activeFilter = 'careers'}
            >Careers</button>
          </div>
        </div>

        <div class="results-container">
          ${!term && this._activeFilter === 'all' ? html`
            <div class="empty-state">
              <span style="font-size: 32px; display: block; margin-bottom: 12px;">🔎</span>
              Type to search for A-Level combinations, university degrees, or modern careers.
            </div>
          ` : ''}

          ${noResults ? html`
            <div class="empty-state">
              No results found for "${term}" in ${this._activeFilter}.
            </div>
          ` : ''}

          ${showCombos && term ? html`
            <div class="result-section">
              <h2 class="section-title">Combinations</h2>
              <div class="list-grid">
                ${combinations.map(c => html`
                  <div class="result-card" @click=${() => this._navigateCombo(c.code)}>
                    <div class="card-header">
                      <h3>${c.code}</h3>
                    </div>
                    <p class="card-desc">${c.fullName}</p>
                    <div class="meta-row">
                      <span class="highlight">${c.category}</span>
                    </div>
                  </div>
                `)}
              </div>
            </div>
          ` : ''}

          ${showCareers && term ? html`
            <div class="result-section">
              <h2 class="section-title">Careers</h2>
              <div class="list-grid">
                ${careers.map(c => html`
                  <div class="result-card" @click=${() => this._navigateCareer(c.title)}>
                    <div class="card-header">
                      <h3>${c.icon} ${c.title}</h3>
                    </div>
                    <p class="card-desc">${c.description}</p>
                    <div class="meta-row">
                      <span class="highlight">💰 ${formatSalary(c.avgSalary)}</span>
                      <span>📈 ${c.growthPotential}</span>
                    </div>
                  </div>
                `)}
              </div>
            </div>
          ` : ''}

          ${showDegrees && term ? html`
            <div class="result-section">
              <h2 class="section-title">Degrees</h2>
              <div class="list-grid">
                ${degrees.map(d => html`
                  <div class="result-card" @click=${() => this._navigateDegree(d.name)}>
                    <div class="card-header">
                      <h3>${d.name}</h3>
                    </div>
                    <p class="card-desc">${d.university}</p>
                    <div class="meta-row">
                      <span class="highlight">⏱️ ${d.duration}</span>
                    </div>
                  </div>
                `)}
              </div>
            </div>
          ` : ''}
          
          ${term ? '' : html`
            <!-- Show some suggestions if there's no term but they clicked a specific filter -->
            ${this._activeFilter === 'combinations' ? html`
              <div class="result-section">
                <div class="list-grid">
                  ${combinations.slice(0, 10).map(c => html`
                    <div class="result-card" @click=${() => this._navigateCombo(c.code)}>
                      <div class="card-header">
                        <h3>${c.code}</h3>
                      </div>
                      <p class="card-desc">${c.fullName}</p>
                    </div>
                  `)}
                </div>
              </div>
            ` : ''}
            ${this._activeFilter === 'careers' ? html`
              <div class="result-section">
                <div class="list-grid">
                  ${careers.slice(0, 10).map(c => html`
                    <div class="result-card" @click=${() => this._navigateCareer(c.title)}>
                      <div class="card-header">
                        <h3>${c.icon} ${c.title}</h3>
                      </div>
                      <p class="card-desc">${c.description}</p>
                    </div>
                  `)}
                </div>
              </div>
            ` : ''}
            ${this._activeFilter === 'degrees' ? html`
              <div class="result-section">
                <div class="list-grid">
                  ${degrees.slice(0, 10).map(d => html`
                    <div class="result-card" @click=${() => this._navigateDegree(d.name)}>
                      <div class="card-header">
                        <h3>${d.name}</h3>
                      </div>
                      <p class="card-desc">${d.university}</p>
                    </div>
                  `)}
                </div>
              </div>
            ` : ''}
          `}
        </div>
      </div>
    `;
  }
}
