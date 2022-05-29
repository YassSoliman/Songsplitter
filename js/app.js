/** Implementation of the presentation of the audio player */
import lottieWeb from 'https://cdn.skypack.dev/lottie-web';
$(function () {
	$(".switch-vocals").on("touchstart mousedown", function (e) {
		e.preventDefault();
		$(this).css({
			top: '5px',
			filter: 'drop-shadow(0px 0px 1px rgba(0, 0, 0, 0.25))',
			WebkitTransition: 'All 250ms ease',
			MozTransition: 'All 250ms ease',
			MsTransition: 'All 250ms ease',
			OTransition: 'All 250ms ease',
			transition: 'All 250ms ease'
		});
		$(".visuals-vocals").attr('style', 'background: radial-gradient(50% 50% at 50% 50%, #C0C0C0 0%, rgba(208, 208, 208, 0) 100%)');

		audioVocals.volume = 0;
	});

	$(".switch-vocals").on("touchend mouseup", function (e) {
		e.preventDefault();
		$(this).css({
			top: '0px',
			filter: 'drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25))',
			WebkitTransition: 'All 250ms ease',
			MozTransition: 'All 250ms ease',
			MsTransition: 'All 250ms ease',
			OTransition: 'All 250ms ease',
			transition: 'All 250ms ease'
		});
		$(".visuals-vocals").attr('style', 'background: radial-gradient(50% 50% at 50% 50%, #67CE67 0%, rgba(103, 206, 103, 0) 100%)');
		audioVocals.volume = $("#slider-vocals").slider("option", "value") / 100;
	});

	$(".switch-melody").on("touchstart mousedown", function (e) {
		e.preventDefault();
		$(this).css({
			top: '5px',
			filter: 'drop-shadow(0px 0px 1px rgba(0, 0, 0, 0.25))',
			WebkitTransition: 'All 250ms ease',
			MozTransition: 'All 250ms ease',
			MsTransition: 'All 250ms ease',
			OTransition: 'All 250ms ease',
			transition: 'All 250ms ease'
		});
		$(".visuals-melody").attr('style', 'background: radial-gradient(50% 50% at 50% 50%, #C0C0C0 0%, rgba(208, 208, 208, 0) 100%)');
		audioMelody.volume = 0;
	});

	$(".switch-melody").on("touchend mouseup", function (e) {
		e.preventDefault();
		$(this).css({
			top: '0px',
			filter: 'drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25))',
			WebkitTransition: 'All 250ms ease',
			MozTransition: 'All 250ms ease',
			MsTransition: 'All 250ms ease',
			OTransition: 'All 250ms ease',
			transition: 'All 250ms ease'
		});
		$(".visuals-melody").attr('style', 'background: radial-gradient(50% 50% at 50% 50%, #67CE67 0%, rgba(103, 206, 103, 0) 100%)');
		audioMelody.volume = $("#slider-melody").slider("option", "value") / 100;
	});

	$(".switch-bass").on("touchstart mousedown", function (e) {
		e.preventDefault();
		$(this).css({
			top: '5px',
			filter: 'drop-shadow(0px 0px 1px rgba(0, 0, 0, 0.25))',
			WebkitTransition: 'All 250ms ease',
			MozTransition: 'All 250ms ease',
			MsTransition: 'All 250ms ease',
			OTransition: 'All 250ms ease',
			transition: 'All 250ms ease'
		});
		$(".visuals-bass").attr('style', 'background: radial-gradient(50% 50% at 50% 50%, #C0C0C0 0%, rgba(208, 208, 208, 0) 100%)');
		audioBass.volume = 0;
	});

	$(".switch-bass").on("touchend mouseup", function (e) {
		e.preventDefault();
		$(this).css({
			top: '0px',
			filter: 'drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25))',
			WebkitTransition: 'All 250ms ease',
			MozTransition: 'All 250ms ease',
			MsTransition: 'All 250ms ease',
			OTransition: 'All 250ms ease',
			transition: 'All 250ms ease'
		});
		$(".visuals-bass").attr('style', 'background: radial-gradient(50% 50% at 50% 50%, #67CE67 0%, rgba(103, 206, 103, 0) 100%)');
		audioBass.volume = $("#slider-bass").slider("option", "value") / 100;
	});

	$(".switch-drums").on("touchstart mousedown", function (e) {
		e.preventDefault();
		$(this).css({
			top: '5px',
			filter: 'drop-shadow(0px 0px 1px rgba(0, 0, 0, 0.25))',
			WebkitTransition: 'All 250ms ease',
			MozTransition: 'All 250ms ease',
			MsTransition: 'All 250ms ease',
			OTransition: 'All 250ms ease',
			transition: 'All 250ms ease'
		});
		$(".visuals-drums").attr('style', 'background: radial-gradient(50% 50% at 50% 50%, #C0C0C0 0%, rgba(208, 208, 208, 0) 100%)');
		audioDrums.volume = 0;
	});

	$(".switch-drums").on("touchend mouseup", function (e) {
		e.preventDefault();
		$(this).css({
			top: '0px',
			filter: 'drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25))',
			WebkitTransition: 'All 250ms ease',
			MozTransition: 'All 250ms ease',
			MsTransition: 'All 250ms ease',
			OTransition: 'All 250ms ease',
			transition: 'All 250ms ease'
		});
		$(".visuals-drums").attr('style', 'background: radial-gradient(50% 50% at 50% 50%, #67CE67 0%, rgba(103, 206, 103, 0) 100%)');
		audioDrums.volume = $("#slider-drums").slider("option", "value") / 100;
	});

	$("#slider-vocals").slider({
		orientation: "vertical",
		range: "min",
		min: 0,
		max: 100,
		value: 85,
		change: function (event, ui) {
			audioVocals.volume = ui.value / 100;
		}
	});

	$("#slider-melody").slider({
		orientation: "vertical",
		range: "min",
		min: 0,
		max: 100,
		value: 85,
		change: function (event, ui) {
			audioMelody.volume = ui.value / 100;
		}
	});

	$("#slider-bass").slider({
		orientation: "vertical",
		range: "min",
		min: 0,
		max: 100,
		value: 85,
		change: function (event, ui) {
			audioBass.volume = ui.value / 100;
		}
	});

	$("#slider-drums").slider({
		orientation: "vertical",
		range: "min",
		min: 0,
		max: 100,
		value: 85,
		change: function (event, ui) {
			audioDrums.volume = ui.value / 100;
		}
	});




	const playIconContainer = document.getElementById('play-icon');
	const audioPlayerContainer = document.getElementById('audio-player-container');
	const seekSlider = document.getElementById('seek-slider');
	var audioMelodyVolume = $("#slider-melody").slider("option", "value");
	var audioVocalsVolume = $("#slider-vocals").slider("option", "value");
	var audioBassVolume = $("#slider-bass").slider("option", "value");
	var audioDrumsVolume = $("#slider-drums").slider("option", "value");

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
			audioMelody.play();
			audioVocals.play();
			audioBass.play();
			audioDrums.play();

			audioMelody.volume = audioMelodyVolume / 100;
			audioBass.volume = audioBassVolume / 100;
			audioVocals.volume = audioVocalsVolume / 100;
			audioDrums.volume = audioDrumsVolume / 100;

			playAnimation.playSegments([0, 13], true);
			requestAnimationFrame(whilePlaying);
			playState = 'pause';
		} else {
			audioMelody.pause();
			audioVocals.pause();
			audioBass.pause();
			audioDrums.pause();
			playAnimation.playSegments([13, 0], true);
			cancelAnimationFrame(raf);
			playState = 'play';
		}
	});


	/*const showRangeProgress = (rangeInput) => {
		if (rangeInput === seekSlider) audioPlayerContainer.style.setProperty('--seek-before-width', rangeInput.value / rangeInput.max * 100 + '%');
		else audioPlayerContainer.style.setProperty('--volume-before-width', rangeInput.value / rangeInput.max * 100 + '%');
	}

	seekSlider.addEventListener('input', (e) => {
		showRangeProgress(e.target);
	});*/





	/** Implementation of the functionality of the audio player */

	const audioMelody = document.getElementById('audio-melody');
	const audioVocals = document.getElementById('audio-vocals');
	const audioBass = document.getElementById('audio-bass');
	const audioDrums = document.getElementById('audio-drums');

	const durationContainer = document.getElementById('duration');
	const currentTimeContainer = document.getElementById('current-time');
	let raf = null;

	const calculateTime = (secs) => {
		const minutes = Math.floor(secs / 60);
		const seconds = Math.floor(secs % 60);
		const returnedSeconds = seconds < 10 ? `0${seconds}` : `${seconds}`;
		return `${minutes}:${returnedSeconds}`;
	}

	const displayDuration = () => {
		durationContainer.textContent = calculateTime(audioMelody.duration);
	}

	const setSliderMax = () => {
		seekSlider.max = Math.floor(audioMelody.duration);
	}

	const whilePlaying = () => {
		seekSlider.value = Math.floor(audioMelody.currentTime);
		currentTimeContainer.textContent = calculateTime(seekSlider.value);
		raf = requestAnimationFrame(whilePlaying);
	}



	if (audioMelody.readyState > 0) {
		displayDuration();
		setSliderMax();
	} else {
		audioMelody.addEventListener('loadedmetadata', () => {
			displayDuration();
			setSliderMax();
		});
	}

	seekSlider.addEventListener('input', () => {
		currentTimeContainer.textContent = calculateTime(seekSlider.value);
		if (!audioMelody.paused) {
			cancelAnimationFrame(raf);
		}
	});

	seekSlider.addEventListener('change', () => {
		audioMelody.currentTime = seekSlider.value;
		audioVocals.currentTime = seekSlider.value;
		audioDrums.currentTime = seekSlider.value;
		audioBass.currentTime = seekSlider.value;
		if (!audioMelody.paused) {
			requestAnimationFrame(whilePlaying);
		}
	});
});

