//Import the modules
import express from 'express';
import dotenv from 'dotenv';
import mysql2 from 'mysql2';
dotenv.config();

//Create a connection pool
const pool = mysql2.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT
}).promise();

//Create an instance of an express application
const app = express();

//Define a port number for the server to listen to
const PORT = 3002;

//Enable static file serving
app.use(express.static('public'));

//Set new view engine
app.set('view engine', 'ejs');

//Set up middleware
app.use(express.urlencoded({extended: true}));

//Create an array to hold the order information
const orders = [];

//Define a default route ("/")
app.get('/', (req, res) => {
    res.render('home');
    // res.sendFile(`${import.meta.dirname}/views/home.html`);
});

//Test the db
// app.get('/db-test', async(req,res)=> {
//     try{
//         const [orders] = await pool.query(`SELECT * FROM orders`);
//         res.send(orders);
//     } catch(err){
//         console.log('Database error: ', err);
//         res.status(500).send('Database error: ' + err.message);
//     }
// });

app.get('/admin', async(req, res) => {
    try {
        //Fetch all orders from database, most recent first
        const [orders] = await pool.query(`SELECT * FROM orders ORDER BY timestamp DESC`);

        res.render('admin', {orders});  
    } catch (err) {
        console.error('Database error:', err);
        res.status(500).send('Error loading orders: ' + err.message);
    }
    
})

app.post('/confirm', async(req, res) => {
    try{
        //Get form data from req.body
        const order = req.body;

        //Log the order data (for debugging)
        console.log('New order submitted:', order);
        
        //convert toppings array to comma-separated string
        order.toppings = Array.isArray(order.toppings) ? order.toppings.join(", ") : "";

        //SQL INSERT query with placeholders to prevent SQL injection
        const sql = `INSERT INTO orders(customer, email, flavor, cone, toppings, comment) VALUES (?, ?, ?, ?, ?, ?);`;

        const params = [
            order.name,
            order.email,
            order.flavors,
            order.cone, 
            order.toppings,
            order.comment
        ]

        //Execute the query and grab the primary key of the new row
        const [result] = await pool.execute(sql, params);

        //Add the order ID ot the order object
        order.id = result.insertIdl
        console.log('Order saved with ID: ', order.id);

        res.render('confirm', {order})
        

    } catch (err) {
        console.log('Error saving order: ', err);
        res.status(500).send('Sorry, there was an error processing your order. Please try again. ');
    }  
})

//Start the server on the designated port
app.listen(PORT, () => {
    console.log(`Server running in port http://localhost:${PORT}`);
})