/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
var canvas = document.getElementsByTagName("canvas")[0];
var ctx = canvas.getContext('2d');


function drawTriangle(){
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.lineTo(200, 0);
    ctx.lineTo(0, 100);
    ctx.fill();
    
}

ctx.rotate(Math.PI/4);
ctx.translate(350,0);
ctx.save();
ctx.translate(0,100);
ctx.fillStyle = "rgb(150,150,150)";
drawTriangle();
ctx.restore();
ctx.rotate(Math.PI);
ctx.translate(0,-100);
ctx.fillStyle = "#000000";
drawTriangle();

