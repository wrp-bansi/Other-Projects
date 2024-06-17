
const { sendEmail } = require('../helpers/email-helper');

const emailApi = {

  sendEmail: async (req, res) => {
    try {
      const { templateName, userData,fromEmail,toEmail } = req.body;

      // Call sendEmail function
      await sendEmail(templateName, userData,"",fromEmail,toEmail);

      // Respond with success message
      res.status(200).json({ error: false, msg: 'Email sent successfully' });
    } catch (error) {
      // Handle any errors
      res.status(400).json({ error: true, msg:error.message});
    }
  }

};

module.exports = emailApi;
