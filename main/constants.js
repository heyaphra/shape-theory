const { Scale, Note: { enharmonic } } = require("@tonaljs/tonal");

const FUNDAMENTAL = "C";
const CHROMATIC_METADATA = Scale.get(`${FUNDAMENTAL} chromatic`);
const CHROMATIC_SCALE = CHROMATIC_METADATA["notes"].map(n => enharmonic(n))
const ALL_INTERVALS = CHROMATIC_METADATA["intervals"];

module.exports = {
    FUNDAMENTAL,
    CHROMATIC_METADATA,
    CHROMATIC_SCALE,
    ALL_INTERVALS
}