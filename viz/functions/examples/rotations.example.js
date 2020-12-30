const { rotations } = require("..");
const { Scale } = require("@tonaljs/tonal");

console.log("\n");
console.log("Parallel ---------------------------------------------");
console.log(rotations(Scale.get("C minor pentatonic"), "parallel"));

console.log("\n");
console.log("Derivative ---------------------------------------------");
console.log(rotations(Scale.get("C minor pentatonic"), "derivative"));
