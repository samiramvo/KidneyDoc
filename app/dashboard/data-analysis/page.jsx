// "use client";
// import { useState } from "react";
// import { Bar } from "react-chartjs-2";
// import "chart.js/auto";

// export default function Home() {
//   const [file, setFile] = useState(null);
//   const [prediction, setPrediction] = useState(null);
//   const [loading, setLoading] = useState(false);

//   const handleFileChange = (event) => {
//     setFile(event.target.files[0]);
//   };

//   const getPrediction = async () => {
//     if (!file) {
//       alert("Veuillez sélectionner un fichier Excel.");
//       return;
//     }

//     setLoading(true);

//     const formData = new FormData();
//     formData.append("file", file);

//     try {
//       const response = await fetch(
//         `${process.env.NEXT_PUBLIC_API_URL}/predict`,
//         {
//           method: "POST",
//           body: formData,
//         }
//       );

//       const data = await response.json();
//       setPrediction(data.CKD_Stage);
//     } catch (error) {
//       console.error("Erreur:", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const resetPrediction = () => {
//     setPrediction(null);
//     setFile(null);
//   };

//   const downloadChart = () => {
//     const link = document.createElement("a");
//     link.href = document.getElementById("chart").toDataURL("image/png");
//     link.download = "chart.png";
//     link.click();
//   };

//   const chartData = {
//     labels: ["Stage 1", "Stage 2", "Stage 3", "Stage 4", "Stage 5"],
//     datasets: [
//       {
//         label: "CKD Stages",
//         data: [0, 0, 0, 0, 0].map((_, index) =>
//           index + 1 === prediction ? 1 : 0
//         ),
//         backgroundColor: [
//           "#4ade80",
//           "#60a5fa",
//           "#fbbf24",
//           "#f87171",
//           "#a78bfa",
//         ],
//       },
//     ],
//   };

//   return (
//     <div className="flex flex-col items-center justify-center min-h-screen ">
//       <input
//         type="file"
//         accept=".xlsx"
//         onChange={handleFileChange}
//         className="mb-4"
//       />
//       {!loading && !prediction && (
//         <button
//           onClick={getPrediction}
//           className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 mt-4"
//         >
//           Prédiction
//         </button>
//       )}
//       {loading && <div className="loader mt-4">Chargement...</div>}
//       {prediction && (
//         <div className="mt-6 w-1/2">
//           <Bar id="chart" data={chartData} />
//           <p className="mt-4 text-lg">CKD_Stage prédit: {prediction}</p>
//           <button
//             onClick={downloadChart}
//             className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 mt-4"
//           >
//             Télécharger le graphique
//           </button>
//           <button
//             onClick={resetPrediction}
//             className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 mt-4"
//           >
//             Réinitialiser
//           </button>
//         </div>
//       )}
//     </div>
//   );
// }
"use client";
import { useState } from "react";
import { Bar } from "react-chartjs-2";
import "chart.js/auto";

export default function Home() {
  const [file, setFile] = useState(null);
  const [prediction, setPrediction] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const getPrediction = async () => {
    if (!file) {
      alert("Veuillez sélectionner un fichier Excel.");
      return;
    }

    setLoading(true);

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/predict`,
        {
          method: "POST",
          body: formData,
        }
      );

      const data = await response.json();
      setPrediction(data.CKD_Stage);
    } catch (error) {
      console.error("Erreur:", error);
    } finally {
      setLoading(false);
    }
  };

  const resetPrediction = () => {
    setPrediction(null);
    setFile(null);
  };

  const downloadChart = () => {
    const link = document.createElement("a");
    link.href = document.getElementById("chart").toDataURL("image/png");
    link.download = "chart.png";
    link.click();
  };

  const chartData = {
    labels: ["Stage 1", "Stage 2", "Stage 3", "Stage 4", "Stage 5"],
    datasets: [
      {
        label: "CKD Stages",
        data: [0, 0, 0, 0, 0].map((_, index) =>
          index + 1 === prediction ? 1 : 0
        ),
        backgroundColor: [
          "#4ade80",
          "#60a5fa",
          "#fbbf24",
          "#f87171",
          "#a78bfa",
        ],
      },
    ],
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <div className="bg-white w-[60%] p-8 rounded-lg shadow-lg w-96">
        <h2 className="text-2xl font-bold mb-6 text-center">
          Téléverser un fichier
        </h2>
        <div className="flex flex-col items-center">
          <input
            type="file"
            accept=".xlsx"
            onChange={handleFileChange}
            className="mb-4 border border-gray-300 rounded p-2 w-full text-center"
          />
          {!loading && !prediction && (
            <button
              onClick={getPrediction}
              className="w-full px-4 py-2 bg-violettitle text-white rounded hover:bg-violetdesc transition duration-200"
            >
              Prédiction
            </button>
          )}
          {loading && <div className="loader mt-4">Chargement...</div>}
          {prediction && (
            <div className="mt-6">
              <Bar id="chart" data={chartData} />
              <p className="mt-4 text-lg text-center">
                CKD_Stage prédit: {prediction}
              </p>

              <button
                onClick={downloadChart}
                className="w-full px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition duration-200 mt-4 mr-4"
              >
                Télécharger le graphique
              </button>
              <button
                onClick={resetPrediction}
                className="w-full px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition duration-200 mt-4"
              >
                Réinitialiser
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
