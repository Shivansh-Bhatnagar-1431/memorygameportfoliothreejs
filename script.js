//import * as THREE from 'https://cdn.skypack.dev/three';
//import * as THREE from 'https://cdn.skypack.dev/three';
showAlert();
function showAlert() {
  alert("Hello, Welcome to my gamified portfolio website. This is a memory based card game in which you have to flip two similar kind of cards to get to that section shown by the card. Press Enter to reach back to the card pallet for further flipping. Happy Gaming!!!");
}

const scene = new THREE.Scene();


const camera = new THREE.PerspectiveCamera( 60, window.innerWidth / window.innerHeight, 0.1, 1000 );

const renderer = new THREE.WebGL1Renderer({
  canvas: document.querySelector("#bg"),
  antialias: true,
  // alpha: true,
});

document.addEventListener('keydown', (event) => {
  const gameSection = document.querySelector('.memory-game');
  if (gameSection && event.key === 'Enter') { // Replace 'Enter' with your preferred key
    gameSection.scrollIntoView({ behavior: 'smooth' });
  }
});

const cards = document.querySelectorAll('.memory-card');

let hasFlippedCard = false;
let lockBoard = false;
let firstCard, secondCard;

function flipCard() {
  if (lockBoard) return;
  if (this === firstCard) return;

  this.classList.add('flip');

  if (!hasFlippedCard) {
    // first click
    hasFlippedCard = true;
    firstCard = this;
    return;
  }

  // second click
  secondCard = this;
  checkForMatch();
}

// function checkForMatch() {
//   let isMatch = firstCard.dataset.framework === secondCard.dataset.framework;
//   isMatch ? disableCards() : unflipCards();
  
// }
function checkForMatch() {

  let isMatch = firstCard.dataset.framework === secondCard.dataset.framework;
  if (isMatch) {
    console.log(firstCard.dataset.framework);
    scrollToSection(firstCard.dataset.framework); // Scroll to the target section when cards match
    disableCards();
   
  } else {
    unflipCards();
  }
}

function scrollToSection(sectionId) {
  const section = document.getElementById(sectionId);
  enableScroll(); // Enable scrolling when matching cards are found
  section.scrollIntoView({ behavior: "smooth" });
}
// Disable scrolling function
function disableScroll() {
  document.body.style.overflow = 'hidden'; // Prevent scrolling
}

// Enable scrolling function
function enableScroll() {
  document.body.style.overflow = 'auto'; // Allow scrolling
}
function disableCards() {
  firstCard.removeEventListener('click', flipCard);
  secondCard.removeEventListener('click', flipCard);
  resetBoard();
}

function unflipCards() {
  lockBoard = true;

  setTimeout(() => {
    firstCard.classList.remove('flip');
    secondCard.classList.remove('flip');
    resetBoard();
  }, 1500);
}

function resetBoard() {
  [hasFlippedCard, lockBoard] = [false, false];
  [firstCard, secondCard] = [null, null];
}

(function shuffle() {
  cards.forEach(card => {
    let randomPos = Math.floor(Math.random() * 12);
    card.style.order = randomPos;
  });
})();

cards.forEach(card => card.addEventListener('click', flipCard));

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
camera.position.setZ(30);
camera.position.setX(-3);

renderer.render(scene, camera);

const loader = new THREE.TextureLoader();

const spaceTexture = loader.load('space.png');
spaceTexture.minFilter = THREE.LinearFilter;
scene.background = spaceTexture;

const geometry = new THREE.TorusKnotGeometry(20, 1, 100, 100);
// const geometry = new THREE.TorusGeometry(20, 1, 100, 100);
// const material = new THREE.MeshStandardMaterial({
//   color: 0xbbbbbb,
//   wireframe: true,
// });
const torusTexture= loader.load('space.jpg');
const material = new THREE.MeshStandardMaterial({map :torusTexture });

const torus = new THREE.Mesh(geometry, material);
torus.position.z = -20;
torus.position.x = 1;
torus.position.y = -2;

scene.add( torus);


// const loader = new THREE.TextureLoader();
// const tex1 = loader.load('crate.gif');
// let boxBuf = new THREE.BoxBufferGeometry(1, 1,1);
// let boxMat = new THREE.MeshBasicMaterial({ map: tex1 });
// const mesh = new THREE.Mesh(boxBuf, boxMat);
 
