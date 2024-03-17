"use strict";

let talking = 0;
function draw(context, tBatch) {
  context.clearRect(0, 0, context.canvas.width, context.canvas.height);
  context.beginPath();
  context.fillStyle = "#ffffff";
  context.rect(0, 0, context.canvas.width, context.canvas.height);
  context.fill();
  //polyBatch(context, [["#ffaa00", [75, 50], [100, 75], [100, 25], [200, 0]], ["#ffaadd", [100, 25], [100, 75], [150, 25]]]);
  triangleBatchPixel(context, tBatch);
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

function triangleBatchPixel(context, triangleArray) {
  //let width = context.canvas.width;
  //let height = context.canvas.height;
  let width = 480;
  let height = 270;
  let imgData = new Uint8ClampedArray(height * width * 4);
  let rgb, yIndexer;
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
    for (let j = 1; j < 4; j++) {
      yIndexer.push(triangleArray[i][j]);
    }
    yIndexer = yIndexer.sort(function (a, b) {
      return a[1] - b[1];
    });
    if (!(yIndexer[2][1] == yIndexer[1][1])) {
      let tri = yIndexer;
      let slope1 = (tri[2][0] - tri[0][0]) / (tri[2][1] - tri[0][1]);
      let slope2 = (tri[2][0] - tri[1][0]) / (tri[2][1] - tri[1][1]);
      let is1 = false;
      slope1 < slope2 ? is1 = false : is1 = true;
      let currentX1 = tri[2][0];
      let currentX2 = currentX1;
      let inCycle;
      for (let y = tri[2][1]; y > tri[1][1]; y--) {
        if (is1) {
          for (let x = Math.floor(currentX1); x <= Math.ceil(currentX2); x++) {
            inCycle = ((width * y) + x) * 4;
            if (inCycle >= 0 && inCycle < imgData.length) {
              if (x % width == x && x >= 0) {
                for (let j = 0; j < 3; j++) {
                  imgData[inCycle + j] = rgb[j];
                }
                imgData[inCycle + 3] = 255;
              }
            }
          }
        }
        else {
          for (let x = Math.floor(currentX2); x <= Math.ceil(currentX1); x++) {
            inCycle = ((width * y) + x) * 4;
            if (inCycle >= 0 && inCycle < imgData.length) {
              if (x % width == x && x >= 0) {
                for (let j = 0; j < 3; j++) {
                  imgData[inCycle + j] = rgb[j];
                }
                imgData[inCycle + 3] = 255;
              }
            }
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
      let tri = yIndexer;
      let slope1 = (tri[1][0] - tri[0][0]) / (tri[1][1] - tri[0][1]);
      let slope2 = (tri[2][0] - tri[0][0]) / (tri[2][1] - tri[0][1]);
      let is1 = false;
      slope1 < slope2 ? is1 = true : is1 = false;
      let currentX1 = tri[0][0];
      let currentX2 = currentX1;
      let inCycle;
      for (let y = tri[0][1]; y <= tri[1][1]; y++) {
        if (is1) {
          for (let x = Math.floor(currentX1); x <= Math.ceil(currentX2); x++) {
            inCycle = ((width * y) + x) * 4;
            if (inCycle >= 0 && inCycle < imgData.length) {
              if (x % width == x && x >= 0) {
                for (let j = 0; j < 3; j++) {
                  imgData[inCycle + j] = rgb[j];
                }
                imgData[inCycle + 3] = 255;
              }
            }
          }
        }
        else {
          for (let x = Math.floor(currentX2); x <= Math.ceil(currentX1); x++) {
            inCycle = ((width * y) + x) * 4;
            if (inCycle >= 0 && inCycle < imgData.length) {
              if (x % width == x && x >= 0) {
                for (let j = 0; j < 3; j++) {
                  imgData[inCycle + j] = rgb[j];
                }
                imgData[inCycle + 3] = 255;
              }
            }
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