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
        
        console.log(req.body);
        // const product = { id: `${id}`, name: name, price: price, modify_date: new Date(), create_date: new Date() };
        // connection.query('INSERT INTO T_Product SET ?', product, (err, res) => {
        //     if (err) throw err;
        //     console.log('Last insert ID:', res.insertId);
        // });
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