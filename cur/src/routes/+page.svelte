<script lang="ts">
	import { onMount } from 'svelte';
	import '../app.postcss';
	const TIMER_INTERVAL = 515;
	const INITIAL_NUMBER_OF_CHARS = 0;
	const SCROLL_INCREMENT = 0.5;
	const toPrint = [
		{
			text: 'Hello, World!',
			speed: .1
		},
		{
			text: 'I am a software engineer.',
			speed: .15
		},
		{
			text: 'There was a house in new orleanes. They call the rising sun.',
			speed: .2
		},
		{
			text: 'And it\'s been the ruin of many young men. And God, I know I\'m one. My mother was a tailor. She sewed my new blue jeans. My father was a gambling man. Down in New Orleans.',
			speed: .25
		},
		{
			text: 'Now the only thing a gambler needs is a suitcase and a trunk. And the only time he\'s satisfied is when he\'s on a drunk.',
			speed: .3
		},
		{
			text: 'Oh mother, tell your children not to do what I have done. Spend your lives in sin and misery in the house of the rising sun.',
			speed: .35
		},
		{
			text: 'Well, I got one foot on the platform. The other foot on the train. I\'m going back to New Orleans to wear that ball and chain.',
			speed: .4
		},
		{
			text: 'Well, there is a house in New Orleans. They call the rising sun.',
			speed: .45
		},
		{
			text: 'And it\'s been the ruin of many young men. And God, I know I\'m one.',
			speed: .5
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
				if (render[render.length - 1] === '▋') {
					render = render.slice(0, -1);
				}
				render += ASCII[numScrollsHandled % ASCII.length];
				render += '▋'
				numScrollsHandled++;
			}
		}
		if (numScrolled < numScrollsHandled) {
			for (let i = 0; i < numScrollsHandled - numScrolled; i++) {
				if (render[render.length - 1] === '▋') {
					render = render.slice(0, -1);
				}
				render = render.slice(0, -1);
				numScrollsHandled--;
			}
		}
		timer = startCursorBlinking();
	}
	const startCursorBlinking = () => {
		return setInterval(() => {
			if (render.slice(-8) === '<br><br>') {
				render = render.slice(0, -4);
			}
			if (render[render.length - 1] === '▋') {
				render = render.slice(0, -1);
				if (render.slice(-4) === '<br>') {
					render += '<br>';
				}
			} else {
				render += '▋';
			}
		}, TIMER_INTERVAL);
	}
	let render = '▋';
	let scrollY = 0;
	$: numScrolled = Math.floor(scrollY / SCROLL_INCREMENT) + INITIAL_NUMBER_OF_CHARS;
	let numScrollsHandled = 0;
	onMount(() => {
		const cards = document.querySelectorAll('.card');
		const observer = new IntersectionObserver(
			([entry]) => {
				if (entry.boundingClientRect.top < 0) {
					console.log(entry.target.classList[0]);
				}
			}
		);
		cards.forEach((card) => {
			observer.observe(card);
		});
	});
	let timer = startCursorBlinking();
	$: if (numScrolled !== numScrollsHandled) {
		handleScroll();
	}
</script>

<svelte:window bind:scrollY={scrollY} />
<div id="view">
	<div class="card1 card_div">
		<div class="sticky top-28 h-96 card p-4 m-4">
			<div class="text1 text">

			</div>
			<div class="visual1 visual">

			</div>
		</div>
	</div>
	<div class="card2 card_div">
		<div class="sticky top-28 h-96 card p-4 m-4">
		</div>
	</div>
	<div class="card3 card_div">
		<div class="sticky top-28 h-96 card p-4 m-4">
		</div>
	</div>
	<div class="card4 card_div">
		<div class="sticky top-28 h-96 card p-4 m-4">
		</div>
	</div>
	<div class="card5 card_div">
		<div class="sticky top-28 h-96 card p-4 m-4">
		</div>
	</div>
	<div class="card6 card_div">
		<div class="sticky top-28 h-96 card p-4 m-4">
		</div>
	</div>
	<div class="card7 card_div">
		<div class="sticky top-28 h-96 card p-4 m-4">
		</div>
	</div>
	<div class="card8 card_div">
		<div class="sticky top-28 h-96 card p-4 m-4">
		</div>
	</div>
	<div class="card9 card_div">
		<div class="sticky top-28 h-96 card p-4 m-4">
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