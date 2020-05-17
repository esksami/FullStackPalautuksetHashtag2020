import axios from 'axios'
import storage from '../utils/storage'

const baseUrl = '/api/blogs'

const getConfig = () => {
  return {
    headers: { Authorization: `bearer ${storage.loadUser().token}` }
  }
}

const getAll = (blog_id) => {
  const request = axios.get(`${baseUrl}/${blog_id}/comments`)
  return request.then(response => response.data)
}

const create = (blog_id, comment) => {
  const request = axios.post(`${baseUrl}/${blog_id}/comments`, comment, getConfig())
  return request.then(response => response.data)
}

export default { getAll, create }