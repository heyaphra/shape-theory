const { Note } = require("@tonaljs/tonal");

const {
  FUNDAMENTAL,
  CHROMATIC_SCALE,
  ALL_INTERVALS
} = require("./constants");

/** getAllSubsets =================================================================================
 * ================================================================================================
 * @param {number} ambitus - The ambitus. 
 * @returns {object} - All non-redundant subsets in a given ambitus.
 * ================================================================================================
 * ================================================================================================*/
function getAllSubsets(ambitus) {
  // The interval the ambitus represents. 
  // Ex: Ambitus = 3 -> ["C", "D"]
  const interval = [
    CHROMATIC_SCALE[0],
    CHROMATIC_SCALE[
    CHROMATIC_SCALE.indexOf(Note.enharmonic(Note.transpose(FUNDAMENTAL, ALL_INTERVALS[ambitus])))
    ],
  ];

  // All notes in range { interval[0]...interval[1] }. 
  // Ex: Ambitus = 3 -> ["C", "Db", "D"]
  const pcset = CHROMATIC_SCALE.slice(0, ambitus + 1).reverse();

  // Find all subsets in pcset. Pretty meaty 10 lines of code.
  // It would be better to make an animated explaination rather 
  // than attempt to explain it in comments. If you can read it
  // and understand it, then kudos. If not, you can become a 
  // patron here: <insert patreon plug> (◕ᴗ◕✿)
  const subsets = pcset.reduce(
    (subsets, value) => {
      const data = subsets[ambitus].map(set => {
        const notes = [value, ...set.notes];
        const chroma = notes.map(n => Note.chroma(n));
        return { notes, chroma, ambitus };
      });
      subsets[ambitus] = subsets[ambitus].concat(data);
      return { [ambitus]: subsets[ambitus] };
    }, { [ambitus]: [{ notes: [], chroma: [], ambitus }] });

  // Remove redundant pcsets. For example, ["Eb", "C", "D"] is redundant 
  // because it is isomorphic to ["C", "D", "Eb"]. Since we take a parallel
  // (as opposed to derivative) approach to the presentation of shapes, these
  // kinds of isomorphisms are ommitted.
  subsets[ambitus] = subsets[ambitus]
    .filter(s => s['notes'][0] === interval[0] && s['notes'][s.notes.length - 1] === interval[1])
    .sort((a, b) => a.notes.length - b.notes.length);

  return subsets;
}

// Generate ambitii and write JSON to disk.
function generate_ambitii() {
  console.time("ambitii")
  const ambitii = []; // Soon-to-be JSON

  let ambitus = 0; // Current ambitus
  let shapes = 0; // Track the number of shapes generated to account for algorithm accuracy.

  while (ambitus < 12) {
    const _ambitus = getAllSubsets(ambitus); // The actual data for the current ambitus
    const len = _ambitus[ambitus].length; // The number of shapes in the current ambitus
    ambitii.push(..._ambitus[ambitus]); // Push it to the dataset
    console.log(`Generated ${len} shapes for ambitus ${ambitus}`);
    shapes += len; // Add to the total number of shapes seen so far.
    ambitus++; // Onward!
  }

  // Save to disk. Commented out for browser version.
  // require("fs").writeFileSync("ambitii.json", JSON.stringify(ambitii, null, 2));   // Save to disk
  console.log(`Done! Generated ${shapes} shapes.`);
  console.timeEnd("ambitii")
  return ambitii; // Return the JS object if needed elsewhere (ex: see ./check_duplicates.js)
}

window.generate_ambitii = generate_ambitii;
module.exports = { generate_ambitii }
