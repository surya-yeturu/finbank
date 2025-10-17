const express = require('express');
const { register, login, me } = require('../controllers/authController');
const auth = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/auth/register', register);
router.post('/auth/login', login);
router.get('/user/me', auth, me);

module.exports = router;


