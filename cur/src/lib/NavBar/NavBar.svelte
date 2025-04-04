<script lang="ts">
	import { stopPropagation } from 'svelte/legacy';

	import { browser } from '$app/environment';
	import { enhance } from '$app/forms';

	// Types
	import type { ModalSettings, DrawerSettings } from '@skeletonlabs/skeleton-svelte';
	import type { SubmitFunction } from '@sveltejs/kit';

	// Docs
	import DocsLogoFull from '../../components/DocsLogos/DocsLogoFull.svelte';
	import DocsIcon from '../../components/DocsIcon/DocsIcon.svelte';

	// Components & Utilities
	import { AppBar } from '@skeletonlabs/skeleton-svelte';

	// Stores
	import { storeTheme } from '$lib/stores/stores';
	const drawerStore = getDrawerStore();

	// Local
	let isOsMac = $state(false);
	const modalStore = getModalStore();

	// Set Search Keyboard Shortcut
	if (browser) {
		let os = navigator.userAgent;
		isOsMac = os.search('Mac') !== -1;
	}

	// Drawer Handler
	function drawerOpen(): void {
		const s: DrawerSettings = { id: 'doc-sidenav' };
		drawerStore.open(s);
	}

	// Search
	function triggerSearch(): void {
		const modal: ModalSettings = {
			type: 'component',
			component: 'modalSearch',
			position: 'item-start'
		};
		modalStore.trigger(modal);
	}

	// Keyboard Shortcut (CTRL/⌘+K) to Focus Search
	function onWindowKeydown(e: KeyboardEvent): void {
		if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
			// Prevent default browser behavior of focusing URL bar
			e.preventDefault();
			// If modal currently open, close modal (allows to open/close search with CTRL/⌘+K)
			$modalStore.length ? modalStore.close() : triggerSearch();
		}
	}

	const themes = [
		{ type: 'skeleton', name: 'Skeleton', icon: '💀' },
		{ type: 'wintry', name: 'Wintry', icon: '🌨️' },
		{ type: 'modern', name: 'Modern', icon: '🤖' },
		{ type: 'rocket', name: 'Rocket', icon: '🚀' },
		{ type: 'seafoam', name: 'Seafoam', icon: '🧜‍♀️' },
		{ type: 'vintage', name: 'Vintage', icon: '📺' },
		{ type: 'sahara', name: 'Sahara', icon: '🏜️' },
		{ type: 'hamlindigo', name: 'Hamlindigo', icon: '👔' },
		{ type: 'gold-nouveau', name: 'Gold Nouveau', icon: '💫' },
		{ type: 'crimson', name: 'Crimson', icon: '⭕' }
		// { type: 'seasonal', name: 'Seasonal', icon: '🎆' }
		// { type: 'test', name: 'Test', icon: '🚧' },
	];

	const setTheme: SubmitFunction = ({ formData }) => {
		const theme = formData.get('theme')?.toString();

		if (theme) {
			document.body.setAttribute('data-theme', theme);
			$storeTheme = theme;
		}
	};
</script>

<!-- NOTE: using stopPropagation to override Chrome for Windows search shortcut -->
<svelte:window onkeydown={stopPropagation(onWindowKeydown)} />

