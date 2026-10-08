//Import the module
import express from 'express';

//Create an instance of an express application
const app = express();

//Define a port number for the server to listen to
const PORT = 3001;

//Enable static file serving
app.use(express.static('public'));

//Define a default route ("/")
app.get('/', (req, res) => {
    res.sendFile(`${import.meta.dirname}/views/home.html`);
});

//Start the server on the designated port
app.listen(PORT, () => {
    console.log(`Server running in port http://localhost:${PORT}`);
})