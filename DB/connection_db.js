const mongoose = require('mongoose');
require('dotenv').config({ path: '../config/config.env' });

const connect_DB = async () => {
  try {
    await mongoose.connect(process.env.CONNECTION_URL, {
      useFindAndModify: false,
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log('Mongodb connected');
  } catch (error) {
    process.exit(1);
  }
};

module.exports = connect_DB;
