const mongoose = require('mongoose');
const PDFDocument = require('pdfkit');
const { Parser } = require('json2csv');
const User = require('../models/User');
const Transaction = require('../models/Transaction');

async function getTransactions(req, res) {
  const limit = Math.min(Number(req.query.limit) || 50, 200);
  const txns = await Transaction.find({
    $or: [{ fromUser: req.user._id }, { toUser: req.user._id }],
  })
    .sort({ createdAt: -1 })
    .limit(limit)
    .populate('fromUser toUser', 'name email');
  res.json({ transactions: txns });
}

async function transfer(req, res) {
  const { toEmail, amount, description = '' } = req.body;
  const amt = Number(amount);
  if (!toEmail || !amt || amt <= 0) {
    return res.status(400).json({ message: 'toEmail and positive amount required' });
  }
  if (toEmail.toLowerCase() === req.user.email.toLowerCase()) {
    return res.status(400).json({ message: 'Cannot transfer to self' });
  }

  const session = await mongoose.startSession();
  session.startTransaction();
  try {
    const sender = await User.findById(req.user._id).session(session);
    const receiver = await User.findOne({ email: toEmail.toLowerCase() }).session(session);
    if (!receiver) throw new Error('Recipient not found');
    if (sender.balance < amt) throw new Error('Insufficient balance');

    sender.balance -= amt;
    receiver.balance += amt;
    await sender.save({ session });
    await receiver.save({ session });

    const debit = await Transaction.create([
      { fromUser: sender._id, toUser: receiver._id, amount: amt, description, type: 'debit' },
    ], { session });
    const credit = await Transaction.create([
      { fromUser: sender._id, toUser: receiver._id, amount: amt, description, type: 'credit' },
    ], { session });

    await session.commitTransaction();
    session.endSession();
    res.status(201).json({ message: 'Transfer successful', debit: debit[0], credit: credit[0] });
  } catch (err) {
    await session.abortTransaction();
    session.endSession();
    res.status(400).json({ message: err.message || 'Transfer failed' });
  }
}

async function downloadStatement(req, res) {
  const format = (req.query.format || 'pdf').toLowerCase();
  const txns = await Transaction.find({
    $or: [{ fromUser: req.user._id }, { toUser: req.user._id }],
  })
    .sort({ createdAt: -1 })
    .limit(10)
    .populate('fromUser toUser', 'name email');

  if (format === 'csv') {
    const fields = ['createdAt', 'type', 'amount', 'description', 'fromUser.email', 'toUser.email'];
    const parser = new Parser({ fields });
    const csv = parser.parse(txns.map((t) => ({
      createdAt: t.createdAt,
      type: t.type,
      amount: t.amount,
      description: t.description,
      'fromUser.email': t.fromUser.email,
      'toUser.email': t.toUser.email,
    })));
    res.setHeader('Content-Type', 'text/csv');
    res.setHeader('Content-Disposition', 'attachment; filename="statement.csv"');
    return res.status(200).send(csv);
  }

  // Default to PDF
  const doc = new PDFDocument();
  res.setHeader('Content-Type', 'application/pdf');
  res.setHeader('Content-Disposition', 'attachment; filename="statement.pdf"');
  doc.pipe(res);
  doc.fontSize(18).text('FinBank - Mini Statement', { underline: true });
  doc.moveDown();
  txns.forEach((t) => {
    doc.fontSize(12).text(`${t.createdAt.toISOString()} | ${t.type.toUpperCase()} | $${t.amount.toFixed(2)} | ${t.description} | ${t.fromUser.email} -> ${t.toUser.email}`);
  });
  doc.end();
}

module.exports = { getTransactions, transfer, downloadStatement };


