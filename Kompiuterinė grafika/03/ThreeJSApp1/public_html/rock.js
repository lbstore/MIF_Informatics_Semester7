/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/* global THREE, dat */

var gui = new dat.GUI();

var renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 10000 );
var orbitFree = new THREE.OrbitControls( camera, renderer.domElement );
orbitFree.enableZoom = true;

camera.position.set(0,100,-100);
scene.add(camera);

// color | intensity | distance | decay
//var pointLight = new THREE.PointLight( 0xffffff, 100, 8000, 1 );
//pointLight.position.set( 0, 500, 0 );
//scene.add( pointLight );


{
    var light = new THREE.AmbientLight( 0x404040 ); // soft white light
light.position.y = 500;
scene.add( light );
}
function sq(d){
   return d*d;
}


function generatePointsCilinder(pts,radius,height,fromTop){
    points = []; 
    min = -radius;
    max = radius;
    for(var j = 0; j < pts; j++){
        // Generate points in a 'cube'
        var x = Math.floor(Math.random() * (max - min)) + min;
        var z = Math.floor(Math.random() * (max - min)) + min;
        var y = Math.floor(Math.random() * (height-fromTop)); // 0 <= y <= H                for CYLINDER
        
        
        var formula = sq(x) + sq(z) <= (sq(radius)/(2*sq(height)))*sq(y-height);

      // Filter points according to formula
        
        
        if(formula){
            points.push(new THREE.Vector3(x, y, z));
        }
    }
    return points; 
}


var variation = 1;
function generatePoints(radius, height, pts){
    points = []; push = false;
    min = -radius;
    max = radius;
    for(var j = 0; j < pts; j++){
        // Generate points in a 'cube'
        var x = Math.floor(Math.random() * (max - min)) + min;
        var z = Math.floor(Math.random() * (max - min)) + min;
        var y;
        if (variation ===1) {
            y = Math.floor(Math.random() * (max - min)) + min;                    // for SPHERE
        }
        else if(variation ===0){
             y = Math.floor(Math.random() * height); // 0 <= y <= H                for CYLINDER
        }
        
        var formula;

      // Filter points according to formula
        if(variation===0){
            formula = sq(x) + sq(z) <= sq(radius); // CYLINDER
        }else if(variation===1){
            formula = sq(x) + sq(y) + sq(z) <= sq(radius); // Sphere
        }else{
            formula = sq(x) + sq(z) <= (sq(radius)/(2*sq(height)))*sq(y-height);
        }
        
        
        if(formula){
            points.push(new THREE.Vector3(x, y, z));
        }
//      points.push(new THREE.Vector3(x, y, z));
    }
    return points; 
}


function makeFaceUV(geom,faceIndex){
    var face = geom.faces[faceIndex];
    var a = geom.vertices[face.a].clone();
    var b = geom.vertices[face.b].clone();
    var c = geom.vertices[face.c].clone();
    function ok(v){
       var vec = v.clone();
       vec.normalize();
       U = Math.atan2(vec.x, vec.y) / Math.PI * 0.5 + 0.5;
       V = vec.y ;
       return new THREE.Vector2(U,V);
    }
    
    var ar = [ok(a),ok(b),ok(c)];
    geom.faceVertexUvs[0][faceIndex]= ar;
}
function makeUVs(geom){
    console.log("FACES");
    for(var i = 0; i < geom.faces.length; i++){
        var face = geom.faces[i];
        console.log(face);
        makeFaceUV(geom,i);
//        
//        
//        
//        var faceUvs =[v2(0,0),v2(1,0),v2(1,1)];
//        geom.faceVertexUvs[0][i] = faceUvs;
    }
    geom.uvsNeedUpdate = true;
}
function assignUVs(geometry) {

    geometry.faceVertexUvs[0] = [];

    geometry.faces.forEach(function(face) {

        var uvs = [];
        var ids = [ 'a', 'b', 'c'];
        for( var i = 0; i < ids.length; i++ ) {
            var vertex = geometry.vertices[ face[ ids[ i ] ] ].clone();

            var n = vertex.normalize();
            var yaw = .5 - Math.atan( n.z, - n.x ) / ( 2.0 * Math.PI );
            var pitch = .5 - Math.asin( n.y ) / Math.PI;

            var u = yaw,
                v = pitch;
            uvs.push( new THREE.Vector2( u, v ) );
        }
        geometry.faceVertexUvs[ 0 ].push( uvs );
    });

    geometry.uvsNeedUpdate = true;
}
function assignUVs2(geometry) {

    geometry.faceVertexUvs[0] = [];

    geometry.faces.forEach(function(face) {

        var components = ['x', 'y', 'z'].sort(function(a, b) {
            return Math.abs(face.normal[a]) > Math.abs(face.normal[b]);
        });

        var v1 = geometry.vertices[face.a];
        var v2 = geometry.vertices[face.b];
        var v3 = geometry.vertices[face.c];

        geometry.faceVertexUvs[0].push([
            new THREE.Vector2(v1[components[0]], v1[components[1]]),
            new THREE.Vector2(v2[components[0]], v2[components[1]]),
            new THREE.Vector2(v3[components[0]], v3[components[1]])
        ]);

    });

    geometry.uvsNeedUpdate = true;
}

