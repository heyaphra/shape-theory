const {
  Note: { transposeBy },
  Interval: { distance },
} = require("@tonaljs/tonal");

const FUNDAMENTAL = "C";

/**
 *
 * @param {Array[string]} pcset - An array containing notes in a pitch-class set
 * @param {string} rotationType - May be "parallel" or "derivative"
 */
module.exports = function (pcset, rotationType = "parallel") {
  const res = [pcset.notes];
  for (let i = 0; i < pcset.notes.length - 1; i++) {
    const derivativeRotation = [
      ...res[i].slice(1, pcset.notes.length),
      res[i][0],
    ];
    const parallelRotation =
      rotationType === "parallel"
        ? derivativeRotation.map(
            transposeBy(distance(derivativeRotation[0], FUNDAMENTAL))
          )
        : null;
    res.push(
      rotationType === "parallel" ? parallelRotation : derivativeRotation
    );
  }
  return res;
};
