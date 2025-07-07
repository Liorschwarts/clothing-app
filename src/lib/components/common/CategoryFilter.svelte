<script>
  import { CATEGORIES_LIST, getCategoryName } from '$lib/constants/categories.js';
  import { UI_TEXTS } from '$lib/constants/texts.js';
  
  export let selectedCategory = UI_TEXTS.CATEGORIES.ALL;
  export let items = [];
</script>

<div class="mb-6 text-center">
  <label for="category-filter" class="block text-sm font-medium text-gray-700 mb-2">
    {UI_TEXTS.CATEGORIES.FILTER_BY_CATEGORY}
  </label>
  <select 
    id="category-filter"
    bind:value={selectedCategory}
    class="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
  >
    <option value={UI_TEXTS.CATEGORIES.ALL}>
      {UI_TEXTS.CATEGORIES.ALL} ({items.length})
    </option>
    {#each CATEGORIES_LIST as category}
      {@const count = items.filter(item => item.category === category).length}
      {#if count > 0}
        <option value={category}>
          {getCategoryName(category)} ({count})
        </option>
      {/if}
    {/each}
  </select>
</div>