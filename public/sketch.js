let socket = io();
let myColor = "white";

socket.on("connect", newConnection);
socket.on("mouseBroadcast", drawOtherMouse);
socket.on("color", setColor);
socket.on("newPlayer", newPlayer);

function newPlayer(newPlayerColor) {
  console.log(newPlayerColor);

  fill('purple');
  rectMode('CENTER');
  noStroke();
  rect(widht / 2, height / 2, 400, 50);
  
  push();
  textSize(30);
  textAlign("center");
  fill(newPlayerColor);
  text("New player joined" + newPlayerColor, width/2, height/2);
  pop();
}

function setColor(assignedColor){
  myColor = assignedColor;
}

function newConnection(){
  console.log("your id: " + socket.id);
}

function drawOtherMouse(data){
push();
  fill(data.color);
  ellipse(data.x, data.y, 10);
pop();
}

function preload(){
  // put preload code here
}

function setup() {
  createCanvas(windowWidth,windowHeight)
  // put setup code here
  background("purple");
  fill(myColor);
  textSize(30);
  textAlign("center");
    text("Welcome" + myColor, width / 2, height / 2);
}

function draw() {
  // put drawing code here
}

function mouseMoved() {
  push();
    fill(myColor);
    ellipse(mouseX, mouseY, 20);
  pop();

let message = {
  x: mouseX,
  y: mouseY,
  color: myColor,
};

socket.emit("mouse", message);
}
