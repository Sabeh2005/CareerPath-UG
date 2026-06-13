import { LitElement, css, html } from 'lit';
import { customElement, state } from 'lit/decorators.js';

import './pages/app-home';
import './components/header';
import './components/bottom-nav';
import './styles/global.css';
import { router, resolveRouterPath } from './router';

@customElement('app-index')
export class AppIndex extends LitElement {
  @state() private _currentTab = 'home';

  static styles = css`
    :host {
      display: flex;
      flex-direction: column;
      min-height: 100dvh;
    }

    .content {
      flex: 1;
      display: flex;
      flex-direction: column;
    }

    .welcome-overlay {
      position: fixed;
      inset: 0;
      z-index: 999;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      background: linear-gradient(135deg, var(--deep-blue-dark) 0%, var(--deep-blue) 50%, var(--deep-blue-light) 100%);
      animation: fadeOut 0.5s ease 2.5s forwards;
    }

    .welcome-overlay .logo-big {
      width: 100px;
      height: 100px;
      background: linear-gradient(135deg, var(--emerald), var(--emerald-dark));
      border-radius: 24px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 48px;
      font-weight: 800;
      color: var(--white);
      box-shadow: 0 20px 60px rgba(0, 184, 148, 0.3);
      animation: pulse 2s ease-in-out infinite;
      margin-bottom: 24px;
    }

    .welcome-overlay h1 {
      color: var(--white);
      font-size: 28px;
      font-weight: 800;
      letter-spacing: -0.5px;
      margin-bottom: 8px;
    }

    .welcome-overlay p {
      color: rgba(255, 255, 255, 0.7);
      font-size: 16px;
      text-align: center;
      max-width: 280px;
      line-height: 1.5;
    }

    @keyframes fadeOut {
      to { opacity: 0; pointer-events: none; }
    }

    @keyframes pulse {
      0%, 100% { transform: scale(1); }
      50% { transform: scale(1.05); }
    }
  `;

  firstUpdated() {
    router.addEventListener('route-changed', () => {
      if ('startViewTransition' in document) {
        (document as any).startViewTransition(() => this.requestUpdate());
      } else {
        this.requestUpdate();
      }
      this._updateActiveTab();
    });

    this._updateActiveTab();
  }

  private _updateActiveTab() {
    const path = window.location.pathname.replace(resolveRouterPath(), '') || '/';
    const tabMap: Record<string, string> = {
      '/': 'home',
      '/quiz': 'quiz',
      '/mapper': 'mapper',
      '/results': 'results',
    };
    this._currentTab = tabMap[path] || 'home';
  }

  private _handleNavChange(e: CustomEvent) {
    const { path } = e.detail;
    router.navigate(path);
  }

  render() {
    return html`
      <div class="content">
        ${router.render()}
      </div>

      <bottom-nav
        activeTab=${this._currentTab}
        @nav-change=${this._handleNavChange}
      ></bottom-nav>

      <!-- Shoelace theme import -->
      <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@shoelace-style/shoelace@2.18.0/dist/themes/light.css" />
    `;
  }
}
