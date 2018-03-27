function getGeometry() {
    var geom = new THREE.Geometry();
    geom.vertices.push(
        new THREE.Vector3(0,0,0), // 0
        new THREE.Vector3(0,0,6), // 1
        new THREE.Vector3(8,0,6), // 2
        new THREE.Vector3(8,0,0), // 3
        new THREE.Vector3(0,6,0), // 4
        new THREE.Vector3(0,6,6), // 5
        new THREE.Vector3(2,6,6), // 6
        new THREE.Vector3(2,6,0), // 7
        new THREE.Vector3(8,8,6), // 8
        new THREE.Vector3(8,8,0), // 9
        new THREE.Vector3(6,8,0), // 10
        new THREE.Vector3(6,8,6), // 11
        new THREE.Vector3(6,8,4), // 12
        new THREE.Vector3(6,8,2), // 13
        new THREE.Vector3(2,8,4), // 14
        new THREE.Vector3(2,8,2), // 15
        new THREE.Vector3(2,6,2), // 16
        new THREE.Vector3(2,6,4), // 17
        new THREE.Vector3(2,8,2), // 18
        new THREE.Vector3(2,8,4), // 19
        new THREE.Vector3(4,6,4), // 20
        new THREE.Vector3(4,6,6), // 21
        new THREE.Vector3(6,6,4), // 22
        new THREE.Vector3(6,6,6), // 23
        new THREE.Vector3(4,6,0), // 24
        new THREE.Vector3(4,6,2), // 25
        new THREE.Vector3(6,6,0), // 26
        new THREE.Vector3(6,6,2) // 27
    );
    geom.faces.push(
        //bottom
        new THREE.Face3(0,3,2),
        new THREE.Face3(2,1,0),
        //front
        new THREE.Face3(0,1,4),
        new THREE.Face3(5,4,1),
        new THREE.Face3(16,17,18),
        new THREE.Face3(17,19,18),
        // top
        new THREE.Face3(4,5,6),
        new THREE.Face3(6,7,4),
        new THREE.Face3(10,11,8),
        new THREE.Face3(8,9,10),
        new THREE.Face3(12,15,14),
        new THREE.Face3(12,13,15),
        new THREE.Face3(20,23,22),
        new THREE.Face3(20,21,23),
        new THREE.Face3(24,27,26),
        new THREE.Face3(24,25,27),
        // back
        new THREE.Face3(2,3,8),
        new THREE.Face3(3,9,8)
    );

        // |3 2|
        // |0 1|
        var uvs = [];
        uvs.push( new THREE.Vector2( 0.0-width/2, 0.0 ) ); 
        uvs.push( new THREE.Vector2( 1.0+width/2, 0.0 ) );
        uvs.push( new THREE.Vector2( 1.0-width/2, 1.0 ) );
        uvs.push( new THREE.Vector2( 0.0+width/2, 1.0 ) );
        //bottom
        geom.faceVertexUvs[ 0 ].push( [ uvs[2], uvs[3], uvs[0] ] );
        geom.faceVertexUvs[ 0 ].push( [ uvs[0], uvs[1], uvs[2] ] );
        //frront
        geom.faceVertexUvs[ 0 ].push( [ uvs[2], uvs[3], uvs[1] ] );
        geom.faceVertexUvs[ 0 ].push( [ uvs[0], uvs[1], uvs[3] ] );
        geom.faceVertexUvs[ 0 ].push( [ uvs[2], uvs[3], uvs[1] ] );
        geom.faceVertexUvs[ 0 ].push( [ uvs[0], uvs[1], uvs[3] ] );
        // top
        geom.faceVertexUvs[ 0 ].push( [ uvs[2], uvs[3], uvs[0] ] );
        geom.faceVertexUvs[ 0 ].push( [ uvs[0], uvs[1], uvs[2] ] );
        geom.faceVertexUvs[ 0 ].push( [ uvs[2], uvs[3], uvs[0] ] );
        geom.faceVertexUvs[ 0 ].push( [ uvs[0], uvs[1], uvs[2] ] );
        geom.faceVertexUvs[ 0 ].push( [ uvs[0], uvs[2], uvs[3] ] );
        geom.faceVertexUvs[ 0 ].push( [ uvs[0], uvs[1], uvs[2] ] );
        geom.faceVertexUvs[ 0 ].push( [ uvs[0], uvs[2], uvs[3] ] );
        geom.faceVertexUvs[ 0 ].push( [ uvs[0], uvs[1], uvs[2] ] );
        geom.faceVertexUvs[ 0 ].push( [ uvs[0], uvs[2], uvs[3] ] );
        geom.faceVertexUvs[ 0 ].push( [ uvs[0], uvs[1], uvs[2] ] );
        //back
        geom.faceVertexUvs[ 0 ].push( [ uvs[2], uvs[3], uvs[1] ] );
        geom.faceVertexUvs[ 0 ].push( [ uvs[3], uvs[0], uvs[1] ] );
    
    geom.computeFaceNormals();
    geom.computeVertexNormals();
    return geom;
}

