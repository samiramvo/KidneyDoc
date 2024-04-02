const mongoose = require("mongoose");
const dotenv = require('dotenv');
dotenv.config({ path: './config/config.env' })

const connection = {};
export const connectToDB = async () => {
    try {
        if (connection.isConnected) return;
        const db = await mongoose.connect(process.env.MONGO_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });

        connection.isConnected = db.connections[0].readyState;
    } catch (error) {
        console.log(error)
        throw new Error(error);
    }
};

