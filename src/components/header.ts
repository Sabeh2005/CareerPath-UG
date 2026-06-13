import { LitElement, css, html } from 'lit';
import { property, customElement } from 'lit/decorators.js';

@customElement('app-header')
export class AppHeader extends LitElement {
  @property({ type: String }) title = 'CareerPath UG';

  @property({ type: Boolean }) enableBack = false;

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
  `;

  render() {
    return html`
      <header>
        <div class="left">
          ${this.enableBack
            ? html`<button class="back-btn" @click=${this._goBack}>&larr;</button>`
            : html`<div class="logo">CP</div>`}
          <h1>${this.title}</h1>
        </div>
      </header>
    `;
  }

  private _goBack() {
    history.back();
  }
}
