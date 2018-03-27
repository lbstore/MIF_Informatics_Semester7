$(function () {

        var stats = initStats();
        var check = {B : true};
        var check2 = true;
        var anim = false;
        var stage = 0;
        var speed = 4;

        // create a scene, that will hold all our elements such as objects, cameras and lights.
        var scene = new THREE.Scene();

        // create a camera, which defines where we're looking at.
        var camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);

        // create a render and set the size
        var renderer = new THREE.WebGLRenderer();

        renderer.setClearColor( 0xeeeeEE );
        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.shadowMapEnabled = true;

        
    // mesh here 1 - 2 - 3 - 5 - 4 or 7
        var loader = new THREE.TextureLoader();
        var mesh = [7];
        mesh[0] = makeFig1(-10,0,0, 0xff1493);
        scene.add(mesh[0]);
        mesh[1] = makeFig2(-5,0,0, 0x781027);
        scene.add(mesh[1]);
        mesh[2] = makeFig3(0,0,0, 0xfdf464);
        scene.add(mesh[2]);
        
        mesh[3] = makeFig4(5,2,0, 0x4285f4);
        scene.add(mesh[3]);
        
        mesh[4] = makeFig5(10,0,0, 0xa6ff4d);
        scene.add(mesh[4]);
        
        mesh[5] = makeFig6(15,0,0, 0x8894ae);
        scene.add(mesh[5]);
        
        mesh[6] = makeFig7(20,0,0, 0xcfffff);
        scene.add(mesh[6]);
        
        // position and point the camera to the center of the scene
        camera.position.x = 20;
        camera.position.y = 20;
        camera.position.z = 30;
        camera.lookAt(scene.position);
        /*
        // add subtle ambient lighting
        var ambientLight = new THREE.AmbientLight(0x0c0c0c);
        scene.add(ambientLight);
        
        // add spotlight for the shadows
        var spotLight = new THREE.SpotLight( 0xffffff );
        spotLight.position.set( -40, 60, 10 );
        spotLight.castShadow = true;
        scene.add( spotLight );
        */
        // lights

        light = new THREE.DirectionalLight( 0xffffff );
        light.position.set( 1, 1, 1 );
        scene.add( light );

        light = new THREE.DirectionalLight( 0x002288 );
        light.position.set( -1, -1, -1 );
        scene.add( light );

        light = new THREE.AmbientLight( 0x222222 );
        scene.add( light );

		
		
		controls = new THREE.OrbitControls( camera, renderer.domElement );
				//controls.addEventListener( 'change', render ); // add this only if there is no animation loop (requestAnimationFrame)
				controls.enableDamping = true;
				controls.dampingFactor = 0.25;
				controls.enableZoom = true;

        var gui = new dat.GUI();
        var obj = { start:function(){ anim = true }};

        gui.add(obj,'start');
        
        // add the output of the renderer to the html element
        $("#WebGL-output").append(renderer.domElement);

        // call the render function
        var step=0;

        setTimeout(render(), 1000/60);
        
        function animate() {

        requestAnimationFrame( animate );

        controls.update(); // required if controls.enableDamping = true, or if controls.autoRotate = true

        stats.update();

        render();

        }

    
        function render() {
            
            //mesh[0].rotation.x = Math.PI;
            //mesh[0].rotation.y = Math.PI;
            //mesh[1].rotation.z += Math.PI/128;
            //mesh[1].rotation.y += Math.PI/128;
        if (anim) {

            if (stage == 0) {
                check2 = animateFig(check, mesh[1], speed, -2, 0, 8, check2, Math.PI/2, 0, Math.PI/2);
                if (!check.B) {
                    check.B = true;
                    stage++;
                    check2 = true;
                }
            }
            if (stage == 1) {
                check2 = animateFig(check, mesh[0], speed, -8, -2, 10, check2, Math.PI/2, Math.PI, Math.PI/2);
                if (!check.B) {
                    check.B = true;
                    stage++;
                    check2 = true;
                }
            }  
            if (stage == 2) {
                check2 = animateFig(check, mesh[5], speed, -2, 2, 14, check2, 0, Math.PI, Math.PI/-2);
                if (!check.B) {
                    check.B = true;
                    stage++;
                    check2 = true;
                }
            }
            if (stage == 3) {
                check2 = animateFig(check, mesh[4], speed, -6, 0, 12, check2,0, Math.PI/2, 0);
                if (!check.B) {
                    check.B = true;
                    stage++;
                    check2 = true;
                }
            }
            if (stage == 4) {
                check2 = animateFig(check, mesh[6], speed, -8, 0, 12, check2,0, 0, 0);
                if (!check.B) {
                    check.B = true;
                    stage++;
                    check2 = true;
                }
            }
			if (stage == 5) {
                check2 = animateFig(check, mesh[3], speed, -8, 2, 12, check2, 0, Math.PI/2, 0);
                if (!check.B) {
                    check.B = true;
                    stage++;
                    check2 = true;
                }
            }
			if (stage == 6) {
                check2 = animateFig(check, mesh[2], speed, -6, 6, 14, check2, Math.PI/-2, Math.PI/-2,0);
                if (!check.B) {
                    check.B = true;
                    stage++;
                    check2 = true;
                }
            }
        }
            
            
            stats.update();
             setTimeout( requestAnimationFrame(render), 1000 / 60 );
            //requestAnimationFrame(render);
            renderer.render(scene, camera);
        }
        
        function onWindowResize() {

            camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();

            renderer.setSize( window.innerWidth, window.innerHeight );

        }

        function initStats() {

            var stats = new Stats();

            stats.setMode(0); // 0: fps, 1: ms

            // Align top-left
            stats.domElement.style.position = 'absolute';
            stats.domElement.style.left = '0px';
            stats.domElement.style.top = '0px';

            $("#Stats-output").append( stats.domElement );

            return stats;
        }
    });
