/**
 * AI Jam
 * Graeme Peters
 * 
 * This is the file for my AI jam. As a failsafe in case of getting 
 * a difficult object to draw and nothing happens, I find that 
 * scissors work pretty well. I also think that it would work 
 * better using a still image, taken when the user presses the red button, 
 * because this would allow the critic to ask them to try again while it
 * cannot see a good enough drawing
 */

"use strict";

//Making stuff I'll use
    let state = `request`

    //The video
    let video;
    //The objects it can ask for
    let objects = [
    'bicycle',
    'car',
    'motorcycle',
    'airplane',
    'bus',
    'train',
    'truck',
    'boat',
    'traffic light',
    'fire hydrant',
    'stop sign',
    'parking meter',
    'bench',
    'bird',
    'cat',
    'dog',
    'horse',
    'sheep',
    'cow',
    'elephant',
    'bear',
    'zebra',
    'giraffe',
    'backpack',
    'umbrella',
    'handbag',
    'tie',
    'suitcase',
    'frisbee',
    'skis',
    'snowboard',
    'sports ball',
    'kite',
    'baseball bat',
    'baseball glove',
    'skateboard',
    'surfboard',
    'tennis racket',
    'bottle',
    'wine glass',
    'cup',
    'fork',
    'knife',
    'spoon',
    'bowl',
    'banana',
    'apple',
    'sandwich',
    'orange',
    'broccoli',
    'carrot',
    'hot dog',
    'pizza',
    'donut',
    'cake',
    'chair',
    'couch',
    'potted plant',
    'bed',
    'dining table',
    'toilet',
    'tv',
    'laptop',
    'mouse',
    'remote',
    'keyboard',
    'cell phone',
    'microwave',
    'oven',
    'toaster',
    'sink',
    'refrigerator',
    'book',
    'clock',
    'vase',
    'scissors',
    'teddy bear',
    'hair drier',
    'toothbrush'];
    //The object it sees
    let chosenObject = undefined;
    let capsObject = undefined;
    //The model
    let modelName = `CocoSsd`;
    let cocossd;
    //The prediction made by CocoSsd
    let predictions = [];
    //The button
    let button = {
        x: 0,
        y: 0, 
        size: 100,
        fill: {
            r: 255,
            g: 10,
            b: 10
        }
    }
    let quality = undefined;


//SETUP
function setup() {
    createCanvas(windowWidth, windowHeight);

    button.x = width/2;
    button.y = height/2 + 150;

    //Taking an item from the objects array
    chosenObject = random(objects);
    capsObject = chosenObject.toUpperCase();

    //Get the video
    video = createCapture(VIDEO);
    video.hide();

    //Start the CocoSsd
    cocossd = ml5.objectDetector(`cocossd`, {}, function() {
        //Anonymous function once it has results
        cocossd.detect(video, gotIdeas);
    });
}


//DRAW
function draw() {
    if (state === `request`) {
        request();
    }
    if (state === `judging`) {
        judging();
    }
    if (state === `congratulations`) {
        congratulations(quality);
    }
}

//FOR WHEN IT HAS A DETECTION
function gotIdeas(error, results) {
    if (error) {
        console.error(error);
    }
    else {
        predictions = results;
    }
    // Continuity!
    cocossd.detect(video, gotIdeas);
    console.log(chosenObject);
}

//ASKING FOR THE DRAWING
function request() {
    background(241, 0, 205);

    //text
    push();
    textSize(32);
    textStyle(BOLD);
    textAlign(CENTER, CENTER);
    text(`I WOULD LIKE TO SEE A REALISTIC DRAWING OF A ${capsObject}`, width / 2, height / 2);
    pop();

    //button
    push();
    strokeWeight(2);
    fill(button.fill.r, button.fill.g, button.fill.b);
    ellipse(button.x, button.y, button.size);
    pop();
}

//JUDGING THE QUALITY OF THE DRAWING
function judging() {
    background(0);
    image (video, 0, 0, width, height);

    if (predictions) {
        for (let i = 0; i < predictions.length; i++) {
            let object = predictions[i];

            highlightObject(object);
        }
    }
}

function congratulations() {
    background(0, 255, 0);

    push();
    textSize(32);
    textStyle(BOLD);
    textAlign(CENTER, CENTER);
    text(`NICE ${capsObject}, I RATE IT A ${quality} / 10`, width / 2, height / 2);
    pop();
}

//Comparing drawing and chosenObject
function highlightObject(object) {
    if (object.label === chosenObject) {
        quality = object.confidence.toFixed(1) * 10;
        state = `congratulations`
    }
}
  
function mousePressed() {
    let d = dist(mouseX, mouseY, button.x, button.y)
    if (state === `request` && d < button.size/2) {
        state = `judging`
    };
}