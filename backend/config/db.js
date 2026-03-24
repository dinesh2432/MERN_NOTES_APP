const mongoose = require('mongoose');

const connectDb = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URL);
        console.log(`DB CONNECTED SUCCESSFULLY: ${conn.connection.host}`);
    } catch (err) {
        console.error("MongoDB Connection Error: ", err.message);
        throw err; // Re-throw to be caught by server.js .catch()
    }
};

module.exports = connectDb;