function setPos(mesh, x, y, z) {
        mesh.position.x = x;
        mesh.position.y = y;
        mesh.position.z = z;
}

function getFigure(group) {
        var mesh = [28];
        THREE.ImageUtils.crossOrigin = '';
        var myTexture = THREE.ImageUtils.loadTexture ( 'http://i.imgur.com/vyBRIoA.jpg');
        var myTexture1 = THREE.ImageUtils.loadTexture( 'http://i.imgur.com/xn7lVCw.jpg');
		var myTexture2 = THREE.ImageUtils.loadTexture('http://i.imgur.com/elD3dgJ.jpg');

        var materials = [];
        // http://i.imgur.com/GHEUc8s.jpg?1
        // ar myTexture = THREE.ImageUtils.loadTexture( 'http://i.imgur.com/GHEUc8s.jpg');
        var material = new THREE.MeshLambertMaterial( { opacity:1, map: myTexture, transparent:false });
        var materials = [
            new THREE.MeshLambertMaterial( { opacity:1, map: myTexture, transparent:false } ),
             new THREE.MeshLambertMaterial( { opacity:1, map: myTexture, transparent:false } ),
             new THREE.MeshLambertMaterial( { opacity:1, map: myTexture2, transparent:false } ),
             new THREE.MeshLambertMaterial( { opacity:1, map: myTexture1, transparent:false } ),
             new THREE.MeshLambertMaterial( { opacity:1, map: myTexture, transparent:false } ),
             new THREE.MeshLambertMaterial( { opacity:1, map: myTexture, transparent:false } ) ];
        var geo = new THREE.BoxGeometry( 2, 2, 2 );
        for (var i = 0; i < 29; i++) {
                mesh[i] = new THREE.Mesh( geo, new THREE.MeshFaceMaterial( materials ) );
                group.add(mesh[i]);
        };
		var something = new THREE.LineBasicMaterial({color: 0x000000, linewidth: 100, fog:false});
		var mesh1 = new THREE.Line(mesh[0],something);
		mesh1.type = THREE.Lines;
		setPos(mesh1, 0, 0, 0);
        /*setPos(mesh[0], 0, 0, 0);
        setPos(mesh[1], 0, 0, 2);
        setPos(mesh[2], 0, 0, 4);
        setPos(mesh[3], 2, 0, 0);
        setPos(mesh[4], 2, 0, 2);
        setPos(mesh[5], 2, 0, 4);
        setPos(mesh[6], -2, 0, 0);
        setPos(mesh[7], -2, 0, 2);
        setPos(mesh[8], -2, 0, 4);
        setPos(mesh[9], -2, 2, 0);
        setPos(mesh[10], 0, 2, 0);
        setPos(mesh[11], 2, 2, 0);
        setPos(mesh[12], -2, 2, 2);
        setPos(mesh[13], 0, 2, 2);
        setPos(mesh[14], 2, 2, 2);
        setPos(mesh[15], -2, 2, 4);
        setPos(mesh[16], 0, 2, 4);
        setPos(mesh[17], 2, 2, 4);
        setPos(mesh[18], -2, 4, 0);
        setPos(mesh[19], 0, 4, 0);
        setPos(mesh[20], 2, 4, 0);
        setPos(mesh[21], 0, 4, 2);
        setPos(mesh[22], 0, 6, 0);
        setPos(mesh[23], 2, 8, 0);
        setPos(mesh[24], 0, 8, 0);
		setPos(mesh[25], -2, 8, 0);
		setPos(mesh[26], 0, 10, 0);
		//setPos(mesh[27], 2, 8, 0);*/
        // done: return it.
        return group;
}


