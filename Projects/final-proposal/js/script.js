/**
 * Final Proposal
 * Graeme Peters
 * This is a refinement of the functioning of my AI-Jam from earlier in the semester. 
 * I want to optimize it so that it takes a photo instead of using a live video feed,
 * in the hopes that this will allow me to have better certainty that there is an 
 * object in frame
 */

"use strict";

let state = `loading`; //loading, running

let img;

//The model
let modelName = `CocoSsd`;
let cocossd;

//The button
let button = {
    x: 0,
    y: 0,
    size: 100,
    fill: {
        r: 255,
        g: 20,
        b: 20
    }
}

let predictions = undefined;

//PRELOAD
function preload() {
}

//SETUP
function setup() {
    createCanvas(windowWidth, windowHeight);

    button.x = width/2;
    button.y = height/2;

    video = createCapture(VIDEO);
    video.hide();

    //Start the CocoSsd
    cocossd = ml5.objectDetector(`cocossd`, modelReady);


}

function modelReady() {
    if (state === `loading`) {
        state = running;
    }
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

//LOADING
function loading() {
    background(0);

    push();
    fill(button.fill.r, button.fill.g, button.fill.b);
    ellipse(button.x, button.y, button.size);
    pop();
}

//RUNNING
function running() {
    background(255, 0, 0);
}