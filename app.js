const express = require('express')
const app = express()
const port = 3000
const cors = require('cors')
const Product = require('./server')
const multer  = require('multer')
const upload = multer()

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.post('/',upload.none(), Product.create)


app.listen(port, function () {
    console.log(`Server Start on ${port}`);
})
