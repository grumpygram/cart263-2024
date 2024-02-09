/**
 * Voices Jam
 * Graeme Peters
 * 
 * This is a project where I will attempt to make an 
 * uncooperative French robot that will pretend to not 
 * understand what you are saying to it.
 */

"use strict";

const speechRecognizer = new p5.SpeechRec();
const speechSynthesizer = new p5.Speech();

let currentWords = [];
let repeatingWords = [];

let currentWordFill = {
    r: 0,
    y: 0,
    b: 0
}


//Setup
function setup() {
    createCanvas(windowWidth, windowHeight);

    speechRecognizer.continuous = true;
    speechRecognizer.interimResults = true;
    speechRecognizer.onResult = handleSpeechInput;
    speechRecognizer.start();

}

//Draw
function draw() {
    background(30, 0, 50);    
}

//Putting words that are recognized into the spoken words array
function handleSpeechInput() {

    let spokenWords = speechRecognizer.resultString;

    for (let i = 0; i < spokenWords.length; i++) {
        currentWords.push(spokenWords[i]);
    }

    console.log(currentWords);



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

//Mousepressed
function mousePressed() {

}