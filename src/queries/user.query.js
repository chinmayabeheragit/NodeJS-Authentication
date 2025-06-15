const User = require('../models/user.model');

// Create
const createUser = async (data, session = null) => {
  return await new User(data).save({ session });
};

// Read
const findUserByEmail = async (email) => await User.findOne({ email });

const findUserById = async (id) => await User.findById(id);

const findByResetToken = async (token) => {
  return await User.findOne({
    resetToken: token,
    resetTokenExpire: { $gt: Date.now() }
  });
};

// Update
const updateUser = async (id, data, session = null) => {
  return await User.findByIdAndUpdate(id, data, { new: true, session });
};

const addResetToken = async (email, token, expiry) => {
  return await User.findOneAndUpdate(
    { email },
    { resetToken: token, resetTokenExpire: expiry },
    { new: true }
  );
};

module.exports = {
  createUser,
  findUserByEmail,
  findUserById,
  updateUser,
  addResetToken,
  findByResetToken
};
