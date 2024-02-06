"use strict";

const speechRecognizer = new p5.SpeechRec();
let currentSpeech = `?`;

function setup() {
    createCanvas(500, 500);

    speechRecognizer.onResult = handleSpeechInput;
    speechRecognizer.start();
}

function draw() {
    background(255, 263, 24);

    textAlign(CENTER, CENTER);
    textSize(24);
    text(currentSpeech, width/2, height/2);

}

function handleSpeechInput() {
    currentSpeech = speechRecognizer.resultString;

}

