// Copyright (c) 2018 ml5
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

let video;
let poseNet;

let lEyex = 0;
let lEyey = 0;

let rEyex = 0;
let rEyey = 0;

let phrase = ['l', 'o', 'o', 'k', ' ', 'a', 't', ' ', 'm', 'e'];
let letter = [];

function setup() {
  createCanvas(650, 400);
  video = createCapture(VIDEO);
  video.size(width, height);
  // Hide the video element, and just show the canvas
  video.hide();

  // Create a new poseNet method with a single detection
  poseNet = ml5.poseNet(video, modelReady);
  
  // This sets up an event that fills the global variable "poses" with an array every time new poses are detected
  poseNet.on('pose', gotPoses);

}

function gotPoses(poses){
  //console.log(poses);
  lEyex = poses[0].pose.keypoints[1].position.x
  lEyey = poses[0].pose.keypoints[1].position.y
  
  rEyex = poses[0].pose.keypoints[2].position.x
  rEyey = poses[0].pose.keypoints[2].position.y
}

function modelReady() {
  select('#status').html('Model Loaded');
}

function draw() {
  image(video, 0, 0, width, height);

  for (var x = 2; x < width; x = x + 80) {
    for (var y = 14; y < height; y = y + 15.2)
      for (var i = 0; i < 12; i++) {
        letter[i] = new Letter(7.2 * i + x, y, phrase[i])

        if (letter[i].x + 20 > lEyex && lEyex > letter[i].x - 20 &&
          letter[i].y + 30 > lEyey && lEyey > letter[i].y - 25) {
          letter[i].show();
        }
        
        if (letter[i].x + 20 > rEyex && rEyex > letter[i].x - 20 &&
          letter[i].y + 30 > rEyey && rEyey > letter[i].y - 25) {
          letter[i].show();
        }
        
      }
  }
}

class Letter {
  constructor(x, y, a) {
    this.x = x;
    this.y = y;
    this.a = a;
  }
  show() {
    textSize(16);
    textAlign(CENTER);
    fill(255, 255, 255)
    text(this.a, this.x, this.y)
  }

}