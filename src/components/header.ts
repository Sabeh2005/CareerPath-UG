import { LitElement, css, html } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import { getTheme, toggleTheme } from '../utils';
import type { Theme } from '../utils';

@customElement('app-header')
export class AppHeader extends LitElement {
  @state() private _theme: Theme = 'light';
  @state() private _hidden = false;

  private _lastScrollY = 0;
  private _scrollThreshold = 10;
  private _onScroll = () => this._handleScroll();

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
      padding: 10px 16px;
      background: var(--deep-blue);
      color: var(--white);
      min-height: var(--header-height);
      transition: transform 0.35s cubic-bezier(0.4, 0, 0.2, 1);
    }

    header.hidden {
      transform: translateY(-100%);
    }

    :host-context(html[data-theme="dark"]) header {
      background: var(--deep-blue-raw, #0B1D3A);
    }

    /* Left: back button only */
    .left {
      display: flex;
      align-items: center;
      flex: 1;
    }

    /* Center: logo + title */
    .center {
      display: flex;
      align-items: center;
      gap: 10px;
      position: absolute;
      left: 50%;
      transform: translateX(-50%);
    }

    header.hidden .center {
      transform: translateX(-50%);
    }

    /* Right: theme toggle */
    .right {
      display: flex;
      align-items: center;
      flex: 1;
      justify-content: flex-end;
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
      -webkit-tap-highlight-color: transparent;
      flex-shrink: 0;
    }

    .back-btn:active {
      background: rgba(255, 255, 255, 0.25);
    }

    h1 {
      font-size: 18px;
      font-weight: 700;
      letter-spacing: -0.3px;
      white-space: nowrap;
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
      flex-shrink: 0;
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

  connectedCallback() {
    super.connectedCallback();
    window.addEventListener('scroll', this._onScroll, { passive: true });
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    window.removeEventListener('scroll', this._onScroll);
  }

  firstUpdated() {
    this._theme = getTheme();
    this._lastScrollY = window.scrollY;
  }

  private _handleScroll() {
    const currentScrollY = window.scrollY;
    const diff = currentScrollY - this._lastScrollY;

    if (diff > this._scrollThreshold && !this._hidden) {
      this._hidden = true;
    } else if (diff < -this._scrollThreshold && this._hidden) {
      this._hidden = false;
    }

    // Always show header when at the very top of the page
    if (currentScrollY < 10) {
      this._hidden = false;
    }

    this._lastScrollY = currentScrollY;
  }

  render() {
    return html`
      <header class="${this._hidden ? 'hidden' : ''}">
        <div class="left">
          <button class="back-btn" @click=${this._goBack} aria-label="Go back">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
              <polyline points="15 18 9 12 15 6"></polyline>
            </svg>
          </button>
        </div>
        <div class="center">
          <div class="logo">CP</div>
          <h1>CareerPath UG</h1>
        </div>
        <div class="right">
          <button class="theme-toggle" @click=${this._handleThemeToggle} aria-label="Toggle theme">
            <span class="toggle-option ${this._theme === 'light' ? 'active' : ''}">
              <span class="icon-sun">☀️</span>
            </span>
            <span class="toggle-option ${this._theme === 'dark' ? 'active' : ''}">
              <span class="icon-moon">🌙</span>
            </span>
          </button>
        </div>
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
