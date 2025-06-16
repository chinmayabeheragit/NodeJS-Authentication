const express = require('express');
const router = express.Router();
const passport = require('passport');


const {
  register,
  login,
  forgotPassword,
  resetPassword
} = require('../controllers/auth.controller');

const validate = require('../middlewares/validate.middleware');
const {
  registerSchema,
  loginSchema,
  forgotPasswordSchema,
  resetPasswordSchema
} = require('../validators/auth.validators');

router.post('/register', validate(registerSchema), register);
router.post('/login', validate(loginSchema), login);
router.post('/forgot-password', validate(forgotPasswordSchema), forgotPassword);
router.post('/reset-password', validate(resetPasswordSchema), resetPassword);
router.get('/google',
  passport.authenticate('google', { scope: ['profile', 'email'] })
);

router.get('/google/callback',
  passport.authenticate('google', { session: false, failureRedirect: '/login' }),
  (req, res) => {
    console.log('OAuth user:', req.user); // ← Add this log
    if (!req.user) {
      return res.redirect(`${process.env.CLIENT_URL}/google/callback`);
    }
    const token = require('../utils/generateToken')(req.user._id, req.user.role);
    res.redirect(`${process.env.CLIENT_URL}/google/callback?token=${token}`);
  }
);


module.exports = router;
