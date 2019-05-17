// The Nature of Code
// Daniel Shiffman
// http://natureofcode.com

// Flock object
// Does very little, simply manages the array of all the boids

function Flock() {
  // An array for all the boids
  this.boids = []; // Initialize the array

}

Flock.prototype.run = function() {
  for (var i = 0; i < this.boids.length; i++) {
    this.boids[i].run(this.boids); // Passing the entire list of boids to each boid individually
    col = i;
  }
}

Flock.prototype.addBoid = function(b) {
  this.boids.push(b);
}

/////////////////////////////////////////////////////////////////////////////////
//  We accumulate a new acceleration each time based on the three rules below  //
//          Separation (sepa), Alignment (alig), Cohesion (cohe)               //
/////////////////////////////////////////////////////////////////////////////////

Boid.prototype.flock = function(boids) {
  var sepa = this.separate(boids); 
  var alig = this.align(boids); 
  var cohe = this.cohesion(boids); 

  ///////////////////////////////////////////////////////////////////////////
  //   Try changing the values to change the weight of the forces below    //
  ///////////////////////////////////////////////////////////////////////////
  aliMultiplier = 1.0;
  cohMultiplier = 1.0;
  sepMultiplier = 3.0 ;
  sepa.mult(sepMultiplier);
  alig.mult(aliMultiplier);
  cohe.mult(cohMultiplier);

  //////////////////////////////////////////////////
  //    Add the force vectors to acceleration     //
  //////////////////////////////////////////////////

  this.applyForce(sepa);
  this.applyForce(alig);
  this.applyForce(cohe);
}
// Separation
// Method checks for nearby boids and steers away
Boid.prototype.separate = function(boids) {
  var separation = map(0.1, 0, 1, 0, 300); 
  var desiredseparation = floor(separation);
  var steer = createVector(0, 0);
  var count = 0;
  if (frameCount % 20 === 0) {
    s = desiredseparation;
  }
  // For every boid in the system, check if it's too close
  for (var i = 0; i < boids.length; i++) {
    var d = p5.Vector.dist(this.position, boids[i].position);
    // If the distance is greater than 0 and less than an arbitrary amount (0 when you are yourself)
    if ((d > 0) && (d < desiredseparation)) {
      // Calculate vector pointing away from neighbor
      var diff = p5.Vector.sub(this.position, boids[i].position);
      diff.normalize();
      diff.div(d); // Weight by distance
      steer.add(diff);
      count++; // Keep track of how many
    }
  }
  // Average -- divide by how many
  if (count > 0) {
    steer.div(count);
  }

  // As long as the vector is greater than 0
  if (steer.mag() > 0) {
    // Implement Reynolds: Steering = Desired - Velocity
    steer.normalize();
    steer.mult(this.maxspeed);
    steer.sub(this.velocity);
    steer.limit(this.maxforce);
  }
  return steer;
}

// Alignment
// For every nearby boid in the system, calculate the average velocity
Boid.prototype.align = function(boids) {

  var neighbordist = floor(alignment);
  var sum = createVector(0, 0);
  var count = 0;

  a = floor(alignment);
  //display values

  for (var i = 0; i < boids.length; i++) {
    var d = p5.Vector.dist(this.position, boids[i].position);
    if ((d > 0) && (d < neighbordist)) {
      sum.add(boids[i].velocity);
      count++;
    }
  }
  if (count > 0) {
    sum.div(count);
    sum.normalize();
    sum.mult(this.maxspeed);
    var steer = p5.Vector.sub(sum, this.velocity);
    steer.limit(this.maxforce);
    return steer;
  } else {
    return createVector(0, 0);
  }
}

// Cohesion
// For the average location (i.e. center) of all nearby boids, calculate steering vector towards that location
Boid.prototype.cohesion = function(boids) {


  var neighbordist = floor(cohesion);

  var sum = createVector(0, 0); // Start with empty vector to accumulate all locations
  var count = 0;

  c = floor(cohesion);
  //display values

  for (var i = 0; i < boids.length; i++) {
    var d = p5.Vector.dist(this.position, boids[i].position);
    if ((d > 0) && (d < neighbordist)) {
      sum.add(boids[i].position); // Add location
      count++;
    }
  }
  if (count > 0) {
    sum.div(count);
    return this.seek(sum); // Steer towards the location
  } else {
    return createVector(0, 0);
  }

}
Boid.prototype.run = function(boids) {
  this.flock(boids);
  this.update();
  this.borders();
  this.render();
}


Boid.prototype.applyForce = function(force) {
  // We could add mass here if we want A = F / M
  this.acceleration.add(force);
}

// Method to update location
Boid.prototype.update = function() {
  // Update velocity
  this.velocity.add(this.acceleration);
  // Limit speed
  this.velocity.limit(this.maxspeed);
  this.position.add(this.velocity);
  // Reset accelertion to 0 each cycle
  this.acceleration.mult(0);
}

// A method that calculates and applies a steering force towards a target
// STEER = DESIRED MINUS VELOCITY
Boid.prototype.seek = function(target) {
  var desired = p5.Vector.sub(target, this.position); // A vector pointing from the location to the target
  // Normalize desired and scale to maximum speed
  desired.normalize();
  desired.mult(this.maxspeed);
  // Steering = Desired minus Velocity
  var steer = p5.Vector.sub(desired, this.velocity);
  steer.limit(this.maxforce); // Limit to maximum steering force
  return steer;
}

// Wraparound
Boid.prototype.borders = function() {
  if (this.position.x < -this.r) this.position.x = width + this.r;
  if (this.position.y < -this.r) this.position.y = height + this.r;
  if (this.position.x > width + this.r) this.position.x = -this.r;
  if (this.position.y > height + this.r) this.position.y = -this.r;
}
