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
					'<div class="font-inter">' +
					'↓ Scroll to see the text ↓' +
					'</div>',
			text:
					'@<div class="font-ibm italic text-sky-600 text-6xl">@' +
					'Hallo, I\'m ' +
					'@<div class="text-rose-600">@' +
					'The Welcomer!!' +
					'@</div>' +
					'</div>' +
					'<br>' +
					'<br>' +
					'<div class="font-ibm text-sky-600 text-2xl">~@' +
					'Wanderer of systems and science!' +
					'@<div class="text-right">@' +
					'... and delving spots         ' +
					'@<br>@' +
					'... and backwoods         ' +
					'@<br>@' +
					'... and all things blue ' +
					'@<br>@',
			speed: [50, 10],
		},
		{
			initial: '',
			text:
					'@<div class="font-ibm italic text-sky-600 text-2xl">@' +
					'I\'m a CS Major at UMass Amherst graduating in December 2024 with a passion ' +
					'for exploring fields with wonderful people and inspiring works. From building recyclable plastic ' +
					'concrete, a self-designed trail kiosk, a hammock using a garden hose, and many other projects, ' +
					'I learned early on I was an engineer at heart. Creating my website to deliver groceries ' +
					'over the pandemic, I felt empowered to use software to help my friends and community. The simple ' +
					'act of creation is at the center of who I am, and connecting thousands of components to ' +
					'bring an app to life has been the most logically satisfying craft I\'ve discovered. I seek ' +
					'to master this process slowly, enjoying my journey along the way.',
			speed: [10],
		},
		{
			initial: '',
			text: '@<span style="font-style: italic;">@This @<span style="color: green;">@text@</span>@ is italicized and green. @<span style="letter-spacing: 1px;">@This part has increased letter spacing.@</span></span>@',
			speed: [20],
		},
		{
			initial: '',
			text: '@<span style="text-decoration: underline;">@This @<span style="font-size: 20px;">@text@</span>@ is underlined. @<span style="font-style: italic;">@This part is italicized.@</span></span>@',
			speed: [5],
		},
		{
			initial: '',
			text: '@<span style="font-size: 20px;">@This text is 20px in size. @<span style="color: blue; text-transform: uppercase;">@This part is blue and uppercase.@</span></span>@',
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
				if (render[currentCard].slice(-4) === '<br>') {
					render[currentCard] += '<br>';
				}
			} else {
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
						let thinksCurrentCard = parseInt(entry.target.classList[0][5]) + 1;
						if (thinksCurrentCard > currentCard) {
							printing = true;
							charsPrinted = 0;
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
					let thinksCurrentVisual = parseInt(entry.target.classList[0].slice(7)) + 1;
					if (thinksCurrentVisual > currentVisual) {
						currentVisual++;
						if (entry.target.classList.contains('opacity-0')) {
							entry.target.classList.remove('opacity-0');
							entry.target.classList.add('animate-fadeIn');
						}
					}
				}
			}
		);
		visuals.forEach((visual) => {
			visualObserver.observe(visual);
		});
	});

	// Start cursor blinking
	let timer = startCursorBlinking();

	// Call handleScroll whenever the user scrolls
	$: if (numScrolled > numScrollsHandled) {
		handleScroll();
		console.log('numScrolled:', numScrolled, 'numScrollsHandled:', numScrollsHandled);
	}
</script>

<!-- HTML -->

<!-- Bind scrollY to the window's scrollY -->
<svelte:window bind:scrollY={scrollY} />

<!-- Cards and visuals -->
<div class="card_0 card_class grid grid-cols-2 gap-4">
	<!-- Cards -->
	<div class="cards">
		<div class="super_card">
			<div class="card_container">
				<div class="card card_0 sticky top-28 min-h-96 ml-4 p-4 w-full animate-fadeIn break-words">
					{@html render[0]}
				</div>
			</div>
		</div>
		<div class="super_card">
			<div class="card_container">
				<div class="card card_1 sticky top-28 min-h-96 ml-4 p-4 w-full opacity-0 break-words">
					{@html render[1]}
				</div>
			</div>
		</div>
	</div>
	<!-- Visuals -->
	<div class="visuals">
		<div class="super_visual">
			<div class="visual_container mb-4">
				<div class="visual sticky top-24 p-4 animate-fadeIn">
					<img class="h-auto max-h-screen rounded-lg" src="/images/chin.jpeg" alt="Chin" />
				</div>
			</div>
		</div>
		<div class="super_visual">
			<div class="visual_container mb-4">
				<div class="visual sticky top-24 p-4 opacity-0">
					<img class="h-auto max-h-screen rounded-lg" src="/images/juice.jpeg" alt="Juice" />
				</div>
			</div>
		</div>
		<div class="super_visual">
			<div class="visual_container mb-4">
				<div class="visual sticky top-24 p-4">
					<img class="h-auto max-h-screen rounded-lg" src="/images/snow.jpeg" alt="Snow" />
				</div>
			</div>
		</div>
		<div class="super_visual">
			<div class="visual_container mb-4">
				<div class="visual sticky top-24 p-4 opacity-0">
					<img class="h-auto max-h-screen rounded-lg" src="/images/phil.jpeg" alt="Philmont" />
				</div>
			</div>
		</div>
	</div>
</div>

<!--Styles-->
<style lang="postcss">
	// Card lengths
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

	// Visual lengths
	.visual_container {
		height: 180vh;
	}

	// Fonts
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