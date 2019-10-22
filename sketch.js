var clones;
var playTime, loadTime;
var amp, level;
var bgcolor;
var fft;

function preload() {
    clones = loadSound("clones.mp3");
}

function setup() {
  createCanvas(900, 700);
  userStartAudio();
  background(200,80,200);

  if (clones.isLoaded()) {
    loadTime = millis();
    print(loadTime);
    clones.play();
  }



  amp = new p5.Amplitude();
  fft = new p5.FFT();
}


function draw() {
  playTime = millis() - loadTime;
  level = amp.getLevel();

  mappedColor = map(level, 0, 1, 0, 255);

  cSize = map(level, 0, 1, 0, width);
  
  var spectrum = fft.analyze();
  var trebleVol = fft.getEnergy("treble");
  var midVol = fft.getEnergy("mid");
  var bassVol = fft.getEnergy("bass");


  stroke(10+ trebleVol);

  fill(255,40,30,40);
  circle(200,100, trebleVol * 2);
  circle(400,300, midVol * 2);
  circle(600, 500, bassVol * 2);


  fill(200,50,200,80);
  circle(500,600, trebleVol);
  circle(300,400, midVol);
  circle(100, 200, bassVol);

}
