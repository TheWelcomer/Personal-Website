<!-- This is the intro page and contains a pudding.cool style series of cards and visuals that the user scrolls between. -->

<!-- Script -->
<script lang="ts">
	// Imports
	import { onMount } from 'svelte';
	import '../app.postcss';

	// Constants
	const TO_PRINT = [
		{
			initial:
					'<div class="font-ibm">' +
						'↓ Scroll to see the text ↓' +
					'</div>',
			text:
						'@<div class="font-ibm font-bold italic text-blue-700 text-6xl">@' +
							'Hallo, I\'m @<br><span class="text-rose-600">@The Welcomer!!',
			speed: [50],
		},
		{
			initial: '',
			text:
						'@<span class="font-ibm italic text-emerald-500 text-2xl">@' +
							'Wanderer of @<span class="text-teal-700">@systems @</span>@and @<span class="text-cyan-700">science!@</span>' +
							'@<div class="text-right">@' +
								'... and @<span class="text-zinc-600">@delving spots@</span>@         ' +
								'@<br>@' +
								'... and @<span class="text-emerald-700">@backwoods@</span>@          ' +
								'@<br>@' +
								'... and all things @<span class="text-blue-700">@blue ' +
								'@<br>@',
			speed: [10],
		},
		{
			initial: '',
			text:
						'@<div class="font-ibm bold italic text-blue-700 text-6xl justify-center">@Bio@</div>~@' +
						'@<br>@' +
						'@<div class="font-ibm bold italic text-sky-600 text-2xl">@' +
						'I\'m a @<span class="text-teal-600">@CS Major @</span>@at @<span class="text-maroon">UMass Amherst </span>@graduating in December 2024 with a passion ' +
						'for exploring fields with wonderful people and inspiring works',
			speed: [100, 10],
		},
		// {
		// 	initial: '',
		// 	text:
		// 				'@<div class="font-ibm bold italic text-sky-600 text-2xl">@' +
		// 				'The simple act of creation is at the center of who I am, and connecting thousands of components to ' +
		// 				'bring an app to life has been the most logically satisfying craft I\'ve discovered. I seek ' +
		// 				'to master this process slowly, enjoying my journey along the way.',
		// 	speed: [20],
		// },
		{
			initial: '',
			text:
						'@<div class="font-ibm bold italic text-indigo-400 text-2xl">@' +
							'I\'m especially interested in the fields of @<span>@medical software@</span>@ and @<span>@ML engineering@</span>@',
			speed: [5],
		},
		{
			initial: '',
			text:
						'@<div class="font-ibm bold italic text-blue-700 text-6xl">@' +
						'@<span class="text-rose-600">@Projects@</span>@' +
						'@<br>@' +
						'@<div class="font-ibm bold italic text-sky-600 text-2xl">@' +
						'@<span class="">@Pandemic Essential Goods Delivery@</span>@, @<span class="">@Self-Driving Car@</span>@, @<span class="">@Allergy Ordering App@</span>@, and @<span class="">@Crohn\'s Flare Prediction',
			speed: [5],
		},
		{
			initial: '',
			text:
						'@<div class="font-ibm bold italic text-blue-700 text-6xl justify-center">@Bio@</div>~@' +
						'@<br>@' +
						'@<div class="font-ibm bold italic text-sky-600 text-2xl">@' +
						'I\'m a @<span class="text-teal-600">@CS Major @</span>@at @<span class="text-maroon">UMass Amherst </span>@graduating in December 2024 with a passion ' +
						'for exploring fields with wonderful people and inspiring works.',

			speed: [20],
		},
		{
			initial: '',
			text: '@<span style="background-color: yellow;">@This @<span style="font-weight: bold;">@text@</span>@ has a yellow background. @<span style="border: 1px solid black;">@This part has a black border.@</span></span>@',
			speed: [10],
		},
		{
			initial: '',
			text: '@<span style="letter-spacing: 2px;">@This @<span style="color: purple;">@text@</span>@ has increased letter spacing. @<span style="text-shadow: 1px 1px 2px black;">@This part has a text shadow.@</span></span>@',
			speed: [100],
		},
		{
			initial: '',
			text: '@<span style="text-transform: uppercase;">@This @<span style="font-weight: bold;">@text@</span>@ is uppercase. @<span style="background-color: lightblue;">@This part has a light blue background.@</span></span>@',
			speed: [1],
		},
		{
			initial: '',
			text: '@<span style="color: blue; font-weight: bold;">@This @<span style="text-decoration: underline; font-size: 24px;">@text@</span>@ is blue, bold, underlined, and 24px in size.@</span>@',
			speed: [10],
		},
	]

	// Constants
	const TIMER_INTERVAL = 515;

	// Variables
	let scrollY = 0;
	$: numScrolled = Math.floor(scrollY / TO_PRINT[currentCard].speed[speed]);
	let numScrollsHandled = 0;
	let speed = 0;
	let charsPrinted = 0;
	let currentCard = 0;
	let currentVisual = 0;
	let printing = true;
	let render = ['', '', '', '', '', '', '', '', ''];

	// Adding initial card text
	render.forEach((cardText, i) => {
		render[i] = TO_PRINT[i].initial || '';
	});

	// Handle scrolling
	const handleScroll = async () => {
		if (!printing) {
			return;
		}
		if (render[currentCard].length >= 18 && render[currentCard].slice(-32) === '<span class="opacity-0">▋</span>') {
			render[currentCard] = render[currentCard].slice(0, -32);
		}
		if (currentCard === 0 && charsPrinted === 0) {
			render[currentCard] = '';
		}
		clearInterval(timer);
		for (let i = 0; i < numScrolled - numScrollsHandled; i++) {
			if (render[currentCard][render[currentCard].length - 1] === '▋') {
				render[currentCard] = render[currentCard].slice(0, -1);
			}
			if (charsPrinted >= TO_PRINT[currentCard].text.length) {
				printing = false;
				break;
			}
			if (TO_PRINT[currentCard].text[charsPrinted] === '@') {
				charsPrinted++;
				while (TO_PRINT[currentCard].text[charsPrinted] !== '@') {
					if (TO_PRINT[currentCard].text[charsPrinted] === '~') {
						speed++;
						numScrolled = Math.floor(scrollY / TO_PRINT[currentCard].speed[speed]);
						numScrollsHandled = numScrolled;
						charsPrinted++;
						continue;
					}
					render[currentCard] += TO_PRINT[currentCard].text[charsPrinted];
					charsPrinted++;
				}
				charsPrinted++;
				break;
			}
			render[currentCard] += TO_PRINT[currentCard].text[charsPrinted];
			render[currentCard] += '▋'
			charsPrinted++;
			numScrollsHandled++;
		}
		timer = startCursorBlinking();
	}

	// Handle cursor blinking
	const startCursorBlinking = () => {
		return setInterval(() => {
			if (render[currentCard].length >= 8 && render[currentCard].slice(-8) === '<br><br>') {
				render[currentCard] = render[currentCard].slice(0, -4);
			}
			if (render[currentCard][render[currentCard].length - 1] === '▋') {
				render[currentCard] = render[currentCard].slice(0, -1);
				render[currentCard] += '<span class="opacity-0">▋</span>';
				if (render[currentCard].slice(-4) === '<br>') {
					render[currentCard] += '<br>';
				}
			} else {
				if (render[currentCard].slice(-32) === '<span class="opacity-0">▋</span>') {
					render[currentCard] = render[currentCard].slice(0, -32);
				}
				render[currentCard] += '▋';
			}
		}, TIMER_INTERVAL);
	}

	// Handle scrolling to top on page refresh
	onMount(() => {
		window.onbeforeunload = function () {
			window.scrollTo(0, 0);
		}
	});

	// Handle active card switching
	onMount(() => {
		const cards = document.querySelectorAll('.card');
		const observer = new IntersectionObserver(
				([entry]) => {
					if (entry.boundingClientRect.top < 0) {
						let thinksCurrentCard = parseInt(entry.target.classList[1][5]) + 1;
						if (thinksCurrentCard > currentCard) {
							cards[currentCard].innerHTML = cards[currentCard].innerHTML.replace('▋', '');
							cards[currentCard].innerHTML.replace('▋', '');
							printing = true;
							charsPrinted = 0;
							currentCard++;
							if (cards[currentCard].classList.contains('opacity-0')) {
								lockScroll(1000);
								cards[currentCard].classList.remove('opacity-0');
								cards[currentCard].classList.add('animate-fadeIn');
							}
							speed = 0;
							numScrolled = Math.floor(scrollY / TO_PRINT[currentCard].speed[speed]);
							numScrollsHandled = numScrolled;
						}
					}
				}
		);
		cards.forEach((card) => {
			observer.observe(card);
		});
	});

	// Handle active visual switching
	onMount(() => {
		const visuals = document.querySelectorAll('.visual');
		const visualObserver = new IntersectionObserver(
			([entry]) => {
				if (entry.boundingClientRect.top < 0) {
					let thinksCurrentVisual = parseInt(entry.target.classList[1].slice(7)) + 1;
					if (thinksCurrentVisual > currentVisual) {
						currentVisual++;
						if (visuals[currentVisual].classList.contains('opacity-0')) {
							visuals[currentVisual].classList.remove('opacity-0');
							visuals[currentVisual].classList.add('animate-fadeIn');
						}
					}
				}
			}
		);
		visuals.forEach((visual) => {
			visualObserver.observe(visual);
		});
	});
	function lockScroll(ms: number) {
		document.body.style.overflow = 'hidden';
		setTimeout(() => {
			document.body.style.overflow = '';
		}, ms);
	}
	// Start cursor blinking
	let timer = startCursorBlinking();

	// Call handleScroll whenever the user scrolls
	$: if (numScrolled > numScrollsHandled) {
		handleScroll();
	}

	// // Handle iframe resizing
	// onMount(() => {
	// 	const videos = document.querySelectorAll('.video');
	// 	videos.forEach((video) => {
	// 		video.style.height = `${video.offsetWidth * 0.5625}px`;
	// 	});
	// 	window.addEventListener('resize', () => {
	// 		videos.forEach((video) => {
	// 			video.style.height = `${video.offsetWidth * 0.5625}px`;
	// 		});
	// 	});
	// });

