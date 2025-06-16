const Joi = require('joi');

const updateUserSchema = Joi.object({
  name: Joi.string().min(3),
  email: Joi.string().email(),
  role: Joi.string().valid('user', 'admin')
});

module.exports = {
  updateUserSchema
};
