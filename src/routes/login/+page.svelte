<script>
	import { getContext } from 'svelte';
	import { goto, invalidateAll } from '$app/navigation';
	import { loginUser, registerUser } from '$lib/utils/api.js';
	import { setUser, setUserLikes } from '$lib/stores/auth.js';
	import AuthForm from '$lib/components/auth/AuthForm.svelte';
	import { UI_TEXTS } from '$lib/constants/texts.js';
	import { ROUTES } from '$lib/constants/routes.js';

	const { user } = getContext('auth');

	if ($user) goto(ROUTES.HOME);

	let mode = 'login';
	let loading = false;
	let error = '';

	const handleSubmit = async (data) => {
		error = '';
		loading = true;

		try {
			const result =
				mode === 'login'
					? await loginUser(data.email, data.password)
					: await registerUser(data.email, data.password, data.name);

			setUser(result.user);
			if (result.likes) setUserLikes(result.likes);

			await goto(ROUTES.HOME, { replaceState: true });
			await invalidateAll();
		} catch (err) {
			error = err.message;
		} finally {
			loading = false;
		}
	};

	const toggleMode = () => {
		mode = mode === 'login' ? 'register' : 'login';
		error = '';
		loading = false;
	};
</script>

<svelte:head>
	<title>
		{mode === 'login' ? UI_TEXTS.AUTH.LOGIN_TITLE : UI_TEXTS.AUTH.REGISTER_TITLE} - {UI_TEXTS.NAV
			.SITE_TITLE}
	</title>
</svelte:head>

<div class="mx-auto max-w-md rounded-lg bg-white p-6 shadow-md">
	<h1 class="mb-6 text-center text-2xl font-bold">
		{mode === 'login' ? UI_TEXTS.AUTH.LOGIN_TITLE : UI_TEXTS.AUTH.REGISTER_TITLE}
	</h1>

	{#if error}
		<div class="mb-4 rounded border border-red-400 bg-red-100 px-4 py-3 text-red-700">
			{error}
		</div>
	{/if}

	{#key mode}
		<AuthForm {mode} onSubmit={handleSubmit} {loading} />
	{/key}

	<div class="mt-4 text-center">
		<button on:click={toggleMode} class="text-sm text-blue-600 hover:text-blue-800 hover:underline">
			{mode === 'login' ? UI_TEXTS.AUTH.NO_ACCOUNT : UI_TEXTS.AUTH.HAVE_ACCOUNT}
		</button>
	</div>
</div>
