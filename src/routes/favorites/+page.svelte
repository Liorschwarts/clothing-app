<script>
  import { getContext } from 'svelte';
  import { createItemActions } from '$lib/stores/itemActions.js';
  import ItemsGrid from '$lib/components/items/ItemsGrid.svelte';
  import EditItemModal from '$lib/components/modals/EditItemModal.svelte';
  import { UI_TEXTS } from '$lib/constants/texts.js';
  import { ROUTES } from '$lib/constants/routes.js';
  
  const { user, userLikes } = getContext('auth');
  const { items } = getContext('items');
  const actions = createItemActions();
  
  let error = '';
  
  $: favoriteItems = $items.filter(item => $userLikes.includes(item._id));
</script>

<svelte:head>
  <title>{UI_TEXTS.LIKES.MY_FAVORITES_TITLE} - {UI_TEXTS.NAV.SITE_TITLE}</title>
</svelte:head>

<div class="max-w-6xl mx-auto">
  <h1 class="text-3xl font-bold mb-8 text-center">
    {UI_TEXTS.LIKES.MY_FAVORITES_TITLE} ({favoriteItems.length} {UI_TEXTS.LIKES.FAVORITES_COUNT})
  </h1>
  
  {#if error}
    <div class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4 text-center">
      {error}
    </div>
  {/if}
  
  {#if !$user}
    <div class="text-center text-gray-500 py-12">
      <p>{UI_TEXTS.MESSAGES.NEED_LOGIN_FOR_FAVORITES}</p>
      <a href={ROUTES.LOGIN} class="text-blue-500 hover:underline">
        {UI_TEXTS.MESSAGES.LOGIN_HERE}
      </a>
    </div>
  {:else}
    <ItemsGrid 
      items={favoriteItems}
      userLikes={$userLikes}
      showLike={true}
      selectedCategory="favorites"
    />
  {/if}
</div>

<EditItemModal />