<script>
	const timerInterval = 515;
	const initalNumberOfChars = 10;
	const scrollIncrement = 0.444;
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
		'\t\t\t\tlook it’s us <):)<br>' +
		'\t\t\t\toriginal scaling is 32x32 pixels<br>' +
		'\t\t\t\t(from hat to toe I am a full 32px tall)<br></pre>'
	let render = '|<br>|<br>|<br>|<br>|<br>|<br>|<br>|<br>|<br>|<br>|<br>|<br>|<br>|<br>|<br>|<br>▋';
	let scrollY = 0;
	$: numScrolled = Math.floor(scrollY / scrollIncrement) + initalNumberOfChars;
	let numScrollsHandled = 0;
	let timer = startCursorBlinking();
	$: if (numScrolled > numScrollsHandled) {
		handleScroll();
	}
</script>
<svelte:window bind:scrollY={scrollY} />
<div id="view">
	<div id="append_pipes">
		{@html render}
	</div>
	<div id="num_scrolled">{numScrolled}</div>
	<div id="scroll">{scrollY}</div>
</div>
<style>
  :global(body) {
    background-color: #00003a;
    color: #8084ff;
    transition: background-color 0.3s
  }
	#view {
		display: flex;
		flex-direction: column;
		align-items: left;
		justify-content: left;
		height: 100000vh;
	}
	#cursor {
		font-size: 2em;
	}
  #num_scrolled {
		font-size: 2em;
	}
</style>