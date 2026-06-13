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

  @keyframes fadeIn {
    from { opacity: 0; transform: translateY(8px); }
    to { opacity: 1; transform: translateY(0); }
  }

  @keyframes slideUp {
    from { opacity: 0; transform: translateY(20px); }
    to { opacity: 1; transform: translateY(0); }
  }
`;
