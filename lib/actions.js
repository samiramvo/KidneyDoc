"use server";
import { revalidatePath } from "next/cache";
import { connectToDB } from "./utilsconnection";
import { User, Patient } from "@/lib/models";
import bcrypt from "bcryptjs";
import { signIn, signOut } from "@/app/auth";

export const addUser = async (formData) => {
  const {
    username,
    emailuser,
    passworduser,
    img,
    isAdmin,
    isActive,
    phoneuser,
    useraddress,
  } = Object.fromEntries(formData);
  try {
    await connectToDB();

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(passworduser, salt);

    const newUser = new User({
      username,
      emailuser,
      passworduser: hashedPassword,
      img,
      isAdmin,
      isActive,
      phoneuser,
      useraddress,
    });

    const savedUser = await newUser.save();
    const newUserId = savedUser._id.toString();
    console.log(newUserId);

    return newUserId;
  } catch (err) {
    console.log(err);
    throw new Error("Failed to create user!");
  }
};

export const updateUser = async (formData) => {
  const {
    id,
    username,
    emailuser,
    passworduser,
    img,
    isAdmin,
    isActive,
    phoneuser,
    useraddress,
  } = Object.fromEntries(formData);

  try {
    await connectToDB();
    const updateFields = {
      username,
      emailuser,
      passworduser,
      img,
      isAdmin,
      isActive,
      phoneuser,
      useraddress,
    };
    Object.keys(updateFields).forEach(
      (key) =>
        (updateFields[key] === "" || undefined) && delete updateFields[key]
    );

    await User.findByIdAndUpdate(id, updateFields);
  } catch (err) {
    console.log(err);
    throw new Error("Failed to update user!");
  }
};

export const addPatient = async (formData) => {
  const {
    name_patient,
    prenom_patient,
    gender,
    birth,
    agepatient,
    addresspatient,
    phone_patient,
    doctor,
  } = Object.fromEntries(formData);

  try {
    await connectToDB();
    const newPatient = new Patient({
      name_patient,
      prenom_patient,
      gender,
      birth,
      agepatient,
      addresspatient,
      phone_patient,
      doctor,
    });

    const savedPatient = await newPatient.save();
    const newPatientId = savedPatient._id.toString();
    console.log(newPatient);

    return newPatientId;
  } catch (err) {
    console.log(err);
    throw new Error("Failed to create patient!");
  }
};

export const updatePatient = async (formData) => {
  const {
    id,
    name_patient,
    prenom_patient,
    gender,
    birth,
    agepatient,
    addresspatient,
    phone_patient,
    doctor,
  } = Object.fromEntries(formData);

  try {
    await connectToDB();
    const updateFields = {
      name_patient,
      prenom_patient,
      gender,
      birth,
      agepatient,
      addresspatient,
      phone_patient,
      doctor,
    };

    Object.keys(updateFields).forEach(
      (key) =>
        (updateFields[key] === "" || undefined) && delete updateFields[key]
    );

    await Patient.findByIdAndUpdate(id, updateFields);
  } catch (err) {
    console.log(err);
    throw new Error("Failed to update patient!");
  }
};

// export const addObservation = async (formData) => {
//   const { patientId, doctor, observation, kidneyFunction } =
//     Object.fromEntries(formData);

//   try {
//     await connectToDB();
//     const newObservation = new Observation({
//       patientId,
//       doctor,
//       observation,
//       kidneyFunction,
//     });

//     const savedObservation = await newObservation.save();
//     const newObservationId = savedObservation._id.toString();
//     console.log(newObservation);

//     return newObservationId;
//   } catch (err) {
//     console.log(err);
//     throw new Error("Failed to create observation!");
//   }
// };

export const deleteUser = async (userId) => {
  try {
    await connectToDB();
    await User.findByIdAndDelete(userId);
    revalidatePath("/dashboard/administration");
  } catch (err) {
    console.log(err);
    throw new Error("Failed to delete user!");
  }
};

export const deletePatient = async (patientId) => {
  try {
    await connectToDB();
    await Patient.findByIdAndDelete(patientId);
    revalidatePath("/dashboard/patients");
  } catch (err) {
    console.log(err);
    throw new Error("Failed to delete patient!");
  }
};

export const authenticate = async (formData) => {
  const { emailuser, passworduser } = Object.fromEntries(formData);
  try {
    await signIn("credentials", { emailuser, passworduser });
  } catch (err) {
    if (err.message.includes("CredentialsSignin")) {
      return "Wrong Credentials";
    }
    throw err;
  }
};

export async function logout() {
  await signOut();
}
