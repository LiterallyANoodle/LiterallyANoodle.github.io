function setup() {

	// create canvas as the size of the window.
	// render it as a black plane
	createCanvas(windowWidth, windowHeight);
	background(0);
	frameRate(30);

}

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

// create the entrance button and make it look nice
let frontButton = new DefaultButton();
frontButton.text = "Clicky clicky.";
// animation for press and release
frontButton.onPress = function() {
	this.color = "#073871";
	this.strokeWeight += 1;
	while (this.text != "") {
		frontOnPressAnimate();
	}
}
// function to animate onPress
function frontOnPressAnimate() {
	setTimeout(200);
	frontButton.text = frontButton.text.slice(0, -1);
}


function draw() {


	frontButton.locate((windowWidth / 2) - (frontButton.width / 2), (windowHeight / 2) - (frontButton.height / 2));
	frontButton.draw();


}

