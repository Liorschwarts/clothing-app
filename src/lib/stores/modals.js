import { writable } from 'svelte/store';

function createModalStore() {
	const { subscribe, update } = writable({});

	return {
		subscribe,

		open: (modalId, data = null) =>
			update((modals) => ({
				...modals,
				[modalId]: { isOpen: true, data }
			})),

		close: (modalId) =>
			update((modals) => ({
				...modals,
				[modalId]: { isOpen: false, data: null }
			}))
	};
}

export const modals = createModalStore();
