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

  // 70 --> change to modify earth size
	var camera = new THREE.PerspectiveCamera(70, width / height, 0.01, 2000);
	camera.position.z = 1.5;

	var renderer = new THREE.WebGLRenderer();
	renderer.setSize(width, height);

	scene.add(new THREE.AmbientLight(0x333333));

	var light = new THREE.DirectionalLight(0xffffff, 1);
	light.position.set(5, 3, 5);
	scene.add(light);

  //  Create earth sphere
	var sphere = createSphere(radius, segments, 0.9, 0x222222);
	sphere.rotation.y = rotation;
	scene.add(sphere);
  sphere.frustumCulled = false;
  
  //  Create on top of earth sphere
	var sphere_bot = createSphere(radius - 0.01, segments, 0.15, 0x989898);
	sphere_bot.rotation.y = rotation;
  sphere_bot.opacity = 0.1;
  sphere_bot.color = (0xffffff);
	scene.add(sphere_bot);
  
  //  Create continents onto earth
  var continents = createContinents(radius, segments);
	continents.rotation.y = rotation;
	scene.add(continents);
  continents.frustumCulled = false;

  //  Create clouds
	var clouds = createClouds(radius, segments);
	clouds.rotation.y = rotation;
//	scene.add(clouds);
  
  //  Create space centers markers
  var esa = createMarkers(0x192d67);
  var esa_coords = latLongToVector3(50.84424, 7.170725, radius);
  esa.position.x = esa_coords[0] + 0.158;
  esa.position.y = esa_coords[1] - 0.2;
  esa.position.z = esa_coords[2] + 0.05;
  esa.rotation.y += 1.5;
  esa.rotation.x = 10;
  sphere.add(esa);
  
  var nasa = createMarkers(0xee293d);
  var nasa_coords = latLongToVector3(29.552793, -95.093072, radius);
//  nasa.rotation.y = 0;
//  nasa.rotation.x = 0;
  nasa.position.x = nasa_coords[0] + 0.12;
  nasa.position.y = nasa_coords[1] - 0.22;
  nasa.position.z = nasa_coords[2] + 0.065;
  sphere.add(nasa);
  
  var rsa = createMarkers(0xd8e3ef);
  var rsa_coords = latLongToVector3(55.87985, 38.105581, radius);
  rsa.rotation.y =2000;
  rsa.rotation.x =950;
  rsa.position.x = rsa_coords[0] + 0.195;
  rsa.position.y = rsa_coords[1] - 0.17;
  rsa.position.z = rsa_coords[2] + 0.011;
  sphere.add(rsa);

  //  Add background to the canvas
	var stars = createStars(90, 64);
	scene.add(stars);
  
	var controls = new THREE.TrackballControls(camera);

	webglEl.appendChild(renderer.domElement);

	render();

	function render() {
		controls.update();
		sphere.rotation.y += 0.0005;
    continents.rotation.y += 0.0005;
    
    sphere_bot.rotation.y += 0.0007;
    sphere_bot.rotation.x += 0.0009;
    
		requestAnimationFrame(render);
		renderer.render(scene, camera);
	}

	function createSphere(radius, segments, opacity, color) {
		return new THREE.Mesh(new THREE.SphereGeometry(radius, segments, segments), new THREE.MeshPhongMaterial({
//			map: 
//      THREE.ImageUtils.loadTexture('assets/img/test.jpg'),
      transparent: true,
      opacity:opacity,
      wireframe:true,
      color:(color),
      side: THREE.DoubleSide
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
      opacity:0.9,
      side: THREE.DoubleSide
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