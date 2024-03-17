"use strict";

let talking = 0;
function draw(context, tBatch) {
  context.clearRect(0, 0, context.canvas.width, context.canvas.height);
  context.beginPath();
  context.fillStyle = "#ffffff";
  context.rect(0, 0, context.canvas.width, context.canvas.height);
  context.fill();
  //polyBatch(context, [["#ffaa00", [75, 50], [100, 75], [100, 25], [200, 0]], ["#ffaadd", [100, 25], [100, 75], [150, 25]]]);
  triangleBatchPixel(context, tBatch, camera);
  //camera.z += frame.delta / 30;
  //camera.y += frame.delta / 120;
  //object[0][3].z -= frame.delta / 90;
  if (keyDown(" ")) {
    talking += frame.delta / 8;
  }
  else {
    talking -= frame.delta / 8;
  }
  if (talking > 20) {
    talking = 20;
  }
  if (talking < 0) {
    talking = 0;
  }
  if (talking == 0) {
    document.getElementsByTagName("div")[0].style = `${divStyle}display:none;`;
  }
  else {
    document.getElementsByTagName("div")[0].style = `${divStyle}height:${talking}vh;`;
  }
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

function triangleBatchPixel(context, triangleArray, camera) {
  let width = context.canvas.width;
  let height = context.canvas.height;
  let imgData = new Uint8ClampedArray(height * width * 4);
  let zBuffer = new Array(height * width);
  let rgb, yIndexer, avg;
  for (let i = 0; i < triangleArray.length; i++) {
    rgb = [];
    rgb.length = 0;
    rgb = triangleArray[i][0].substring(1).split(/(..)/g).filter(s => s);
    for (let j = 0; j < 3; j++) {
      rgb[j] = parseInt(rgb[j], 16);
    }
    rgb.length = 3;
    rgb.push(255);
    yIndexer = [];
    //sortedByX = [];
    for (let j = 1; j < 4; j++) {
      yIndexer.push(triangleArray[i][j]);
    }
    /*for (let j = 1; j < 4; j++) {
      sortedByX.push(triangleArray[i][j]);
    }*/
    yIndexer = yIndexer.sort(function (a, b) {
      return a[1] - b[1];
    });
    /*sortedByX = sortedByX.sort(function (a, b) {
      return b[0] - a[0];
    });*/
    let tri, slope1, slope2, is1, currentX1, currentX2, inCycle;
    /*function inForLoop(y, x, sortedByX) {
      let subX;
      x - sortedByX[1][0] < 0 ? subX = 0 : subX = 1;
      xAvg = (x - sortedByX[subX][0]) / (sortedByX[subX + 1][0] - sortedByX[subX][0]);
      xAvg = xAvg * tri[subX + 1][2] + (1 - xAvg) * tri[subX][2];
      yAvg = Math.abs(xAvg) + Math.abs(yAvg);

      //yAvg = yAvg * tri[0][2] + (1 - yAvg) * tri[1][2];
      inCycle = ((width * y) + x) * 4;
      if (inCycle >= 0 && inCycle < imgData.length) {
        if (x % width == x && x >= 0 && (zBuffer[inCycle / 4] > 0 - yAvg || zBuffer[inCycle / 4] == undefined)) {
          zBuffer[inCycle / 4] = 0 - yAvg;
          for (let j = 0; j < 3; j++) {
            imgData[inCycle + j] = rgb[j];
          }
          imgData[inCycle + 3] = 255;
        }
      }
    }*/
    function inForLoop(y, x, p) {
      let pre = (((p[1][1] - p[2][1]) * (p[0][0] - p[2][0])) + ((p[2][0] - p[1][0]) * (p[0][1] - p[2][1])));
      avg = (((p[1][1] - p[2][1]) * (x - p[2][0])) + ((p[2][0] - p[1][0]) * (y - p[2][1])));
      avg /= pre;
      let w0 = avg;
      let tempAvg = avg * p[0][2];
      avg = (((p[1][1] - p[2][1]) * (x - p[2][0])) + ((p[2][0] - p[1][0]) * (y - p[2][1])));
      avg /= pre;
      tempAvg += avg * p[1][2];
      tempAvg += (1 - w0 - avg) * p[2][2];
      tempAvg /= 3;
      inCycle = ((width * y) + x) * 4;
      if (inCycle >= 0 && inCycle < imgData.length) {
        if (x % width == x && x >= 0 && (zBuffer[inCycle / 4] > avg || zBuffer[inCycle / 4] == undefined)) {
          zBuffer[inCycle / 4] = avg;
          for (let j = 0; j < 3; j++) {
            imgData[inCycle + j] = rgb[j];
          }
          imgData[inCycle + 3] = 255;
        }
      }
    }
    if (!(yIndexer[2][1] == yIndexer[1][1])) {
      tri = yIndexer;
      slope1 = (tri[2][0] - tri[0][0]) / (tri[2][1] - tri[0][1]);
      slope2 = (tri[2][0] - tri[1][0]) / (tri[2][1] - tri[1][1]);
      is1 = false;
      slope1 < slope2 ? is1 = false : is1 = true;
      currentX1 = tri[2][0];
      currentX2 = currentX1;
      for (let y = tri[2][1]; y > tri[1][1]; y--) {
        /*yAvg = (y - tri[1][1]) / (tri[2][1] - tri[1][1]);
        if (tri[2][1] - tri[1][1] == 0) {
          yAvg = 1;
        }
        yAvg = yAvg * tri[2][2] + (1 - yAvg) * tri[1][2];*/
        if (is1) {
          for (let x = Math.floor(currentX1); x <= Math.ceil(currentX2); x++) {
            inForLoop(y, x, yIndexer)
          }
        }
        else {
          for (let x = Math.floor(currentX2); x <= Math.ceil(currentX1); x++) {
            inForLoop(y, x, yIndexer)
          }
        }
        if (y > height) {
          currentX1 -= (y - height - 1) * slope1;
          currentX2 -= (y - height - 1) * slope2;
          y = height + 1;
        }
        currentX1 -= slope1;
        currentX2 -= slope2;
      }
    }
    if (!(yIndexer[0][1] == yIndexer[1][1])) {
      tri = yIndexer;
      slope1 = (tri[1][0] - tri[0][0]) / (tri[1][1] - tri[0][1]);
      slope2 = (tri[2][0] - tri[0][0]) / (tri[2][1] - tri[0][1]);
      is1 = false;
      slope1 < slope2 ? is1 = true : is1 = false;
      currentX1 = tri[0][0];
      currentX2 = currentX1;
      for (let y = tri[0][1]; y <= tri[1][1]; y++) {
        /*yAvg = (tri[1][1] - y) / (tri[1][1] - tri[0][1]);
        if (tri[1][1] - tri[1][1] == 0) {
          yAvg = 1;
        }
        yAvg = yAvg * tri[0][2] + (1 - yAvg) * tri[1][2];*/
        if (is1) {
          for (let x = Math.floor(currentX1); x <= Math.ceil(currentX2); x++) {
            inForLoop(y, x, yIndexer)
          }
        }
        else {
          for (let x = Math.floor(currentX2); x <= Math.ceil(currentX1); x++) {
            inForLoop(y, x, yIndexer)
          }
        }
        if (y < 0) {
          currentX1 += (0 - y - 1) * slope1;
          currentX2 += (0 - y - 1) * slope2;
          y = -1;
        }
        currentX1 += slope1;
        currentX2 += slope2;
      }
    }
    /*if (polyArray[i].length >= 4) {
      context.beginPath();
      context.moveTo(polyArray[i][1][0], polyArray[i][1][1]);
      for (let j = 2; j < polyArray[i].length; j++) {
        context.lineTo(polyArray[i][j][0], polyArray[i][j][1]);
      }
      context.fillStyle = polyArray[i][0];
      context.fill();
    }*/
  }
  context.putImageData(new ImageData(imgData, width), 0, 0);
}

/// end
lc++;