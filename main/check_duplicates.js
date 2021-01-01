const { generate_ambitii } = require('./index')

const ambitii = generate_ambitii();

const seen = {};

let currentAmbitus = 0;
while (currentAmbitus < 12) {
    const ambitus = ambitii[currentAmbitus][currentAmbitus];
    ambitus.forEach(pcset => {
        const id = pcset.chroma.join("");
        if (!(id in seen)) {
            seen[id] = 1;
        } else {
            return console.log("ERROR: Found duplicates in the dataset.");
        }
    })
    currentAmbitus++;
}

console.log("SUCCESS: 0 duplicates were found in the dataset!");
