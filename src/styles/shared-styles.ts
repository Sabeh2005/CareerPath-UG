import { css } from 'lit';

export const sharedStyles = css`
  .page {
    padding: 16px;
    padding-bottom: calc(72px + env(safe-area-inset-bottom, 0px) + 16px);
    min-height: 100vh;
    animation: fadeIn 0.3s ease;
  }

  .section-title {
    font-size: 18px;
    font-weight: 700;
    color: var(--deep-blue);
    margin-bottom: 16px;
  }

  .btn {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    padding: 14px 24px;
    border-radius: var(--radius-md);
    font-size: 16px;
    font-weight: 600;
    transition: all 0.2s ease;
    min-height: 52px;
    width: 100%;
    text-align: center;
    font-family: var(--font);
    cursor: pointer;
    border: none;
    outline: none;
  }

  .btn-primary {
    background: linear-gradient(135deg, var(--emerald) 0%, var(--emerald-dark) 100%);
    color: var(--white);
    box-shadow: 0 4px 14px var(--emerald-glow);
  }

  .btn-secondary {
    background: var(--deep-blue);
    color: var(--white);
  }

  .btn-outline {
    background: transparent;
    color: var(--deep-blue);
    border: 2px solid var(--deep-blue);
  }

  .card {
    background: var(--surface);
    border-radius: var(--radius-lg);
    padding: 20px;
    box-shadow: var(--shadow-md);
    border: 1px solid var(--border);
  }

  .chip {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    padding: 6px 14px;
    border-radius: var(--radius-full);
    font-size: 13px;
    font-weight: 500;
    background: var(--gray-100);
    color: var(--gray-700);
    transition: all 0.2s ease;
  }

  .chip-active {
    background: var(--emerald);
    color: var(--white);
  }

  .chip-selected {
    background: var(--deep-blue);
    color: var(--white);
  }

  .progress-bar {
    width: 100%;
    height: 4px;
    background: var(--gray-200);
    border-radius: 2px;
    overflow: hidden;
  }

  .progress-fill {
    height: 100%;
    background: linear-gradient(90deg, var(--emerald), var(--emerald-light));
    border-radius: 2px;
    transition: width 0.4s ease;
  }

  .tag-chip {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    padding: 5px 12px 5px 8px;
    border-radius: 20px;
    font-size: 12px;
    font-weight: 600;
    letter-spacing: 0.3px;
    margin-bottom: 12px;
    width: fit-content;
    border: 1.5px solid transparent;
    backdrop-filter: blur(4px);
    transition: transform 0.15s ease, box-shadow 0.15s ease;
  }

  .tag-chip:active {
    transform: scale(0.96);
  }

  .tag-chip .tag-emoji {
    font-size: 15px;
    line-height: 1;
  }

  .tag-chip .tag-label {
    text-transform: capitalize;
  }

  .tag-brain  { background: rgba(139, 92, 246, 0.12); color: #6D28D9; border-color: rgba(139, 92, 246, 0.25); }
  .tag-chart  { background: rgba(59, 130, 246, 0.12); color: #1D4ED8; border-color: rgba(59, 130, 246, 0.25); }
  .tag-shield { background: rgba(239, 68, 68, 0.11);  color: #B91C1C; border-color: rgba(239, 68, 68, 0.22); }
  .tag-cloud  { background: rgba(96, 165, 250, 0.14); color: #1E40AF; border-color: rgba(96, 165, 250, 0.28); }
  .tag-robot  { background: rgba(107, 114, 128, 0.12); color: #374151; border-color: rgba(107, 114, 128, 0.25); }
  .tag-dna    { background: rgba(236, 72, 153, 0.12); color: #BE185D; border-color: rgba(236, 72, 153, 0.22); }
  .tag-drone  { background: rgba(34, 197, 94, 0.12);  color: #15803D; border-color: rgba(34, 197, 94, 0.22); }
  .tag-rocket { background: rgba(249, 115, 22, 0.12); color: #C2410C; border-color: rgba(249, 115, 22, 0.22); }
  .tag-pill   { background: rgba(168, 85, 247, 0.12); color: #7E22CE; border-color: rgba(168, 85, 247, 0.22); }
  .tag-leaf   { background: rgba(34, 197, 94, 0.12);  color: #166534; border-color: rgba(34, 197, 94, 0.22); }
  .tag-wallet { background: rgba(234, 179, 8, 0.14);  color: #92400E; border-color: rgba(234, 179, 8, 0.28); }
  .tag-calc   { background: rgba(99, 102, 241, 0.12); color: #3730A3; border-color: rgba(99, 102, 241, 0.22); }
  .tag-chain  { background: rgba(20, 184, 166, 0.12); color: #0F766E; border-color: rgba(20, 184, 166, 0.22); }
  .tag-cash   { background: rgba(34, 197, 94, 0.12);  color: #166534; border-color: rgba(34, 197, 94, 0.22); }
  .tag-globe  { background: rgba(59, 130, 246, 0.12); color: #1D4ED8; border-color: rgba(59, 130, 246, 0.25); }
  .tag-megaphone { background: rgba(234, 179, 8, 0.14); color: #92400E; border-color: rgba(234, 179, 8, 0.28); }
  .tag-write  { background: rgba(139, 92, 246, 0.12); color: #6D28D9; border-color: rgba(139, 92, 246, 0.25); }
  .tag-tool   { background: rgba(107, 114, 128, 0.12); color: #374151; border-color: rgba(107, 114, 128, 0.25); }
  .tag-city   { background: rgba(59, 130, 246, 0.12); color: #1D4ED8; border-color: rgba(59, 130, 246, 0.25); }
  .tag-default { background: rgba(100, 116, 139, 0.1); color: #334155; border-color: rgba(100, 116, 139, 0.2); }

  @keyframes fadeIn {
    from { opacity: 0; transform: translateY(8px); }
    to { opacity: 1; transform: translateY(0); }
  }

  @keyframes slideUp {
    from { opacity: 0; transform: translateY(20px); }
    to { opacity: 1; transform: translateY(0); }
  }
`;
