export const CROPS = [
  { id: 'maize',   name: 'Maize',   emoji: '🌽', baseWater: 0.55, optimalTemp: [18, 32], optimalHumidity: [50, 70] },
  { id: 'rice',    name: 'Rice',    emoji: '🌾', baseWater: 0.85, optimalTemp: [20, 35], optimalHumidity: [60, 85] },
  { id: 'tomato',  name: 'Tomato',  emoji: '🍅', baseWater: 0.6,  optimalTemp: [18, 28], optimalHumidity: [55, 75] },
  { id: 'cassava', name: 'Cassava', emoji: '🥔', baseWater: 0.35, optimalTemp: [22, 32], optimalHumidity: [45, 70] },
];

export const getCrop = (id) => CROPS.find((c) => c.id === id);