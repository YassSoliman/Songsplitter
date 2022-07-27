import lottieWeb from 'https://cdn.skypack.dev/lottie-web';
$(function () {
	let raf = null;
	const whilePlaying = () => {
		//seekSlider.value = Math.floor(audioMelody.currentTime);
		//currentTimeContainer.textContent = calculateTime(seekSlider.value);
		raf = requestAnimationFrame(whilePlaying);
	}

	const playIconContainer = document.getElementById('play-icon');
	//const seekSlider = document.getElementById('seek-slider');

	let playState = 'play';

	const playAnimation = lottieWeb.loadAnimation({
		container: playIconContainer, path: 'https://assets3.lottiefiles.com/packages/lf20_mznhkrrb.json',
		renderer: 'svg',
		loop: false,
		autoplay: false,
		name: "Play Animation",
	});

	playAnimation.goToAndStop(0, true);

	playIconContainer.addEventListener('click', () => {
		const sound = new Howl({
			src: [$('#audio-melody').attr("src")]
		});
		sound.play();
		if (playState === 'play') {
			playAnimation.goToAndStop(13, true);
			requestAnimationFrame(whilePlaying);
			playState = 'pause';
		} else {
			playAnimation.goToAndStop(0, true);
			cancelAnimationFrame(raf);
			playState = 'play';
		}
	});

});