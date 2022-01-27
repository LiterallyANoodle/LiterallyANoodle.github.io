

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

	// distance 
	distance(other) {
		let x = other.x - this.x;
		let y = other.y - this.y; 

		let d = Math.sqrt((x ** 2) + (y ** 2));

		return d;
	}

	// angle
	angle() {
		return Math.atan(this.y/this.x);
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
	// 3. child 

	// methods
	// 1. tension 
	// This method calculates the tension to apply to a child node that's a little too far away

	// constructor
	constructor(child=null, x=0, y=0, m=1, w=50, h=130, c=color(0,200,0,50), vx=0, vy=0, fix=false, forces=[]) {

		super(x, y, m, vx, vy, fix, forces);

		this.width = w;
		this.color = c;
		this.child = child;
		this.height = h; 

	}

	// getters and setters 
	get width() {
		return this.width_;
	}

	set width(value) {
		this.width_ = value;
	}

	get color() {
		return this.color_;
	}

	set color(value) {
		this.color_ = value;
	}

	get child() {
		return this.child_;
	}

	set child(value) {
		this.child_ = value; 
	}

	get height() {
		return this.height_;
	}

	set height(value) {
		this.height_ = value; 
	}

	// methods 

	// tension 
	tension() {

		if (this.child != null) {

			let d = this.pos.distance(this.child.pos);

			// check the distance between this node and its child is greater than the allowed distance height
			if (d >= this.height) {

				// begin to calculate a spring force where k = 10 force units per pixel
				let k = 10;
				let tension = (-k * d); 

				let x = d * Math.cos(Math.atan((this.child.pos.y - this.pos.y)/(this.child.pos.x - this.pos.x)));
				let y = d * Math.sin(Math.atan((this.child.pos.y - this.pos.y)/(this.child.pos.x - this.pos.x)));

				x = x * tension;
				y = y * tension; 

				return new Force(x, y);

			}
		
		}

		return new Force(0, 0);

	}

}


// basically a linked list of seaweed nodes which are physics objects
class SeaweedStalk {

	// values
	// 1. base (head)
	// 2. initialMass
	// 3. initialWidth
	// 4. nodeHeight

	// methods 
	// 1. generate 
	// Starting at the base, add children of decreasing width and mass 
	// until a child of width 0 and mass 1 is reached. 

	constructor(x, y, m=5, w=40, h=130) {

		this.base = new SeaweedNode(null, x, y, m, w);
		this.cursor = this.base;
		this.initialMass = m;
		this.initialWidth = w;
		this.nodeHeight = h;
		// this.isFixed = true; // this is not a physics class

	}

	// getters and setters
	get base() {
		return this.base_;
	}

	set base(value) {
		this.base_ = value;
	}

	get cursor() {
		return this.cursor_;
	}

	set cursor(value) {
		this.cursor_ = value;
	}

	get initialMass() {
		return this.initialMass_;
	}

	set initialMass(value) {
		this.initialMass_ = value;
	}

	get initialWidth() {
		return this.initialWidth_;
	}

	set initialWidth(value) {
		this.initialWidth_ = value;
	}

	// methods 

	// Generate 
	generate() {

		let m = this.initialMass - 1;
		let w = this.initialWidth - 10;
		// let cursor = this.base; 

		// make nodes in a loop until m == 1
		do {

			// create the child at current size
			this.cursor.child = new SeaweedNode(null, this.base.pos.x, this.base.pos.y, m, w); 
			if (DEBUG) {
				console.log("created seaweed node with m = " + m);
			}

			// select the next node to add child
			this.cursor = this.cursor.child; 

			// decrease size for next child 
			m--; 
			w -= 10; 

		} while (m >= 1);

		if (DEBUG) {
			console.log("finished seaweed generation!");
		}

	}

	// place cursor back at the base
	first() {
		this.cursor = this.base; 
	}

}


// declare variables
var bg;
var DEBUG = true;
var testObj = new PhysObject();
var sineCounter = 0;
var testForce1 = new Force();
var testWeed;
var buoyancy = new Force(0, -30);


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
	

	// seaweed related activities
	// create a test seaweed 
	testWeed = new SeaweedStalk(x=width/2, y=height);
	console.log(testWeed.base);
	testWeed.generate();

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

	// remove all forces from seaweed 
	while (testWeed.cursor != null) {
		testWeed.cursor.forces = []; 
		testWeed.cursor = testWeed.cursor.child;
	}
	testWeed.first();

	// use sin and cos to change the force over time
	// make it move in a circle 
	// testForce1.x = sin(sineCounter) * 3;
	// testForce1.y = cos(sineCounter) * 3;
	testForce1.x = mouseX - testObj.pos.x;
	testForce1.y = mouseY - testObj.pos.y;

	// apply buoyant force to seaweed nodes 
	while (testWeed.cursor != null) {

		testWeed.cursor.forces.push(buoyancy);
		if (DEBUG) {
			console.log(testWeed.cursor.tension());
		}
		testWeed.cursor.forces.push(testWeed.cursor.tension());

		testWeed.cursor.update();

		testWeed.cursor = testWeed.cursor.child;

	}
	testWeed.first();

	// reapply force every frame 
	testObj.forces = [testForce1];

	// move 
	// testObj.update();


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