/**
 * Bubble Popper
 * Graeme Peters
 * 
 * Pop Bubbles with your finger!
 */

"use strict";

//The user's webcam
let video = undefined;

//The handpose
let handpose = undefined;

//The current set of predictions
let predictions = [];

let bubble;


//SETUP
function setup() {
    createCanvas(640, 480);

    //Providing the video
    video = createCapture(VIDEO);
    video.hide();

    //Loading handpose
    handpose = ml5.handpose(video, {
    flipHorizontal: true
    }, function() {
        console.log(`Model loaded!`)
    });

    //Listening for predictions
    handpose.on(`predict`, function(results) {
        console.log(results);
        predictions = results;
    })

    //Bubbles
    bubble = {
        x: random(width),
        y: height + 50,
        size: 100,
        vx: 0,
        vy: -2
    };
}


//DRAW
function draw() {
    background(0);

    //Getting index finger coordinates
    if (predictions.length > 0) {
        let hand = predictions[0];
    let index = hand.annotations.indexFinger;
    let tip = index[3];
    let base = index[0];
    let tipX = tip[0];
    let tipY = tip[1];
    let baseX = base[0];
    let baseY = base[1];

    //Displaying the pin
    push();
    noFill();
    stroke(255);
    strokeWeight(2);
    line(baseX, baseY, tipX, tipY);
    pop();

    push();
    noStroke();
    fill(255, 0, 0);
    ellipse(baseX, baseY, 10);
    pop();

    //Checking bubble popping
    let d = dist(tipX, tipY, bubble.x, bubble.y)

        if (d < bubble.size/2) {
            bubble.x = random(width);
            bubble.y = height + bubble.size/2;
        }
    }

    bubble.x += bubble.vx;
    bubble.y += bubble.vy;

    if(bubble.y < 0) {
        bubble.x = random(width)
        bubble.y = height + bubble.size/2;
    }

    push();
    noStroke();
    fill(220, 220, 255);
    ellipse(bubble.x, bubble.y, bubble.size);
    pop();

}