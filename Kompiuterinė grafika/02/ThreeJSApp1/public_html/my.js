/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/* global THREE, dat */

var tetrahedron = null;
var goalLength = 30;
var detail = 5;


var exploded = false;
var explodeTriggered = false;
var displacementSoFar = 0;
var explodeIteration = 0.5;
var explosionRadius = 300;
var noise = 0;

var useWireframe = false;

//ExtractLines from svg
pointPairs = [];
finalSvg = document.getElementById("mazeDiv").getElementsByTagName("svg")[0];
        
lines = finalSvg.getElementsByTagName("g")[0].getElementsByTagName("line");
for(var i = 0; i < lines.length; i++){
    var pp = [];
    var curLine = lines[i];
    var p1 = new P2(parseFloat(curLine.getAttribute("x1")), parseFloat(curLine.getAttribute("y1")));
    var p2 = new P2(parseFloat(curLine.getAttribute("x2")), parseFloat(curLine.getAttribute("y2")));
    pp.push(p1);
    pp.push(p2);
    var debugStr = pp[0].x + " "+ pp[0].y +" -> "+pp[1].x +" "+pp[1].y;
  
    console.log(debugStr);
    pointPairs.push(pp);
}
THREE.ExplodeModifier = function () {

};

THREE.ExplodeModifier.prototype.modify = function ( geometry ) {

        var vertices = [];

        for ( var i = 0, il = geometry.faces.length; i < il; i ++ ) {

                var n = vertices.length;

                var face = geometry.faces[ i ];

                var a = face.a;
                var b = face.b;
                var c = face.c;


                var va = geometry.vertices[ a ];
                var vb = geometry.vertices[ b ];
                var vc = geometry.vertices[ c ];

                vertices.push( va.clone() );
                vertices.push( vb.clone() );
                vertices.push( vc.clone() );

                face.a = n;
                face.b = n + 1;
                face.c = n + 2;

        }

        geometry.vertices = vertices;

};
function applyFaceNormalDisplacement(geometry,scalar,noise=0){
    for ( var i = 0, il = geometry.faces.length; i < il; i ++ ) {
            
            
            var face = geometry.faces[ i ];
            var max = noise;
            var min = -noise;
            var newScalar = scalar + (Math.random() * (max - min)) + min;
            var normal = face.normal.clone().multiplyScalar(newScalar);



            var va = geometry.vertices[ face.a ];
            var vb = geometry.vertices[ face.b ];
            var vc = geometry.vertices[ face.c ];

            var y = -53.2;
            if(va.y < y|| vb.y <y || vc.y < y){
                continue;
            }
            
//            var newVA = va.clone().add(normal);
            
            va.add(normal);
            vb.add(normal);
            vc.add(normal);
            

//            conditionalAddY(va,normal,-100);
//            conditionalAddY(vb,normal,-50);
//            conditionalAddY(vc,normal,-50);

            

    }
    geometry.verticesNeedUpdate = true;
}



function P2(x,y){
    this.x = x;
    this.y = y;
}

function P3(x,y,z){
    this.x = x;
    this.y = y;
    this.z = z;
}


function Wall(pos1, pos2){
    if(pos1.x > pos2.x){
        var t = pos1.x;
        pos1.x = pos2.x;
        pos2.x = t;
    }
    if(pos1.y > pos2.y){
        var t = pos1.y;
        pos1.y = pos2.y;
        pos2.y = t;
    }
    var rotate = (pos1.x === pos2.x);
    var distance = Math.abs(pos1.x - pos2.x) + Math.abs(pos1.y - pos2.y) + 1;
    var wallHeight = 10;
    var wallWidth = 2;
        
    if(rotate){
        var t = distance;
        distance = wallWidth;
        wallWidth = t;
    }
    distance = Math.max(distance,1);
    distance-=1;
    wallWidth = Math.max(wallWidth,1);
    var xDistance = distance / 2;
    var zDistance = wallWidth / 2;
    var geom = new THREE.BoxGeometry(distance,wallHeight,wallWidth);
    var material = new THREE.MeshLambertMaterial( { color: 0x00cc55, wireframe:useWireframe, polygonOffset: true} );
    material.polygonOffsetFactor = -0.5;
    var mesh; 
//    if(useWireframe){
//        mesh = new THREE.Mesh( new THREE.EdgesGeometry( geom ) );
//    }else{
        mesh = new THREE.Mesh( geom, material );
//    }
    
    mesh.position.x = pos1.x + xDistance;
    mesh.position.z = pos1.y + zDistance;
        
    
    return mesh;
    
}

function PlaceLight(pos){
    var pointLight = new THREE.PointLight( 0x404040, 10, 50, 1 );
    pointLight.position.set( pos.x, 5, pos.y );
    scene.add( pointLight );
}
var gui = new dat.GUI();

var renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

var scene = new THREE.Scene();
//FoV, aspect ratio, ClippingPlanes: near, far //not render
var camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 10000 );
var orbit = new THREE.OrbitControls( camera, renderer.domElement );
orbit.enableZoom = true;
// color | intensity | distance | decay
var pointLight = new THREE.PointLight( 0x404040, 100, 800, 1 );
pointLight.position.set( 250, 550, 250 );
//scene.add( pointLight );
            
            
            



//Plane

