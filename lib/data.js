import { connectToDB } from "./utilsconnection";
import { User, Patient, Consultation } from "@/lib/models";

export const fetchConsultation = async (consultationId) => {
  try {
    await connectToDB();
    const consultation = await Consultation.findById(consultationId).lean();

    if (consultation) {
      consultation._id = consultation._id.toString();

      const patient = await Patient.findById(consultation.patientId).lean();

      if (patient) {
        consultation.patientInfo = {
          name: patient.name_patient,
          prenom: patient.prenom_patient,
          gender: patient.gender,
          birth: patient.birth,
          age: patient.agepatient,
          address: patient.addresspatient,
          phone: patient.phone_patient,
          doctor: patient.doctor,
          isArchived: patient.isArchived,
        };
      } else {
        console.log("Patient non trouvé avec l'ID :", consultation.patientId);
      }
    }

    console.log("Consultation récupérée :", consultation);
    return consultation;
  } catch (err) {
    console.log(err);
    throw new Error("Failed to fetch consultation!");
  }
};

// export const fetchChartData = async () => {

//   try {
//     await connectToDB();

//     // Données pour le pie chart (répartition par genre)
//     const genderDistribution = await Patient.aggregate([
//       { $match: { isArchived: false } },
//       { $group: { _id: "$gender", count: { $sum: 1 } } },
//     ]);

//     // Données pour le line chart (consultations par mois)
//     const currentYear = new Date().getFullYear();
//     const consultationsByMonth = await Consultation.aggregate([
//       {
//         $match: {
//           createdAt: {
//             $gte: new Date(currentYear, 0, 1),
//             $lt: new Date(currentYear + 1, 0, 1),
//           },
//         },
//       },
//       {
//         $group: {
//           _id: { $month: "$createdAt" },
//           count: { $sum: 1 },
//         },
//       },
//       { $sort: { _id: 1 } },
//     ]);

//     // Données pour le bar chart (nouveaux patients par mois)
//     const patientsByMonth = await Patient.aggregate([
//       {
//         $match: {
//           createdAt: {
//             $gte: new Date(currentYear, 0, 1),
//             $lt: new Date(currentYear + 1, 0, 1),
//           },
//           isArchived: false,
//         },
//       },
//       {
//         $group: {
//           _id: { $month: "$createdAt" },
//           count: { $sum: 1 },
//         },
//       },
//       { $sort: { _id: 1 } },
//     ]);

//     // Données pour le stacked bar (répartition par âge et genre)
//     const ageGroups = await Patient.aggregate([
//       { $match: { isArchived: false } },
//       {
//         $group: {
//           _id: {
//             ageGroup: {
//               $switch: {
//                 branches: [
//                   { case: { $lte: ["$agepatient", 20] }, then: "0-20" },
//                   { case: { $lte: ["$agepatient", 40] }, then: "21-40" },
//                   { case: { $lte: ["$agepatient", 60] }, then: "41-60" },
//                 ],
//                 default: "60+",
//               },
//             },
//             gender: "$gender",
//           },
//           count: { $sum: 1 },
//         },
//       },
//       { $sort: { "_id.ageGroup": 1 } },
//     ]);

//     return {
//       genderDistribution,
//       consultationsByMonth,
//       patientsByMonth,
//       ageGroups,
//     };
//   } catch (err) {
//     console.error(
//       "Erreur lors de la récupération des données des graphiques:",
//       err
//     );
//     throw new Error("Failed to fetch chart data!");
//   }
// };

//   try {
//     await connectToDB();

//     // Données pour le pie chart (répartition par genre)
//     const genderDistribution = await Patient.aggregate([
//       { $match: { isArchived: false } },
//       { $group: { _id: "$gender", count: { $sum: 1 } } }
//     ]);

