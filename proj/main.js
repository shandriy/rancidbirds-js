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
  yaw: 0, pitch: 0, roll: 0, yawShiftS: 0, yawShiftC: 0,
  fov: 90, screenDistance: window.innerWidth / 2,
  renderDistance: 300
}
let object = [["#ffaa00", { x: -10, y: -10, z: 10 }, { x: 10, y: -10, z: 10 }, { x: 10, y: 10, z: 10 }, { x: -10, y: 10, z: 10 }]];

window.addEventListener("resize", function () {
  let canvas = document.getElementById("canvas");
  canvas.height = window.innerHeight;
  canvas.width = window.innerWidth;
  refreshFVSD();
})

let lc;
let divStyle = "background-color:black;color:white;position:fixed;top:70vh;right:10vw;width:80vw;"
let normalStyle = "overflow:hidden;margin:0;padding:0;image-rendering:pixelated;image-rendering:crisp-edges;";
window.onload = function () {
  lc = 0;
  let dependencies = ["asst/models/cube", "proj/deps/project", "proj/deps/render", "proj/deps/exec", "lang/-locket"];
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
      setLangPrefs();
      document.body.innerHTML = `<canvas id="canvas"></canvas><div style="${divStyle}"></div>`;
      document.getElementsByTagName("style")[0].innerHTML = `html,body,canvas{${normalStyle}}`;
      let canvas = document.getElementById("canvas");
      canvas.height = window.innerHeight;
      canvas.width = window.innerWidth;
      let context = canvas.getContext("2d", { alpha: false });

      run(frameR.bind(null, context));
    }
  }
  checkLoadStatus();
}