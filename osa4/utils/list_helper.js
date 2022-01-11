var _ = require('lodash')
// eslint-disable-next-line no-unused-vars
const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
  return blogs.length === 0
    ? 0
    : blogs
      .map(_ => _.likes)
      .reduce((prev, curr) => prev + curr)
}

const favoriteBlog = (blogs) => {
  const maxLikes = Math.max(...blogs.map(b => b.likes))
  return blogs.length === 0
    ? 'List of blogs is empty'
    : blogs.find(obj => {
      return obj.likes === maxLikes
    })
}

const mostBlogs = (blogs) => {
  const authors = blogs.map(x => x.author)

  const most = _.head(_(authors).countBy().entries().maxBy(_.last))
  const result = {
    'author': most,
    'blogs': authors.filter(x => x === most).length
  }

  return result
}

const mostLikes = (blogs) => {
  let dict = {}
  blogs.forEach((blog) => (dict[blog.author] = 0))
  blogs.forEach((blog) => (dict[blog.author] = dict[blog.author] + blog.likes))
  const mostLikes = Object.keys(dict).reduce(function (a, b) {
    return dict[a] > dict[b] ? a : b
  })

  return {
    author: mostLikes,
    likes: dict[mostLikes]
  }
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes
}