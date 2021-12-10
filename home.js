// DefaultButton class that inherits from Clickable so that I dont have to 
// type out the properties for them all every single time 
// Also has setters for x and y so that the root pixel is (effectively) in the center instead of top left






// var frontButton = document.getElementById("frontButton");
// var frontPressed = false;
// var frontReleased = false;


// function pressListener(event) {
// 	if (event.type == "animationstart") {
// 		console.log("animationstart");
// 	}
// 	if (event.type == "animationend") {
// 		console.log("animationend");
// 		// frontButton.className = "frontButtonRelease";
// 		frontPressed = true;
// 		releaseAnimator();
// 		console.log("frontReleased from pressListener: " + frontReleased);
// 	}
// }

// function releaseAnimator() {
// 	if (frontPressed && frontReleased) {
// 		frontButton.className = "frontButtonRelease";
// 		bg = color(75, 0, 130, 0);
// 	}
// }

// function frontOnReleaseHandler() {
// 	frontReleased = true; 
// 	releaseAnimator();
// }

// function frontOnPressHandler() {

// 	frontButton = document.getElementById("frontButton");
// 	frontButton.addEventListener("animationstart", pressListener, false);
// 	frontButton.addEventListener("animationend", pressListener, false);

// 	// begin the button shape animation 
// 	frontButton.className = "frontButtonPress";
// }

// declare variables
var bg;

function setup() {

	// create canvas as the size of the window.
	// render it as a transparent black plane
	var cnv = createCanvas(windowWidth, windowHeight);
	cnv.parent('canvasdiv');
	// var c = document.getElementById("canvasdiv");
	// var ctx = c.getContext("2d");
	cnv.globalAlpha(0.5);
	frameRate(30);

	// colors
	bg = color(0, 0, 0, 0);

	// set background
	background(bg);

}


function draw() {

	// set the background color 
	background(bg);
	fill(255);
	// rect(400, windowHeight / 2, 10, 20);

	// testing the position of the canvas to make sure it's right 
	strokeWeight(10);
	point(0, 0);
	point(width, height);

	// test shapes 
	
	fill(255, 10);
	noStroke();

	rect(width/2, height/2, 200, 200);
	fill(0, 10);
	rect(width/2 + 50, height/2 + 50, 200, 200);


}

function windowResized() {
	resizeCanvas(windowWidth, windowHeight);
}