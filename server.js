const { hashPassword } = require('./bcrypt')
const random = require('simple-random-id');

// app.js
const mysql = require('mysql');

// First you need to create a connection to the db
const connection = mysql.createConnection({
    host: 'remotemysql.com',
    user: 'L9zotZtnmt',
    password: 'SlbZ9p4jI5',
    database: 'L9zotZtnmt'
});

connection.connect((err) => {
    if (err) {
        console.log('Error connecting to Db');
        return;
    }
    console.log('Connection established');
});

class Product {
    static create(req, res) {
        let id = random(32)
        let name = req.body.name
        let price = req.body.price
        let picture = req.files
        // console.log(price);
        console.log(req.files);
        const product = { id: `${id}`, name: `${name}`, price: `${price}`, modify_date: new Date(), create_date: new Date() };
        connection.query('INSERT INTO T_Product SET ?', product, (err, res) => {
            if (err) throw err;
            console.log('Last insert ID:', res.insertId);
        });

        picture.forEach(element => {
            // console.log(element.originalname);
            // let img = req.files[0].originalname
            let img = element.originalname
            let id_photo = random(32)
            const image = { id: `${id_photo}`, product_id: `${id}`, img: img, modify_date: new Date(), create_date: new Date() };
            connection.query('INSERT INTO AT_ProductImages SET ?', image, (err, res) => {
                if (err) throw err;
                console.log('Last insert ID:', res.insertId);
            });
        });

    }
    static list(req, res) {
        // console.log(req.body);
        connection.query('SELECT T_Product.id, T_Product.name, T_Product.price, AT_ProductImages.img FROM T_Product LEFT JOIN AT_ProductImages ON T_Product.id = AT_ProductImages.product_id', (err, rows) => {
            if (err) throw err;

            // console.log('Data received from Db:\n');
            console.log(rows);
            res.json(rows)
            // data = rows
        });
        // console.log(data);
    }

    static delete(req, res) {
        let id_img = req.body.id
        connection.query(`DELETE FROM AT_ProductImages WHERE product_id = '${id_img}'`, (err, result) => {
            if (err) throw err;


            console.log(result);
            // res.json(result)
            connection.query(`DELETE FROM T_Product WHERE id = '${id_img}'`, (err, result) => {
                if (err) throw err;


                console.log(result);
                res.json(result)
            });
        });


    }
}















// connection.end((err) => {
//   // The connection is terminated gracefully
//   // Ensures all previously enqueued queries are still
//   // before sending a COM_QUIT packet to the MySQL server.
// });

// connection.query('SELECT * FROM T_Product', (err, rows) => {
//     if (err) throw err;

//     console.log('Data received from Db:\n');
//     console.log(rows);
// });

// connection.query('SELECT * FROM AT_ProductImages', (err, rows) => {
//     if (err) throw err;

//     console.log('Data received from Db:\n');
//     console.log(rows);
// });

// const employee = { id: '998', name: 'Dienul', price: '00000', modify_date : new Date(), create_date : new Date() };
// connection.query('INSERT INTO T_Product SET ?', employee, (err, res) => {
//   if(err) throw err;

//   console.log('Last insert ID:', res.insertId);
// });

module.exports = Product