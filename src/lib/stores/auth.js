import { writable } from 'svelte/store';

export const user = writable(null);
export const userLikes = writable([]);

export function setUser(userData) {
	user.set(userData);
}

export function setUserLikes(likes) {
	userLikes.set(Array.isArray(likes) ? likes : []);
}

export function addLike(itemId) {
	userLikes.update((likes) => (likes.includes(itemId) ? likes : [...likes, itemId]));
}

export function removeLike(itemId) {
	userLikes.update((likes) => likes.filter((id) => id !== itemId));
}

export function logout() {
	user.set(null);
	userLikes.set([]);
}
