<script>
  import { getContext } from 'svelte';
  import { createItemActions } from '$lib/stores/itemActions.js';
  import { modals } from '$lib/stores/modals.js';
  import AddItemModal from '$lib/components/modals/AddItemModal.svelte';
  import EditItemModal from '$lib/components/modals/EditItemModal.svelte';
  import CategoryFilter from '$lib/components/common/CategoryFilter.svelte';
  import ItemsGrid from '$lib/components/items/ItemsGrid.svelte';
  import { UI_TEXTS } from '$lib/constants/texts.js';
  
  const { user, userLikes } = getContext('auth');
  const { items } = getContext('items');
  const actions = createItemActions();
  
  let selectedCategory = UI_TEXTS.CATEGORIES.ALL;
  let error = '';
  
  $: filteredItems = selectedCategory === UI_TEXTS.CATEGORIES.ALL 
    ? $items 
    : $items.filter(item => item.category === selectedCategory);
  
  $: editingItem = $modals.editItem?.data || null;
  
</script>

<svelte:head>
  <title>{UI_TEXTS.ITEMS.CATALOG_TITLE} - Home</title>
</svelte:head>

<div class="max-w-6xl mx-auto">
  <h1 class="text-3xl font-bold mb-8 text-center">{UI_TEXTS.ITEMS.CATALOG_TITLE}</h1>
  
  {#if error}
    <div class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4 text-center">
      {error}
    </div>
  {/if}
  
  {#if $user}
    <div class="mb-6 text-center">
      <button 
        on:click={actions.handleAddItem}
        class="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600 transition-colors"
      >
        {UI_TEXTS.ITEMS.ADD_NEW_ITEM}
      </button>
    </div>
  {/if}
  
  <CategoryFilter bind:selectedCategory items={$items} />
  
  <ItemsGrid 
    items={filteredItems}
    userLikes={$userLikes}
    showLike={!!$user}
    bind:selectedCategory
  />
</div>

<AddItemModal />

<EditItemModal />