const express = require('express');
const auth = require('../middleware/authMiddleware');
const requireRole = require('../middleware/requireRole');
const { applyStudentAccount, listApplications, updateApplicationStatus } = require('../controllers/studentController');

const router = express.Router();

router.post('/student/apply', applyStudentAccount);
router.get('/student/applications', auth, requireRole('admin', 'manager'), listApplications);
router.patch('/student/applications/:id', auth, requireRole('admin', 'manager'), updateApplicationStatus);

module.exports = router;


