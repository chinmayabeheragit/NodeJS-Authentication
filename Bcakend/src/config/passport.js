// src/config/passport.js
require('dotenv').config(); // ✅ Load .env variables early
const passport = require('passport');
require('../strategies/google.strategy'); // now this will get env variables
module.exports = passport;
