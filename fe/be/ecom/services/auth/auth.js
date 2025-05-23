const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../../models/User');
const Order = require('../../models/Order');

const createUser = async (userData) => {
  const { email, password, firstName, lastName } = userData;

  const existingUser = await User.findOne({ email });
  if (existingUser) {
    throw new Error('User already exist!');
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = new User({
    email: email,
    password: hashedPassword,
    firstName: firstName,
    lastName: lastName,
  });

  const newOrder = Order({
    amount: 0,
    totalAmount: 0,
    discount: 0,
    orderStatus: 'PENDING',
    address: 'Default address',
    user: newUser,
  });

  await newOrder.save();
  await newUser.save();
  return newUser;
};

const loginUser = async (email, password) => {
  const user = await User.findOne({ email });
  if (!user) {
    throw new Error('User not found!');
  }

  const validPassword = await bcrypt.compare(password, user.password);
  if (!validPassword) {
    throw new Error('Invalid password!');
  }

  const token = jwt.sign(
    { userId: user._id, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: '7h' }
  );

  return { token, user };
};

module.exports = { createUser, loginUser };
