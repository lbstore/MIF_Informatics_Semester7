/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/* global THREE, dat */

var exploded = false;
var explodeTriggered = false;
var spawned = false;
var displacementSoFar = 0;
var explodeIteration = 0.5;
var explosionRadius = 300;
var noise = 0;

var tetrahedron = null;
var goalLength = 30;
var detail = 5;

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
            
            va.add(normal);
            vb.add(normal);
            vc.add(normal);
            


    }
    geometry.verticesNeedUpdate = true;
}



function spawnGoal(scene,centerPos){
    if(tetrahedron!==null){
        console.log("Removed");
        scene.remove(tetrahedron);
    }
    var geom = new THREE.TetrahedronGeometry(goalLength,detail);
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

function explodeIterate(bomb,camera){
    if(bomb===null){
        spawnGoal();
        return;
    }
    if(!explodeTriggered){
        var distance = bomb.position.distanceTo(camera.position);
        if(distance < 50){
            explodeTriggered = true;
        }
    }
    else{
        explodeGoal(bomb);
    }
}