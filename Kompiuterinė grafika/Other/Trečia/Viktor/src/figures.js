function makeFig1(x, y, z, color) {
        THREE.ImageUtils.crossOrigin = '';
        var myTexture = THREE.ImageUtils.loadTexture( 'http://i.imgur.com/LLjlhEl.png');
        var materials = new THREE.MeshBasicMaterial( { map: myTexture} );
        var geom1 = getGeometry1();
        
        var mesh = new THREE.Mesh( geom1, materials );
        mesh.position.x = x;
        mesh.position.y = y;
        mesh.position.z = z;
        mesh.rotation.y = -Math.PI/2;
        return mesh;
}


/*function makeFig1(x, y, z, color) {
        var materials = [
            new THREE.MeshLambertMaterial( { opacity:1, color: color, transparent:false } ),
            new THREE.MeshBasicMaterial( { color: 0x000000, wireframe: true } ) ];
        
        var mesh = new THREE.SceneUtils.createMultiMaterialObject( getGeometry1(), materials );
        mesh.position.x = x;
        mesh.position.y = y;
        mesh.position.z = z;
        mesh.rotation.y = -Math.PI/2;
        return mesh;
}*/

function makeFig2(x, y, z, color) {
        THREE.ImageUtils.crossOrigin = '';
        var myTexture = THREE.ImageUtils.loadTexture( 'http://i.imgur.com/LLjlhEl.png');
        var materials = new THREE.MeshBasicMaterial( { map: myTexture} );
        var geom2 = getGeometry2();
        
        var mesh = new THREE.Mesh( geom2, materials );
        mesh.position.x = x;
        mesh.position.y = y;
        mesh.position.z = z;
        mesh.rotation.y = -Math.PI/2;
        return mesh;
}

/*
function makeFig2(x, y, z, color) {
        var materials = [
            new THREE.MeshLambertMaterial( { opacity:1, color: color, transparent:false } ),
            new THREE.MeshBasicMaterial( { color: 0x000000, wireframe: true } ) ];
        
        var mesh = new THREE.SceneUtils.createMultiMaterialObject( getGeometry2(), materials );
        mesh.position.x = x;
        mesh.position.y = y;
        mesh.position.z = z;
        mesh.rotation.y = -Math.PI/2;
        return mesh;
}*/

/*function makeFig3(x, y, z, color) {
        var materials = [
            new THREE.MeshLambertMaterial( { opacity:1, color: color, transparent:false } ),
            new THREE.MeshBasicMaterial( { color: 0x000000, wireframe: true } ) ];
        
        var mesh = new THREE.SceneUtils.createMultiMaterialObject( getGeometry3(), materials );
        mesh.position.x = x;
        mesh.position.y = y;
        mesh.position.z = z;
        mesh.rotation.y = -Math.PI/2;
        return mesh;
}*/

function makeFig3(x, y, z, color) {
        THREE.ImageUtils.crossOrigin = '';
        var myTexture = THREE.ImageUtils.loadTexture( 'http://i.imgur.com/LLjlhEl.png');
        var materials = new THREE.MeshBasicMaterial( { map: myTexture} );
        var geom3 = getGeometry3();
        
        var mesh = new THREE.Mesh( geom3, materials );
        mesh.position.x = x;
        mesh.position.y = y;
        mesh.position.z = z;
        mesh.rotation.y = -Math.PI/2;
        return mesh;
}

function makeFig4(x, y, z, color) {
        var materials = [
            new THREE.MeshLambertMaterial( { opacity:1, color: color, transparent:false } ),
            new THREE.MeshBasicMaterial( { color: 0x000000, wireframe: true } ) ];
        
        var mesh = new THREE.SceneUtils.createMultiMaterialObject( getGeometry4(), materials );
        mesh.position.x = x;
        mesh.position.y = y;
        mesh.position.z = z;
        mesh.rotation.y = -Math.PI/2;
        return mesh;
}

function makeFig5(x, y, z, color) {
        var materials = [
            new THREE.MeshLambertMaterial( { opacity:1, color: color, transparent:false } ),
            new THREE.MeshBasicMaterial( { color: 0x000000, wireframe: true } ) ];
        
        var mesh = new THREE.SceneUtils.createMultiMaterialObject( getGeometry5(), materials );
        mesh.position.x = x;
        mesh.position.y = y;
        mesh.position.z = z;
        mesh.rotation.y = -Math.PI/2;
        return mesh;
}

function makeFig6(x, y, z, color) {
        var materials = [
            new THREE.MeshLambertMaterial( { opacity:1, color: color, transparent:false } ),
            new THREE.MeshBasicMaterial( { color: 0x000000, wireframe: true } ) ];
        
        var mesh = new THREE.SceneUtils.createMultiMaterialObject( getGeometry6(), materials );
        mesh.position.x = x - 4;
        mesh.position.y = y;
        mesh.position.z = z + 4;
        mesh.rotation.y = Math.PI/2;
        return mesh;
}

function makeFig7(x, y, z, color) {
        var materials = [
            new THREE.MeshLambertMaterial( { opacity:1, color: color, transparent:false } ),
            new THREE.MeshBasicMaterial( { color: 0x000000, wireframe: true } ) ];
        
        var mesh = new THREE.SceneUtils.createMultiMaterialObject( getGeometry7(), materials );
        mesh.position.x = x;
        mesh.position.y = y;
        mesh.position.z = z;
        mesh.rotation.y = -Math.PI/2;
        return mesh;
}


function animateFig(check, mesh, speed, x, y, z, check2, rx, ry, rz) {
        if (check.B) {
                if (mesh.position.y != 10 && check2) {
                        mesh.position.y += 1/speed;
                        return true;
                } else if (mesh.rotation.x != rx) {
                        if (mesh.rotation.x < rx) {
                                mesh.rotation.x += Math.PI/10/speed;
                        } else {
                               mesh.rotation.x -= Math.PI/10/speed;
                        }
                } else if  (mesh.rotation.y != ry) {
                        if (mesh.rotation.y < ry) {
                                mesh.rotation.y += Math.PI/10/speed;
                        } else {
                               mesh.rotation.y -= Math.PI/10/speed;
                        }
                } else if  (mesh.rotation.z != rz) {
                        if (mesh.rotation.z < rz) {
                                mesh.rotation.z += Math.PI/10/speed;
                        } else {
                               mesh.rotation.z -= Math.PI/10/speed;
                        }
                } else if (mesh.position.x != x) {
                        if (mesh.position.x < x) {
                                mesh.position.x += 1/speed;
                        } else {
                               mesh.position.x -= 1/speed; 
                        }
                } else if (mesh.position.z != z) {
                        if (mesh.position.z < z) {
                                mesh.position.z += 1/speed;
                        } else {
                               mesh.position.z -= 1/speed; 
                        }
                } else if (mesh.position.y != y) {
                        //wr(mesh);
                        mesh.position.y -= 1/speed;
                } else {
                        check.B = false;
                }
                return false;
        }
}


function wr(mesh) {
        console.log(mesh.position.x, mesh.position.y, mesh.position.z);
        console.log(mesh.rotation.x, mesh.rotation.y, mesh.rotation.z);
}