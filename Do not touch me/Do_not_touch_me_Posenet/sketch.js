// Copyright (c) 2018 ml5
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

let video;
let poseNet;
let poses = [];

let phrase = ['d', 'o', ' ', 'n', 'o', 't', ' ', 't', 'o', 'u', 'c', 'h', ' ', 'm', 'e'];
let letter = [];

let singleL;

function setup() {
  createCanvas(650, 400);
  video = createCapture(VIDEO);
  video.size(width, height);

  // Create a new poseNet method with a single detection
  poseNet = ml5.poseNet(video, modelReady);
  // This sets up an event that fills the global variable "poses"
  // with an array every time new poses are detected
  poseNet.on('pose', function(results) {
    poses = results;
  });
  // Hide the video element, and just show the canvas
  video.hide();
}

function modelReady() {
  select('#status').html('Model Loaded');
}

function draw() {
  image(video, 0, 0, width, height);
  
  for (var x = 10; x < width; x = x + 120) {
    for (var y = 12; y < height; y = y + 15.2)
      for (var w = 0; w < 16; w++) {
        letter[w] = new Letter(7.2 * w + x, y, phrase[w])
        
        for (let i = 0; i < poses.length; i++) {
        let pose = poses[i].pose;
          
            for (let j = 0; j < pose.keypoints.length; j++) {
            let keypoint = pose.keypoints[j];

              
              if (letter[w].x + 30 > keypoint.position.x && keypoint.position.x > letter[w].x - 30 &
              letter[w].y + 40 > keypoint.position.y && keypoint.position.y > letter[w].y - 35) {
              letter[w].move();
              }
           }
        }
      letter[w].show();
      }
  }
}

class Letter {
  constructor(x, y, a) {
    this.x = x;
    this.y = y;
    this.a = a;
  }
  move() {
    this.x = this.x + random(-30, 30);
    this.y = this.y + random(-30, 30);
  }
  show() {
    //fill(random(50,200), random(100, 150), random(50, 200))
    textSize(14);
    textAlign(CENTER);
    fill(255, 255, 255)
    text(this.a, this.x, this.y)
  }

}