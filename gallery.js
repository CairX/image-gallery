var active = 0;
var mode = "grid";

var grid;
var focus;
var focusImage;

var images = [
	{
		"small": "images/long_journey_home_small.png",
		"large": "images/long_journey_home.png"
	}, {
		"small": "images/great_wave_off_kanagawa_small.png",
		"large": "images/great_wave_off_kanagawa.png"
	}, {
		"small": "images/my-neighbor-totoro_small.jpg",
		"large": "images/my-neighbor-totoro.jpg"
	}
];

window.onload = function() {
	grid = document.getElementById("grid");
	focus = document.getElementById("focus");
	focusImage = document.getElementById("focus-image");

	for (var i = 0; i < images.length; i++) {
		var element = document.createElement("img");
		element.setAttribute("src", images[i].small);
		element.setAttribute("data-index", i);
		element.onclick = clickActive;
		grid.appendChild(element);

		images[i].element = element;
	}

	updateActiveGrid();
};

var clickActive = function(e) {
	console.log(e);
	active = e.target.getAttribute("data-index");
	updateActiveGrid();
};
var updateActiveGrid = function() {
	var elements = document.getElementsByClassName("active");
	for (var i = 0; i < elements.length; i++) {
		elements[i].className = "";
	}
	images[active].element.className = "active";
};
var updateActiveFocus = function() {
	focusImage.setAttribute("src", images[active].large);
};
var next = function() {
	active += 1;
	if (active >= images.length) {
		active = 0;
	}
};
var previous = function() {
	active -= 1;
	if (active < 0) {
		active = images.length - 1;
	}
};

document.onkeyup = function(e) {
	console.log(e);

	switch(e.keyCode) {
		case 37: // Left
			console.log("left");
			previous();
			if (mode == "grid") {
				updateActiveGrid();
			} else if (mode == "focus") {
				updateActiveFocus();
			}
			break;

		case 38: // Up
			console.log("up");
			break;

		case 39: // Right
			console.log("right");
			next();
			if (mode == "grid") {
				updateActiveGrid();
			} else if (mode == "focus") {
				updateActiveFocus();
			}
			break;

		case 40: // Down
			console.log("down");
			break;

		case 13: // Enter
			console.log("enter");
			if (mode == "grid") {
				mode = "focus";
				updateActiveFocus();
				focus.style.display = "block";
			}
			break;

		case 27: // ESC
			console.log("ESC");
			if (mode == "focus") {
				mode = "grid";
				updateActiveGrid();
				focus.style.display = "none";
			}
			break;

		case 32: // Space
			console.log("spave");
			if (mode == "grid") {
				mode = "focus";
				updateActiveFocus();
				focus.style.display = "block";
			} else if (mode == "focus") {
				mode = "grid";
				updateActiveGrid();
				focus.style.display = "none";
			}
			break;
	}
};
