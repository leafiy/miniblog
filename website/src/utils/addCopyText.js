const addCopyText = () => {
  var selection = window.getSelection(),
    pagelink = '<br /><br /> Read more at: ' + document.location.href + '<br />© Dr.Qian Xiao ALL RIGHTS RESERVED<br />Only for non-commercial purposes <br /> Cited by the author\'s name and the release date of the material cited.',
    copytext = selection + pagelink,
    newdiv = document.createElement('div');

  //hide the newly created container
  newdiv.style.position = 'absolute';
  newdiv.style.left = '-99999px';

  //insert the container, fill it with the extended text, and define the new selection
  document.body.appendChild(newdiv);
  newdiv.innerHTML = copytext;
  selection.selectAllChildren(newdiv);

  window.setTimeout(function() {
    document.body.removeChild(newdiv);
  }, 100);
}

export default addCopyText