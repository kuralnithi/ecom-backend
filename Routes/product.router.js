const express = require('express'); 
const { getProducts, getSingleProduct, addproducts } = require('../Controllers/Product.controller');

const router = express.Router();

router.get('/products',getProducts)
router.post('/addproduct',addproducts)
router.get('/product/:id',getSingleProduct)

module.exports = router;