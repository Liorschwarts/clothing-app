<script>
  import { createItem } from '$lib/utils/api.js';
  import { addItem } from '$lib/stores/items.js';
  import { modals } from '$lib/stores/modals.js';
  import { ITEM_FORM_FIELDS } from '$lib/constants/forms.js';
  import { CATEGORY_TYPES } from '$lib/constants/categories.js';
  import { UI_TEXTS } from '$lib/constants/texts.js';
  import ItemModal from './ItemModal.svelte';
  
  const INITIAL_FORM_DATA = { 
    name: '', 
    description: '', 
    price: '', 
    image: '', 
    category: CATEGORY_TYPES.GENERAL 
  };
  
  let formData = { ...INITIAL_FORM_DATA };
  let loading = false;
  let error = '';
  
  $: isOpen = $modals.addItem?.isOpen || false;
  
   const handleSubmit = async () => {
    error = '';
    loading = true;
    
    try {
      if (!formData.name.trim() || !formData.description.trim() || !formData.price) {
        throw new Error(UI_TEXTS.VALIDATION.FILL_REQUIRED_FIELDS);
      }
      
      const result = await createItem({ ...formData, price: Number(formData.price) });
      if (result.success) {
        addItem(result.item);
        handleClose();
      }
    } catch (err) {
      error = err.message;
    } finally {
      loading = false;
    }
  }
  
  const handleClose = () => {
    formData = { ...INITIAL_FORM_DATA };
    error = '';
    modals.close('addItem');
  }
</script>

<ItemModal
  {isOpen}
  title={UI_TEXTS.ITEMS.ADD_NEW_ITEM}
  fields={ITEM_FORM_FIELDS}
  bind:formData
  {loading}
  {error}
  submitText={UI_TEXTS.ITEMS.ADD_ITEM_BUTTON}
  loadingText={UI_TEXTS.ITEMS.ADDING}
  submitButtonColor="blue"
  onSubmit={handleSubmit}
  onClose={handleClose}
/>