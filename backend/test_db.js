const mongoose = require('mongoose');
require('dotenv').config();

const connectDB = async () => {
    try {
        console.log("Attempting to connect to MongoDB...");
        // console.log("URI:", process.env.MONGO_URI); 

        const conn = await mongoose.connect(process.env.MONGO_URI, {
            tls: true,
            tlsAllowInvalidCertificates: true,
            family: 4 // Force IPv4
        });
        console.log(`MongoDB Connected: ${conn.connection.host}`);
        process.exit(0);
    } catch (error) {
        console.error("CONNECTION ERROR DETAILS:");
        console.error(error);
        process.exit(1);
    }
};

connectDB();
