let phrase = ['d', 'o', ' ', 'n', 'o', 't', ' ', 't', 'o', 'u', 'c', 'h', ' ', 'm', 'e'];
let letter = [];

function setup() {
  createCanvas(500, 200);
}

function draw() {

  background(255);

  for (var x = 10; x < width; x = x + 120) {
    for (var y = 12; y < height; y = y + 15.2)
      for (var i = 0; i < 16; i++) {
        letter[i] = new Letter(7.2 * i + x, y, phrase[i])

        if (letter[i].x + 20 > mouseX && mouseX > letter[i].x - 20 &&
          letter[i].y + 30 > mouseY && mouseY > letter[i].y - 25) {
          letter[i].move();
        }
        letter[i].show();
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
    this.x = this.x + random(-20, 20);
    this.y = this.y + random(-20, 20);
  }
  show() {
    //fill(random(50,200), random(100, 150), random(50, 200))
    textSize(16);
    textAlign(CENTER);
    text(this.a, this.x, this.y)
  }

}