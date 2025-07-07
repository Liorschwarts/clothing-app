<script>
  import { setContext, onMount } from 'svelte';
  import { user, userLikes, setUser, setUserLikes } from '$lib/stores/auth.js';
  import { items, setItems, setLoading } from '$lib/stores/items.js';
  import { fetchItems } from '$lib/utils/api.js';
  
  export let initialUser = null;
  export let initialLikes = [];
  
  if (initialUser) setUser(initialUser);
  if (initialLikes) setUserLikes(initialLikes);
  
  setContext('auth', { user, userLikes });
  setContext('items', { items });
  
  onMount(async () => {
    try {
      setLoading(true);
      const data = await fetchItems();
      setItems(data.items || []);
    } catch (error) {
      console.error('Failed to load items:', error);
    } finally {
      setLoading(false);
    }
  });
</script>

<slot />