function finalUVs(geometry){
    var dif = 0.8;
    geometry.faceVertexUvs[ 0 ] = [];
    for ( i = 0; i < geometry.faces.length; i ++ ) {
        var uvs =[];
        var face = geometry.faces[ i ];
        for ( var j = 0; j < 3; j ++ ) {
            var x, y, z;
            var vertex;
            switch(j){
                case 0:{
                    vertex = geometry.vertices[face.a].clone();
                    break;
                }
                case 1:{
                    vertex = geometry.vertices[face.b].clone();
                    break;
                }
                case 2:{
                    vertex = geometry.vertices[face.c].clone();
                    break;
                }
            }

            vertex.normalize();
            x = vertex.x;
            y = vertex.y;
            z = vertex.z;
            var x1 = 1 * (0.5 + (Math.atan2(z, x)) / (2 * Math.PI));
            var y1 = 0.5 + Math.asin(y)  / Math.PI;
            U = Math.atan2(z, x) / Math.PI * 0.5+0.5;
            V = y;;
//            scaled = y /(0.8);
//            x1 = x1*scaled;
            console.log(x1,y1);
//            uv = new THREE.Vector2(U,V);
            uv = new THREE.Vector2(x1,y1);
            uvs[j] = uv;
        }
      if (Math.abs(uvs[0].x - uvs[1].x) > dif || Math.abs(uvs[1].x - uvs[2].x) > dif || Math.abs(uvs[2].x - uvs[0].x) > dif){
        if (uvs[0].x > dif) {
          uvs[0].x -= 1;
        }
        if (uvs[1].x > dif){
         uvs[1].x -=  1;
        }
        if (uvs[2].x > dif){
          uvs[2].x -=  1;
        }
      }
      geometry.faceVertexUvs[0][i] = uvs;
  }
  geometry.uvsNeedUpdate = true;;
}
function UVs(geometry) {

    geometry.faceVertexUvs[0] = [];

    geometry.faces.forEach(function(face) {

        var uvs = [];
        var ids = [ 'a', 'b', 'c'];
        for( var i = 0; i < ids.length; i++ ) {
            var vertex = geometry.vertices[ face[ ids[ i ] ] ].clone();

            var n = vertex.normalize();
            var yaw = 0.5 - Math.atan( n.z - n.x ) / ( 2.0 * Math.PI );
            var pitch = 0.5 - Math.asin( n.y ) / Math.PI;

            var u = yaw,
                v = pitch;
            uvs.push( new THREE.Vector2( u, v ) );
        }
        geometry.faceVertexUvs[ 0 ].push( uvs );
    });

    geometry.uvsNeedUpdate = true;
}
function v2(p1,p2){
    return new THREE.Vector2(p1,p2);
}
var walker;

//walker = texturedBox(50,5,18,5,5,'images/cool_small.jpg');
//scene.add(walker);
var points = generatePointsCilinder(500000,10,10,5);
variation = 0;
//point = generatePoints(50,50,300000);
var gc = new THREE.CylinderGeometry( 2, 5, 10, 10 );
console.log("Example uvs");

var toPrint = [];
for(var i = 0; i < gc.faces.length; i++){
    var face = gc.faces[i];
    toPrint.push([gc.faceVertexUvs[0][i],face,gc.vertices[face.a],gc.vertices[face.b],gc.vertices[face.c]]);
} 

console.log(toPrint); 
gc.faceVertexUvs[0][5]= [];
//points = gc.vertices;
console.log(points);
var g = new THREE.ConvexGeometry(points);
finalUVs(g);

var texturePath = "images/checkerboard_big.jpg";
var texture = new THREE.TextureLoader().load(texturePath);
//texture.repeat.set(2, 2);
texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
var material = new THREE.MeshBasicMaterial( { color: 0xffff55, wireframe:true, polygonOffset: true} );
material = new THREE.MeshBasicMaterial({map:texture});
walker = new THREE.Mesh(g,material);
scene.add(walker);


function v3(x,y,z){
    return new THREE.Vector3(x,y,z);
}
{
    
    var points = [
        v3(0,0,0),
        v3(0,0,10),
        v3(10,0,0),
        v3(10,0,10)
    ];
//    var material = new THREE.MeshBasicMaterial( { color: 0xffff55, wireframe:true, polygonOffset: true} );

    console.log("New material");
    
    var texturePath = "images/arrow.jpg";
    var texture = new THREE.TextureLoader().load(texturePath);
    var geom = new THREE.ConvexGeometry(points);
    geom.faceVertexUvs[0][0]=[v2(0,0),v2(0,1),v2(1,0)];
//    geom.faceVertexUvs[0][1]=[v2(1,1),v2(0,1),v2(1,0)];
    console.log(geom.vertices,geom.faces);
    var material = new THREE.MeshBasicMaterial({map:texture});
    var obj = new THREE.Mesh(geom,material);
    obj.position.set(30,0,30);
//    scene.add(obj);
      
    
}
function up(){
    walker.position.x++;
}
function down(){
    walker.position.x--;
}
function left(){
    walker.position.z--;
}
function right(){
    walker.position.z++;
}
function keyDown(e){
//    e.preventDefault();
    
    switch(e.keyCode){
        case 87:{//w
                up();
//                dollyZoom(dollyCamera,1,cone.position);
                break;
        }
        case 83:{//s
                down();
//                dollyZoom(dollyCamera,-1,cone.position);
                break;
        }
        case 65:{//a
                left();
                break;
        }
        case 68:{//d
                right();
                break;
        }
        case 67:{//c
                toggleCamera();
                break;
        }
    }
    var wp = walker.position;
    var str = "";
    str+= wp.x +", ";
    str+= wp.y +", ";
    str+= wp.z;
    document.getElementById("cubeCoordinates").innerHTML = str;
    
    
    
}

function update(){
    orbitFree.target.set(walker.position.x,walker.position.y,walker.position.z);
    
}
function getSelectedCamera(){
    return camera;
}


window.addEventListener( 'resize', function () {

    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    renderer.setSize( window.innerWidth-100, window.innerHeight-300 );

}, false );
window.addEventListener('keydown',keyDown,false);

function animate() {
    
    renderer.render( scene, getSelectedCamera() );
    requestAnimationFrame( animate );
    update();

}

animate();