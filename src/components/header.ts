import { LitElement, css, html } from 'lit';
import { property, customElement, state } from 'lit/decorators.js';
import { getTheme, toggleTheme } from '../utils';
import type { Theme } from '../utils';

@customElement('app-header')
export class AppHeader extends LitElement {
  @property({ type: String }) title = 'CareerPath UG';

  @property({ type: Boolean }) enableBack = false;

  @state() private _theme: Theme = 'light';

  static styles = css`
    :host {
      display: block;
      position: sticky;
      top: 0;
      z-index: 100;
    }

    header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 12px 16px;
      background: var(--deep-blue);
      color: var(--white);
      min-height: var(--header-height);
    }

    :host-context(html[data-theme="dark"]) header {
      background: var(--deep-blue-raw, #0B1D3A);
    }

    .left {
      display: flex;
      align-items: center;
      gap: 12px;
    }

    .back-btn {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 36px;
      height: 36px;
      border-radius: 50%;
      background: rgba(255, 255, 255, 0.1);
      color: var(--white);
      font-size: 20px;
      cursor: pointer;
      border: none;
      transition: background 0.2s;
    }

    .back-btn:active {
      background: rgba(255, 255, 255, 0.2);
    }

    h1 {
      font-size: 18px;
      font-weight: 700;
      letter-spacing: -0.3px;
    }

    .logo {
      width: 28px;
      height: 28px;
      background: linear-gradient(135deg, var(--emerald), var(--emerald-dark));
      border-radius: 8px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 14px;
      font-weight: 800;
      color: var(--white);
    }

    /* Theme toggle pill */
    .theme-toggle {
      display: flex;
      align-items: center;
      gap: 6px;
      padding: 4px;
      border-radius: 20px;
      background: rgba(255, 255, 255, 0.12);
      border: 1px solid rgba(255, 255, 255, 0.15);
      cursor: pointer;
      position: relative;
      transition: background 0.3s ease;
      -webkit-tap-highlight-color: transparent;
    }

    .theme-toggle:active {
      transform: scale(0.95);
    }

    .toggle-option {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 28px;
      height: 28px;
      border-radius: 50%;
      font-size: 14px;
      z-index: 1;
      transition: all 0.3s ease;
    }

    .toggle-option.active {
      background: var(--white);
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
    }

    .toggle-option.active .icon-sun {
      color: #F59E0B;
    }

    .toggle-option.active .icon-moon {
      color: #6366F1;
    }

    .toggle-option:not(.active) {
      opacity: 0.5;
    }

    .toggle-option:not(.active) .icon-sun,
    .toggle-option:not(.active) .icon-moon {
      color: var(--white);
    }
  `;

  firstUpdated() {
    this._theme = getTheme();
  }

  render() {
    return html`
      <header>
        <div class="left">
          ${this.enableBack
            ? html`<button class="back-btn" @click=${this._goBack}>&larr;</button>`
            : html`<div class="logo">CP</div>`}
          <h1>${this.title}</h1>
        </div>
        <button class="theme-toggle" @click=${this._handleThemeToggle} aria-label="Toggle theme">
          <span class="toggle-option ${this._theme === 'light' ? 'active' : ''}">
            <span class="icon-sun">☀️</span>
          </span>
          <span class="toggle-option ${this._theme === 'dark' ? 'active' : ''}">
            <span class="icon-moon">🌙</span>
          </span>
        </button>
      </header>
    `;
  }

  private _goBack() {
    history.back();
  }

  private _handleThemeToggle() {
    this._theme = toggleTheme();
    this.dispatchEvent(new CustomEvent('theme-change', {
      detail: { theme: this._theme },
      bubbles: true,
      composed: true,
    }));
  }
}
