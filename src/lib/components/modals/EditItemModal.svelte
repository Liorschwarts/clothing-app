<script>
	import { updateItem as updateItemInStore } from '$lib/stores/items.js';
	import { modals } from '$lib/stores/modals.js';
	import { updateItem } from '$lib/utils/api.js';
	import { UI_TEXTS } from '$lib/constants/texts.js';
	import { EDIT_ITEM_FIELDS } from '$lib/constants/forms.js';
	import ItemModal from './ItemModal.svelte';

	let formData = { description: '', price: '' };
	let loading = false;
	let error = '';

	$: isOpen = $modals.editItem?.isOpen || false;
	$: item = $modals.editItem?.data || null;
	$: title = item ? `${UI_TEXTS.ITEMS.EDIT_ITEM}: ${item.name}` : '';

	$: if (item && isOpen) {
		formData = { description: item.description, price: item.price.toString() };
		error = '';
	}

	const handleSubmit = async () => {
		if (!item) return;

		error = '';
		loading = true;

		try {
			await updateItem(item._id, {
				description: formData.description.trim(),
				price: Number(formData.price)
			});

			const updatedItem = {
				...item,
				description: formData.description.trim(),
				price: Number(formData.price)
			};
			updateItemInStore(updatedItem);

			handleClose();
		} catch (err) {
			error = err.message;
		} finally {
			loading = false;
		}
	};

	const handleClose = () => {
		modals.close('editItem');
	};
</script>

<ItemModal
	{isOpen}
	{title}
	fields={EDIT_ITEM_FIELDS}
	bind:formData
	{loading}
	{error}
	submitText={UI_TEXTS.ITEMS.UPDATE_ITEM_BUTTON}
	loadingText={UI_TEXTS.ITEMS.UPDATING}
	submitButtonColor="green"
	onSubmit={handleSubmit}
	onClose={handleClose}
/>
