"use strict";

/*
Konstantin Edunov
2024
CSE MMA ORG
*/

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

function refreshFVSD() {
  camera.screenDistance = Math.round(1 / (Math.tan(camera.fov / 114.5915) / (window.innerWidth / 2)));
}

window.addEventListener("resize", function () {
  let canvas = document.getElementById("canvas");
  canvas.height = window.innerHeight;
  canvas.width = window.innerWidth;
  refreshFVSD();
})

let lc;
window.onload = function () {
  setLangPrefs();
  lc = 0;
  let dependencies = ["asst/models/cube", "proj/deps/project", "proj/deps/render", "proj/deps/exec"];
  let scriptTag;
  for (let i = 0; i < dependencies.length; i++) {
    scriptTag = document.createElement("script");
    scriptTag.setAttribute("src", `../${dependencies[i]}.js`);
    document.getElementsByTagName("head")[0].appendChild(scriptTag);
  }
  function checkLoadStatus() {
    if (lc < dependencies.length) {
      window.setTimeout(checkLoadStatus, 100);
    } else {
      document.body.innerHTML = "<canvas id='canvas'></canvas>";
      document.getElementById("s").innerHTML = "html,body,canvas{overflow:hidden;margin:0;padding:0;image-rendering:pixelated;image-rendering:crisp-edges}";
      let canvas = document.getElementById("canvas");
      canvas.height = window.innerHeight;
      canvas.width = window.innerWidth;
      let context = canvas.getContext("2d", { alpha: false });

      run(frameR.bind(null, context));
    }
  }
  checkLoadStatus();
}