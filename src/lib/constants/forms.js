import { UI_TEXTS } from './texts.js';
import { CATEGORY_TYPES } from './categories.js';

export const FIELD_TYPES = {
	TEXT: 'text',
	EMAIL: 'email',
	PASSWORD: 'password',
	TEXTAREA: 'textarea',
	NUMBER: 'number',
	URL: 'url',
	SELECT: 'select'
};

export const AUTH_FIELDS = {
	name: {
		id: 'name',
		type: FIELD_TYPES.TEXT,
		label: UI_TEXTS.AUTH.FULL_NAME,
		placeholder: UI_TEXTS.AUTH.NAME_PLACEHOLDER,
		required: true
	},
	email: {
		id: 'email',
		type: FIELD_TYPES.EMAIL,
		label: UI_TEXTS.AUTH.EMAIL,
		placeholder: UI_TEXTS.AUTH.EMAIL_PLACEHOLDER,
		required: true
	},
	password: {
		id: 'password',
		type: FIELD_TYPES.PASSWORD,
		label: UI_TEXTS.AUTH.PASSWORD,
		placeholder: UI_TEXTS.AUTH.PASSWORD_PLACEHOLDER,
		required: true,
		minlength: 6
	}
};

export function getAuthFields(mode) {
	const baseFields = [AUTH_FIELDS.email, AUTH_FIELDS.password];

	if (mode === 'register') {
		return [AUTH_FIELDS.name, ...baseFields];
	}

	return baseFields;
}

export const ITEM_FIELDS = {
	name: {
		id: 'name',
		type: FIELD_TYPES.TEXT,
		label: UI_TEXTS.ITEMS.ITEM_NAME,
		placeholder: UI_TEXTS.ITEMS.ITEM_NAME_PLACEHOLDER,
		required: true
	},
	description: {
		id: 'description',
		type: FIELD_TYPES.TEXTAREA,
		label: UI_TEXTS.ITEMS.DESCRIPTION,
		placeholder: UI_TEXTS.ITEMS.DESCRIPTION_PLACEHOLDER,
		required: true,
		rows: 3
	},
	price: {
		id: 'price',
		type: FIELD_TYPES.NUMBER,
		label: UI_TEXTS.ITEMS.PRICE,
		placeholder: UI_TEXTS.ITEMS.PRICE_PLACEHOLDER,
		required: true,
		min: 1
	},
	category: {
		id: 'category',
		type: FIELD_TYPES.SELECT,
		label: UI_TEXTS.ITEMS.CATEGORY,
		required: true
	},
	image: {
		id: 'image',
		type: FIELD_TYPES.URL,
		label: UI_TEXTS.ITEMS.IMAGE_URL,
		placeholder: UI_TEXTS.ITEMS.IMAGE_PLACEHOLDER,
		required: false
	}
};

export const EDIT_ITEM_FIELDS = [ITEM_FIELDS.description, ITEM_FIELDS.price];

export const ITEM_FORM_FIELDS = [
	ITEM_FIELDS.name,
	ITEM_FIELDS.description,
	ITEM_FIELDS.price,
	ITEM_FIELDS.category,
	ITEM_FIELDS.image
];

export const VALIDATION_RULES = {
	NAME: {
		MIN_LENGTH: 2,
		MAX_LENGTH: 50
	},
	DESCRIPTION: {
		MIN_LENGTH: 10,
		MAX_LENGTH: 500
	},
	PRICE: {
		MIN: 1,
		MAX: 10000
	},
	PASSWORD: {
		MIN_LENGTH: 6
	}
};
