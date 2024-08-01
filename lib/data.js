import { connectToDB } from "./utilsconnection";
import { User, Patient } from "@/lib/models";

export const fetchUsers = async (q, page) => {
  const regex = new RegExp(q, "i");

  const ITEM_PER_PAGE = 4;

  try {
    connectToDB();
    const count = await User.find({ username: { $regex: regex } }).count();
    const users = await User.find({ username: { $regex: regex } })
      .limit(ITEM_PER_PAGE)
      .skip(ITEM_PER_PAGE * (page - 1));
    return { count, users };
  } catch (err) {
    console.log(err);
    throw new Error("Failed to fetch users!");
  }
};

export const fetchUser = async (id) => {
  console.log(id);
  try {
    connectToDB();
    const user = await User.findById(id);
    return user;
  } catch (err) {
    console.log(err);
    throw new Error("Failed to fetch user!");
  }
};

export const fetchPatients = async (q, page) => {
  console.log(q);
  const regex = new RegExp(q, "i");

  const ITEM_PER_PAGE = 6;

  try {
    connectToDB();
    // const query = {
    //   $or: [
    //     { name_patient: { $regex: regex } },
    //     { prenom_patient: { $regex: regex } },
    //   ],
    // };
    // const count = await Patient.find(query).count();
    // const patients = await Patient.find(query)
    //   .sort({ name_patient: 1, prenom_patient: 1 })
    //   .limit(ITEM_PER_PAGE)
    //   .skip(ITEM_PER_PAGE * (page - 1));
    // return { count, patients };

    // Récupération de tous les patients triés par createdAt
    const allPatients = await Patient.find({
      $or: [
        { name_patient: { $regex: regex } },
        { prenom_patient: { $regex: regex } },
      ],
    }).sort({ createdAt: 1 });

    // Attribution des IDs basés sur la date de création
    const patientsWithTempIds = allPatients.map((patient, index) => ({
      ...patient.toObject(),
      tempId: index + 1,
    }));

    // Tri par nom et prénom après l'attribution des IDs
    patientsWithTempIds.sort((a, b) => {
      if (a.name_patient < b.name_patient) return -1;
      if (a.name_patient > b.name_patient) return 1;
      if (a.prenom_patient < b.prenom_patient) return -1;
      if (a.prenom_patient > b.prenom_patient) return 1;
      return 0;
    });

    // Pagination
    const paginatedPatients = patientsWithTempIds.slice(
      (page - 1) * ITEM_PER_PAGE,
      page * ITEM_PER_PAGE
    );

    return {
      count: allPatients.length,
      patients: paginatedPatients,
    };
  } catch (err) {
    console.log(err);
    throw new Error("Failed to fetch patients!");
  }
};

export const fetchPatient = async (id) => {
  try {
    connectToDB();
    const patient = await Patient.findById(id);
    return patient;
  } catch (err) {
    console.log(err);
    throw new Error("Failed to fetch patient!");
  }
};

// export const fetchObservations = async (patientId) => {
//   try {
//     connectToDB();
//     const observation = await Observation.findById(patientId);
//     return observation;
//   } catch (err) {
//     console.log(err);
//     throw new Error("Failed to fetch observation!");
//   }
// };

export const fetchPatientable = async ({ q, page }) => {
  const regex = new RegExp(q, "i");
  const ITEM_PER_PAGE = 4;
  try {
    connectToDB();
    const query = {
      $or: [
        { name_patient: { $regex: regex } },
        { prenom_patient: { $regex: regex } },
      ],
    };
    const count = await Patient.find(query).count();
    const patients = await Patient.find(query)
      .sort({ name_patient: 1, prenom_patient: 1 })
      .limit(ITEM_PER_PAGE)
      .skip(ITEM_PER_PAGE * (page - 1));
    return { count, patients };
  } catch (err) {
    console.log(err);
    throw new Error("Failed to fetch patients!");
  }
};
