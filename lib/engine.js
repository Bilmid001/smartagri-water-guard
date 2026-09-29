import { getCrop } from './crops';

/**
 * Rule-based irrigation decision engine.
 * Returns { decision, level, score, explanation[], reasons[] }
 */
export function analyzeIrrigation({ crop, temperature, humidity, rainProbability }) {
  const cropMeta = getCrop(crop);
  if (!cropMeta) throw new Error('Unknown crop');

  const reasons = [];
  let score = cropMeta.baseWater; // 0..1 baseline water need

  // Temperature rules
  if (temperature > 35) {
    score += 0.35;
    reasons.push({ type: 'temp', text: `Extreme heat detected (${temperature}°C) — water need significantly increased.` });
  } else if (temperature > 30) {
    score += 0.2;
    reasons.push({ type: 'temp', text: `High temperature detected (${temperature}°C) — water need increased.` });
  } else if (temperature < 15) {
    score -= 0.15;
    reasons.push({ type: 'temp', text: `Low temperature (${temperature}°C) — evaporation reduced, water need lowered.` });
  } else {
    reasons.push({ type: 'temp', text: `Temperature is within optimal range (${temperature}°C).` });
  }

  // Humidity rules
  if (humidity < 30) {
    score += 0.25;
    reasons.push({ type: 'humidity', text: `Very low humidity (${humidity}%) — soil dries quickly.` });
  } else if (humidity < 40) {
    score += 0.15;
    reasons.push({ type: 'humidity', text: `Low humidity (${humidity}%) — increased water need.` });
  } else if (humidity > 75) {
    score -= 0.1;
    reasons.push({ type: 'humidity', text: `High humidity (${humidity}%) — reduced evaporation.` });
  } else {
    reasons.push({ type: 'humidity', text: `Humidity is at a comfortable level (${humidity}%).` });
  }

  // Rain probability rules
  let rainOverride = false;
  if (rainProbability >= 70) {
    rainOverride = true;
    reasons.push({ type: 'rain', text: `High rain probability (${rainProbability}%) — irrigation not recommended.` });
  } else if (rainProbability >= 60) {
    score -= 0.3;
    reasons.push({ type: 'rain', text: `Elevated rain probability (${rainProbability}%) — reduce irrigation.` });
  } else if (rainProbability >= 40) {
    score -= 0.15;
    reasons.push({ type: 'rain', text: `Moderate rain probability (${rainProbability}%) — slight reduction advised.` });
  } else {
    reasons.push({ type: 'rain', text: `Low rain probability (${rainProbability}%) — no natural water expected.` });
  }

  // Clamp score
  score = Math.max(0, Math.min(1, score));

  // Decide
  let decision, level;
  if (rainOverride || score < 0.35) {
    decision = 'DO NOT WATER';
    level = 'LOW';
  } else if (score < 0.6) {
    decision = 'WATER';
    level = 'LOW';
  } else if (score < 0.8) {
    decision = 'WATER';
    level = 'MEDIUM';
  } else {
    decision = 'WATER';
    level = 'HIGH';
  }

  // Build explanation
  const explanation = buildExplanation({ cropMeta, decision, level, temperature, humidity, rainProbability, score });

  return { decision, level, score: Math.round(score * 100), reasons, explanation };
}

function buildExplanation({ cropMeta, decision, level, temperature, humidity, rainProbability, score }) {
  if (decision === 'DO NOT WATER') {
    return `Rain probability of ${rainProbability}% or low computed need (${Math.round(score*100)}%) indicates natural water supply is sufficient for ${cropMeta.name}.`;
  }
  if (level === 'HIGH') {
    return `Critical water need detected for ${cropMeta.name}. ${temperature>30?'High temperature':'Conditions'} combined with ${humidity<40?'low humidity':'dry conditions'} require immediate, deep irrigation.`;
  }
  if (level === 'MEDIUM') {
    return `Moderate irrigation recommended for ${cropMeta.name} at ${temperature}°C and ${humidity}% humidity. Apply standard irrigation cycle.`;
  }
  return `Light irrigation suggested for ${cropMeta.name}. Conditions are near-optimal; maintain regular watering.`;
}

/**
 * Generate a 7-day moisture trend for charts (projection).
 */
export function projectTrend({ crop, temperature, humidity, rainProbability }) {
  const base = analyzeIrrigation({ crop, temperature, humidity, rainProbability }).score;
  const days = ['Mon','Tue','Wed','Thu','Fri','Sat','Sun'];
  return days.map((d, i) => {
    const noise = Math.sin(i * 1.2) * 8 + (i * 2);
    const moisture = Math.max(5, Math.min(95, 100 - base + noise));
    const need = Math.max(5, Math.min(95, base + Math.cos(i) * 6));
    return { day: d, moisture: Math.round(moisture), need: Math.round(need) };
  });
}