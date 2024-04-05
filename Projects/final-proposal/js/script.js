/**
 * Final Proposal
 * Graeme Peters
 * This is a refinement of the functioning of my AI-Jam from earlier in the semester. 
 * I want to optimize it so that it takes a photo instead of using a live video feed,
 * in the hopes that this will allow me to have better certainty that there is an 
 * object in frame
 */

"use strict";

/*
let state = `loading`; //loading, running

//The model
let modelName = `CocoSsd`;
let cocossd;

let video;
let thePic = undefined;

//PRELOAD
function preload() {
}

//SETUP
function setup() {
    createCanvas(windowWidth, windowHeight);

    video = createCapture(VIDEO);
    video.hide();

    //Start the CocoSsd
    cocossd = ml5.objectDetector(`cocossd`, modelReady);

}

//Once the model is loaded
function modelReady() {
    state = `running`;
}

//DRAW
function draw() {
    //The states
    if (state = `loading`) {
        loading();
    }
    if (state = `running`) {
        running();
    }
}

function takeAPic() {
    thePic = video;
}

//LOADING
function loading() {
    background(0);

}

//RUNNING
function running() {
    background(255, 0, 0);

    fill(255);
    ellipse(200, 200, 100);

    image(thePic, 0, 0);

}

function mousePressed() {
    if (state === `running`) {
        takeAPic();
    }
}



//stuff I need
let video;
let button;
let picture = undefined;
let modelName = CocoSsd;

//SETUP
function setup() {
    createCanvas(800, 600);

    video = createCapture(VIDEO);
    video.size(800, 600);
    video.hide();

    button = createButton(`take a pic`);
    button.position(0, 600);

    button.mousePressed(sayCheese);
}

function sayCheese() {
    picture = video;
}

//DRAW
function draw() {
    background(0);

    image(picture, 0, 0);

}
*/

///////



/*

let img;

// We will hold the totals for our color values here
let avgRed = 0;
let avgGreen = 0;
let avgBlue = 0;

// Load the image
function preload() {
    img = loadImage(`assets/images/hike.JPG`)
}

function setup() {
  createCanvas(400, 400);
  noStroke();

  // Resize the image to fit the canvas
  img.resize(height, width);

  // Load the pixels
  img.loadPixels();

  // Loop through the pixels X and Y
  for (let y = 0; y < img.height; y++) {
    for (let x = 0; x < img.width; x++) {

      // Calculate the pixel index
      const index = (y * img.width + x) * 4;

      // Sum the red, green, and blue values
      avgRed += img.pixels[index + 0];
      avgGreen += img.pixels[index + 1];
      avgBlue += img.pixels[index + 2];

    }
  }


  // We're finished working with pixels so update them
  img.updatePixels();

  // Get the total number of pixels
  // Divide by 4 because the total number of pixels = pixels * numColorChannels 
  const numPixels = img.pixels.length / 4;

  // divide the totals by the number of pixels to find the average.
  avgRed /= numPixels;
  avgGreen /= numPixels;
  avgBlue /= numPixels;
}

function draw() {

  // Draw the image as the background
  image(img, 0, 0);
  
  // Set the fill color to the average color of the pixels
  fill(avgRed, avgGreen, avgBlue);

  // Draw a square in the center of the screen
  rectMode(CENTER);
  rect(width / 2, height / 2, 100, 100);


}
*/