//var plane = new THREE.Mesh(new THREE.PlaneGeometry(10,10,32), new THREE.MeshBasicMaterial({color:0xFFFF00}));
//scene.add(plane);
//plane.position.y = 0;
//plane.rotation.x = Math.PI / 180 * -90;
{
var light = new THREE.AmbientLight( 0x404040 ); // soft white light
light.position.y = 100;
scene.add( light );
} 
// pas mus  nebus kveternionu
// 
// 
//polygon off set
//
//
//scene.add(generateWall(1,0,10));
//scene.add(generateWall(11,0,10));
//scene.add(generateWall(10,10,10));
//scene.add(generateWall(100,100,10));
//scene.add(Wall(new P2(-100,10),new P2(100,10)));

//scene.add(Wall(new P2(0,0), new P2(0,33)));
//scene.add(Wall(new P2(20,33),new P2(0,33)));
//scene.add(Wall(new P2(20,33),new P2(20,100)));

//x1="2" y1="2" x2="146" y2="2"
//scene.add(Wall(new P2(2,2)))
//
//scene.add(Wall(new P2(20,100),new P2(20,150)));
var minX = 1000;
var maxX = 0;
var minY = 1000;
var maxY = 0;
for(var j = 0; j < pointPairs.length; j++){
    var pp = pointPairs[j];
    minX = Math.min(minX,pp[0].x);
    minX = Math.min(minX,pp[1].x);
    minY = Math.min(minY,pp[0].y);
    minY = Math.min(minY,pp[1].y);
    
    maxX = Math.max(maxX,pp[0].x);
    maxX = Math.max(maxX,pp[1].x);
    maxY = Math.max(maxY,pp[0].y);
    maxY = Math.max(maxY,pp[1].y);
    scene.add(Wall(pp[0],pp[1]));
}
{
var debugStr = minX+" "+minY+"  "+maxX+"  "+maxY;
console.log(debugStr);
var centerPos = new P2((minX+maxX)/2,(minY+maxY)/2);
console.log(centerPos.x+" "+centerPos.y);
orbit.target.set(centerPos.x,0,centerPos.y);
orbit.update();
}
{
    var len = maxX - minX;
    var geom = new THREE.BoxGeometry(len,1,len,100,1,100);
    var material = new THREE.MeshLambertMaterial( { color: 0x1a1aff } );
    
    var plane = new THREE.Mesh( geom, material );
    plane.position.x = centerPos.x;
    plane.position.z = centerPos.y;
    plane.position.y = -5;
    scene.add(plane);
}

//for(var i = 0; i < 10; i++){
//    PlaceLight(new P2(center,40));
//
//}



PlaceLight(centerPos);
PlaceLight(new P2(centerPos.x,centerPos.y-10));
PlaceLight(new P2(centerPos.x,centerPos.y-25));
PlaceLight(new P2(centerPos.x-40,centerPos.y-45));
PlaceLight(new P2(centerPos.x-70,centerPos.y-70));
PlaceLight(new P2(centerPos.x-60,centerPos.y-85));
PlaceLight(new P2(centerPos.x-40,centerPos.y-100));
PlaceLight(new P2(centerPos.x-30,centerPos.y-115));
PlaceLight(new P2(centerPos.x,centerPos.y-130));
PlaceLight(new P2(centerPos.x,centerPos.y-145));


//PlaceLight(new P2(40,40));

function spawnGoal(){
    if(tetrahedron!==null){
        console.log("Removed");
        scene.remove(tetrahedron);
    }
    var geom = new THREE.TetrahedronGeometry(goalLength,detail);
//    var geom = new THREE.BoxGeometry(goalLength,goalLength,goalLength,detail,detail,detail);
    var explodeModifier = new THREE.ExplodeModifier();
    explodeModifier.modify( geom );
    var material = new THREE.MeshLambertMaterial( { color: 0x6600ff} );
    material.side = THREE.DoubleSide;
    tetrahedron = new THREE.Mesh( geom, material );
    tetrahedron.position.x = centerPos.x;
    tetrahedron.position.z = centerPos.y;
    tetrahedron.position.y = 50;
    tetrahedron.name = "Goal";
    scene.add(tetrahedron); 
}
spawnGoal();


function explodeGoal(){
    
    if(!exploded){
        //update faces
        displacementSoFar +=explodeIteration;
        applyFaceNormalDisplacement(tetrahedron.geometry,explodeIteration,noise);
        if(displacementSoFar >= explosionRadius){
            exploded = true;
            displacementSoFar=0;
        }
    }  
    else{
        spawnGoal();
        exploded = false;
        explodeTriggered = false;
    }
    
}


//scene.updateMatrixWorld();
function update(){
    if(!explodeTriggered){
        var distance = tetrahedron.position.distanceTo(camera.position);
        if(distance < 50){
            explodeTriggered = true;
        }
    }
    else{
        explodeGoal(tetrahedron);
    }
//    pointLight.position.x += Math.sin(pointLight.position.x)*10;
//    pointLight.position.z += Math.cos(pointLight.position.z)*10;
    
    pointLight.position.x = camera.position.x;
    pointLight.position.y = camera.position.y;
    pointLight.position.z = camera.position.z;
//    pointLight.position.y = (pointLight.position.y + 0.1 ) % 500;

//    cube.rotation.x += 0.1;
}
//bus klausimas is keturgrandžio mechanizmo

window.addEventListener( 'resize', function () {

    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    renderer.setSize( window.innerWidth, window.innerHeight );

}, false );
function animate() {
    


    renderer.render( scene, camera );
    requestAnimationFrame( animate );
    update();

}
animate();