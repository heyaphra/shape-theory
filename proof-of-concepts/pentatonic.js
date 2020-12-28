const { rotations } = require("../helpers");
const { Scale } = require("@tonaljs/tonal");

console.log(rotations(Scale.get("C minor pentatonic").notes));
