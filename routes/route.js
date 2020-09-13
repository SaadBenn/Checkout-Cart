const express = require('express');
const bodyParser = require('body-parser');
const urlencodedParser = bodyParser.urlencoded({ extended: false });
const router = require('express-promise-router')();
const keys = require('../config/keys');
const stripe = require('stripe');

router.get('/', (req, res) => {
	res.render('index', {
		stripePublishableKey: keys.stripePublishableKey
	});
});

router.post('/charge', urlencodedParser, (req, res) => {
	const amount = 10000;

	stripe.customers.create({
		email: req.body.stripeEmail,
		source: req.body.stripeToken
	})
	.then(customer => stripe.charges.create({
		amount,
		description: 'iphone',
		currency: 'usd',
		customer: customer.id
	}))
	.then(charge => res.render('success'));
});

module.exports = router;