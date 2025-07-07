<script>
  import FormField from '../common/FormField.svelte';
  import { UI_TEXTS } from '$lib/constants/texts.js';
  
  export let isOpen = false;
  export let title = '';
  export let fields = [];
  export let formData = {};
  export let loading = false;
  export let error = '';
  export let submitText = '';
  export let loadingText = '';
  export let onSubmit = () => {};
  export let onClose = () => {};
  export let submitButtonColor = 'blue'; 
</script>

{#if isOpen}
  <div class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
    <div class="bg-white rounded-lg max-w-md w-full max-h-screen overflow-y-auto p-6">
      <div class="flex justify-between items-center mb-4">
        <h2 class="text-xl font-bold">{title}</h2>
        <button on:click={onClose} class="text-gray-500 hover:text-gray-700 text-2xl">
          {UI_TEXTS.GENERAL.CLOSE}
        </button>
      </div>
      
      {#if error}
        <div class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      {/if}
      
      <form on:submit|preventDefault={onSubmit} class="space-y-4">
        {#each fields as field}
          <FormField {field} bind:value={formData[field.id]} />
        {/each}
        
        <div class="flex gap-3 pt-4">
          <button
            type="submit"
            disabled={loading}
            class="flex-1 text-white py-2 px-4 rounded-md disabled:opacity-50 transition-colors"
            class:bg-blue-600={submitButtonColor === 'blue'}
            class:hover:bg-blue-700={submitButtonColor === 'blue'}
            class:bg-green-600={submitButtonColor === 'green'}
            class:hover:bg-green-700={submitButtonColor === 'green'}
          >
            {loading ? loadingText : submitText}
          </button>
          
          <button
            type="button"
            on:click={onClose}
            class="flex-1 bg-gray-500 text-white py-2 px-4 rounded-md hover:bg-gray-600 transition-colors"
          >
            {UI_TEXTS.ITEMS.CANCEL_BUTTON}
          </button>
        </div>
      </form>
    </div>
  </div>
{/if}