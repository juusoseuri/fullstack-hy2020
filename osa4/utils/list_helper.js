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

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog
}