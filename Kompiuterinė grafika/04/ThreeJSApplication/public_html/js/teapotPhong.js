/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/* global THREE, dat */

function equalsEp(v1,v2){
    var e = 0.0000001;
    return Math.abs(v1 - v2) < e;
}


var effectController;
var renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera( 40, window.innerWidth / window.innerHeight, 0.1, 10000 );
var orbitFree = new THREE.OrbitControls( camera, renderer.domElement );
orbitFree.enableZoom = true;
var dLight = new THREE.DirectionalLight( 0xFFFFFF, 1.0 );
scene.add(dLight);
setupGui();



camera.position.set(0,100,-100);
scene.add(camera);

// color | intensity | distance | decay
//var pointLight = new THREE.PointLight( 0xffffff, 100, 8000, 1 );
//pointLight.position.set( 0, 500, 0 );
//scene.add( pointLight );


var ambientLight = new THREE.AmbientLight( 0x404040 ); // soft white light
ambientLight.position.set(100,50,100);
scene.add( ambientLight );
function setupGui() {

            effectController = {

                    shininess: 40.0,
                    ka: 0.17,
                    kd: 0.51,
                    ks: 0.2,
                    metallic: true,

                    hue:		0.121,
                    saturation: 0.73,
                    lightness:  0.66,

                    lhue:		 0.04,
                    lsaturation: 0.01,	// non-zero so that fractions will be shown
                    llightness:  1.0,

                    // bizarrely, if you initialize these with negative numbers, the sliders
                    // will not show any decimal places.
                    lx: 0.32,
                    ly: 0.39,
                    lz: 0.7,
                    newTess: 8,
                    bottom: true,
                    lid: true,
                    body: true,
                    fitLid: true,
                    nonblinn: false,
                    newShading: "glossy",
                    
                    scale:1.0
                    
                    
            };

            var h;

            var gui = new dat.GUI();


            // light (point)

            h = gui.addFolder( "Lighting" );

            h.add( effectController, "lhue", 0.0, 1.0, 0.025 ).name( "hue" ).onChange( update );
            h.add( effectController, "lsaturation", 0.0, 1.0, 0.025 ).name( "saturation" ).onChange( update );
            h.add( effectController, "llightness", 0.0, 1.0, 0.025 ).name( "lightness" ).onChange( update );
            h.add( effectController, "ka", 0.0, 1.0, 0.025 ).name( "ambient" ).onChange( update );

            // light (directional)

//            h = gui.addFolder( "Light direction" );
//
//            h.add( effectController, "lx", -1.0, 1.0, 0.025 ).name( "x" ).onChange( update );
//            h.add( effectController, "ly", -1.0, 1.0, 0.025 ).name( "y" ).onChange( update );
//            h.add( effectController, "lz", -1.0, 1.0, 0.025 ).name( "z" ).onChange( update );
//            
//            gui.add(effectController,"scale",0.0,10.0,0.5).name("scale").onChange(update);
            
    }





function v2(p1,p2){
    return new THREE.Vector2(p1,p2);
}
var walker;



var arrowPath = "resource/arrow.jpg";
var arrowTexture = new THREE.TextureLoader().load(arrowPath);
var arrowMaterial = new THREE.MeshPhongMaterial({map:arrowTexture});

var texturePath = "resource/checkerboard.jpg";
var chessTexture = new THREE.TextureLoader().load(texturePath);
var chessMaterial = new THREE.MeshPhongMaterial({map:chessTexture});
//texture.repeat.set(1, 1);
//texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
var materialColor = new THREE.MeshPhongMaterial( { color: 0xffffFF, wireframe:false} );


//LE TEAPOT
material = new THREE.MeshPhongMaterial( {  map: chessTexture, side: THREE.DoubleSide } );


