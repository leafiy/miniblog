const shortName = (title) => {
  title = title.replace(/[\W_]+/g, '-')
  if (title[title.length-1] == '-') {
    title = title.slice(0, title.length - 1)
    return title
  } else {
    return title
  }
}

export default shortName