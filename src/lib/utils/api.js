import { getLikeRoute, getItemApiRoute, ROUTES } from '$lib/constants/routes.js';
import { API_MESSAGES } from '$lib/constants/api.js';

const apiCall = async (url, options = {}) => {
	const response = await fetch(url, {
		headers: { 'Content-Type': 'application/json' },
		...options
	});

	if (!response.ok) {
		const error = await response.json();
		throw new Error(error.message || 'API call failed');
	}

	const result = await response.json();
	return result.data || result;
};

export const loginUser = (email, password) =>
	apiCall(ROUTES.API.AUTH.LOGIN, {
		method: 'POST',
		body: JSON.stringify({ email, password })
	});

export const registerUser = (email, password, name) =>
	apiCall(ROUTES.API.AUTH.REGISTER, {
		method: 'POST',
		body: JSON.stringify({ email, password, name })
	});

export const logoutUser = () => fetch(ROUTES.API.AUTH.LOGOUT, { method: 'POST' });

export const fetchItems = () => apiCall(ROUTES.API.ITEMS);

export const createItem = async (itemData) => {
	const result = await apiCall(ROUTES.API.ITEMS, {
		method: 'POST',
		body: JSON.stringify(itemData)
	});
	return { success: true, item: result.item };
};

export const toggleItemLike = async (itemId) => {
	const result = await apiCall(getLikeRoute(itemId), { method: 'POST' });
	return { success: true, isLiked: result.isLiked };
};

export const updateItem = async (itemId, updateData) => {
	await apiCall(getItemApiRoute(itemId), {
		method: 'PUT',
		body: JSON.stringify(updateData)
	});
	return { success: true };
};

export const deleteItem = async (itemId) => {
	await apiCall(getItemApiRoute(itemId), { method: 'DELETE' });
	return { success: true };
};
