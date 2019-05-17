/*
 * @name Flocking
 * @description Demonstration of Craig Reynolds' "Flocking" behavior.
 * See: http://www.red3d.com/cwr/
 * Rules: Cohesion, Separation, Alignment
 * (from <a href="http://natureofcode.com">natureofcode.com</a>).
 *  Drag mouse to add boids into the system.
 // Methods for Separation, Cohesion, Alignment added
 */


//var declares a variable of any kind (integer, string, float)
// Many variable will be assigned a value 
//Ex: barWidth = 20 makes the value of the variable barWidth 20
//Many variable will not yet be assigned a value
//Ex: var flock;
var barWidth = 20;
var lastBar = -1;

//flock is the variable that groups the Boids together
var flock;
var input;
var analyzer;

//array of animal images
var animals = [];

//s, a, and c are the values that correspond to the bar graphs and
//the Boid behaviours of Sep, Ali, and Coh
var s = 0;
var a = 0;
var c = 0;

//cohesion, alignment refer to the analoge inputs that
//increase or decrease Sep, Ali, and Coh
var cohesion = 1;
var alignment = 1;

//scrolling is the variable used to draw the scrolling text
var scrolling;
var aliMultiplier;
var cohMultiplier;
var sepMultiplier;
var boidSize;
var boidSpeed;
var boidTurn;

function preload() {
  animals[0] = loadImage("Image/animal0.png");
  animals[1] = loadImage("Image/animal1.png");
  animals[2] = loadImage("Image/animal2.png");
}

function setup() {
  //colorMode(RGB, width, height, 100);
  // createCanvas(1920, 1080);
  createCanvas(window.innerWidth, window.innerHeight);
  //createCanvas(600, 600);
  // var r = floor(random(0, flowers.length));
  //scrolling = new Scroll(floor(random(0, width)), floor(random(0, height)));

  flock = new Flock();
  // Add an initial set of boids into the system
  for (var i = 0; i < 100; i++) {
    var b = new Boid(width / 2, height / 2);
    flock.addBoid(b);
  }
  //Create 100 initial boids
}

