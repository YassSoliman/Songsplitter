/** Implementation of the presentation of the audio player */
import lottieWeb from 'https://cdn.skypack.dev/lottie-web';
$(function () {
	const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
	var visuals = ['.visuals-vocals', '.visuals-melody', '.visuals-bass', '.visuals-drums'];
	var switches = ['.switch-vocals', '.switch-melody', '.switch-bass', '.switch-drums'];
	var sliders = ['#slider-vocals', '#slider-melody', '#slider-bass', '#slider-drums'];
	var switchesActive = false;

	function setAudioVolume() {
		switches.forEach(function (classStr, i) {
			audioArr[i].volume = (((($(classStr).attr('data-status') == 'pressed' && switchesActive) || (!switchesActive)) ? ($(sliders[i]).slider("option", "value") / 100) : 0));
			(audioArr[i].volume == 0) ? $(visuals[i]).attr('style', 'background: radial-gradient(50% 50% at 50% 50%, #C0C0C0 0%, rgba(208, 208, 208, 0) 100%)') : false;
		});
	}

	switches.forEach(function (classStr, i) {
		$(classStr).on("touchstart mousedown", function (e) {
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
			$(this).attr('data-status', 'pressed');
			switchesActive = true;
			setAudioVolume();
		});

		$(classStr).on("touchend mouseup", function (e) {
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
			$(this).attr('data-status', 'released');
			switchesActive = $('[data-status="pressed"]').length == 0 ? false : true;
			setAudioVolume();
		});

		$(sliders[i]).slider({
			orientation: "vertical",
			range: "min",
			min: 0,
			max: 100,
			value: 85,
			change: function (event, ui) {
				setAudioVolume();
			}
		});
	});

	var audioElementMelody, audioElementVocals, audioElementBass, audioElementDrums;
	var analyserMelody, analyserVocals, analyserBass, analyserDrums;
	let firstPlay = {
		'bass': true,
		'vocals': true,
		'drums': true,
		'melody': true
	};
	const FREQUENCY_BIN_COUNT = 128;
	const dataArray = new Uint8Array(FREQUENCY_BIN_COUNT);

	const setupAudioCtx = (audioStr) => {
		// Initialize analyser		

		switch (audioStr) {
			case 'melody':
				analyserMelody = audioCtx.createAnalyser();
				analyserMelody.fftSize = 2 * FREQUENCY_BIN_COUNT;
				// Analyser's frequencyBinCount is always half of the fftSize (https://developer.mozilla.org/en-US/docs/Web/API/AnalyserNode/frequencyBinCount)
				const sourceMelody = audioCtx.createMediaElementSource(audioElementMelody);
				// Connect source -> analyser -> destination
				sourceMelody.connect(analyserMelody);
				analyserMelody.connect(audioCtx.destination);
				break;
			case 'bass':
				analyserBass = audioCtx.createAnalyser();
				analyserBass.fftSize = 2 * FREQUENCY_BIN_COUNT;
				// Analyser's frequencyBinCount is always half of the fftSize (https://developer.mozilla.org/en-US/docs/Web/API/AnalyserNode/frequencyBinCount)
				const sourceBass = audioCtx.createMediaElementSource(audioElementBass);
				// Connect source -> analyser -> destination
				sourceBass.connect(analyserBass);
				analyserBass.connect(audioCtx.destination);
				break;
			case 'drums':
				analyserDrums = audioCtx.createAnalyser();
				analyserDrums.fftSize = 2 * FREQUENCY_BIN_COUNT;
				// Analyser's frequencyBinCount is always half of the fftSize (https://developer.mozilla.org/en-US/docs/Web/API/AnalyserNode/frequencyBinCount)
				const sourceDrums = audioCtx.createMediaElementSource(audioElementDrums);
				// Connect source -> analyser -> destination
				sourceDrums.connect(analyserDrums);
				analyserDrums.connect(audioCtx.destination);
				break;
			case 'vocals':
				analyserVocals = audioCtx.createAnalyser();
				analyserVocals.fftSize = 2 * FREQUENCY_BIN_COUNT;
				// Analyser's frequencyBinCount is always half of the fftSize (https://developer.mozilla.org/en-US/docs/Web/API/AnalyserNode/frequencyBinCount)
				const sourceVocals = audioCtx.createMediaElementSource(audioElementVocals);
				// Connect source -> analyser -> destination
				sourceVocals.connect(analyserVocals);
				analyserVocals.connect(audioCtx.destination);
				break;
		}

	}

	const scale = (number, [inMin, inMax], [outMin, outMax]) => {
		// if you need an integer value use Math.floor or Math.ceil here
		return Math.floor((number - inMin) / (inMax - inMin) * (outMax - outMin) + outMin);
	}

	const getIntensity = (audioStr) => {
		switch (audioStr) {
			case 'melody':
				analyserMelody.getByteFrequencyData(dataArray);
				break;
			case 'bass':
				analyserBass.getByteFrequencyData(dataArray);
				break;
			case 'vocals':
				analyserVocals.getByteFrequencyData(dataArray);
				break;
			case 'drums':
				analyserDrums.getByteFrequencyData(dataArray);
				break;
		}

		let results = dataArray.filter(element => {
			return element > 0;
		});

		let averageIntensity = 0;
		for (let i = 0; i < results.length; i++) {
			averageIntensity += results[i];

		}
		if (results.length != 0) {
			averageIntensity /= results.length;
		}
		let visualIntensity = scale(averageIntensity, [0, 255], [0, 100]);

		if ($("#audio-" + audioStr).prop('volume') != 0) {
			$(".visuals-" + audioStr).css({
				background: 'radial-gradient(50% 50% at 50% 50%, hsl(120, ' + visualIntensity.toString() * 1.2 + '%, 61%) 0%, rgba(103, 206, 103, 0) 100%)'
			});
		}
	};

	const setupOnPlay = (audioStr) => {
		if (firstPlay[audioStr]) {
			setupAudioCtx(audioStr);
			setInterval(getIntensity, 50, audioStr);
			firstPlay[audioStr] = false;
		}
	};

	const getAudioElements = () => {

		audioElementMelody = document.getElementById('audio-melody');
		audioElementMelody.onplay = setupOnPlay('melody');

		audioElementVocals = document.getElementById('audio-vocals');
		audioElementVocals.onplay = setupOnPlay('vocals');

		audioElementDrums = document.getElementById('audio-drums');
		audioElementDrums.onplay = setupOnPlay('drums');

		audioElementBass = document.getElementById('audio-bass');
		audioElementBass.onplay = setupOnPlay('bass');
	};

	getAudioElements();

	const playIconContainer = document.getElementById('play-icon');
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
		audioCtx.resume();
		if (playState === 'play') {
			audioMelody.play();
			audioVocals.play();
			audioBass.play();
			audioDrums.play();

			audioMelody.volume = $("#slider-melody").slider("option", "value") / 100;
			audioBass.volume = $("#slider-bass").slider("option", "value") / 100;
			audioVocals.volume = $("#slider-vocals").slider("option", "value") / 100;
			audioDrums.volume = $("#slider-drums").slider("option", "value") / 100;
			playAnimation.goToAndStop(13, true);
			// If you want animation, uncomment and comment line under 
			//playAnimation.playSegments([0, 13], true);
			requestAnimationFrame(whilePlaying);
			playState = 'pause';
		} else {
			audioMelody.pause();
			audioVocals.pause();
			audioBass.pause();
			audioDrums.pause();
			// If you want animation, uncomment and comment line under
			//playAnimation.playSegments([13, 0], true);
			playAnimation.goToAndStop(0, true);
			cancelAnimationFrame(raf);
			playState = 'play';
		}
	});


	/** Implementation of the functionality of the audio player */

	const audioMelody = document.getElementById('audio-melody');
	const audioVocals = document.getElementById('audio-vocals');
	const audioBass = document.getElementById('audio-bass');
	const audioDrums = document.getElementById('audio-drums');
	var audioArr = [audioVocals, audioMelody, audioBass, audioDrums];

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

