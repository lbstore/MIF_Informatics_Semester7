/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

var allCanvas = document.getElementsByTagName('canvas');

var canvas = allCanvas[allCanvas.length -1 ];
document.writeln(allCanvas.length);
var context = canvas.getContext('2d');
var mainCanvas = canvas;
var mainContext = context;
 
var circles = new Array();
         
var requestAnimationFrame = window.requestAnimationFrame || 
                            window.mozRequestAnimationFrame ||
                            window.webkitRequestAnimationFrame ||
                            window.msRequestAnimationFrame;

function Circle(radius, speed, width, xPos, yPos) {
  this.radius = radius;
  this.speed = speed;
  this.width = width;
  this.xPos = xPos;
  this.yPos = yPos;
  this.opacity = .05 + Math.random() * .5;
 
  this.counter = 0;
 
  var signHelper = Math.floor(Math.random() * 2);
 
  if (signHelper === 1) {
    this.sign = -1;
  } else {
    this.sign = 1;
  }
}
 
Circle.prototype.update = function () {
 
  this.counter += this.sign * this.speed;
 
  mainContext.beginPath();
             
  mainContext.arc(
    this.xPos + Math.cos(this.counter / 100) * this.radius, 
    this.yPos + Math.sin(this.counter / 100) * this.radius, 
    this.width, 
    0, 
    Math.PI * 2,
    false
  );
                             
  mainContext.closePath();
 
  mainContext.fillStyle = 'rgba(185, 211, 238,' + this.opacity + ')';
  mainContext.fill();
};
 
function drawCircles() {
  for (var i = 0; i < 100; i++) {
    var randomX = Math.round(-200 + Math.random() * 700);
    var randomY = Math.round(-200 + Math.random() * 700);
    var speed = .2 + Math.random() * 3;
    var size = 5 + Math.random() * 100;
 
    var circle = new Circle(100, speed, size, randomX, randomY);
    circles.push(circle);
  }

  draw();
}

drawCircles();
 
function draw() {
  mainContext.clearRect(0, 0, 500, 500);
 
  for (var i = 0; i < circles.length; i++) {
    var myCircle = circles[i];
    myCircle.update();
  }
  
  requestAnimationFrame(draw);
}