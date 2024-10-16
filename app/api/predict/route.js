// const tf = require("@tensorflow/tfjs-node");
// import * as xlsx from "xlsx";
// import { join } from "path";

// async function loadModel() {
//   try {
//     const modelPath = join(__dirname, "/models/best_model.json"); // Use the correct model path
//     const model = await tf.loadLayersModel(`file://${modelPath}`);
//     return model;
//   } catch (error) {
//     console.error("Erreur lors du chargement du modèle :", error);
//     throw error;
//   }
// }

// async function predictFirstRowFromExcel(filePath) {
//   try {
//     // Lire le fichier Excel
//     const workbook = xlsx.readFile(filePath);
//     const sheetName = workbook.SheetNames[0];
//     const worksheet = workbook.Sheets[sheetName];
//     const data = xlsx.utils.sheet_to_json(worksheet, { header: 1 });

//     // Vérifier s'il y a des lignes dans le fichier
//     if (data.length === 0) {
//       console.log("Le fichier est vide.");
//       return;
//     }

//     // Prédire uniquement sur la première ligne
//     const firstRow = data[0];

//     // Convertir la première ligne en tenseur
//     const inputTensor = tf.tensor2d([firstRow]);

//     // Charger le modèle et faire la prédiction
//     const model = await loadModel();
//     const prediction = model.predict(inputTensor);
//     return prediction;
//   } catch (error) {
//     console.error("Erreur lors de la prédiction :", error);
//   }
// }
