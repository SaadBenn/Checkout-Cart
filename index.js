const express = require('express');
const keys = require('./config/keys');
const stripe = require('stripe')(keys.stripeSecretKey);

const exphb = require('express-handlebars');

const app = express();

// Handlebars middlewar
app.engine('handlebars', exphb({defaultProps: 'main'}));
app.set('view engine', 'handlebars');


// routes
app.use('/', require('./routes/route'));

// use port 3000 for local or the prod port
const port = process.env.PORT || 3000;

// start the server 
app.listen(port, () => {
	console.log(`Server listening on port ${port}`);
});