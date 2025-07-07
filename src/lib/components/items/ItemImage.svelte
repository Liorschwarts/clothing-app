<script>
  import { getCategoryIcon, getCategoryName } from '$lib/constants/categories.js';
  import { CATEGORY_TYPES } from '$lib/constants/categories.js';
  
  export let image = '';
  export let name = '';
  export let category = CATEGORY_TYPES.GENERAL;
  export let size = 'normal'; 
  
  $: icon = getCategoryIcon(category);
  $: categoryName = getCategoryName(category);
  $: heightClass = size === 'large' ? 'h-96' : 'h-48';
</script>

<div class="bg-gray-200 rounded-lg overflow-hidden {heightClass}">
  {#if image}
    <img src={image} alt={name} class="w-full h-full object-cover" />
  {:else}
    <div class="w-full h-full flex flex-col items-center justify-center text-gray-500">
      <span class="text-6xl mb-2">{icon}</span>
      <span class="text-sm">{categoryName}</span>
    </div>
  {/if}
</div>