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
  for (let i = 0; i < img.height; i++) {
    for (let j = 0; j < img.width; j++) {

      // Calculate the pixel index
      const index = (i * img.width + j) * 4;

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


///////////////////////


let img;
let poseNet;

function preload() {
  // load an image for pose detection
  img = loadImage('assets/images/romane.jpg');
}

function setup() {
  createCanvas(604, 806);
  img.resize(604,0);

  image(img, 0, 0);

  poseNet = ml5.poseNet(modelReady);
}

// when poseNet is ready, do the detection
function modelReady() {
  // If/When a pose is detected, poseNet.on('pose', ...) will be listening for the detection results 
  poseNet.on('pose', gotPoses);

  // When the model is ready, run the singlePose() function...
  poseNet.multiPose(img);
}

function gotPoses(poses) {
  if (poses.length > 0) {
    drawSkeleton(poses);
    drawKeypoints(poses);
    console.log(poses);
  }
}

// The following comes from https://ml5js.org/docs/posenet-webcam
// A function to draw ellipses over the detected keypoints
function drawKeypoints(poses) {
  // Loop through all the poses detected
  for (let i = 0; i < poses.length; i++) {
    // For each pose detected, loop through all the keypoints
    let pose = poses[i].pose;
    for (let j = 0; j < pose.keypoints.length; j++) {
      // A keypoint is an object describing a body part (like rightArm or leftShoulder)
      let keypoint = pose.keypoints[j];
      // Only draw an ellipse is the pose probability is bigger than 0.2
      if (keypoint.score > 0.2) {
        fill(255);
        stroke(20);
        strokeWeight(4);
        ellipse(round(keypoint.position.x), round(keypoint.position.y), 8, 8);
      }
    }
  }
}

// A function to draw the skeletons
function drawSkeleton(poses) {
  // Loop through all the skeletons detected
  for (let i = 0; i < poses.length; i++) {
    let skeleton = poses[i].skeleton;
    // For every skeleton, loop through all body connections
    for (let j = 0; j < skeleton.length; j++) {
      let partA = skeleton[j][0];
      let partB = skeleton[j][1];
      stroke(255);
      strokeWeight(1);
      line(partA.position.x, partA.position.y, partB.position.x, partB.position.y);
    }
  }
}
*/


//Pose stuff
let img;
let poseNet;
let chestArea;
let poses = [];

let upperX = [];
let upperY = [];
let lowerX = [];
let lowerY = [];

//Colour determination stuff
let avgRedUpper = 0;
let avgGreenUpper = 0;
let avgBlueUpper = 0;

let avgRedLower = 0;
let avgGreenLower = 0;
let avgBlueLower = 0;

let topHex;
let bottomHex = `7f715c`;

//Colour contrast value
let colourContrast;
let CCapi = `https://webaim.org/resources/contrastchecker/?fcolor=`;
let CCinBetween = `&bcolor=`;
let CCformat = `&api&format=json`;

//Colour names
let topColourName;
let bottomColourName;
let CNapi = `https://www.thecolorapi.com/id?hex=`;
let CNformat = `&format=json`;

//Colour Schemes
let colourSchemes;
let CSapi;
let CSformat;

//PRELOAD
function preload() {
  img = loadImage('assets/images/romane3.jpg');
}

//SETUP
function setup() {
  //pixel density
  pixelDensity(1);
  //resize image
  img.resize(600, 0);
  // Loading the pixels
  img.loadPixels();
  //canvas height is set to image height post-resize
  createCanvas(600, 900);

  //background and display image
  background (50);
  image(img, 0, 0);

  //Calling Posenet
  poseNet = ml5.poseNet(img, modelLoaded);
}

//MODEL LOADED
function modelLoaded() {
  console.log(`model loaded`);

  //When it detects poses, call gotPoses function that will make the chest
  poseNet.on(`pose`, gotPoses);
  poseNet.singlePose(img);
}

//GOT POSES
function gotPoses(pose) {
    poses = pose;

  if (poses) {
    drawChest(poses);
    drawLegs(poses);
    console.log(poses);
  }
}

//DRAW CHEST
function drawChest(poses) {
  if (poses) {
    //Drawing stuff to show chest area
    noFill();
    //noStroke();
    strokeWeight(2);
    quad(poses[0].pose.rightShoulder.x, poses[0].pose.rightShoulder.y, poses[0].pose.leftShoulder.x, poses[0].pose.leftShoulder.y, poses[0].pose.leftHip.x, poses[0].pose.leftHip.y, poses[0].pose.rightHip.x, poses[0].pose.rightHip.y);
  }

  //Making arrays for x and y of the upper body rectangle points. Chest box is proportionately shorter to exclude the waist area, that was messing with accuracy
  upperX[0] = round(poses[0].pose.rightHip.x);
  upperX[1] = round(poses[0].pose.leftHip.x);
  upperY[0] = round(poses[0].pose.leftShoulder.y);
  upperY[1] = round(poses[0].pose.leftHip.y-(upperX[1]-upperX[0]));

  chestColour();  
}

//CHEST COLOUR
function chestColour() {
  //Indexes for top left and bottom right pixels in chest area for the pixels array
  let pixelIdx1 = (upperX[0] + upperY[0] * width) * 4;
  let pixelIdx2 = (upperX[1] + upperY[1] * width) * 4;

  //Looping in the pixels array and excluding pixels outside the rectangle region
  let count = 0;
  let count2 = 0;
  let i;
  for (i = pixelIdx1; i < pixelIdx2; i+=4) {
    if (count < (upperX[1] - upperX[0])) {
      //Adding the red, green, and blue values
      avgRedUpper += img.pixels[i + 0];
      avgGreenUpper += img.pixels[i + 1];
      avgBlueUpper += img.pixels[i + 2];
      count += 1;
    }

    else {
      count = 0;
      i += (width - (upperX[1]-upperX[0]))*4  ;
      count2 += 1;
    }
  }

  // Get the total number of pixels
  const numPixelsUpper = (upperX[1]-upperX[0])*(upperY[1]-upperY[0]);

  // divide the totals by the number of pixels to find the average.
  avgRedUpper /= numPixelsUpper;
  avgGreenUpper /= numPixelsUpper;
  avgBlueUpper /= numPixelsUpper;

  console.log(round(avgRedUpper), round(avgGreenUpper), round(avgBlueUpper));
}

//DRAW LEGS
function drawLegs(poses) {
  if (poses) {
    //Drawing stuff to show legs area
    fill(255);
    ellipse(poses[0].pose.rightHip.x, poses[0].pose.rightHip.y, 10);
    ellipse(poses[0].pose.leftHip.x, poses[0].pose.leftHip.y, 10);
    ellipse(poses[0].pose.rightKnee.x, poses[0].pose.rightKnee.y, 10);
    ellipse(poses[0].pose.leftKnee.x, poses[0].pose.leftKnee.y, 10);
  }

  legsColour();
}

function legsColour() {
  //Making arrays for x and y of the lower body rectangle points
  lowerX[0] = round(poses[0].pose.rightHip.x);
  lowerY[0] = round(poses[0].pose.rightHip.y);
  lowerY[1] = round(poses[0].pose.rightKnee.y);

  //Indexes for top left and bottom right pixels in legs area for the pixels array
  let pixelIdx1 = (lowerX[0] + lowerY[0] * width) * 4;
  let pixelIdx2 = (lowerX[0] + lowerY[1] * width) * 4;

  console.log(pixelIdx1);
  console.log(pixelIdx2);

  //Looping in the pixels array and excluding pixels outside the rectangle region
  for (let i = pixelIdx1; i < pixelIdx2; i++) {
      //Adding the red, green, and blue values
      avgRedLower += img.pixels[i + 0];
      avgGreenLower += img.pixels[i + 1];
      avgBlueLower += img.pixels[i + 2];
      i += (width * 4) - 1;
    }

  // Get the total number of pixels
  const numPixelsLower = abs(lowerY[0]-lowerY[1]);

  // divide the totals by the number of pixels to find the average.
  avgRedLower /= numPixelsLower;
  avgGreenLower /= numPixelsLower;
  avgBlueLower /= numPixelsLower;

  console.log(round(avgRedLower), round(avgGreenLower), round(avgBlueLower));

  //Buttons
  let button1 = createButton(`How's my fit?`);
  button1.position(100, 100);
  button1.mousePressed(askContrast);
}

function askContrast() {
  let CNurlTop = CNapi + `rgb=${round(avgRedUpper)},${round(avgGreenUpper)},${round(avgBlueUpper)}` + CNformat;
  loadJSON(CNurlTop, gotTopName);

  let CNurlBottom = CNapi + `rgb=${round(avgRedLower)},${round(avgGreenLower)},${round(avgBlueLower)}` + CNformat;
  loadJSON(CNurlBottom, gotBottomName);

  let CCurl = CCapi + topHex + CCinBetween + bottomHex + CCformat;
  loadJSON(CCurl, gotContrast);

}

function gotTopName(data) {
  topColourName = data;

  if (topColourName) {
    text(topColourName.name.value, width/2, height/2);

    topHex = topColourName.hex.clean;
  }
}

function gotBottomName(data) {
  bottomColourName = data;

  if (bottomColourName) {
    text(bottomColourName.name.value, width/2, height/2 + 100);

    bottomHex = bottomColourName.hex.clean;
  }
}

//GOT DATA
function gotContrast(data) {
  colourContrast = data;

  if (colourContrast) {
    text(colourContrast.ratio, width/2, height/2 + 50);
  }

  /*
  //Converting colours to Hex codes
  let colorTop = color(avgRedUpper, avgGreenUpper, avgBlueUpper);
  let colorBottom = color(avgRedLower, avgGreenLower, avgBlueLower);

  console.log(hexTop);

  //Drawing Top colour
  push();
  rectMode(CENTER);
  stroke(0);
  strokeWeight(3);
  fill(colorTop);
  rect(width/2, height/2 - 200, 400, 300);

  fill(avgRedLower -20, avgGreenLower -20, avgBlueLower -20);
  noStroke();
  textSize(32);
  textAlign(CENTER);
  //text(`#${hexTop}`, width/2, height/2 - 200);
  pop();

  //Drawing Bottom colour
  push();
  rectMode(CENTER);
  stroke(0);
  strokeWeight(3);
  fill(colorBottom);
  rect(width/2, height/2 + 200, 400, 300);

  fill(avgRedUpper -20, avgGreenUpper -20, avgBlueUpper -20);
  noStroke();
  textSize(32);
  textAlign(CENTER);
  //text(hexBottom, width/2, height/2 + 200);
  pop();
  */
}



/*
function setup() {
  createCanvas(200, 200);

  background(0);

  let button = createButton(`Check it out`);
  button.position(100, 100);
  button.mousePressed(colourAsk);

}

function gotData(data) {
  colourInfo = data;

  if(colourInfo) {
    push();
    //fill(colourInfo.rgb.r, colourInfo.rgb.g, colourInfo.rgb.b);
    fill(255);
    //ellipse(100, 100, 100, 100);
    text(colourInfo.ratio, 100, 100);
    pop();

  }


}

function colourAsk() {
  let url = api + hex1 + inBetween + hex2 + format;

  loadJSON(url, gotData);

}

//494643
//7f715c
*/