const mongoose = require("mongoose");


const databaseConnection = () => {
    mongoose.connect(process.env.MONGODB_URL)
  .then(() => console.log('Connected to database!'))
  .catch((e)=>{console.log(e)});
}

  module.exports = databaseConnection;