import { writable } from 'svelte/store';

export const items = writable([]);
export const loading = writable(false);

export function setItems(itemsList) {
	items.set(Array.isArray(itemsList) ? itemsList : []);
}

export function addItem(newItem) {
	items.update((currentItems) => [newItem, ...currentItems]);
}

export function updateItem(updatedItem) {
	items.update((currentItems) =>
		currentItems.map((item) => (item._id === updatedItem._id ? updatedItem : item))
	);
}

export function removeItem(itemId) {
	items.update((currentItems) => currentItems.filter((item) => item._id !== itemId));
}

export function setLoading(isLoading) {
	loading.set(isLoading);
}
