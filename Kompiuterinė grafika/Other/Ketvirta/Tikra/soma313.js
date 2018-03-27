window.addEventListener("load", function(){
    var canvas = document.querySelector("#output-canvas");
    var scene = new THREE.Scene();
    var camera = new THREE.PerspectiveCamera(45, 1, 0.1, 1000);
    var renderer = new THREE.WebGLRenderer({canvas: canvas});
    var trackball_ctl = new THREE.TrackballControls(camera);
    var loopPlease = false;
    var render = function(t) {
        trackball_ctl.update();
        uniforms.lightPosition.value = spotLight2.position;
        renderer.render(scene, camera);
        if(loopPlease) requestAnimationFrame(render);
    };
    var fidelity = 8;

    renderer.setClearColor(0x999999);
    renderer.shadowMap.enabled = true;
    trackball_ctl.rotateSpeed = 3.6;
    trackball_ctl.zoomSpeed = 2.2;
    trackball_ctl.panSpeed = 0.8;
    trackball_ctl.noZoom = false;
    trackball_ctl.noPan = false;
    trackball_ctl.staticMoving = true;
    trackball_ctl.dynamicDampingFactor = 0.3;
    trackball_ctl.addEventListener('change', function(){
        spotLight2.position.set(camera.position.x, camera.position.y, camera.position.z);
        requestAnimationFrame(render);
    });
    trackball_ctl.addEventListener('start', function() {
        loopPlease = true;
        requestAnimationFrame(render);
    });
    trackball_ctl.addEventListener('end', function() {
        loopPlease = false;
    });

    camera.position.z = 30;
    camera.position.y = 0;
    camera.position.x = 0;
    camera.needsUpdate = true;

    var spotLight2 = new THREE.SpotLight(0xffffff, 0.3);
    spotLight2.position.set( 30, 0, 0 );
    scene.add(spotLight2);

    var uniforms = {
        colour: { type: 'v4', value: new THREE.Vector4(0.0, 1.0, 0.0, 1) },
        ambientColour: { type: 'v3', value: new THREE.Vector3(0.3, 0.3, 0.3) },
        diffuseColour: { type: 'v3', value: new THREE.Vector3(0.4, 0.4, 0.4) },
        specularColour: { type: 'v3', value: new THREE.Vector3(0.5, 0.5, 0.5) },
        lightPosition: { type: 'v3', value: spotLight2.position },
        shininess: { type: 'f', value: 32.0 },
    };
    var fragShader = document.getElementById('phongFragShader').textContent;
    // phong material which doesnâ€™t change shape
    idPhongMaterial = new THREE.ShaderMaterial({
        uniforms: uniforms,
        vertexShader: document.getElementById('idVertexShader').textContent,
        fragmentShader: fragShader
    });
    cylinderPhongMaterial = new THREE.ShaderMaterial({
        uniforms: uniforms,
        vertexShader: document.getElementById('cylinderInsideVertexShader').textContent,
        fragmentShader: fragShader
    });

    centerPhongMaterial = new THREE.ShaderMaterial({
        uniforms: uniforms,
        vertexShader: document.getElementById('middleShitVertexShader').textContent,
        fragmentShader: fragShader
    });

    smallFillerPhongMaterial = new THREE.ShaderMaterial({
        uniforms: uniforms,
        vertexShader: document.getElementById('smallFillerVertexShader').textContent,
        fragmentShader: fragShader
    });



    // Static parts, that have nothing to do with the task at hand ATM
//      Desine puse


    part = new THREE.Mesh(
        new THREE.PlaneGeometry(1, 0.5), idPhongMaterial
    );
    part.rotation.x = -Math.PI/2;
    part.position.z = 0.75;
    scene.add(part);

    part = new THREE.Mesh(
        new THREE.PlaneGeometry(1, 1), idPhongMaterial
    );
    part.rotation.x = Math.PI/2;
    part.position.z = 0.5;
    part.position.y =-1.0;
    scene.add(part);


    part = new THREE.Mesh(
        new THREE.PlaneGeometry(1, 1), idPhongMaterial
    );
    part.position.z = 1.0;
    part.position.y = -0.5;
    scene.add(part);

    part = new THREE.Mesh(
        new THREE.PlaneGeometry(1, 1), idPhongMaterial
    );
    part.rotation.y = -Math.PI/2;
    part.position.y = -0.5;
    part.position.x = -0.5;
    part.position.z = 0.5;
    scene.add(part);

    part = new THREE.Mesh(
        new THREE.PlaneGeometry(1, 1), idPhongMaterial
    );
    part.rotation.y = Math.PI/2;
    part.position.y = -0.5;
    part.position.x = 0.5;
    part.position.z = 0.5;
    scene.add(part);
// 

    var part = new THREE.Mesh(
        new THREE.PlaneGeometry(0.5, 2), idPhongMaterial
    );
    part.position.x = 0.25;
    scene.add(part);
    
    part = new THREE.Mesh(
        new THREE.PlaneGeometry(1, 2), idPhongMaterial
    );
    part.rotation.y = Math.PI / 2;
    part.position.x = 0.5;
    part.position.z = -0.5;
    scene.add(part);

    part = new THREE.Mesh(
        new THREE.PlaneGeometry(1, 1), idPhongMaterial
    );
    part.rotation.x = Math.PI / 2;
    part.position.z = -0.5
    part.position.y = -1;
    scene.add(part);
    
    part = new THREE.Mesh(
        new THREE.PlaneGeometry(1, 1), idPhongMaterial
    );
    part.rotation.x = -Math.PI / 2;
    part.position.z = -0.5
    part.position.y = 1;
    scene.add(part);

    part = new THREE.Mesh(
        new THREE.PlaneGeometry(1, 2), idPhongMaterial
    );
    part.rotation.y = Math.PI;
    part.position.z = -1;
    scene.add(part);

    part = new THREE.Mesh(
        new THREE.PlaneGeometry(1, 1), idPhongMaterial
    );
    part.position.z = 0;
    part.position.x = -1;
    part.position.y = -0.5;
    scene.add(part);

    var part = new THREE.Mesh(
        new THREE.PlaneGeometry(1, 1, fidelity, fidelity), centerPhongMaterial
    );
    // part.position.y = 2;
    //scene.add(part);

    /*var part = new THREE.Mesh(
        new THREE.PlaneGeometry(1, 1, fidelity, fidelity), centerPhongMaterial
    );
    part.rotation.x = Math.PI/2;
    part.rotation.y = Math.PI/-2;
    part.position.x = -0.5;
    // part.position.z = -0.05;
    part.position.y = -0.5;
    scene.add(part);*/

    //sutrumpinti
    part = new THREE.Mesh(
        new THREE.PlaneGeometry(1,1), idPhongMaterial 
    );
    part.rotation.y = -Math.PI / 2
    part.position.x = -1.5;
    part.position.y = -0.5;
    part.position.z = -0.5;
    scene.add(part);
    

    part = new THREE.Mesh(
        new THREE.PlaneGeometry(1, 1), idPhongMaterial
    );
    part.rotation.z = Math.PI / 2
    part.rotation.x = Math.PI / 2
    part.position.x = -1;
    part.position.y = -1;
    part.position.z = -0.5;
    scene.add(part);
    
    part = new THREE.Mesh(
        new THREE.PlaneGeometry(1, 1), idPhongMaterial
    );
    part.rotation.y = Math.PI;
    part.position.x = -1;
    part.position.y = -0.5;
    part.position.z = -1;
    scene.add(part);

    part = new THREE.Mesh(
        new THREE.PlaneGeometry(0.5, 1), idPhongMaterial
    );
    part.rotation.x = -Math.PI/2;
    part.position.x = -1.25;
    part.position.z = -0.5;
    scene.add(part);

    part = new THREE.Mesh(
        new THREE.PlaneGeometry(0.5, 1), idPhongMaterial
    );
    part.rotation.y = -Math.PI/2;
    part.rotation.z = -Math.PI/2;
    part.position.y = 0.75;
    part.position.x = -0.5;
    part.position.z = -0.5;
    scene.add(part);

    var part = new THREE.Mesh(
        new THREE.PlaneGeometry(1, 1, fidelity, fidelity), cylinderPhongMaterial
    );
    // part.rotation.x = -Math.PI;
    part.rotation.z = -Math.PI/2*3;
    // part.rotation.y = Math.PI;
    // part.position.z = 0.5;
    part.position.x = -0.5;
    part.position.y = 0.5;
    scene.add(part);

    var part = new THREE.Mesh(
        new THREE.PlaneGeometry(1, 1, fidelity, fidelity), cylinderPhongMaterial
    );
    part.rotation.x = Math.PI/2;
    part.rotation.y = Math.PI;
    part.position.x = -1;
    scene.add(part);

    var part = new THREE.Mesh(
        new THREE.PlaneGeometry(1, 1, fidelity, fidelity), smallFillerPhongMaterial
    );
    part.position.z = 0.5;
    part.position.x = -0.5;
    part.rotation.x = Math.PI /2;
    part.rotation.z = Math.PI/2;
    scene.add(part);
    //desines puses kairysis kampas


    var part = new THREE.Mesh(
        new THREE.PlaneGeometry(1, 1, fidelity, fidelity), smallFillerPhongMaterial
    );
    // part.position.z = 0.5;
    part.position.x = 0.5;
    part.position.y = 0.5;
    part.rotation.x = Math.PI;
    part.rotation.z = Math.PI/-2;
    scene.add(part);

    var part = new THREE.Mesh(
        new THREE.PlaneGeometry(1, 1, fidelity, fidelity), smallFillerPhongMaterial
    );
    part.position.z = -1;
    part.position.x = -1;
    part.rotation.x = Math.PI / 2;
    part.rotation.z = Math.PI;
    scene.add(part);


    var part = new THREE.Mesh(
        new THREE.PlaneGeometry(1, 1, fidelity, fidelity), smallFillerPhongMaterial
    );
    
    part.position.x = -0.5;
    part.position.y = 0.5;
    part.rotation.y = Math.PI / 2;
    part.rotation.x = -Math.PI*3/2;
     scene.add(part);
    //kaires figuros pries mus esantis




     part = new THREE.Mesh(
        new THREE.PlaneGeometry(0.5, 0.5), idPhongMaterial
    );
    // part.rotation.y = Math.PI;
    part.rotation.z = Math.PI/2;
    part.position.y = 0.75;
    part.position.x = -0.25;
    // part.position.z = -0.5;
    scene.add(part);

    var shape = new THREE.Shape();
    shape.moveTo(0, 0);
    shape.lineTo(0, 1);
    shape.lineTo(-0.5, 1);
    shape.lineTo(0.25, 0.25);
    shape.lineTo(0.25,-1.0)
    shape.lineTo(0, 0);
    var shapeGeom = new THREE.ShapeGeometry(shape);
    var part = new THREE.Mesh(
        shapeGeom, idPhongMaterial
    );
    //scene.add(part);

    (function(){ // Resizing
        var onResize = function() {
            size = document.body.getClientRects()[0];
            canvas.width = size.width;
            canvas.height = size.height;
            renderer.setSize(size.width, size.height);
            camera.aspect = size.width / size.height;
            camera.updateProjectionMatrix();
            requestAnimationFrame(render);
        };
        onResize();
        trackball_ctl.handleResize();
        window.addEventListener("resize", onResize);
    })();

    requestAnimationFrame(render);
});