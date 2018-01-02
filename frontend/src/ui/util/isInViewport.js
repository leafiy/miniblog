const isInViewport = (el) => {
  if (typeof el === 'string') {
    el = document.querySelector(el)
  }
  if (!el) throw new Error(`cannot find el ${el}`)

  const rect = el.getBoundingClientRect();
  const windowWidth = window.innerWidth || document.documentElement.clientWidth;
  const windowHeight = window.innerHeight || document.documentElement.clientHeight;
  console.log(rect)

};



export default isInViewport;
