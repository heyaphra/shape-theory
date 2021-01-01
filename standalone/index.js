// Coming soon...
const {
  Note,
  Scale,
  Collection: { permutations },
} = require("@tonaljs/tonal");
const { transpose } = Note;
const { rotations } = require("./rotations");

const FUNDAMENTAL = "C";
const CHROMATIC_DATUM = Scale.get(`${FUNDAMENTAL} chromatic`);
const CHROMATIC_SCALE = CHROMATIC_DATUM["notes"];
const ALL_INTERVALS = CHROMATIC_DATUM["intervals"];

function find_subrings(ambitus) {
  const endIndex = CHROMATIC_SCALE.indexOf(
    transpose(FUNDAMENTAL, ALL_INTERVALS[ambitus])
  );

  if (ambitus < 2) return CHROMATIC_SCALE.slice(0, endIndex + 1);

  const unitSubring = [CHROMATIC_SCALE[0], CHROMATIC_SCALE[endIndex]];
  const pivotList = CHROMATIC_SCALE.slice(1, ambitus);
  const combinations = [];

  let maxShapeLength = ambitus;
  let currentShapeLength = 1;

  while (currentShapeLength <= maxShapeLength) {
    for (const note in pivotList) {
      const slice = pivotList.slice(note, +note + currentShapeLength);
      if (slice.length === currentShapeLength) {
        combinations.push([unitSubring[0], ...slice, unitSubring[1]]);
      }
    }
    currentShapeLength++;
  }

  return [unitSubring, ...combinations];
}

function generate_ambitii() {
  const ambitii = {};
  let ambitus = 0;
  const subrings = find_subrings(ambitus);
  console.log(subrings, subrings.length);
  // while (ambitus < 12) {
  //   let subrings = find_subrings(ambitus);
  //   const subring_rotations = subrings.map((subring) => rotations(subring));
  //   if (!(ambitus in ambitii)) {
  //     ambitii[ambitus] = {
  //       subrings,
  //       subring_rotations,
  //     };
  //   }
  //   ambitus++;
  // }
  return ambitii;
}

require("fs").writeFileSync("ambitii.json", JSON.stringify(generate_ambitii()));

//
