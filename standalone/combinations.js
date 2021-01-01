const {
    Note: { transpose },
} = require("@tonaljs/tonal");

const {
    FUNDAMENTAL,
    CHROMATIC_SCALE,
    ALL_INTERVALS
} = require("./constants");



function getAllSubsets(ambitus) {
    const intervalIdentity = [
        CHROMATIC_SCALE[0],
        CHROMATIC_SCALE[
        CHROMATIC_SCALE.indexOf(transpose(FUNDAMENTAL, ALL_INTERVALS[ambitus]))
        ],
    ];
    const pcset = CHROMATIC_SCALE.slice(0, ambitus + 1).reverse();
    return pcset.reduce(
        (subsets, value) => {
            console.log(value, set)
            return subsets.concat(
                subsets.map(set => [value, ...set])
            )
        }, [[]])
        .filter(s => s[0] === intervalIdentity[0] && s[s.length - 1] === intervalIdentity[1])
        .sort((a, b) => a.length - b.length)
}

function generate_ambitii() {
    const ambitii = {};
    let ambitus = 0;
    let shapes = 0;
    while (ambitus < 12) {
        if (!(ambitus in ambitii)) {
            const _ambitus = getAllSubsets(ambitus);
            const len = _ambitus.length;
            shapes += len;
            ambitii[ambitus] = _ambitus;
            console.log(len, "shapes for ambitus", ambitus)
        }
        ambitus++;
    }
    console.log("Done! Generated", shapes, "shapes.")
    return ambitii;
}

require("fs").writeFileSync("ambitii.json", JSON.stringify(generate_ambitii()));
