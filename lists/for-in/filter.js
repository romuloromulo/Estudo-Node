Array.prototype.MyFilter = function (callback) {
  const lista = [];
  for (item in this) {
    const result = callback(item, this);
    if (!result) continue;
    lista.push(result);
  }
  return lista;
};
