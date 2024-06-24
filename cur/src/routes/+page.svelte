<script lang="ts">
	import { onMount } from 'svelte';
	import '../app.postcss';
	const TIMER_INTERVAL = 515;
	const TO_PRINT = [
		{
			text: 'Hello, World!',
			speed: 1
		},
		{
			text: 'I am a software engineer.',
			speed: 2
		},
		{
			text: 'There was a house in new orleanes. They call the rising sun.',
			speed: 3
		},
		{
			text: 'And it\'s been the ruin of many young men. And God, I know I\'m one. My mother was a tailor. She sewed my new blue jeans. My father was a gambling man. Down in New Orleans.',
			speed: 4
		},
		{
			text: 'Now the only thing a gambler needs is a suitcase and a trunk. And the only time he\'s satisfied is when he\'s on a drunk.',
			speed: 5
		},
		{
			text: 'Oh mother, tell your children not to do what I have done. Spend your lives in sin and misery in the house of the rising sun.',
			speed: 6
		},
		{
			text: 'Well, I got one foot on the platform. The other foot on the train. I\'m going back to New Orleans to wear that ball and chain.',
			speed: 7
		},
		{
			text: 'Well, there is a house in New Orleans. They call the rising sun.',
			speed: 8
		},
		{
			text: 'And it\'s been the ruin of many young men. And God, I know I\'m one.',
			speed: 9
		},
	]
	const ASCII = '<pre>        .n.                     |<br>' +
			'       /___\\          _.---.  \\ _ /<br>' +
			'       [|||]         (_._ ) )--;_) =-<br>' +
			'       [___]           \'---\'.__,\' \\<br>' +
			'       }-=-{                    |<br>' +
			'       |-" |<bnr>' +
			'       |.-"|                p<br>' +
			'~^=~^~-|_.-|~^-~^~ ~^~ -^~^~|\\ ~^-~^~-<br>' +
			'^   .=.| _.|__  ^       ~  /| \\<br>' +
			' ~ /:. \\" _|_/\\    ~      /_|__\\  ^<br>' +
			'.-/::.  |   |""|-._    ^   ~~~~<br>' +
			'  `===-\'-----\'""`  \'-.              ~<br>' +
			'                 __.-\'      ^<br>' +
			'</pre><br>';
	const handleScroll = async () => {
		clearInterval(timer);
		if (numScrolled > numScrollsHandled) {
			for (let i = 0; i < numScrolled - numScrollsHandled; i++) {
				if (render[currentCard][render[currentCard].length - 1] === '▋') {
					render[currentCard] = render[currentCard].slice(0, -1);
				}
				render[currentCard] += ASCII[numScrollsHandled % ASCII.length];
				render[currentCard] += '▋'
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
	let timer = startCursorBlinking();
	$: if (numScrolled !== numScrollsHandled) {
		handleScroll();
		console.log('numScrolled:', numScrolled, 'numScrollsHandled:', numScrollsHandled);
	}
</script>

<svelte:window bind:scrollY={scrollY} />
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