//     // Données pour le line chart (consultations par mois)
//     const currentYear = new Date().getFullYear();
//     const consultationsByMonth = await Consultation.aggregate([
//       {
//         $match: {
//           createdAt: {
//             $gte: new Date(currentYear, 0, 1),
//             $lt: new Date(currentYear + 1, 0, 1)
//           }
//         }
//       },
//       {
//         $group: {
//           _id: { $month: "$createdAt" },
//           count: { $sum: 1 }
//         }
//       },
//       { $sort: { "_id": 1 } }
//     ]);

//     // Données pour le bar chart (nouveaux patients par mois)
//     const patientsByMonth = await Patient.aggregate([
//       {
//         $match: {
//           createdAt: {
//             $gte: new Date(currentYear, 0, 1),
//             $lt: new Date(currentYear + 1, 0, 1)
//           },
//           isArchived: false
//         }
//       },
//       {
//         $group: {
//           _id: { $month: "$createdAt" },
//           count: { $sum: 1 }
//         }
//       },
//       { $sort: { "_id": 1 } }
//     ]);

//     return {
//       genderDistribution,
//       consultationsByMonth,
//       patientsByMonth
//     };
//   } catch (err) {
//     console.error("Erreur lors de la récupération des données des graphiques:", err);
//     throw new Error("Failed to fetch chart data!");
//   }
// };

// export const fetchChartData = async () => {
//   try {
//     await connectToDB();

//     const currentYear = new Date().getFullYear();

//     const [
//       genderDistribution,
//       consultationsByMonth,
//       patientsByMonth,
//       ageGroups,
//     ] = await Promise.all([
//       // Distribution par genre
//       Patient.aggregate([
//         { $match: { isArchived: false } },
//         { $group: { _id: "$gender", count: { $sum: 1 } } },
//       ]),

//       // Consultations par mois
//       Consultation.aggregate([
//         {
//           $match: {
//             createdAt: {
//               $gte: new Date(currentYear, 0, 1),
//               $lt: new Date(currentYear + 1, 0, 1),
//             },
//           },
//         },
//         {
//           $group: {
//             _id: { $month: "$createdAt" },
//             count: { $sum: 1 },
//           },
//         },
//         { $sort: { _id: 1 } },
//       ]),

//       // Patients par mois
//       Patient.aggregate([
//         {
//           $match: {
//             createdAt: {
//               $gte: new Date(currentYear, 0, 1),
//               $lt: new Date(currentYear + 1, 0, 1),
//             },
//             isArchived: false,
//           },
//         },
//         {
//           $group: {
//             _id: { $month: "$createdAt" },
//             count: { $sum: 1 },
//           },
//         },
//         { $sort: { _id: 1 } },
//       ]),

//       // Groupes d'âge
//       Patient.aggregate([
//         { $match: { isArchived: false } },
//         {
//           $group: {
//             _id: {
//               ageGroup: {
//                 $switch: {
//                   branches: [
//                     { case: { $lte: ["$agepatient", 20] }, then: "0-20" },
//                     { case: { $lte: ["$agepatient", 40] }, then: "21-40" },
//                     { case: { $lte: ["$agepatient", 60] }, then: "41-60" },
//                   ],
//                   default: "60+",
//                 },
//               },
//               gender: "$gender",
//             },
//             count: { $sum: 1 },
//           },
//         },
//         { $sort: { "_id.ageGroup": 1 } },
//       ]),
//     ]);

//     const results = {
//       genderDistribution,
//       consultationsByMonth,
//       patientsByMonth,
//       ageGroups,
//     };

//     console.log("Données agrégées depuis MongoDB:", results);

//     return results;
//   } catch (err) {
//     console.error(
//       "Erreur lors de la récupération des données des graphiques:",
//       err
//     );
//     throw new Error("Failed to fetch chart data!");
//   }
// };

