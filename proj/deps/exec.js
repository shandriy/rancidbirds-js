"use strict";

function run(func) {
  // func calls frameR()
  frame.delta = performance.now() - frame.start;
  frame.start += frame.delta;
  func.call();

  // frame loop (~60 fps)
  window.requestAnimationFrame(run.bind(null, func));
}
function frameR(context) {
  // find process input lower in this file
  processInput();

  // find draw in render.js, and scenify in project.js (project as in projection)
  draw(context, scenifyTriangle(context, camera, [{ model: cube, transform: { x: 0, y: 0, z: 0, yaw: 0, pitch: 0, roll: 0 } },
                                                  { model: cube, transform: { x: 10, y: 10, z: 10, yaw: 0, pitch: 0, roll: 0 } }]));
}


/// input handling below
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
  /// FVSD: FoV Screen Distance
  /// changes projection distance based on FOV
  camera.screenDistance = Math.round(1 / (Math.tan(camera.fov / 114.5915) / (480 / 2)));
}

/// end

/// this is for detecting when a script loads
lc++;