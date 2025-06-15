const {
  createUser,
  findUserByEmail,
  addResetToken,
  findByResetToken,
  updateUser
} = require('../queries/user.query');

const { hashPassword, comparePassword } = require('../utils/hash');
const generateToken = require('../utils/generateToken');
const sendMail = require('../utils/sendMail');
const crypto = require('crypto');

// REGISTER
const registerService = async ({ name, email, password }, session) => {
  const existingUser = await findUserByEmail(email);
  if (existingUser) throw new Error('User already exists.');

  const hashed = await hashPassword(password);
  const newUser = await createUser({ name, email, password: hashed }, session);

  return newUser;
};

// LOGIN
const loginService = async ({ email, password }) => {
  const user = await findUserByEmail(email);
  if (!user) throw new Error('Invalid email or password.');

  const isMatch = await comparePassword(password, user.password);
  if (!isMatch) throw new Error('Invalid email or password.');

  const token = generateToken(user._id, user.role);
  return { token, user };
};

// FORGOT PASSWORD
const forgotPasswordService = async (email) => {
  const user = await findUserByEmail(email);
  if (!user) throw new Error('User not found.');

  const token = crypto.randomBytes(20).toString('hex');
  const expiry = Date.now() + 15 * 60 * 1000; // 15 minutes

  await addResetToken(email, token, expiry);

  const resetUrl = `http://localhost:3000/reset-password/${token}`;
  await sendMail(email, 'Reset Password', `Click to reset: ${resetUrl}`);
};

// RESET PASSWORD
const resetPasswordService = async (token, newPassword, session) => {
  const user = await findByResetToken(token);
  if (!user) throw new Error('Reset token invalid or expired.');

  const hashed = await hashPassword(newPassword);
  const updated = await updateUser(
    user._id,
    { password: hashed, resetToken: null, resetTokenExpire: null },
    session
  );

  return updated;
};

module.exports = {
  registerService,
  loginService,
  forgotPasswordService,
  resetPasswordService
};
