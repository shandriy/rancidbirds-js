"use strict";

function run(func) {
  frame.delta = performance.now() - frame.start;
  frame.start += frame.delta;
  func.call();
  window.requestAnimationFrame(run.bind(null, func));
}
function frameR(context) {
  processInput();
  draw(context, scenify(context, camera, [{ model: cube, transform: { x: 0, y: 0, z: 0, yaw: 0, pitch: 0, roll: 0 } }]));
}

document.addEventListener("mousemove", mouseMoved);
document.addEventListener("keydown", keyPressed, false);
document.addEventListener("keyup", keyReleased, false);
let keyArray = [];
let acceptedKeys = ["w", "a", "s", "d", " "]
function keyPressed(event) {
  let key = event.key.toString().toLowerCase();
  if (!keyArray.includes(key) && acceptedKeys.includes(key)) {
    keyArray.push(key);
  }
}

function keyReleased(event) {
  let key = event.key.toString().toLowerCase();
  if (keyArray.includes(key)) {
    keyArray.splice(keyArray.indexOf(key), 1);
  }
}

function mouseMoved(event) {
  camera.yaw += event.movementX;
  camera.yaw %= 360;
}

function keyDown(key) {
  return keyArray.includes(key);
}

function processInput() {
  if (keyDown("w")) {
    camera.z += frame.delta / 30;
  }
  if (keyDown("a")) {
    camera.x -= frame.delta / 30;
  }
  if (keyDown("s")) {
    camera.z -= frame.delta / 30;
  }
  if (keyDown("d")) {
    camera.x += frame.delta / 30;
  }
}

let bodyElement = document.body;
bodyElement.addEventListener("click", async () => {
  bodyElement.requestPointerLock({ unadjustedMovement: true });
});

function refreshFVSD() {
  camera.screenDistance = Math.round(1 / (Math.tan(camera.fov / 114.5915) / (window.innerWidth / 2)));
}

/// end
lc++;