// mesh.position.z = -4;
// mesh.position.x = 0;
// mesh.position.y = 0;
// scene.add(mesh);


const moonTexture = loader.load("norm.jpg");
const moon = new THREE.Mesh(
  new THREE.IcosahedronBufferGeometry(1, 1),
  new THREE.MeshBasicMaterial({map:moonTexture})
);
moon.position.setX(2);
moon.position.setY(2.5);
moon.position.setZ(10);

scene.add(moon);


const pointLight = new THREE.PointLight(0xaaaaaa);
pointLight.position.set(30, 5, -10);
const ambientLight = new THREE.AmbientLight(0x555555);
scene.add(pointLight, ambientLight);


function addStar() {
  const starTexture = loader.load('white.png');
  const geometry = new THREE.SphereGeometry(0.25, 24, 24);
  const material = new THREE.MeshStandardMaterial({map: starTexture})
  const star = new THREE.Mesh(geometry, material);

  const [x, y, z] = Array(3)
    .fill()
    .map(() => THREE.MathUtils.randFloatSpread(100));

  star.position.set(x, y, z);
  scene.add(star);
}

Array(200).fill().forEach(addStar);

const boxTexture = loader.load("crate.gif");

const box = new THREE.Mesh(
  new THREE.BoxGeometry(2, 2, 2),
  // new THREE.MeshStandardMaterial({
  // color: 0xbbbbbb,
  // wireframe: true,
  // })
  new THREE.MeshBasicMaterial({map:boxTexture})
);
scene.add(box);
box.position.z = 20;
box.position.x = 1;
box.position.y = -2;

// const roopTexture = loader.load('roop.jpg');
// const roop = new THREE.Mesh(
//   new THREE.BoxGeometry(3, 3, 3),
//   new THREE.MeshBasicMaterial({map:roopTexture})
// );
// roop.position.set(2, -1, -5); // Set fixed position

// scene.add(roop);


const earthTexture= loader.load('cloud.jpg');
const earth = new THREE.Mesh(
  new THREE.SphereGeometry(4, 32, 32),
  // new THREE.MeshStandardMaterial({
  // color: 0xbbbbbb,
  // wireframe: true,
  // })
  new THREE.MeshBasicMaterial({map:earthTexture})
);
scene.add(earth);

earth.position.z = 15;
earth.position.setX(-10);

// roop.position.z = -5;
// roop.position.x = 2;
// const raycaster = new THREE.Raycaster();
// const mouse = new THREE.Vector2();

// let lastScrollY = window.scrollY; // Track the last scroll position
// const roopVisibleDistance = 25; // Distance before roop disappears



function moveCamera() {
  const t = document.body.getBoundingClientRect().top;
  earth.rotation.x += 0.0;
  earth.rotation.y += 0.0;
  earth.rotation.z -= 0.1;

  //  //roop.position.z = t * -.0009;
  //  roop.rotation.y += 0.01;
  //  roop.rotation.z += 0.01;

  box.rotation.x -= 0.01;
  box.rotation.z += 0.01;

  camera.position.z = t * -0.005;
  camera.position.x = t * 0.0003;
  //  // Check scroll direction
  //  if (window.scrollY > lastScrollY) {
  //   // Scrolling down
  //   roop.position.z = -50; // Move roop far away
  // } else {
  //   // Scrolling up
  //   roop.position.z = -5; // Bring roop back
  // }

  lastScrollY = window.scrollY; // Update the last scroll position
}

document.body.onscroll = moveCamera;
moveCamera();

function animate() {
  requestAnimationFrame(animate);

  // torus.rotation.x += 0.01;
  // torus.rotation.y += 0.005;
  // torus.rotation.z += 0.01;
  torus.rotation.x += 0.0001;
  torus.rotation.y += 0.01;
  torus.rotation.z += 0;

  moon.rotation.x += 0.005;
  moon.rotation.y += 0.005;
  moon.rotation.z += 0.01;


  earth.rotation.z -= 0.01;
  earth.rotation.x += 0.0;
  earth.rotation.y += 0.0;

  //controls.update();

  renderer.render(scene, camera);
}

animate();


