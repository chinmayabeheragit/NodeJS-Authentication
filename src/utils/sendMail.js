// MOCKED UTILITY FOR NOW
const sendMail = async (to, subject, text) => {
  console.log(`Sending email to ${to} with subject "${subject}": ${text}`);
};

module.exports = sendMail;
