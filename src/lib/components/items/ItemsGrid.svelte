<script>
  import ItemCard from './ItemCard.svelte';
  import { UI_TEXTS } from '$lib/constants/texts.js';
  import { ROUTES } from '$lib/constants/routes.js';
	import { createItemActions } from '$lib/stores/itemActions';
  
  export let items = [];
  export let userLikes = [];
  export let showLike = false;
  export let selectedCategory = UI_TEXTS.CATEGORIES.ALL;

  const actions = createItemActions();

  const onDelete = (item) => {
    actions.handleDelete(item, null, (errorMessage) => {
      error = errorMessage;
      setTimeout(() => error = '', 3000);
    });
  }
</script>

{#if items.length === 0}
  <div class="text-center text-gray-500 py-12">
    {#if selectedCategory === 'favorites'}
      <p>{UI_TEXTS.MESSAGES.NO_FAVORITES_YET}</p>
      <a href={ROUTES.HOME} class="text-blue-500 hover:underline">
        {UI_TEXTS.MESSAGES.GO_BACK_TO_CATALOG}
      </a>
    {:else if selectedCategory === UI_TEXTS.CATEGORIES.ALL}
      <p>{UI_TEXTS.MESSAGES.NO_ITEMS_YET}</p>
      <p>{UI_TEXTS.MESSAGES.LETS_ADD_FIRST}</p>
    {:else}
      <p>{UI_TEXTS.MESSAGES.NO_ITEMS_IN_CATEGORY} "{selectedCategory}"</p>
      <button 
        on:click={() => selectedCategory = UI_TEXTS.CATEGORIES.ALL}
        class="text-blue-500 hover:underline"
      >
        {UI_TEXTS.MESSAGES.SHOW_ALL_ITEMS}
      </button>
    {/if}
  </div>
{:else}
  <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
    {#each items as item (item._id)}
      <ItemCard 
        {item}
        isLiked={userLikes.includes(item._id)}
        onToggleLike={actions.handleToggleLike}
        onEdit={actions.handleEdit}
        {onDelete}
        {showLike}
      />
    {/each}
  </div>
{/if}