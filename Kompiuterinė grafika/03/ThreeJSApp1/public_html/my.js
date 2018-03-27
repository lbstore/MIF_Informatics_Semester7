/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/* global THREE, dat */






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
    var wallWidth = 1.5;
        
    if(rotate){
        var t = distance;
        distance = wallWidth;
        wallWidth = t;
//        distance-=0.5;
    }
    distance = Math.max(distance,1);
//    distance-=1;
    wallWidth = Math.max(wallWidth,1);
    var xDistance = distance / 2;
    var zDistance = wallWidth / 2;
    var geom = new THREE.BoxGeometry(distance,wallHeight,wallWidth,1,1,1);

    
    geom.uvsNeedUpdate = true;
    
    
    var material = new THREE.MeshLambertMaterial( { color: 0xffff55, wireframe:useWireframe, polygonOffset: true} );
    var texture = new THREE.TextureLoader().load('images/lietuva.jpg');
//    texture.wrapS = texture.wrapT = THREE.RepeatWrapping; //optinal
//    texture.repeat.set( 50, 50,0.1 ); 
    material = new THREE.MeshBasicMaterial({map:texture,side: THREE.DoubleSide});
//    if(!rotate){
//        material.polygonOffsetFactor = 0.5;
//    }
//    var texture = new THREE.TextureLoader('images/checkerboard.jpg');
//    texture.wrapS = floorTexture.wrapT = THREE.RepeatWrapping; 
//    texture.repeat.set( 5, 5 );
//    material = new THREE.MeshBasicMaterial({map:texture,side: THREE.DoubleSide});
    var mesh; 
//    if(useWireframe){
//        mesh = new THREE.Mesh( new THREE.EdgesGeometry( geom ) );
//    }else{
        mesh = new THREE.Mesh( geom, material );
//    }
    mesh = texturedBox(distance,wallHeight,wallWidth,2.5,2.5,'images/cool_small.jpg');
    
    mesh.position.x = pos1.x + xDistance;
    mesh.position.z = pos1.y + zDistance;
    
    if(rotate){
        mesh.position.z+=0.01;
        mesh.position.y-=0.01;
    }else{
        mesh.position.x+=0.01;
    }
//    if(rotate){
//        mesh.position.z+=1;
//    }else{
//        mesh.position.x-=1;
//    }
      
    
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
var cameraIndex = 0;
var cameras = [];
var camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 10000 );
var orbitFree = new THREE.OrbitControls( camera, renderer.domElement );
orbitFree.enableZoom = true;
var overheadCamera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 10000 );
var dollyCamera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 10000 );
var orbitDolly = new THREE.OrbitControls( dollyCamera, renderer.domElement );
cameras.push(camera);
cameras.push(overheadCamera);
cameras.push(dollyCamera);


{
    for(var i = 0; i< cameras.length; i++){
        scene.add(cameras[i]);
    }
}

function toggleCamera(){
    cameraIndex++;
    cameraIndex %= cameras.length;
}

function getSelectedCamera(){
    return cameras[cameraIndex];
}


// color | intensity | distance | decay
var pointLight = new THREE.PointLight( 0xffffff, 100, 8000, 1 );
pointLight.position.set( 250, 550, 250 );
scene.add( pointLight );
var walker;
{
var walkerGeom = new THREE.BoxGeometry(5,5,5);
var material = new THREE.MeshLambertMaterial( { color: 0x00cc55, wireframe:useWireframe, polygonOffset: true} );
walker = new THREE.Mesh( walkerGeom, material );
scene.add(walker);

}           
            



