const express = require('express');
const { init } = require('../controller/homeController');

const router = express.Router();

router.get('/', init);

module.exports = router;