const {
  findAllUsers,
  findUserById,
  updateUser
} = require('../queries/user.query');

const getAllUsersService = async () => {
  return await findAllUsers();
};

const getUserByIdService = async (id) => {
  const user = await findUserById(id);
  if (!user) {
    const error = new Error('User not found');
    error.statusCode = 404;
    throw error;
  }
  return user;
};

const updateUserService = async (id, data) => {
  const user = await updateUser(id, data);
  if (!user) {
    const error = new Error('User not found or update failed');
    error.statusCode = 404;
    throw error;
  }
  return user;
};

module.exports = {
  getAllUsersService,
  getUserByIdService,
  updateUserService
};