{
var light = new THREE.AmbientLight( 0x404040 ); // soft white light
light.position.y = 100;
scene.add( light );
} 

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
    orbitFree.target.set(centerPos.x,0,centerPos.y);
    orbitFree.update();
    orbitDolly.target.set(centerPos.x,0,centerPos.y);
    orbitDolly.update();
}
{
    var len = maxX - minX;
    var geom = new THREE.BoxGeometry(len,0.5,len,100,1,100);
    geom = new THREE.PlaneGeometry(len,len,100,100);
    var material = new THREE.MeshLambertMaterial( { color: 0x1a1aff } );
    
    var floorTexture = new THREE.TextureLoader().load('images/checkerboard.jpg');
    floorTexture.wrapS = floorTexture.wrapT = THREE.RepeatWrapping; 
    floorTexture.repeat.set( 5, 5,0.1 );
    material = new THREE.MeshBasicMaterial({map:floorTexture,side: THREE.DoubleSide});
    var plane = new THREE.Mesh( geom, material );
    plane.position.x = centerPos.x;
    plane.position.z = centerPos.y;
    plane.position.y = -5.1;
    plane.rotation.x = Math.PI/180 * 90;
    scene.add(plane);
}
var cone;
{
    var radius = 50;
    var height = 100;
    var radialSegments = 10;
    var heightSegments = 10;
    var openEnded = false;
    var geom = new THREE.CylinderGeometry( 2, 5, 10, 20 );
    
    
    var vertices = [];
    
    
    var convex = new THREE.ConvexGeometry(geom.vertices);

    convex.faceVertexUvs[0] = [];
    for(var i = 0; i < 200; i++){
        convex.faceVertexUvs[0].push([
            new THREE.Vector2(0, 0),
            new THREE.Vector2(0,1),
            new THREE.Vector2(1, 1),
            new THREE.Vector2(1, 0)
        ]);
    }
   
//    convex.faceVertexUvs[2] = [];
//    convex.faceVertexUvs[2].push([
//        new THREE.Vector2(0, 1),
//        new THREE.Vector2(1, 0)]);
//        convex.faceVertexUvs[3] = [];
//    convex.faceVertexUvs[3].push([
//        new THREE.Vector2(1, 1),
//            new THREE.Vector2(10, 1),
//            new THREE.Vector2(1, 10),
//            
//            new THREE.Vector2(10, 10)]);
    convex.uvsNeedUpdate = true;
    var texture = new THREE.TextureLoader().load('images/checkerboard.jpg');
    texture.wrapS = texture.wrapT = THREE.RepeatWrapping; 
    texture.repeat.set( 5, 5 );
    var material = new THREE.MeshBasicMaterial({map:texture,side: THREE.DoubleSide});
    
//    cone = new THREE.Mesh(convex,material);
    cone = new THREE.Mesh(geom,material);
    
    cone.position.x = centerPos.x;
    cone.position.z = centerPos.y;
    cone.position.y = 0;
//    scene.add(cone);
    
}
dollyCamera.position.set(centerPos.x,200,centerPos.y);
var ball;
{
        var geom = new THREE.SphereGeometry(5,35,35);
        var ballTexture = THREE.ImageUtils.loadTexture( 'images/basketball.jpg' );
	var ballMaterial = new THREE.MeshBasicMaterial( { map: ballTexture } );
	ball = new THREE.Mesh( geom, ballMaterial );
	ball.position.set(154, 0, -3);
	scene.add( ball );
}

//PlaceLight(centerPos);
//PlaceLight(new P2(centerPos.x,centerPos.y-10));
//PlaceLight(new P2(centerPos.x,centerPos.y-25));
//PlaceLight(new P2(centerPos.x-40,centerPos.y-45));
//PlaceLight(new P2(centerPos.x-70,centerPos.y-70));
//PlaceLight(new P2(centerPos.x-60,centerPos.y-85));
//PlaceLight(new P2(centerPos.x-40,centerPos.y-100));
//PlaceLight(new P2(centerPos.x-30,centerPos.y-115));
//PlaceLight(new P2(centerPos.x,centerPos.y-130));
//PlaceLight(new P2(centerPos.x,centerPos.y-145));


//PlaceLight(new P2(40,40));
var raycaster = new THREE.Raycaster();

var mousePos = new THREE.Vector2(), INTERSECTED;
//scene.updateMatrixWorld();




var rollPath = [];

rollPath.push(new THREE.Vector3(154, 0, -3));
rollPath.push(new THREE.Vector3(154, 0, 24));
rollPath.push(new THREE.Vector3(138, 0, 24));
rollPath.push(new THREE.Vector3(138, 0, 41));
rollPath.push(new THREE.Vector3(124, 0, 41));
rollPath.push(new THREE.Vector3(124, 0, 74));
rollPath.push(new THREE.Vector3(138, 0, 74));
rollPath.push(new THREE.Vector3(138, 0, 92));
rollPath.push(new THREE.Vector3(154, 0, 92));
rollPath.push(new THREE.Vector3(154, 0, 122));
rollPath.push(new THREE.Vector3(171, 0, 122));
rollPath.push(new THREE.Vector3(171, 0, 169));
rollPath.push(new THREE.Vector3(187, 0, 169));
rollPath.push(new THREE.Vector3(187, 0, 108));
rollPath.push(new THREE.Vector3(202, 0, 108));
rollPath.push(new THREE.Vector3(202, 0, 123));
rollPath.push(new THREE.Vector3(218, 0, 123));
rollPath.push(new THREE.Vector3(219, 0, 108));
rollPath.push(new THREE.Vector3(234, 0, 108));
rollPath.push(new THREE.Vector3(234, 0, 139));
rollPath.push(new THREE.Vector3(251, 0, 139));
rollPath.push(new THREE.Vector3(251, 0, 169));
rollPath.push(new THREE.Vector3(266, 0, 169));
rollPath.push(new THREE.Vector3(266, 0, 186));
rollPath.push(new THREE.Vector3(219, 0, 186));
rollPath.push(new THREE.Vector3(219, 0, 202));
rollPath.push(new THREE.Vector3(265, 0, 202));
rollPath.push(new THREE.Vector3(265, 0, 219));
rollPath.push(new THREE.Vector3(314, 0, 219));
rollPath.push(new THREE.Vector3(314, 0, 249));
rollPath.push(new THREE.Vector3(300, 0, 249));
rollPath.push(new THREE.Vector3(298, 0, 237));
rollPath.push(new THREE.Vector3(267, 0, 237));
rollPath.push(new THREE.Vector3(267, 0, 266));
rollPath.push(new THREE.Vector3(236, 0, 266));
rollPath.push(new THREE.Vector3(235, 0, 282));
rollPath.push(new THREE.Vector3(202, 0, 282));
rollPath.push(new THREE.Vector3(202, 0, 298));
rollPath.push(new THREE.Vector3(187, 0, 298));
rollPath.push(new THREE.Vector3(187, 0, 285));
rollPath.push(new THREE.Vector3(171, 0, 285));
rollPath.push(new THREE.Vector3(171, 0, 326));

