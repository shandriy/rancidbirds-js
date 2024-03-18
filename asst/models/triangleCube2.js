"use strict";

let cube2 = [["#ffff00", { x: -10, y: -10, z: 30 }, { x: 10,  y: -10, z: 30 }, { x: 10,  y: 10,  z: 30 }],
            ["#ffff00", { x: -10, y: -10, z: 30 }, { x: -10, y: 10,  z: 30 }, { x: 10,  y: 10,  z: 30 }],  // end of  back  side
            ["#ff00ff", { x: 10,  y: -10, z: 10 }, { x: 10,  y: 10,  z: 10 }, { x: 10,  y: 10,  z: 30 }],
            ["#ff00ff", { x: 10,  y: -10, z: 10 }, { x: 10,  y: -10, z: 30 }, { x: 10,  y: 10,  z: 30 }],  // end of right  side
            ["#00ffff", { x: -10, y: -10, z: 10 }, { x: -10, y: 10,  z: 10 }, { x: -10, y: 10,  z: 30 }],
            ["#00ffff", { x: -10, y: -10, z: 10 }, { x: -10, y: -10, z: 30 }, { x: -10, y: 10,  z: 30 }],  // end of  left  side
            ["#ff00ff", { x: -10, y: 10,  z: 10 }, { x: 10,  y: 10,  z: 10 }, { x: 10,  y: 10,  z: 30 }],
            ["#ff00ff", { x: -10, y: 10,  z: 10 }, { x: -10, y: 10,  z: 30 }, { x: 10,  y: 10,  z: 30 }],  // end of  top   side
            ["#ff0000", { x: -10, y: -10, z: 10 }, { x: 10,  y: -10, z: 10 }, { x: 10,  y: -10, z: 30 }],
            ["#ff0000", { x: -10, y: -10, z: 10 }, { x: -10, y: -10, z: 30 }, { x: 10,  y: -10, z: 30 }],  // end of bottom side
            ["#ffff00", { x: -10, y: -10, z: 10 }, { x: 10,  y: -10, z: 10 }, { x: 10,  y: 10,  z: 10 }],
            ["#ffff00", { x: -10, y: -10, z: 10 }, { x: -10,  y: 10, z: 10 }, { x: 10,  y: 10,  z: 10 }]]; // end of front  side

/// end of cube

///
/// now it's starting to become clear that I really need to add a Z/depth buffer
///
lc++;