import { writable } from 'svelte/store';

export const user = writable(null);
export const userLikes = writable([]);

export const setUser = (userData) => {
	user.set(userData);
};

export const setUserLikes = (likes) => {
	userLikes.set(Array.isArray(likes) ? likes : []);
};

export const addLike = (itemId) => {
	userLikes.update((likes) => (likes.includes(itemId) ? likes : [...likes, itemId]));
};

export const removeLike = (itemId) => {
	userLikes.update((likes) => likes.filter((id) => id !== itemId));
};

export const logout = () => {
	user.set(null);
	userLikes.set([]);
};
