const express = require('express');
const auth = require('../middleware/authMiddleware');
const { getSpending } = require('../controllers/spendingController');

const router = express.Router();

router.get('/spending', auth, getSpending);

module.exports = router;


