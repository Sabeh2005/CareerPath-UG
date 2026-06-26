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
              <div class="avatar blue">S</div>
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
              <div class="avatar" style="background: transparent;">
                <img src="/CareerPath UG About page data/Zeenat profile picture.png" alt="Aamir Zeenat" style="width: 100%; height: 100%; object-fit: cover; object-position: center top;" />
              </div>
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
      </div>
    `;
  }
}