<AppBar shadow="shadow-2xl" slotTrail="!space-x-2">
	{#snippet lead()}
	
			<div class="flex items-center space-x-4">
				<!-- Hamburger Menu -->
				<button onclick={drawerOpen} class="btn-icon btn-icon-sm lg:!hidden">
					<i class="fa-solid fa-bars text-xl"></i>
				</button>
				<!-- Logo -->
				<a class="lg:!ml-0 w-[32px] lg:w-auto overflow-hidden" href="/" title="Go to Homepage">
					<DocsLogoFull />
				</a>
			</div>
		
	{/snippet}
	{#snippet trail()}
	
			<!-- Explore -->
			<div class="relative hidden lg:block">
				<!-- trigger -->
				<button class="btn hover:preset-tonal-primary" use:popup={{ event: 'click', target: 'features' }}>
					<span>Explore</span>
					<i class="fa-solid fa-caret-down opacity-50"></i>
				</button>
				<!-- popup -->
				<div class="card p-4 w-60 shadow-xl" data-popup="features">
					<nav class="list-nav">
						<ul>
							<li>
								<a href="/">
									<span class="w-6 text-center"><i class="fa-solid fa-home"></i></span>
									<span>Homepage</span>
								</a>
							</li>
							<li>
								<a href="/docs/get-started">
									<span class="w-6 text-center"><i class="fa-solid fa-book"></i></span>
									<span>Documentation</span>
								</a>
							</li>
							<li>
								<a href="/blog">
									<span class="w-6 text-center"><i class="fa-solid fa-bullhorn"></i></span>
									<span>Blog</span>
								</a>
							</li>
							<!-- <li>
								<a href="https://store.skeleton.dev" target="_blank">
									<span class="w-6 text-center"><i class="fa-solid fa-shopping-cart" /></span>
									<span>Skeleton Store</span>
								</a>
							</li> -->
							<hr class="!my-4" />
							<li>
								<a href="/elements/core">
									<span class="w-6 text-center"><DocsIcon name="tailwind" width="w-5" height="h-5" /></span>
									<span>Tailwind</span>
								</a>
							</li>
							<li>
								<a href="/actions/clipboard">
									<span class="w-6 text-center"><DocsIcon name="svelte" width="w-6" height="h-6" /></span>
									<span>Svelte</span>
								</a>
							</li>
							<li>
								<a href="/utilities/codeblocks">
									<span class="w-6 text-center"><i class="fa-solid fa-screwdriver-wrench"></i></span>
									<span>Utilities</span>
								</a>
							</li>
						</ul>
					</nav>
					<!-- <div class="arrow bg-surface-100-800-token" /> -->
				</div>
			</div>

			<!-- Theme -->
			<div>
				<!-- trigger -->
				<button class="btn hover:preset-tonal-primary" use:popup={{ event: 'click', target: 'theme', closeQuery: 'a[href]' }}>
					<i class="fa-solid fa-palette text-lg md:!hidden"></i>
					<span class="hidden md:inline-block">Theme</span>
					<i class="fa-solid fa-caret-down opacity-50"></i>
				</button>
				<!-- popup -->
				<div class="card p-4 w-60 shadow-xl" data-popup="theme">
					<div class="space-y-4">
						<section class="flex justify-between items-center">
							<h6 class="h6">Mode</h6>
							<LightSwitch />
						</section>
						<hr />
						<nav class="list-nav p-4 -m-4 max-h-64 lg:max-h-[500px] overflow-y-auto">
							<form action="/?/setTheme" method="POST" use:enhance={setTheme}>
								<ul>
									<!-- , badge -->
									{#each themes as { icon, name, type }}
										<li>
											<button
												class="option w-full h-full"
												type="submit"
												name="theme"
												value={type}
												class:preset-filled-primary-500={$storeTheme === type}
											>
												<span>{icon}</span>
												<span class="flex-auto text-left">{name}</span>
												<!-- {#if badge}<span class="badge variant-filled-secondary">{badge}</span>{/if} -->
											</button>
										</li>
									{/each}
								</ul>
							</form>
						</nav>
						<hr />
						<div>
							<a class="btn preset-filled w-full" href="/docs/generator">
								<i class="fa-solid fa-palette"></i>
								<span>Create a Theme</span>
							</a>
						</div>
					</div>
					<!-- <div class="arrow bg-surface-100-800-token" /> -->
				</div>
			</div>

			<!-- Sponsor -->
			<div>
				<!-- trigger -->
				<button class="btn hover:preset-tonal-primary" use:popup={{ event: 'click', target: 'sponsor' }}>
					<i class="fa-solid fa-heart text-lg md:!hidden"></i>
					<span class="hidden md:inline-block">Sponsor</span>
					<i class="fa-solid fa-caret-down opacity-50"></i>
				</button>
				<!-- popup -->
				<div class="card p-4 w-60 shadow-xl" data-popup="sponsor">
					<div class="space-y-4">
						<nav class="list-nav">
							<ul>
								<li>
									<a href="https://github.com/sponsors/skeletonlabs" target="_blank" rel="noreferrer">
										<span class="w-6 text-center"><i class="fa-brands fa-github"></i></span>
										<span>GitHub</span>
									</a>
								</li>
								<li>
									<a href="https://ko-fi.com/skeletonlabs" target="_blank" rel="noreferrer">
										<span class="w-6 text-center"><i class="fa-solid fa-mug-saucer"></i></span>
										<span>Ko-Fi</span>
									</a>
								</li>
								<li>
									<a href="https://patreon.com/user?u=83786276" target="_blank" rel="noreferrer">
										<span class="w-6 text-center"><i class="fa-brands fa-patreon"></i></span>
										<span>Patreon</span>
									</a>
								</li>
							</ul>
						</nav>
						<hr />
						<div>
							<a class="btn preset-filled w-full" href="/docs/sponsorship">
								<i class="fa-solid fa-gift"></i>
								<span>Incentives</span>
								<span class="badge preset-filled-secondary-500">New</span>
							</a>
						</div>
					</div>
					<!-- <div class="arrow bg-surface-100-800-token" /> -->
				</div>
			</div>

			<!-- Version -->
			<div class="relative hidden lg:block">
				<!-- trigger -->
				<button class="btn hover:preset-tonal-primary" use:popup={{ event: 'click', target: 'version' }}>
					<span>Version</span>
					<i class="fa-solid fa-caret-down opacity-50"></i>
				</button>
				<!-- popup -->
				<div class="card p-4 w-60 shadow-xl" data-popup="version">
					<nav class="list-nav">
						<ul>
							<li>
								<a href="https://v1.skeleton.dev/" target="_blank">
									<span>Skeleton v1 Docs</span>
									<span class="w-6 text-center"><i class="fa-solid fa-arrow-up-right-from-square opacity-50"></i></span>
								</a>
							</li>
						</ul>
					</nav>
					<!-- <div class="arrow bg-surface-100-800-token"></div> -->
				</div>
			</div>

			<!-- Search -->
			<div class="md:inline md:ml-4">
				<button class="btn space-x-4 preset-tonal hover:preset-tonal-primary" onclick={triggerSearch}>
					<i class="fa-solid fa-magnifying-glass text-sm"></i>
					<small class="hidden md:inline-block">{isOsMac ? '⌘' : 'Ctrl'}+K</small>
				</button>
			</div>

			<!-- Social -->
			<section class="hidden sm:inline-flex space-x-1">
				<a class="btn-icon hover:preset-tonal-primary" href="https://github.com/skeletonlabs/skeleton" target="_blank" rel="noreferrer">
					<i class="fa-brands fa-github text-lg"></i>
				</a>
				<a class="btn-icon hover:preset-tonal-primary" href="https://discord.gg/EXqV7W8MtY" target="_blank" rel="noreferrer">
					<i class="fa-brands fa-discord text-lg"></i>
				</a>
			</section>
		
	{/snippet}
</AppBar>