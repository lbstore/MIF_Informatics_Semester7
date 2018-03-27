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
                    fitLid: false,
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

            h = gui.addFolder( "Light direction" );

            h.add( effectController, "lx", -1.0, 1.0, 0.025 ).name( "x" ).onChange( update );
            h.add( effectController, "ly", -1.0, 1.0, 0.025 ).name( "y" ).onChange( update );
            h.add( effectController, "lz", -1.0, 1.0, 0.025 ).name( "z" ).onChange( update );
            
            gui.add(effectController,"scale",0.0,10.0,0.5).name("scale").onChange(update);
            
    }





function v2(p1,p2){
    return new THREE.Vector2(p1,p2);
}
var walker;



var texturePath = "resource/checkerboard.jpg";
var chessTexture = new THREE.TextureLoader().load(texturePath);
var chessMaterial = new THREE.MeshPhongMaterial({map:chessTexture});
//texture.repeat.set(1, 1);
//texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
var materialColor = new THREE.MeshPhongMaterial( { color: 0xffffFF, wireframe:false, polygonOffset: true} );


//LE TEAPOT
material = new THREE.MeshPhongMaterial( {  map: chessTexture, side: THREE.DoubleSide } );

var tilingMaterial = new THREE.ShaderMaterial( {
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
        vertexShader: document.getElementById( 'vertexShader').textContent,
        fragmentShader: document.getElementById( 'fragmentShader').textContent ,
        lights: true
    } );

var normalMaterial = new THREE.ShaderMaterial( {
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
        fragmentShader: document.getElementById( 'fragmentShaderNormal').textContent ,
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
				teapot = new THREE.Mesh(teapotGeometry,[materialColor,tilingMaterial,materialColor]);
				scene.add( teapot );
                                walker = teapot;

teapot.position.y = teapotSize;
//console.log("UVS BOISSS",teapotGeometry.faceVertexUvs[0]);
//console.log(teapotGeometry.faces);
//console.log(teapotGeometry.vertices);
var stripStart = 0.3;
stripStart = stripStart * (teapotSize/2);
var stripSize = 5;
var stripMeasurePoint = teapot.position.clone();

console.log(teapot);






for(f = 0; f < teapotGeometry.faces.length; f++){
    var face = teapotGeometry.faces[f];
    var vert = [teapotGeometry.vertices[face.a],teapotGeometry.vertices[face.b],teapotGeometry.vertices[face.c]];
    vert.sort(function (a,b){
        if(a.y < b.y){
            return -1;
        }
        else{
            return 1;
        }
    });
    
    var high = vert[0];
    var low = vert[2];
    stripMeasurePoint.y = low.y;
    if(low.y >stripStart && high.y < stripStart + stripSize){
        if(low.distanceTo(stripMeasurePoint) < teapotSize +10){
            face.materialIndex = 1;
            
            //face remap
            teapotGeometry.faceVertexUvs[0][f] = [v2(1,1),v2(0,1),v2(0,0)];
//            var uvs = teapotGeometry.faceVertexUvs[0][f];
//            if(uvs[0].x === uvs[2].x && uvs[1].y === uvs[2].y){ //kampas desineje apacioj
//                teapotGeometry.faceVertexUvs[0][f] = [v2(0,0),v2(0.0,1.0),v2(1.0,1.0)];
//        //                face.materialIndex = 1;
//
//            }else{
//                teapotGeometry.faceVertexUvs[0][f] = [v2(1.0,1.0),v2(1.0,0),v2(0,0)];
//            }
            
        }
    }
}



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
    
    dLight.position.set( effectController.lx, effectController.ly, effectController.lz );
    dLight.color.setHSL( effectController.lhue, effectController.lsaturation, effectController.llightness );
    ambientLight.color.setHSL( effectController.hue, effectController.saturation, effectController.lightness * effectController.ka );
    tilingMaterial.uniforms.uScale.value = effectController.scale;
}
function getSelectedCamera(){
    return camera;
}


window.addEventListener( 'resize', function () {

    var w = window.innerWidth;
    var h =window.innerHeight;
    
    
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