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

// Copyright (c) 2020 ml5
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

/* ===
ml5 Example
BodyPix
=== */

let bodypix;
let video;
let segmentation;

const options = {
  outputStride: 8, // 8, 16, or 32, default is 16
  segmentationThreshold: 0.3, // 0 - 1, defaults to 0.5
};

function preload() {
  bodypix = ml5.bodyPix(options);
}

function setup() {
  createCanvas(320, 240);
  // load up your video
  video = createCapture(VIDEO, videoReady);
  video.size(width, height);
  
}

function videoReady() {
  bodypix.segment(video, gotResults);
}

function draw() {
  background(0);
  if (segmentation) {
    image(segmentation.backgroundMask, 0, 0, width, height);
    console.log(segmentation);
  }
}

function gotResults(error, result) {
  if (error) {
    console.log(error);
    return;
  }
  segmentation = result;
  bodypix.segment(video, gotResults);
}