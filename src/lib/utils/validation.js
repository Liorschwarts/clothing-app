import { VALIDATION_RULES } from '$lib/constants/forms.js';

const VALIDATION_MESSAGES = {
	NAME_TOO_SHORT: `Name must contain at least ${VALIDATION_RULES.NAME.MIN_LENGTH} characters`,
	NAME_TOO_LONG: `Name cannot be more than ${VALIDATION_RULES.NAME.MAX_LENGTH} characters`,
	DESCRIPTION_TOO_SHORT: `Description must contain at least ${VALIDATION_RULES.DESCRIPTION.MIN_LENGTH} characters`,
	DESCRIPTION_TOO_LONG: `Description cannot be more than ${VALIDATION_RULES.DESCRIPTION.MAX_LENGTH} characters`,
	INVALID_PRICE: 'Price must be a positive number',
	PRICE_TOO_HIGH: `Price cannot be more than ${VALIDATION_RULES.PRICE.MAX} ₪`,
	INVALID_IMAGE_URL: 'Image URL is not valid',
	INVALID_EMAIL: 'Email address is not valid',
	PASSWORD_TOO_SHORT: `Password must contain at least ${VALIDATION_RULES.PASSWORD.MIN_LENGTH} characters`,
	NAME_REQUIRED: 'Name must contain at least 2 characters'
};

export const validateItemData = (data) => {
	const errors = [];

	if (!data.name || data.name.trim().length < VALIDATION_RULES.NAME.MIN_LENGTH) {
		errors.push(VALIDATION_MESSAGES.NAME_TOO_SHORT);
	}

	if (data.name && data.name.length > VALIDATION_RULES.NAME.MAX_LENGTH) {
		errors.push(VALIDATION_MESSAGES.NAME_TOO_LONG);
	}

	if (
		!data.description ||
		data.description.trim().length < VALIDATION_RULES.DESCRIPTION.MIN_LENGTH
	) {
		errors.push(VALIDATION_MESSAGES.DESCRIPTION_TOO_SHORT);
	}

	if (data.description && data.description.length > VALIDATION_RULES.DESCRIPTION.MAX_LENGTH) {
		errors.push(VALIDATION_MESSAGES.DESCRIPTION_TOO_LONG);
	}

	const price = Number(data.price);
	if (!price || price <= 0) {
		errors.push(VALIDATION_MESSAGES.INVALID_PRICE);
	}

	if (price > VALIDATION_RULES.PRICE.MAX) {
		errors.push(VALIDATION_MESSAGES.PRICE_TOO_HIGH);
	}

	if (data.image && data.image.trim()) {
		try {
			new URL(data.image);
		} catch {
			errors.push(VALIDATION_MESSAGES.INVALID_IMAGE_URL);
		}
	}

	return {
		isValid: errors.length === 0,
		errors
	};
};

export const validateUserData = (data, isLogin = false) => {
	const errors = [];

	const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
	if (!emailRegex.test(data.email)) {
		errors.push(VALIDATION_MESSAGES.INVALID_EMAIL);
	}

	if (data.password.length < VALIDATION_RULES.PASSWORD.MIN_LENGTH) {
		errors.push(VALIDATION_MESSAGES.PASSWORD_TOO_SHORT);
	}

	if (!isLogin) {
		if (!data.name || data.name.trim().length < VALIDATION_RULES.NAME.MIN_LENGTH) {
			errors.push(VALIDATION_MESSAGES.NAME_REQUIRED);
		}
	}

	return {
		isValid: errors.length === 0,
		errors
	};
};
