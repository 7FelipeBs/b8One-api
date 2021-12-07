import axios from 'axios'
const apiBase = 'http://localhost:5000'

// eslint-disable-next-line
export default {
  getAllProduct: async () => {
  return  axios
    .get(`${apiBase}/product`)
    .then(response => (response.data))
    .catch(function (error) {
      console.log(error)
    })
  },

  createProduct: async (product) => {
    return axios.post(`${apiBase}/product`, product)
    .then(function (response) {
      return response
    })
    .catch(function (error) {
      console.log(error)
    })
  },

  updateProduct: async(product) => {
    return axios.put(`${apiBase}/product/${product.id}`, product)
    .then(function (response) {
      return response
    })
    .catch(function (error) {
      console.log(error)
    })
  },

  deleteProduct: async(id) => {
    return axios.delete(`${apiBase}/product/${id}`)
    .then(function (response) {
      return response
    })
    .catch(function (error) {
      console.log(error)
    })
  }
}