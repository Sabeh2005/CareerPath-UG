const TAG_EMOJI: Record<string, string> = {
  brain: '🧠', chart: '📊', shield: '🛡️', cloud: '☁️',
  robot: '🤖', dna: '🧬', drone: '🚁', rocket: '🚀',
  pill: '💊', leaf: '🌿', wallet: '💳', calc: '🧮',
  chain: '🔗', cash: '💵', globe: '🌍', megaphone: '📣',
  write: '✍️', tool: '🔧', city: '🏙️', gavel: '⚖️',
  folder: '📁', satellite: '🛰️', thermometer: '🌡️',
  museum: '🏛️', wifi: '📡', blueprint: '📐', chip: '💻',
  palette: '🎨', vr: '🥽', film: '🎬', gamepad: '🎮',
  droplet: '💧', camera: '📷', flask: '🧪', check: '✅',
  truck: '🚛', heart: '❤️', tree: '🌳', water: '💧',
  sun: '☀️', phone: '📱', handshake: '🤝', search: '🔍',
  building: '🏢', recycle: '♻️', map: '🗺️', light: '💡',
  mic: '🎤', ai: '🤖', code: '💻', database: '🗄️',
  clipboard: '📋', bolt: '⚡', plus: '➕', scan: '📷',
  video: '🎥',
};

const TAG_EMOJI_KEYS = new Set(Object.keys(TAG_EMOJI));

export function getTagEmoji(icon: string): string {
  return TAG_EMOJI[icon] ?? '🏷️';
}

export function getTagClass(icon: string): string {
  return TAG_EMOJI_KEYS.has(icon) ? icon : 'default';
}

const USD_TO_UGX = 3700;

const THEME_KEY = 'careerpath_theme';

export type Theme = 'light' | 'dark';

export function getTheme(): Theme {
  try {
    const saved = localStorage.getItem(THEME_KEY);
    if (saved === 'light' || saved === 'dark') return saved;
  } catch { /* ignore */ }
  return 'light';
}

export function setTheme(theme: Theme): void {
  try {
    localStorage.setItem(THEME_KEY, theme);
  } catch { /* ignore */ }
  document.documentElement.setAttribute('data-theme', theme);
}

export function toggleTheme(): Theme {
  const next = getTheme() === 'dark' ? 'light' : 'dark';
  setTheme(next);
  return next;
}

function parseSalaryRange(usd: string): { min: number; max: number } | null {
  const match = usd.match(/\$?(\d+(?:\.\d+)?)([KMB]?)\s*-\s*\$?(\d+(?:\.\d+)?)([KMB]?)/);
  if (!match) return null;
  let min = parseFloat(match[1]);
  let max = parseFloat(match[3]);
  const minSuffix = match[2];
  const maxSuffix = match[4];
  if (minSuffix === 'K') min *= 1000;
  if (minSuffix === 'M') min *= 1000000;
  if (minSuffix === 'B') min *= 1000000000;
  if (maxSuffix === 'K') max *= 1000;
  if (maxSuffix === 'M') max *= 1000000;
  if (maxSuffix === 'B') max *= 1000000000;
  return { min, max };
}

function formatUGX(amount: number): string {
  if (amount >= 1_000_000) return `${(amount / 1_000_000).toFixed(0)}M`;
  if (amount >= 1_000) return `${(amount / 1_000).toFixed(0)}K`;
  return amount.toString();
}

export function formatSalary(usd: string): string {
  const parsed = parseSalaryRange(usd);
  if (!parsed) return usd;
  const ugxMin = parsed.min * USD_TO_UGX;
  const ugxMax = parsed.max * USD_TO_UGX;
  return `${usd} (UGX ${formatUGX(ugxMin)} - ${formatUGX(ugxMax)})`;
}
