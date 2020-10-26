const mongoose = require('mongoose');
require('dotenv').config();

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.DB_MONGO, {
            useCreateIndex: true,
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify: false
        });
        console.log('DB connected');
    } catch (error) {
        console.log('DB could not connect. Error!')
        console.log(error);
        process.exit(1);
    }
}

module.exports = connectDB;