export const CATEGORY_TYPES = {
	SHIRT: 'shirt',
	PANTS: 'pants',
	SHOES: 'shoes',
	DRESS: 'dress',
	COAT: 'coat',
	HAT: 'hat',
	BAG: 'bag',
	GENERAL: 'general'
};

export const CATEGORY_ICONS = {
	[CATEGORY_TYPES.SHIRT]: '👔',
	[CATEGORY_TYPES.PANTS]: '👖',
	[CATEGORY_TYPES.SHOES]: '👞',
	[CATEGORY_TYPES.DRESS]: '👗',
	[CATEGORY_TYPES.COAT]: '🧥',
	[CATEGORY_TYPES.HAT]: '🎩',
	[CATEGORY_TYPES.BAG]: '👜',
	[CATEGORY_TYPES.GENERAL]: '📦'
};

export const CATEGORY_NAMES = {
	[CATEGORY_TYPES.SHIRT]: 'Shirt',
	[CATEGORY_TYPES.PANTS]: 'Pants',
	[CATEGORY_TYPES.SHOES]: 'Shoes',
	[CATEGORY_TYPES.DRESS]: 'Dress',
	[CATEGORY_TYPES.COAT]: 'Coat',
	[CATEGORY_TYPES.HAT]: 'Hat',
	[CATEGORY_TYPES.BAG]: 'Bag',
	[CATEGORY_TYPES.GENERAL]: 'General'
};

export function getCategoryIcon(category) {
	return CATEGORY_ICONS[category] || CATEGORY_ICONS[CATEGORY_TYPES.GENERAL];
}

export function getCategoryName(category) {
	return CATEGORY_NAMES[category] || CATEGORY_NAMES[CATEGORY_TYPES.GENERAL];
}

export const CATEGORIES_LIST = Object.values(CATEGORY_TYPES);
