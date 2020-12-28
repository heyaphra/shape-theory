module.exports = function (pcset) {
  const res = [pcset];
  for (let i = 0; i < pcset.length - 1; i++) {
    res.push([...res[i].slice(1, pcset.length), res[i][0]]);
  }
  return res;
};
