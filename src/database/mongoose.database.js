const mongoose = require('mongoose');

const connectToDatabase = async () => {
    await mongoose.connect(
        `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster0.art8a.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`
    );
};

module.exports = connectToDatabase;
