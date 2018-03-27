/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
var stop = true;  

var time = new Date().getTime();



var canvas = document.getElementsByTagName('canvas')[0];
var ctx = canvas.getContext('2d');
var c = new CtxWrap(ctx,canvas);
//ctx.scale(1,-1);
globalH = canvas.height;
globalW = canvas.width;
var lenFE = 0.5;
var lenBF = 0.5;

var slider1 = document.getElementById("slider1");
var slider2 = document.getElementById("slider2");
var points = [];
function clearPoints(){
    points = [];
}

function pause(){
    stop = !stop;
    
}
function containsPoint(a, obj) {
    for (var i = 0; i < a.length; i++) {
        
        if (Math.abs(a[i].x - obj.x) < 0.1 && Math.abs(a[i].y - obj.y) < 0.1) {
            return true;
        }
    }
    return false;
}
function updateValues(){
    lenFE = slider2.value/100;
    lenBF = slider1.value/100;
    clearPoints();
}
function clearCanvas(){
    ctx.clearRect(0,0,canvas.width, canvas.height);
}

function Link(colour,name){
    this.width = 100;
    this.color = colour;
    this.off = 1;
    this.borderWidth=1;
    this.name = name;
    this.getFront = function(){
        return this.name.charAt(0);
    };
    this.getBack = function(){
        return this.name.charAt(1);
    };
}
function Point(x,y){
    this.x = x;
    this.y = y;
}
function CtxWrap(ctx,canvas){
    this.ctx = ctx;
    this.canvas = canvas;
    this.rotateClockwise = function(deg){
        ctx.rotate(Math.PI/180 * deg);
    };
    this.translateRelative = function(x,y){
        ctx.translate(canvas.width/2 + x, canvas.height/2 + y);
    };
    this.clearCanvas = function(){
        ctx.clearRect(0,0,canvas.width, canvas.height);
    };
    this.push = function(){
        return ctx.save();
    };
    this.pop = function(){
        return ctx.restore();
    };
    
}



function drawLine(line){
    ctx.beginPath();
    ctx.moveTo(line.p1.x,line.p1.y);
    ctx.lineTo(line.p2.x,line.p2.y);
    ctx.stroke();
}
function chomp(val,min,max){
    if(val>max){
        val = max;
    }else if(val < min){
        val = min;
    }
    return val;
}
function loopVal(val,min,max){
    if(val>max){
        val = min;
    }else if(val < min){
        val = max;
    }
    return val;
}
//drawLine(new Line(new Point(0,0),new Point(100,100)));


//var l = new Line(new Point(0,0),new Point(100,100));



function draw(myLink) {
    c.push();
    ctx.beginPath();
    ctx.rect(-myLink.off, -myLink.off, myLink.width+2*myLink.off, 2*myLink.off);
    ctx.fillStyle = myLink.color;
    ctx.fill();
//    ctx.lineWidth = myLink.borderWidth;
//    ctx.strokeStyle = 'black';
//    ctx.stroke();
//    ctx.beginPath();        
//    ctx.arc(0,0,myLink.borderWidth/2,0,Math.PI*2,true);
//    ctx.fillStyle = 'red';
//    ctx.fill();
//    ctx.beginPath();        
//    ctx.arc(myLink.width,0,myLink.borderWidth/2,0,Math.PI*2,true);
//    ctx.fillStyle = 'white';
//    ctx.fill();
    c.pop();
  }
  
  
  
  
var aLink = {
    color: 'blue',
    width: 150,
    off: 5,
    borderWidth: 4
  };

var bLink = {
    color:'green',
//  color: '#FF8ED6',
  width: 200,
  off: 5,
  borderWidth: 4
};  
var time = new Date().getTime();


function drawText(link){
    draw(link);
    ctx.font = "20px Arial";
    ctx.fillStyle = "black";
    c.ctx.fillText(link.getFront(),0,0);
    c.ctx.fillText(link.getBack(),link.width,0);    
    
}








