let colorData = {
  fore:220,
  back:20,
  accent:0,
  accent2:0
}

let innerBound = 270
let outerBound = 300
const speed = 0.001 //lower speed drastically increase draw qualtiy, but even at high speed eventually they reach the same level
const padding = 30
const peaks = 1
const peakheight = 1 //peaks are weird. come out as simplified ratio peaks:peakheight ie. 24:15 = 8:5. the larger numbers just increase draw speed and lower quality
const linestrength = 0.3
let saveAnimation = 1000 //how many frames to save, if any.

let canvasAuto = true //auto-size canvas to window
let canvasX = 500
let canvasY = 500
let cx
let cy
let outerDot
let innerDot
let intCol
let starterdots

function setup() {
  pixelDensity(1)
  frameRate(120)
  colorData.accent = color(0,255,255)
  colorData.accent2 = color(255,0,255)
  if(canvasAuto){
    createCanvas(windowWidth,windowHeight)
    cx = windowWidth/2
    cy = windowHeight/2
    outerBound = min(windowHeight/2, windowWidth/2)*0.9
    innerBound = outerBound-padding
  }else{
    createCanvas(canvasX,canvasY)
    cx = canvasX/2
    cy = canvasY/2
  }
  background(colorData.back)
  innerDot = new dot(1)
  outerDot = new dot(0)
  starterdots = [innerDot,outerDot]
}

function draw() {
  translate(cx,cy)
  innerDot.update()
  outerDot.update()
  //print((innerDot.x+outerDot.x)/2)
  intCol = lerpColor(colorData.accent,colorData.accent2,map((innerDot.x+outerDot.x)/2,-outerBound,outerBound,0,1))
  outerDot.renderline(intCol,innerDot.x,innerDot.y)
  //innerDot.renderdot()
  //outerDot.renderdot()
  //if(starterdots != (innerDot,outerDot)){
    //saveCanvas(`Mandala-${frameCount}`,"jpg")
  //}
  print(frameRate())
}

class dot{
  constructor(i){
    this.i = i
    this.angle = 0
    this.dist = innerBound + (outerBound-innerBound)*i
    this.x = 0
    this.y = 0
  }
  update(){
    this.angle += speed*sin(((this.i*peaks)+peakheight))*((this.i*peaks)+peakheight)
    this.x = this.dist * sin(this.angle)
    this.y = this.dist * cos(this.angle)
  }
  /*renderdot(){
    noStroke()
    fill(colorData.fore)
    ellipse(this.x,this.y,1,1)
  }//*/
  renderline(color,x,y){
    stroke(color)
    strokeWeight(linestrength)
    //print(x,y)
    ellipse(sin(x/100)*this.x,sin(y/100)*this.y,1,1)
  }
}