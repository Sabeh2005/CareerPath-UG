import { LitElement, css, html } from 'lit';
import { property, customElement } from 'lit/decorators.js';

export interface NavTab {
  id: string;
  label: string;
  icon: string;
  path: string;
}

const TABS: NavTab[] = [
  { id: 'home', label: 'Home', icon: '🏠', path: '/' },
  { id: 'quiz', label: 'Quiz', icon: '📋', path: '/quiz' },
  { id: 'mapper', label: 'Mapper', icon: '🗺️', path: '/mapper' },
  { id: 'results', label: 'Results', icon: '📊', path: '/results' },
];

@customElement('bottom-nav')
export class BottomNav extends LitElement {
  @property({ type: String }) activeTab = 'home';

  static styles = css`
    :host {
      display: block;
      position: fixed;
      bottom: 0;
      left: 0;
      right: 0;
      z-index: 200;
      padding-bottom: env(safe-area-inset-bottom, 0px);
      background: var(--surface);
      border-top: 1px solid var(--border);
      box-shadow: 0 -4px 20px rgba(0, 0, 0, 0.08);
    }

    nav {
      display: flex;
      align-items: stretch;
      height: var(--nav-height);
      padding: 4px 8px;
    }

    .tab {
      flex: 1;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      gap: 2px;
      padding: 8px 4px;
      border-radius: var(--radius-md);
      cursor: pointer;
      transition: all 0.2s ease;
      background: transparent;
      border: none;
      outline: none;
      user-select: none;
      -webkit-tap-highlight-color: transparent;
      position: relative;
    }

    .tab:active {
      transform: scale(0.95);
    }

    .tab .icon {
      font-size: 22px;
      line-height: 1;
      transition: transform 0.2s ease;
    }

    .tab.active .icon {
      transform: translateY(-2px) scale(1.1);
    }

    .tab .label {
      font-size: 11px;
      font-weight: 500;
      color: var(--gray-400);
      transition: color 0.2s;
    }

    .tab.active .label {
      color: var(--deep-blue);
      font-weight: 600;
    }

    .tab .indicator {
      position: absolute;
      top: 0;
      left: 50%;
      transform: translateX(-50%);
      width: 24px;
      height: 3px;
      border-radius: 0 0 3px 3px;
      background: var(--emerald);
      opacity: 0;
      transition: opacity 0.2s;
    }

    .tab.active .indicator {
      opacity: 1;
    }

    .tab.active {
      background: var(--gray-50);
    }

    :host-context(html[data-theme="dark"]) .tab.active {
      background: var(--surface-secondary, #242B3D);
    }

    :host-context(html[data-theme="dark"]) .tab .label {
      color: var(--gray-500, #9CA3AF);
    }

    :host-context(html[data-theme="dark"]) .tab.active .label {
      color: var(--emerald, #00B894);
    }
  `;

  render() {
    return html`
      <nav>
        ${TABS.map(
          tab => html`
            <button
              class="tab ${this.activeTab === tab.id ? 'active' : ''}"
              @click=${() => this._navigate(tab)}
              aria-label=${tab.label}
            >
              <div class="indicator"></div>
              <span class="icon">${tab.icon}</span>
              <span class="label">${tab.label}</span>
            </button>
          `
        )}
      </nav>
    `;
  }

  private _navigate(tab: NavTab) {
    this.dispatchEvent(
      new CustomEvent('nav-change', {
        detail: { tab: tab.id, path: tab.path },
        bubbles: true,
        composed: true,
      })
    );
  }
}
