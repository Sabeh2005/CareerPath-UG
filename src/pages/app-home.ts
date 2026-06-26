import { LitElement, css, html } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import { sharedStyles } from '../styles/shared-styles';
import { hasSeenWelcome, markWelcomeSeen } from '../store';
import { router, resolveRouterPath } from '../router';
import { getTheme, toggleTheme } from '../utils';
import type { Theme } from '../utils';

@customElement('app-home')
export class AppHome extends LitElement {
  @state() private _showWelcome = false;
  @state() private _dismissed = false;
  @state() private _theme: Theme = 'light';

  static styles = [
    sharedStyles,
    css`
      .welcome-screen {
        position: fixed;
        inset: 0;
        z-index: 500;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        background: linear-gradient(160deg, #FFFFFF 0%, #F8FAFC 40%, #E2E8F0 100%);
        padding: 32px;
        text-align: center;
        animation: fadeIn 0.6s ease;
      }

      .welcome-screen.dismissed {
        animation: fadeOut 0.4s ease forwards;
      }

      .welcome-logo {
        width: 150px;
        height: 150px;
        margin-bottom: 32px;
        animation: float 3s ease-in-out infinite;
        object-fit: contain;
      }

      .welcome-screen h1 {
        color: var(--deep-blue-raw);
        font-size: 32px;
        font-weight: 800;
        letter-spacing: -0.5px;
        margin-bottom: 12px;
        line-height: 1.2;
      }

      .welcome-screen .subtitle {
        color: var(--gray-600);
        font-size: 16px;
        line-height: 1.6;
        max-width: 300px;
        margin-bottom: 40px;
      }

      .welcome-screen .start-btn {
        background: linear-gradient(135deg, var(--emerald) 0%, var(--emerald-dark) 100%);
        color: var(--white);
        border: none;
        padding: 16px 48px;
        border-radius: var(--radius-full);
        font-size: 18px;
        font-weight: 700;
        cursor: pointer;
        transition: all 0.3s ease;
        box-shadow: 0 8px 30px rgba(0, 184, 148, 0.3);
        min-width: 240px;
      }

      .welcome-screen .start-btn:active {
        transform: scale(0.96);
      }

      .home-content {
        padding: 16px;
        padding-bottom: calc(72px + env(safe-area-inset-bottom, 0px) + 16px);
        min-height: 100vh;
      }

      .hero {
        display: flex;
        flex-direction: column;
        align-items: center;
        text-align: center;
        padding: 4px 16px 24px;
        gap: 3px;
      }

      .hero-icon {
        width: 220px;
        height: 220px;
        object-fit: contain;
      }

      .hero h1 {
        font-size: 26px;
        font-weight: 800;
        color: var(--deep-blue);
        letter-spacing: -0.5px;
        margin: 0;
      }

      .hero p {
        color: var(--gray-500);
        font-size: 15px;
        line-height: 1.6;
        max-width: 300px;
        margin: 0;
      }

      .home-search-container {
        margin: 24px 16px 0;
      }
      .home-search-bar {
        display: flex;
        align-items: center;
        background: var(--surface);
        border: 1px solid var(--border);
        border-radius: var(--radius-full);
        padding: 14px 20px;
        box-shadow: var(--shadow-sm);
        cursor: text;
        transition: all 0.3s ease;
      }
      .home-search-bar:hover, .home-search-bar:active {
        border-color: var(--emerald);
        box-shadow: 0 0 0 3px rgba(0, 184, 148, 0.1);
      }
      .home-search-icon {
        font-size: 20px;
        margin-right: 12px;
        color: var(--gray-400);
      }
      .home-search-placeholder {
        color: var(--gray-500);
        font-size: 16px;
      }

      .features {
        display: flex;
        flex-direction: column;
        gap: 16px;
        margin-top: 24px;
      }

      .feature-card {
        background: var(--surface);
        border-radius: var(--radius-lg);
        padding: 24px;
        box-shadow: var(--shadow-md);
        border: 1px solid var(--border);
        cursor: pointer;
        transition: all 0.2s ease;
        text-align: left;
      }

      .feature-card:active {
        transform: scale(0.98);
        box-shadow: var(--shadow-sm);
      }

      .feature-card .fc-icon {
        width: 48px;
        height: 48px;
        border-radius: 14px;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 24px;
        margin-bottom: 16px;
      }

      .feature-card .fc-icon.green {
        background: rgba(0, 184, 148, 0.12);
      }

      .feature-card .fc-icon.blue {
        background: rgba(11, 29, 58, 0.1);
      }

      .feature-card h3 {
        font-size: 18px;
        font-weight: 700;
        color: var(--deep-blue);
        margin-bottom: 6px;
      }

      .feature-card p {
        color: var(--gray-500);
        font-size: 14px;
        line-height: 1.5;
      }

      .feature-card .arrow {
        display: inline-block;
        margin-top: 12px;
        color: var(--emerald);
        font-weight: 600;
        font-size: 14px;
      }

      .stats {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 12px;
        margin-top: 24px;
      }

      .stat-item {
        background: var(--gray-50);
        border-radius: var(--radius-md);
        padding: 16px;
        text-align: center;
        border: 1px solid var(--border);
      }

      .stat-item .number {
        font-size: 24px;
        font-weight: 800;
        color: var(--emerald);
      }

      .stat-item .label {
        font-size: 12px;
        color: var(--gray-500);
        margin-top: 4px;
      }

      @keyframes float {
        0%, 100% { transform: translateY(0px); }
        50% { transform: translateY(-8px); }
      }

      @keyframes fadeOut {
        to { opacity: 0; transform: scale(0.95); }
      }

      :host-context(html[data-theme="dark"]) .feature-card {
        background: var(--surface-secondary, #242B3D);
        border-color: var(--border, #2E3548);
      }

      :host-context(html[data-theme="dark"]) .fc-icon.blue {
        background: rgba(226, 232, 240, 0.1);
      }

      :host-context(html[data-theme="dark"]) .stat-item {
        background: var(--surface-secondary, #242B3D);
        border-color: var(--border, #2E3548);
      }

      /* Theme toggle */
      .home-top-bar {
        display: flex;
        justify-content: flex-end;
        padding: 12px 16px 0;
      }

      .theme-toggle {
        display: flex;
        align-items: center;
        gap: 6px;
        padding: 4px;
        border-radius: 20px;
        background: var(--gray-100);
        border: 1px solid var(--border);
        cursor: pointer;
        transition: all 0.3s ease;
        -webkit-tap-highlight-color: transparent;
      }

      :host-context(html[data-theme="dark"]) .theme-toggle {
        background: var(--surface-secondary, #242B3D);
        border-color: var(--border, #2E3548);
      }

      .theme-toggle:active {
        transform: scale(0.95);
      }

      .toggle-option {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 30px;
        height: 30px;
        border-radius: 50%;
        font-size: 15px;
        z-index: 1;
        transition: all 0.3s ease;
      }

      .toggle-option.active {
        background: var(--white);
        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.12);
      }

      :host-context(html[data-theme="dark"]) .toggle-option.active {
        background: var(--surface, #1A1F2E);
        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.4);
      }

      .toggle-option:not(.active) {
        opacity: 0.4;
      }
    `,
  ];

