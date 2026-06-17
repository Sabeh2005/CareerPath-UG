import { LitElement, css, html } from 'lit';
import { customElement, state } from 'lit/decorators.js';

import './pages/app-home';
import './components/header';
import './components/bottom-nav';
import './styles/global.css';
import { router, resolveRouterPath } from './router';
import { getTheme, setTheme } from './utils';

@customElement('app-index')
export class AppIndex extends LitElement {
  @state() private _currentTab = 'home';
  @state() private _deferredPrompt: any = null;
  @state() private _showInstallPrompt = false;

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

    .install-prompt {
      position: fixed;
      bottom: 88px;
      left: 16px;
      right: 16px;
      background: rgba(11, 29, 58, 0.95);
      backdrop-filter: blur(10px);
      border: 1px solid rgba(255, 255, 255, 0.1);
      border-radius: var(--radius-lg);
      padding: 16px;
      box-shadow: var(--shadow-xl);
      z-index: 1000;
      display: flex;
      flex-direction: column;
      gap: 12px;
      animation: slideUp 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards;
    }

    @media (min-width: 768px) {
      .install-prompt {
        max-width: 400px;
        left: auto;
        right: 24px;
        bottom: 24px;
      }
    }

    .ip-header {
      display: flex;
      align-items: center;
      gap: 12px;
    }

    .ip-icon {
      width: 48px;
      height: 48px;
      border-radius: 12px;
      object-fit: contain;
    }

    .ip-title-group h3 {
      color: var(--white);
      font-size: 16px;
      font-weight: 700;
      margin: 0;
    }

    .ip-title-group p {
      color: rgba(255, 255, 255, 0.6);
      font-size: 12px;
      margin: 0;
    }

    .ip-description {
      color: rgba(255, 255, 255, 0.85);
      font-size: 13px;
      line-height: 1.4;
      margin: 0;
    }

    .ip-actions {
      display: flex;
      gap: 8px;
      justify-content: flex-end;
      margin-top: 4px;
    }

    .ip-btn {
      padding: 8px 16px;
      border-radius: var(--radius-md);
      font-size: 13px;
      font-weight: 600;
      cursor: pointer;
      transition: all 0.2s;
    }

    .ip-btn-install {
      background: linear-gradient(135deg, var(--emerald), var(--emerald-dark));
      color: var(--white);
      border: none;
    }

    .ip-btn-install:active {
      transform: scale(0.97);
    }

    .ip-btn-later {
      background: transparent;
      color: rgba(255, 255, 255, 0.6);
      border: none;
    }

    .ip-btn-later:active {
      color: var(--white);
    }
  `;

  firstUpdated() {
    setTheme(getTheme());

    // Prevent browser from auto-restoring scroll position on navigation
    if ('scrollRestoration' in history) {
      history.scrollRestoration = 'manual';
    }

    const scrollToTop = () => {
      document.documentElement.scrollTop = 0;
      document.body.scrollTop = 0;
    };

    router.addEventListener('route-changed', () => {
      if ('startViewTransition' in document) {
        (document as any).startViewTransition(() => {
          this._updateActiveTab();
          this.requestUpdate();
          // Scroll inside the callback so it takes effect BEFORE
          // the browser captures the new-page screenshot
          scrollToTop();
        });
      } else {
        this._updateActiveTab();
        this.requestUpdate();
        scrollToTop();
      }
    });

    this._updateActiveTab();
  }

  private _updateActiveTab() {
    const path = window.location.pathname.replace(resolveRouterPath(), '');
    const normalized = path.replace(/^\/+/, '');
    const tabMap: Record<string, string> = {
      '': 'home',
      'quiz': 'quiz',
      'mapper': 'mapper',
      'results': 'results',
    };
    if (normalized.startsWith('combination/')) {
      this._currentTab = 'mapper';
    } else {
      this._currentTab = tabMap[normalized] || 'home';
    }
  }

  connectedCallback() {
    super.connectedCallback();

    window.addEventListener('popstate', () => {
      this._updateActiveTab();
    });
    
    this.addEventListener('navigate-home', () => {
      router.navigate(resolveRouterPath());
    });

    window.addEventListener('beforeinstallprompt' as any, (e: any) => {
      e.preventDefault();
      this._deferredPrompt = e;
      
      const dismissed = sessionStorage.getItem('pwa-prompt-dismissed');
      if (!dismissed) {
        this._showInstallPrompt = true;
      }
    });

    window.addEventListener('appinstalled', () => {
      this._deferredPrompt = null;
      this._showInstallPrompt = false;
    });
  }

  private _dismissInstall() {
    this._showInstallPrompt = false;
    sessionStorage.setItem('pwa-prompt-dismissed', 'true');
  }

  private async _installApp() {
    if (!this._deferredPrompt) return;
    
    this._showInstallPrompt = false;
    this._deferredPrompt.prompt();
    const { outcome } = await this._deferredPrompt.userChoice;
    console.log(`User response to the install prompt: ${outcome}`);
    this._deferredPrompt = null;
  }

  private _handleNavChange(e: CustomEvent) {
    const { tab, path } = e.detail;
    this._currentTab = tab;
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

      ${this._showInstallPrompt
        ? html`
            <div class="install-prompt">
              <div class="ip-header">
                <img class="ip-icon" src="/assets/icons/icon_192.png" alt="CareerPath UG" />
                <div class="ip-title-group">
                  <h3>Install CareerPath UG</h3>
                  <p>Fast, offline-capable guidance app</p>
                </div>
              </div>
              <p class="ip-description">
                Install this app on your device for quick access, offline career mapping, and a full-screen experience.
              </p>
              <div class="ip-actions">
                <button class="ip-btn ip-btn-later" @click=${this._dismissInstall}>
                  Later
                </button>
                <button class="ip-btn ip-btn-install" @click=${this._installApp}>
                  Install
                </button>
              </div>
            </div>
          `
        : ''}

      <!-- Shoelace theme import -->
      <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@shoelace-style/shoelace@2.18.0/dist/themes/light.css" />
    `;
  }
}
