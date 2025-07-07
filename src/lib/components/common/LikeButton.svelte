<script>
  import { Heart } from 'lucide-svelte';
  import { UI_TEXTS } from '$lib/constants/texts.js';
  
  export let isLiked = false;
  export let onToggle = () => {};
  export let disabled = false;
  export let size = 'normal';
  
  function getClasses() {
    const base = 'flex items-center gap-2 transition-colors';
    const sizeClass = size === 'large' 
      ? 'px-6 py-3 rounded-lg' 
      : 'px-3 py-1 rounded text-sm';
    
    return `${base} ${sizeClass}`;
  }
  
  function getText() {
    if (size === 'large') {
      return isLiked ? UI_TEXTS.LIKES.REMOVE_FROM_FAVORITES : UI_TEXTS.LIKES.ADD_TO_FAVORITES;
    }
    return isLiked ? UI_TEXTS.LIKES.LIKED : UI_TEXTS.LIKES.LIKE;
  }
  
  function getIconSize() {
    return size === 'large' ? 20 : 16;
  }
</script>

<button 
  on:click={onToggle}
  {disabled}
  class={getClasses()}
  class:bg-red-100={isLiked}
  class:text-red-600={isLiked}
  class:bg-gray-100={!isLiked}
  class:text-gray-600={!isLiked}
  class:opacity-50={disabled}
>
  <Heart 
    size={getIconSize()} 
    fill={isLiked ? "currentColor" : "none"}
  />
  <span>
    {getText()}
  </span>
</button>