ball.position = new THREE.Vector3(154, 0, -3);

var speed = 0.2;
var radius = 5;
function ballRoll(){

    return iterateRoll(ball,radius,speed,rollPath);
//    rotate(ball,0.1,5);
//    currBallPos = ball.position.clone();
//    var dist = currBallPos.distanceTo(destPos);
//    
//    if( dist>1){
////        console.log("Postions");
////        console.log(destPos);
////        console.log(currBallPos);
////        console.log(dist);
//        rollTo(ball,5,destPos,0.1);
//    }
    
}
var clock = new THREE.Clock();
var prevPoint = new THREE.Vector3(0,0,0);
var startdir = new THREE.Vector3();
    startdir.subVectors(dollyCamera.position, orbitDolly.target);
    eyeTargetScale = Math.tan(dollyCamera.fov * (Math.PI / 180) / 2) * startdir.length();
function update(){
//    explodeIterate();

    var nextPoint = ballRoll();
    
    pointLight.position.x = getSelectedCamera().position.x;
    pointLight.position.y = getSelectedCamera().position.y;
    pointLight.position.z = getSelectedCamera().position.z;
//    pointLight.position.set(getSelectedCamera().position);
    var bp = ball.position;
    overheadCamera.position.set(bp.x, bp.y, bp.z);
    overheadCamera.position.y += 10;
    
    
    if(!nextPoint.equals(prevPoint)){
        overheadCamera.lookAt(nextPoint);
        prevPoint = nextPoint;
    }
    
    
//    dollyCamera.lookAt(bp);
    orbitDolly.target.set(bp.x,bp.y,bp.z);
    orbitDolly.update();
//    overheadCamera.
    

    var delta = clock.getDelta();
    orbitDolly.update(delta);
    var eyedir = new THREE.Vector3();
    eyedir.subVectors(dollyCamera.position, orbitDolly.target);
    dollyCamera.fov = (180 / Math.PI) * 2 * Math.atan(eyeTargetScale / eyedir.length());
    dollyCamera.near = eyedir.length() / 100;
    dollyCamera.far = eyedir.length() + 10000;
    dollyCamera.updateProjectionMatrix();

}








window.addEventListener( 'resize', function () {

    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    renderer.setSize( window.innerWidth-100, window.innerHeight-300 );

}, false );

window.addEventListener('mousemove',mm,false);
window.addEventListener('keydown',keyDown,false);
function mm(event){
//    event.preventDefault();
    mousePos.x = ( event.clientX / window.innerWidth ) * 2 - 1;
    mousePos.y = - ( event.clientY / window.innerHeight ) * 2 + 1;
//    console.log("Mouse Move");
}


function inLimit(value,array,inc){
    if(inc<0){
        return (value-inc)>array[0];
    }else{
        return (value+inc)<array[1];
    }
}
function dollyZoom(cam,steps,toLook){
    
    
    
    var fovChange = steps*0.5;
    var distanceLimit = [25,500];
    var fovLimit = [17,170];
    var distance = cam.position.distanceTo(toLook);
    if(!inLimit(cam.fov,fovLimit,fovChange)){
        return;
    }
    if(!inLimit(distance,distanceLimit,-steps)){
        return;
    }
//    if(distance<50 && steps>0){
//        return;
//    }
//    if(distance>270 && steps<0){
//        return;
//    }
    cam.fov+=fovChange;
    cam.lookAt(toLook);
    var diff = cam.position.clone();
    diff.sub(toLook);
    diff.normalize();
//    diff.multiplyScalar(steps);
    diff.negate();
    diff.multiplyScalar(steps);
    cam.position.add(diff);
    cam.updateProjectionMatrix();
    var wp = cam.position;
    var str = "";
    str+= wp.x +", ";
    str+= wp.y +", ";
    str+= wp.z;
    str += "  FOV:"+cam.fov;
    document.getElementById("cubeCoordinates").innerHTML = str;
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

function up(){
    walker.position.z++;
}
function down(){
    walker.position.z--;
}
function left(){
    walker.position.x++;
}
function right(){
    walker.position.x--;
}

function animate() {
    
    renderer.render( scene, getSelectedCamera() );
    requestAnimationFrame( animate );
    update();

}

animate();