const express = require('express');
const router = express.Router();
const ctrl = require('../controllers/CampaignController');

router.get('/', ctrl.getAll);
router.get('/type/:type', ctrl.getByType);
router.get('/:id/donations', ctrl.getDonations);
router.post('/', ctrl.create);

module.exports = router;
