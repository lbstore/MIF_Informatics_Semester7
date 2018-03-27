
function getGeometry1() {
    var geom = new THREE.Geometry();
    geom.vertices.push(
        new THREE.Vector3(2,4,2), // 0 punkta
        new THREE.Vector3(2,4,0),
        new THREE.Vector3(2,0,2),
        new THREE.Vector3(2,0,0),
        new THREE.Vector3(0,4,0),
        new THREE.Vector3(0,4,2), //5
        new THREE.Vector3(0,0,0),
        new THREE.Vector3(0,0,2), //7
        new THREE.Vector3(4,2,0), // 8
        new THREE.Vector3(4,2,2), // 9
        new THREE.Vector3(4,0,0), // 10
        new THREE.Vector3(4,0,2), // 11
        new THREE.Vector3(2,2,0), // 12
        new THREE.Vector3(2,2,2) // 13
    );
       // (0,0,2) (4,0,2) (0,4,2)
    geom.faces.push(
        new THREE.Face3(7,11,5),
        new THREE.Face3(13,0,5),
        new THREE.Face3(11,9,13),
        new THREE.Face3(4,10,6),
        new THREE.Face3(1,12,4),
        new THREE.Face3(12,8,10),
        new THREE.Face3(6,7,5),
        new THREE.Face3(5,4,6),
        new THREE.Face3(1,5,0),
        new THREE.Face3(5,1,4),
        new THREE.Face3(1,13,12),
        new THREE.Face3(13,1,0),
        new THREE.Face3(13,9,8),
        new THREE.Face3(8,12,13),
        new THREE.Face3(6,11,7),
        new THREE.Face3(6,10,11),
        new THREE.Face3(9,11,10),
        new THREE.Face3(8,9,10)
    );
    // |3 2|
    // |0 1|
    var uvs = [];
    uvs.push( new THREE.Vector2( 0.0, 0.0 ) ); 
    uvs.push( new THREE.Vector2( 1.0, 0.0 ) );
    uvs.push( new THREE.Vector2( 1.0, 1.0 ) );
    uvs.push( new THREE.Vector2( 0.0, 1.0 ) );
    geom.faceVertexUvs[ 0 ].push( [ uvs[0], uvs[1], uvs[3] ] );//sonas didzioji visur 0,1,3 kur didysis trikampis
    geom.faceVertexUvs[ 0 ].push( [ uvs[1], uvs[2], uvs[3] ] );
    geom.faceVertexUvs[ 0 ].push( [ uvs[1], uvs[2], uvs[3] ] );
        geom.faceVertexUvs[ 0 ].push( [ uvs[3], uvs[1], uvs[0] ] );
        geom.faceVertexUvs[ 0 ].push( [ uvs[1], uvs[2], uvs[0] ] );
        geom.faceVertexUvs[ 0 ].push( [ uvs[0], uvs[1], uvs[2] ] );
            geom.faceVertexUvs[ 0 ].push( [ uvs[3], uvs[2], uvs[1] ] );//nugara
            geom.faceVertexUvs[ 0 ].push( [ uvs[0], uvs[1], uvs[2] ] );
                geom.faceVertexUvs[ 0 ].push( [ uvs[1], uvs[3], uvs[0] ] );//virsus
                geom.faceVertexUvs[ 0 ].push( [ uvs[2], uvs[0], uvs[3] ] );
                 geom.faceVertexUvs[ 0 ].push( [ uvs[1], uvs[3], uvs[2] ] );//virsus (ant issikisusios)
                 geom.faceVertexUvs[ 0 ].push( [ uvs[0], uvs[2], uvs[3] ] );
                        geom.faceVertexUvs[ 0 ].push( [ uvs[1], uvs[2], uvs[3] ] );
                        geom.faceVertexUvs[ 0 ].push( [ uvs[1], uvs[2], uvs[3] ] );
                             geom.faceVertexUvs[ 0 ].push( [ uvs[1], uvs[3], uvs[0] ] );//apacia kaip ir pirmas geom
                            geom.faceVertexUvs[ 0 ].push( [ uvs[1], uvs[2], uvs[3] ] );
                                geom.faceVertexUvs[ 0 ].push( [ uvs[1], uvs[2], uvs[3] ] );
                                geom.faceVertexUvs[ 0 ].push( [ uvs[2], uvs[3], uvs[1] ] );


    
    geom.computeFaceNormals();
    geom.computeVertexNormals();
    return geom;
}

