const MarkdownIt = require('markdown-it')
const md = require('markdown-it')().use(require('markdown-it-anchor'), {
  level: 2,
  slugify: string => {
    string = encodeURI(string)
    string = string.replace(/\)/g, '')
    string = string.replace(/\(/g, '')
    string = string.replace(/\）/g, '')
    string = string.replace(/\（/g, '')
    return string
  },
})
const toc = require('markdown-toc');
const mdHandler = (article) => {
  if (!article.content) return article
  let html = md.render(article.content)
  if (article.showMenu) {
    let t = toc(article.content, {
      maxdepth: 2
    }).content
    t = md.render(t)

    t = t.replace(/<a/g, '<a class="scrollactive-item"')

    article.toc = t
  }

  article.content = html
  return article
}

export default mdHandler
