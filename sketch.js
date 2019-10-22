var clones;
var playTime, loadTime;
var amp, level;
var bgcolor;
var fft;

function preload() {
    clones = loadSound("clones.mp3");
}

function setup() {
  createCanvas(800, 600);

  if (clones.isLoaded()) {
    loadTime = millis();
    print(loadTime);
    clones.play();
  }

  amp = new p5.Amplitude();
  fft = new p5.FFT();
}


function draw() {
  background(255);
  noStroke();
  playTime = millis() - loadTime;
  // print(playTime);
  level = amp.getLevel();
  // print(level);

  mappedColor = map(level, 0, 1, 0, 255);

  cSize = map(level, 0, 1, 0, width);

  let lerping = lerpColor(color("orange"), color("green"), level)
  // fill(lerping);


  // strokeWidth(10);
  if (playTime > 6000) {
    for (var i = 0; i < width; i++) {
      // grad1 = lerpColor(color("purple"), color("yellow"), map(i, 0, width, 0, 1));
      grad1 = lerpColor(color("purple"), color("yellow"), level);
      stroke(grad1);
      line(i, 0, i, height);
    }
  }

  fill(0);
  // background(mappedColor);
  circle(width / 2, height / 2, cSize);

  var spectrum = fft.analyze();
  var trebleVol = fft.getEnergy("treble");
  var midVol = fft.getEnergy("mid");
  var bassVol = fft.getEnergy("bass");


  fill(255);
  circle(200,100, trebleVol);
  circle(400,300, midVol);
  circle(600, 500, bassVol);


}