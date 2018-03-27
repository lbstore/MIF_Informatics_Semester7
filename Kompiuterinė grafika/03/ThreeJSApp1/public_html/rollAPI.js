/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/* global THREE, dat */
function vecToStr(vect){
    str = vect.x+" "+vect.y+" "+vect.z;
    return str;
}
function rollTo(object,radius,point,distance){
    var currPosition = object.position.clone();
    var diff = point.clone();
    diff.sub(currPosition);
    
    var angle = 360 * (distance/(2*Math.PI * radius));
    var rad = angle * (Math.PI / 180);
//    console.log(vecToStr(diff));
    var toAdd = diff.clone();
    toAdd = diff.clone().normalize();
    
    var rotationAdd = toAdd.clone();
    rotationAdd =rotationAdd.multiplyScalar(rad);
    console.log(vecToStr(rotationAdd));
    var distanceAdd = toAdd.clone();
    distanceAdd.multiplyScalar(distance);
    object.position.add(distanceAdd);
    
    
    var saveRot = object.rotation.clone();
    object.rotation.x += rotationAdd.z;
   object.rotation.z += -rotationAdd.x;
   if(Math.abs(parseFloat(diff.z))>Math.abs(parseFloat(diff.x))){
       object.rotation.order ="YXZ";
    
    
//    object.rotation.z = 20;
   }else{
//       object.rotation.x = 0;
    object.rotation.order ="YZX";
    
   }
//   object.rotation.x = saveRot.x;
//   object.rotation.y = saveRot.y;
//   object.rotation.z = saveRot.z;
   
//   object.rotation.y += -rotationAdd.y;
   

//    var q = new THREE.Quaternion();
    
//    var rotation = rotationAdd.clone();
//    var st = rotation.clone();
//    st.applyAxisAngle(new THREE.Vector3(0,1,0),Math.PI / 180 * 90);
//    
//    var q = new THREE.Quaternion();
//    rotateAroundObjectAxis(object,st,rad);

//    var rot = object.rotation.toVector3().clone();
//    rot.add(st);
//    console.log(st);
//    object.rotation.setFromVector3(rot);
}
// Rotate an object around an axis in object space
function rotateAroundObjectAxis( object, axis, radians ) {

    var rotationMatrix = new THREE.Matrix4();
    rotationMatrix.makeRotationAxis(axis.normalize(), radians);
    object.matrix.multiply(rotationMatrix);                       // post-multiply
    object.setRotationFromMatrix(object.matrix);

}
var direction = 1;
var pathIndex = null;
var pointDelta = 1;

function iterateRoll(object,radius,distance,path){
    if(path === null){
        return;
    }
    if(pathIndex===null){
        pathIndex = 0;
        direction = 1;
        object.position = path[0].clone();
    }
    nextPoint = path[pathIndex];
    if(object.position.distanceTo(nextPoint) < pointDelta){
        pathIndex+=direction;
    }
    nextPoint = path[pathIndex];
    
    
    rollTo(object,radius,nextPoint,distance);
    if(pathIndex + direction < 0 || pathIndex + direction >= path.length){
        direction = -direction;
    }
    return nextPoint;
    
}




