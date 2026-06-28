import { LitElement, css, html } from 'lit';
import { customElement } from 'lit/decorators.js';
import { sharedStyles } from '../styles/shared-styles';

@customElement('app-about')
export class AppAbout extends LitElement {
  static styles = [
    sharedStyles,
    css`
      .about-page {
        padding: 16px;
        padding-bottom: calc(72px + env(safe-area-inset-bottom, 0px) + 16px);
        min-height: 100vh;
        animation: fadeIn 0.3s ease;
      }
      .section-title {
        font-size: 20px;
        font-weight: 800;
        color: var(--deep-blue);
        margin-bottom: 12px;
        margin-top: 24px;
      }
      .section-desc {
        font-size: 15px;
        color: var(--gray-600);
        line-height: 1.6;
        margin-bottom: 24px;
      }
      .team-grid {
        display: grid;
        grid-template-columns: 1fr;
        gap: 16px;
      }
      .team-card {
        background: var(--surface);
        border-radius: var(--radius-lg);
        padding: 20px;
        box-shadow: var(--shadow-sm);
        border: 1px solid var(--border);
        display: flex;
        flex-direction: column;
      }
      .team-header {
        display: flex;
        align-items: center;
        gap: 16px;
        margin-bottom: 16px;
      }
      .avatar {
        width: 60px;
        height: 60px;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 24px;
        font-weight: 800;
        color: white;
        flex-shrink: 0;
        overflow: hidden;
      }
      .avatar.blue {
        background: linear-gradient(135deg, #3B82F6, #1D4ED8);
      }
      .avatar.pink {
        background: linear-gradient(135deg, #EC4899, #BE185D);
      }
      .avatar.green {
        background: linear-gradient(135deg, #10B981, #059669);
      }
      .avatar.default {
        background: linear-gradient(135deg, #9CA3AF, #4B5563);
      }
      .team-info h3 {
        font-size: 18px;
        font-weight: 700;
        color: var(--deep-blue);
        margin: 0 0 4px 0;
      }
      .team-info p {
        font-size: 13px;
        color: var(--emerald);
        font-weight: 600;
        margin: 0;
      }
      .role-details {
        font-size: 14px;
        color: var(--gray-600);
        line-height: 1.5;
      }
      .role-details ul {
        margin: 8px 0 0 0;
        padding-left: 20px;
      }
      .role-details li {
        margin-bottom: 4px;
      }
      :host-context(html[data-theme="dark"]) .team-card {
        background: var(--surface-secondary, #242B3D);
        border-color: var(--border, #2E3548);
      }
      :host-context(html[data-theme="dark"]) .section-title,
      :host-context(html[data-theme="dark"]) .team-info h3 {
        color: var(--white);
      }
      :host-context(html[data-theme="dark"]) .section-desc,
      :host-context(html[data-theme="dark"]) .role-details {
        color: var(--gray-400);
      }
      .opensource-card {
        margin-top: 32px;
        background: linear-gradient(135deg, #0d1117 0%, #161b22 100%);
        border-radius: var(--radius-lg);
        padding: 28px 24px;
        border: 1px solid #30363d;
        display: flex;
        flex-direction: column;
        align-items: center;
        text-align: center;
        gap: 16px;
        box-shadow: 0 4px 24px rgba(0,0,0,0.18);
      }
      .opensource-icon {
        width: 56px;
        height: 56px;
        background: #fff;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        box-shadow: 0 2px 12px rgba(0,0,0,0.18);
        flex-shrink: 0;
      }
      .opensource-icon svg {
        width: 34px;
        height: 34px;
        fill: #0d1117;
      }
      .opensource-title {
        font-size: 18px;
        font-weight: 800;
        color: #f0f6fc;
        margin: 0;
        letter-spacing: 0.01em;
      }
      .opensource-desc {
        font-size: 14px;
        color: #8b949e;
        line-height: 1.65;
        margin: 0;
      }
      .opensource-link {
        display: inline-flex;
        align-items: center;
        gap: 8px;
        background: #238636;
        color: #fff;
        font-size: 14px;
        font-weight: 700;
        padding: 10px 22px;
        border-radius: 8px;
        text-decoration: none;
        transition: background 0.2s ease, transform 0.15s ease, box-shadow 0.2s ease;
        box-shadow: 0 2px 8px rgba(35,134,54,0.30);
        letter-spacing: 0.02em;
      }
      .opensource-link:hover {
        background: #2ea043;
        transform: translateY(-2px);
        box-shadow: 0 6px 18px rgba(35,134,54,0.40);
      }
      .opensource-link svg {
        width: 18px;
        height: 18px;
        fill: #fff;
      }
      .opensource-badge {
        display: inline-flex;
        align-items: center;
        gap: 6px;
        background: rgba(255,255,255,0.08);
        color: #8b949e;
        font-size: 12px;
        font-weight: 600;
        padding: 4px 12px;
        border-radius: 20px;
        border: 1px solid #30363d;
        letter-spacing: 0.04em;
        text-transform: uppercase;
      }
      .opensource-badge svg {
        width: 12px;
        height: 12px;
        fill: #f1e05a;
      }
    `
  ];

  connectedCallback() {
    super.connectedCallback();
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
  }