function getGeometry2() {
    var geom = new THREE.Geometry();
    geom.vertices.push(
        new THREE.Vector3(2,6,2), // 0 punkta
        new THREE.Vector3(2,6,0), //1
        new THREE.Vector3(2,0,2),
        new THREE.Vector3(2,0,0),
        new THREE.Vector3(0,6,0), //4
        new THREE.Vector3(0,6,2), //5
        new THREE.Vector3(0,0,0),
        new THREE.Vector3(0,0,2), //7
        new THREE.Vector3(4,2,0), // 8
        new THREE.Vector3(4,2,2), // 9
        new THREE.Vector3(4,0,0), // 10
        new THREE.Vector3(4,0,2), // 11
        new THREE.Vector3(2,2,0), // 12
        new THREE.Vector3(2,2,2) // 13
    );
       
    geom.faces.push(
        new THREE.Face3(7,11,13),
        new THREE.Face3(13,0,5),
        new THREE.Face3(11,9,13),
        new THREE.Face3(7,13,5),
        
        new THREE.Face3(4,12,6),
        new THREE.Face3(1,12,4),
        new THREE.Face3(12,8,10),
        new THREE.Face3(6,12,10),
        
        new THREE.Face3(6,7,5),
        new THREE.Face3(5,4,6),
        new THREE.Face3(1,5,0),
        new THREE.Face3(5,1,4),
        new THREE.Face3(1,13,12),
        new THREE.Face3(13,1,0),
        new THREE.Face3(13,9,8),
        new THREE.Face3(8,12,13),
        new THREE.Face3(6,11,7),
        new THREE.Face3(6,10,11),
        new THREE.Face3(9,11,10),
        new THREE.Face3(8,9,10)
    );

   var uvs = [];
    uvs.push( new THREE.Vector2( 0.0, 0.0 ) ); 
    uvs.push( new THREE.Vector2( 1.0, 0.0 ) );
    uvs.push( new THREE.Vector2( 1.0, 1.0 ) );
    uvs.push( new THREE.Vector2( 0.0, 1.0 ) );
    geom.faceVertexUvs[ 0 ].push( [ uvs[3], uvs[1], uvs[0] ] );
	geom.faceVertexUvs[ 0 ].push( [ uvs[3], uvs[7], uvs[0] ] );
    
    geom.computeFaceNormals();
    geom.computeFaceNormals();
    return geom;
}


