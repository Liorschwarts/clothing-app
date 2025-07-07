import { writable } from 'svelte/store';

export const items = writable([]);
export const loading = writable(false);

export const setItems = (itemsList) => {
	items.set(Array.isArray(itemsList) ? itemsList : []);
};

export const addItem = (newItem) => {
	items.update((currentItems) => [newItem, ...currentItems]);
};

export const updateItem = (updatedItem) => {
	items.update((currentItems) =>
		currentItems.map((item) => (item._id === updatedItem._id ? updatedItem : item))
	);
};

export const removeItem = (itemId) => {
	items.update((currentItems) => currentItems.filter((item) => item._id !== itemId));
};

export const setLoading = (isLoading) => {
	loading.set(isLoading);
};
