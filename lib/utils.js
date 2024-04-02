const mongoose = require("mongoose");
const dotenv = require('dotenv');
dotenv.config();

const connection = {};
export const connectToDB = async () => {
    try {
        if (connection.isConnected) return;
        const db = await mongoose.connect('mongodb+srv://mvosamira:9hMviDBGCq3BLUXv@cluster0.dpowmuw.mongodb.net/KidneyDoc?retryWrites=true&w=majority', {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });

        connection.isConnected = db.connections[0].readyState;
    } catch (error) {
        console.log(error)
        throw new Error(error);
    }
};

