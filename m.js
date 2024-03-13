"use strict";

let frame = {
  start: performance.now(),
  delta: 0
};
let camera = {
  x: 0, y: 0, z: -20,
  yaw: 0, pitch: 0, roll: 0,
  fov: 90, screenDistance: window.innerWidth / 2,
  renderDistance: 1000
}
let object = [["#ffaa00", { x: -10, y: -10, z: 10 }, { x: 10, y: -10, z: 10 }, { x: 10, y: 10, z: 10 }, { x: -10, y: 10, z: 10 }]];
let cube = []

window.onload = function () {
  document.body.innerHTML = "<canvas id='canvas'></canvas>";
  document.getElementById("s").innerHTML = "html,body,canvas{overflow:hidden;margin:0;padding:0;}";
  let canvas = document.getElementById("canvas");
  canvas.height = window.innerHeight;
  canvas.width = window.innerWidth;
  let context = canvas.getContext("2d", { alpha: false });

  run(frameR.bind(null, context));
}

function run(func) {
  frame.delta = performance.now() - frame.start;
  frame.start += frame.delta;
  func.call();
  window.requestAnimationFrame(run.bind(null, func));
}

function frameR(context) {
  draw(context, scenify(context, camera, [{ model: object, transform: { x: 0, y: 0, z: 0, yaw: 0, pitch: 0, roll: 0 } }]));
}

function draw(context, tBatch) {
  context.clearRect(0, 0, context.canvas.width, context.canvas.height);
  //polyBatch(context, [["#ffaa00", [75, 50], [100, 75], [100, 25], [200, 0]], ["#ffaadd", [100, 25], [100, 75], [150, 25]]]);
  polyBatch(context, tBatch);
  //camera.z += frame.delta / 30;
  camera.x += frame.delta / 120;
  object[0][3].z -= frame.delta / 90;
}