var normalMaterialTop = new THREE.ShaderMaterial( {
    uniforms: THREE.UniformsUtils.merge([
        
        THREE.UniformsLib['lights'],{
        "color1" : {
            type : "c",
            value : new THREE.Color(0xff00ff)
        },
        "color2" : {
            type : "c",
            value : new THREE.Color(0x00FFFF)
        },
			uScale: {type: 'f', value: 8.0}
			
    }]),
        vertexShader: document.getElementById( 'vertexShaderNormal').textContent,
        fragmentShader: document.getElementById( 'fragmentShaderNormalTop').textContent ,
        lights: true
    } );
var normalMaterialBot = new THREE.ShaderMaterial( {
    uniforms: THREE.UniformsUtils.merge([
        
        THREE.UniformsLib['lights'],{
        "color1" : {
            type : "c",
            value : new THREE.Color(0xff00ff)
        },
        "color2" : {
            type : "c",
            value : new THREE.Color(0x00FFFF)
        },
			uScale: {type: 'f', value: 8.0}
			
    }]),
        vertexShader: document.getElementById( 'vertexShaderNormal').textContent,
        fragmentShader: document.getElementById( 'fragmentShaderNormalBot').textContent ,
        lights: true
    } );

var teapotSize = 50;
var tess  = effectController.newTess;
var teapotGeometry = new THREE.TeapotGeometry( teapotSize,
					effectController.newTess,
					effectController.bottom,
					effectController.lid,
					effectController.body,
					effectController.fitLid,
					! effectController.nonblinn );
				teapot = new THREE.Mesh(teapotGeometry,[normalMaterialTop,materialColor,normalMaterialTop]);
				scene.add( teapot );
                                walker = teapot;
teapot.verticesNeedsUpdate = true;
teapot.position.y = teapotSize;
//console.log("UVS BOISSS",teapotGeometry.faceVertexUvs[0]);
//console.log(teapotGeometry.faces);
//console.log(teapotGeometry.vertices);


console.log(teapot);



function vectorEq(v1,v2){
    return (equalsEp(v1.x,v2.x)&&((equalsEp(v1.y,v2.y))&&(equalsEp(v1.z,v2.z))));
}

function faceEq(f1,f2){
    return (f1.a === f2.b && (f1.b === f2.b && f1.c === f2.c));
}
function getFaceVertex(geometry,face){
    var arr= [geometry.vertices[face.a],geometry.vertices[face.b],geometry.vertices[face.c]];
    return arr;
}
function containsVector(arr,vector){
    for(var i = 0; i < arr.length; i++){
        if(arr[i]===vector){
            return true;
        }
    }
    return false;
}
function addIfNotPresent(array,value,test){
    if(!array.find(test)){
        array.push(value);
    }
    return array;
}
function collectConnectedFaces(geometry,firstVertexIndex){
    
    var connected = new Set();
    
    var firstFaceIndex = null;
    for(i = 0; i < geometry.faces.length; i++){
        var face = geometry.faces[i];
        if(face.a === firstVertexIndex){
            firstFaceIndex = i;
            break;
        }
    }
    var firstFace = geometry.faces[firstFaceIndex];
    var vertices = [firstFace.a,firstFace.b,firstFace.c];
    var iter = 0;
    while(iter<vertices.length){
        var vI = vertices[iter];
//        console.log("Iteration start "+iter,connected.size,vertices.length);
        iter+=1;
        for(var i = 0; i < geometry.faces.length; i++){
            var f = geometry.faces[i];
            if(!connected.has(i)){// face not included
                var ver = [f.a,f.b,f.c];
                if(ver.indexOf(vI)>=0){//found
                    connected.add(i);
                    if(vertices.indexOf(f.a)<0){
                        vertices.push(f.a);
                    }
                    if(vertices.indexOf(f.b)<0){
                        vertices.push(f.b);
                    }
                    if(vertices.indexOf(f.c)<0){
                        vertices.push(f.c);
                    }
                }      
            }
            
        }
        
//        console.log("Iteration end "+iter,connected.size,vertices.length);
        
    }
    
    return Array.from(connected);
    
}


