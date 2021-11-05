// DefaultButton class that inherits from Clickable so that I dont have to 
// type out the properties for them all every single time 
// Also has setters for x and y so that the root pixel is (effectively) in the center instead of top left
class DefaultButton extends Clickable {

	constructor(posX=0, posY=0) {
		// make the clickable
		super();

		// black and white for convenience 
		let white = "#FFFFFF";
		let black = "#000000";

		// set defaults how i like them 
		this.width = 125;
		this.height = 65;
		this.stroke = white;
		this.color = black;
		this.textColor = white;
		this.textFont = "Georgia";
		this.textSize = 15;

		// set position 
		this.locate(posX, posY);
	}

	// overload locate to center the button
	locate(x, y) {
		super.locate(x - (this.width / 2), y - (this.height / 2));
	}
}


// declare variables
var bg;
var frontButton = document.getElementById("frontButton");
var frontPressed = false;
var frontReleased = false;


function pressListener(event) {
	if (event.type == "animationstart") {
		console.log("animationstart");
	}
	if (event.type == "animationend") {
		console.log("animationend");
		// frontButton.className = "frontButtonRelease";
		frontPressed = true;
		releaseAnimator();
		console.log("frontReleased from pressListener: " + frontReleased);
	}
}

function releaseAnimator() {
	if (frontPressed && frontReleased) {
		frontButton.className = "frontButtonRelease";
		bg = color(75, 0, 130, 0);
	}
}

function frontOnReleaseHandler() {
	frontReleased = true; 
	releaseAnimator();
}

function frontOnPressHandler() {

	frontButton = document.getElementById("frontButton");
	frontButton.addEventListener("animationstart", pressListener, false);
	frontButton.addEventListener("animationend", pressListener, false);

	// begin the button shape animation 
	frontButton.className = "frontButtonPress";
}

function setup() {

	// create canvas as the size of the window.
	// render it as a black plane
	createCanvas(windowWidth, windowHeight);
	frameRate(30);

	// colors
	frontRGB = color(0, 0, 0);
	bg = color(0, 0, 0, 0);

	// set background
	background(bg);

}


function draw() {

	// set the background color 
	background(bg);
	fill(255);
	// rect(400, windowHeight / 2, 10, 20);


}

function windowResized() {
	resizeCanvas(windowWidth, windowHeight);
}