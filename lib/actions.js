"use server";
import { revalidatePath } from "next/cache";
import { connectToDB } from "./utilsconnection";
import { Consultation, User, Patient, Note, Appointment, Document } from "@/lib/models";
import bcrypt from "bcryptjs";
import { signIn, signOut } from "@/app/auth";
export const fetchNotesByPatientId = async (patientId) => {
  try {
    await connectToDB();
    const notes = await Note.find({ patientId }).lean();
    return notes;
  } catch (err) {
    console.error("Erreur lors de la récupération des notes :", err);
    throw new Error("Failed to retrieve notes!");
  }
};
export const getConsultationsByPatientId = async (patientId) => {
  try {
    await connectToDB();

    // Récupérer le patient et ses consultations
    const patient = await Patient.findById(patientId)
      .populate("consultations")
      .lean(); // Retourner un objet simple pour le patient

    if (!patient) {
      throw new Error("Patient not found.");
    }

    // Récupérer les détails des consultations en utilisant lean()
    const consultations = await Consultation.find({
      _id: { $in: patient.consultations },
    }).lean(); // Retourner des objets simples pour les consultations

    return consultations;
  } catch (err) {
    console.error("Erreur lors de la récupération des consultations :", err);
    throw new Error("Failed to retrieve consultations!");
  }
};

export const addNote = async (formData, createdby) => {
  try {
    await connectToDB();
    const patientId = formData.get("patientId");
    const title = formData.get("title");
    const type = formData.get("type");
    const description = formData.get("description");

    const newNote = await Promise.all( new Note({
      patientId,
      title,
      type,
      description,
      createdby
    }));

    const savedNote = await newNote.save();
    console.log("Note ajoutée avec succès :", savedNote);
    return savedNote;
  } catch (err) {
    console.error("Erreur lors de l'ajout de la note :", err);
    throw new Error("Failed to create note!");
  }
};
export const addConsultation = async (formData) => {
  const {
    patientId,
    reasonForHospitalization,
    medicalHistory,
    socialSurvey,
    clinicalExamination,
    complementaryExams,
    treatment,
    evolution,
    conclusion,
  } = formData;

  try {
    await connectToDB();

    const newConsultation = new Consultation({
      patientId,
      reasonForHospitalization,
      medicalHistory: {
        personal: medicalHistory.personal,
        surgical: medicalHistory.surgical,
        family: {
          father: medicalHistory.family.father,
          mother: medicalHistory.family.mother,
          siblings: medicalHistory.family.siblings,
          children: medicalHistory.family.children,
        },
      },
      socialSurvey: {
        alcohol: socialSurvey.alcohol,
        tobacco: socialSurvey.tobacco,
        traditionalPhytotherapy: socialSurvey.traditionalPhytotherapy,
        spice: socialSurvey.spice,
        administrativeCoverage: socialSurvey.administrativeCoverage,
      },
      clinicalExamination: {
        generalCondition: {
          temperature: clinicalExamination.generalCondition.temperature,
          bloodPressure: clinicalExamination.generalCondition.bloodPressure,
          pulse: clinicalExamination.generalCondition.pulse,
          respiratoryRate: clinicalExamination.generalCondition.respiratoryRate,
          observations: clinicalExamination.generalCondition.observations,
        },
        genitourinary: {
          mictionNormal: clinicalExamination.genitourinary.mictionNormal,
          hairType: clinicalExamination.genitourinary.hairType,
          externalGenitalsType:
            clinicalExamination.genitourinary.externalGenitalsType,
          lumbarContact: clinicalExamination.genitourinary.lumbarContact,
          renalBallotement: clinicalExamination.genitourinary.renalBallotement,
          ureteralPointsPain:
            clinicalExamination.genitourinary.ureteralPointsPain,
        },
        // pleuroPulmonary: {
        //   thoracicExpansion:
        //     clinicalExamination.pleuroPulmonary.thoracicExpansion,
        //   vocalVibrations: clinicalExamination.pleuroPulmonary.vocalVibrations,
        //   vesicularBreathSounds:
        //     clinicalExamination.pleuroPulmonary.vesicularBreathSounds,
        // },
        // cardiovascular: {
        //   apexBeat: clinicalExamination.cardiovascular.apexBeat,
        //   peripheralPulses: clinicalExamination.cardiovascular.peripheralPulses,
        //   heartSounds: clinicalExamination.cardiovascular.heartSounds,
        //   jugularTurgescence:
        //     clinicalExamination.cardiovascular.jugularTurgescence,
        //   lowerLimbEdema: clinicalExamination.cardiovascular.lowerLimbEdema,
        // },
        // hepaticDigestive: {
        //   oralHygiene: clinicalExamination.hepaticDigestive.oralHygiene,
        //   abdominalParticipation:
        //     clinicalExamination.hepaticDigestive.abdominalParticipation,
        //   abdomenCondition:
        //     clinicalExamination.hepaticDigestive.abdomenCondition,
        // },
      },
      complementaryExams: {
        bloodBiochemistry: complementaryExams.bloodBiochemistry,
        hemogram: complementaryExams.hemogram,
        serology: complementaryExams.serology,
        urineAnalysis: complementaryExams.urineAnalysis,
        renalUltrasound: complementaryExams.renalUltrasound,
        eyeFundus: complementaryExams.eyeFundus,
        ecg: complementaryExams.ecg,
      },
      treatment,
      evolution,
      conclusion,
    });

    const savedConsultation = await newConsultation.save();
    await Patient.findByIdAndUpdate(patientId, {
      $push: { consultations: savedConsultation._id },
    });

    console.log("Consultation ajoutée avec succès :", savedConsultation);
    return savedConsultation._id.toString();
  } catch (err) {
    console.error("Erreur lors de l'ajout de la consultation :", err);
    throw new Error("Failed to create consultation!");
  }
};