</script>

<!-- HTML -->

<!-- Bind scrollY to the window's scrollY -->
<svelte:window bind:scrollY={scrollY} />

<!-- Cards and visuals -->
<div class="card_class grid grid-cols-2">
	<!-- Cards -->
	<div class="cards">
		<div class="super_card super_card_0">
			<div class="card card_0 sticky top-28 min-h-96 ml-4 p-4 break-words whitespace-pre-wrap animate-fadeIn">
				{@html render[0]}
			</div>
		</div>
		<div class="super_card super_card_1">
			<div class="card card_1 sticky top-28 min-h-96 mt-4 ml-4 p-4 break-words whitespace-pre-wrap">
				{@html render[1]}
			</div>
		</div>
		<div class="super_card super_card_2">
			<div class="card card_2 sticky top-28 min-h-96 mt-4 ml-4 p-4 break-words whitespace-pre-wrap opacity-0">
				{@html render[2]}
			</div>
		</div>
		<div class="super_card super_card_3">
			<div class="card card_3 sticky top-28 min-h-96 mt-4 ml-4 p-4 break-words whitespace-pre-wrap opacity-0">
				{@html render[3]}
			</div>
		</div>
		<div class="super_card super_card_4">
			<div class="card card_4 sticky top-28 min-h-96 mt-4 ml-4 p-4 break-words whitespace-pre-wrap opacity-0">
				{@html render[4]}
			</div>
		</div>
		<div class="super_card super_card_5">
			<div class="card card_5 sticky top-28 min-h-96 mt-4 ml-4 p-4 break-words whitespace-pre-wrap opacity-0">
				{@html render[5]}
			</div>
		</div>
		<div class="super_card super_card_6">
			<div class="card card_6 sticky top-28 min-h-96 mt-4 ml-4 p-4 break-words whitespace-pre-wrap opacity-0">
				{@html render[6]}
			</div>
		</div>
	</div>

	<!-- Visuals -->
	<div class="visuals">
		<div class="super_visual super_visual_0">
			<div class="visual visual_0 sticky top-28 ml-4 mr-4 animate-fadeIn">
				<img class="h-auto max-h-86.2vh rounded-lg" src="/images/professional.jpg" alt="Photo of me in fancy clothing" />
			</div>
		</div>
		<div class="super_visual super_visual_1">
			<div class="visual visual_1 sticky top-28 ml-4 mr-4 mt-4">
				<img class="h-auto max-h-86.2vh rounded-lg" src="/images/chin.jpg" alt="Me looking down at a funny angle" />
			</div>
		</div>
		<div class="super_visual super_visual_2">
			<div class="visual visual_2 sticky top-28 ml-4 mr-4 mt-4">
				<img class="h-auto max-h-86.2vh rounded-lg" src="/images/juice.jpg" alt="Me drinking from a capri sun" />
			</div>
		</div>
		<div class="super_visual super_visual_3">
			<div class="visual visual_3 sticky top-28 ml-4 mr-4 mt-4">
				<img class="h-auto max-h-86.2vh rounded-lg" src="/images/snow.jpg" alt="Playing in the snow with my family" />
			</div>
		</div>
		<div class="super_visual super_visual_4">
			<div class="visual visual_4 sticky top-28 ml-4 mr-4 mt-4 opacity-0">
				<img class="h-auto max-h-86.2vh rounded-lg" src="/images/hack_umass_2.jpg" alt="HackUMass group" />
			</div>
		</div>
		<div class="super_visual super_visual_5">
			<div class="visual visual_5 sticky top-28 ml-4 mr-4 mt-4">
				<img class="h-auto max-h-86.2vh rounded-lg" src="/images/hack_princeton.jpg" alt="HackPrinceton group" />
			</div>
		</div>
		<div class="super_visual super_visual_6">
			<div class="visual visual_6 sticky top-28 ml-4 mr-4 mt-4 opacity-0">
				<img class="h-auto max-h-86.2vh rounded-lg" src="/images/wizard.jpg" alt="Me wearing a wizard hat" />
			</div>
		</div>
		<div class="super_visual super_visual_7">
			<div class="visual visual_7 sticky top-28 ml-4 mr-4 mt-4 opacity-0">
				<img class="h-auto max-h-86.2vh rounded-lg" src="/images/personal_web_wireframe.jpg" alt="Personal website wireframe" />
			</div>
		</div>
		<div class="super_visual super_visual_8">
			<div class="visual visual_8 sticky video top-28 ml-4 mr-4 mt-4 overflow-hidden opacity-0">
				<iframe class="h-96 w-full rounded-lg" src="https://www.youtube.com/embed/C0lpYQtMhu8?si=BwRp5bTAGB2_TKlG" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
			</div>
		</div>
	</div>
