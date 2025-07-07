<script>
  import { CATEGORIES_LIST, getCategoryIcon, getCategoryName } from '$lib/constants/categories.js';
  import { FIELD_TYPES } from '$lib/constants/forms.js';
	import { UI_TEXTS } from '$lib/constants/texts';
  
  export let field;
  export let value = '';
  
  function handleInput(event) {
    value = event.target.value;
  }
</script>

<div>
  <label for={field.id} class="block text-sm font-medium text-gray-700 mb-1">
    {field.label}
  </label>
  
  {#if field.type === FIELD_TYPES.TEXTAREA}
    <textarea
      id={field.id}
      {value}
      on:input={handleInput}
      required={field.required}
      rows={field.rows}
      class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      placeholder={field.placeholder}
    ></textarea>
  {:else if field.type === FIELD_TYPES.SELECT && field.label === UI_TEXTS.ITEMS.CATEGORY}
    <select
      id={field.id}
      {value}
      on:change={handleInput}
      class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
    >
      {#each CATEGORIES_LIST as category}
        <option value={category}>
          {getCategoryIcon(category)} {getCategoryName(category)}
        </option>
      {/each}
    </select>
  {:else}
    <input
      type={field.type}
      id={field.id}
      {value}
      on:input={handleInput}
      required={field.required}
      min={field.min}
      class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      placeholder={field.placeholder}
    />
  {/if}
</div>