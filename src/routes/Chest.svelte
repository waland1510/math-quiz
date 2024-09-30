<script>
	export let isQuizCompleted = false;
	let emojis = ['🎉', '🎈', '✨', '🎊', '💥'];	
    /**
	 * @type {any[]}
	 */
	let fireworks = [];
	let showEmoji = false;

	const triggerFireworks = () => {
		const colors = ['#FF5733', '#33FF57', '#3357FF', '#FF33A8', '#FFC300']; // Bright colors for fireworks
		for (let i = 0; i < 10; i++) {
			setTimeout(() => {
				const x = Math.random() * 100; // Random x position percentage
				const y = Math.random() * 100; // Random y position percentage
				const color = colors[i % colors.length]; // Cycle through colors
				fireworks.push({ id: Date.now() + i, x, y, color });
				setTimeout(() => {
					fireworks = fireworks.filter(firework => firework.id !== (Date.now() + i));
				}, 2000); // Adjust timeout to match animation duration
			}, i * 250); // Reduced delay to fit more fireworks in a shorter time
		}
	};

	$: if (isQuizCompleted) {
		showEmoji = true;
		triggerFireworks();
	}
</script>

<div class="box">
	<div class="face top">
		<div class="top-1"></div>
		<div class="top-2"></div>
	</div>
	<div class="face bottom"></div>
	<div class="face back"></div>
	<div class="face front"></div>
	<div class="face left"></div>
	<div class="face right"></div>

	{#if showEmoji}
		<div class="emoji">{emojis[Math.floor(Math.random() * emojis.length)]}</div>
	{/if}
</div>

{#each fireworks as firework (firework.id)}
	<div class="firework" style="top: {firework.y + 20}%; left: {firework.x}%; background-color: {firework.color};"></div>
{/each}

<style>
	.box {
		--size: 100px;
		--strip-size: 20px;
		--strip-color: #ff8087;

		width: var(--size);
		aspect-ratio: 1;
		transform-origin: 50px bottom -50px;
        transform: rotateX(-30deg) rotateY(45deg);
		position: relative;
		transform-style: preserve-3d;
		margin-top: 50px; /* Added margin to create space above the box */
	}

	.face {
		position: absolute;
		width: var(--size);
		aspect-ratio: 1;
		background-color: hsl(256, 100%, var(--opacity));
		transform-style: preserve-3d;
	}

	.face.front {
		--opacity: 66%;
	}

	.face.bottom {
		--opacity: 66%;
		top: 100%;
		transform-origin: top;
		transform: rotateX(-90deg);
	}

	.face.top {
		--opacity: 74%;
		bottom: 100%;
		background-color: unset;
		transform-origin: bottom;
		transform: rotateX(90deg);
		display: grid;
		grid-template-rows: 1fr 1fr;
	}

	.top-1,
	.top-2 {
		position: relative;
		background-color: hsl(256, 100%, var(--opacity));
	}

	.top-1::after,
	.top-2::after {
		content: '';
		position: absolute;
		height: calc(var(--strip-size) / 2);
		width: 100%;
		background-color: var(--strip-color);
	}

	.top-1::after {
		bottom: 0;
	}

	.top-2::after {
		top: 0;
	}

	.top-1 {
		transform-origin: top;
		animation: open-1 3s linear forwards;
	}

	.top-2 {
		transform-origin: bottom;
		animation: open-2 3s linear forwards;
	}

	.face.back {
		--opacity: 78%;
		bottom: 200%;
		transform-origin: center 150px -50px;
		transform: rotateX(180deg);
	}

	.face.right {
		--opacity: 70%;
		left: 100%;
		transform-origin: left;
		transform: rotateY(90deg);
	}

	.face.left {
		--opacity: 70%;
		right: 100%;
		transform-origin: right;
		transform: rotateY(-90deg);
	}

	.face.left::after,
	.face.right::after {
		content: '';
		position: absolute;
		left: 50%;
		transform: translateX(-50%);
		background-color: var(--strip-color);
		width: var(--strip-size);
		height: var(--strip-size);
	}

	@keyframes rotate {
		from {
			transform: rotate(0);
		}
		to {
			transform: rotateY(360deg);
		}
	}

	@keyframes open-1 {
		from {
			transform: rotateX(0);
		}
		80% {
			transform: rotateX(160deg);
		}
		to {
			transform: rotateX(160deg); 
		}
	}

	@keyframes open-2 {
		from {
			transform: rotateX(0);
		}
		80% {
			transform: rotateX(-160deg);
		}
		to {
			transform: rotateX(-160deg);
		}
	}

	.emoji {
		position: absolute;
		top: -100%; /* Adjusted to be relative to the new top space */
		left: 0;
		transform: translate(-50%, 0%) scale(1);
		font-size: 2rem;
		animation: popUp 3.5s ease-in-out;
		animation-fill-mode: forwards;
	}

	@keyframes popUp {
		0% {
			transform: translate(-50%, 100%) scale(1);
			opacity: 0;
		}
		50% {
			transform: translate(-50%, -50%) scale(1.5);
			opacity: 1;
		}
		100% {
			transform: translate(-50%, -50%) scale(1);
			opacity: 1;
		}
	}

	.firework {
		position: absolute;
		width: 15px; 
		height: 15px; 
		border-radius: 50%;
		animation: explode 2s ease-out forwards;
		opacity: 0.8;
		transform: translate(-50%, -50%);
	}

	@keyframes explode {
		0% {
			transform: scale(1) translate(-50%, -50%);
			opacity: 1;
		}
		100% {
			transform: scale(4) translate(-50%, -50%);
			opacity: 0; 
		}
	}
</style>
