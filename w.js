"use strict";

function _import(jsDirectory) {
  let scriptTag = document.createElement("script");
  scriptTag.type = "text/javascript";
  scriptTag.src = jsDirectory;
  document.head.appendChild(scriptTag);
}

function scenify(context, camera, objectArray) {
  let xd, yd, zd, xt, yt, zt;
  let fetch, counter, object;
  let push, bPush, cPush, tPush;
  let tBatch = [];
  let width = context.canvas.width / 2;
  let height = context.canvas.height / 2;
  for (let c = 0; c < objectArray.length; c++) {
    object = objectArray[c].transform;
    xt = object.x;
    yt = object.y;
    zt = object.z;
    object = objectArray[c].model;
    for (let i = 0; i < object.length; i++) {
      push = [object[i][0]];
      bPush = object[i].length - 1;
      cPush = bPush;
      for (let j = 1; j < object[i].length; j++) {
        fetch = object[i][j];
        xd = fetch.x + xt - camera.x;
        yd = fetch.y + yt - camera.y;
        zd = fetch.z + zt - camera.z;
        if (Math.pow(camera.renderDistance, 2) <= (xd * xd) + (yd * yd) + (zd * zd)) bPush--;
        zd = camera.screenDistance / zd;
        xd *= zd;
        yd *= zd;
        if (Math.abs(xd) > width + 2 || Math.abs(yd) > height + 2) cPush--;
        if (zd <= 0) {
          yd *= -1;
          xd *= -1;
        }
        push.push([Math.floor(width + xd), Math.floor(height - yd)]);
      }
      for (let j = 1; j < object[i].length; j++) {
        tPush = push[j];
        counter = 0;
        for (let k = 1; k < object[i].length; k++) {
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
  }
  return tBatch;
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
    for (let j = 1; j < object[i].length; j++) {
      fetch = object[i][j];
      xd = fetch.x - camera.x;
      yd = fetch.y - camera.y;
      zd = fetch.z - camera.z;
      if (Math.pow(camera.renderDistance, 2) <= (xd * xd) + (yd * yd) + (zd * zd)) bPush--;
      zd = camera.screenDistance / zd;
      xd *= zd;
      yd *= zd;
      if (Math.abs(xd) > width + 2 || Math.abs(yd) > height + 2) cPush--;
      if (zd <= 0) {
        yd *= -1;
        xd *= -1;
      }
      push.push([Math.floor(width + xd), Math.floor(height - yd)]);
    }
    for (let j = 1; j < object[i].length; j++) {
      tPush = push[j];
      counter = 0;
      for (let k = 1; k < object[i].length; k++) {
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

window.addEventListener("resize", function () {
  let canvas = document.getElementById("canvas");
  canvas.height = window.innerHeight;
  canvas.width = window.innerWidth;
  refreshFVSD();
})
