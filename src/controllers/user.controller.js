const {
  getAllUsersService,
  getUserByIdService,
  updateUserService
} = require('../services/user.service');

const getAllUsers = async (req, res) => {
  try {
    const users = await getAllUsersService();
    res.status(200).json({ success: true, data: users });
  } catch (err) {
    res.status(err.statusCode || 500).json({ error: err.message });
  }
};

const getUserById = async (req, res) => {
  try {
    const user = await getUserByIdService(req.params.id);
    res.status(200).json({ success: true, data: user });
  } catch (err) {
    res.status(err.statusCode || 500).json({ error: err.message });
  }
};

const updateUser = async (req, res) => {
  try {
    const updatedUser = await updateUserService(req.params.id, req.body);
    res.status(200).json({ success: true, data: updatedUser });
  } catch (err) {
    res.status(err.statusCode || 500).json({ error: err.message });
  }
};

module.exports = {
  getAllUsers,
  getUserById,
  updateUser
};
