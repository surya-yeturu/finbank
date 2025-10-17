const path = require('path');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const { connectDB } = require('./config/db');
const User = require('./models/User');
const Transaction = require('./models/Transaction');

dotenv.config({ path: path.join(__dirname, '.env') });

async function run() {
  try {
    await connectDB(process.env.MONGO_URI);

    await Transaction.deleteMany({});
    await User.deleteMany({});

    const admin = await User.create({ name: 'Admin', email: 'admin@example.com', password: 'Password123!', balance: 0, role: 'admin' });
    const manager = await User.create({ name: 'Manager', email: 'manager@example.com', password: 'Password123!', balance: 0, role: 'manager' });
    const surya = await User.create({ name: 'Surya', email: 'surya@example.com', password: 'Password123!', balance: 25000, role: 'user' });
    const riya = await User.create({ name: 'Riya', email: 'riya@example.com', password: 'Password123!', balance: 10000, role: 'user' });

    const transfers = [
      { from: surya, to: riya, amount: 1200, desc: '[food] Dinner at SpiceHub' },
      { from: surya, to: riya, amount: 2200, desc: '[travel] Weekend cab' },
      { from: surya, to: riya, amount: 4500, desc: '[education] Online course fee' },
      { from: surya, to: riya, amount: 800, desc: '[others] Gift' },
      { from: riya, to: surya, amount: 700, desc: '[food] Lunch split' },
      { from: riya, to: surya, amount: 1500, desc: '[travel] Train tickets' },
      { from: surya, to: riya, amount: 3000, desc: '[others] Utilities share' },
      { from: riya, to: surya, amount: 2000, desc: '[education] Books' },
      { from: surya, to: riya, amount: 950, desc: '[food] Snacks' },
      { from: surya, to: riya, amount: 2750, desc: '[travel] Fuel' },
    ]

    for (const t of transfers) {
      await Transaction.create({ fromUser: t.from._id, toUser: t.to._id, amount: t.amount, description: t.desc, type: 'debit' });
      await Transaction.create({ fromUser: t.from._id, toUser: t.to._id, amount: t.amount, description: t.desc, type: 'credit' });
      await User.findByIdAndUpdate(t.from._id, { $inc: { balance: -t.amount } });
      await User.findByIdAndUpdate(t.to._id, { $inc: { balance: t.amount } });
    }

    console.log('Seeding completed. Users:');
    console.log('- admin@example.com (Password123!) [admin]');
    console.log('- manager@example.com (Password123!) [manager]');
    console.log('- surya@example.com (Password123!) [user]');
    console.log('- riya@example.com (Password123!) [user]');
    await mongoose.connection.close();
    process.exit(0);
  } catch (err) {
    console.error('Seeding failed:', err);
    process.exit(1);
  }
}

run();


