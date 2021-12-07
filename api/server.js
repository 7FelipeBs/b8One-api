const express = require('express')
const app = express()
const bodyParser = require('body-parser');
var cors = require('cors');

app.use(cors());
app.use(express.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

require('./App/controller/ProductController')(app)

const PORT = 5000
app.listen(PORT, function() {
    console.log(`Serve is listening on port: ${PORT}`)
})