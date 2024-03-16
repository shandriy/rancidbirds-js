"use strict";

function run(func) {
  frame.delta = performance.now() - frame.start;
  frame.start += frame.delta;
  func.call();
  window.requestAnimationFrame(run.bind(null, func));
}

function frameR(context) {
  draw(context, scenify(context, camera, [{ model: cube, transform: { x: 0, y: 0, z: 0, yaw: 0, pitch: 0, roll: 0 } }]));
}
lc++;