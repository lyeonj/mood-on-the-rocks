import blueMargarita from '../assets/images/cocktail/blue-margarita.png';
import pinkMargarita from '../assets/images/cocktail/pink-margarita.png';
import yellowMargarita from '../assets/images/cocktail/yellow-margarita.png';
import greenMargarita from '../assets/images/cocktail/green-margarita.png';
import purpleMargarita from '../assets/images/cocktail/purple-margarita.png';

const PRESET_COLORS = {
  blue: '#9CF9F9',
  pink: '#FFA7E9',
  yellow: '#FCF686',
  green: '#ADF27F',
  purple: '#DF9AFF',
};

const COCKTAILS = {
  blue: { image: blueMargarita, name: '블루 마가리타' },
  pink: { image: pinkMargarita, name: '핑크 마가리타' },
  yellow: { image: yellowMargarita, name: '옐로우 마가리타' },
  green: { image: greenMargarita, name: '그린 마가리타' },
  purple: { image: purpleMargarita, name: '퍼플 마가리타' },
};

const BASE_LABELS = {
  gin: '진',
  vodka: '보드카',
  rum: '럼',
  tequila: '데킬라',
  whisky: '위스키',
  recommend: '추천',
};

const hexToRgb = (hex) => {
  const normalized = hex.replace('#', '');
  return [
    parseInt(normalized.slice(0, 2), 16),
    parseInt(normalized.slice(2, 4), 16),
    parseInt(normalized.slice(4, 6), 16),
  ];
};

const colorDistance = (hex1, hex2) => {
  const [r1, g1, b1] = hexToRgb(hex1);
  const [r2, g2, b2] = hexToRgb(hex2);
  return (r1 - r2) ** 2 + (g1 - g2) ** 2 + (b1 - b2) ** 2;
};

const resolveColorId = (selectedColorIds, customColors) => {
  if (!selectedColorIds.length) return 'blue';

  const firstId = selectedColorIds[0];
  if (PRESET_COLORS[firstId]) return firstId;

  const custom = customColors.find((color) => color.id === firstId);
  if (!custom) return 'blue';

  return Object.entries(PRESET_COLORS).reduce(
    (closest, [id, value]) => {
      const distance = colorDistance(custom.value, value);
      return distance < closest.distance ? { id, distance } : closest;
    },
    { id: 'blue', distance: Infinity }
  ).id;
};

export const getCocktailByColor = (selectedColorIds, customColors) => {
  const colorId = resolveColorId(selectedColorIds, customColors);
  return COCKTAILS[colorId];
};

const BASE_POOL = ['gin', 'vodka', 'rum', 'tequila', 'whisky'];

export const resolveRecommendations = (selectedBase, sparkling) => ({
  selectedBase:
    selectedBase === 'recommend'
      ? BASE_POOL[Math.floor(Math.random() * BASE_POOL.length)]
      : selectedBase,
  sparkling: sparkling === null ? Math.random() < 0.5 : sparkling,
});

export const getBaseLabel = (baseId) => BASE_LABELS[baseId] ?? BASE_LABELS.gin;

export const getSparklingLabel = (sparkling) => (sparkling ? 'ON' : 'OFF');
