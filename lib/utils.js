require('dotenv').config();
import mongoose from "mongoose";
const connection = {};

export const connectToDB = async () => {
    try {
        if (connection.isConnected) return;
        const db = await mongoose.connect(process.env.MONGO_URL, { useNewUrlParser: true })
            .then(() => console.log("DB connected!"))
            .catch((err) => console.error("Connection error:", err));

        connection.isConnected = db.connections[0].readyState;
    } catch (error) {
        console.log(error)
        throw new Error(error);
    }
};

