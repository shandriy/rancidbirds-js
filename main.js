"use strict";

window.addEventListener("resize", function () {
  let canvas = document.getElementById("canvas");
  canvas.height = window.innerHeight;
  canvas.width = window.innerWidth;
  refreshFVSD();
})

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
let object = [["#ffaa00", { x: -10, y: 0, z: 10 }, { x: 10, y: 0, z: 10 }, { x: 0, y: 10, z: 10 }], ["#ffaabb", { x: -10, y: 0, z: 10 }, { x: 10, y: 0, z: 10 }, { x: 0, y: 10, z: 10 }]];
window.onload = function () {
  let canvas = document.getElementById("canvas");
  canvas.height = window.innerHeight;
  canvas.width = window.innerWidth;
  let context = canvas.getContext("2d", { alpha: false });

  run(test.bind(null, context));
}

function run(func) {
  frame.delta = performance.now() - frame.start;
  frame.start += frame.delta;
  func.call();

  window.requestAnimationFrame(run.bind(null, func));
}

function test(context) {
  draw(context, model(context, camera, object));
}
function draw(context, tBatch) {
  context.clearRect(0, 0, context.canvas.width, context.canvas.height);
  //triangleBatch(context, [["#ffaa00", [75, 50], [100, 75], [100, 25]], ["#ffaadd", [100, 25], [100, 75], [150, 25]]]);
  triangleBatch(context, tBatch);
  //camera.z += frame.delta / 30;
  //camera.x -= frame.delta / 30;
  object[0][3].z -= frame.delta / 90;
}
function model(context, camera, object) {
  let xd, yd, zd, fetch, push, bPush, cPush, tPush;
  let tBatch = [];
  let width = context.canvas.width / 2;
  let height = context.canvas.height / 2;
  for (let i = 0; i < object.length; i++) {
    push = [object[i][0]];
    bPush = 3;
    cPush = 3;
    tPush = [];
    for (let j = 1; j < 4; j++) {
      fetch = object[i][j];
      xd = fetch.x - camera.x;
      yd = fetch.y - camera.y;
      zd = fetch.z - camera.z;
      if (Math.pow(camera.renderDistance, 2) <= (xd * xd) + (yd * yd) + (zd * zd)) bPush--;
      zd = camera.screenDistance / zd;
      xd *= zd;
      yd *= zd;
      if (Math.abs(xd) > width + 2 || Math.abs(yd) > height + 2) cPush--;
      if (zd <= 0) yd *= -1;
      push.push([Math.floor(width + xd), Math.floor(height - yd)]);
    }
    if (bPush > 0 && cPush > 0) tBatch.push(push);
  }
  return tBatch;
}

function triangleBatch(context, triangleArray) {
  for (let i = 0; i < triangleArray.length; i++) {
    context.beginPath();
    context.moveTo(triangleArray[i][1][0], triangleArray[i][1][1]);
    context.lineTo(triangleArray[i][2][0], triangleArray[i][2][1]);
    context.lineTo(triangleArray[i][3][0], triangleArray[i][3][1]);
    context.fillStyle = triangleArray[i][0];
    context.fill();
  }
}

function refreshFVSD() {
  camera.screenDistance = Math.round(1 / (Math.tan(camera.fov / 114.5915) / (window.innerWidth / 2)));
}