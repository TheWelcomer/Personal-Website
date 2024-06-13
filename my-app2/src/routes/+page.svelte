<script>
	const timerInterval = 515;
	const initalNumberOfChars = 0;
	const scrollIncrement = 0.488;
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
		'\t\t\t\t(from hat to toe I am a full 32px tall)</pre><br>'
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
	<button class="btn btn-primary">
		daisyUI Button
	</button>
	<div class="card bg-base-200 w-80">
  <div class="card-body">
    <input placeholder="Email" class="input input-bordered" />
    <label class="label cursor-pointer">
      Accept terms of use
      <input type="checkbox" class="toggle" />
    </label>
    <label class="label cursor-pointer">
      Submit to newsletter
      <input type="checkbox" class="toggle" />
    </label>
    <button class="btn btn-neutral">Save</button>
  </div>
</div>
	<div id="append_pipes">
		<pre>
			{@html render}
		</pre>
	</div>
	<div id="num_scrolled">{numScrolled}</div>
	<div id="scroll">{scrollY}</div>
</div>
<style>
	:global(.main::-webkit-scrollbar) {
		width: 0.25rem
	}
	:global(.main::-webkit-scrollbar-track) {
		background: #1e1e24;
	}
	:global(.main::-webkit-scrollbar-thumb) {
		color: #93CAED
	}
  :global(body) {
    background-color: #00003a;
    color: #8084ff;
    transition: background-color 0.3s;
  }
	#view {
		display: flex;
		flex-direction: column;
		align-items: left;
		justify-content: left;
		height: 10000vh;
	}
  #num_scrolled {
		font-size: 2em;
	}
</style>