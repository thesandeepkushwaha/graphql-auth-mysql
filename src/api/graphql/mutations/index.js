const {
  createContact,
  updateContact,
  deleteContact,
} = require('./contactMutation');
const {
  login
} = require('./UserMutation');

module.exports = {
  createContact,
  updateContact,
  deleteContact,
  login
};