function draw() {

//  if (frameCount == 400) {window.alert("                    CODING CHALLENGE:                                     Try changing the Boids SHAPE in the Boid tab.");}
//  if (frameCount == 800) {window.alert("                    CODING CHALLENGE:                                     Try changing the Boids COLOUR in the Boid tab");}
//if (frameCount == 1200) {window.alert("                    CODING CHALLENGE:                                     Try changing the Boids SPEED in the Boid tab");}

  //This is the colour of the background of the program
  //All colour in this program is RGB or
  //(Red value, Green value, Blue value)
  //(0, 255, 255) is cerulian blue
  background(0, 255, 225);

  //Below is the renumbering or mapping of bar graph values so
  //that the bargraphs are proportional
  var cbar = map(c, 0, 5000, 0, width / 3);
  var abar = map(a, 0, 360, 0, width / 3);
  var sbar = map(s, 0, 300, 0, width / 3);

  //noStroke removes the outline or stroke of the bar graphs
  noStroke();

  //rectMode(CORNERS) draws a rectangle based on the position of
  //the bottom left and top right corners of the rectangle 
  //Ex: (Bottom Left x, Bottom Left Y, Top Right X, Top Right Y)
  rectMode(CORNERS);

  //Draws Purple/Right Cohesion Bar Graph
 // fill(0, 0, 60, 100);
  //rect(0, height - (width / 24 * 4), abar / 2, height - (width / 24 * 3));

  //Draws Purple/Right Alignment Bar Graph
  //fill(255, 0, 0);
  //rect(0, height - (width / 24 * 3), cbar / 2, (height - width / 24 * 2));

  //Draws Yellow/Right Separation Bar Graph
  //fill(208, 255, 0);
  //rect(0, height - (width / 24 * 2), sbar / 2, height - (width / 24));



  //fill means Text or letters will be black
  //0 is the value associated with black
  fill(0);

  //textSize is the size of letters of text
  textSize(width / 70);

  //textAlign draws the letters starting from the Top Left of the text
  textAlign(CORNERS);

  //Draws Align value, coordinates of Align value
  //text(" " + a, 0, height - width / 24 * 3);

  //Draws Cohesion value, coordinates of Cohesion value
 // text(" " + c, 0, height - width / 24 * 2);

  //Draws Right Separation Value, coordinates of Right Separation Value
  //text(" " + s, 0, height - width / 24);

  //Draws Right Align Graph Label
 // text("   A", 0, height - width / 24 * 3.5);

  //Draws right Cohesion Graph Label
  //text("   C", 0, height - width / 24 * 2.5);

  //Draws right Separation Graph Label
  //text("   S", 0, height - width / 24 * 1.5);

  //scrolling.scroll is the movement of the scrolling text
  //scrolling.scroll();

  //scrolling.borders allows the scrolling text to wrap around world
  //scrolling.borders();

  //scrolling.display draws the scrolling text
  //scrolling.display();


  //flock.run draws the Boids, gives the Boids movement, 
  //gives the boids their behaviours (Sep, Ali, Coh) and
  //allows the Boids to wrap around the world
  flock.run();
}
////////////////////////////////////////////////////////////
//   function Boid(x, y) creates a class for the Boids.   //
//  This allows us to give each Boid the same properties  //
////////////////////////////////////////////////////////////
function Boid(x, y) {


  //////////////////////////////////////////
  //                TIPS:                 //  
  //       Try changing the numbers       //
  //   ex: change this.r from 4 into 10   //  
  //         What did you notice?         //
  //////////////////////////////////////////

  /////////////////////////////////////////////////////////////////////////
  //   this.acceleration sets how quickly a Boid reaches its maxspeed    //
  /////////////////////////////////////////////////////////////////////////
  this.acceleration = createVector(0, 0);

  /////////////////////////////////////////////////////////////////////
  //   this.velolcity sets the direction that the Boids will face    //
  /////////////////////////////////////////////////////////////////////  
  this.velocity = createVector(random(-1, 1), random(-1, 1));

  //////////////////////////////////////////////////////////////////
  //   this.position sets the x and y coordinates of the Boids    //
  //////////////////////////////////////////////////////////////////  
  this.position = createVector(x, y);

  //////////////////////////////////////////
  //   this.r set the size of each Boid   //
  //////////////////////////////////////////  
  this.r = boidSize;

  ///////////////////////////////////////////////////////////////////////
  //   this.maxspeed set the maximum speed that the Boids can reach    //
  /////////////////////////////////////////////////////////////////////// 
  this.maxspeed = boidSpeed;

  ////////////////////////////////////////////////////////////
  //   this.maxforce sets the turning speed of the Boids    //
  ////////////////////////////////////////////////////////////  
  this.maxforce = boidTurn;

}
function Scroll(x, y) {
  this.x = x;
  this.y = y;

this.scroll = function() {
  this.x = this.x + 2;
}

    this.borders = function() {
      if (this.x > width){
        this.x = 0;
        this.y = floor(random(0, height));}
    }

  this.display = function() {
    noStroke();
    fill(0);
    textSize(width / 40);
    textAlign(CORNER);
    text("TALK to separate the Boids", this.x, this.y);
    //Instructions
  }
}
//   JoytoKey hotkeys in case of no joystick
// [increase] [alignment "e"] [blue alignment "r"]
// [decrease] [alignment "d"] [blue alignment "f"]
// [increase] [coherence "q"] [blue alignment "w"]
// [decrease] [alignment "a"] [blue alignment "s"]
// [add boids "t" "y"]

function keyTyped() {
  //Hotkey values: Analog devices increase or decrease the separation, alignment, and cohesion values here
  if (c < 5000 && key === 'q') {
    cohesion = cohesion + 20;
  }
  if (c > -1 && key === "a") {
    cohesion = cohesion - 20;
  }
  if (a < 360 && key === "e") {
    alignment = alignment + 1;
  }
  if (a > -1 && key === "d") {
    alignment = alignment - 1;
  }
}