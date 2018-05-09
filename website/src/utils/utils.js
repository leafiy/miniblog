Object.defineProperty(Object.prototype, 'isEmptyObject', {
  value: function(obj) {
    return obj == null ? false : Object.keys(obj).length === 0;
  }
});