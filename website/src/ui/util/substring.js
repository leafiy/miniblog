String.prototype.gblen = function() {
  let len = 0;
  for (let i = 0; i < this.length; i++) {
    if (this.charCodeAt(i) > 127 || this.charCodeAt(i) == 94) {
      len += 2;
    } else {
      len++;
    }
  }
  return len;
}

const substringAddDot = (str, len, hasDot) => {
  if (!str) return '';
  let strLength = str.length;
  if (strLength > len)
    return hasDot ? str.substring(0, len) + '...' : str.substring(0, len);
  else
    return str;

};
export default substringAddDot;