var boxG = new THREE.BoxGeometry(32,32,32,2,2,2);
var box = new THREE.Mesh(boxG,[normalMaterialTop,materialColor]);
for(var i=0;i<boxG.faces.length;i++){
    boxG.faces[i].materialIndex = 0;
}
var f = collectConnectedFaces(boxG,0);
for(var i=0;i<f.length;i++){
    boxG.faces[f[i]].materialIndex = 1;
}
//scene.add(box);

    
    
    
  
teapotGeometry.uvsNeedUpdate = true;

var highest = 0;


var setBotTop = true;

if(setBotTop){
    for(var j = 0; j < teapotGeometry.vertices.length; j++){
        var current = teapotGeometry.vertices[highest];
        var tryNew = teapotGeometry.vertices[j];
        if(current.y<tryNew.y){
            highest = j;
        }
    }

    var con = collectConnectedFaces(teapotGeometry,0);
    for(var j = 0; j < con.length; j++){
        
        teapotGeometry.faces[j].materialIndex = 1;
    }
    for(var j = 0; j < teapotGeometry.faces.length; j++){
        var face = teapotGeometry.faces[j];
        var ver = teapotGeometry.vertices[face.a];
        function sq(x){
            return x*x;
        }
        var d1 = Math.sqrt(sq(teapot.position.x - ver.x) + sq(teapot.position.z - ver.z));
        if(d1>teapotSize){
            teapotGeometry.faces[j].materialIndex = 1;
        }
        if(ver.y<-45){
            teapotGeometry.faces[j].materialIndex = 0;
        }
    }

    teapotGeometry.uvsNeedUpdate = true;
    console.log("Highest " +highest,teapotGeometry.vertices[highest]);
    console.log(con);
}

//for(var j = 0; j < teapotGeometry.faces.length; j++){
//    var face = teapotGeometry.faces[j];
////    var v = teapotGeometry.vertices;
////    var vert = [v[face.a],v[face.b],v[face.c]];
//    var uvs = teapotGeometry.faceVertexUvs[0][j];
//    teapotGeometry.faceVertexUvs[0][j] = [];
////    if(uvs[0].x === uvs[2].x && uvs[1].y === uvs[2].y){ //kampas desineje apacioj
////        teapotGeometry.faceVertexUvs[0][j] = [v2(0,0),v2(1.0,1.0),v2(0,1.0)];
////    }else{
////        teapotGeometry.faceVertexUvs[0][j] = [v2(0,0),v2(1.0,0),v2(1,1)];
////    }
//
//    if(uvs[0].x === uvs[2].x && uvs[1].y === uvs[2].y){ //kampas desineje apacioj
//        teapotGeometry.faceVertexUvs[0][j] = [v2(0,0),v2(1.0,1.0),v2(1,0)];
//    }else{
//        teapotGeometry.faceVertexUvs[0][j] = [v2(0,0),v2(0,1.0),v2(1,1)]; //kampas kaireje virsuje
//    }
//
//}
teapotGeometry.uvsNeedUpdate = true;

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
//    document.getElementById("cubeCoordinates").innerHTML = str;
    console.log("Position",walker.position);
    
    
}

function update(){
    

    orbitFree.target.set(walker.position.x,walker.position.y,walker.position.z);
    
//    dLight.position.set( effectController.lx, effectController.ly, effectController.lz );
    dLight.position.set(getSelectedCamera().position.x,getSelectedCamera().position.y,getSelectedCamera().position.z);
    dLight.color.setHSL( effectController.lhue, effectController.lsaturation, effectController.llightness );
    ambientLight.color.setHSL( effectController.hue, effectController.saturation, effectController.lightness * effectController.ka );
}
function getSelectedCamera(){
    return camera;
}


window.addEventListener( 'resize', function () {

    var w = window.innerWidth-200;
    var h =window.innerHeight-200;
    
    
    camera.aspect = w / h;
    camera.updateProjectionMatrix();

    renderer.setSize( w, h );

}, false );
window.addEventListener('keydown',keyDown,false);

function animate() {
    update();
    renderer.render( scene, getSelectedCamera() );
    requestAnimationFrame( animate );
}

animate();