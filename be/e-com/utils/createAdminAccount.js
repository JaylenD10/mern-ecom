require('dotenv').config;
const bcrypt = require('bcrypt');
const User = require('../models/User');

const createAdminAccount = async () => {
  try {
    const existingAdmin = await User.findOne({
      email: process.env.ADMIN_EMAIL,
    });
    if (existingAdmin) {
      console.log('Admin account already exist!');
      return;
    }
    const hashedPassword = await bcrypt.hash(process.env.ADMIN_PASSWORD, 10);
    const newAdmin = new User({
      email: process.env.ADMIN_EMAIL,
      password: hashedPassword,
      firstName: process.env.ADMIN_FIRST_NAME,
      lastName: process.env.ADMIN_LAST_NAME,
      role: 'ADMIN',
    });

    await newAdmin.save();
    console.log('Admin created successfuly!');
  } catch (err) {
    console.log(`Error creating admin: ${err}`);
  }
};

module.exports = createAdminAccount;
