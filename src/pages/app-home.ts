import { LitElement, css, html } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import { sharedStyles } from '../styles/shared-styles';
import { hasSeenWelcome, markWelcomeSeen } from '../store';
import { router, resolveRouterPath } from '../router';

@customElement('app-home')
export class AppHome extends LitElement {
  @state() private _showWelcome = false;
  @state() private _dismissed = false;

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
        background: linear-gradient(160deg, #071126 0%, #0B1D3A 40%, #162D50 100%);
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
        color: var(--white);
        font-size: 32px;
        font-weight: 800;
        letter-spacing: -0.5px;
        margin-bottom: 12px;
        line-height: 1.2;
      }

      .welcome-screen .subtitle {
        color: rgba(255, 255, 255, 0.65);
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
        box-shadow: 0 8px 30px rgba(0, 184, 148, 0.4);
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
        text-align: center;
        padding: 5px 16px 24px;
      }

      .hero-icon {
        width: 300px;
        height: 300px;
        margin: 0 auto 5px;
        object-fit: contain;
      }

      .hero h1 {
        font-size: 26px;
        font-weight: 800;
        color: var(--deep-blue);
        letter-spacing: -0.5px;
        margin-bottom: 8px;
      }

      .hero p {
        color: var(--gray-500);
        font-size: 15px;
        line-height: 1.6;
        max-width: 300px;
        margin: 0 auto;
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
    `,
  ];

  connectedCallback() {
    super.connectedCallback();
    if (!hasSeenWelcome()) {
      this._showWelcome = true;
    }
  }

  private _dismissWelcome() {
    this._dismissed = true;
    markWelcomeSeen();
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
              <img class="welcome-logo" src="/assets/icons/icon_192.png" alt="CareerPath UG" />
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
            <div class="home-content">
              <div class="hero">
                <img class="hero-icon" src="/assets/icons/icon_192.png" alt="CareerPath UG" />
                <h1>CareerPath UG</h1>
                <p>Map your subjects to modern, high-earning careers</p>
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
              </div>

              <div class="stats">
                <div class="stat-item">
                  <div class="number">50+</div>
                  <div class="label">A-Level Combos</div>
                </div>
                <div class="stat-item">
                  <div class="number">21</div>
                  <div class="label">O-Level Subjects</div>
                </div>
                <div class="stat-item">
                  <div class="number">40+</div>
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
