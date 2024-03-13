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
  document.body.innerHTML = "<canvas id='canvas'></canvas>";
  document.getElementById("style").innerHTML = "html,body,canvas{overflow:hidden;margin:0;padding:0;}";
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
  draw(context, model(context, camera, object));
}
function draw(context, tBatch) {
  context.clearRect(0, 0, context.canvas.width, context.canvas.height);
  //polyBatch(context, [["#ffaa00", [75, 50], [100, 75], [100, 25], [200, 0]], ["#ffaadd", [100, 25], [100, 75], [150, 25]]]);
  polyBatch(context, tBatch);
  //camera.z += frame.delta / 30;
  //camera.x -= frame.delta / 30;
  object[0][3].z -= frame.delta / 90;
}
function model(context, camera, object) {
  let xd, yd, zd, fetch, push, bPush, cPush, tPush, counter;
  let tBatch = [];
  let width = context.canvas.width / 2;
  let height = context.canvas.height / 2;
  for (let i = 0; i < object.length; i++) {
    push = [object[i][0]];
    bPush = 3;
    cPush = 3;
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
    for (let j = 1; j < 4; j++) {
      tPush = push[j];
      counter = 0;
      for (let k = 1; k < 4; k++) {
        if (push[k][0] == tPush[0] && push[k][1] == tPush[1]) counter++;
      }
      if (counter != 1) {
        bPush = -1;
        cPush = -1;
        break;
      }
    }
    if (bPush > 0 && cPush > 0) tBatch.push(push);
  }
  return tBatch;
}

function polyBatch(context, polyArray) {
  for (let i = 0; i < polyArray.length; i++) {
    if (polyArray[i].length >= 4) {
      context.beginPath();
      context.moveTo(polyArray[i][1][0], polyArray[i][1][1]);
      for (let j = 2; j < polyArray[i].length; j++) {
        context.lineTo(polyArray[i][j][0], polyArray[i][j][1]);
      }
      context.fillStyle = polyArray[i][0];
      context.fill();
    }
  }
}

function refreshFVSD() {
  camera.screenDistance = Math.round(1 / (Math.tan(camera.fov / 114.5915) / (window.innerWidth / 2)));
}