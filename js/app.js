$(function () {
	$("#slider-vocals").slider({
		orientation: "vertical",
		range: "min",
		min: 0,
		max: 100,
		value: 50
	});

	$("#slider-melody").slider({
		orientation: "vertical",
		range: "min",
		min: 0,
		max: 100,
		value: 50
	});

	$("#slider-bass").slider({
		orientation: "vertical",
		range: "min",
		min: 0,
		max: 100,
		value: 50
	});

	$("#slider-drums").slider({
		orientation: "vertical",
		range: "min",
		min: 0,
		max: 100,
		value: 50
	});
});

/*let sliders, sliderfills, thumbs, slidervalues;
let initialValue = 50; 

document.addEventListener('DOMContentLoaded', function (e) { init(); });

function init() {
	sliders = document.querySelectorAll(".customrange");
	sliderfills = document.querySelectorAll(".sliderfill");
	thumbs = document.querySelectorAll(".sliderthumb");
	for (let i = 0; i < sliders.length; i++) {
		sliders[i].addEventListener("input", function (e) {
			updateSlider(i, sliders[i].value);
		});
		sliders[i].addEventListener("change", function (e) {
			updateSlider(i, sliders[i].value);
		});
		sliders[i].value = initialValue;
		updateSlider(i, sliders[i].value);
	}
}
function updateSlider(fillindex, val) { 
	setThumb(thumbs[fillindex], val);
}

function setThumb(elem, val) {
	let size = getComputedStyle(elem).getPropertyValue("--thumbsize");
	let newx = `calc(${val}% - ${parseInt(size) / 2}px)`;
	elem.style.left = newx;
}
*/