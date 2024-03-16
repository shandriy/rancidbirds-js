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
  camera.yaw -= event.movementX / 3;
  camera.yaw %= 360;
  let yawRadians = camera.yaw / 57.2957;
  camera.yawShiftS = Math.sin(yawRadians);
  camera.yawShiftC = Math.cos(yawRadians);
}

function keyDown(key) {
  return keyArray.includes(key);
}

function processInput() {
  if (keyDown("w")) {
    move2d(1, 0);
  }
  if (keyDown("a")) {
    move2d(1, 270);
  }
  if (keyDown("s")) {
    move2d(1, 180);
  }
  if (keyDown("d")) {
    move2d(1, 90);
  }
}

function move2d(amount, angle) {
  let yawRadians = ((angle - camera.yaw) % 360) / 57.2957;
  let multiplier = amount * frame.delta / 14;
  camera.z += Math.cos(yawRadians) * multiplier;
  camera.x += Math.sin(yawRadians) * multiplier;
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