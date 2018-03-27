
/* global THREE */

function texturedBox(lenX,lenY,lenZ,textureX,textureY,texturePath){
    function getTexture(scaleX,scaleY){
        var texture = new THREE.TextureLoader().load(texturePath);
        texture.wrapS = THREE.RepeatWrapping;
        texture.wrapT = THREE.RepeatWrapping;
        texture.repeat.set(scaleX, scaleY); 
        return texture;
}

var geom = new THREE.BoxGeometry(lenX,lenY,lenZ);
//    texture.wrapS = texture.wrapT = THREE.RepeatWrapping; //optinal
var textures = [];

textures[0] = getTexture(lenX/textureX,lenY/textureY);
textures[1] = getTexture(lenX/textureX,lenZ/textureX);
textures[2] = getTexture(lenZ/textureX,lenY/textureY);

var materials = [];
for(var matIndex = 0; matIndex < textures.length; matIndex++){
    var tex = textures[matIndex];
    var newMat = new THREE.MeshBasicMaterial({map:tex});
    materials.push(newMat);
}

    function smi(geom,fx,ix){
        var face = geom.faces[fx];
        face.materialIndex=ix;
    }
    function getNormal(face){
        var nV = face.normal;
        if(Math.abs(nV.x) >0){
            return "x";
        }
        if(Math.abs(nV.y) >0){
            return "y";
        }
        if(Math.abs(nV.z) >0){
            return "z";
        }
        return null;
        
        
    }
    function smiByNormal(geom){
        
        for(var i = 0; i<geom.faces.length; i++){
            var face = geom.faces[i];
            var nC = getNormal(face);
            switch (nC){
                case "x":{
                   smi(geom,i,2);     
                   break;
                }
                case "y":{
                        smi(geom,i,1); 
                   break;
                }
                case "z":{
                        smi(geom,i,0); 
                   break;     
                }
                default:{
                    alert("bad normal?");
                }
            }
        }
    }
    smiByNormal(geom);
    return new THREE.Mesh( geom, materials );
}