function getGeometry3() {
    var geom = new THREE.Geometry();
    geom.vertices.push(
        new THREE.Vector3(2,6,2), // 0 punkta
        new THREE.Vector3(2,6,0), //1
        new THREE.Vector3(2,0,2),
        new THREE.Vector3(2,0,0),
        new THREE.Vector3(0,6,0), //4
        new THREE.Vector3(0,6,2), //5
        new THREE.Vector3(0,0,0),
        new THREE.Vector3(0,0,2), //7
        new THREE.Vector3(4,4,0), // 8
        new THREE.Vector3(4,4,2), // 9
        new THREE.Vector3(4,2,0), // 10
        new THREE.Vector3(4,2,2), // 11
        new THREE.Vector3(2,2,0), // 12
        new THREE.Vector3(2,2,2), // 13
        new THREE.Vector3(2,4,0),
        new THREE.Vector3(2,4,2) // 15
    );
       
    geom.faces.push(
        //rigth
        new THREE.Face3(13,11,9),
        new THREE.Face3(13,9,15),
        new THREE.Face3(7,2,13),
        new THREE.Face3(7,13,5),
        new THREE.Face3(13,0,5),
        
        new THREE.Face3(8,10,12),
        new THREE.Face3(14,8,12),
        new THREE.Face3(12,3,6),
        new THREE.Face3(4,12,6),
        new THREE.Face3(4,1,12),
        
        new THREE.Face3(6,7,5),
        new THREE.Face3(5,4,6),
        
        
        new THREE.Face3(12,13,2),
        new THREE.Face3(12,2,3),
        
        //top
        new THREE.Face3(15,9,8),
        new THREE.Face3(8,14,15),
        new THREE.Face3(1,5,0),
        new THREE.Face3(5,1,4),
        
        //bott
        new THREE.Face3(6,3,7),
        new THREE.Face3(7,3,2),
        new THREE.Face3(12,10,13),
        new THREE.Face3(10,11,13),
        new THREE.Face3(1,0,15),
        new THREE.Face3(1,15,14),
        new THREE.Face3(9,11,10),
        new THREE.Face3(8,9,10)
    );
 var uvs = [];
    uvs.push( new THREE.Vector2( 0.0, 0.0 ) ); 
    uvs.push( new THREE.Vector2( 1.0, 0.0 ) );
    uvs.push( new THREE.Vector2( 1.0, 1.0 ) );
    uvs.push( new THREE.Vector2( 0.0, 1.0 ) );
    geom.faceVertexUvs[ 0 ].push( [ uvs[0], uvs[0], uvs[0] ] );
    geom.faceVertexUvs[ 0 ].push( [ uvs[0], uvs[0], uvs[0] ] );
    geom.faceVertexUvs[ 0 ].push( [ uvs[0], uvs[0], uvs[0] ] );
    geom.faceVertexUvs[ 0 ].push( [ uvs[0], uvs[0], uvs[0] ] );
        geom.faceVertexUvs[ 0 ].push( [ uvs[0], uvs[0], uvs[0] ] );//kita puse
        geom.faceVertexUvs[ 0 ].push( [ uvs[0], uvs[1], uvs[2] ] );
        geom.faceVertexUvs[ 0 ].push( [ uvs[1], uvs[2], uvs[0] ] );
        geom.faceVertexUvs[ 0 ].push( [ uvs[0], uvs[1], uvs[2] ] );

    geom.faceVertexUvs[ 0 ].push( [ uvs[1], uvs[0], uvs[3]  ] );
    geom.faceVertexUvs[ 0 ].push( [ uvs[1], uvs[2], uvs[3] ] );

                geom.faceVertexUvs[ 0 ].push( [ uvs[1], uvs[2], uvs[3] ] );//nugara
                geom.faceVertexUvs[ 0 ].push( [ uvs[1], uvs[2], uvs[3] ] );

                geom.faceVertexUvs[ 0 ].push( [ uvs[1], uvs[2], uvs[3] ] );
                geom.faceVertexUvs[ 0 ].push( [ uvs[3], uvs[1], uvs[2] ] );

                geom.faceVertexUvs[ 0 ].push( [ uvs[3], uvs[2], uvs[1] ] );
                geom.faceVertexUvs[ 0 ].push( [ uvs[3], uvs[2], uvs[1] ] );

                geom.faceVertexUvs[ 0 ].push( [ uvs[0], uvs[2], uvs[3] ] );
                geom.faceVertexUvs[ 0 ].push( [ uvs[0], uvs[2], uvs[3] ] );

                geom.faceVertexUvs[ 0 ].push( [ uvs[0], uvs[1], uvs[3] ] );// 1-0
                geom.faceVertexUvs[ 0 ].push( [ uvs[2], uvs[0], uvs[3] ] );

                geom.faceVertexUvs[ 0 ].push( [ uvs[0], uvs[1], uvs[3] ] );
                geom.faceVertexUvs[ 0 ].push( [ uvs[3], uvs[0], uvs[1] ] );

                geom.faceVertexUvs[ 0 ].push( [ uvs[3], uvs[0], uvs[1] ] );
               geom.faceVertexUvs[ 0 ].push( [ uvs[2], uvs[0], uvs[3] ] );
                /*geom.faceVertexUvs[ 0 ].push( [ uvs[2], uvs[0], uvs[3] ] );

                        geom.faceVertexUvs[ 0 ].push( [ uvs[2], uvs[3], uvs[0] ] );
                        geom.faceVertexUvs[ 0 ].push( [ uvs[2], uvs[3], uvs[0] ] );

                       geom.faceVertexUvs[ 0 ].push( [ uvs[0], uvs[0], uvs[0] ] );
                       geom.faceVertexUvs[ 0 ].push( [ uvs[0], uvs[0], uvs[0] ] );

                       geom.faceVertexUvs[ 0 ].push( [ uvs[2], uvs[3], uvs[0] ] );
                       geom.faceVertexUvs[ 0 ].push( [ uvs[2], uvs[3], uvs[0] ] );*/




    geom.computeFaceNormals();
    geom.computeFaceNormals();
    return geom;
}

