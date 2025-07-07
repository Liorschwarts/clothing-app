<script>
  import { getContext } from 'svelte';
  import { page } from '$app/stores';
  import { createItemActions } from '$lib/stores/itemActions.js';
  import ItemImage from '$lib/components/items/ItemImage.svelte';
  import LikeButton from '$lib/components/common/LikeButton.svelte';
  import { UI_TEXTS } from '$lib/constants/texts.js';
  
  const { user, userLikes } = getContext('auth');
  const { items } = getContext('items');
  const actions = createItemActions();
  
  $: itemId = $page.params.id;
  $: item = $items.find(item => item._id === itemId);
  $: isLiked = $userLikes.includes(itemId);
  
  function handleToggleLike() {
    actions.handleToggleLike(itemId);
  }
</script>

<svelte:head>
  <title>{item ? item.name : UI_TEXTS.MESSAGES.ITEM_NOT_FOUND} - {UI_TEXTS.NAV.SITE_TITLE}</title>
</svelte:head>

{#if !item}
  <div class="text-center py-12">
    <h1 class="text-2xl font-bold text-gray-600 mb-4">{UI_TEXTS.MESSAGES.ITEM_NOT_FOUND}</h1>
    <a href="/" class="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600 transition-colors">
      {UI_TEXTS.MESSAGES.BACK_TO_CATALOG}
    </a>
  </div>
{:else}
  <div class="max-w-4xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8">
    <ItemImage image={item.image} name={item.name} category={item.category} size="large" />
    
    <div class="space-y-6">
      <div>
        <h1 class="text-3xl font-bold mb-2">{item.name}</h1>
        <p class="text-2xl font-bold text-green-600">₪{item.price}</p>
      </div>
      
      <div>
        <h2 class="text-lg font-semibold mb-2">{UI_TEXTS.ITEMS.DESCRIPTION}</h2>
        <p class="text-gray-700">{item.description}</p>
      </div>
      
      {#if item.category}
        <div>
          <span class="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
            {item.category}
          </span>
        </div>
      {/if}
      
      <div class="flex gap-4">
        {#if $user}
          <LikeButton 
            {isLiked} 
            onToggle={handleToggleLike}
            size="large"
          />
        {:else}
          <a href="/login" class="bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 transition-colors">
            {UI_TEXTS.MESSAGES.LOGIN_TO_SAVE_FAVORITES}
          </a>
        {/if}
        
        <a href="/" class="bg-gray-500 text-white px-6 py-3 rounded-lg hover:bg-gray-600 transition-colors">
          {UI_TEXTS.MESSAGES.BACK_TO_CATALOG}
        </a>
      </div>
    </div>
  </div>
{/if}