export const fetchChartData = async () => {
  try {
    await connectToDB();

    // Données pour le pie chart (répartition par genre)
    const genderDistribution = await Patient.aggregate([
      { $match: { isArchived: false } },
      { $group: { _id: "$gender", count: { $sum: 1 } } },
    ]);

    // Données pour les consultations par mois
    const currentYear = new Date().getFullYear();
    const consultationsByMonth = await Consultation.aggregate([
      {
        $match: {
          createdAt: {
            $gte: new Date(currentYear, 0, 1),
            $lt: new Date(currentYear + 1, 0, 1),
          },
        },
      },
      {
        $group: {
          _id: { $month: "$createdAt" },
          count: { $sum: 1 },
        },
      },
      { $sort: { _id: 1 } },
    ]);

    // Données pour les nouveaux patients par mois
    const patientsByMonth = await Patient.aggregate([
      {
        $match: {
          createdAt: {
            $gte: new Date(currentYear, 0, 1),
            $lt: new Date(currentYear + 1, 0, 1),
          },
          isArchived: false,
        },
      },
      {
        $group: {
          _id: { $month: "$createdAt" },
          count: { $sum: 1 },
        },
      },
      { $sort: { _id: 1 } },
    ]);

    // Données pour la répartition par âge et genre
    const ageGroups = await Patient.aggregate([
      { $match: { isArchived: false } },
      {
        $project: {
          ageGroup: {
            $switch: {
              branches: [
                { case: { $lte: ["$agepatient", 20] }, then: "0-20" },
                { case: { $lte: ["$agepatient", 40] }, then: "21-40" },
                { case: { $lte: ["$agepatient", 60] }, then: "41-60" },
              ],
              default: "60+",
            },
          },
          gender: 1,
        },
      },
      {
        $group: {
          _id: {
            ageGroup: "$ageGroup",
            gender: "$gender",
          },
          count: { $sum: 1 },
        },
      },
      { $sort: { "_id.ageGroup": 1 } },
    ]);

    return {
      genderDistribution,
      consultationsByMonth,
      patientsByMonth,
      ageGroups,
    };
  } catch (err) {
    console.error("Erreur lors de la récupération des données:", err);
    throw new Error("Failed to fetch chart data!");
  }
};
export const fetchDashboardStats = async () => {
  try {
    await connectToDB();

    // Total des patients (non archivés)
    const totalPatients = await Patient.countDocuments({ isArchived: false });

    // Nouveaux patients ce mois-ci
    const startOfMonth = new Date();
    startOfMonth.setDate(1);
    startOfMonth.setHours(0, 0, 0, 0);
    const newPatientsThisMonth = await Patient.countDocuments({
      createdAt: { $gte: startOfMonth },
      isArchived: false,
    });

    // Total des consultations
    const totalConsultations = await Consultation.countDocuments();

    // Moyenne des consultations par patient
    const averageConsultations =
      totalPatients > 0 ? (totalConsultations / totalPatients).toFixed(2) : 0;

    return {
      totalPatients,
      newPatientsThisMonth,
      totalConsultations,
      averageConsultations,
    };
  } catch (err) {
    console.error("Erreur lors de la récupération des statistiques:", err);
    throw new Error("Failed to fetch dashboard statistics!");
  }
};

// ... autres fonctions existantes ...
// export const fetchConsultation = async (consultationId) => {
//   try {
//     await connectToDB();
//     const consultation = await Consultation.findById(consultationId)
//       .populate("patientId") // Assurez-vous que cela correspond à votre schéma
//       .lean();

//     if (consultation) {
//       consultation._id = consultation._id.toString();
//       consultation.patientId = consultation.patientId.toString();

//       // Affichez les informations du patient de manière lisible
//       console.log(
//         "Informations du patient :",
//         JSON.stringify(consultation.patientId, null, 2)
//       );

//       // Ajoutez les informations du patient au document de consultation
//       consultation.patientInfo = {
//         name: consultation.patientId.name_patient,
//         prenom: consultation.patientId.prenom_patient,
//         gender: consultation.patientId.gender,
//         birth: consultation.patientId.birth,
//         age: consultation.patientId.agepatient,
//         address: consultation.patientId.addresspatient,
//         phone: consultation.patientId.phone_patient,
//         doctor: consultation.doctor,
//         isArchived: consultation.isArchived,
//       };
//     }

