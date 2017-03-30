(function () {
  // Adapt earth rotation to display at the center the space center selected
  var space_centers = document.querySelectorAll('.space-centers a');
  // 0 - nasa ; 1 - esa ; 2 - rsa
  var markers_coords = [[0.03, 6.11], [0.35, 4.73], [0.47, 4.33]];
  
  for(var i = 0; i < space_centers.length; i++)
  {
    space_centers[i].addEventListener('click', function(event)
    {
      event.preventDefault();
      
      if (this.innerHTML == 'Nasa')
      {
        sphere.rotation.x = 0.03;
        sphere.rotation.y = 6.11;
      }
      else if (this.innerHTML == 'Esa')
      {
        sphere.rotation.x = 0.35;
        sphere.rotation.y = 4.73;
      }
      else if (this.innerHTML == 'Rsa')
      {
        sphere.rotation.x = 0.47;
        sphere.rotation.y = 4.33;
      }
    });
  }
  
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

	scene.add(new THREE.AmbientLight(0xffffff));

	var light = new THREE.DirectionalLight(0xffffff, 1); 
	light.position.set(5, 3, 5);
	scene.add(light);

  //  Create earth sphere
	var sphere = createSphere(radius, segments, 'assets/img/earth.jpg');
	sphere.rotation.y = rotation;
	scene.add(sphere);
  
  //  Create on wireframe onto sphere
	var sphere_bot = createWireframe(radius + 0.01, segments, 0.05);
	sphere_bot.rotation.y = rotation;
  // scene.add(sphere_bot);
  
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
  nasa.position.x = nasa_coords[0] + 0.12;
  nasa.position.y = nasa_coords[1] - 0.22;
  nasa.position.z = nasa_coords[2] + 0.065;
  sphere.add(nasa);
  
  var rsa = createMarkers(0xd8e3ef);
  var rsa_coords = latLongToVector3(55.87985, 38.105581, radius);
  rsa.rotation.y = 2000;
  rsa.rotation.x = 950;
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
  
  // set starting earth rotation point
  sphere.rotation.y = 0;

  function createSphere(radius, segments, img) {
		return new THREE.Mesh(new THREE.SphereGeometry(radius, segments, segments), new THREE.MeshPhongMaterial({
      map: THREE.ImageUtils.loadTexture(img),
      // wireframe:true,
		}));
	}
  
  // Create a wireframe sphere
  function createWireframe(radius, segments, opacity) {
		return new THREE.Mesh(new THREE.SphereGeometry(radius, segments, segments), new THREE.MeshPhongMaterial({
			transparent: true,
      opacity:opacity,
      wireframe:true,
      color:(0xffffff)
		}));
	}
  
  // Create marker
  function createMarkers(marker_color) {
		return new THREE.Mesh(new THREE.CircleGeometry(0.02, 16), new THREE.MeshPhongMaterial({
			color: (marker_color),
      side: THREE.DoubleSide
		}));
	}

  // Create background
	function createStars(radius, segments) {
		return new THREE.Mesh(new THREE.SphereGeometry(radius, segments, segments), new THREE.MeshBasicMaterial({
    // map: THREE.ImageUtils.loadTexture('assets/img/background.jpg'), 
      color:(0x000000),
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
  
  // Rezising canvas
  var winResize	= new THREEx.WindowResize(renderer, camera);
  
  // Update canvas
	function render() {
		controls.update();
    
    if (sphere.rotation.y > 6.28)
      sphere.rotation.y = 0;
    
		sphere.rotation.y += 0.0005;
    
		requestAnimationFrame(render);
		renderer.render(scene, camera);
	}
})();