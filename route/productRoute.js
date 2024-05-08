const express = require('express');
const { getProducts, getProduct, createProduct, updateProduct, deleteProduct } = require('../controller/productController');
const passport = require('passport');
const checkRoles = require('../middleware/checkRoles');

const router = express.Router();

router.get('/', passport.authenticate('jwt', { session: false }), getProducts);

router.get('/:id', passport.authenticate('jwt', { session: false }), getProduct);

router.post('/', passport.authenticate('jwt', { session: false }), checkRoles(['ADMIN']), createProduct);

router.put('/:id', passport.authenticate('jwt', { session: false }), checkRoles(['ADMIN']), updateProduct);

router.delete('/:id', passport.authenticate('jwt', { session: false }), checkRoles(['ADMIN']), deleteProduct);

module.exports = router;
