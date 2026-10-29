//Import the module
import express from 'express';

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

app.get('/admin', (req, res) => {
    res.render('admin', {orders});  
})

app.post('/confirm', (req, res) => {
    
    const order = req.body;
    order['timestamp'] = new Date();
    console.log(order);
    orders.push(order);
    res.render('confirm', {order});
})

//Start the server on the designated port
app.listen(PORT, () => {
    console.log(`Server running in port http://localhost:${PORT}`);
})