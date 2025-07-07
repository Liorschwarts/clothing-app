<script>
  import { getContext } from 'svelte';
  import { Edit, Trash2 } from 'lucide-svelte';
  import ItemImage from './ItemImage.svelte';
  import LikeButton from '../common/LikeButton.svelte';
  import { UI_TEXTS } from '$lib/constants/texts.js';
  import { getItemRoute } from '$lib/constants/routes.js';
  
  const { user } = getContext('auth');
  
  export let item;
  export let isLiked = false;
  export let onToggleLike = () => {};
  export let onEdit = () => {};
  export let onDelete = () => {};
  export let showLike = true;
  
  $: isOwner = $user && item.createdBy === $user._id;
</script>

<div class="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow relative">
  {#if isOwner}
    <div class="absolute top-2 left-2 flex gap-1 z-10">
      <button 
        on:click={() => onEdit(item)}
        class="bg-blue-500 text-white p-2 rounded-full hover:bg-blue-600 transition-colors shadow-lg"
        title={UI_TEXTS.ITEMS.EDIT_ITEM}
      >
        <Edit size="16" />
      </button>
      <button 
        on:click={() => onDelete(item)}
        class="bg-red-500 text-white p-2 rounded-full hover:bg-red-600 transition-colors shadow-lg"
        title={UI_TEXTS.ITEMS.DELETE_ITEM}
      >
        <Trash2 size="16" />
      </button>
    </div>
  {/if}
  
  <ItemImage image={item.image} name={item.name} category={item.category} />
  
  <div class="p-4">
    <h3 class="text-lg font-semibold mb-2">{item.name}</h3>
    <p class="text-gray-600 text-sm mb-3">{item.description}</p>
    
    <div class="flex justify-between items-center mb-3">
      <span class="text-xl font-bold text-green-600">₪{item.price}</span>
      
      {#if showLike}
        <LikeButton 
          {isLiked} 
          onToggle={() => onToggleLike(item._id)}
        />
      {/if}
    </div>
    
    <div>
      <a 
        href={getItemRoute(item._id)}
        class="text-blue-500 hover:text-blue-700 text-sm hover:underline"
      >
        {UI_TEXTS.ITEMS.MORE_DETAILS}
      </a>
    </div>
  </div>
</div>