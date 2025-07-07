<script>
  import '../app.css';
  import AppContext from '$lib/contexts/AppContext.svelte';
  import { user } from '$lib/stores/auth.js';
  import { logoutUser } from '$lib/utils/api.js';
  import { logout } from '$lib/stores/auth.js'; 
  import { goto, invalidateAll } from '$app/navigation'; 
  import { LogOut, User, Heart } from 'lucide-svelte';
  import { UI_TEXTS } from '$lib/constants/texts.js';
  import { ROUTES } from '$lib/constants/routes.js';
  
  export let data;
  
  async function handleLogout() {
    try {
      await logoutUser();
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      logout();
      await goto(ROUTES.HOME, { replaceState: true });
      await invalidateAll(); 
  }}
</script>

<AppContext initialUser={data.user} initialLikes={data.likes}>
  <nav class="bg-blue-600 text-white p-4">
    <div class="container mx-auto flex justify-between items-center">
      <a href={ROUTES.HOME} class="text-xl font-bold hover:text-blue-200 transition-colors">
        {UI_TEXTS.NAV.SITE_TITLE}
      </a>
      
      <div class="flex gap-4 items-center">
        {#if $user}
          <span class="text-blue-200 flex items-center gap-1">
            <User size="16" />
            {UI_TEXTS.NAV.HELLO} {$user.name}!
          </span>
          <a 
            href={ROUTES.FAVORITES}
            class="hover:text-blue-200 transition-colors flex items-center gap-1"
          >
            <Heart size="16" />
            {UI_TEXTS.NAV.MY_FAVORITES}
          </a>
          <button 
            on:click={handleLogout}
            class="bg-red-500 px-3 py-1 rounded hover:bg-red-600 transition-colors flex items-center gap-1"
            type="button"
          >
            <LogOut size="16" />
            {UI_TEXTS.NAV.LOGOUT}
          </button>
        {:else}
          <a 
            href={ROUTES.LOGIN}
            class="bg-green-500 px-3 py-1 rounded hover:bg-green-600 transition-colors"
          >
            {UI_TEXTS.NAV.LOGIN}
          </a>
        {/if}
      </div>
    </div>
  </nav>

  <main class="container mx-auto px-4 py-8">
    <slot />
  </main>
</AppContext>