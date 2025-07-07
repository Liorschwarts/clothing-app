import { get } from 'svelte/store';
import { user, userLikes, addLike, removeLike } from './auth.js';
import { removeItem } from './items.js';
import { toggleItemLike, deleteItem } from '$lib/utils/api.js';
import { modals } from './modals.js';
import { UI_TEXTS } from '$lib/constants/texts.js';

const createErrorHandler = (onError) => {
	return (error) => {
		const message = error.message || UI_TEXTS.MESSAGES.ITEM_DELETION_FAILED;
		if (onError) {
			onError(message);
		} else {
			alert(message);
		}
	};
};

export const createItemActions = (defaultErrorHandler = null) => {
	const handleError = createErrorHandler(defaultErrorHandler);

	const handleToggleLike = async (itemId) => {
		const currentUser = get(user);
		if (!currentUser) {
			return;
		}

		try {
			const result = await toggleItemLike(itemId);
			if (result.success) {
				result.isLiked ? addLike(itemId) : removeLike(itemId);
			}
		} catch (error) {
			console.error('Failed to toggle like:', error);
			handleError(error);
		}
	};

	const handleDelete = async (item, onSuccess = null, onError = null) => {
		const confirmMessage = `${UI_TEXTS.MESSAGES.DELETE_CONFIRMATION} "${item.name}"?`;
		if (!confirm(confirmMessage)) return;

		try {
			const result = await deleteItem(item._id);
			if (result.success) {
				removeItem(item._id);
				onSuccess?.(item);
			}
		} catch (error) {
			console.error('Failed to delete item:', error);
			const errorHandler = onError || handleError;
			errorHandler(error);
		}
	};

	const handleEdit = (item) => {
		modals.open('editItem', item);
	};

	const handleAddItem = () => {
		modals.open('addItem');
	};

	const closeModal = (modalId) => {
		modals.close(modalId);
	};

	return {
		handleToggleLike,
		handleDelete,
		handleEdit,
		handleAddItem,
		closeModal
	};
};
