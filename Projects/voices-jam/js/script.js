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


let spokenWords = [`i`, `need`, `you`, `to`, `speak`, `now`];
let rapLyrics = `?`;


//Setup
function setup() {
    createCanvas(windowWidth, windowHeight);

    //speechRecognizer.continuous = false;
    //speechRecognizer.onResult = handleSpeechInput;
    //speechRecognizer.start();

}


//Draw
function draw() {
    background(30, 0, 50);    

    textSize(32);
    fill(255);
    textAlign(CENTER, CENTER);
    text(rapLyrics, width/2, height/2);

    console.log(rapLyrics);
    rapIt();
}

//Making words that are recognized into the lyrics
/*function handleSpeechInput() {
    currentSpeech = speechRecognizer.resultString;

}*/

//Making the synthesizer repeat the words back in a rhythm
function rapIt() {
    rapLyrics = spokenWords;
    speechSynthesizer.speak(rapLyrics);

}

//Mousepressed
function mousePressed() {
    rapIt();

}