// Created by Bjorn Sandvik - thematicmapping.org
(function () {
  
	var webglEl = document.getElementById('webgl');

	if (!Detector.webgl) {
		Detector.addGetWebGLMessage(webglEl);
		return;
	}

	var width = window.innerWidth,
	    height = window.innerHeight;

	// Earth params
	var radius = 0.5,
	    segments = 32,
	    rotation = 6;

	var scene = new THREE.Scene();

  // 60 --> change to modify earth size
	var camera = new THREE.PerspectiveCamera(70, width / height, 0.01, 1000);
	camera.position.z = 1.5;

	var renderer = new THREE.WebGLRenderer();
	renderer.setSize(width, height);

	scene.add(new THREE.AmbientLight(0x333333));

	var light = new THREE.DirectionalLight(0xffffff, 1);
	light.position.set(5, 3, 5);
	scene.add(light);

  //  Create earth sphere
	var sphere = createSphere(radius, segments);
	sphere.rotation.y = rotation;
	scene.add(sphere);
  
  //  Create earth sphere
  var sphere = createSphere(radius, segments);
	sphere.rotation.y = rotation;
	scene.add(sphere);
  
  //  Create continents onto earth
  var continents = createContinents(radius, segments);
	continents.rotation.y = rotation;
	scene.add(continents);

  //  Create clouds
	var clouds = createClouds(radius, segments);
	clouds.rotation.y = rotation;
//	scene.add(clouds);
  
  //  Create space centers markers
  var esa = createMarkers(0x192d67);
  var esa_coords = latLongToVector3(50.84424, 7.170725, radius);
//  esa.rotation.y = -2;
//  esa.rotation.x = -1.4;
//  esa.position.x = 0.47;
//  esa.position.y = 0.19;
//  esa.position.z = 0.01;
//  esa.rotation.y = -2;
//  esa.rotation.x = -1.4;
  esa.position.x = esa_coords[0];
  esa.position.y = esa_coords[1];
  esa.position.z = esa_coords[2];
  sphere.add(esa);
  
  var nasa = createMarkers(0xee293d);
  var nasa_coords = latLongToVector3(29.552793, -95.093072, radius);
//  nasa.rotation.y = 0;
//  nasa.rotation.x = 0;
//  nasa.position.x = 0;
//  nasa.position.y = 0;
//  nasa.position.z = 0;
  nasa.position.x = nasa_coords[0];
  nasa.position.y = nasa_coords[1];
  nasa.position.z = nasa_coords[2];
  sphere.add(nasa);
  
  var rsa = createMarkers(0xd8e3ef);
  var rsa_coords = latLongToVector3(55.87985, 38.105581, radius);
//  rsa.rotation.y = 0;
//  rsa.rotation.x = 0;
//  rsa.position.x = 0;
//  rsa.position.y = 0;
//  rsa.position.z = 0.2;
  rsa.position.x = rsa_coords[0];
  rsa.position.y = rsa_coords[1];
  rsa.position.z = rsa_coords[2];
  sphere.add(rsa);

  //  Add background to the canvas
	var stars = createStars(90, 64);
	scene.add(stars);
  
	var controls = new THREE.TrackballControls(camera);

	webglEl.appendChild(renderer.domElement);

	render();

	function render() {
		controls.update();
//		sphere.rotation.y += 0.0005;
//		clouds.rotation.y += 0.0005;
		requestAnimationFrame(render);
		renderer.render(scene, camera);
	}

	function createSphere(radius, segments) {
		return new THREE.Mesh(new THREE.SphereGeometry(radius, segments, segments), new THREE.MeshPhongMaterial({
//			map: 
//      THREE.ImageUtils.loadTexture('assets/img/test.jpg'),
      wireframe:true,
      color:(0x222222)
//			bumpMap: THREE.ImageUtils.loadTexture('assets/img/elev_bump_4k.jpg'),
//			bumpScale: 0.005,
//			specularMap: THREE.ImageUtils.loadTexture('assets/img/water_4k.png'),
//			specular: new THREE.Color('grey')
		}));
	}

	function createClouds(radius, segments) {
		return new THREE.Mesh(new THREE.SphereGeometry(radius + 0.003, segments, segments), new THREE.MeshPhongMaterial({
			map: THREE.ImageUtils.loadTexture('assets/img/fair_clouds_4k.png'),
			transparent: true
		}));
	}
  
  function createContinents(radius, segments) {
		return new THREE.Mesh(new THREE.SphereGeometry(radius + 0.003, segments, segments), new THREE.MeshPhongMaterial({
			map: THREE.ImageUtils.loadTexture('assets/img/continents.png'),
			transparent: true,
      opacity:0.9
		}));
	}
  
  function createMarkers(marker_color) {
		return new THREE.Mesh(new THREE.CircleGeometry(0.02, 6), new THREE.MeshPhongMaterial({
			color: (marker_color),
      side: THREE.DoubleSide
		}));
	}

	function createStars(radius, segments) {
		return new THREE.Mesh(new THREE.SphereGeometry(radius, segments, segments), new THREE.MeshBasicMaterial({
			map: THREE.ImageUtils.loadTexture('assets/img/galaxy_starfield.png'),
			side: THREE.BackSide
		}));
	}
  
  // convert the positions from a lat, lon to a position on a sphere.
  function latLongToVector3(lat, lon, radius) {
    var phi   = (90-lat)*(Math.PI/180)
    var theta = (lon+180)*(Math.PI/180)

    var x = -((radius) * Math.sin(phi)*Math.cos(theta))
    var z = ((radius) * Math.sin(phi)*Math.sin(theta))
    var y = ((radius) * Math.cos(phi))
 
    return [x,y,z];
  }
  var winResize	= new THREEx.WindowResize(renderer, camera);
})();