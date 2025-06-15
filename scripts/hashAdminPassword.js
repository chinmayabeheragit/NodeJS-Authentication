// scripts/hashAdminPassword.js
const bcrypt = require('bcrypt');

(async () => {
  const password = 'Admin@123';
  const hashed = await bcrypt.hash(password, 10);
  console.log('Hashed Password:', hashed);
})();
