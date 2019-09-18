const express = require('express')
const app = express()
const port = 3000
const Product = require('./server')
const cors = require('cors')
var bodyParser = require('body-parser')
var multer = require('multer');
// var upload = multer({ dest: 'uploads/' });

app.use(cors())
app.use(bodyParser.json());
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

var storage = multer.diskStorage({
    destination: function (req, file, callback) {
        callback(null, './uploads');
    },
    filename: function (req, file, callback) {
        callback(null, file.fieldname + '-' + Date.now());
    }
});

var upload = multer({ storage : storage }).array('userPhoto',2);

// app.get('/',function(req,res){
//     res.sendFile(__dirname + "/index.html");
// });

app.post('/', upload, Product.create)

// app.post('/',function(req,res){
//     upload(req,res,function(err) {
//         // console.log(req.body);
//         // console.log(req.files);
//         if(err) {
//             return res.end("Error uploading file.");
//         }
//         res.end("File is uploaded");
//     });
// },Product.create);


app.listen(port, function () {
    console.log(`Server Start on ${port}`);
})
