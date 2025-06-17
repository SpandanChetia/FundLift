const express = require('express');
const router = express.Router();
const ctrl = require('../controllers/DonationController');

router.post('/', ctrl.create);

module.exports = router;
