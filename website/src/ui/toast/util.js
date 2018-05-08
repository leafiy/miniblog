const directions = {
  x: ['left', 'center', 'right'],
  y: ['top', 'bottom']
}

/**
  * Sequential ID generator
  */
export const Id = (i => () => i++)(0)

/**
  * Splits space/tab separated string into array and cleans empty string items.
  */
export const split = (value) => {
  if (typeof value !== 'string') {
    return []
  }

  return value.split(/\s+/gi).filter(v => v)
}