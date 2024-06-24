<script lang="ts">
	import { onMount } from 'svelte';
	import '../app.postcss';
	const TIMER_INTERVAL = 515;
	const TO_PRINT = [
		{
			initial: '',
			text: '@<span style="color: red; font-size: 18px;">@This @<span style="font-weight: bold;">@text@</span>@ is red, 18px in size, and bold.@</span>@',
			speed: 10,
			handled: 0
		},
		{
			initial: '',
			text: '@<span style="font-weight: bold;">@This text is bold. @<span style="text-decoration: underline; background-color: lightgray;">@This part has underline and a light gray background.@</span></span>@',
			speed: 15,
			handled: 0
		},
		{
			initial: '',
			text: '@<span style="font-style: italic;">@This @<span style="color: green;">@text@</span>@ is italicized and green. @<span style="letter-spacing: 1px;">@This part has increased letter spacing.@</span></span>@',
			speed: 20,
			handled: 0
		},
		{
			initial: '',
			text: '@<span style="text-decoration: underline;">@This @<span style="font-size: 20px;">@text@</span>@ is underlined. @<span style="font-style: italic;">@This part is italicized.@</span></span>@',
			speed: 5,
			handled: 0
		},
		{
			initial: '',
			text: '@<span style="font-size: 20px;">@This text is 20px in size. @<span style="color: blue; text-transform: uppercase;">@This part is blue and uppercase.@</span></span>@',
			speed: 20,
			handled: 0
		},
		{
			initial: '',
			text: '@<span style="background-color: yellow;">@This @<span style="font-weight: bold;">@text@</span>@ has a yellow background. @<span style="border: 1px solid black;">@This part has a black border.@</span></span>@',
			speed: 10,
			handled: 0
		},
		{
			initial: '',
			text: '@<span style="letter-spacing: 2px;">@This @<span style="color: purple;">@text@</span>@ has increased letter spacing. @<span style="text-shadow: 1px 1px 2px black;">@This part has a text shadow.@</span></span>@',
			speed: 100,
			handled: 0
		},
		{
			initial: '',
			text: '@<span style="text-transform: uppercase;">@This @<span style="font-weight: bold;">@text@</span>@ is uppercase. @<span style="background-color: lightblue;">@This part has a light blue background.@</span></span>@',
			speed: 1,
			handled: 0
		},
		{
			initial: '',
			text: '@<span style="color: blue; font-weight: bold;">@This @<span style="text-decoration: underline; font-size: 24px;">@text@</span>@ is blue, bold, underlined, and 24px in size.@</span>@',
			speed: 10,
			handled: 0
		},
	]
	const handleScroll = async () => {
		if (!printing) {
			return;
		}
		clearInterval(timer);
		for (let i = 0; i < numScrolled - numScrollsHandled; i++) {
			if (render[currentCard][render[currentCard].length - 1] === '▋') {
				render[currentCard] = render[currentCard].slice(0, -1);
			}
			if (TO_PRINT[currentCard].handled >= TO_PRINT[currentCard].text.length) {
				printing = false;
				break;
			}
			if (TO_PRINT[currentCard].text[TO_PRINT[currentCard].handled] === '@') {
				TO_PRINT[currentCard].handled++;
				while (TO_PRINT[currentCard].text[TO_PRINT[currentCard].handled] !== '@') {
					render[currentCard] += TO_PRINT[currentCard].text[TO_PRINT[currentCard].handled];
					TO_PRINT[currentCard].handled++;
				}
				TO_PRINT[currentCard].handled++;
				break;
			}
			render[currentCard] += TO_PRINT[currentCard].text[TO_PRINT[currentCard].handled];
			render[currentCard] += '▋'
			TO_PRINT[currentCard].handled++;
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
	$: numScrolled = Math.floor(scrollY / TO_PRINT[currentCard].speed);
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
						currentCard = thinksCurrentCard;
						numScrolled = Math.floor(scrollY / TO_PRINT[currentCard].speed);
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
<iframe frameborder="0" src="https://itch.io/embed/2792618" width="552" height="167"><a href="https://dwinkelmanumassedu.itch.io/pacman-clone-starter">Pacman Clone Starter by dwinkelman@umass.edu</a></iframe>
<div id="view">
	<div class="card_div">
		<div class="card1 sticky top-28 h-96 card p-4 m-4">
			<div class="text1 text">
				{@html render[0]}
			</div>
			<div class="visual1 visual">

			</div>
		</div>
	</div>
	<div class="card_div">
		<div class="card2 sticky top-28 h-96 card p-4 m-4">
			<div class="text1 text">
				{@html render[1]}
			</div>
			<div class="visual1 visual">

			</div>
		</div>
	</div>
	<div class="card_div">
		<div class="card3 sticky top-28 h-96 card p-4 m-4">
			<div class="text1 text">
				{@html render[2]}
			</div>
			<div class="visual1 visual">

			</div>
		</div>
	</div>
	<div class="card_div">
		<div class="card4 sticky top-28 h-96 card p-4 m-4">
			<div class="text1 text">
				{@html render[3]}
			</div>
			<div class="visual1 visual">

			</div>
		</div>
	</div>
	<div class="card_div">
		<div class="card5 sticky top-28 h-96 card p-4 m-4">
			<div class="text1 text">
				{@html render[4]}
			</div>
			<div class="visual1 visual">

			</div>
		</div>
	</div>
	<div class="card_div">
		<div class="card6 sticky top-28 h-96 card p-4 m-4">
			<div class="text1 text">
				{@html render[5]}
			</div>
			<div class="visual1 visual">

			</div>
		</div>
	</div>
	<div class="card_div">
		<div class="card7 sticky top-28 h-96 card p-4 m-4">
			<div class="text1 text">
				{@html render[6]}
			</div>
			<div class="visual1 visual">

			</div>
		</div>
	</div>
	<div class="card_div">
		<div class="card8 sticky top-28 h-96 card p-4 m-4">
			<div class="text1 text">
				{@html render[7]}
			</div>
			<div class="visual1 visual">

			</div>
		</div>
	</div>
	<div class="card_div">
		<div class="card9 sticky top-28 h-96 card p-4 m-4">
			<div class="text1 text">
				{@html render[8]}
			</div>
			<div class="visual1 visual">

			</div>
		</div>
	</div>
</div>
<style lang="postcss">
	#view {
		height: 2000vh;
	}
	.card_div {
		height: 200vh;
	}
	.card_div.isSticky {
		background-color: #000000;
	}
</style>