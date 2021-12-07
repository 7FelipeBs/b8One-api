const ProductService = require("../service/ProductService")

module.exports = function(app) {
    app.get('/product', (request,response) => {
        return ProductService.findAllProduct(request,response)
    })
    
    app.post('/product', (request,response) => {
        return ProductService.createProduct(request,response)
    })

    app.put('/product/:id', (request,response) => {
        return ProductService.updateProduct(request, response)
    })
    
    app.delete('/product/:id', (request,response) => {
        return ProductService.deleteProduct(request, response)
    })
}
