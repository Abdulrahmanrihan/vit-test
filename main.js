import './style.css'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'

// A scence is baically a container of all the objects you're gonna create
const scene = new THREE.Scene();

// There are other types of cameras but this one is most commonly used due to the resemblence in comvement to human eye
// parameters are (Field of view, Aspect ratio, View Frustrum, )
const camera = new THREE.PerspectiveCamera(75, window.innerWidth/ window.innerHeight, 0.1, 1000);

// This is a renderer to actually show the objects we made
const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector('#bg')
});

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);

// camera by default is in the middle of the screen
// This here moves it along the z axis
camera.position.setZ(30);

// First object
// threejs has plenty of other predefined 3d geometries
const geometry = new THREE.TorusGeometry(10, 3, 16, 100);

// a material is like a wrapping paper for an object
// There are plenty built in materials and you can create your own using WebGL.
const material = new THREE.MeshStandardMaterial({color: 0xFF6347});

// A mesh is the container for both the geometry and the material and it's the actual thing that gets shown on screen
const torus = new THREE.Mesh(geometry, material);

// This adds the object we created to the scence
scene.add(torus);

// the easiest light to start with cuz it lights up in every direction
const pointLight = new THREE.PointLight(0xffffff);

// position the light
pointLight.position.set(10, 5, 10);
scene.add(pointLight);

const ambientLight = new THREE.AmbientLight(0xffffff);
scene.add(ambientLight);

const lightHelper = new THREE.PointLightHelper(pointLight);

// This just adds a horizontal grid across the screen
const gridHelper = new THREE.GridHelper(200, 50)
scene.add(lightHelper, gridHelper);

// This allows us to rotate with the mouse around the object to see it from all angles
const controls = new OrbitControls(camera, renderer.domElement);

//This function adds randomly placed stars(sphere objects)
function addstar(){
  //The 0.25 is the sphere's radius
  const geometry = new THREE.SphereGeometry(0.25, 24, 24);
  const material = new THREE.MeshStandardMaterial({color:0xffffff});
  const star = new THREE.Mesh(geometry, material);

  //randomly created x,y,z values
  const [x, y, z] = Array(3).fill().map(()=> THREE.MathUtils.randFloatSpread(100));
  star.position.set(x, y, z);
  scene.add(star);
}

// we use a 200 sized array to create 200 stars in random places
Array(200).fill().forEach(addstar);

// adding a texture (background) to our scene
const spaceTexture = new THREE.TextureLoader().load('space.jpg');
scene.background = spaceTexture;

// moon
const moonTexture = new THREE.TextureLoader().load('moon.jpg');
const normalTexture = new THREE.TextureLoader().load('normal.jpg');


const moon = new THREE.Mesh(
  new THREE.SphereGeometry(3, 32, 32),
  new THREE.MeshStandardMaterial({map: moonTexture, normalMap: normalTexture})
)

scene.add(moon)

function animate(){
  requestAnimationFrame(animate);

  // rotating the object in 3d dimension
  torus.rotation.x += 0.01;
  torus.rotation.y += 0.01;
  torus.rotation.z += 0.01;

  controls.update();

  renderer.render(scene, camera);
}

animate()