  render() {
    return html`
      <app-header pageTitle="About"></app-header>
      <div class="about-page">
        <h2 class="section-title">About CareerPath UG</h2>
        <p class="section-desc">
          CareerPath UG is a Progressive Web App designed to help Ugandan students map their O-Level and A-Level subjects to modern, high-earning careers. Our mission is to provide accurate, data-driven career guidance tailored for the East African job market, ensuring students make informed decisions about their educational pathways.
        </p>

        <h2 class="section-title">Meet the Team</h2>
        <div class="team-grid">
          
          <div class="team-card">
            <div class="team-header">
              <div class="avatar" style="background: transparent;">
                <img src="/CareerPath UG About page data/Sabeh profile picture.png" alt="Sabeh Ahmed" style="width: 100%; height: 100%; object-fit: cover; object-position: center top;" />
              </div>
              <div class="team-info">
                <h3>Sabeh Ahmed</h3>
                <p>Lead Developer & System Architect</p>
              </div>
            </div>
            <div class="role-details">
              <strong>Core Role:</strong> Full-stack software development and deployment.
              <ul>
                <li>Wrote the core codebase and configured the Progressive Web App (PWA) service workers for offline accessibility.</li>
                <li>Managed version control and code updates via the GitHub Repository.</li>
                <li>Hosted and deployed the live web application on Vercel.</li>
                <li>Translated UI/UX wireframes into functional, interactive front-end web components.</li>
              </ul>
            </div>
          </div>

          <div class="team-card">
            <div class="team-header">
              <div class="avatar pink">M</div>
              <div class="team-info">
                <h3>Mufeeza Rafee</h3>
                <p>Lead UI/UX Designer</p>
              </div>
            </div>
            <div class="role-details">
              <strong>Core Role:</strong> User interface design and visual identity.
              <ul>
                <li>Designed the interface layouts, typography, and color schemes tailored for Ugandan students.</li>
                <li>Created mobile-first wireframes to ensure seamless navigation across entry-level smartphones.</li>
                <li>Designed the visual assets, branding elements, and application icons required for the PWA manifest.</li>
              </ul>
            </div>
          </div>

          <div class="team-card">
            <div class="team-header">
              <div class="avatar" style="background: transparent;">
                <img src="/CareerPath UG About page data/Jiya profile picture.png" alt="Jiya Patel" style="width: 100%; height: 100%; object-fit: cover; object-position: center top;" />
              </div>
              <div class="team-info">
                <h3>Jiya Patel</h3>
                <p>Educational Content Researcher</p>
              </div>
            </div>
            <div class="role-details">
              <strong>Core Role:</strong> Curriculum mapping and academic data sourcing.
              <ul>
                <li>Sourced and verified NCDC A-Level subject combinations (HEG, BCM, PCM, etc.).</li>
                <li>Mapped these combinations directly to matching undergraduate courses in Ugandan universities.</li>
                <li>Compiled standard university admission requirements and cut-off weights for entry-level guidance.</li>
              </ul>
            </div>
          </div>

          <div class="team-card">
            <div class="team-header">
              <div class="avatar green">Z</div>
              <div class="team-info">
                <h3>Aamir Zeenat</h3>
                <p>Labor Market Analyst</p>
              </div>
            </div>
            <div class="role-details">
              <strong>Core Role:</strong> Career pathway mapping and industry research.
              <ul>
                <li>Researched the Ugandan job market to align university courses with actual career paths and job titles.</li>
                <li>Curated essential skill sets and job descriptions for each industry profile in the app.</li>
                <li>Audited the final data to ensure career recommendations reflect current economic demands in East Africa.</li>
              </ul>
            </div>
          </div>

          <div class="team-card">
            <div class="team-header">
              <div class="avatar" style="background: transparent;">
                <img src="/CareerPath UG About page data/Promise profile picture.png" alt="Muwanguzi Promise Ashbel" style="width: 100%; height: 100%; object-fit: cover; object-position: center top;" />
              </div>
              <div class="team-info">
                <h3>Muwanguzi Promise Ashbel</h3>
                <p>Quality Assurance Analyst & Product Manager</p>
              </div>
            </div>
            <div class="role-details">
              <strong>Core Role:</strong> Project timelines, user testing, and data verification.
              <ul>
                <li>Set internal project milestones to coordinate data collection with the coding schedule.</li>
                <li>Conducted cross-browser and cross-device testing to identify bugs, broken links, or scaling issues on Vercel.</li>
                <li>Led user-acceptance testing (UAT) by gathering initial feedback on app usability from peers and teachers.</li>
              </ul>
            </div>
          </div>

        </div>

        <div class="opensource-card">
          <div class="opensource-icon">
            <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0 1 12 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/>
            </svg>
          </div>
          <p class="opensource-title">Open Source on GitHub</p>
          <p class="opensource-desc">
            CareerPath UG is proudly open source. The full source code is freely available for anyone to explore, learn from, contribute to, or build upon. We believe in transparency and community-driven development.
          </p>
          <span class="opensource-badge">
            <svg viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg"><path d="M8 .25a.75.75 0 0 1 .673.418l1.882 3.815 4.21.612a.75.75 0 0 1 .416 1.279l-3.046 2.97.719 4.192a.751.751 0 0 1-1.088.791L8 12.347l-3.766 1.98a.75.75 0 0 1-1.088-.79l.72-4.194L.872 6.374a.75.75 0 0 1 .416-1.28l4.21-.611L7.327.668A.75.75 0 0 1 8 .25Z"/></svg>
            Open Source
          </span>
          <a
            class="opensource-link"
            href="https://github.com/Sabeh2005/CareerPath-UG"
            target="_blank"
            rel="noopener noreferrer"
          >
            <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0 1 12 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/>
            </svg>
            View on GitHub
          </a>
        </div>

      </div>
    `;
  }
}