</div>

<!--Styles-->
<style lang="postcss">
	/* Card lengths */
	.super_card_0 {
		height: calc(3000px + 16px);
	}
	.super_card_1 {
		height: calc(3000px + 16px);
	}
	.super_card_2 {
		height: calc(3000px + 16px)
	}
	.super_card_3 {
		height: calc(3000px + 8px);
	}
	.super_card_4 {
		height: 3000px;
	}
	.super_card_5 {
		height: 6000px;
	}
	.super_card_6 {
		height: 3000px;
	}

	/* Visual lengths */
	.super_visual_0 {
		height: 1500px;
	}
	.super_visual_1 {
		height: 1500px;
	}
	.super_visual_2 {
		height: 1500px;
	}
	.super_visual_3 {
		height: 1500px;
	}
	.super_visual_4 {
		height: 1500px;
	}
	.super_visual_5 {
		height: 1500px;
	}
	.super_visual_6 {
		height: 3000px;
	}
	.super_visual_7 {
		height: 3000px;
	}
	.super_visual_8 {
		height: 3000px;
	}

	/* Fonts */
	@font-face {
		font-family: 'IBM Plex Mono';
		src: url('../lib/fonts/IBM Plex Mono/medium.woff2') format('woff2');
	}
	@font-face {
		font-family: 'IBM Plex Mono';
		src: url('../lib/fonts/IBM Plex Mono/semibolditalic.woff2') format('woff2');
		font-style: italic;
	}
	@font-face {
		font-family: 'IBM Plex Mono';
		src: url('../lib/fonts/IBM Plex Mono/bolditalic.woff2') format('woff2');
		font-weight: bold;
		font-style: italic;
	}
	@font-face {
		font-family: 'IBM Plex Mono';
		src: url('../lib/fonts/IBM Plex Mono/bold.woff2') format('woff2');
		font-weight: bold;
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