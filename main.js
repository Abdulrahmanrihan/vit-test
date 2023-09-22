import './style.css'
import * as THREE from 'three'

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

// the render method is the same as asking the rendered to draw what we built
renderer.render(scene, camera);

// First object
// threejs has plenty of other predefined 3d geometries
const geometry = new THREE.TorusGeometry(10, 3, 16, 100);

// a material is like a wrapping paper for an object
// There are plenty built in materials and you can create your own using WebGL.
const material = new THREE.MeshBasicMaterial({color: 0xFF6347, wireframe: true});

// A mesh is the container for both the geometry and the material and it's the actual thing that gets shown on screen
const torus = new THREE.Mesh(geometry, material);

