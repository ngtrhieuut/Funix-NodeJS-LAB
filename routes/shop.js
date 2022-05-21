// const path = require('path')

const express = require('express');

// const rootDir = require('../util/path');

// const adminData = require('./admin');

const productsController = require('../controllers/product')
const router = express.Router();

router.get('/', productsController.getProducts);

module.exports = router;