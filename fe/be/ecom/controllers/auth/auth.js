const { createUser, loginUser } = require('../../services/auth/auth.js');

const signup = async (req, res) => {
  try {
    newUser = await createUser(req.body);
    res.status(201).json({
      message: 'User created successfully',
      user: newUser,
    });
  } catch (err) {
    res.status(400).json({
      error: err.message,
    });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const { token } = await loginUser(email, password);
    res.status(200).json({
      message: 'Login successful!',
      token: token,
    });
  } catch (error) {
    console.error(error);
    res.status(400).json({
      error: error.message,
    });
  }
};

module.exports = { signup, login };
