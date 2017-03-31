'use strict';

(function () {

  //  function iss_get_coords() { 
  //    var iss_coords_lat = document.querySelectorAll('.space-centers span.iss_lat').innerHTML;
  //    var iss_coords_long = document.querySelectorAll('.space-centers span.iss_long').innerHTML;
  //    return [iss_coords_lat, iss_coords_long];
  //  }
  //console.log(iss_get_coords());
  //
  //var test_iss = iss_get_coords();

  // Adapt earth rotation to display at the center the space center selected
  var space_centers = document.querySelectorAll('.space-centers a');
  // 0 - nasa ; 1 - esa ; 2 - rsa
  var markers_coords = [[0.03, 6.23], [0.35, 4.73], [0.47, 4.33]];

  for (var i = 0; i < space_centers.length; i++) {
    space_centers[i].addEventListener('click', function (event) {
      event.preventDefault();

      if (this.innerHTML == 'Nasa') {
        sphere.rotation.x = markers_coords[0][0];
        sphere.rotation.y = markers_coords[0][1];
      } else if (this.innerHTML == 'Esa') {
        sphere.rotation.x = markers_coords[1][0];
        sphere.rotation.y = markers_coords[1][1];
      } else if (this.innerHTML == 'Rsa') {
        sphere.rotation.x = markers_coords[2][0];
        sphere.rotation.y = markers_coords[2][1];
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

  scene.add(new THREE.AmbientLight(0xd3b676));

  var light = new THREE.DirectionalLight(0xffffff, 0.8);
  light.position.set(3, 5, 4);
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
  nasa.position.x = nasa_coords[0] + 0.03;
  nasa.position.y = nasa_coords[1] - 0.22;
  nasa.position.z = nasa_coords[2] + 0.067;
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

  //  Add Iss to the scene
  var iss = createIss();
  //  iss.position.x = 2;
  iss.scale.set(0.008, 0.008, 1);
  iss.position.x = 0.75;
  scene.add(iss);

  //  sphere = new THREE.Object3D();
  //	scene.add( parent );

  var pivot1 = new THREE.Object3D();
  pivot1.rotation.z = 0;
  sphere.add(pivot1);
  pivot1.add(iss);

  //  
  //  var lon = 0, lat = 0;
  //  var phi = 0, theta = 0;

  var controls = new THREE.TrackballControls(camera);
  webglEl.appendChild(renderer.domElement);
  render();

  // set starting earth rotation point
  sphere.rotation.y = 0;

  function createSphere(radius, segments, img) {
    return new THREE.Mesh(new THREE.SphereGeometry(radius, segments, segments), new THREE.MeshPhongMaterial({
      map: THREE.ImageUtils.loadTexture(img),
      shininess: 35
      // wireframe:true,
    }));
  }

  // Create a wireframe sphere
  function createWireframe(radius, segments, opacity) {
    return new THREE.Mesh(new THREE.SphereGeometry(radius, segments, segments), new THREE.MeshPhongMaterial({
      transparent: true,
      opacity: opacity,
      wireframe: true,
      color: 0xffffff
    }));
  }

  // Create marker
  function createMarkers(marker_color) {
    return new THREE.Mesh(new THREE.CircleGeometry(0.01, 16), new THREE.MeshBasicMaterial({
      color: 0xceb789,
      side: THREE.DoubleSide
    }));
  }

  // Create background
  function createStars(radius, segments) {
    return new THREE.Mesh(new THREE.SphereGeometry(radius, segments, segments), new THREE.MeshBasicMaterial({
      map: THREE.ImageUtils.loadTexture('assets/img/stars.png'),
      //      color:(0x050505),
      side: THREE.BackSide
    }));
  }

  // Create Iss
  function createIss() {
    return new THREE.Mesh(new THREE.RingGeometry(2, 4, 8), new THREE.MeshBasicMaterial({
      color: 0xd3b676,
      side: THREE.DoubleSide
    }));
  }

  // convert the positions from a lat, lon to a position on a sphere.
  function latLongToVector3(lat, lon, radius) {
    var phi = (90 - lat) * (Math.PI / 180);
    var theta = (lon + 180) * (Math.PI / 180);

    var x = -(radius * Math.sin(phi) * Math.cos(theta));
    var z = radius * Math.sin(phi) * Math.sin(theta);
    var y = radius * Math.cos(phi);

    return [x, y, z];
  }

  // Rezising canvas
  var winResize = new THREEx.WindowResize(renderer, camera);

  // Update canvas
  function render() {
    controls.update();

    if (sphere.rotation.y > 6.28) sphere.rotation.y = 0;

    // Auto rotation - slow
    sphere.rotation.y += 0.0005;
    //      parent.rotation.y += 0.0005;

    // 
    iss.rotation.x += 0.01;
    iss.rotation.y += 0.01;

    requestAnimationFrame(render);
    renderer.render(scene, camera);
  }
})();