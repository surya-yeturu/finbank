const express = require('express');
const auth = require('../middleware/authMiddleware');
const { getTransactions, transfer, downloadStatement } = require('../controllers/transactionController');

const router = express.Router();

router.get('/transactions', auth, getTransactions);
router.post('/transfer', auth, transfer);
router.get('/statements/download', auth, downloadStatement);

module.exports = router;


