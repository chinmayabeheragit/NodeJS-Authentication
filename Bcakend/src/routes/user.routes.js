const express = require('express');
const router = express.Router();

const {
  getAllUsers,
  getUserById,
  updateUser
} = require('../controllers/user.controller');

const auth = require('../middlewares/auth.middleware');
const role = require('../middlewares/roles.middleware');
const validate = require('../middlewares/validate.middleware');
const { updateUserSchema } = require('../validators/user.validator');

// Protected routes
router.get('/', auth, role('admin'), getAllUsers);
router.get('/:id', auth, getUserById);
router.put('/:id', auth, validate(updateUserSchema), updateUser);

module.exports = router;
