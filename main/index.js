const { Note } = require("@tonaljs/tonal");

const {
  FUNDAMENTAL,
  CHROMATIC_SCALE,
  ALL_INTERVALS
} = require("./constants");


function getAllSubsets(ambitus) {
  const intervalIdentity = [
    CHROMATIC_SCALE[0],
    CHROMATIC_SCALE[
    CHROMATIC_SCALE.indexOf(Note.enharmonic(Note.transpose(FUNDAMENTAL, ALL_INTERVALS[ambitus])))
    ],
  ];
  
  const pcset = CHROMATIC_SCALE.slice(0, ambitus + 1).reverse();

  const subsets = pcset.reduce(
    (subsets, value) => {
      const data = subsets[ambitus].map(set => {
        const notes = [value, ...set.notes];
        const chroma = notes.map(n => Note.chroma(n));
        return { notes, chroma }
      });
      subsets[ambitus] = subsets[ambitus].concat(data);
      return { [ambitus]: subsets[ambitus] };
    }, { [ambitus]: [{ notes: [], chroma: [] }] });

  subsets[ambitus] = subsets[ambitus]
    .filter(s => {
      return s['notes'][0] === intervalIdentity[0] && s['notes'][s.notes.length - 1] === intervalIdentity[1]
    })
    .sort((a, b) => a.notes.length - b.notes.length);

  return subsets;
}

function generate_ambitii() {
  const ambitii = [];
  let ambitus = 0;
  let shapes = 0;
  while (ambitus < 12) {
    const _ambitus = getAllSubsets(ambitus);
    const len = _ambitus[ambitus].length;
    shapes += len;
    console.log(`Generated ${len} shapes for ambitus ${ambitus}:`);
    ambitii.push(_ambitus);
    ambitus++;
  }
  console.log(`Done! Generated ${shapes} shapes.`);
  require("fs").writeFileSync("ambitii.json", JSON.stringify(ambitii, null, 2));
  return ambitii;
}

generate_ambitii();
