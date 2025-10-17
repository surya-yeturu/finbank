const Transaction = require('../models/Transaction');

// For simplicity, we assume description contains a category tag like "[food] dinner".
function extractCategory(description) {
  const match = /^\s*\[(.+?)\]\s*/i.exec(description || '');
  return match ? match[1].toLowerCase() : 'uncategorized';
}

async function getSpending(req, res) {
  const txns = await Transaction.find({ fromUser: req.user._id, type: 'debit' }).sort({ createdAt: -1 }).limit(500);
  const byCategory = {};
  for (const t of txns) {
    const category = extractCategory(t.description);
    if (!byCategory[category]) byCategory[category] = { total: 0, count: 0 };
    byCategory[category].total += t.amount;
    byCategory[category].count += 1;
  }
  res.json({ spending: byCategory });
}

module.exports = { getSpending };


