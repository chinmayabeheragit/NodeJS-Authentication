const bcrypt = require('bcrypt');

// Hash the password
const hashPassword = async (plainPassword) => {
  const salt = await bcrypt.genSalt(10);
  return await bcrypt.hash(plainPassword, salt);
};

// Compare plaintext with hashed password
const comparePassword = async (plainPassword, hashedPassword) => {
  return await bcrypt.compare(plainPassword, hashedPassword);
};


(async () => {
  const password = 'Admin@123';
  const hashed = await bcrypt.hash(password, 10);
  console.log('Hashed Password:', hashed);
})();

module.exports = {
  hashPassword,
  comparePassword
};
