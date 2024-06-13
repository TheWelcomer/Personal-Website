<script lang="ts">
  import { LightSwitch, AppShell, Avatar, AppBar} from '@skeletonlabs/skeleton';
	import Timeline from '$lib/Timeline/Timeline.svelte';
	import { NavBar } from '$lib/NavBar/NavBar.svelte';
	const timerInterval = 515;
	const initalNumberOfChars = 0;
	const scrollIncrement = 0.72;
	const handleScroll = async () => {
		clearInterval(timer);
		for (let i = 0; i < numScrolled - numScrollsHandled; i++) {
			if (render[render.length - 1] === '▋') {
				render = render.slice(0, -1);
			}
			render += ascii[numScrollsHandled % ascii.length];
			render += '▋'
			numScrollsHandled++;
		}
		timer = startCursorBlinking();
	}
	const startCursorBlinking = () => {
		return setInterval(() => {
			if (render[render.length - 1] === '▋') {
				render = render.slice(0, -1);
				if (render.slice(0, -3) === '<br>') {
					render += '<br>';
				}
			} else {
				render += '▋';
			}
		}, timerInterval);
	}
	let ascii = '<pre>        .n.                     |<br>' +
		'       /___\\          _.---.  \\ _ /<br>' +
		'       [|||]         (_._ ) )--;_) =-<br>' +
		'       [___]           \'---\'.__,\' \\<br>' +
		'       }-=-{                    |<br>' +
		'       |-" |<br>' +
		'       |.-"|                p<br>' +
		'~^=~^~-|_.-|~^-~^~ ~^~ -^~^~|\\ ~^-~^~-<br>' +
		'^   .=.| _.|__  ^       ~  /| \\<br>' +
		' ~ /:. \\" _|_/\\    ~      /_|__\\  ^<br>' +
		'.-/::.  |   |""|-._    ^   ~~~~<br>' +
		'  `===-\'-----\'""`  \'-.              ~<br>' +
		'                 __.-\'      ^<br>' +
		'<br>' +
		'LET’S BUILD A LIGHTHOUSE!!!!!!!!!!!!!!<br>' +

		'\t\t\t\toriginal scaling is 32x32 pixels<br>' +
		'\t\t\t\t(from hat to toe I am a full 32px tall)</pre><br>'
	let render = '|<br>|<br>|<br>|<br>|<br>|<br>|<br>|<br>|<br>|<br>|<br>|<br>|<br>|<br>|<br>|<br>▋';
	let scrollY = 0;
	$: numScrolled = Math.floor(scrollY / scrollIncrement) + initalNumberOfChars;
	let numScrollsHandled = 0;
	let timer = startCursorBlinking();
	$: if (numScrolled > numScrollsHandled) {
		handleScroll();
	}
</script>
<NavBar />
<AppBar gridColumns="grid-cols-3" slotDefault="place-self-center" slotTrail="place-content-end">
	<svelte:fragment slot="lead">(icon)</svelte:fragment>
	(title)
	<svelte:fragment slot="trail">(actions)</svelte:fragment>
</AppBar>
<AppShell slotSidebarLeft="bg-surface-500/5 w-56 p-4">
<svelte:fragment slot="sidebarLeft">
	<!-- Insert the list: -->
	<nav class="list-nav">
		<ul>
			<li><a href="/">Home</a></li>
			<li><a href="/about">About</a></li>
		</ul>
	</nav>
	<!-- --- -->
</svelte:fragment>
<div class="container mx-auto p-8 space-y-8">
	<h1 class="h1">Hello Skeleton</h1>
	<p>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
	<section>
		<a class="btn variant-filled-primary" href="https://kit.svelte.dev/">SvelteKit</a>
		<a class="btn variant-filled-secondary" href="https://tailwindcss.com/">Tailwind</a>
		<a class="btn variant-filled-tertiary" href="https://github.com/">GitHub</a>
	</section>
</div>
	<Avatar src="https://i.pravatar.cc/" />
</AppShell>
<svelte:window bind:scrollY={scrollY} />
<div id="view">
	<LightSwitch />
	<div class="p-10">
    <Timeline />
  </div>
	<div id="append_pipes">
		<pre>
			{@html render}
		</pre>
	</div>
	<div id="num_scrolled">{numScrolled}</div>
	<div id="scroll">{scrollY}</div>
</div>
<style lang="postcss">
  :global(body) {
    background-color: #00003a;
    color: #8084ff;
    transition: background-color 0.3s;
  }
	#view {
		display: flex;
		flex-direction: column;
		align-items: left;
		justify-content: left;
		height: 10000vh;
	}
  #num_scrolled {
		font-size: 2em;
	}
</style>