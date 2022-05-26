/** Implementation of the presentation of the audio player */
import lottieWeb from 'https://cdn.skypack.dev/lottie-web';
$(function () {
	$("#slider-vocals").slider({
		orientation: "vertical",
		range: "min",
		min: 0,
		max: 100,
		value: 100
	});

	$("#slider-melody").slider({
		orientation: "vertical",
		range: "min",
		min: 0,
		max: 100,
		value: 85
	});

	$("#slider-bass").slider({
		orientation: "vertical",
		range: "min",
		min: 0,
		max: 100,
		value: 85
	});

	$("#slider-drums").slider({
		orientation: "vertical",
		range: "min",
		min: 0,
		max: 100,
		value: 85
	});



	const playIconContainer = document.getElementById('play-icon');
	const audioPlayerContainer = document.getElementById('audio-player-container');
	const seekSlider = document.getElementById('seek-slider');

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
		if (playState === 'play') {
			playAnimation.playSegments([0, 13], true);
			playState = 'pause';
		} else {
			playAnimation.playSegments([13, 0], true);
			playState = 'play';
		}
	});


	const showRangeProgress = (rangeInput) => {
		if (rangeInput === seekSlider) audioPlayerContainer.style.setProperty('--seek-before-width', rangeInput.value / rangeInput.max * 100 + '%');
		else audioPlayerContainer.style.setProperty('--volume-before-width', rangeInput.value / rangeInput.max * 100 + '%');
	}

	seekSlider.addEventListener('input', (e) => {
		showRangeProgress(e.target);
	});
	volumeSlider.addEventListener('input', (e) => {
		showRangeProgress(e.target);
	});





	/** Implementation of the functionality of the audio player */

	const audio = document.querySelector('audio');
	const durationContainer = document.getElementById('duration');
	const currentTimeContainer = document.getElementById('current-time');

	const calculateTime = (secs) => {
		const minutes = Math.floor(secs / 60);
		const seconds = Math.floor(secs % 60);
		const returnedSeconds = seconds < 10 ? `0${seconds}` : `${seconds}`;
		return `${minutes}:${returnedSeconds}`;
	}

	const displayDuration = () => {
		durationContainer.textContent = calculateTime(audio.duration);
	}

	const setSliderMax = () => {
		seekSlider.max = Math.floor(audio.duration);
	}

	const displayBufferedAmount = () => {
		const bufferedAmount = Math.floor(audio.buffered.end(audio.buffered.length - 1));
		audioPlayerContainer.style.setProperty('--buffered-width', `${(bufferedAmount / seekSlider.max) * 100}%`);
	}

	if (audio.readyState > 0) {
		displayDuration();
		setSliderMax();
		displayBufferedAmount();
	} else {
		audio.addEventListener('loadedmetadata', () => {
			displayDuration();
			setSliderMax();
			displayBufferedAmount();
		});
	}

	audio.addEventListener('progress', displayBufferedAmount);

	seekSlider.addEventListener('input', () => {
		currentTimeContainer.textContent = calculateTime(seekSlider.value);
	});
});