function animate(){
    var deltaTime = (new Date()).getTime() - time;
    var t = deltaTime/10;
    
    c.push();
    
    c.translateRelative(100,50);
//    ctx.translate(canvas.width/2 + 100, canvas.height/2);
    drawText(new Link("green","AB"),c.ctx);
    c.rotateClockwise(t);
//    ctx.translate(100,50);
//    ctx.rotate(Math.PI/180 * 90);
    drawText(new Link("red","BC"),c.ctx);
//    ct.ctx.restore();
    c.pop();
}
function line(from,to,color,width){
    ctx.beginPath();
    ctx.strokeStyle = color;
    ctx.fillStyle = color;
    ctx.lineWidth = width;
    //ctx.setLineDash([d0,d1]);
    ctx.moveTo(from.x, from.y);
    ctx.lineTo(to.x, to.y);
    ctx.stroke();
    
}


function segment (from,to, color, width) {

    line(from,to,color,width);
    ctx.moveTo(from.x, from.x);
    ctx.arc(from.x, from.y, width * 2, 0, 2 * Math.PI);
    ctx.moveTo(to.x, to.y);
    ctx.arc(to.x, to.y, width * 2, 0, 2 * Math.PI);
    ctx.fill();

}

function inverseKinematicsMy(from,to,len1,len2){

    
    var ix = to.x - from.x;
    var iy = to.y - from.y;
    
    var targetSqrDist = ix * ix + iy * iy;
    
    
    //var len1 = 150;
    //var len2 = 160;
    
    var theta1;
    //first
    var angle = Math.max(-1,Math.min(1,
    (targetSqrDist + Math.pow(len1,2) - Math.pow(len2,2)) / (2 * len1 * Math.sqrt(targetSqrDist))));
    
    theta1 = Math.atan2(iy,ix)- Math.acos(angle);
    var p1 = new Point(0,0);
    p1.x = from.x + len1 * Math.cos(theta1);
    p1.y = from.y + len1 * Math.sin(theta1);
    
    //second
    
    //angle = Math.max(-1,
    //Math.min(1,
    //(targetSqrDist - Math.pow(len1,2) - Math.pow(len2,2)) / (2 * len1 * len2)));
    //theta2 = Math.acos(angle);
    
    //var p2 = new Point(0,0);
    //p2.x = p1.x + len2 * Math.cos(theta2 + theta1);
    //p2.y = p1.y + len2 * Math.sin(theta2 + theta1);
    
    //line (from,p1, "navy", 8);
    //line (p1,to, "gray", 8);
    //line(from,to,"red",4);
    return p1;
    
}
function inverseKinematics(from,to){
    var ix = to.x - from.x;
    var iy = to.y - from.y;
    
    var targetSqrDist = ix * ix + iy * iy;
    
    
    var len1 = 200;
    var len2 = 100;
    
    
    //first
    var angle = Math.max(-1,
    Math.min(1,
    (targetSqrDist + Math.pow(len1,2) - Math.pow(len2,2)) / (2 * len1 * Math.sqrt(targetSqrDist))));
    
    var theta1 = Math.atan2(iy, ix) - Math.acos(angle);
    var p1 = new Point(0,0);
    p1.x = from.x + len1 * Math.cos(theta1);
    p1.y = from.y + len1 * Math.sin(theta1);
    
    //second
    
    angle = Math.max(-1,
    Math.min(1,
    (targetSqrDist - Math.pow(len1,2) - Math.pow(len2,2)) / (2 * len1 * len2)));
    var theta2 = Math.acos(angle);
    
    var p2 = new Point(0,0);
    p2.x = p1.x + len2 * Math.cos(theta2 + theta1);
    p2.y = p1.y + len2 * Math.sin(theta2 + theta1);
    segment (from,p1, "navy", 8);
    segment (p1,p2, "gray", 8);
    segment(from,to,"red",4);
}
function pointRotate(point,angle,originPoint){
    
    
    var s = Math.sin(Math.PI/180 * angle);
    var c = Math.cos(Math.PI/180 * angle);
    
    var p = new Point(point.x,point.y);
    
    p.x -= originPoint.x;
    p.y -= originPoint.y;
    var xnew = p.x * c - p.y * s;
    var ynew = p.x * s + p.y * c;
    
    p.x = xnew + originPoint.x;
    p.y = ynew + originPoint.y;
    return p;
}

