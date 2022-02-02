import axios from 'axios'

const baseUrl = 'http://localhost:3001/anecdotes'

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const createNew = async (content) => {
  const obj = {content, votes: 0}
  const res = await axios.post(baseUrl, obj)
  return res.data
}

// eslint-disable-next-line import/no-anonymous-default-export
export default { getAll, createNew }
