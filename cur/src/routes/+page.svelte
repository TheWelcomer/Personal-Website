<script lang="ts">
	import { onMount } from 'svelte';
	import '../app.postcss';
	const TIMER_INTERVAL = 515;
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
			handled: 0
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
	const handleScroll = async () => {
		if (!printing) {
			return;
		}
		if (currentCard === 0 && handled === 0) {
			render[currentCard] = '';
		}
		clearInterval(timer);
		for (let i = 0; i < numScrolled - numScrollsHandled; i++) {
			if (render[currentCard][render[currentCard].length - 1] === '▋') {
				render[currentCard] = render[currentCard].slice(0, -1);
			}
			if (handled >= TO_PRINT[currentCard].text.length) {
				printing = false;
				break;
			}
			if (TO_PRINT[currentCard].text[handled] === '@') {
				handled++;
				while (TO_PRINT[currentCard].text[handled] !== '@') {
					if (TO_PRINT[currentCard].text[handled] === '~') {
						speed++;
						numScrolled = Math.floor(scrollY / TO_PRINT[currentCard].speed[speed]);
						numScrollsHandled = numScrolled;
						handled++;
						continue;
					}
					render[currentCard] += TO_PRINT[currentCard].text[handled];
					handled++;
				}
				handled++;
				break;
			}
			render[currentCard] += TO_PRINT[currentCard].text[handled];
			render[currentCard] += '▋'
			handled++;
			numScrollsHandled++;
		}
		timer = startCursorBlinking();
	}
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
	let scrollY = 0;
	let speed = 0;
	let handled = 0;
	$: numScrolled = Math.floor(scrollY / TO_PRINT[currentCard].speed[speed]);
	let numScrollsHandled = 0;
	let currentCard = 0;
	let printing = true;
	onMount(() => {
		const cards = document.querySelectorAll('.card');
		const observer = new IntersectionObserver(
			([entry]) => {
				if (entry.boundingClientRect.top < 0) {
					let thinksCurrentCard = parseInt(entry.target.classList[0][4]);
					if (thinksCurrentCard > currentCard) {
						printing = true;
						handled = 0;
						currentCard = thinksCurrentCard;
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
	let render = ['', '', '', '', '', '', '', '', ''];
	render.forEach((cardText, i) => {
		render[i] = TO_PRINT[i].initial || '';
	});
	let timer = startCursorBlinking();
	$: if (numScrolled > numScrollsHandled) {
		handleScroll();
		console.log('numScrolled:', numScrolled, 'numScrollsHandled:', numScrollsHandled);
	}
</script>
<svelte:window bind:scrollY={scrollY} />
<!--<iframe frameborder="0" src="https://itch.io/embed/2792618" width="552" height="167"><a href="https://dwinkelmanumassedu.itch.io/pacman-clone-starter">Pacman Clone Starter by dwinkelman@umass.edu</a></iframe>-->
<div class="card_1 card_class grid grid-cols-2 gap-4">
	<div class="text-container">
		<div class="text_1 sticky top-28 min-h-96 ml-4 card p-4 w-full">
			{@html render[0]}
		</div>
	</div>
	<div class="visual_list_1 visual_list top-28 min-h-96">
		<div class="visual_div_1_1 mb-4">
			<div class="visual_1_1 visual sticky top-28 p-4">
				<img class="h-auto max-w-full rounded-lg" src="../lib/images/chin.JPG" alt="Chin" />
			</div>
		</div>
		<div class="visual_div_1_2 mb-4">
			<div class="visual_1_2 visual sticky top-28 p-4">
				<img class="h-auto max-w-full rounded-lg" src="../lib/images/snow.JPG" alt="Snow" />
			</div>
		</div>
		<div class="visual_div_1_2 mb-4">
			<div class="visual_1_2 visual sticky top-28 p-4">
				<img class="h-auto max-w-full rounded-lg" src="../lib/images/juice.JPG" alt="Juice" />
			</div>
		</div>
		<div class="visual_div_1_2 mb-4">
			<div class="visual_1_2 visual sticky top-28 p-4">
				<img class="h-auto max-w-full rounded-lg" src="../lib/images/phil.JPG" alt="Philmont" />
			</div>
		</div>
	</div>
</div>
<!--<div class="">-->
<!--	<div class="card_div card_div1 inline-flex w-1/2">-->
<!--		<div class="card1 sticky top-28 min-h-96 card p-4 m-4 inline-flex w-1/2">-->
<!--			<div class="text1 text whitespace-pre-wrap">-->
<!--				{@html render[0]}-->
<!--			</div>-->
<!--		</div>-->
<!--	</div>-->
<!--	<div class="visual_div1 visual_div inline-flex w-1/2">-->
<!--		<div class="visual_1_1 visual sticky top-28 block">-->
<!--			{@html '<p>hello world</p>'}-->
<!--		</div>-->
<!--		<div class="visual_1_2 visual sticky top-28 block">-->
<!--			{@html '<p>hello world</p>'}-->
<!--		</div>-->
<!--		<div class="visual_1_3 visual sticky top-28 block">-->
<!--			{@html '<p>hello world</p>'}-->
<!--		</div>-->
<!--	</div>-->
<!--</div>-->
<div class="card_div card_div2">
	<div class="card2 sticky top-28 min-h-96 card p-4 m-4">
		<div class="text2 text whitespace-pre-wrap">
			{@html render[1]}
		</div>
		<div class="visual1 visual">

		</div>
	</div>
</div>
<div class="card_div card_div3">
	<div class="card3 sticky top-28 min-h-96 card p-4 m-4">
		<div class="text3 text whitespace-pre-wrap">
			{@html render[2]}
		</div>
		<div class="visual1 visual">

		</div>
	</div>
</div>
<div class="card_div card_div4">
	<div class="card4 sticky top-28 min-h-96 card p-4 m-4">
		<div class="text4 text whitespace-pre-wrap">
			{@html render[3]}
		</div>
		<div class="visual1 visual">

		</div>
	</div>
</div>
<div class="card_div card_div5">
	<div class="card5 sticky top-28 min-h-96 card p-4 m-4">
		<div class="text5 text whitespace-pre-wrap">
			{@html render[4]}
		</div>
		<div class="visual1 visual">

		</div>
	</div>
</div>
<div class="card_div card_div6">
	<div class="card6 sticky top-28 min-h-96 card p-4 m-4">
		<div class="text6 text whitespace-pre-wrap">
			{@html render[5]}
		</div>
		<div class="visual1 visual">

		</div>
	</div>
</div>
<div class="card_div card_div7">
	<div class="card7 sticky top-28 min-h-96 card p-4 m-4">
		<div class="text7 text whitespace-pre-wrap">
			{@html render[6]}
		</div>
		<div class="visual1 visual">

		</div>
	</div>
</div>
<div class="card_div card_div8">
	<div class="card8 sticky top-28 min-h-96 card p-4 m-4">
		<div class="text8 text whitespace-pre-wrap">
			{@html render[7]}
		</div>
		<div class="visual1 visual">

		</div>
	</div>
</div>
<div class="card_div card_div9">
	<div class="card9 sticky top-28 min-h-96 card p-4 m-4">
		<div class="text9 text whitespace-pre-wrap">
			{@html render[8]}
		</div>
		<div class="visual1 visual">

		</div>
	</div>
</div>
<style lang="postcss">
	.card_1 {
		height: 700vh;
	}
	.card_div2 {
		height: 700vh;
	}
	.card_div3 {
		height: 700vh;
	}
	.card_div4 {
		height: 700vh;
	}
	.card_div5 {
		height: 700vh;
	}
	.card_div6 {
		height: 700vh;
	}
	.card_div7 {
		height: 700vh;
	}
	.card_div8 {
		height: 700vh;
	}
	.card_div9 {
		height: 700vh;
	}
	.visual_div_1_1 {
		height: 100vh;
	}
	.visual_div_1_2 {
		height: 200vh;
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