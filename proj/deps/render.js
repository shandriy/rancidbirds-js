"use strict";

let talking = 0;
function draw(context, tBatch) {
  context.clearRect(0, 0, context.canvas.width, context.canvas.height);
  context.beginPath();
  context.fillStyle = "#ffffff";
  context.rect(0, 0, context.canvas.width, context.canvas.height);
  context.fill();
  //polyBatch(context, [["#ffaa00", [75, 50], [100, 75], [100, 25], [200, 0]], ["#ffaadd", [100, 25], [100, 75], [150, 25]]]);
  polyBatch(context, tBatch);
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
/// end
lc++;