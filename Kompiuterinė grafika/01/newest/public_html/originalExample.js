/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
var canvas = document.getElementsByTagName("canvas")[0];
var ctx = canvas.getContext('2d');

//      window.requestAnimFrame = (function(callback) {
//        return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame ||
//        function(callback) {
//          window.setTimeout(callback, 1000 / 60);
//        };
//      })();
      
      function draw(myLink, ctx) {
        ctx.beginPath();
        ctx.rect(-myLink.off, -myLink.off, myLink.width+2*myLink.off, 2*myLink.off);
        ctx.fillStyle = myLink.color;
        ctx.fill();
        ctx.lineWidth = myLink.borderWidth;
        ctx.strokeStyle = 'black';
        ctx.stroke();
        ctx.beginPath();        
        ctx.arc(0,0,myLink.borderWidth/2,0,Math.PI*2,true);
        ctx.fillStyle = 'white';
        ctx.fill();
        ctx.beginPath();        
        ctx.arc(myLink.width,0,myLink.borderWidth/2,0,Math.PI*2,true);
        ctx.fillStyle = 'white';
        ctx.fill();
      }
      function animate(aLink, bLink, startTime) {
        // update
        var time = (new Date()).getTime() - startTime;

        var t = time / 10;
        
        
        
        //if(newX < canvas.width - myRectangle.width - myRectangle.borderWidth / 2) {
        //  myRectangle.x = newX;
        //}
        // clear
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        // store initial coordinates
        ctx.save(); // [M0]
        ctx.save(); // [M0,M0]
        ctx.translate(canvas.width/2+100,canvas.height/2);
        ctx.rotate(Math.PI/180*t); 
        
        draw(aLink, ctx);
        ctx.restore();  // M0 [M0]		
        ctx.translate(canvas.width/2-100,canvas.height/2);
        ctx.save();  // [M1,M0]
        ctx.rotate(Math.PI/180*t); 
        
        draw(aLink, ctx);
        ctx.translate(aLink.width,0);
        ctx.rotate(-Math.PI/180*t);
        draw(bLink, ctx);
        ctx.restore(); // M1 [M0] 
        draw(bLink, ctx);
        ctx.restore(); // M0 [] 
        // request new frame
//        requestAnimFrame(function() {
//          animate(aLink, bLink, startTime);
//        });
      }
      

      var aLink = {
        color: '#8ED6FF',
        width: 150,
        off: 10,
        borderWidth: 4
      };

      var bLink = {
        color: '#FF8ED6',
        width: 200,
        off: 10,
        borderWidth: 4
      };
      

      
      //draw(myLink, ctx);

      // wait one second before starting animation
//      setTimeout(function() {
        var startTime = (new Date()).getTime();
        
        setInterval(function(){
            animate(aLink, bLink, startTime);
        },25);
//      }, 1000);

