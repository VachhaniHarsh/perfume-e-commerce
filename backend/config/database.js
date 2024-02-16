const { error } = require("console");
const mongoose = require("mongoose");

const connectDatabase = () => {
    mongoose.connect(process.env.DB_URL).then((data) => {
        console.log(`Database connected!`);
    }).catch((error) => {
        console.log(error);
    });
}

module.exports = connectDatabase;
