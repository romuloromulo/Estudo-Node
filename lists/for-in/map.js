Array.prototype.myMap = function (callback) {
  const mapArray = [];

  for (let index = 0; index < array.length; index++) {
    const result = callback(array[index], index);
    mapArray.push(result);
  }

  return mapArray;
};
