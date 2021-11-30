import './style.css';
import * as THREE from 'three';
import {
  OrbitControls
} from 'three/examples/jsm/controls/OrbitControls';

// Setup

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector('#bg'),
});

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
camera.position.setZ(30);
camera.position.setX(-3);

renderer.render(scene, camera);



const geometry = new THREE.TorusGeometry(10, 3, 16, 100);
const material = new THREE.MeshStandardMaterial({
  color: 0xffffff
});
const torus = new THREE.Mesh(geometry, material);

scene.add(torus);



const pointLight = new THREE.PointLight(0xffffff);
pointLight.position.set(5, 5, 5);

const ambientLight = new THREE.AmbientLight(0xffffff);
scene.add(pointLight, ambientLight);



const spaceTexture = new THREE.TextureLoader().load('bg2.jpg');
scene.background = spaceTexture;



const tonyTexture = new THREE.TextureLoader().load('tony2.jpg');

const tony = new THREE.Mesh(new THREE.BoxGeometry(3, 3, 3), new THREE.MeshBasicMaterial({
  map: tonyTexture
}));

scene.add(tony);



const ballTexture = new THREE.TextureLoader().load('balltexture.jpg');

const ball = new THREE.Mesh(
  new THREE.SphereGeometry(3, 32, 32),
  new THREE.MeshStandardMaterial({
    map: ballTexture,
  })
);

scene.add(ball);

ball.position.z = 30;
ball.position.setX(-10);

tony.position.z = -5;
tony.position.x = 2;

// Scroll Animation

function moveCamera() {
  const t = document.body.getBoundingClientRect().top;
  ball.rotation.x += 0.05;
  ball.rotation.y += 0.075;
  ball.rotation.z += 0.05;

  tony.rotation.y += 0.01;
  tony.rotation.z += 0.01;

  camera.position.z = t * -0.01;
  camera.position.x = t * -0.0002;
  camera.rotation.y = t * -0.0002;
}

document.body.onscroll = moveCamera;
moveCamera();

// Animation Loop

function animate() {
  requestAnimationFrame(animate);

  torus.rotation.x += 0.01;
  torus.rotation.y += 0.005;
  torus.rotation.z += 0.01;

  ball.rotation.x += 0.005;

//  controls.update();

  renderer.render(scene, camera);
}

animate();
