<script>
	let rawNumScrolled = 0;
	let lastNumScrolled = 0;
	$: numScrolled = Math.floor(rawNumScrolled / 6);
	$: if (numScrolled > lastNumScrolled) {
		for (let i = lastNumScrolled; i < numScrolled; i++) {
			const pipe = document.createElement('div');
			pipe.innerHTML = '|';
			document.getElementById('append_pipes').appendChild(pipe);
		}
		lastNumScrolled = numScrolled;
	}
</script>

<div id="scroll-detection" on:wheel={() => rawNumScrolled++}>
	<div id="append_pipes"></div>
	<div id="num-scrolled">{numScrolled}</div>
</div>
<style>
	#scroll-detection {
		display: flex;
		flex-direction: column;
		align-items: left;
		justify-content: left;
		height: 200vh;
	}
	#num-scrolled {
		font-size: 2em;
	}
</style>