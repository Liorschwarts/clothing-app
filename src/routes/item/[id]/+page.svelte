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
	$: item = $items.find((item) => item._id === itemId);
	$: isLiked = $userLikes.includes(itemId);

	const handleToggleLike = () => {
		actions.handleToggleLike(itemId);
	};
</script>

<svelte:head>
	<title>{item ? item.name : UI_TEXTS.MESSAGES.ITEM_NOT_FOUND} - {UI_TEXTS.NAV.SITE_TITLE}</title>
</svelte:head>

{#if !item}
	<div class="py-12 text-center">
		<h1 class="mb-4 text-2xl font-bold text-gray-600">{UI_TEXTS.MESSAGES.ITEM_NOT_FOUND}</h1>
		<a
			href="/"
			class="rounded bg-blue-500 px-6 py-2 text-white transition-colors hover:bg-blue-600"
		>
			{UI_TEXTS.MESSAGES.BACK_TO_CATALOG}
		</a>
	</div>
{:else}
	<div class="mx-auto grid max-w-4xl grid-cols-1 gap-8 lg:grid-cols-2">
		<ItemImage image={item.image} name={item.name} category={item.category} size="large" />

		<div class="space-y-6">
			<div>
				<h1 class="mb-2 text-3xl font-bold">{item.name}</h1>
				<p class="text-2xl font-bold text-green-600">₪{item.price}</p>
			</div>

			<div>
				<h2 class="mb-2 text-lg font-semibold">{UI_TEXTS.ITEMS.DESCRIPTION}</h2>
				<p class="text-gray-700">{item.description}</p>
			</div>

			{#if item.category}
				<div>
					<span class="rounded-full bg-blue-100 px-3 py-1 text-sm text-blue-800">
						{item.category}
					</span>
				</div>
			{/if}

			<div class="flex gap-4">
				{#if $user}
					<LikeButton {isLiked} onToggle={handleToggleLike} size="large" />
				{:else}
					<a
						href="/login"
						class="rounded-lg bg-blue-500 px-6 py-3 text-white transition-colors hover:bg-blue-600"
					>
						{UI_TEXTS.MESSAGES.LOGIN_TO_SAVE_FAVORITES}
					</a>
				{/if}

				<a
					href="/"
					class="rounded-lg bg-gray-500 px-6 py-3 text-white transition-colors hover:bg-gray-600"
				>
					{UI_TEXTS.MESSAGES.BACK_TO_CATALOG}
				</a>
			</div>
		</div>
	</div>
{/if}
