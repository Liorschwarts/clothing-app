<script>
  import { AUTH_FIELDS } from '$lib/constants/forms.js';
  import { UI_TEXTS } from '$lib/constants/texts.js';
  
  export let mode = 'login';
  export let onSubmit;
  export let loading = false;
  
  let formData = { email: '', password: '', name: '' };
  
  function getFields() {
    return mode === 'register' 
      ? [AUTH_FIELDS.name, AUTH_FIELDS.email, AUTH_FIELDS.password]
      : [AUTH_FIELDS.email, AUTH_FIELDS.password];
  }
  
  function getButtonText() {
    if (loading) return UI_TEXTS.AUTH.LOADING;
    return mode === 'login' ? UI_TEXTS.AUTH.LOGIN_BUTTON : UI_TEXTS.AUTH.REGISTER_BUTTON;
  }
  
  function handleSubmit() {
    const submitData = mode === 'login' 
      ? { email: formData.email, password: formData.password }
      : { name: formData.name, email: formData.email, password: formData.password };
    
    onSubmit(submitData);
  }
</script>

<form on:submit|preventDefault={handleSubmit} class="space-y-4">
  {#each getFields() as field}
    <div>
      <label for={field.id} class="block text-sm font-medium text-gray-700 mb-1">
        {field.label}
      </label>
      <input
        type={field.type}
        id={field.id}
        bind:value={formData[field.id]}
        required={field.required}
        minlength={field.minlength || undefined}
        class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        placeholder={field.placeholder}
      />
    </div>
  {/each}
  
  <button
    type="submit"
    disabled={loading}
    class="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
  >
    {getButtonText()}
  </button>
</form>