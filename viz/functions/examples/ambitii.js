const { Note, Scale, Collection } = require("@tonaljs/tonal");
const { transpose } = Note;
const { rotations } = require("..");

const FUNDAMENTAL = "C";
const CHROMATIC_DATUM = Scale.get(`${FUNDAMENTAL} chromatic`);
const CHROMATIC_SCALE = CHROMATIC_DATUM["notes"];
const ALL_INTERVALS = CHROMATIC_DATUM["intervals"];

function find_subrings(ambitus) {
  const unitSubring = [
    CHROMATIC_SCALE[0],
    CHROMATIC_SCALE[
      CHROMATIC_SCALE.indexOf(transpose(FUNDAMENTAL, ALL_INTERVALS[ambitus]))
    ],
  ];
  const subrings = [unitSubring];

  const pivotList = CHROMATIC_SCALE.slice(1, ambitus);
  const maxShapeLength = pivotList.length + unitSubring.length;
  let currentSliceRange = 1;

  while (currentSliceRange < maxShapeLength - 1) {
    subrings.push([
      unitSubring[0],
      ...pivotList.slice(0, currentSliceRange),
      unitSubring[unitSubring.length - 1],
    ]);
    currentSliceRange++;
  }

  return subrings;
}

function generate_ambitii() {
  const ambitii = {};
  let ambitus = 3;
  let subrings = find_subrings(ambitus);
  console.log(subrings)
  // const subring_rotations = rotations(subring);

  // if (!(ambitus in ambitii)) {
  //   ambitii[ambitus] = subring_rotations;
  // }

  return ambitii;
}

require("fs").writeFileSync("ambitii.json", JSON.stringify(generate_ambitii()));

// function generate_ambitii() {
//   const ambitii = {};
//   let ambitus = 0;
//   while (ambitus < 12) {
//     let subring = find_subring(ambitus);
//     const subring_rotations = rotations(subring);
//     if (!(ambitus in ambitii)) {
//       ambitii[ambitus] = subring_rotations;
//     }
//     ambitus++;
//   }

//   return ambitii;
// }
