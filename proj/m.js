"use strict";

/*
==============
Konstantin Edunov, 2024
==============
*/


/// delta = time between frames. multiply (almost) everything by it.
let frame = {
  start: performance.now(),
  delta: 0
};

// camera data. pitch and roll don't do anything as of now
let camera = {
  x: 0, y: 0, z: -20,
  yaw: 0, pitch: 0, roll: 0, yawShiftS: 0, yawShiftC: 1,
  fov: 90, screenDistance: window.innerWidth / 2,
  renderDistance: 300
}

/// an object template basically. find better examples in ../asst/models/
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
// init
window.onload = function () {
  let tempTag = document.createElement("title");
  tempTag.innerHTML = "RANCID BIRDS";
  document.getElementsByTagName("head")[0].appendChild(tempTag);
  lc = 0;
  let dependencies = ["asst/models/cube", "proj/deps/project", "proj/deps/render", "proj/deps/exec", "lang/-locket"];
  let scriptTag;
  // loads scripts and checks until lc is more than a certain amount
  // lc is incremented every time a script is loaded, to make sure everything loads before the game loop starts
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
      // fills HTML
      document.body.innerHTML = `<canvas id="canvas"></canvas><div style="${divStyle}"></div>`;
      tempTag = document.createElement("style");
      tempTag.innerHTML = `html,body,canvas{${normalStyle}}`;
      document.getElementsByTagName("head")[0].appendChild(tempTag);
      let canvas = document.getElementById("canvas");
      canvas.height = window.innerHeight;
      canvas.width = window.innerWidth;
      let context = canvas.getContext("2d", { alpha: false });

      // oh boy the gameloop. find run in deps/exec.js
      run(frameR.bind(null, context));
    }
  }
  checkLoadStatus();
}

/// end