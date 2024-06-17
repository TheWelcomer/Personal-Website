<script lang="ts">
	import '../app.postcss';
	const timerInterval = 515;
	const initalNumberOfChars = 0;
	const scrollIncrement = 0.72;
	const handleScroll = async () => {
		clearInterval(timer);
		if (numScrolled > numScrollsHandled) {
			for (let i = 0; i < numScrolled - numScrollsHandled; i++) {
				if (render[render.length - 1] === '▋') {
					render = render.slice(0, -1);
				}
				render += ascii[numScrollsHandled % ascii.length];
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
		}, timerInterval);
	}
	let ascii = '<pre>        .n.                     |<br>' +
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
		'<br>' +
		'LET’S BUILD A LIGHTHOUSE!!!!!!!!!!!!!!<br>' +

		'\t\t\t\toriginal scaling is 32x32 pixels<br>' +
		'\t\t\t\t(from hat to toe I am a full 32px tall)</pre><br>'
	let render = '▋';
	let scrollY = 0;
	$: numScrolled = Math.floor(scrollY / scrollIncrement) + initalNumberOfChars;
	let numScrollsHandled = 0;
	let timer = startCursorBlinking();
	$: if (numScrolled !== numScrollsHandled) {
		handleScroll();
	}
</script>

<svelte:window bind:scrollY={scrollY} />

	<pre>
		{@html render}
	</pre>