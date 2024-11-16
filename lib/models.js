import { connectToDB } from "./utilsconnection";
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
    createdby: {
      type: String,
      required: true,
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
      enum: ["Male", "Female"],
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
      required: true,
    },
    isArchived: {
      type: Boolean,
      default: false,
    },
    notes: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Note",
      },
    ],
    consultations: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Consultation",
      },
    ],
  },

  { timestamps: true }
);

const consultationSchema = new mongoose.Schema({
  patientId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Patient",
    required: true,
  },
  reasonForHospitalization: { type: String, required: true },
  medicalHistory: {
    personal: [String],
    surgical: [String],
    family: {
      father: String,
      mother: String,
      siblings: Number,
      children: Number,
    },
  },
  socialSurvey: {
    alcohol: Boolean,
    tobacco: Boolean,
    traditionalPhytotherapy: Boolean,
    spice: Boolean,
    administrativeCoverage: Boolean,
  },
  clinicalExamination: {
    generalCondition: {
      temperature: Number,
      bloodPressure: String,
      pulse: Number,
      respiratoryRate: Number,
      observations: String,
    },
    genitourinary: {
      mictionNormal: Boolean,
      hairType: String,
      externalGenitalsType: String,
      lumbarContact: Boolean,
      renalBallotement: Boolean,
      ureteralPointsPain: Boolean,
    },
    // pleuroPulmonary: {
    //   thoracicExpansion: String,
    //   vocalVibrations: String,
    //   vesicularBreathSounds: String,
    // },
    // cardiovascular: {
    //   apexBeat: String,
    //   peripheralPulses: String,
    //   heartSounds: String,
    //   jugularTurgescence: Boolean,
    //   lowerLimbEdema: Boolean,
    // },
    // hepaticDigestive: {
    //   oralHygiene: String,
    //   abdominalParticipation: String,
    //   abdomenCondition: String,
    // },
  },
  complementaryExams: {
    bloodBiochemistry: String,
    hemogram: String,
    serology: String,
    urineAnalysis: String,
    renalUltrasound: String,
    eyeFundus: String,
    ecg: String,
  },
  treatment: String,
  evolution: String,
  conclusion: String,
  createdAt: { type: Date, default: Date.now },
});

const noteSchema = new mongoose.Schema(
  {
    patientId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Patient",
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      enum: [
        "Consultation",
        "Suivi",
        "Évaluation",
        "Rapport d'examen",
        "Prescription",
        "Observation",
        "Note de sortie",
        "Note d'admission",
        "Note de transfert",
      ],
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

export const Note = mongoose.models.Note || mongoose.model("Note", noteSchema);
export const User = mongoose.models.User || mongoose.model("User", userSchema);
export const Consultation =
  mongoose.models.Consultation ||
  mongoose.model("Consultation", consultationSchema);
export const Patient =
  mongoose.models.Patient || mongoose.model("Patient", patientSchema);
