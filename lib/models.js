import { connectToDB } from "./utils";
import mongoose from "mongoose";

async function initializeDatabase() {
    await connectToDB();
}
initializeDatabase();

const userSchema = new mongoose.Schema(
    {
        username: {
            type: String,
            required: true,
            unique: true,
            min: 3,
            max: 20,
        },
        emailuser: {
            type: String,
            required: true,
            unique: true,
        },
        passworduser: {
            type: String,
            required: true,
        },
        img: {
            type: String,
        },
        isAdmin: {
            type: Boolean,
            default: false,
        },
        isActive: {
            type: Boolean,
            default: true,
        },
        phoneuser: {
            type: String,
        },
        useraddress: {
            type: String,
        },
    },
    { timestamps: true }
);


const patientSchema = new mongoose.Schema(
    {
        name_patient: {
            type: String,
            required: true,
            unique: false,
        },
        prenom_patient: {
            type: String,
            required: true,
            unique: false,
        },
        gender: {
            type: String,
            enum: ['Male', 'Female'],
            required: true,
        },
        birth: {
            type: Date,
            required: true,
        },
        agepatient: {
            type: Number,
            required: true,
            min: 0,
        },
        addresspatient: {
            type: String,
        },
        phone_patient: {
            type: String,
        },
        doctor: {
            type: String,
            enum: ['Dr VIGAN', 'Dr Pascal'],
            required: true,
        },
    },
    { timestamps: true }
);

export const User = mongoose.models.User || mongoose.model("User", userSchema);
export const Patient = mongoose.models.Patient || mongoose.model("Patient", patientSchema);
