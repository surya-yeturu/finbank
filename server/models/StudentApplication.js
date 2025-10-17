const mongoose = require('mongoose');

const studentApplicationSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, trim: true, lowercase: true },
    university: { type: String, required: true, trim: true },
    course: { type: String, required: true, trim: true },
    graduationYear: { type: Number, required: true },
    status: { type: String, enum: ['pending', 'approved', 'rejected'], default: 'pending' },
  },
  { timestamps: true }
);

module.exports = mongoose.model('StudentApplication', studentApplicationSchema);