function getGeometry4() {
    var geom = new THREE.Geometry();
    geom.vertices.push(
        new THREE.Vector3(2,4,2), // 0 punkta
        new THREE.Vector3(2,4,0),
        new THREE.Vector3(2,0,2),
        new THREE.Vector3(2,0,0),
        new THREE.Vector3(0,4,0),
        new THREE.Vector3(0,4,2),
        new THREE.Vector3(0,0,0),
        new THREE.Vector3(0,0,2), //7
        new THREE.Vector3(4,2,0), // 8
        new THREE.Vector3(4,2,2), // 9
        new THREE.Vector3(4,0,0), // 10
        new THREE.Vector3(4,0,2), // 11
        new THREE.Vector3(2,2,0), // 12
        new THREE.Vector3(2,2,2), // 13
        new THREE.Vector3(2,-2,2), //14
        new THREE.Vector3(2,-2,0), //15
        new THREE.Vector3(4,-2,0), // 16
        new THREE.Vector3(4,-2,2) // 17
    );
       
    geom.faces.push(
        new THREE.Face3(7,13,5),
        new THREE.Face3(13,0,5),
        new THREE.Face3(17,9,13),
        new THREE.Face3(2,13,7),
        new THREE.Face3(14,17,13),
        
        new THREE.Face3(4,12,6),
        new THREE.Face3(4,1,12),
        new THREE.Face3(12,8,16),
        new THREE.Face3(12,3,6),
        new THREE.Face3(12,16,15),  
        new THREE.Face3(6,7,5),
        new THREE.Face3(5,4,6),
        new THREE.Face3(1,5,0),
        new THREE.Face3(5,1,4),
        new THREE.Face3(1,13,12),
        new THREE.Face3(13,1,0),
        new THREE.Face3(13,9,8),
        new THREE.Face3(8,12,13),
        new THREE.Face3(6,2,7),
        new THREE.Face3(6,3,2),
        new THREE.Face3(15,17,14),
        new THREE.Face3(15,16,17),
        new THREE.Face3(15,14,2),
        new THREE.Face3(2,3,15),
        new THREE.Face3(9,17,16),
        new THREE.Face3(8,9,16)
    );
    geom.computeFaceNormals();
    return geom;
}

function getGeometry5() {
    var geom = new THREE.Geometry();
    geom.vertices.push(
        new THREE.Vector3(2,4,2), // 0 punkta
        new THREE.Vector3(2,4,0),
        new THREE.Vector3(2,0,2),
        new THREE.Vector3(2,0,0),
        new THREE.Vector3(0,4,0),
        new THREE.Vector3(0,4,2),
        new THREE.Vector3(0,0,0),
        new THREE.Vector3(0,0,2), //7
        new THREE.Vector3(4,2,0), // 8
        new THREE.Vector3(4,2,2), // 9
        new THREE.Vector3(4,0,0), // 10
        new THREE.Vector3(4,0,2), // 11
        new THREE.Vector3(2,2,0), // 12
        new THREE.Vector3(2,2,2), // 13
        
        new THREE.Vector3(4,0,4), // 14
        new THREE.Vector3(4,2,4), // 15
        new THREE.Vector3(2,0,4), // 16
        new THREE.Vector3(2,2,4) // 17
    );
       
    geom.faces.push(
        new THREE.Face3(0,5,7),
        new THREE.Face3(7,2,0),
        new THREE.Face3(16,17,13),
        new THREE.Face3(2,16,13),
        new THREE.Face3(4,10,6),
        new THREE.Face3(1,12,4),
        new THREE.Face3(12,8,10),
        new THREE.Face3(6,7,5),
        new THREE.Face3(5,4,6),
        new THREE.Face3(1,5,0),
        new THREE.Face3(5,1,4),
        new THREE.Face3(1,13,12),
        new THREE.Face3(13,1,0),
        new THREE.Face3(8,17,15),
        new THREE.Face3(8,12,17),
        new THREE.Face3(6,10,14),
        new THREE.Face3(14,16,2),
        new THREE.Face3(7,6,2),
        new THREE.Face3(14,17,16),
        new THREE.Face3(14,15,17),
        new THREE.Face3(14,10,8),
        new THREE.Face3(8,15,14)
    );
    geom.computeFaceNormals();
    return geom;
}

