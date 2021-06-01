let phrase = ['l', 'o', 'o', 'k', ' ', 'a', 't', ' ', 'm', 'e'];
let letter = [];

function setup() {
  createCanvas(500, 200);
}

function draw() {
  background(255);
  for (var x = 2; x < width; x = x + 80) {
    for (var y = 14; y < height; y = y + 15.2)
      for (var i = 0; i < 12; i++) {
        letter[i] = new Letter(7.2 * i + x, y, phrase[i])

        if (letter[i].x + 20 > mouseX && mouseX > letter[i].x - 20 &&
          letter[i].y + 30 > mouseY && mouseY > letter[i].y - 25) {
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
    //fill(random(50,200), random(100, 150), random(50, 200))
    textSize(16);
    textAlign(CENTER);
    text(this.a, this.x, this.y)
  }

}