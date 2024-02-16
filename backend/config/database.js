const { error } = require("console");
const mongoose = require("mongoose");

const connectDatabase = () => {
    mongoose.connect(process.env.DB_URL).then((data) => {
        console.log(`Database connected!`);
    })

    // No need to catch error block as we have handled the errors in server.js Unhandled promise rejection portion 
}

module.exports = connectDatabase;
