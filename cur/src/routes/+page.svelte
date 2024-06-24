<script lang="ts">
	import { onMount } from 'svelte';
	import '../app.postcss';
	const TIMER_INTERVAL = 515;
	const TO_PRINT = [
		{
			initial: '',
			text: '@<span style="color:blue">@Hello, World!@</span><span style="color:yellow">@My name is donald winkelman!@</span>',
			speed: 20,
			handled: 0
		},
		{
			initial: '',
			text: 'I am a software engineer.',
			speed: 30,
			handled: 0
		},
		{
			initial: '',
			text: 'There was a house in new orleanes. They call the rising sun.',
			speed: 3,
			handled: 0
		},
		{
			initial: '',
			text: 'And it\'s been the ruin of many young men. And God, I know I\'m one. My mother was a tailor. She sewed my new blue jeans. My father was a gambling man. Down in New Orleans.',
			speed: 4,
			handled: 0
		},
		{
			initial: '',
			text: 'Now the only thing a gambler needs is a suitcase and a trunk. And the only time he\'s satisfied is when he\'s on a drunk.',
			speed: 5,
			handled: 0
		},
		{
			initial: '',
			text: 'Oh mother, tell your children not to do what I have done. Spend your lives in sin and misery in the house of the rising sun.',
			speed: 6,
			handled: 0
		},
		{
			initial: '',
			text: 'Well, I got one foot on the platform. The other foot on the train. I\'m going back to New Orleans to wear that ball and chain.',
			speed: 7,
			handled: 0
		},
		{
			initial: '',
			text: 'Well, there is a house in New Orleans. They call the rising sun.',
			speed: 8,
			handled: 0
		},
		{
			initial: '',
			text: 'And it\'s been the ruin of many young men. And God, I know I\'m one.',
			speed: 9,
			handled: 0
		},
	]
	const handleScroll = async () => {
		clearInterval(timer);
		if (numScrolled > numScrollsHandled) {
			for (let i = 0; i < numScrolled - numScrollsHandled; i++) {
				if (render[currentCard][render[currentCard].length - 1] === '▋') {
					render[currentCard] = render[currentCard].slice(0, -1);
				}
				if (TO_PRINT[currentCard].handled >= TO_PRINT[currentCard].text.length) {
					return;
				}
				if (TO_PRINT[currentCard].text[TO_PRINT[currentCard].handled] === '@') {
					TO_PRINT[currentCard].handled++;
					while (TO_PRINT[currentCard].text[TO_PRINT[currentCard].handled] !== '@') {
						if (TO_PRINT[currentCard].handled >= TO_PRINT[currentCard].text.length) {
							return;
						}
						render[currentCard] += TO_PRINT[currentCard].text[TO_PRINT[currentCard].handled];
						TO_PRINT[currentCard].handled++;
					}
					TO_PRINT[currentCard].handled++;
				}
				render[currentCard] += TO_PRINT[currentCard].text[TO_PRINT[currentCard].handled];
				render[currentCard] += '▋'
				TO_PRINT[currentCard].handled++;
				numScrollsHandled++;
			}
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
	onMount(() => {
		const cards = document.querySelectorAll('.card');
		const observer = new IntersectionObserver(
			([entry]) => {
				if (entry.boundingClientRect.top < 0) {
					let thinksCurrentCard = parseInt(entry.target.classList[0][4]);
					if (thinksCurrentCard > currentCard) {
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
	$: if (numScrolled !== numScrollsHandled) {
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