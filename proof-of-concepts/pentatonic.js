const { rotations } = require("../helpers");
const { Scale } = require("@tonaljs/tonal");

console.log(rotations(Scale.get("C minor pentatonic"), "parallel"));

console.log(rotations(Scale.get("C minor pentatonic"), "derivative"));
