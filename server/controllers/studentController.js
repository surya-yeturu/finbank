const StudentApplication = require('../models/StudentApplication');

async function applyStudentAccount(req, res) {
  try {
    const { name, email, university, course, graduationYear } = req.body;
    if (!name || !email || !university || !course || !graduationYear) {
      return res.status(400).json({ message: 'All fields are required' });
    }
    const app = await StudentApplication.create({ name, email, university, course, graduationYear });
    return res.status(201).json({ application: app });
  } catch (err) {
    return res.status(500).json({ message: 'Application failed' });
  }
}

module.exports = { applyStudentAccount };
async function listApplications(req, res) {
  try {
    const { status } = req.query
    const query = status ? { status } : {}
    const apps = await StudentApplication.find(query).sort({ createdAt: -1 })
    return res.json({ applications: apps })
  } catch (err) {
    return res.status(500).json({ message: 'Failed to fetch applications' })
  }
}

async function updateApplicationStatus(req, res) {
  try {
    const { id } = req.params
    const { status } = req.body
    if (!['approved', 'rejected', 'pending'].includes(status)) {
      return res.status(400).json({ message: 'Invalid status' })
    }
    const app = await StudentApplication.findByIdAndUpdate(id, { status }, { new: true })
    if (!app) return res.status(404).json({ message: 'Application not found' })
    return res.json({ application: app })
  } catch (err) {
    return res.status(500).json({ message: 'Failed to update application' })
  }
}

module.exports = { applyStudentAccount, listApplications, updateApplicationStatus };


