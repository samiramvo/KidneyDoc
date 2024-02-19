import mongoose from "mongoose";

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
            unique: true,
        },
        prenom_patient: {
            type: String,
            required: true,
            unique: true,
        },
        gender: {
            type: String,
            enum: ['male', 'female'],
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
            enum: ['Pr VIGAN', 'Other'],
            type: String,
        },
    },
    { timestamps: true }
);

export const User = mongoose.models.User || mongoose.model("User", userSchema);
export const Patient =
    mongoose.models.Patient || mongoose.model("Patient", patientSchema);
