const mongoose = require('mongoose');
const {
  registerService,
  loginService,
  forgotPasswordService,
  resetPasswordService
} = require('../services/auth.service');

const register = async (req, res) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const user = await registerService(req.body, session);

    await session.commitTransaction();
    session.endSession();

    res.status(201).json({ success: true, user });
  } catch (error) {
    await session.abortTransaction();
    session.endSession();

    res.status(400).json({ success: false, message: error.message });
  }
};

const login = async (req, res) => {
  try {
    const { token, user } = await loginService(req.body);
    res.status(200).json({ success: true, token, user });
  } catch (error) {
    console.log(error);
    res.status(401).json({ success: false, message: error.message });
  }
};

const forgotPassword = async (req, res) => {
  try {
    await forgotPasswordService(req.body.email);
    res.status(200).json({ success: true, message: 'Reset link sent to email' });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

const resetPassword = async (req, res) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    await resetPasswordService(req.body.token, req.body.newPassword, session);

    await session.commitTransaction();
    session.endSession();

    res.status(200).json({ success: true, message: 'Password reset successful' });
  } catch (error) {
    await session.abortTransaction();
    session.endSession();

    res.status(400).json({ success: false, message: error.message });
  }
};

module.exports = {
  register,
  login,
  forgotPassword,
  resetPassword
};