//     console.log("Consultation récupérée :", consultation);
//     return consultation;
//   } catch (err) {
//     console.log(err);
//     throw new Error("Failed to fetch consultation!");
//   }
// };

export const fetchUsers = async (q, page) => {
  const regex = new RegExp(q, "i");

  const ITEM_PER_PAGE = 6;

  try {
    connectToDB();
    const count = await User.countDocuments({ username: { $regex: regex } });
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

// export const fetchPatients = async (q, page) => {
//   console.log(q);
//   const regex = new RegExp(q, "i");

//   const ITEM_PER_PAGE = 6;

//   try {
//     connectToDB();
//     // const query = {
//     //   $or: [
//     //     { name_patient: { $regex: regex } },
//     //     { prenom_patient: { $regex: regex } },
//     //   ],
//     // };
//     // const count = await Patient.find(query).count();
//     // const patients = await Patient.find(query)
//     //   .sort({ name_patient: 1, prenom_patient: 1 })
//     //   .limit(ITEM_PER_PAGE)
//     //   .skip(ITEM_PER_PAGE * (page - 1));
//     // return { count, patients };

//     // Récupération de tous les patients triés par createdAt
//     const allPatients = await Patient.find({
//       $or: [
//         { name_patient: { $regex: regex } },
//         { prenom_patient: { $regex: regex } },
//       ],
//     }).sort({ createdAt: 1 });

//     // Attribution des IDs basés sur la date de création
//     const patientsWithTempIds = allPatients.map((patient, index) => ({
//       ...patient.toObject(),
//       tempId: index + 1,
//     }));

//     // Tri par nom et prénom après l'attribution des IDs
//     patientsWithTempIds.sort((a, b) => {
//       if (a.name_patient < b.name_patient) return -1;
//       if (a.name_patient > b.name_patient) return 1;
//       if (a.prenom_patient < b.prenom_patient) return -1;
//       if (a.prenom_patient > b.prenom_patient) return 1;
//       return 0;
//     });

//     // Pagination
//     const paginatedPatients = patientsWithTempIds.slice(
//       (page - 1) * ITEM_PER_PAGE,
//       page * ITEM_PER_PAGE
//     );

//     return {
//       count: allPatients.length,
//       patients: paginatedPatients,
//     };
//   } catch (err) {
//     console.log(err);
//     throw new Error("Failed to fetch patients!");
//   }
// };

export const fetchPatients = async (q, page) => {
  console.log(q);
  const regex = new RegExp(q, "i");

  const ITEM_PER_PAGE = 6;

  try {
    connectToDB();
    // Récupération de tous les patients non archivés triés par createdAt
    const allPatients = await Patient.find({
      $or: [
        { name_patient: { $regex: regex } },
        { prenom_patient: { $regex: regex } },
      ],
      isArchived: false, // Filtrer pour n'inclure que les patients non archivés
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

//   try {
//     connectToDB();
//     const observation = await Observation.findById(patientId);
//     return observation;
//   } catch (err) {
//     console.log(err);
//     throw new Error("Failed to fetch observation!");
//   }
// };

// export const fetchPatientable = async ({ q, page }) => {
//   const regex = new RegExp(q, "i");
//   const ITEM_PER_PAGE = 4;
//   try {
//     connectToDB();
//     const query = {
//       $or: [
//         { name_patient: { $regex: regex } },
//         { prenom_patient: { $regex: regex } },
//       ],
//     };
//     const patients = await Patient.find(query)
//       .sort({ name_patient: 1, prenom_patient: 1 })
//       .limit(ITEM_PER_PAGE)
//       .skip(ITEM_PER_PAGE * (page - 1));
//     return { patients };
//   } catch (err) {
//     console.log(err);
//     throw new Error("Failed to fetch patients!");
//   }
// };

export const fetchRecentPatients = async () => {
  try {
    await connectToDB();

    // Récupérer les 4 derniers patients
    const patients = await Patient.find().sort({ createdAt: -1 }).limit(4);

    return { patients };
  } catch (err) {
    console.log(err);
    throw new Error("Failed to fetch recent patients!");
  }
};
