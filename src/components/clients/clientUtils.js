export const LEVEL_CONFIG = {
  Bronze:  { color: "#cd7f32", bg: "rgba(205,127,50,0.1)",  border: "rgba(205,127,50,0.25)",  emoji: "🥉" },
  Silver:  { color: "#94a3b8", bg: "rgba(148,163,184,0.1)", border: "rgba(148,163,184,0.25)", emoji: "🥈" },
  Gold:    { color: "#fbbf24", bg: "rgba(251,191,36,0.1)",  border: "rgba(251,191,36,0.25)",  emoji: "🥇" },
  Diamond: { color: "#22d3ee", bg: "rgba(34,211,238,0.1)",  border: "rgba(34,211,238,0.25)",  emoji: "💎" },
};

export const LEVEL_THRESHOLDS = { Bronze: 0, Silver: 100, Gold: 250, Diamond: 500 };

export const getLevel = (points) => {
  if (points >= 500) return "Diamond";
  if (points >= 250) return "Gold";
  if (points >= 100) return "Silver";
  return "Bronze";
};

export const getNextLevel = (level) => {
  const order = ["Bronze", "Silver", "Gold", "Diamond"];
  const idx = order.indexOf(level);
  return order[idx + 1] || null;
};

export const getLevelProgress = (points) => {
  const level = getLevel(points);
  const next = getNextLevel(level);
  if (!next) return 100;
  const current = LEVEL_THRESHOLDS[level];
  const target = LEVEL_THRESHOLDS[next];
  return Math.round(((points - current) / (target - current)) * 100);
};