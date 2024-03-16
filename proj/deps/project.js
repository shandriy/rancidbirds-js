"use strict";

function scenify(context, camera, objectArray) {
  let xd, yd, zd, xt, yt, zt, zb, xc, zc;
  let fetch, counter, object;
  let push, bPush, cPush, tPush, vPush, zPush;
  let tBatch = [];
  const width = context.canvas.width / 2;
  const height = context.canvas.height / 2;
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
        zb = (xd * xd) + (yd * yd) + (zd * zd);
        xc = zd * camera.yawShiftS + xd * camera.yawShiftC;
        zc = zd * camera.yawShiftC - xd * camera.yawShiftS;
        xd = xc;
        zd = zc;
        if (Math.pow(camera.renderDistance, 2) <= zb) bPush--;
        zd = camera.screenDistance / zd;
        xd *= zd;
        yd *= zd;
        if (Math.abs(xd) > width + 2 && Math.abs(yd) > height + 2) cPush--;
        if (zd <= 0) {
          yd *= -1;
          xd *= -1;
        }
        push.push([Math.floor(width + xd), Math.floor(height - yd), zb]);
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
      vPush = 0;
      zPush = 0;
      for (let j = 1; j < push.length; j++) {
        vPush += push[j][2];
        zPush++;
      }
      push[1][2] = vPush / zPush;
      if (bPush > 0 && cPush > 0) tBatch.push(push);
    }
  }
  tBatch = tBatch.sort(function (a, b) {
    return b[1][2] - a[1][2];
  });
  return tBatch;
}

/// end
lc++;