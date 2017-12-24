export let zIndexManager = {
  zIndex: 1001,
  nextZIndex() {
    return this.zIndex++;
  },
  removeZIndex() {
    return this.zIndex-- <= 1000 ? this.zIndex = 1000 : this.zIndex--
  }
};