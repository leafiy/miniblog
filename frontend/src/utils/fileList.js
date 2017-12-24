const handleFileList = (fileList) => {

  let fileArr = []
  for (let file of fileList) {
    if (file.status !== 'finished') {
      continue
    }
    let newFile = {}
    newFile.url = file.trueUrl;
    newFile.name = file.name;
    newFile.id = file.id;
    fileArr.push(newFile)
  }
  return fileArr
}

export default handleFileList
