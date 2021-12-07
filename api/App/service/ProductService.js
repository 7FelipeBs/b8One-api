const products = require('../Model/Product') 

module.exports = {
    /** Find all products */
    findAllProduct: async (request,response) => {
        return response.json(products)
    },

    /** Create a product */
    createProduct: async (request,response) => {
        let product = request.body
        let id = 0
        products.forEach(product => {
            if(product.id >= id) {
                id = parseInt(product.id) + 1
            }
        })

        product.id = id
        products.push(product)
        
        return response.status(201).json(product) 
    },

    /** Update a product */
    updateProduct: async(request, response) => {
        const { id } = request.params

        let index = products.findIndex((product => parseInt(product.id) === parseInt(id)))
        request.body.id = id
        products[index] = request.body

        return response.json(products)
    },

    deleteProduct:  async(request, response) => {
        const { id } = request.params
        let index = products.findIndex((product => parseInt(product.id) === parseInt(id)))
        products.splice(index, 1)

        response.status(204).send()
    }
}