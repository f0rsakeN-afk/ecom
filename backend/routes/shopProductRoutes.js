const express = require('express');
const router = express.Router();
const { getFilteredProducts } = require('../controllers/shopController')


router.get('/get', getFilteredProducts)
module.exports = router;