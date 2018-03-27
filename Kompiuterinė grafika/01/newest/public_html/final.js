

var canvas = document.getElementsByTagName('canvas')[0];
var ctx = canvas.getContext('2d');
var lenFE = 0.5;
var lenBF = 0.5;

var slider1 = document.getElementById("slider1");
var slider2 = document.getElementById("slider2");
var points = [];

var stop = false;  
var fading = false;
function toggleFade(){
    fading = !fading;
}
function pause(){
    stop = !stop;
}

function clearCanvas(){
    ctx.clearRect(0,0,canvas.width, canvas.height);
}

function Point(x,y){
    this.x = x;
    this.y = y;
}




function fadingLine(from,to,intensity){
//    var gray = 255 * intensity;
    var style = "rgba(255, 0, 0," + intensity+")";
    
    ctx.beginPath();
    ctx.fillStyle = style;
    ctx.strokeStyle = style;
    ctx.lineWidth = 1;
    ctx.moveTo(from.x, from.y);
    ctx.lineTo(to.x, to.y);
    ctx.stroke();
    
    
    
}
function line(from,to,color,width){
    
    ctx.beginPath();
    ctx.strokeStyle = color;
    ctx.fillStyle = color;
    ctx.lineWidth = width;
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

function inverseKinematicsPoint(from,to,len1,len2){
    var ix = to.x - from.x;
    var iy = to.y - from.y;
    
    var targetSqrDist = ix * ix + iy * iy;
    
    var angle = Math.max(-1,Math.min(1,
    (targetSqrDist + Math.pow(len1,2) - Math.pow(len2,2)) / (2 * len1 * Math.sqrt(targetSqrDist))));
    
    //atan2 ~ atan(y/x)
    if(iteration>180 && iteration < 180*3){
        angle = (-Math.atan2(iy,ix)- Math.acos(angle));
        angle = -angle;
    }else{
        angle = (Math.atan2(iy,ix)- Math.acos(angle));
    }
    
    var p1 = new Point(0,0);
    p1.x = from.x + len1 * Math.cos(angle);
    p1.y = from.y + len1 * Math.sin(angle);
    
    return p1;
    
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

var yOffset = 500;
var unit = 70;
var baseline = 300;
var ratio = [1,2,2,3];
//ratio = [1,2,3,2];
//ratio = [2,2,3,3];
//ratio = [3,5,4,4];
var A = new Point(baseline,yOffset);
var B = new Point(baseline+unit * ratio[0],yOffset);
var D = new Point(baseline+unit * ratio[3],yOffset);
var C = new Point(0,0);//Computed
var E = new Point(0,0);//Computed
var F = new Point(0,0);//Computed

var rotationSpeed = 1;
var pointsMaxSize = 720 / rotationSpeed + 1;

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
        if(fading){
            var intensity = 1 - i / points.length;
            fadingLine(origin,to,intensity);
        }else{
            line(origin,to,"red",1);
        }
        
    }
    
}



function paint(){
    clearCanvas();
    segment(A,B,"green",8);
    segment(B,C,"green",8);
    segment(C,D,"green",8);
    segment(B,F,"red",3);
    segment(F,E,"red",3);
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
function clearPoints(){
    points = [];
    paint();
}

function solve(){
    C = inverseKinematicsPoint(B, D, unit*ratio[1], unit*ratio[2]);
//    if(iteration>180){
//        var off = canvas.height - C.y;
//        C.y = off;
//    }
    F = getCoordinateMidpoint(B, C, lenBF);
    E = getCoordinateMidpoint(B, C, lenFE + lenBF);
    E = pointRotate(E, -90, F);
    points.unshift(E);  

    if(points.length > pointsMaxSize){
        points.pop();  
    }
}

function updateValues(){
    lenFE = slider2.value/100;
    lenBF = slider1.value/100;
    clearPoints();
    solve();
    paint();
}

var iteration = 0;
setInterval(function(){
   if(!stop){
        iteration++;
        iteration%=(180*4);
        B = pointRotate(B,rotationSpeed,A);
        solve();
        paint();
   }

},5*rotationSpeed);


