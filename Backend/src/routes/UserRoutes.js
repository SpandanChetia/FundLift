const express = require('express');
const router = express.Router();
const ctrl = require('../controllers/UserController');

router.get('/', ctrl.getAll);
router.get('/search', ctrl.search);
router.get('/:id', ctrl.getById);

module.exports = router;
