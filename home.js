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

// define a simple vector (just a tuple, for our case)
class Vector2 {

	// values
	// 1. x-magnitude (int)
	// 2. y-magnitude (int)

	// methods
	// 1. add
	// Adds the components of two vectors
	// 2. magnitude
	// Returns the total magnitude of the vector

	constructor(x=0, y=0) {

		this.x = x;
		this.y = y;

	}

	// getters and setters
	get x() {
		return this.x_;
	}

	set x(value) {
		this.x_ = value;
	}

	get y() {
		return this.y_;
	}

	set y(value) {
		this.y_ = value;
	}

	// methods 

	// Add
	add(other) {
		let resultX = this.x + other.x;
		let resultY = this.y + other.y;

		return new Vector2(resultX, resultY); 
	}

	// magnitude
	magnitude() {
		return Math.sqrt((this.x ** 2) + (this.y ** 2));
	}

}

// define force class
// force is mass and acceleration
// the mass is already stored by the object, 
// so only acceleration is needed,
// which is provided by the vector components.
// This may be rather unnecessary, but I'm trying to keep names up
// and not confusingly pollute PhysObject with internal Forces
class Force extends Vector2 {

	// inherited values 
	// 1. x-magnitude (int)
	// 2. y-magnitude (int)

	constructor(x=0, y=0) {
		super(x, y);
	}

}

// define physics objects 
class PhysObject {

	// values
	// 1. position (2d vector)
	// 2. mass (int)
	// 3. velocity (2d vector)
	// 4. isFixed (bool)
	// 5. forces (list<Force>)

	// methods
	// 1. accumulateForces
	// This method sends the current forces to be summed.
	// 1. applyForce
	// This method takes an incoming force and applies it
	// to the current velocity
	// 2. applyVelocity
	// This method takes the current velocity and applies it 
	// to the current position. 
	// 3. Update 
	// This function neatly performs all the functions related to 
	// movement, forces, and position. 
	// 4. drawVectors
	// This method draws vectors from the center of the object for
	// total force (red)
	// velocity (blue)
	// This is mostly meant for debug purposes.

	constructor(x=0, y=0, m=1, vx=0, vy=0, fix=false, forces=[]) {
		this.pos = new Vector2(x, y);
		this.mass = m;
		this.velocity = new Vector2(vx, vy);
		this.isFixed = fix;
		this.forces = forces;
	}

	// getters and setters
	get pos() {
		return this.pos_;
	}

	set pos(value) {
		this.pos_ = value;
	}

	get mass() {
		return this.mass_;
	}

	set mass(value) {
		this.mass_ = value;
	}

	get velocity() {
		return this.velocity_;
	}

	set velocity(value) {
		this.velocity_ = value;
	}

	get isFixed() {
		return this.isFixed_;
	}

	set isFixed(value) {
		this.isFixed_ = value;
	}

	get forces() {
		return this.forces_;
	}

	set forces(value) {
		this.forces_ = value;
	}

	// methods

	// accumulate forces
	accumulateForces() {

		// loop over the list of forces and add them
		let sumForce = new Force(0, 0);

		for (let i = 0; i < this.forces.length; i++) {
			sumForce = sumForce.add(this.forces[i]);
			// console.log(this.forces[i]);
		}

		console.log(sumForce);

		return sumForce;

	}

	// apply force 
	applyForce(force) {

		// take into account mass of the object to find acc
		// F = ma
		// F/m = a

		// console.log(force);

		let ax = force.x / this.mass; 
		let ay = force.y / this.mass;

		// apply acc to the velocity with respect to time
		this.velocity.x += ax * (deltaTime / 1000);
		this.velocity.y += ay * (deltaTime / 1000); 

	}

	// apply current velocity 
	applyVelocity() {

		// make sure this is not a fixed object 
		if (!this.isFixed) {
			// apply the current velocity with respect to time
			this.pos.x += this.velocity.x * (deltaTime / 1000);
			this.pos.y += this.velocity.y * (deltaTime / 1000);
		}
			

	}


	// update movement
	update() {

		let f = this.accumulateForces();
		this.applyForce(f);
		this.applyVelocity();

		// optionally draw the vectors
		if (DEBUG) {
			this.drawVectors(f);
			// console.log(f);
			// console.log(this.forces);
		}

	}

	// show force and velocity vectors 
	drawVectors(force) {

		// draw the force applied (red)
		strokeWeight(5);
		stroke(255, 0, 0);
		line(this.pos.x, this.pos.y, this.pos.x + force.x, this.pos.y + force.y);

		// draw the velocity applied (blue)
		strokeWeight(3);
		stroke(0, 0, 255);
		line(this.pos.x, this.pos.y, this.pos.x + this.velocity.x, this.pos.y + this.velocity.y);

	}

}

// define seaweed node class 
class SeaweedNode extends PhysObject {

	// inherited values 
	// 1. position (x, y)
	// 2. mass 
	// 3. velocity
	// 4. isFixed
	// 5. forces
	// unique values 
	// 1. width
	// 2. stalk color  

	// constructor

}


// declare variables
var bg;
var DEBUG = true;
var testObj = new PhysObject();
var sineCounter = 0;
var testForce1 = new Force();



function setup() {

	// create canvas as the size of the window.
	// render it as a transparent black plane
	var cnv = createCanvas(windowWidth, windowHeight);
	cnv.parent('canvasdiv');
	frameRate(30);

	// colors
	bg = color(0, 0, 0, 0);

	// set background
	background(bg);
	testObj.pos.x = width / 2;
	testObj.pos.y = height / 2;
	angleMode(DEGREES);
	

}


function draw() {

	// clear and set the background color 
	clear();
	background(bg);
	fill(255);
	// rect(400, windowHeight / 2, 10, 20);

	// testing the position of the canvas to make sure it's right 
	strokeWeight(10);
	point(0, 0);
	point(width, height);

	// test shapes 
	
	fill(255, 150);
	noStroke();

	rect(width/2, height/2, 200, 200);
	fill(0, 150);
	rect(width/2 + 50, height/2 + 50, 200, 200);

	// test physics objects 

	// use sin and cos to change the force over time
	// make it move in a circle 
	// testForce1.x = sin(sineCounter) * 3;
	// testForce1.y = cos(sineCounter) * 3;
	testForce1.x = mouseX - testObj.pos.x;
	testForce1.y = mouseY - testObj.pos.y;


	// reapply force every frame 
	testObj.forces = [testForce1];

	// move 
	testObj.update();

	// update the sine input 
	if (sineCounter >= 360) {
		sineCounter = 0;
	} else {
		sineCounter += 1; 
	}

}

function windowResized() {
	resizeCanvas(windowWidth, windowHeight);
}