  connectedCallback() {
    super.connectedCallback();
    if (!hasSeenWelcome()) {
      this._showWelcome = true;
    }
  }

  firstUpdated() {
    this._theme = getTheme();
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
  }

  private _handleThemeToggle() {
    this._theme = toggleTheme();
  }

  private _dismissWelcome() {
    this._dismissed = true;
    markWelcomeSeen();
    this.dispatchEvent(new CustomEvent('welcome-dismissed', { bubbles: true, composed: true }));
    setTimeout(() => {
      this._showWelcome = false;
      this._dismissed = false;
    }, 400);
  }

  render() {
    return html`
      ${this._showWelcome
        ? html`
            <div class="welcome-screen ${this._dismissed ? 'dismissed' : ''}">
              <img class="welcome-logo" src="/assets/icons/512x512.png" alt="CareerPath UG" />
              <h1>CareerPath UG</h1>
              <p class="subtitle">
                Map your subjects to modern, high-earning careers. 
                Your future starts now.
              </p>
              <button class="start-btn" @click=${this._dismissWelcome}>
                Get Started
              </button>
            </div>
          `
        : html`
            <div class="home-top-bar">
              <button class="theme-toggle" @click=${this._handleThemeToggle} aria-label="Toggle theme">
                <span class="toggle-option ${this._theme === 'light' ? 'active' : ''}">
                  ☀️
                </span>
                <span class="toggle-option ${this._theme === 'dark' ? 'active' : ''}">
                  🌙
                </span>
              </button>
            </div>
            <div class="home-content">
              <div class="hero">
                <img class="hero-icon" src="/assets/icons/512x512.png" alt="CareerPath UG" />
                <h1>CareerPath UG</h1>
                <p>Map your subjects to modern, high-earning careers</p>
              </div>

              <div class="home-search-container" @click=${() => router.navigate(resolveRouterPath('search'))}>
                <div class="home-search-bar">
                  <span class="home-search-icon">🔍</span>
                  <span class="home-search-placeholder">Search careers, degrees, combos...</span>
                </div>
              </div>

              <div class="features">
                <div class="feature-card" @click=${() => router.navigate(resolveRouterPath('quiz'))}>
                  <div class="fc-icon green">📋</div>
                  <h3>Career Match Quiz</h3>
                  <p>Answer a few questions and discover high-paying modern careers that match your subjects and interests.</p>
                  <span class="arrow">Take the Quiz →</span>
                </div>

                <div class="feature-card" @click=${() => router.navigate(resolveRouterPath('mapper'))}>
                  <div class="fc-icon blue">🗺️</div>
                  <h3>Subject & Course Mapper</h3>
                  <p>Map your O-Level or A-Level subjects to university degrees and the careers they unlock.</p>
                  <span class="arrow">Explore Mapper →</span>
                </div>

                <div class="feature-card" @click=${() => router.navigate(resolveRouterPath('careers-list'))}>
                  <div class="fc-icon blue">🎓</div>
                  <h3>Careers & Degrees List</h3>
                  <p>Explore all available careers, degrees, and subject combinations with salary insights.</p>
                  <span class="arrow">View List →</span>
                </div>

                <div class="feature-card" @click=${() => router.navigate(resolveRouterPath('about'))}>
                  <div class="fc-icon" style="background: rgba(236, 72, 153, 0.1); color: #EC4899;">ℹ️</div>
                  <h3>About</h3>
                  <p>Learn more about CareerPath UG and meet the project team behind the app.</p>
                  <span class="arrow" style="color: #EC4899;">Read More →</span>
                </div>
              </div>

              <div class="stats">
                <div class="stat-item">
                  <div class="number">49</div>
                  <div class="label">A-Level Combos</div>
                </div>
                <div class="stat-item">
                  <div class="number">21</div>
                  <div class="label">O-Level Subjects</div>
                </div>
                <div class="stat-item">
                  <div class="number">240</div>
                  <div class="label">Modern Careers</div>
                </div>
                <div class="stat-item">
                  <div class="number">100%</div>
                  <div class="label">Offline Ready</div>
                </div>
              </div>
            </div>
          `}
    `;
  }
}