export const addUser = async (formData) => {
  const {
    username,
    emailuser,
    passworduser,
    img,
    isAdmin,
    createdby,
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
      createdby,
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
  try {
    // Connectez-vous à la base de données
    await connectToDB();

    // Extraire les champs du formData
    const {
      id,
      username,
      emailuser,
      passworduser,
      img,
      isAdmin,
      phoneuser,
      useraddress,
    } = Object.fromEntries(formData.entries());

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(passworduser, salt);
    // Préparer les champs à mettre à jour
    const updateFields = {
      username,
      emailuser,
      passworduser: hashedPassword,
      img,
      isAdmin,
      phoneuser,
      useraddress,
    };

    // Supprimer les champs vides ou non définis
    Object.keys(updateFields).forEach((key) => {
      if (updateFields[key] === "" || updateFields[key] === undefined) {
        delete updateFields[key];
      }
    });

    // Vérification de l'identifiant
    if (!id) {
      throw new Error("User ID is required for update.");
    }

    const updatedUser = await User.findByIdAndUpdate(id, updateFields, {
      new: true,
    });

    if (!updatedUser) {
      throw new Error("User not found.");
    }

    // Transforme en un objet simple
    const simpleUser = JSON.parse(JSON.stringify(updatedUser));

    return simpleUser;
  } catch (err) {
    console.error("Error updating user:", err);
    throw new Error("Failed to update user!");
  }
};

// export const addPatient = async (formData) => {
//   const {
//     name_patient,
//     prenom_patient,
//     gender,
//     birth,
//     agepatient,
//     addresspatient,
//     phone_patient,
//     doctor,
//   } = Object.fromEntries(formData);

//   try {
//     await connectToDB();
//     const newPatient = new Patient({
//       name_patient,
//       prenom_patient,
//       gender,
//       birth,
//       agepatient,
//       addresspatient,
//       phone_patient,
//       doctor,
//     });

//     const savedPatient = await newPatient.save();
//     const newPatientId = savedPatient._id.toString();
//     console.log(newPatient);

//     return newPatientId;
//   } catch (err) {
//     console.log(err);
//     throw new Error("Failed to create patient!");
//   }
// };

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
      isArchived: false,
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
  try {
    await connectToDB();

    const {
      id,
      name_patient,
      prenom_patient,
      gender,
      agepatient,
      addresspatient,
      phone_patient,
    } = Object.fromEntries(formData);

    const updateFields = {
      name_patient,
      prenom_patient,
      gender,
      agepatient,
      addresspatient,
      phone_patient,
    };

    // Supprimer les champs vides ou non définis
    Object.keys(updateFields).forEach((key) => {
      if (updateFields[key] === "" || updateFields[key] === undefined) {
        delete updateFields[key];
      }
    });

    // Vérification de l'identifiant
    if (!id) {
      throw new Error("Patient ID is required for update.");
    }
    const updatedPatient = await Patient.findByIdAndUpdate(id, updateFields, {
      new: true,
    });

    if (!updatedPatient) {
      throw new Error("Patient not found.");
    }

    // Transforme en un objet simple
    const simplePatient = JSON.parse(JSON.stringify(updatedPatient));

    return simplePatient;
  } catch (err) {
    console.log(err);
    throw new Error("Failed to update patient!");
  }
};

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

