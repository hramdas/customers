const mongoose = require('mongoose');
const { mongoDbURL } = require('./config');

module.exports = () => {
  return mongoose.connect(
    mongoDbURL, {
    autoIndex: true,
  }
  );
}