const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        const connString = process.env.MONGO_URI;
        if (!connString || connString.includes('<password>') || connString.includes('your_password')) {
            console.error('Error: MongoDB URI is unconfigured.');
            process.exit(1);
        }

        console.log(`Attempting to connect to MongoDB...`);
        // console.log(`URI: ${connString.replace(/:([^:@]{1,})@/, ':****@')}`); // Log masked URI

        const conn = await mongoose.connect(connString, {
            tls: true,
            tlsAllowInvalidCertificates: true,
            family: 4
        });
        console.log(`MongoDB Connected: ${conn.connection.host}`);
    } catch (error) {
        console.error(`Error: ${error.message}`);
        process.exit(1);
    }
};

module.exports = connectDB;