// export const deletePatient = async (patientId) => {
//   try {
//     await connectToDB();
//     await Patient.findByIdAndDelete(patientId);
//     revalidatePath("/dashboard/patients");
//   } catch (err) {
//     console.log(err);
//     throw new Error("Failed to delete patient!");
//   }
// };

export const archivePatient = async (patientId) => {
  try {
    await connectToDB();
    await Patient.findByIdAndUpdate(patientId, { isArchived: true });
    revalidatePath("/dashboard/patients");
  } catch (err) {
    console.log(err);
    throw new Error("Failed to archive patient!");
  }
};




export const addAppointment = async (eventData) => {
  try {
    await connectToDB();
    
    const { title, start, allDay, notificationTime, userId } = eventData;
    
    const newAppointment = new Appointment({
      userId,
      title,
      start,
      allDay,
      notificationTime
    });

    const savedAppointment = await newAppointment.save();
    console.log("Appointment added successfully:", savedAppointment);
    return savedAppointment._id.toString();
  } catch (err) {
    console.error("Error adding appointment:", err);
    throw new Error("Failed to create appointment!");
  }
};


export const updateAppointment = async (eventData) => { 
  try {
    await connectToDB();
    
    const { id, title, start, allDay, notificationTime, userId } = eventData;
    
    const updatedAppointment = await Appointment.findByIdAndUpdate(id, {
      userId,
      title,
      start,
      allDay,
      notificationTime
    }, { new: true });

    if (!updatedAppointment) {
      throw new Error("Appointment not found.");
    }

    console.log("Appointment updated successfully:", updatedAppointment);
    return updatedAppointment._id.toString();
  } catch (err) {
    console.error("Error updating appointment:", err);
    throw new Error("Failed to update appointment!");
  }
};

export const deleteAppointment = async (appointmentId) => {
  try {
    await connectToDB();
    await Appointment.findByIdAndUpdate(appointmentId, { isDeleted: true });
    revalidatePath("/dashboard/appointments");
  } catch (err) {
    console.error("Failed to delete appointment:", err);
    throw new Error("Failed to delete appointment!");
  }
};
export const addDocument = async (formData, uploadedBy) => {
  try {
    await connectToDB();
    const patientId = formData.get("patientId");
    const files = formData.getAll("files");

    if (!patientId || files.length === 0) {
      throw new Error("Patient ID et fichiers sont requis !");
    }

    const newDocuments = await Promise.all(
      files.map(async (file) => {
        const buffer = Buffer.from(await file.arrayBuffer()); 

        const document = new Document({
          patientId,
          name: file.name,
          url: buffer,
          uploadedBy,
          uploadDate: new Date(),
        });

        return await document.save();
      })
    );

    console.log("Documents ajoutés avec succès:", newDocuments);
    return newDocuments;
  } catch (err) {
    console.error("Erreur lors de l'ajout des documents :", err);
    throw new Error("Échec de l'ajout des documents !");
  }
};

export const fetchDocumentsByPatientId = async (patientId) => {
  try {
    await connectToDB();
    const documents = await Document.find({ patientId }).lean();
    return documents;
  } catch (err) {
    console.error("Error fetching documents:", err);
    throw new Error("Failed to fetch documents!");
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
