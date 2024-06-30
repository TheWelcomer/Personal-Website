<script lang="ts">
	import { onMount } from 'svelte';
	import '../app.postcss';

	onMount(() => {
		const TIMER_INTERVAL = window.innerWidth < 768 ? 600 : 515;
	});

	const TO_PRINT = [
		// ... (keep the existing TO_PRINT array as is)
	]

	let scrollY = 0;
	let speed = 0;
	let handled = 0;
	let touchStartY = 0;
	$: numScrolled = Math.floor(scrollY / TO_PRINT[currentCard].speed[speed]);
	let numScrollsHandled = 0;
	let currentCard = 0;
	let currentVisual = 0;
	let printing = true;

	const handleScroll = async () => {
		// ... (keep the existing handleScroll function as is)
	}

	const startCursorBlinking = () => {
		// ... (keep the existing startCursorBlinking function as is)
	}

	const handleTouchStart = (e: TouchEvent) => {
		touchStartY = e.touches[0].clientY;
	};

	const handleTouchMove = (e: TouchEvent) => {
		const touchEndY = e.touches[0].clientY;
		const deltaY = touchStartY - touchEndY;
		scrollY += deltaY;
		touchStartY = touchEndY;
	};

	onMount(() => {
		window.onbeforeunload = function () {
			window.scrollTo(0, 0);
		}

		const cards = document.querySelectorAll('.card');
		const observer = new IntersectionObserver(
			([entry]) => {
				if (entry.boundingClientRect.top < 0) {
					let thinksCurrentCard = parseInt(entry.target.classList[0].slice(5)) + 1;
					if (thinksCurrentCard > currentCard) {
						printing = true;
						handled = 0;
						currentCard++;
						cards[currentCard].classList.remove('opacity-0');
						cards[currentCard].classList.add('animate-fadeIn');
						currentVisual++;
						visuals[currentVisual].classList.remove('opacity-0');
						visuals[currentVisual].classList.add('animate-fadeIn');
						speed = 0
						numScrolled = Math.floor(scrollY / TO_PRINT[currentCard].speed[speed]);
						numScrollsHandled = numScrolled;
					}
				}
			},
			{ threshold: 0.1 }
		);
		cards.forEach((card) => {
			observer.observe(card);
		});

		const visuals = document.querySelectorAll('.visual');
		const visualObserver = new IntersectionObserver(
			([entry]) => {
				if (entry.boundingClientRect.top < 0) {
					let thinksCurrentVisual = parseInt(entry.target.classList[0].slice(7)) + 1;
					try {
						if (document.querySelector(`.visual_${thinksCurrentVisual}`).parentElement.parentElement.classList[0] !== `visual_list_${currentCard}`) {
							return;
						}
					} catch (e) {
					}
					if (thinksCurrentVisual > currentVisual) {
						currentVisual++;
						visuals[currentVisual].classList.remove('opacity-0');
						visuals[currentVisual].classList.add('animate-fadeIn');
					}
				}
			},
			{ threshold: 0.1 }
		);
		visuals.forEach((visual) => {
			visualObserver.observe(visual);
		});

		document.addEventListener('touchstart', handleTouchStart);
		document.addEventListener('touchmove', handleTouchMove);

		return () => {
			document.removeEventListener('touchstart', handleTouchStart);
			document.removeEventListener('touchmove', handleTouchMove);
		};
	});

	let render = ['', '', '', '', '', '', '', '', ''];
	render.forEach((cardText, i) => {
		render[i] = TO_PRINT[i].initial || '';
	});
	let timer = startCursorBlinking();
	$: if (numScrolled > numScrollsHandled) {
		handleScroll();
	}
</script>

<svelte:window bind:scrollY={scrollY} />

<!-- Repeat this structure for each card (0 to 8) -->
<div class="card_0 card_class grid grid-cols-1 md:grid-cols-2 gap-4">
	<div class="text-container">
		<div class="text_0 sticky top-16 md:top-28 min-h-screen md:min-h-96 mx-2 md:ml-4 card p-2 md:p-4 w-full animate-fadeIn text-sm md:text-base">
			{@html render[0]}
		</div>
	</div>
	<div class="visual_list_0 visual_list">
		<div class="visual_div_0 visual_div mb-4">
			<div class="visual_0 visual sticky top-16 md:top-24 p-2 md:p-4 animate-fadeIn">
				<img class="w-full h-auto max-h-screen rounded-lg" src="/images/chin.jpeg" alt="Chin" />
			</div>
		</div>
		<div class="visual_div_1 visual_div mb-4">
			<div class="visual_1 visual sticky top-16 md:top-24 p-2 md:p-4 animate-fadeIn">
				<img class="w-full h-auto max-h-screen rounded-lg" src="/images/phil.jpeg" alt="Philmont" />
			</div>
		</div>
		<div class="visual_div_2 visual_div mb-4">
			<div class="visual_2 visual sticky top-16 md:top-24 p-2 md:p-4 animate-fadeIn">
				<img class="w-full h-auto max-h-screen rounded-lg" src="/images/juice.jpeg" alt="Juice" />
			</div>
		</div>
		<div class="visual_div_3 visual_div mb-4">
			<div class="visual_3 visual sticky top-16 md:top-24 p-2 md:p-4 animate-fadeIn">
				<img class="w-full h-auto max-h-screen rounded-lg" src="/images/snow.jpeg" alt="Snow" />
			</div>
		</div>
	</div>
</div>
<div class="card_1 card_class grid grid-cols-1 md:grid-cols-2 gap-4">
	<div class="text-container">
		<div class="text_1 sticky top-16 md:top-28 min-h-screen md:min-h-96 mx-2 md:ml-4 card p-2 md:p-4 w-full animate-fadeIn text-sm md:text-base">
			{@html render[0]}
		</div>
	</div>
	<div class="visual_list_1 visual_list">
		<div class="visual_div_4 visual_div mb-4">
			<div class="visual_4 visual sticky top-16 md:top-24 p-2 md:p-4 animate-fadeIn">
				<img class="w-full h-auto max-h-screen rounded-lg" src="/images/chin.jpeg" alt="Chin" />
			</div>
		</div>
	</div>
</div>
<style lang="postcss">
	.card_0 {
		height: 800vh;
	}
	.card_1 {
		height: 800vh;
	}
	.card_2 {
		height: 800vh;
	}
	.card_3 {
		height: 800vh;
	}
	.card_4 {
		height: 800vh;
	}
	.card_5 {
		height: 800vh;
	}
	.card_6 {
		height: 800vh;
	}
	.card_7 {
		height: 800vh;
	}
	.card_8 {
		height: 800vh;
	}
	.visual_div {
		height: 180vh;
	}
	@font-face{
		font-family: 'IBM Plex Mono';
		src: url('../lib/fonts/IBM Plex Mono/medium.woff2') format('woff2');
	}
	@font-face {
		font-family: 'IBM Plex Mono';
		src: url('../lib/fonts/IBM Plex Mono/italic.woff2') format('woff2');
		font-style: italic;
	}
	@font-face {
		font-family: 'Inter';
		src: url('../lib/fonts/Inter/Inter-Regular.woff2') format('woff2');
	}
	@font-face {
		font-family: 'Roboto Mono';
		src: url('../lib/fonts/Roboto Mono/RobotoMono-Regular.woff2') format('woff2');
	}
	@font-face {
		font-family: 'Ubuntu Sans Mono';
		src: url('../lib/fonts/Ubuntu Sans Mono/UbuntuSansMono-Regular.woff2') format('woff2');
	}
</style>