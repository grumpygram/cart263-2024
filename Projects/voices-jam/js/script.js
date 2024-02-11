/**
 * Voices Jam
 * Graeme Peters
 * 
 * This is a project where I will attempt to make an 
 * uncooperative French robot that will pretend to not 
 * understand what you are saying to it.
 */

"use strict";

/*


//Draw
function draw() {   

    addWords();
    sayIt();
}

//Displaying the words that are in the array
function addWords() {
    currentWordFill.r = random(50, 255);
    currentWordFill.g = random(50, 255);
    currentWordFill.b = random(50, 255);

    textSize(32);
    fill(255);
    textAlign(CENTER, CENTER);
    text(currentWords, width/2, height/2);

}

*/

//Opening stuff
    let backgroundFill = {
        r: 30,
        g: 0,
        b: 50
    };
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
    let currentWordFill = {
        r: 0,
        y: 0,
        b: 0
    }
    
    //p5.Speech stuff
    const speechRecognizer = new p5.SpeechRec();
    const speechSynthesizer = new p5.Speech();
    let recordMe = false;

    //Arrays
    let currentWords = [];
    let repeatingWords = [];


//Setup
function setup() {
    createCanvas(windowWidth, windowHeight);

    button.x = width/2;
    button.y = height/2;

    speechRecognizer.continuous = true;
    speechRecognizer.interimResults = true;
    speechRecognizer.onEnd = handleSpeechInput;
    speechSynthesizer.interrupt = true;
}

//Draw
function draw() {
    background(backgroundFill.r, backgroundFill.g, backgroundFill.b);

    push();
    fill(button.fill.r, button.fill.g, button.fill.b);
    ellipse(button.x, button.y, button.size);
    pop();
}

//Putting words that are recognized into the spoken words array
function handleSpeechInput() {

    //Adding spoken words to the current sentence array
    let lowerCaseResult = speechRecognizer.resultString.toLowerCase();
    let parts = lowerCaseResult.split(` `)

    for (let i = 0; i < currentWords.length; i++) {
        currentWords.push(parts[i]);

        if (currentWords.length === 5) {
            repeatingWords.push(currentWords.slice());
            currentWords = [];
        }
    }
}

function talkBack() {
    speechSynthesizer.speak(currentWords);

}

//Mousepressed
function mousePressed() {
    //Distance between mouse and button
    let d1 = dist(mouseX, mouseY, button.x, button.y);

    if (recordMe === false && d1 <= button.size/2) {
        //Starting recording
        speechRecognizer.start();

        //Setting variable
        recordMe = true;
        console.log(`started recording`)
        return;
    }
    if (recordMe && d1 <= button.size/2) {
        //Stopping recording
        speechRecognizer.stop();

        //Resetting variable
        recordMe = false;

        //Moving button
        console.log(`stopped recording`)
        button.x = random(0 + button.size/2, width - button.size/2);
        button.y = random(0 + button.size/2, height - button.size/2);
        talkBack();
        return
    }
}

/*
  // Displaying current group
  textAlign(CENTER);
  textSize(24);
  fill(0);
  if (currentWords.length > 0) {
    text(currentWords.join(" "), width/2, height/2);
  }*/
