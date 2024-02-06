




"use strict";


//Setup stuff
const animals = [
        "aardvark",
        "alligator",
        "alpaca",
        "antelope",
        "ape",
        "armadillo",
        "baboon",
        "badger",
        "bat",
        "bear",
        "beaver",
        "bison",
        "boar",
        "buffalo",
        "bull",
        "camel",
        "canary",
        "capybara",
        "cat",
        "chameleon",
        "cheetah",
        "chimpanzee",
        "chinchilla",
        "chipmunk",
        "cougar",
        "cow",
        "coyote",
        "crocodile",
        "crow",
        "deer",
        "dingo",
        "dog",
        "donkey",
        "dromedary",
        "elephant",
        "elk",
        "ewe",
        "ferret",
        "finch",
        "fish",
        "fox",
        "frog",
        "gazelle",
        "gila monster",
        "giraffe",
        "gnu",
        "goat",
        "gopher",
        "gorilla",
        "grizzly bear",
        "ground hog",
        "guinea pig",
        "hamster",
        "hedgehog",
        "hippopotamus",
        "hog",
        "horse",
        "hyena",
        "ibex",
        "iguana",
        "impala",
        "jackal",
        "jaguar",
        "kangaroo",
        "koala",
        "lamb",
        "lemur",
        "leopard",
        "lion",
        "lizard",
        "llama",
        "lynx",
        "mandrill",
        "marmoset",
        "mink",
        "mole",
        "mongoose",
        "monkey",
        "moose",
        "mountain goat",
        "mouse",
        "mule",
        "muskrat",
        "mustang",
        "mynah bird",
        "newt",
        "ocelot",
        "opossum",
        "orangutan",
        "oryx",
        "otter",
        "ox",
        "panda",
        "panther",
        "parakeet",
        "parrot",
        "pig",
        "platypus",
        "polar bear",
        "porcupine",
        "porpoise",
        "prairie dog",
        "puma",
        "rabbit",
        "raccoon",
        "ram",
        "rat",
        "reindeer",
        "reptile",
        "rhinoceros",
        "salamander",
        "seal",
        "sheep",
        "shrew",
        "silver fox",
        "skunk",
        "sloth",
        "snake",
        "squirrel",
        "tapir",
        "tiger",
        "toad",
        "turtle",
        "walrus",
        "warthog",
        "weasel",
        "whale",
        "wildcat",
        "wolf",
        "wolverine",
        "wombat",
        "woodchuck",
        "yak",
        "zebra"
];
let currentAnimal = `?`;
let currentAnswer = ``;
const speechSynthesizer = new p5.Speech();
const speechRecognizer = new p5.SpeechRec();

//let compSpeaking = false;

//Setup
function setup() {
    createCanvas(500, 500);

    speechRecognizer.continuous = true;
    speechRecognizer.onResult = handleSpeechInput;
    speechRecognizer.start();
}

//Draw
function draw() {
    background(3, 171, 73);

    if (currentAnswer === currentAnimal) {
        fill(111, 93, 219);
    } else {
        fill(222, 76, 13);
    }
    textSize(24);
    textAlign(CENTER, CENTER);
    text(currentAnimal, width/2, height/2 - 100);
    text(currentAnswer, width/2, height/2);
}

//MousePressed
function mousePressed() {
    currentAnimal = random(animals);
    let reverseAnimal = reverseString(currentAnimal);
    speechSynthesizer.speak(reverseAnimal);
}

//Handling what is guessed
function handleSpeechInput() {
    let guessedAnimal = `Hmm... that doesn't sound quite right`;

    if (speechRecognizer.resultValue) {
        let lowerCaseResult = speechRecognizer.resultString.toLowerCase();
        let parts = lowerCaseResult.split(`i think it is `);
        if (parts.length > 1) {
            guessedAnimal = parts[1];
        }
    }
    currentAnswer = guessedAnimal;
    console.log(currentAnswer);
}

//Reverses the string
function reverseString(string) {
    // Split the string into an array of characters
    let characters = string.split(``);
    // Reverse the array of characters
    let reverseCharacters = characters.reverse();
    // Join the array of characters back into a string
    let result = reverseCharacters.join(``);
    // Return the result
    return result;
  }
