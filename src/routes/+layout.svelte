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

	const handleLogout = async () => {
		try {
			await logoutUser();
		} catch (error) {
			console.error('Logout error:', error);
		} finally {
			logout();
			await goto(ROUTES.HOME, { replaceState: true });
			await invalidateAll();
		}
	};
</script>

<AppContext initialUser={data.user} initialLikes={data.likes}>
	<nav class="bg-blue-600 p-4 text-white">
		<div class="container mx-auto flex items-center justify-between">
			<a href={ROUTES.HOME} class="text-xl font-bold transition-colors hover:text-blue-200">
				{UI_TEXTS.NAV.SITE_TITLE}
			</a>

			<div class="flex items-center gap-4">
				{#if $user}
					<span class="flex items-center gap-1 text-blue-200">
						<User size="16" />
						{UI_TEXTS.NAV.HELLO}
						{$user.name}!
					</span>
					<a
						href={ROUTES.FAVORITES}
						class="flex items-center gap-1 transition-colors hover:text-blue-200"
					>
						<Heart size="16" />
						{UI_TEXTS.NAV.MY_FAVORITES}
					</a>
					<button
						on:click={handleLogout}
						class="flex items-center gap-1 rounded bg-red-500 px-3 py-1 transition-colors hover:bg-red-600"
						type="button"
					>
						<LogOut size="16" />
						{UI_TEXTS.NAV.LOGOUT}
					</button>
				{:else}
					<a
						href={ROUTES.LOGIN}
						class="rounded bg-green-500 px-3 py-1 transition-colors hover:bg-green-600"
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
