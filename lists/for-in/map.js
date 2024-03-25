Array.prototype.myMap = function (callback) {
  const mapArray = [];

  for (let index = 0; index < array.length; index++) {
    const result = callback(array[index], index);
    mapArray.push(result);
  }

  return mapArray;
};

const arr = [1, 2, 3, 4, 5, 2, 1];

arr.myMap((res, index) => {});