function animateOld(aLink, bLink) {
    // update
    var deltaTime = (new Date()).getTime() - time;
    var t = deltaTime/10;
//    time = new Date().getTime();
    



    //if(newX < canvas.width - myRectangle.width - myRectangle.borderWidth / 2) {
    //  myRectangle.x = newX;
    //}
    // clear
//    ctx.clearRect(0, 0, canvas.width, canvas.height);
    // store initial coordinates
    ctx.save(); // [M0]
    ctx.save(); // [M0,M0]
    ctx.translate(canvas.width/2+bLink.width/2,canvas.height/2);
    ctx.rotate(Math.PI/180*t); 

    draw(aLink);
    ctx.restore();  // M0 [M0]	
//    ctx.restore();
    //
    ctx.translate(canvas.width/2-bLink.width/2,canvas.height/2);
    ctx.save();  // [M1,M0]
    ctx.rotate(Math.PI/180*t); 

    draw(aLink, ctx);
    ctx.translate(aLink.width,0);
    ctx.rotate(-Math.PI/180*t);
    draw(bLink);
    ctx.restore(); // M1 [M0] 
    draw(bLink);
    ctx.restore(); // M0 [] 
  }
stop = false;
//if(stop){
//    animateMain();
//}

var yOffset = 500;

var A = new Point(300,yOffset);
var B = new Point(400,yOffset);
var D = new Point(600,yOffset);
var C = new Point(0,0);
var E = new Point(0,0);
var F = new Point(0,0);
function getCoordinateMidpoint(from,to,percent){
    var x = to.x - from.x;
    var y = to.y - from.y;
    
    var midPoint = new Point(from.x + x*percent, from.y + y*percent);
    return midPoint;
    
    
}

function fillText(point,text){
    ctx.save();
    ctx.font = "20px Arial";
    ctx.fillStyle = "black";
    ctx.fillText(text,point.x+20,point.y+20);
    ctx.restore();
}
function curve(points){
    for(i = 1; i < points.length; i++){
        var origin = points[i-1];
        var to = points[i];
        line(origin,to,"red",1);
    }
    
}
function getCoordinateNormalPoint(from,to,percent,direction){
    var x = to.x - from.x;
    var y = to.y - from.y;
    var normal = new Point(from.x-y*percent,from.y+x*percent);
    return normal;
}


var rotationSpeed = 5;
var pointsMaxSize = 360 / rotationSpeed + 1;

function paint(){
    segment(B,F,"red",4);
    segment(F,E,"blue",4);
    segment(B,E,"blue",4);
    segment(E,C,"blue",4);
    curve(points);
    fillText(A,"A");
    fillText(B,"B");
    fillText(C,"C");
    fillText(D,"D");
    fillText(E,"E");
    fillText(F,"F");
}
function iterate(){
     B = pointRotate(B,rotationSpeed,A);
    C = inverseKinematicsMy(B,D,200,200);
    segment(A,B,"green",8);
    segment(B,C,"green",8);
    segment(C,D,"green",8);
    F = getCoordinateMidpoint(B,C,lenBF);
    E = getCoordinateMidpoint(B,C,lenFE+lenBF);
    E = pointRotate(E,-90,F);
    if(points.length < pointsMaxSize){
        points.push(E);  
    }
}
setInterval(function(){
   if(!stop){
        clearCanvas();

        iterate();
        paint();
        
        
   }

},5*rotationSpeed);
//ctx.fillText("HI",10,100);





//clearCanvas();
//   drawLine(l);
//l.p1.rotateAround(l.p2,180);
//drawLine(l);
//l.p1.rotateAround(l.p2,180);
//drawLine(l);
//l.p1.rotateAround(l.p2,180);
//drawLine(l);
//l.p1.rotateAround(l.p2,180);