function getGeometry6() {
    var geom = new THREE.Geometry();
    geom.vertices.push(
            new THREE.Vector3(0,0,4),//0
            new THREE.Vector3(0,2,4),//1
            new THREE.Vector3(0,2,2),//2
            new THREE.Vector3(0,0,2),//3
            new THREE.Vector3(0,0,0),//4
            new THREE.Vector3(0,2,0),//5--
            new THREE.Vector3(2,2,4),//6--
            new THREE.Vector3(2,2,2),//7
            new THREE.Vector3(2,0,4),//8
            new THREE.Vector3(2,0,2),//9
            new THREE.Vector3(2,2,0),//10
            new THREE.Vector3(4,0,2),//11
            new THREE.Vector3(4,0,0),//12
            new THREE.Vector3(2,4,2),//13
            new THREE.Vector3(2,4,0),//14
            new THREE.Vector3(4,4,2),//15
            new THREE.Vector3(4,4,0)//16
        );

        geom.faces.push( 
            new THREE.Face3(4,1,5),
            new THREE.Face3(4,0,1),
            new THREE.Face3(0,6,1),
            new THREE.Face3(0,8,6),
            new THREE.Face3(8,7,6),
            new THREE.Face3(8,9,7),
            new THREE.Face3(9,15,13),
            new THREE.Face3(9,11,15),
            new THREE.Face3(11,16,15),
            new THREE.Face3(11,12,16),
            new THREE.Face3(4,16,12),
            new THREE.Face3(14,16,10),
            new THREE.Face3(5,10,4),
            new THREE.Face3(5,6,10),
            new THREE.Face3(5,1,6),
            new THREE.Face3(14,15,16),
            new THREE.Face3(14,13,15),
            new THREE.Face3(10,13,14),
            new THREE.Face3(10,7,13),
            new THREE.Face3(12,3,4),
            new THREE.Face3(12,11,3),
            new THREE.Face3(9,0,3),
            new THREE.Face3(9,8,0)
        );

    geom.computeFaceNormals();
    return geom;
}


function getGeometry7() {
    var geom = new THREE.Geometry();
    geom.vertices.push(
        new THREE.Vector3(2,4,2), // 0 punkta
        new THREE.Vector3(2,4,0),
        new THREE.Vector3(2,0,2),
        new THREE.Vector3(2,0,0),
        new THREE.Vector3(0,4,0),
        new THREE.Vector3(0,4,2),
        new THREE.Vector3(0,0,0),
        new THREE.Vector3(0,0,2), //7
        new THREE.Vector3(4,2,0), // 8
        new THREE.Vector3(4,2,2), // 9
        new THREE.Vector3(4,0,0), // 10
        new THREE.Vector3(4,0,2), // 11
        new THREE.Vector3(2,2,0), // 12
        new THREE.Vector3(2,2,2), // 13
        new THREE.Vector3(0,0,-2), //14
        new THREE.Vector3(2,0,-2), //15
        new THREE.Vector3(2,2,-2), //16
        new THREE.Vector3(0,2,-2), // 17
        new THREE.Vector3(0,2,0)
    );
       
    geom.faces.push(
        new THREE.Face3(7,11,5),
        new THREE.Face3(13,0,5),
        new THREE.Face3(11,9,13),
        new THREE.Face3(4,1,18),
        new THREE.Face3(1,12,18),
        new THREE.Face3(12,8,10),
        new THREE.Face3(10,3,12),
        new THREE.Face3(16,15,14),
        new THREE.Face3(17,16,14),
        new THREE.Face3(18,12,16),
        new THREE.Face3(16,17,18),
        new THREE.Face3(15,16,3),
        new THREE.Face3(3,16,12),
        new THREE.Face3(14,7,5),
        new THREE.Face3(18,5,4),
        new THREE.Face3(14,18,17),
        new THREE.Face3(1,5,0),
        new THREE.Face3(5,1,4),
        new THREE.Face3(1,13,12),
        new THREE.Face3(13,1,0),
        new THREE.Face3(13,9,8),
        new THREE.Face3(8,12,13),
        
        new THREE.Face3(14,11,7),
        new THREE.Face3(3,10,11),
        new THREE.Face3(14,15,3),
        
        new THREE.Face3(9,11,10),
        new THREE.Face3(8,9,10)
    );
    geom.computeFaceNormals();
    
    return geom;
}